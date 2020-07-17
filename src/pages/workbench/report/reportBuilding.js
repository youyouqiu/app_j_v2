import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Image, DeviceEventEmitter, ActivityIndicator, Animated, Easing, Switch, Dimensions, FlatList} from 'react-native';
import {connect} from 'react-redux';
// import {Toast} from '@new-space/teaset';
import moment from 'moment';
import {buildingDataApi, ruleDataApi} from './../../../services/report';
import BaseContainer from '../../../components/Page';
import NoData from './../../../businessComponents/noData';
import {STYLE} from './style';
import {debounce} from './../../../utils/utils'
import {Checkbox} from '@new-space/teaset'
import {scaleSize} from '@/utils/screenUtil';

const {width: D_WIDTH} = Dimensions.get('window');


class ReportBuilding extends Component {

    pageParams = {
        pageIndex: 0,
        totalCount: 0,
        pageSize: 10,
        hasMore: true,
    };

    constructor(props) {
        super(props);
        this.state = {
            showFooterComponent: true,
            showEmptyComponent: false,
            initError: false,
            isRefreshing: false,
            buildingId: '', // 楼盘 id
            buildingList: [], // 楼盘列表数据
            checkedBuildingList: [], // 选中的楼盘列表
            buildingRuleData: {}, // 报备规则数据
            isMultiple: false, // 是否是多选
            animateValue: new Animated.Value(scaleSize(-60)),
            fromCus: false
        }
    };

    componentDidMount() {
        this.initData();
        let fromCus = this.props?.navigation?.state?.params?.fromCus
        this.setState({
            fromCus
        })
    }
    

    componentWillUnmount() {
        // 移除监听
        if (this.listener) {
            this.listener.remove();
        }
    }

    // 楼盘列表接口
    initData = async () => {
        const {user, config} = this.props;
        const {pageIndex, pageSize} = this.pageParams;
        const requestData = {
            keyWord: '',
            pageIndex,
            pageSize,
            city: ((user || {}).userInfo || {}).city || '',
        };
        const res = await buildingDataApi(config.requestUrl.api, requestData);
        const {code, extension, totalCount} = res;
        if (code === '0') {
            this.pageParams.hasMore = (pageIndex + 1) * pageSize < totalCount;
            //判断pageIndex===0，为了防止刷新操作清空buildingList会导致onEndReached调用一次，故在刷新是不清空buildingList，在此处作判断
            this.setState(prevState => ({
                buildingList: pageIndex === 0 ? extension : [...prevState.buildingList, ...extension],
                showEmptyComponent: [...prevState.buildingList, ...extension].length === 0,
                showFooterComponent: [...prevState.buildingList, ...extension].length > 0,
                initError: false,
                isRefreshing: false,
            }))
        } else {
            this.setState({
                initError: true
            })
        }
    };

    _onRefresh = async () => {
        this.pageParams.pageIndex = 0;
        this.setState({
            isRefreshing: true,
            showFooterComponent: false
        });
        this.initData();
    };

    _onEndReached = async () => {
        const {hasMore} = this.pageParams;
        const {isRefreshing} = this.state;
        if (hasMore && !isRefreshing) {
            debounce(() => {
                this.pageParams.pageIndex++;
                this.initData()
            }, 500)();
        }
    };

    // 跳转搜索页面
    gotoSearchPage = () => {
        const {navigation} = this.props;
        let params = navigation?.state?.params || {}
        const {isMultiple, checkedBuildingList} = this.state
        params = {...params, isMultiple, checkedBuildingList, callBack: this.callBackChange}
        this.props.navigation.navigate('bulidingSearch', params);
    };

    callBackChange = ({isMultiple, checkedBuildingList}) => {
        Animated.timing(
            this.state.animateValue,
            {
                toValue: isMultiple ? 0 : scaleSize(-60),
                duration: 20,
            }
        ).start()
        this.setState({
            isMultiple,
            checkedBuildingList
        })
    }

