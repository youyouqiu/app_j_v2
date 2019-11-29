// 微信客户动态日志

import React, {Component} from 'react'
import BaseContainer from '../../../../../components/Page'
import {connect} from 'react-redux'
import {View, StyleSheet, Image, Text, FlatList, RefreshControl} from 'react-native'
import {scaleSize} from '../../../../../utils/screenUtil';
// import LoggerStep from './logger'
import ApiCustom from '../../../../../services/customManager'
import {Toast} from 'teaset'
import storage from '../../../../../utils/storage'
import moment from 'moment'


const styles = StyleSheet.create({
    topView: {
        width: '100%',
        height: scaleSize(80),
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FFF6E7',
        flexDirection: 'row',
        marginBottom: scaleSize(34)
    },
    warnImg: {
        marginLeft: scaleSize(23),
        width: scaleSize(32),
        height: scaleSize(32)
    },
    warnText: {
        color: '#868686',
        fontSize: scaleSize(24),
        marginLeft: scaleSize(16)
    },
    middleLine: {
        width: scaleSize(228),
        height: scaleSize(2),
        backgroundColor: '#EAEAEA'
    },
    loggerView: {
        width: '100%',
        height: scaleSize(140),
        display: 'flex',
        flexDirection: 'row',
        marginLeft: scaleSize(32)
    },
    leftView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: scaleSize(111),
        width: scaleSize(10),
        marginTop: scaleSize(20)
    },
    shadow: {
        height: scaleSize(10),
        width: scaleSize(10),
        backgroundColor: '#3AD047',
        borderRadius: scaleSize(50)
    },
    line: {
        width: scaleSize(2),
        height: scaleSize(130),
        backgroundColor: '#EAEAEA'
    },
    rightView: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: scaleSize(44),
    },
    timeText: {
        color: '#CBCBCB',
        fontSize: scaleSize(24),
    },
    text: {
        color: '#4B6AC5',
        fontSize: scaleSize(28)
    },
    moren: {
        color: '#868686',
        fontSize: scaleSize(28),
        marginTop: scaleSize(22),
        width: scaleSize(600)
    },
    morenView: {
        display: 'flex',
        flexDirection: 'column'
    },
    middle: {
        height: scaleSize(33),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: scaleSize(700),
        justifyContent: 'space-between',
        flex: 1,
        marginBottom: scaleSize(20),
        marginTop: scaleSize(20),
        marginLeft: scaleSize(32)
    }
})


const WARNING = require('../../../../../images/icons/warning.png')

