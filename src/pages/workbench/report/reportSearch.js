import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, Clipboard, Linking} from 'react-native';
import {connect} from 'react-redux';
import {Toast} from '@new-space/teaset';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient'; // 渐变
import QRCode from 'react-native-qrcode-svg';
import {verifyUser} from '../../../utils/utils'

// 工具
import {scaleSize} from '../../../utils/screenUtil';
import {reportDataApi, qCoderDataApi} from '../../../services/report';

// 组件
import Search from '../../../businessComponents/Search';
import Modal from './../../../components/Modal';

// 样式
import {STYLE} from './style';

const ARROW = require('../../../images/icons/arrow_right.png');

class ReportSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      loading: false,
      refreshing: false,
      visible: false, // 弹窗状态
      pageIndex: 0,
      pageSize: 8,
      reportSearchList: [], // 报备数据
      visitSearchList: [], // 到访数据
      invalidSearchList: [], // 失效数据
      reportTotalCount: 0,
      visitTotalCount: 0,
      invalidTotalCount: 0,
      reportId: '', // 报备 id
      reportInfo: {}, // 选中的报备信息
    }
  }

  // 防止多次调用onLoadMore
  _loading = false;

  // 一级页面数据接口
  firstDataSource = (conditions) => {
    return reportDataApi(this.props.config.requestUrl.api, conditions);
  }

  // 二级页面接口
  fetchInternalData = (conditions) => {
    return reportDataApi(this.props.config.requestUrl.api, conditions);
  }

  // 一级页面数据获取/报备
  getReportDataSource = async (keyword, callback) => {
    let {pageIndex, pageSize} = this.state;
    this.setState({loading: true});
    try {
      let params = {
        pageIndex,
        pageSize,
        filterContent: keyword,
        type: 1,
      };
      let res = await this.firstDataSource(params);
      this.setState({
        reportSearchList: res.extension,
        reportTotalCount: res.totalCount,
        loading: false,
      }, () => {
        this.dealData();
      })
    } catch (e) {
      Toast.message('搜索客户失败');
    }
    callback && callback()
  };

  // 一级页面数据获取/到访
  getVisitDataSource = (keyword) => {
    let {pageIndex, pageSize} = this.state;

    this.setState({loading: true}, async () => {
      try {
        let params = {
          pageIndex,
          pageSize,
          filterContent: keyword,
          type: 2,
        }
        let res = await this.firstDataSource(params);
        console.log('到访数据：', res);
        this.setState({
          visitSearchList: res.extension,
          visitTotalCount: res.totalCount,
          loading: false,
        }, () => {
          this.dealData();
        })
      } catch (e) {
        Toast.message('搜索客户失败');
      }
    })
  }

  // 一级页面数据获取/失效
  getInvalidDataSource = (keyword) => {
    let {pageIndex, pageSize} = this.state;

    this.setState({loading: true}, async () => {
      try {
        let params = {
          pageIndex,
          pageSize,
          filterContent: keyword,
          type: 3,
        }
        let res = await this.firstDataSource(params);
        console.log('失效数据：', res);
        this.setState({
          invalidSearchList: res.extension,
          invalidTotalCount: res.totalCount,
          loading: false,
        }, () => {
          this.dealData();
        })
      } catch (e) {
        Toast.message('搜索客户失败');
      }
    })
  }

  dealData = () => {
    let {reportSearchList, visitSearchList, invalidSearchList, reportTotalCount, visitTotalCount, invalidTotalCount} = this.state;
    let dataSource = [];

    if (reportTotalCount > 0) {
      dataSource.push({
        key: 1,
        data: reportSearchList,
        total: reportTotalCount,
        pageIndex: 0
      })
    }

    if (visitTotalCount > 0) {
      dataSource.push({
        key: 2,
        data: visitSearchList,
        total: visitTotalCount,
        pageIndex: 0
      })
    }

    if (invalidTotalCount > 0) {
      dataSource.push({
        key: 3,
        data: invalidSearchList,
        total: invalidTotalCount,
        pageIndex: 0
      })
    }
    console.log('dataSource', dataSource);
    this.setState({
      dataSource,
    })
  }

  // 二级页面 搜索
  internalSearch = (keyword, key) => {
    this.setState({loading: true}, async () => {
      try {
        await this.internaInit(keyword, key)
      } catch (e) {
        Toast.message('获取更多失败')
      }
      this.setState({loading: false})
    })
  }

  // 二级页面 搜索 刷新  通用逻辑
  internaInit = async (keyword, key) => {
    let {pageSize} = this.state;
    let params = {
      pageIndex: 0,
      pageSize,
      filterContent: keyword,
      type: key,
    }

    try {
      let res = await this.fetchInternalData(params);

      let dataSource = this.state.dataSource.map(i => i.key === key ? {
        key: key,
        data: res.extension,
        total: res.totalCount,
        pageIndex: res.pageIndex
      } : i);

      this.setState({
        dataSource,
        loading: false,
      })
    } catch (e) {
      Toast.message('获取更多失败');
    }
  }

  handlePressSearch = (keyword, key) => {
    if (!key) {
      // 一级页面搜索
      this.getReportDataSource(keyword);
      this.getVisitDataSource(keyword);
      this.getInvalidDataSource(keyword);
    } else {
      // 二级页面搜索
      this.internalSearch(keyword, key)
    }
    this.props.sendPoint.add({
      target: '搜索框_input',
      page: '工作台-报备管理',
      action_param: keyword
    })
  }

  //点击历史记录
  handlePressHistory = (keyword, callback) => {
    this.getReportDataSource(keyword, callback);
    this.getVisitDataSource(keyword);
    this.getInvalidDataSource(keyword);
  };

  // 二级页面 上拉加载
  handleLoadMore = async (keyword, key) => {
    if (this._loading) return;

    this._loading = true;
    let {pageSize} = this.state;
    const {pageIndex} = this.state.dataSource.find(i => i.key === key);
    let params = {
      pageIndex: pageIndex + 1,
      pageSize,
      filterContent: keyword,
      type: key,
    }

    try {
      let res = await this.fetchInternalData(params);

      let dataSource = this.state.dataSource.map(i => i.key === key ? {
        key: key,
        data: i.data.concat(res.extension),
        total: res.totalCount,
        pageIndex: res.pageIndex,
      } : i);

      this.setState({
        dataSource,
        loading: false,
      })
    } catch (e) {
      Toast.message('获取更多失败');
    }

    this._loading = false;
  }

  // 二级页面刷新
  handleRefresh = (keyword, key) => {
    this.setState({refreshing: true}, async () => {
      try {
        await this.internaInit(keyword, key);
      } catch (e) {
        Toast.message('获取更多失败');
      }
    })

    this.setState({refreshing: false});
  }

  // 渲染 title
  renderTitle = (item, index, callback) => {
    return (
      <View key={index} style={STYLE.searchTitle}>
        <Text style={[STYLE.searchTitleText, {marginLeft: scaleSize(32)}]}>
          {item.key === 1 ? '报备' : (item.key === 2 ? '到访' : '失效')}
        </Text>
        {
          item.total > 3 ?
            <TouchableOpacity onPress={callback} style={[STYLE.searchRight, {marginRight: scaleSize(32)}]}>
              <Text style={STYLE.searchTitleText}>查看更多</Text>
              <Image source={ARROW} style={STYLE.searchArrowImg}/>
            </TouchableOpacity>
            : null
        }
      </View>
    )
  }

  // 跳转详情选择
  gotoSelectInfo = (type, typeId, reportInfo, visitType) => {

    switch (type) {
      case 1:
        this.initqCoderData(typeId);

        this.setState({
          reportId: typeId,
          reportInfo,
          visible: true,
        })
        break;

      case 2:
        if (visitType === 0) {
          Toast.message('到访单请联系项目经理确认！');
        } else if (visitType === 1) {
          this.props.navigation.navigate('visitDetail', typeId);
        }
        break;

      case 3:
        this.props.navigation.navigate('', typeId);
        break;

      default:
        console.log('没有default');
    }
  }

  // 二维码信息接口
  initqCoderData = async (reportId) => {
    let {api} = this.props.config.requestUrl;

    try {
      let res = await qCoderDataApi(api, reportId);

      if (res && res.code === '0') {
        let data = res.extension[0] || {};

        this.setState({
          qCoderContent: data.qCoderContent || '',
        })
      }

    } catch (error) {
      console.log(error);
    }
  }

  // 跳转录入带看页面/确认弹窗
  onOk = async () => {
    try {
      await this.setState({visible: false})
      await verifyUser()
      let {reportInfo} = this.state;
      this.props.navigation.navigate('visitInfo', reportInfo);
    } catch (e) {
    }
  }

  // onRequestClose Android 后退键激活 modal 关闭事件
  onRequestClose = () => {
    this.setState({
      visible: false,
    })
  }

  // 复制报备信息/关闭弹窗
  onClose = () => {
    let {reportInfo} = this.state;
    let copyText = '';
    let newPhone = [];

    ((reportInfo || {}).customerPhoneList || []).map((item) => {
      newPhone.push(item.customerPhone || '');
    })

    if (reportInfo) {
      copyText = '报备楼盘：' + reportInfo.buildingFullName + '\n' + '经纪公司：' + reportInfo.userCompanyShortName + ' | ' + reportInfo.userCompanyName + '\n' + '客户姓名：' + reportInfo.customerName + '\n' + '客户电话：' + newPhone.join(',') + '\n' + '经纪人：' + reportInfo.userTrueName + '\n' + '经纪人电话：' + reportInfo.userPhoneNumber + '\n' + '业务组别：' + reportInfo.userDeptName;
    }

    Clipboard.setString(copyText);

    this.setState({
      visible: false,
    }, () => {
      Toast.message('已复制到粘贴板');
    })
  }

  // 拨打电话
  callPhone = (userPhoneNumber) => {
    Linking.openURL(`tel:${userPhoneNumber}`);
  }

  renderItem = (item, index, key) => {
    let renderContent = null;
    let {user} = this.props;
    let userType = ((user || {}).userInfo || {}).isResident;
    let userId = ((user || {}).userInfo || {}).id;
    let type = key;
    let reportId = item.id;
    let visitId = {
      reportId: item.id || '',
      buildingId: item.buildingId || '',
      buildingTreeId: item.buildingTreeId || '',
    };
    let invalidId = item.id;
    let grade = '';
    let reportYear = moment(item.reportTime).format('YYYY');
    let nowReportYear = moment().format('YYYY');
    let validEndDay = '';
    let nowValidDay = moment().format('DD');
    let reportTime = '';
    let validDay = '';
    let validHour = '';
    let visitReportTime = moment(item.reportTime).format('YYYY-MM-DD HH:mm:ss');
    let visitTime = moment(item.visitTime).format('YYYY-MM-DD HH:mm:ss');
    let day = item.beltLookValidityNumber;

    if (item.reportValidityTime === '永久') {
      validDay = '永久';
    } else {
      validEndDay = moment(item.reportValidityTime).format('DD');
      validDay = moment(item.reportValidityTime).format('MM-DD');
      validHour = moment(item.reportValidityTime).format('HH:mm');
    }

    if (reportYear === nowReportYear) {
      reportTime = moment(item.reportTime).format('MM-DD HH:mm:ss')
    } else {
      reportTime = moment(item.reportTime).format('YYYY-MM-DD HH:mm:ss')
    }

    switch (item.grade) {
      case 1:
        grade = 'A';
        break;

      case 2:
        grade = 'B+';
        break;

      case 3:
        grade = 'B';
        break;

      case 4:
        grade = 'C';
        break;

      case 5:
        grade = 'D';
        break;

      default:
        console.log('没有default')
    }

    if (key === 1) {
      renderContent = (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          style={STYLE.click}
          onPress={() => {
            this.gotoSelectInfo(type, reportId, item)
          }}
        >
          <View style={STYLE.warp}>
            <View style={STYLE.top}>
              <Text style={STYLE.topRightFont}>
                单号：<Text>{item.reportNumber || ''}</Text>
              </Text>
              <View style={STYLE.topRight}>
                <Image
                  style={STYLE.topImg}
                  source={require('./../../../images/icons/time2.png')}
                  alt='图标'
                />
                <Text style={STYLE.topRightFont}>{reportTime}</Text>
              </View>
            </View>

            <View style={STYLE.line}></View>

            <View>
              <View style={[STYLE.top, {alignItems: 'flex-start'}]}>
                <View style={STYLE.topRight}>
                  {
                    item.customerSex === 0
                      ? <Image
                        style={STYLE.topImg}
                        source={require('./../../../images/icons/woman2.png')}
                        alt='图标'
                      />
                      : <Image
                        style={STYLE.topImg}
                        source={require('./../../../images/icons/man2.png')}
                        alt='图标'
                      />
                  }
                  <Text style={STYLE.contentFont}>{item.customerName || ''}</Text>
                  {
                    item.interiorRepetition
                      ? <LinearGradient
                        colors={['rgba(255,138,107,1)', 'rgba(254,81,57,1)']}
                        style={STYLE.LinearGradient}
                      >
                        <Text style={{color: 'rgba(255,255,255,1)', textAlign: 'center'}}>! 重</Text>
                      </LinearGradient>
                      : null
                  }
                </View>
                <View style={STYLE.contentPhones}>
                  {
                    item.customerPhoneList.map((item, index) => {
                      if (index === 0) {
                        return (
                          <Text style={STYLE.contentFont} key={index}>{item.customerPhone || ''}</Text>
                        )
                      }

                      return (
                        <Text style={STYLE.contentPhonesFont} key={index}>{item.customerPhone || ''}</Text>
                      )
                    })
                  }
                </View>
              </View>
              <View style={[STYLE.top, {marginTop: scaleSize(16)}]}>
                <View style={STYLE.topRight}>
                  <Text style={STYLE.buildingTypeText}>{item.buildingType || ''}</Text>
                  <Text
                    style={STYLE.fontMiddle}
                    numberOfLines={1}
                    ellipsizeMode={'middle'}
                  >
                    {item.buildingFullName || ''}
                  </Text>
                </View>

                {
                  item.reportValidityTime === '永久'
                    ? <Text style={STYLE.topRightFont}>
                      <Text>{validDay}</Text>有效
                    </Text>
                    : <Text style={STYLE.topRightFont}>
                      {
                        validEndDay === nowValidDay
                          ? '今日'
                          : validDay + ' '
                      }
                      <Text style={{color: 'rgba(0,0,0,1)'}}>{validHour}</Text>前有效
                    </Text>
                }
              </View>
            </View>

            {
              userType && userId !== item.userId
                ? <View>
                  <View style={STYLE.line}></View>

                  <View style={[STYLE.top, {alignItems: 'center'}]}>
                    <Text
                      style={[STYLE.fontMiddle, {width: scaleSize(420)}]}
                      numberOfLines={1}
                      ellipsizeMode={'middle'}
                    >
                      {item.userTrueName || '暂无数据'}<Text> | </Text>{item.userDeptName || '暂无数据'}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[STYLE.phoneWarp, STYLE.topRight]}
                      onPress={() => {
                        this.callPhone(item.userPhoneNumber || '')
                      }}
                    >
                      <Image
                        style={STYLE.topImg}
                        source={require('./../../../images/icons/phone2.png')}
                        alt='图标'
                      />
                      <Text style={{fontSize: scaleSize(24), color: 'rgba(75,106,197,1)'}}>拨打电话</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                : null
            }
          </View>
        </TouchableOpacity>
      )
    } else if (key === 2) {
      renderContent = (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          style={STYLE.click}
          onPress={() => {
            this.gotoSelectInfo(type, visitId, {}, item.visitStatus)
          }}
        >
          <View style={STYLE.warp}>
            <View style={STYLE.top}>
              <Text style={STYLE.topRightFont}>
                单号：<Text>{item.reportNumber || ''}</Text>
              </Text>
              <Text style={{fontSize: scaleSize(28), color: 'rgba(254,81,57,1)'}}>
                {
                  item.visitStatus === 0
                    ? '未确认'
                    : '到访已确认'
                }
              </Text>
            </View>

            <View style={STYLE.line}></View>

            <View>
              <View style={[STYLE.top, {alignItems: 'flex-start'}]}>
                <View style={STYLE.topRight}>
                  {
                    item.customerSex === 0
                      ? <Image
                        style={STYLE.topImg}
                        source={require('./../../../images/icons/woman2.png')}
                        alt='图标'
                      />
                      : <Image
                        style={STYLE.topImg}
                        source={require('./../../../images/icons/man2.png')}
                        alt='图标'
                      />
                  }
                  <Text style={STYLE.contentFont}>{item.customerName || ''}</Text>
                  <Text style={[STYLE.contentFont, {marginLeft: scaleSize(8), fontSize: scaleSize(24)}]}>{grade}</Text>
                </View>
                <View style={STYLE.contentPhones}>
                  {
                    item.customerPhoneList.map((item, index) => {
                      if (index === 0) {
                        return (
                          <Text style={STYLE.contentFont} key={index}>{item.customerPhone || ''}</Text>
                        )
                      }

                      return (
                        <Text style={STYLE.contentPhonesFont} key={index}>{item.customerPhone || ''}</Text>
                      )
                    })
                  }
                </View>
              </View>
              <View style={[STYLE.topRight, {marginTop: scaleSize(16), justifyContent: 'flex-start'}]}>
                <Text style={STYLE.buildingTypeText}>{item.buildingType || ''}</Text>
                <Text
                  style={STYLE.fontMiddle}
                  numberOfLines={1}
                  ellipsizeMode={'middle'}
                >
                  {item.buildingFullName || ''}
                </Text>
              </View>
            </View>

            <View style={STYLE.line}></View>

            <View style={[STYLE.top, {alignItems: 'center'}]}>
              <View>
                <Text style={{fontSize: scaleSize(24), color: 'rgba(134,134,134,1)'}}>
                  报备时间：
                  <Text style={{color: 'rgba(0,0,0,1)'}}>{visitReportTime}</Text>
                </Text>
                <Text style={{fontSize: scaleSize(24), color: 'rgba(134,134,134,1)'}}>
                  到访时间：
                  <Text style={{color: 'rgba(0,0,0,1)'}}>{visitTime}</Text>
                </Text>
              </View>

              {
                item.visitStatus === 1
                  ? <View style={STYLE.contentTimeWarp}>
                    <Text style={{fontSize: scaleSize(36), color: 'rgba(254,81,57,1)'}}>{day}</Text>
                    <Text style={{fontSize: scaleSize(24), color: 'rgba(134,134,134,1)'}}>保护期/天</Text>
                  </View>
                  : null
              }

            </View>

            {
              userType && userId !== item.userId
                ? <View>
                  <View style={STYLE.line}></View>

                  <View style={[STYLE.top, {alignItems: 'center'}]}>
                    <Text
                      style={[STYLE.fontMiddle, {width: scaleSize(420)}]}
                      numberOfLines={1}
                      ellipsizeMode={'middle'}
                    >
                      {item.userTrueName || '暂无数据'}<Text> | </Text>{item.userDeptName || '暂无数据'}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[STYLE.phoneWarp, STYLE.topRight]}
                      onPress={() => {
                        this.callPhone(item.userPhoneNumber || '')
                      }}
                    >
                      <Image
                        style={STYLE.topImg}
                        source={require('./../../../images/icons/phone2.png')}
                        alt='图标'
                      />
                      <Text style={{fontSize: scaleSize(24), color: 'rgba(75,106,197,1)'}}>拨打电话</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                : null
            }
          </View>
        </TouchableOpacity>
      )
    } else {
      renderContent = (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          style={STYLE.click}
          onPress={() => {
            this.gotoSelectInfo(type, invalidId)
          }}
        >
          <View style={STYLE.warp}>
            <View style={STYLE.top}>
              <Text style={STYLE.topRightFont}>
                单号：<Text>{item.reportNumber || ''}</Text>
              </Text>
              <View style={STYLE.topRight}>
                <Image
                  style={STYLE.topImg}
                  source={require('./../../../images/icons/time2.png')}
                  alt='图标'
                />
                <Text style={STYLE.topRightFont}>{reportTime}</Text>
              </View>
            </View>

            <View style={STYLE.line}></View>

            <View>
              <View style={[STYLE.top, {alignItems: 'flex-start'}]}>
                <View style={STYLE.topRight}>
                  {
                    item.customerSex === 0
                      ? <Image
                        style={STYLE.topImg}
                        source={require('./../../../images/icons/woman2.png')}
                        alt='图标'
                      />
                      : <Image
                        style={STYLE.topImg}
                        source={require('./../../../images/icons/man2.png')}
                        alt='图标'
                      />
                  }
                  <Text style={STYLE.contentFont}>{item.customerName || ''}</Text>
                  <Text style={[STYLE.contentFont, {marginLeft: scaleSize(8), fontSize: scaleSize(24)}]}>{grade}</Text>
                </View>
                <View style={STYLE.contentPhones}>
                  {
                    item.customerPhoneList.map((item, index) => {
                      if (index === 0) {
                        return (
                          <Text style={STYLE.contentFont} key={index}>{item.customerPhone || ''}</Text>
                        )
                      }

                      return (
                        <Text style={STYLE.contentPhonesFont} key={index}>{item.customerPhone || ''}</Text>
                      )
                    })
                  }
                </View>
              </View>
              <View style={[STYLE.top, {marginTop: scaleSize(16), alignItems: 'center'}]}>
                <View>
                  <View style={STYLE.topRight}>
                    <Text style={STYLE.buildingTypeText}>{item.buildingType || ''}</Text>
                    <Text
                      style={STYLE.fontMiddle}
                      numberOfLines={1}
                      ellipsizeMode={'middle'}
                    >
                      {item.buildingFullName || ''}
                    </Text>
                  </View>
                  <Text style={STYLE.contentTime}>
                    到访时间：
                    <Text style={{color: 'rgba(0,0,0,1)'}}>{visitTime}</Text>
                  </Text>
                </View>
                <View style={{}}>
                  <Image
                    style={{width: scaleSize(140), height: scaleSize(141)}}
                    source={require('./../../../images/icons/shixiao2.png')}
                    alt='印章'
                  />
                </View>
              </View>
            </View>

            <View style={STYLE.line}></View>

            <View style={[STYLE.top, {alignItems: 'center'}]}>
              <Text>
                {item.userTrueName || '暂无数据'}<Text> | </Text>{item.userDeptName || '暂无数据'}
              </Text>
              <View style={[STYLE.noPhoneWarp, STYLE.topRight]}>
                <Image
                  style={STYLE.topImg}
                  source={require('./../../../images/icons/nophone2.png')}
                  alt='图标'
                />
                <Text style={{fontSize: scaleSize(24), color: 'rgba(134,134,134,1)'}}>拨打电话</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )
    }

    return (
      renderContent
    )
  }

  render() {
    let {visible, qCoderContent, loading} = this.state;
    let logoImg = require('../../../images/pictures/ic_launcher.png');
    console.log('dataSource', this.state.dataSource);
    return (
      <>
        <Search
          navigation={this.props.navigation}
          type='group'
          placeholder='请输入姓名或手机号码'
          loading={loading}
          dataSource={this.state.dataSource}
          renderTitle={this.renderTitle}
          renderItem={this.renderItem}
          onPressSearch={this.handlePressSearch}
          onPressHistory={this.handlePressHistory}
          onLoadMore={this.handleLoadMore}
          onRefresh={this.handleRefresh}
        />

        <Modal
          visible={visible}
          transparent={true}
          type='basic'
          width={541}
          height={633}
          title={''}
          footerType={'two'}
          confirmText={'填写带看确认单'}
          cancelText={'复制报备信息'}
          onOk={this.onOk}
          onClose={this.onClose}
          onRequestClose={this.onRequestClose}
        >
          <View style={STYLE.modalQRCodeWarp}>
            <View style={{marginTop: scaleSize(77), marginBottom: scaleSize(32)}}>
              <QRCode
                value={qCoderContent}
                logo={logoImg}
                logoBorderRadius={1}
                color={'#191919'}
                backgroundColor={'#ffffff'}
                logoSize={38}
                size={160}
              />
            </View>
            <Text style={STYLE.modalQRCodeText}>出示二维码给项目经理确认</Text>
          </View>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = ({config, user, point}) => {
  return {
    config,
    user,
    sendPoint: point.buryingPoint
  }
}

export default connect(mapStateToProps)(ReportSearch);
