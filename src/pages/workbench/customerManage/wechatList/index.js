import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, RefreshControl, DeviceEventEmitter } from 'react-native'
import { scaleSize } from '../../../../utils/screenUtil'
import { connect } from 'react-redux'
import ApiCustom from '../../../../services/customManager';
import { Toast } from '@new-space/teaset'
import moment from 'moment'
import NoData from '../../../../businessComponents/noData'
import { verifyUser } from '../../../../utils/utils'

const HEAD = require('../../../../images/pictures/head.png')

const styles = StyleSheet.create({
    whiteView: {
        height: scaleSize(24),
        width: '100%',
        backgroundColor: '#F8F8F8'
    },
    wechatDetail: {
        height: scaleSize(165),
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,
        backgroundColor: '#FFFFFF',
    },
    leftContent: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: scaleSize(32)
    },
    headImg: {
        width: scaleSize(94),
        height: scaleSize(94),
        borderRadius: scaleSize(50)
    },
    cusDetail: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: scaleSize(20)
    },
    nameText: {
        fontSize: scaleSize(32),
        color: '#000000'
    },
    timeText: {
        fontSize: scaleSize(24),
        color: '#868686',
        marginTop: scaleSize(16)
    },
    rightContent: {
        width: scaleSize(176),
        height: scaleSize(72),
        borderRadius: scaleSize(36),
        backgroundColor: '#4B6AC5'
    },
    more: {
        color: '#868686',
        fontSize: scaleSize(24),
        textAlign: 'center',
        marginTop: scaleSize(30),
        marginBottom: scaleSize(30)
    }
})

class WechatList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageIndex: 0,
            pageSize: 30,
            searchCriteria: '',   //搜索条件
            orderType: 0,   // 排序选择
            wechatList: [],
            wechatCount: 0,
            refreshing: false,
            wechatListData: []
        }
    }

    componentDidMount() {
        // 选择排序的监听事件
        this.selectSort = DeviceEventEmitter.addListener('selectWechatSore', (params) => {
            if (params) {
                this.setState({
                    orderType: params.orderType,
                    wechatList: [],
                    pageIndex: 0,
                }, () => {
                    this.getWechatList(0)
                })
            } else { }
        })
        this.addCustomer = DeviceEventEmitter.addListener('AddCustomer', () => {
            this.getWechatList(0)
        })
        if (this.props.wechatList.length === 0) {
            this.getWechatList()
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.wechatList.length === 0) return
        if (nextProps.wechatList !== prevState.wechatList) {
            let wechatList = nextProps.wechatList || []
            return { ...prevState, wechatList }
        }
        return null
    }

    componentWillUnmount() {
        if (this.addCustomer) {
            this.addCustomer.remove()
        }
        if (this.selectSort) {
            this.selectSort.remove()
        }
    }

    getLabelVa = (va, count) => {
        if (this.props.getLabel) {
            this.props.getLabel(va, count)
        }
    }

    gotoCusDetail = async (va) => {
        try {
            await verifyUser()
            this.props.sendPoint.add({ target: '微信列表跳转详情_button', page: '工作台-客户管理' })
            va.fromWechat = true
            this.props.navigation.navigate('customDetail', {...va,source:'weixin'})
        } catch (e) {
        }
    }

    getWechatList = async (index) => {
        let { api } = this.props.config.requestUrl
        let { pageIndex, pageSize, searchCriteria, orderType, wechatListData } = this.state
        if (index === 0) {
            pageIndex = index
        }
        let params = {
            pageIndex,
            pageSize,
            searchCriteria,
            orderType,
            customerType: 1
        }
        try {
            let res = await ApiCustom.cusList(api, params)
            if (res.code === '0') {
                let data = (res.extension || [])
                if (index) {
                    wechatListData = wechatListData.concat(data)
                } else {
                    wechatListData = data
                }
                this.setState({
                    wechatListData,
                    wechatList: wechatListData,
                    wechatCount: res.totalCount,
                    refreshing: false
                }, () => {
                    this.getLabelVa(this.props['data-value'], this.state.wechatCount)
                })
            } else {
                Toast.message('获取客户列表失败')
                this.setState({ refreshing: false })
            }
        } catch (e) {
            Toast.message('获取客户列表失败')
            this.setState({ refreshing: false })
        }
    }

    _onEndReached = async () => {
        if (this.state.refreshing) {
            return
        }
        let { wechatCount, pageIndex, pageSize } = this.state
        pageIndex++
        if (wechatCount / pageSize < pageIndex) return
        await this.setState({ pageIndex, refreshing: true }, () => {
            this.getWechatList(pageIndex)
        })
    }

    // 下拉刷新
    _refresh = () => {
        this.setState({
            pageIndex: 0
        }, () => {
            this.getWechatList()
        })

    }

    // eslint-disable-next-line no-unused-vars
    _keyExtractor = (item, index) => index.toString()

    _renderItems = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.gotoCusDetail(item)}>
                <View style={styles.wechatDetail}>
                    <View style={styles.leftContent}>
                        <Image source={item.headImg ? { uri: item.headImg } : HEAD} style={styles.headImg} />
                        <View style={styles.cusDetail}>
                            <Text style={styles.nameText}>{item.customerName}</Text>
                            <Text style={styles.timeText}>最近浏览 <Text>{item.lastTime ? moment(item.lastTime).format('YYYY-MM-DD') : '暂无浏览时间'}</Text></Text>
                        </View>
                    </View>
                    {/* <View style={styles.rightContent}></View> */}
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        let { wechatList, pageSize, pageIndex, wechatCount, refreshing } = this.state
        return (
            <View style={{ height: '100%' }}>
                {/* <View style={styles.whiteView}></View> */}
                <FlatList
                    extraData={this.state}
                    style={{ flex: 1 }}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItems}
                    data={wechatList}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={0.2}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={this._refresh}
                        title="Loading..."
                    />}
                    ListEmptyComponent={<NoData tips='抱歉，暂时没有客户'/>}
                    ListFooterComponent={
                        (wechatList.length) > 0 ? <Text style={styles.more}>{wechatCount / pageSize <= pageIndex + 1 ? '~没有更多了' : '加载中'}</Text> : null
                    }
                />

            </View>
        )
    }
}

const mapStateToProps = ({ config, user, point }) => {
    return { config, user, sendPoint: point.buryingPoint }
}

export default connect(mapStateToProps)(WechatList)