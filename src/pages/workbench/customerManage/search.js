import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Search from '../../../businessComponents/Search'
import { scaleSize } from '../../../utils/screenUtil'
import ApiCustom from '../../../services/customManager'
import { connect } from 'react-redux'
import { Toast } from 'teaset'
import moment from 'moment'

const styles = StyleSheet.create({
    cusDetailView: {
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
    leftView: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: scaleSize(32)
    },
    nameView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    img: {
        width: scaleSize(30),
        height: scaleSize(30)
    },
    nameText: {
        color: '#000000',
        fontSize: scaleSize(32),
        // marginLeft: scaleSize(7)
    },
    manView: {
        // width: scaleSize(112),
        height: scaleSize(45),
        borderRadius: scaleSize(8),
        borderWidth: 1,
        borderColor: '#CBCBCB',
        // marginLeft: scaleSize(15),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    grade: {
        width: scaleSize(35),
        height: scaleSize(30),
        marginLeft: scaleSize(8)
    },
    phoneView: {
        marginTop: scaleSize(16)
    },
    phone: {
        color: '#868686',
        fontSize: scaleSize(32)
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
        height: scaleSize(94)
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
    title: {
        height: scaleSize(80),
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleText: {
        color: '#000000',
        fontSize: scaleSize(24)
    },
    right: {
        display: 'flex',
        flexDirection: 'row'
    },
    arrowImg: {
        marginLeft: scaleSize(8),
        width: scaleSize(16),
        height: scaleSize(30),
    },
    gradeText: {
        color: '#000000',
        fontSize: scaleSize(32),
        fontWeight: '500',
        marginLeft: scaleSize(10)
    },
})

const MAN = require('../../../images/icons/man2.png')
const WOMAN = require('../../../images/icons/woman2.png')
const AGRADE = require('../../../images/icons/grade.png')
const HEAD = require('../../../images/pictures/head.png')
const ARROW = require('../../../images/icons/arrow_right.png')

const gradeTextObj = {
    1: { text: 'A' },
    2: { text: 'B+' },
    3: { text: 'B' },
    4: { text: 'C' },
    5: { text: 'D' }
}

class CusSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            loading: false,
            refreshing: false,
            pageIndex: 0,
            pageSize: 8,
            cusSearchList: [],
            wechatSearchList: [],
            cusTotalCount: '',
            dataArr: []
        }
    }
    // 防止多次调用onLoadMore
    _loading = false

    // 一级页面数据接口
    firstDataSource = (conditions) => {
        return ApiCustom.cusList(this.props.config.requestUrl.api, conditions)
    }

    // 二级页面接口
    fetchInternalData = (conditions) => {
        return ApiCustom.cusList(this.props.config.requestUrl.api, conditions)
    }

    // 一级页面数据获取
    getAppDataSource = (keyword, callback) => {
        let { pageIndex, pageSize } = this.state
        let va = (((this.props.navigation || {}).state || {}).params || {})
        this.setState({ loading: true }, async () => {
            try {
                let params = {
                    pageIndex,
                    pageSize,
                    searchCriteria: keyword,
                    orderType: va.orderType,
                    customerType: 0
                }
                let res = await this.firstDataSource(params)
                this.setState({
                    cusSearchList: res.extension,
                    cusTotalCount: res.totalCount
                }, async () => {
                    await this.getWechatDataSource(keyword, callback)
                })
            } catch (e) {
                Toast.message('搜索客户失败')
            }
        })
    }

    getWechatDataSource = (keyword, callback) => {
        let { pageIndex, pageSize } = this.state
        let va = (((this.props.navigation || {}).state || {}).params || {})
        this.setState({ loading: true }, async () => {
            try {
                let params = {
                    pageIndex,
                    pageSize,
                    searchCriteria: keyword,
                    orderType: va.orderType,
                    customerType: 1
                }
                let res = await this.firstDataSource(params)
                this.setState({
                    wechatSearchList: res.extension,
                    weChatTotalCount: res.totalCount
                }, () => {
                    this.dealData(callback)
                })
            } catch (e) {
                Toast.message('搜索客户失败')
            }
        })
    }

    dealData = (callback) => {
        let { wechatSearchList, cusSearchList, weChatTotalCount, cusTotalCount } = this.state
        let dataSource = [
            {
                key: 0,
                data: cusSearchList,
                total: cusTotalCount,
                pageIndex: 0
            },
            {
                key: 1,
                data: wechatSearchList,
                total: weChatTotalCount,
                pageIndex: 0
            }
        ]
        this.setState({
            dataSource
        })
        callback && callback()
    }

    // 二级页面 搜索
    internalSearch = (keyword, key) => {
        this.setState({ loading: true }, async () => {
            try {
                await this.internaInit(keyword, key)
            } catch (e) {
                Toast.message('获取更多失败')
            }
            this.setState({ loading: false })
        })
    }

    // 二级页面 搜索 刷新  通用逻辑
    internaInit = async (keyword, key) => {
        let { pageSize } = this.state
        let va = (((this.props.navigation || {}).state || {}).params || {})
        let params = {
            pageIndex: 0,
            pageSize,
            searchCriteria: keyword,
            orderType: va.orderType,
            customerType: key
        }
        try {
            let res = await this.fetchInternalData(params)
            let dataSource = this.state.dataSource.map(i => i.key === key ? {
                key: key,
                data: res.extension,
                total: res.totalCount,
                pageIndex: res.pageIndex
            } : i)
            this.setState({
                dataSource
            })
        } catch (e) {
            Toast.message('获取更多失败')
        }
    }

    handlePressSearch = (keyword, key) => {
        if (!key) {
            // 一级页面搜索
            this.getAppDataSource(keyword)
            this.props.sendPoint.add({ target: '搜索框_input', page: '工作台 一 客户管理', action_param: keyword })
        } else {
            // 二级页面搜索
            this.internalSearch(keyword, key)
            this.props.sendPoint.add({ target: '搜索框_input', page: '工作台 一 客户管理', action_param: keyword })
        }
    }

    //点击历史记录 
    handlePressHistory = (keyword, callback) => {
        console.log('12333')
        this.getAppDataSource(keyword, callback)
    }

    // 二级页面 上拉记载  
    handleLoadMore = async (keyword, key) => {
        if (this._loading) return
        this._loading = true
        let { pageSize, dataArr } = this.state
        let va = (((this.props.navigation || {}).state || {}).params || {})
        const { pageIndex } = this.state.dataSource.find(i => i.key === key)
        let params = {
            pageIndex: pageIndex + 1,
            pageSize,
            searchCriteria: keyword,
            orderType: va.orderType,
            customerType: key
        }
        try {
            const { extension, totalCount, pageIndex } = await this.fetchInternalData(params)
            // let res = await this.fetchInternalData(params)
            // let dataList = res.extension || []
            // dataArr = dataArr.concat(dataList)
            let dataSource = this.state.dataSource.map(i => i.key === key ? {
                key: key,
                // data: dataInfo.concat(res.extension || []),
                data: (i.data || []).concat(extension),
                // total: res.totalCount,
                total: totalCount,
                pageIndex: pageIndex
            } : i)
            this.setState({
                // dataArr,
                dataSource
            })
        } catch (e) {
            Toast.message('获取更多失败')
        }
        this._loading = false
    }

    // 二级页面刷新
    handleRefresh = (keyword, key) => {
        this.setState({ refreshing: true }, async () => {
            try {
                await this.internaInit(keyword, key)
            } catch (e) {
                Toast.message('获取更多失败')
            }
        })
        this.setState({ refreshing: false })
    }

    // 渲染title
    renderTitle = (item, index, callback) => {
        return (
            <View key={index} style={styles.title}>
                <Text style={[styles.titleText, { marginLeft: scaleSize(32) }]}>
                    {item.key === 0 ? '客户列表' : '微信获客列表'}
                </Text>
                {
                    item.total > 3 ?
                        <TouchableOpacity onPress={callback} style={[styles.right, { marginRight: scaleSize(32) }]}>
                            <Text style={styles.titleText}>查看更多</Text>
                            <Image source={ARROW} style={styles.arrowImg} />
                        </TouchableOpacity>
                        : null
                }
            </View>
        )
    }

    gotoCusDetail = (va) => {
        va.fromCusList = true
        this.props.navigation.navigate('customDetail', va)
    }

    gotoWeDetail = (va) => {
        va.fromWechat = true
        this.props.navigation.navigate('customDetail', va)
    }

    renderItem = (item, index, key) => {
        let renderContent = null
        if (key === 0) {
            renderContent = (
                <TouchableOpacity onPress={() => this.gotoCusDetail(item)} key={index}>
                    <View style={styles.cusDetailView}>
                        <View style={styles.leftView}>
                            <View style={styles.nameView}>
                                <Image source={item.sex ? MAN : WOMAN} style={styles.img} />
                                {/* {
                                    item.isTrueCustomer ?
                                        <Text style={[styles.nameText, { color: '#000000', marginLeft: scaleSize(7), fontWeight: '500' }]}>{item.customerName || ''}</Text>
                                        :
                                        <View style={[styles.manView, { marginLeft: scaleSize(15) }]}>
                                            <Text style={[styles.nameText, { color: '#868686' }]}>{item.customerName || ''}</Text>
                                        </View>
                                } */}
                                <Text
                                    style={[styles.nameText, { color: '#000000', marginLeft: scaleSize(7), fontWeight: '500' }]}
                                >
                                    {item.customerName || ''}
                                </Text>
                                <Text style={styles.gradeText}>{(gradeTextObj[item.grade] || {}).text || ''}</Text>
                                {/* <Image source={AGRADE} style={styles.grade} /> */}
                            </View>
                            <View style={styles.phoneView}>
                                <Text style={styles.phone}>{item.mainPhone || ''}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } else {
            renderContent = (
                <TouchableOpacity onPress={() => this.gotoWeDetail(item)} key={index}>
                    <View style={styles.wechatDetail}>
                        <View style={styles.leftContent}>
                            <Image source={HEAD} style={styles.headImg} />
                            <View style={styles.cusDetail}>
                                <Text style={styles.nameText}>{item.customerName}</Text>
                                <Text style={styles.timeText}>最近浏览 <Text>{item.lastTime ? moment(item.lastTime).format("YYYY-MM-DD") : '暂无浏览时间'}</Text></Text>
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
        return (
            <Search
                navigation={this.props.navigation}
                type='group'
                placeholder='请输入客户手机号/姓名'
                dataSource={this.state.dataSource}
                renderTitle={this.renderTitle}
                renderItem={this.renderItem}
                onPressSearch={this.handlePressSearch}
                onPressHistory={this.handlePressHistory}
                onLoadMore={this.handleLoadMore}
                onRefresh={this.handleRefresh}
            // loading={true}
            // refreshing={true}
            />
        )
    }
}

const mapStateToProps = ({ config, user, point }) => {
    return { config, user, sendPoint: point.buryingPoint }
}

export default connect(mapStateToProps)(CusSearch) 