class DynamicLogging extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageIndex: 0,
            pageSize: 20,
            history: [],
            totalCount: 0,
            refreshing: false,
            listData: []
        }
    }

    componentDidMount() {
        this.getCusDevelop()
    }

    // 获取用户动态
    getCusDevelop = async (index) => {
        let { pageSize, pageIndex, history, listData } = this.state
        let { api } = this.props.config.requestUrl
        let { id, relationCustomerId, source } = this.props.navigation.state.params
        if (index === 0) {
            pageIndex = index
        }
        let _id = source === 'weixin' ? id : relationCustomerId
        let params = {
            pageIndex,
            pageSize,
            id: _id
        }
        try {
            let res = await ApiCustom.weChatDev(api, params)
            console.log(res, '89898989')
            if (res.code === '0') {
                let data = (res.extension || [])
                if (index) {
                    listData = listData.concat(data)
                } else {
                    listData = data
                }
                history = listData
                // history = res.extension || []
                this.setState({
                    listData,
                    // history,
                    totalCount: res.totalCount,
                }, () => {
                    this.isNewInfo(history)
                })
            } else {
                Toast.message('获取动态失败' + res.message || '')
                this.setState({refreshing: false})
            }
        } catch (e) {
            Toast.message('获取动态失败')
            this.setState({refreshing: false})
        }
    }

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
                history[0].createTime)
        })
    }

    _keyExtractor = (item) => item.toString();

    gotoBuildingDetail = (id) => {
        this.props.navigation.navigate('buildingDetail', {buildingTreeId: id})
    };

    gotoShopDetail = (buildingTreeId, shopId) => {
        this.props.navigation.navigate('shopDetail', {shopId, buildingTreeId})
    };

    _renderItems = ({item, index}) => {
        let renderContent = null
        if (item.trackType === 1) {
            renderContent = (
                <View style={styles.morenView}>
                    <Text style={styles.timeText}>{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    <Text style={styles.moren}>
                        <Text style={styles.text}>{item.customName}</Text>
                        第<Text style={styles.text}>{item.viewCount}</Text>次浏览楼盘
                        <Text style={styles.text} onPress={() => this.gotoBuildingDetail(item.buildingId)}>{item.buildingName}</Text>
                        {item.shopNumber ? (
                            <Text>
                                的商铺<Text style={styles.text} onPress={() => this.gotoShopDetail(item.buildingId,item.shopId)}>{item.shopNumber}</Text>
                            </Text>
                        ) : null}
                    </Text>
                </View>
            )
        } else if (item.trackType === 2) {
            renderContent = (
                <View style={styles.morenView}>
                    <Text style={styles.timeText}>{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    <Text style={styles.moren}>
                        <Text style={styles.text}>{item.customName}</Text>
                        关注了楼盘<Text style={styles.text} onPress={() => this.gotoBuildingDetail(item.buildingId)}>{item.buildingName}</Text>
                        {item.shopNumber ? (
                            <Text>
                                的商铺<Text style={styles.text} onPress={() => this.gotoShopDetail(item.buildingId,item.shopId)}>>{item.shopNumber}</Text>
                            </Text>
                        ) : null}
                    </Text>
                </View>

            )
        } else if (item.trackType === 3) {
            renderContent = (
                <View style={styles.morenView}>
                    <Text style={styles.timeText}>{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    <Text style={styles.moren}>
                        <Text style={styles.text}>{item.customName}</Text>
                        取消关注了楼盘<Text style={styles.text} onPress={() => this.gotoBuildingDetail(item.buildingId)}>{item.buildingName}</Text>
                        {item.shopNumber ? (
                            <Text>
                                的商铺<Text style={styles.text} onPress={() => this.gotoShopDetail(item.buildingId,item.shopId)}>{item.shopNumber}</Text>
                            </Text>
                        ) : null}
                    </Text>
                </View>
            )
        } else if (item.trackType === 4) {
            renderContent = (
                <View style={styles.morenView}>
                    <Text style={styles.timeText}>{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    <Text style={styles.moren}><Text style={styles.text}>{item.customName}</Text> 搜索了<Text
                        style={styles.text}> &quot;{item.word}&quot;</Text></Text>
                </View>
            )
        } else {
            renderContent = (
                <View style={styles.morenView}>
                    <Text style={styles.timeText}>{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
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
                            <View style={{flexDirection:'column',justifyContent:'center'}}>
                                <View style={styles.loggerView}>
                                    {/*<View style={styles.leftView}>*/}
                                    {/*    <View style={styles.shadow}></View>*/}
                                    {/*    <View style={styles.line}></View>*/}
                                    {/*</View>*/}
                                    <View style={styles.rightView}>
                                        {renderContent}
                                    </View>
                                </View>
                                <View style={styles.middle}>
                                    <View style={styles.middleLine}></View>
                                    <Text style={{color: '#CBCBCB', fontSize: scaleSize(24)}}>以上为新动态</Text>

                                    <View style={styles.middleLine}></View>
                                </View>

                            </View>
                        ):
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
        if (this.state.refreshing) return
        let {totalCount, pageIndex, pageSize} = this.state
        pageIndex++
        if (totalCount / pageSize < pageIndex) return

        await this.setState({pageIndex, refreshing: true}, () => {
            this.getCusDevelop(pageIndex)
        })
    }

    _refresh = () => {
        // this.getCusDevelop(0)
        this.setState({
            pageIndex: 0
        }, () => {
            this.getCusDevelop(0)
        })

    }

    render() {
        let {refreshing} = this.state
        return (
            <BaseContainer
                title='
                微信客户动态日志'
                scroll={false}
                bodyStyle={{padding: 0}}
            >
                <View style={styles.topView}>
                    <Image source={WARNING} style={styles.warnImg}/>
                    <Text style={styles.warnText}>本数据为客户敏感数据，请不要轻易展示或透露相关信息</Text>
                </View>
                <FlatList
                    extraData={this.state}
                    style={{flex: 1}}
                    keyExtractor={this._keyExtractor}
                    data={this.state.history}
                    renderItem={this._renderItems}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={0.2}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={this._refresh}
                        title="Loading..."
                    />}
                />

                {/* <LoggerStep data={this.state.history} getCusDevelop={this.getCusDevelop} /> */}
            </BaseContainer>
        )
    }
}

const mapStateToProps = ({config, user}) => {
    return {config, user}
}

export default connect(mapStateToProps)(DynamicLogging)
