import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, DeviceEventEmitter, ScrollView,
  TextInput, FlatList, Switch, ActivityIndicator, Animated, Easing, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import {buildingDataApi, ruleDataApi, buildingSearchApi, nearbyBuildingList} from '../../../services/report';
import {STYLE} from './style';
import storage from '@/utils/storage';
import {STORAGE_KEY} from '@/constants';
import {debounceLast} from '@/utils/utils'
import {Checkbox} from '@new-space/teaset'
import { scaleSize } from '@/utils/screenUtil';
const {width: D_WIDTH} = Dimensions.get('window');

class BulidingSearch extends Component {

    commonData = {
        onEndReacheding: false
    };

    pageParams = {
        pageSize: 10,
        pageIndex: 0,
        totalCount: 0,
        hasMore: true
    };

    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            nearbyLoading: false,
            loading: false,
            refreshing: false,
            visible: false, // 弹窗状态
            bulidingSearchList: [], // 报备数据
            bulidingTotalCount: 0,
            buildingRuleData: {}, // 报备规则
            preselectionList: [],
            reportId: '', // 报备 id
            reportInfo: {}, // 选中的报备信息
            buildingList: [],
            keyWordsHistory: [],
            checkedBuildingList: [],
            inputText: '',
            nearbyMain: {},
            pageStatus: 'history', // history 历史记录， preselection 预选列表  showNearby 展示附近楼盘  buildingList 楼盘列表
            isMultiple: false,
            nearbyBuildingList: [],
            fromCus: false,
            animateValue: new Animated.Value(-60),
        }
    }

    componentDidMount() {
        this.getKeyWordsHistory();
        let params = this.props?.navigation?.state?.params || {}
        this.setState({
          isMultiple: params.isMultiple,
          checkedBuildingList: params.checkedBuildingList || [],
          fromCus: params.fromCus,
          animateValue: new Animated.Value(params.isMultiple ? 0 : scaleSize(-60))
        })
    }

    componentWillUnmount () {
      const {isMultiple, checkedBuildingList} = this.state
      let {callBack} = this.props?.navigation?.state?.params
      callBack && callBack({isMultiple, checkedBuildingList})
    }

    getKeyWordsHistory = async () => {
        const keywords = await storage.get(STORAGE_KEY.REPORT_KEY_WORDS).catch(() => {
            this.setState({
                keyWordsHistory: []
            })
        });
        if (!keywords) return;
        this.setState({
            keyWordsHistory: keywords
        })
    };

    /*点击历史记录*/
    handlePressHistory = (keyword) => {
        this.setState({
            inputText: keyword
        }, () => {
            this.doSearch();
        });

    };

    /*收起报备规则*/
    closeMore = (id) => {
        let {buildingRuleData} = this.state;
        buildingRuleData[id] = {
            status: false,
            rule: buildingRuleData[id].rule
        };
        this.setState({buildingRuleData})
    };

    /*报备规则接口*/
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
            this.setState({buildingRuleData});
        } else {
            let {api} = this.props.config.requestUrl;
            try {
                let res = await ruleDataApi(api, buildingId);
                if (res && res.code === '0') {
                    buildingRuleData[buildingId] = {
                        status: true,
                        rule: res.extension
                    };
                    this.setState({buildingRuleData});
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    // 楼盘选择
    onBuildingData = (id, buildingId, name) => {
        let {fromCus} = this.state;
        if (fromCus) {
            // 判断从客户列表的选择项目(搜索楼盘时)
            let param = {
                buildTreeId: id,
                buildingId,
                buildingName: name
            };
            this.props.navigation.navigate('customerList');
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

    cleanInputText = () => {
        this.setState({
            inputText: '',
            preselectionList: [],
            pageStatus: 'history',
        })
    };

    onChangeText = (inputText) => {
        this.pageParams.pageIndex = 0
        // inputText = inputText.replace(/\s+/g, '')
        if (inputText && !inputText.replace(/\s+/g, '')) {
          this.setState({
            preselectionList: [],
            pageStatus: 'history',
            inputText: '',
          })
          return
        }
        this.setState({
          inputText: inputText,
          pageStatus: 'preselection',
        }, () => {
          debounceLast(this.searchPreselectiontBuildList, 300)()
        })
    };

    searchPreselectiontBuildList = async () => {
      try {
        const {user} = this.props;
        let requestData = {
          pageIndex: 0,
          pageSize: 10,
          keyWord: this.state.inputText,
          city: user?.userInfo?.city || '',
        }
        let res = await buildingSearchApi(requestData)
        this.setState({
          preselectionList: res.extension || [],
        })
      } catch (e) {
        console.log(e)
      }
    }

    doSearch = async () => {
        try {
            let {inputText} = this.state;
            const {pageSize, pageIndex} = this.pageParams;
            if (pageIndex === 0) {
                await this.setState({
                    buildingList: [],
                    pageStatus: 'loading'
                })
            }
            const {user} = this.props;
            inputText = inputText.replace(/\s+/g, '');
            inputText && this.storeKeyWorks(inputText);
            let requestData = {
                pageIndex,
                pageSize,
                keyWord: inputText,
                city: user?.userInfo?.city || '',
            };
            let result = await buildingDataApi(this.props.config.requestUrl.api, requestData);
            const {totalCount, code, extension} = result;
            if (code === '0') {
              // 只查出来一条数据的时候
              if (pageIndex === 0 && extension.length === 1) {
                this.setState({
                  pageStatus: 'showNearby',
                  nearbyMain: extension[0],
                  refreshing: false,
                  nearbyBuildingList: [],
                  nearbyLoading: true,
                }, this.getNearbyBuilding)
                return
              }
              this.pageParams.hasMore = (pageIndex + 1) * pageSize < totalCount;
              this.setState((prev) => ({
                buildingList: [...prev.buildingList, ...extension],
                refreshing: false,
                pageStatus: 'buildingList'
              }))
            }
        } finally {
            this.commonData.onEndReacheding = false;
            // this.setState({})
        }
    };

    getNearbyBuilding = async () => {
      const {nearbyMain = {}} = this.state
      const {user} = this.props
      if (!nearbyMain.id) return
      let requestData = {
        islocking: true,
        pageIndex: 0,
        pageSize: 5,
        userLongitude: nearbyMain.longitude,
        userLatitude: nearbyMain.latitude,
        city: user?.userInfo?.city || '',
        orderBy: 1,
      }
      try {
        let result = await nearbyBuildingList(requestData);
        let {code, extension = []} = result
        extension = extension.filter(item => item.id !== nearbyMain.id)
        if (code === '0') {
          this.setState({
            nearbyBuildingList: extension,
          })
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.setState({
          nearbyLoading: false
        })
      }
    }

    storeKeyWorks = async (keyword) => {
        const keywords = await storage.get(STORAGE_KEY.REPORT_KEY_WORDS).catch(() => {
            storage.set(STORAGE_KEY.REPORT_KEY_WORDS, [keyword])
        });
        if (!keywords) return;
        if (keywords.includes(keyword)) {
            const db_keywords = keywords.filter(item => {
                return item !== keyword
            });
            const _keywords = [keyword, ...db_keywords];
            await storage.set(STORAGE_KEY.REPORT_KEY_WORDS, _keywords)
        } else {
            await storage.set(STORAGE_KEY.REPORT_KEY_WORDS, [keyword, ...keywords])
        }
    };

    onRefresh = () => {
      const {pageStatus} = this.state
      if (pageStatus === 'preselection') return
      this.pageParams.pageIndex = 0;
      this.pageParams.hasMore = true;
      this.setState({
          buildingList: [],
          refreshing: true
      });
      this.doSearch();
    };

    onEndReached = () => {
      const {pageStatus} = this.state
      if (pageStatus === 'preselection') return
      this.commonData.onEndReacheding = true;
      const {onEndReacheding} = this.commonData;
      const {hasMore} = this.pageParams;
      if (!hasMore && onEndReacheding) return;
      this.pageParams.pageIndex++;
      this.doSearch();
    };

    cleanStorage = () => {
        storage.remove(STORAGE_KEY.REPORT_KEY_WORDS);
        this.setState({
            keyWordsHistory: []
        })
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

    onChangeCheck = (item) => {
      let {checkedBuildingList = []} = this.state
      let i = checkedBuildingList.findIndex(it => it.id === item.id)
      if (i === -1) {
        checkedBuildingList.push(item)
      } else {
        checkedBuildingList.splice(i, 1)
      }
      this.setState({checkedBuildingList: [...checkedBuildingList]})
      let {callBack} = this.props?.navigation?.state?.params
      callBack && callBack({isMultiple: true, checkedBuildingList: checkedBuildingList})
    }

    renderBuildItem = ({item, index}) => {
        const {buildingRuleData = {}, isMultiple,checkedBuildingList} = this.state;
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
              <TouchableOpacity activeOpacity={1}
                disabled={checkedBuildingList.length === 5 && !checked}
                onPress={() =>{isMultiple ? this.onChangeCheck(item) : this.onBuildingData(item.id, item.buildingId, item.name)}}
                style={STYLE.rb_item_container_top}
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

    renderPreselection = ({item}) => {
      return <TouchableOpacity style={STYLE.preselectionBuildItem} onPress={() => {this.setState({inputText: item.name}, this.doSearch)}}>
        <Image style={STYLE.preselectionIcon} source={require('@/images/icons/search.png')}/>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    }

    listFooterComponent = () => {
        const {hasMore} = this.pageParams;
        const {pageStatus} = this.state;
        if (pageStatus === 'history') return null;
        return (
            hasMore ? (
                <View style={STYLE.bs_footerContent}>
                    <ActivityIndicator/>
                    <Text style={STYLE.bs_footerText}>&emsp;加载中</Text>
                </View>
            ) : (
                <View style={STYLE.bs_footerContent}>
                    <Text style={STYLE.bs_footerText}>没有更多了</Text>
                </View>
            )
        )
    };

    renderItemSeparatorComponent = () => {
      return <View style={STYLE.lineSepar}></View>
    }

    multiple = () => {
      let {isMultiple} = this.state
      Animated.timing(
        this.state.animateValue,
        {
          toValue: isMultiple ? scaleSize(-60) : 0,
          duration: 200,
          easing: Easing.Linear,
        }
      ).start()
      this.setState({
        isMultiple: !isMultiple,
        checkedBuildingList: []
      })
      let {callBack} = this.props?.navigation?.state?.params
      callBack && callBack({isMultiple: !isMultiple, checkedBuildingList: []})
    }

    render() {
      const {
        buildingList,
        keyWordsHistory,
        pageStatus,
        refreshing,
        inputText,
        preselectionList,
        nearbyMain,
        nearbyBuildingList,
        isMultiple,
        checkedBuildingList = [],
        fromCus,
        nearbyLoading,
        animateValue
      } = this.state;

      const renderFooter = () => {
        if (fromCus) return null
        return <View style={STYLE.checkedBtn}>
          <View style={STYLE.checkedBtnSwitch}>
            <Switch value={isMultiple} trackColor={{false: '#868686', true: '#4EDC4F'}} onValueChange={this.multiple}/>
            <Text style={STYLE.checkedBtnSwitchText}>{isMultiple ? '多盘报备已开启' : '多盘报备已关闭'}</Text>
          </View>
          <TouchableOpacity style={STYLE.checkedBtnTouch}  activeOpacity={0.8} onPress={this.multReport}>
            <Text style={STYLE.checkedBtnText}>报备选中的楼盘（{checkedBuildingList.length} / 5）</Text>
          </TouchableOpacity>
        </View>
      }
    return (
      <View style={STYLE.bs_wrapper}>
        <View style={[STYLE.bs_wrapper_content, {marginBottom: fromCus ? 0 : scaleSize(140)}]}>
          {/*搜索栏*/}
          <View style={STYLE.bs_header}>
              <View style={STYLE.bs_header_input_content}>
                  <Image source={require('../../../images/icons/searchCus.png')} style={STYLE.bs_header_search_icon}/>
                  <TextInput
                      onChangeText={this.onChangeText}
                      value={inputText}
                      keyboardType='default'
                      maxLength={50}
                      onSubmitEditing={this.doSearch}
                      returnKeyType='search'
                      placeholder='请输入楼盘名称'
                      style={STYLE.bs_header_input}
                      placeholderTextColor='#CBCBCB'/>
                  <TouchableOpacity onPress={this.cleanInputText}>
                      <Image source={require('../../../images/icons/cleanInput.png')} style={STYLE.bs_header_search_icon}/>
                  </TouchableOpacity>
              </View>

              <TouchableOpacity style={STYLE.bs_header_cancel_content} onPress={() => this.props.navigation.goBack()}>
                  <Text style={STYLE.bs_header_cancel}>取消</Text>
              </TouchableOpacity>
          </View>

          {/*搜索历史*/}
          {pageStatus === 'history' && (
              <View style={STYLE.bs_history_content}>
                  <View style={STYLE.bs_history_header}>
                      <Text style={STYLE.bs_history_header_text}>历史搜索</Text>
                      <TouchableOpacity onPress={this.cleanStorage} activeOpacity={0.8}>
                          <Image style={STYLE.bs_history_header_icon} source={require('../../../images/icons/delete.png')}/>
                      </TouchableOpacity>
                  </View>
                  <ScrollView style={STYLE.bs_history_body}>
                      {keyWordsHistory.map(item => (
                          <TouchableOpacity style={STYLE.bs_history_body_item} activeOpacity={0.8} onPress={() => this.handlePressHistory(item)}>
                              <Image style={STYLE.bs_history_header_icon} source={require('@/images/icons/clock.png')}/>
                              <Text style={STYLE.bs_history_body_text}>{item}</Text>
                          </TouchableOpacity>
                      ))}

                  </ScrollView>
              </View>
          )}

          {/*楼盘列表*/}
          {
            (pageStatus === 'buildingList') && <Animated.FlatList data={buildingList}
              onRefresh={this.onRefresh}
              extraData={this.state}
              style={{marginLeft: animateValue, width: D_WIDTH + scaleSize(60)}}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={0.1}
              ListFooterComponent={this.listFooterComponent}
              refreshing={refreshing}
              ItemSeparatorComponent={null}
              renderItem={this.renderBuildItem}
            />
          }
          {
            pageStatus === 'preselection' && <FlatList data={preselectionList}
              onRefresh={this.onRefresh}
              extraData={this.state}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={0.1}
              ListFooterComponent={null}
              refreshing={false}
              ItemSeparatorComponent={this.renderItemSeparatorComponent}
              renderItem={this.renderPreselection}
            />
          }
          {
            pageStatus === 'showNearby' && (
                <Animated.View style={{marginLeft: animateValue, width: D_WIDTH + scaleSize(60)}}>
                    <ScrollView style={{marginBottom: scaleSize(140)}}>
                        {this.renderBuildItem({index: 0, item: nearbyMain})}
                        {
                            nearbyLoading
                                ?
                                <View style={STYLE.bs_footerContent}>
                                    <ActivityIndicator/>
                                    <Text style={STYLE.bs_footerText}>&emsp;加载中</Text>
                                </View>
                                :
                                null
                        }
                        {
                            nearbyBuildingList.length > 0
                                ?
                                <View style={[STYLE.nearbyMain, {marginLeft: isMultiple ? scaleSize(-32) : scaleSize(32)}]}>
                                    <View style={STYLE.nearbyLine}/>
                                    <Text style={STYLE.nearbyText}>为您推荐的附近楼盘</Text>
                                    <View style={STYLE.nearbyLine} />
                                </View>
                                :
                                nearbyLoading
                                    ?
                                    null
                                    :
                                    <View style={STYLE.bs_footerContent}>
                                        <Text style={STYLE.bs_footerText}>未能搜索到此楼盘附近五公里内其它楼盘</Text>
                                    </View>
                        }
                        {
                            nearbyBuildingList.map(item => {
                                return this.renderBuildItem({index: 0, item})
                            })
                        }
                    </ScrollView>
                </Animated.View>
            )
          }
          {
            pageStatus === 'loading' ?
            <View style={STYLE.bs_footerContent}>
                <ActivityIndicator/>
                <Text style={STYLE.bs_footerText}>&emsp;加载中</Text>
            </View> : null
          }
        </View>
        <View style={STYLE.pageFooter}>
          {(pageStatus === 'buildingList' || pageStatus === 'showNearby') ? renderFooter() : null}
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({config, user}) => {
    return {config, user}
}

export default connect(mapStateToProps)(BulidingSearch);
