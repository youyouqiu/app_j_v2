import React, { PureComponent } from 'react'
import { scaleSize } from '../../../../utils/screenUtil'
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, RefreshControl, DeviceEventEmitter, ActivityIndicator, Linking } from 'react-native'
import { connect } from 'react-redux'
import ApiCustom from '../../../../services/customManager';
import { Toast } from 'teaset'
import NoData from './../../../../businessComponents/noData'
import { debounce, verifyUser } from '../../../../utils/utils'
import LinearGradient from 'react-native-linear-gradient';
import BuryingPoint from "@/utils/BuryPoint";


const PROJECT = require('../../../../images/icons/choosePro.png')
const CHOOSE = require('../../../../images/icons/chose.png')
const MAN = require('../../../../images/icons/man2.png')
const WOMAN = require('../../../../images/icons/woman2.png')
const HEAD = require('../../../../images/pictures/head.png')
const GOTOFOLLOW = require('../../../../images/icons/memo.png')
const CALLPHONE = require('../../../../images/icons/phone3.png')
const CLEARN = require('../../../../images/icons/x.png')

const styles = StyleSheet.create({
    chooseReport: {
        marginTop: scaleSize(24),
        marginBottom: scaleSize(24),
        marginLeft: scaleSize(32),
        width: scaleSize(686),
        height: scaleSize(88),
        backgroundColor: '#FFFFFF',
        borderColor: '#CBCBCB',
        borderWidth: 1,
        borderRadius: scaleSize(8),
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center'
    },
    proImg: {
        width: scaleSize(30),
        height: scaleSize(30)
    },
    proText: {
        // marginLeft: scaleSize(15),
        fontSize: scaleSize(28),
        color: '#000000',
    },
    cusDetail: {
        height: scaleSize(165),
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: scaleSize(32)
    },
    leftView: {
        display: 'flex',
        flexDirection: 'row',
        flex: 4,
        // backgroundColor:'red'
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
    phone: {
        color: '#868686',
        fontSize: scaleSize(28),
        marginRight: scaleSize(11)
    },
    quickReport: {
        width: scaleSize(180),
        height: scaleSize(72),
        // backgroundColor: '#1F3070',
        borderRadius: scaleSize(8),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightText: status => ({
        color: status === 2 ? '#3AD047' : '#fff',
        fontSize: scaleSize(24)
    }),
    grade: {
        width: scaleSize(35),
        height: scaleSize(30),
        marginLeft: scaleSize(8)
    },
    phoneView: {
        marginTop: scaleSize(16),
        flexDirection: 'row',
        alignItems: 'center'
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
    topNavBar: {
        width: scaleSize(750),
        height: scaleSize(88),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    barView: {
        display: 'flex',
        flexDirection: 'row'
    },
    line: {
        width: scaleSize(1),
        height: scaleSize(33),
        backgroundColor: '#CBCBCB',
        marginLeft: scaleSize(20)
    },
    gradeText: {
        color: '#000000',
        fontSize: scaleSize(24),
        fontWeight: '500',
        marginLeft: scaleSize(10)
    },
    more: {
        color: '#868686',
        fontSize: scaleSize(24),
        textAlign: 'center',
        marginTop: scaleSize(30),
        marginBottom: scaleSize(30)
    },
    textView: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
    },
    linearGradient: {
        width: scaleSize(78),
        height: scaleSize(36),
        borderRadius: scaleSize(18),
        justifyContent: 'center',
        alignItems: 'center'
    },
    chooseViewLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        height: '100%',
        left: 0,
        paddingHorizontal: scaleSize(32), //加大点击区域
    }
})


const reportStatus = {
    1: { text: '一键报备', bgc: '#1F3070' },   // 可以报备
    2: { text: '已报备' },      // 已报备
    3: { text: '无法报备', bgc: '#EAEAEA' },   // 无法报备
}

const gradeTextObj = {
    1: { text: 'A' },
    2: { text: 'B+' },
    3: { text: 'B' },
    4: { text: 'C' },
    5: { text: 'D' }
}
class CusList extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            pageIndex: 0,
            pageSize: 30,
            searchCriteria: '',   //搜索条件
            orderType: props.orderType || 0,   // 排序选择
            customerList: [],
            cusCount: 0,
            refreshing: false,
            buildingTreeId: (props.global || {}).buildingTreeId || '',
            buildingName: (props.global || {}).buildingName || '',
            buildingId: (props.global || {}).buildingId || '',
            listData: [],
            initError: false
        }
    }

    componentDidMount() {
        // this.getLabelVa(this.props.tabLabel)
        this.addListener = DeviceEventEmitter.addListener('ReportBack', (params) => {
            if (params) {
                const { dispatch } = this.props;
                dispatch({
                    type: 'global/saveBuildingInfo',
                    payload: {
                        buildingTreeId: params.buildTreeId,
                        buildingName: params.buildingName,
                        buildingId: params.buildingId
                    }
                })
                // 选择报备项目触发的监听事件
                this.setState({
                    buildingTreeId: params.buildTreeId,
                    buildingId: params.buildingId,
                    buildingName: params.buildingName
                }, () => {
                    this.getCusList(0)
                })
            } else {
                // 删除触发的监听事件
                this.getCusList(0)
            }
        })

        // this.addCustomer = DeviceEventEmitter.addListener('AddCustomer', () => {
        //     // 删除触发的监听事件
        //     this.getCusList(0)
        // })

        this.addCustomer = DeviceEventEmitter.addListener('AddCustomer', () => {
            // if (params.type = 1 || params.fromWeInfo) {
            //     this.setState({
            //         fromwe: true
            //     }, () => {
            //         this.getCusList(0)
            //         // this.getWechatCount()
            //     })
            // } else {
            //     // 删除
            //     this.getCusList(0)
            //     // this.getWechatCount()
            // }
            this.getCusList(0)
        })

        // 选择排序的监听事件
        this.selectSort = DeviceEventEmitter.addListener('selectSore', (params) => {
            if (params) {
                this.setState({
                    buildingTreeId: params.buildingTreeId,
                    orderType: params.orderType,
                    customerList: [],
                    pageIndex: 0
                }, () => {
                    this.getCusList(0)
                })
            } else { }
        })
        let params = (((this.props.navigation || {}).state || {}).params || {})
        if (params.buildTreeId) {
            const { dispatch } = this.props;
            dispatch({
                type: 'global/saveBuildingInfo',
                payload: {
                    buildingTreeId: params.buildTreeId,
                    buildingName: params.buildingName,
                    buildingId: params.buildingId
                }
            })
            this.setState({
                buildingTreeId: params.buildTreeId,
                buildingId: params.buildingId,
                buildingName: params.buildingName
            }, () => {
                this.getCusList()
            })
        }
        if ((this.props.customerList || []).length === 0) {
            this.getCusList()
        }
    }

    componentWillUnmount() {
        if (this.addListener) {
            this.addListener.remove()
        }
        if (this.addCustomer) {
            this.addCustomer.remove()
        }
        if (this.selectSort) {
            this.selectSort.remove()
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if ((nextProps.customerList || []).length === 0) return
        if (nextProps.orderType !== prevState.orderType || nextProps.customerList !== prevState.customerList) {
            let customerList = nextProps.customerList
            let orderType = nextProps.orderType
            return { ...prevState, customerList, orderType }
        }
        return null
    }

    getLabelVa = (va, count) => {
        if (this.props.getLabel) {
            this.props.getLabel(va, count)
        }
    }

    // 获取客户列表
    getCusList = async (index) => {
        let { api } = this.props.config.requestUrl
        let { pageIndex, pageSize, searchCriteria, orderType, buildingTreeId, listData } = this.state
        if (index === 0) {
            pageIndex = index
        }
        let params = {
            pageIndex,
            pageSize,
            searchCriteria,
            orderType,
            customerType: 0,
            buildingTreeId: buildingTreeId || ''
        }
        try {
            let res = await ApiCustom.cusList(api, params)
            if (res.code === '0') {
                let data = (res.extension || [])
                if (index) {
                    listData = listData.concat(data)
                } else {
                    listData = data
                }
                this.setState({
                    listData,
                    customerList: listData,
                    cusCount: res.totalCount,
                    initError: false,
                    refreshing: false
                }, () => {
                    this.getLabelVa(this.props.tabLabel, this.state.cusCount)
                })
            } else {
                Toast.message('获取客户列表失败' + res.message || '')
                this.setState({ initError: true, refreshing: false })
            }
        } catch (e) {
            this.setState({ initError: true, refreshing: false })
            Toast.message('获取客户列表失败')
        } finally {
            await this.setState({ refreshing: false })
        }
    }

    _keyExtractor = (item) => item.id;

    _onEndReached = async () => {
        if (this.state.refreshing) {
            return
        }
        let { cusCount, pageIndex, pageSize } = this.state
        pageIndex++
        if (cusCount / pageSize < pageIndex) {
            return
        }
        await this.setState({ refreshing: true })
        await this.setState({ pageIndex })
        this.getCusList(pageIndex)
    }

    // 下拉刷新
    _refresh = () => {
        this.setState({
            pageIndex: 0
        }, () => {
            this.getCusList()
        })

    }

    gotoCusDetail = (va) => {
        this.props.sendPoint.add({ target: '客户列表跳转详情_button', page: '工作台-客户管理' })
        va.fromCusList = true
        this.props.navigation.navigate('customDetail', { ...va, source: 'self' })
    }

    doCall = (item) => {
        BuryingPoint.add({
            page: '工作台',
            target: '打电话_button',
        });
        Linking.openURL(`tel: ${item.mainPhone}`)
    }

    TodoInItem = ({
        type,
        onPress,
        style
    }) => {
        let text, source
        switch (type) {
            case 1:
                text = '打电话'
                source = CALLPHONE
                break;
            case 2:
                text = '写跟进'
                source = GOTOFOLLOW
                break;
            default:
                break;
        }

        return <TouchableOpacity onPress={onPress} style={[{ alignItems: 'center' }, style]}>
            <Image source={source} style={{ width: scaleSize(58), height: scaleSize(58), marginBottom: scaleSize(11) }} />
            <Text style={{ fontSize: scaleSize(24) }}>{text}</Text>
        </TouchableOpacity>
    }

    gotoMoreFollow = (item) => {
        BuryingPoint.add({
            page: '工作台-客户管理',
            target: '客户跟进_button',
        });
        this.props.navigation.navigate('followUp', { id: item.id, source: 'cusList' })
    };

    _renderItems = ({ item, index }) => {
        let { buildingTreeId, reportIndex, reportDisable } = this.state;
        // const defaultSource = item.sex ? require('../../../../images/pictures/personal_man.png') : require('../../../../images/pictures/personal_woman.png')
        return (
            <View style={styles.cusDetail} key={item.id}>
                <TouchableOpacity onPress={() => this.gotoCusDetail(item)} style={styles.leftView}>
                    {/* 产品需求客户列表显示默认头像 */}
                    {
                        item.isRelationCustomerId ?
                            <Image source={item.headImg ? { uri: item.headImg } : HEAD} style={{ width: scaleSize(90), height: scaleSize(90), marginRight: scaleSize(16), marginTop: scaleSize(5), borderRadius: scaleSize(50) }} />
                            : null
                    }
                    {/* <Image source={item.headImg ? { uri: item.headImg } : HEAD} style={{ width: scaleSize(90), height: scaleSize(90), marginRight: scaleSize(16), marginTop: scaleSize(5), borderRadius: scaleSize(50) }} /> */}
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <View style={styles.nameView}>
                            <Image source={item.sex ? MAN : WOMAN} style={styles.img} />
                            <Text style={[styles.nameText, { color: '#000000', marginLeft: scaleSize(7), fontWeight: '500' }]}>{item.customerName || ''}</Text>
                            <Text style={styles.gradeText}>{(gradeTextObj[item.grade] || {}).text || ''}</Text>
                        </View>
                        <View style={styles.phoneView}>
                            <Text style={styles.phone}>{item.mainPhone || ''}</Text>
                            {
                                item.hasRepeatPhone &&
                                <LinearGradient colors={['#FF8A6B', '#FE5139']} style={styles.linearGradient}>
                                    <Text style={{ color: '#fff', fontSize: scaleSize(24) }}>重复</Text>
                                </LinearGradient>
                            }
                        </View>
                    </View>
                </TouchableOpacity>

                {
                    buildingTreeId ?
                        <TouchableOpacity
                            disabled={item.canReportState === 2 || item.canReportState === 3 || reportDisable ? true : false}
                            style={[styles.quickReport, { backgroundColor: (reportStatus[item.canReportState] || {}).bgc }]}
                            onPress={() => { debounce(this.report(item, index)) }}>
                            {
                                reportIndex === index ? <ActivityIndicator /> :
                                    <Text style={styles.rightText(item.canReportState)}>{(reportStatus[item.canReportState] || {}).text}</Text>
                            }
                        </TouchableOpacity>
                        :
                        item.isTrueCustomer ?
                            <>
                                <this.TodoInItem style={{ flex: 1 }} type={1} onPress={() => this.doCall(item)} />
                                <this.TodoInItem style={{ flex: 1 }} type={2} onPress={() => this.gotoMoreFollow(item)} />
                            </>
                            :
                            <>
                                <View style={{ flex: 1 }} />
                                <this.TodoInItem style={{ flex: 1 }} type={2} onPress={() => this.gotoMoreFollow(item)} />
                            </>
                }

            </View >
        )
    }

    report = async (va, index) => {
        this.props.sendPoint.add({ target: '一键报备_button', page: '工作台-客户管理' })

        this.setState({ reportIndex: index, reportDisable: true })

        let { buildingTreeId, buildingName, buildingId, customerList } = this.state
        let { api } = this.props.config.requestUrl
        let phoneArr = []
        va.phones.map((item, index) => {
            if (index === 0) return
            phoneArr.push(item.phone.slice(0, 3) + '****' + item.phone.substring(item.phone.length - 4))
        })
        //  后端要求 报备时 当号码为全号码时 要改成半号码
        // let xx = va.mainPhone.substring(3, va.mainPhone.length - 4)
        let a = va.mainPhone.slice(0, 3)
        let b = va.mainPhone.substring(va.mainPhone.length - 4)
        // let phone = va.mainPhone.slice(0,3)+ '****' + va.mainPhone.slice(0,3)
        let phone = a + '****' + b
        let params = {
            buildingId,
            buildingTreeId,
            buildingName,
            customerInfos: {
                customerId: va.id,
                customerName: va.customerName,
                customerPhone: phone,
                sex: va.sex ? 1 : 0
            },
            version: 'V2.2',
            phones: phoneArr
        }

        try {
            let res1 = await ApiCustom.beforeQuickReport(api, params.customerInfos.customerId)
            const { code, extension = [] } = res1
            if (code === '0' && extension.length > 0) {
                Toast.message(`报备号码与名${res1.extension[0].name}的${res1.extension[0].phone}号码 重复！请保持唯一号码报备`)
            }
            else {
                let res = await ApiCustom.quickReport(api, params)
                if (res && res.code === '0') {
                    customerList.map((item, index) => {
                        if (index === this.state.reportIndex) {
                            item.canReportState = 2
                        }
                    })
                    this.setState({
                        customerList
                    })
                    Toast.message('一键报备成功')
                } else {
                    Toast.message('一键报备失败' + res.message || '报备失败，请稍后操作')
                }
            }
        } catch (e) {
            Toast.message(e.message)
        }
        this.setState({
            reportIndex: '',
            reportDisable: false
        })
    }

    immediateReport = async () => {
        try {
            await verifyUser('stronge')
            this.props.sendPoint.add({ target: '选择楼盘_button', page: '工作台-客户管理' })
            this.props.navigation.navigate('reportBuilding', { fromCus: true })
        } catch (e) {
        }
    }

    handleReset = () => {
        this.props.dispatch({
            type: 'global/saveBuildingInfo',
            payload: {
                buildingTreeId: '',
                buildingName: '',
                buildingId: ''
            }
        })
        this.setState({
            buildTreeId: '',
            buildingTreeId: '',
            buildingName: ''
        })
    }


    render() {
        let { customerList, buildingName, cusCount, pageSize, pageIndex, refreshing } = this.state
        // console.log(customerList)
        return (
            <View style={{ height: '100%' }}>
                <View style={styles.chooseReport} >
                    {
                        !!buildingName &&
                        <TouchableOpacity style={styles.chooseViewLeft} onPress={this.handleReset}>
                            <Image style={{ width: scaleSize(24), height: scaleSize(24), marginRight: scaleSize(10) }} source={CLEARN} />
                            <Text style={styles.proText}>清除</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.textView} onPress={this.immediateReport}>
                        <Image source={PROJECT} style={[styles.proImg]} />
                        <Text
                            numberOfLines={1}
                            style={{ ...styles.proText, marginLeft: scaleSize(15), maxWidth: scaleSize(300) }}
                        >
                            {buildingName ? buildingName : '请选择一键报备项目'}
                        </Text>
                        <Image source={CHOOSE} style={[styles.proImg, { marginLeft: scaleSize(10) }]} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    extraData={this.state}
                    // style={{ flex: 1 }}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItems}
                    data={customerList}
                    onEndReached={this._onEndReached}
                    initialNumToRender={10}
                    onEndReachedThreshold={0.2}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={this._refresh}
                        title="Loading..."
                    />}
                    ListEmptyComponent={<NoData tips='抱歉，暂时没有客户' />}
                    ListFooterComponent={
                        (customerList.length) > 0 ? <Text style={styles.more}>{cusCount / pageSize <= pageIndex + 1 ? '~没有更多了' : '加载中'}</Text> : null
                    }
                />
            </View>

        )
    }
}

const mapStateToProps = ({ config, user, point, global }) => {
    return { config, user, sendPoint: point.buryingPoint, global }
}

export default connect(mapStateToProps)(CusList)