    closeMore = (id) => {
        let {buildingRuleData} = this.state;
        buildingRuleData[id] = {
            status: false,
            rule: buildingRuleData[id].rule
        };
        this.setState({buildingRuleData})
    };

    // 报备规则接口
    initRuleData = async (buildingId) => {
        let {buildingRuleData} = this.state;
        if (buildingRuleData[buildingId]) {
            buildingRuleData = {
                ...buildingRuleData,
                [buildingId]: {
                    status: true,
                    rule: buildingRuleData[buildingId].rule
                }
            };
            this.setState({buildingRuleData})
        } else {
            let {api} = this.props.config.requestUrl;
            try {
                let res = await ruleDataApi(api, buildingId);
                if (res && res.code === '0') {
                    buildingRuleData[buildingId] = {
                        status: true,
                        rule: res.extension
                    };
                    this.setState({buildingRuleData})
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    // 楼盘选择
    onBuildingData = (id, buildingId, name) => {
        let {navigation} = this.props;
        let {fromCus} = this.state
        if (fromCus) {
            // 判断从客户列表的选择项目
            let param = {
                buildTreeId: id,
                buildingId,
                buildingName: name
            };
            navigation.goBack();
            DeviceEventEmitter.emit('ReportBack', param)
        } else {
            let selectBuildingInfo = {
                buildingId,
                buildTreeId: id,
                buildingName: name,
            };
            DeviceEventEmitter.emit('buildingData', [selectBuildingInfo]);
            this.props.navigation.navigate('addReport');
        }
    };

    multReport = () => {
        const list = this.state.checkedBuildingList.reduce((res, curr) => {
            res.push({
                buildTreeId: curr.id,
                buildingId: curr.buildingId,
                buildingName: curr.name
            });
            return res;
        }, []);
        DeviceEventEmitter.emit('buildingData', list);
        this.props.navigation.navigate('addReport');
    };

    onErrorPress = () => {
        this.pageParams.pageIndex = 0;
        this.setState({
            showFooterComponent: false
        });
        this.initData();
    };

    transRule = (buildingRuleData) => {
        let reportTime = '暂无数据';
        let StartTime = '暂无数据';
        let EndTime = '暂无数据';
        let newTime = '暂无数据';
        let beltProtectDay = '暂无数据';
        let validityDay = '暂无数据';

        if (buildingRuleData.reportTime) {
            reportTime = moment(buildingRuleData.reportTime).format('YYYY-MM-DD HH:mm');
        }

        if (buildingRuleData.liberatingStart) {
            StartTime = moment(buildingRuleData.liberatingStart).format('HH:mm');
        }

        if (buildingRuleData.liberatingEnd) {
            EndTime = moment(buildingRuleData.liberatingEnd).format('HH:mm');
        }

        if (buildingRuleData.beltProtectDay === 99999) {
            beltProtectDay = '永久';
        } else if (buildingRuleData.beltProtectDay === 0) {
            beltProtectDay = '当天'
        } else if (buildingRuleData.beltProtectDay) {
            beltProtectDay = `${buildingRuleData.beltProtectDay}天`;
        }

        if (buildingRuleData.validityDay === 0) {
            validityDay = '当天';
        } else if (buildingRuleData.validityDay === 99999) {
            validityDay = '永久';
        } else if (buildingRuleData.validityDay) {
            validityDay = `${buildingRuleData.validityDay}天`;
        }

        newTime = `${StartTime} - ${EndTime}`;
        return {reportTime, validityDay, beltProtectDay, newTime}
    };

    transRuleReportPhone = (rule) => {
        if (!rule) return '前三后四';
        const ruleSplit = rule.split(',');
        const num = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一'];
        if (parseInt(ruleSplit[0]) === 11) {
            return '全号码'
        } else {
            return '前' + num[parseInt(ruleSplit[0])] + '后' + num[parseInt(ruleSplit[1])]
        }
    };

    _renderItem = (curr) => {
      const {item, index} = curr;
      const {buildingRuleData = {}, isMultiple, checkedBuildingList} = this.state;
      const buildingRule = buildingRuleData[item.id] || {};
      const {reportTime, validityDay, beltProtectDay, newTime} = this.transRule(buildingRule.rule || {});
      let checked = checkedBuildingList.findIndex(it => it.id === item.id) !== -1
      return (
        <View style={[STYLE.rb_flatList_item]} key={index}>
          <View style={{width:scaleSize(60)}}>
              {isMultiple?(
                  <Checkbox
                      checked={checked}
                      disabled={checkedBuildingList.length === 5 && !checked}
                      onChange={() => this.onChangeCheck(item)}
                      checkedIcon={<Image style={STYLE.checkedImg} key='icon' source={require('@/images/icons/checked_green.png')} />}
                      uncheckedIcon={<Image style={STYLE.checkedImg} key='icon' source={require('@/images/icons/unchecked.png')} />}
                  />
              ):null}
          </View>
          <View style={[STYLE.rb_item_container]}>
            <TouchableOpacity activeOpacity={1} onPress={() => {
              isMultiple ? this.onChangeCheck(item) : this.onBuildingData(item.id, item.buildingId, item.name)
              }} style={STYLE.rb_item_container_top}
              disabled={checkedBuildingList.length === 5 && !checked}
            >
              <View style={STYLE.rb_item_content}>
                <View style={STYLE.rb_item_column}>
                  <Text style={STYLE.buildingTypeText}>{item.buildingType || ''}</Text>
                  <Text style={STYLE.rb_item_buildingName} numberOfLines={1}>
                    {item.name}
                  </Text>
                </View>
                <View style={STYLE.rb_item_column}>
                  <Text style={STYLE.rb_item_label} numberOfLines={1}>{item.areaFullName}</Text>
                </View>
                <View style={STYLE.rb_item_column}>
                  <Image source={require('../../../images/icons/user.png')} style={STYLE.user_icon}/>
                  <Text style={STYLE.rb_item_label} numberOfLines={1}>
                    项目经理：<Text style={STYLE.rb_item_value}>{item.residentUser || '暂无'}</Text>
                  </Text>
                </View>
                <View style={STYLE.rb_item_column}>
                  <Image source={require('../../../images/icons/reportPhone.png')} style={STYLE.user_icon}/>
                  <Text style={STYLE.rb_item_label} numberOfLines={1}>
                    报备号码：<Text style={STYLE.rb_item_value}>{this.transRuleReportPhone(item.rule || '')}</Text>
                  </Text>
                </View>
              </View>
              {
                isMultiple
                ?
                null
                :
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={STYLE.rb_item_report_btn}
                  onPress={() => this.onBuildingData(item.id, item.buildingId, item.name)}>
                  <Text style={STYLE.rb_item_report_btn_text}>去报备</Text>
                </TouchableOpacity>
              }
            </TouchableOpacity>

            <View style={STYLE.rb_item_rule_wrapper}>
              <Image source={require('../../../images/pictures/dottedLine.png')} style={STYLE.rb_item_rule_dottedLine}/>
              <View style={STYLE.rb_item_rule_header}>
                <Text style={STYLE.rb_rule_header_text}>报备规则</Text>
                {buildingRule && buildingRule.status ? (
                  <Text style={STYLE.rb_rule_header_close} onPress={() => this.closeMore(item.id)}>收起</Text>
                ) : (
                  <Text style={STYLE.rb_rule_header_more} onPress={() => this.initRuleData(item.id)}>查看更多</Text>
                )}
              </View>
              {buildingRule && buildingRule.status && (
                <View style={STYLE.rb_item_rule_body}>
                  <View style={STYLE.rb_item_rule_top}>
                    <Text style={STYLE.rb_item_rule_text} numberOfLines={1}>报备有效期：{validityDay}</Text>
                    <Text style={STYLE.rb_item_rule_text}>带看保护期：{beltProtectDay}</Text>
                  </View>
                  <Text style={STYLE.rb_item_rule_text}>报备开始时间：{reportTime || '暂无数据'}</Text>
                  <Text style={STYLE.rb_item_rule_text}>接访时间：{newTime || '暂无数据'}</Text>
                  <Text style={STYLE.rb_item_rule_text}>覆盖房源：{(buildingRule.rule.housingResources || []).join('，') || '暂无数据'}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      )
    };

    onChangeCheck = (item) => {
        let {checkedBuildingList = []} = this.state
        let i = checkedBuildingList.findIndex(it => it.id === item.id)
        if (i === -1) {
            checkedBuildingList.push(item)
        } else {
            checkedBuildingList.splice(i, 1)
        }
        this.setState({checkedBuildingList: [...checkedBuildingList]})
    }

    _listFooterComponent = () => {
        const {hasMore} = this.pageParams;
        if (hasMore) {
            return <View style={STYLE.rb_footer_loading}><ActivityIndicator/></View>
        } else {
            return <View style={STYLE.rb_footer_loading}><Text style={STYLE.rb_footer_loading_text}>～没有更多数据～</Text></View>
        }
    };

    multiple = () => {
        let {isMultiple, checkedBuildingList} = this.state;
        Animated.timing(
            this.state.animateValue,
            {
                toValue: isMultiple ? scaleSize(-60) : 0,
                duration: 200,
                easing: Easing.Linear,
            }
        ).start();
        this.setState({
            isMultiple: !isMultiple,
            checkedBuildingList: isMultiple ? [] : checkedBuildingList
        })
    }


    render() {
    const {
      buildingList,
      isRefreshing,
      showEmptyComponent,
      showFooterComponent,
      initError,
      isMultiple,
      checkedBuildingList,
      fromCus,
      animateValue
    } = this.state;
    const pageError = {
      isError: initError,
      onErrorPress: this.onErrorPress
    };
    const renderFooter = () => {
      if (fromCus) return null
      return <View style={STYLE.checkedBtn}>
        <View style={STYLE.checkedBtnSwitch}>
          <Switch value={isMultiple} trackColor={{false: '#868686', true: '#4EDC4F'}} onValueChange={this.multiple}/>
          <Text style={STYLE.checkedBtnSwitchText}>{isMultiple ? '多盘报备已开启' : '多盘报备已关闭'}</Text>
        </View>
        <TouchableOpacity style={STYLE.checkedBtnTouch} activeOpacity={0.8} onPress={this.multReport}>
          <Text style={STYLE.checkedBtnText}>报备选中的楼盘（{checkedBuildingList.length} / 5）</Text>
        </TouchableOpacity>
      </View>
    }
    return (
      <BaseContainer footerStyle={STYLE.buildFooter} footer={renderFooter()} scroll={false} error={pageError} title='楼盘选择' bodyStyle={{padding: 0, backgroundColor: 'rgba(248,248,248,1)'}}>
        <View style={STYLE.bulidingSearchWarp}>
          <TouchableOpacity style={STYLE.bulidingSearchBtn} activeOpacity={0.8} onPress={this.gotoSearchPage}>
            <Image style={STYLE.topImg} source={require('../../../images/icons/searchCus.png')}/>
            <Text>请输入楼盘名称</Text>
          </TouchableOpacity>
        </View>
          <Animated.View style={{marginLeft: animateValue, width: D_WIDTH + scaleSize(60)}}>
              <FlatList
                  style={[STYLE.flatList]}
                  data={buildingList}
                  extraData={this.state}
                  refreshing={isRefreshing}
                  onRefresh={this._onRefresh}
                  onEndReachedThreshold={0.1}
                  onEndReached={this._onEndReached}
                  renderItem={(curr) => this._renderItem(curr)}
                  ListEmptyComponent={showEmptyComponent ? <NoData tips='抱歉，没有相关信息' style={{marginTop: '50%'}}/> : null}
                  ListFooterComponent={showFooterComponent ? this._listFooterComponent : null}>
              </FlatList>
          </Animated.View>

      </BaseContainer>
    )
  }
}

const mapStateToProps = ({config, user}) => {
    return {config, user}
}

export default connect(mapStateToProps)(ReportBuilding);
