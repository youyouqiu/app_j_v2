// 微信客户动态日志

import React, { Component } from 'react'
import BaseContainer from '../../../../../components/Page'
import { connect } from 'react-redux'
import { View, StyleSheet, Image, Text, FlatList, RefreshControl, SectionList } from 'react-native'
import { scaleSize } from '../../../../../utils/screenUtil';
// import LoggerStep from './logger'
import ApiCustom from '../../../../../services/customManager'
import { Toast } from '@new-space/teaset'
import storage from '../../../../../utils/storage'
import moment from 'moment'

import { dl_style as styles } from './dl_style'


const WARNING = require('../../../../../images/icons/warning.png')

class DynamicLogging extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [],
            refreshing: false,
            listData: [],
            sectionData: []
        }
    };

    pageParams = {
        pageIndex: 0,
        pageSize: 20,
        totalCount: 0,
    };

    componentDidMount() {
        this.getCusDevelop()
    }

    // 获取用户动态
    getCusDevelop = async () => {
        const { pageSize, pageIndex } = this.pageParams;
        let { id, relationCustomerId, source } = this.props.navigation.state.params;
        let _id = source === 'weixin' ? id : relationCustomerId;
        let params = {
            pageIndex,
            pageSize,
            id: _id
        };
        try {
            let res = await ApiCustom.weChatDev(params);
            if (res.code === '0') {
                this.handleSectionData([...this.state.listData, ...res.extension]);
                this.setState(prevState => ({
                    listData: [...prevState.listData, ...res.extension]
                }), () => {
                    this.isNewInfo(this.state.listData)
                });
                this.pageParams.totalCount = res.totalCount
            } else {
                Toast.message('获取动态失败' + res.message || '');
                this.setState({ refreshing: false })
            }
        } catch (e) {
            Toast.message('获取动态失败');
            this.setState({ refreshing: false })
        }
    };


    handleSectionData = (res) => {
        const sections = [];

        const keyList = [];
        const titleList = [];
        const itemObjByCreateTime = {};
        res.map((v) => {
            //同一日为一个section，通过年+月+日相等进行判断
            const timeStr = v.createTime.substr(0, 10);
            if (!itemObjByCreateTime.hasOwnProperty(timeStr)) {
                keyList.push(timeStr);
                itemObjByCreateTime[timeStr] = [];
                titleList.push(v.createTime)
            }
            itemObjByCreateTime[timeStr].push(v);
        });
        keyList.map((v, i) => {
            const sectionItem = {};
            sectionItem.title = moment(titleList[i]).format('YYYY年MM月DD日');
            sectionItem.data = itemObjByCreateTime[v];
            sections.push(sectionItem)
        });
        this.setState({
            sectionData: sections
        })
    };

    // 判断是否为新动态
    isNewInfo = async (history) => {
        if (!history || history.length == 0) {
            return
        }
        storage.get('lookTime').then(lookTime => {
            let index = 0
            if (lookTime) {
                history.map((item, key) => {
                    if (item.createTime === lookTime) {
                        index = key - 1
                    }
                })
            }
            if (index >= 0 && index !== history.length - 1) {
                history[index].isShowNew = true
            }
            history[history.length - 1].hideLine = true
            this.setState({
                history,
                refreshing: false
            })

            // 保存时间
            storage.set(
                'lookTime',
                history[0].createTime
            )
        }).catch(() => {
            history[history.length - 1].hideLine = true
            this.setState({
                history,
                refreshing: false
            })
            //保存浏览时间
            storage.set(
                'lookTime',
                history[0].createTime
            )
        })
    }

    _keyExtractor = (item) => item.createTime;

    gotoBuildingDetail = (id) => {
        this.props.navigation.navigate('buildingDetail', { buildingTreeId: id })
    };

    gotoShopDetail = (buildingTreeId, shopId) => {
        this.props.navigation.navigate('shopDetail', { shopId, buildingTreeId })
    };

    _renderItems = ({ item, index }) => {
        let renderContent = null
        if (item.trackType === 1) {
            renderContent = (
                <View style={styles.morenView}>
                    <Text style={styles.timeText}>{moment(item.createTime).format('HH:mm')}</Text>
                    <Text style={styles.moren}>
                        <Text style={styles.text}>{item.userName}</Text>
                        第<Text style={styles.text}>{item.viewCount}</Text>次浏览楼盘
                        <Text style={styles.text} onPress={() => this.gotoBuildingDetail(item.buildingId)}>{item.buildingName}</Text>
                        {item.shopNumber ? (
                            <Text>
                                的商铺<Text style={styles.text} onPress={() => this.gotoShopDetail(item.buildingId, item.shopId)}>{item.shopNumber}</Text>
                            </Text>
                        ) : null}
                    </Text>
                </View>
            )
        } else if (item.trackType === 2) {
            renderContent = (
                <View style={styles.morenView}>
                    <Text style={styles.timeText}>{moment(item.createTime).format('HH:mm')}</Text>
                    <Text style={styles.moren}>
                        <Text style={styles.text}>{item.userName}</Text>
                        关注了楼盘<Text style={styles.text} onPress={() => this.gotoBuildingDetail(item.buildingId)}>{item.buildingName}</Text>
                        {item.shopNumber ? (
                            <Text>
                                的商铺<Text style={styles.text} onPress={() => this.gotoShopDetail(item.buildingId, item.shopId)}>>{item.shopNumber}</Text>
                            </Text>
                        ) : null}
                    </Text>
                </View>

            )
        } else if (item.trackType === 3) {
            renderContent = (
                <View style={styles.morenView}>
                    <Text style={styles.timeText}>{moment(item.createTime).format('HH:mm')}</Text>
                    <Text style={styles.moren}>
                        <Text style={styles.text}>{item.userName}</Text>
                        取消关注了楼盘<Text style={styles.text} onPress={() => this.gotoBuildingDetail(item.buildingId)}>{item.buildingName}</Text>
                        {item.shopNumber ? (
                            <Text>
                                的商铺<Text style={styles.text} onPress={() => this.gotoShopDetail(item.buildingId, item.shopId)}>{item.shopNumber}</Text>
                            </Text>
                        ) : null}
                    </Text>
                </View>
            )
        } else if (item.trackType === 4) {
            renderContent = (
                <View style={styles.morenView}>
                    <Text style={styles.timeText}>{moment(item.createTime).format('HH:mm')}</Text>
                    <Text style={styles.moren}><Text style={styles.text}>{item.userName}</Text> 搜索了<Text
                        style={styles.text}> &quot;{item.word}&quot;</Text></Text>
                </View>
            )
        } else {
            renderContent = (
                <View style={styles.morenView}>
                    <Text style={styles.timeText}>{moment(item.createTime).format('HH:mm')}</Text>
                    <Text style={styles.moren}>{item.dataType == 1 ? (
                        <Text>
                            筛选了{item.wordType === 1 ? '总价' : '面积'}<Text style={styles.text}>{item.word}</Text>的楼盘
                        </Text>
                    ) : (
                            <Text>
                                在楼盘<Text style={styles.text} onPress={() => this.gotoBuildingDetail(item.buildingId)}>{item.buildingName}</Text>
                            中筛选了{item.wordType == 1 ? '总价' : '面积'}<Text style={styles.text}>{item.word}</Text>的商铺
                            </Text>)
                    }
                    </Text>
                </View>
            )
        }
        return (
            <View key={index}>
                {
                    item.isShowNew ? (
                        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <View style={styles.loggerView}>
                                <View style={styles.rightView}>
                                    {renderContent}
                                </View>
                            </View>
                            <View style={styles.middle}>
                                <View style={styles.middleLine}></View>
                                <Text style={{ color: '#CBCBCB', fontSize: scaleSize(24) }}>以上为新动态</Text>

                                <View style={styles.middleLine}></View>
                            </View>

                        </View>
                    ) :
                        <View style={styles.loggerView}>
                            <View style={styles.leftView}>
                                <View style={styles.shadow}></View>
                                <View style={styles.line}></View>
                            </View>
                            <View style={styles.rightView}>
                                {renderContent}
                            </View>
                        </View>
                }
            </View>
        )
    }

    _onEndReached = async () => {
        if (this.state.refreshing) return;
        let { totalCount, pageIndex, pageSize } = this.pageParams;
        if (pageSize * pageIndex > totalCount) return;

        this.setState({
            refreshing: true
        });
        this.pageParams.pageIndex = pageIndex + 1;
        this.getCusDevelop();
    };

    _refresh = () => {
        // this.getCusDevelop(0)
        this.setState({
            pageIndex: 0
        }, () => {
            this.getCusDevelop(0)
        })
    };

    render() {
        let { refreshing, history, sectionData } = this.state;
        return (
            <BaseContainer
                title='微信客户动态日志'
                scroll={false}
                bodyStyle={{ padding: 0 }}
            >
                <View style={styles.topView}>
                    <Image source={WARNING} style={styles.warnImg} />
                    <Text style={styles.warnText}>本数据为客户敏感数据，请不要轻易展示或透露相关信息</Text>
                </View>
                <SectionList
                    style={{ flex: 1 }}
                    keyExtractor={this._keyExtractor}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                    // data={history}
                    renderItem={this._renderItems}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={0.1}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={this._refresh}
                        title="Loading..."
                    />}
                    sections={sectionData} />

                {/* <LoggerStep data={this.state.history} getCusDevelop={this.getCusDevelop} /> */}
            </BaseContainer>
        )
    }
}

const mapStateToProps = ({ config, user }) => {
    return { config, user }
}

export default connect(mapStateToProps)(DynamicLogging)
