import React, {PureComponent} from 'react'
import {scaleSize} from '../../../../utils/screenUtil'
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    DeviceEventEmitter,
    ActivityIndicator,
    Linking,
    TextInput,
    ScrollView,
} from 'react-native'
import {connect} from 'react-redux'
import ApiCustom from '../../../../services/customManager';
import {Toast} from '@new-space/teaset'
import NoData from './../../../../businessComponents/noData'
import {customerNameSubstring, debounce, verifyUser} from '../../../../utils/utils'
import LinearGradient from 'react-native-linear-gradient';
import BuryingPoint from "@/utils/BuryPoint";
import Modal from './Modal'
import DatePickerView from "@/components/XKJDatePicker/date-picker-view";


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
        width: 1,
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
    },
    phoneTextInModal: {
        fontSize: scaleSize(28),
        lineHeight: scaleSize(40),
        minWidth: scaleSize(26)
    },
    phoneLayoutInModal: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: scaleSize(28)
    },
    phoneInput: {
        width: scaleSize(40),
        borderBottomWidth: scaleSize(2),
        borderBottomColor: '#fff',
        textAlign: 'center',
        fontSize: scaleSize(28)
    }
})


const reportStatus = {
    1: {text: '一键报备', bgc: '#1F3070'},   // 可以报备
    2: {text: '已报备'},      // 已报备
    3: {text: '无法报备', bgc: '#EAEAEA'},   // 无法报备
}

const gradeTextObj = {
    1: {text: 'A'},
    2: {text: 'B+'},
    3: {text: 'B'},
    4: {text: 'C'},
    5: {text: 'D'}
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
            initError: false,
            modalVisible: false,
            reportTemplate: [], //报备模版
            supplement: {}, //需要补充的信息,
            complate: {}, //已补充的信息
            showEmptyComponent: false,
            hasMore: true
        }
    }

    componentDidMount() {
        this.state.buildingTreeId && ApiCustom.getTemplate(this.props.config.requestUrl.api, this.state.buildingTreeId)
            .then(result => {
                const {reportTemplate} = result.extension
                this.setState({reportTemplate})
            })
        this.addListener = DeviceEventEmitter.addListener('ReportBack', (params) => {
            if (params) {
                const {dispatch, config} = this.props;
                dispatch({
                    type: 'global/saveBuildingInfo',
                    payload: {
                        buildingTreeId: params.buildTreeId,
                        buildingName: params.buildingName,
                        buildingId: params.buildingId
                    }
                })
                ApiCustom.getTemplate(config.requestUrl.api, params.buildTreeId)
                    .then(result => {
                        const {reportTemplate} = result.extension
                        console.log(reportTemplate, '报备模版callback')
                        this.setState({reportTemplate})
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
            } else {
            }
        })
        let params = (((this.props.navigation || {}).state || {}).params || {})
        if (params.buildTreeId) {
            const {dispatch} = this.props;
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
            return {...prevState, customerList, orderType}
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
        let {api} = this.props.config.requestUrl
        let {pageIndex, pageSize, searchCriteria, orderType, buildingTreeId, listData} = this.state
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
            let res = await ApiCustom.cusList(api, params);
            if (res.code === '0') {
                const {totalCount, pageSize, pageIndex} = res;
                let data = (res.extension || [])
                if (index) {
                    listData = listData.concat(data)
                } else {
                    listData = data
                }
                this.setState(prev => ({
                    listData,
                    customerList: listData,
                    cusCount: res.totalCount,
                    initError: false,
                    refreshing: false,
                    showEmptyComponent: [...prev.listData, ...listData].length === 0,
                    hasMore: pageSize * (pageIndex + 1) < totalCount
                }), () => {
                    this.getLabelVa(this.props['data-value'], this.state.cusCount)
                })
            } else {
                Toast.message('获取客户列表失败' + res.message || '')
                this.setState({initError: true, refreshing: false})
            }
        } catch (e) {
            this.setState({initError: true, refreshing: false})
            Toast.message('获取客户列表失败')
        } finally {
            await this.setState({refreshing: false})
        }
    }

    _keyExtractor = (item) => item.id;

    _onEndReached = async () => {
        if (this.state.refreshing) {
            return
        }
        let {cusCount, pageIndex, pageSize} = this.state
        pageIndex++
        if (cusCount / pageSize < pageIndex) {
            return
        }
        await this.setState({refreshing: true})
        await this.setState({pageIndex})
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
        this.props.sendPoint.add({target: '客户列表跳转详情_button', page: '工作台-客户管理'})
        va.fromCusList = true
        this.props.navigation.navigate('customDetail', {...va, source: 'self'})
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

        return <TouchableOpacity onPress={onPress} style={[{alignItems: 'center'}, style]}>
            <Image source={source} style={{width: scaleSize(58), height: scaleSize(58), marginBottom: scaleSize(11)}}/>
            <Text style={{fontSize: scaleSize(24)}}>{text}</Text>
        </TouchableOpacity>
    }

    gotoMoreFollow = (item) => {
        BuryingPoint.add({
            page: '工作台-客户管理',
            target: '客户跟进_button',
        });
        this.props.navigation.navigate('followUp', {id: item.id, source: 'cusList'})
    };

    _renderItems = ({item, index}) => {
        let {buildingTreeId, reportIndex, reportDisable} = this.state;
        // const defaultSource = item.sex ? require('../../../../images/pictures/personal_man.png') : require('../../../../images/pictures/personal_woman.png')
        return (
            <View style={styles.cusDetail} key={item.id}>
                <TouchableOpacity onPress={() => this.gotoCusDetail(item)} style={styles.leftView}>
                    {/* 产品需求客户列表显示默认头像 */}
                    {
                        item.isRelationCustomerId ?
                            <Image source={item.headImg ? {uri: item.headImg} : HEAD} style={{
                                width: scaleSize(90),
                                height: scaleSize(90),
                                marginRight: scaleSize(16),
                                marginTop: scaleSize(5),
                                borderRadius: scaleSize(50)
                            }}/>
                            : null
                    }
                    {/* <Image source={item.headImg ? { uri: item.headImg } : HEAD} style={{ width: scaleSize(90), height: scaleSize(90), marginRight: scaleSize(16), marginTop: scaleSize(5), borderRadius: scaleSize(50) }} /> */}
                    <View style={{display: 'flex', flexDirection: 'column'}}>
                        <View style={styles.nameView}>
                            <Image source={item.sex ? MAN : WOMAN} style={styles.img}/>
                            <Text style={[styles.nameText, {color: '#000000', marginLeft: scaleSize(7), fontWeight: '500'}]}>
                                {customerNameSubstring(item.customerName, 7)}
                            </Text>
                            <Text style={styles.gradeText}>{(gradeTextObj[item.grade] || {}).text || ''}</Text>
                        </View>
                        <View style={styles.phoneView}>
                            <Text style={styles.phone}>{item.mainPhone || ''}</Text>
                            {
                                item.hasRepeatPhone &&
                                <LinearGradient colors={['#FF8A6B', '#FE5139']} style={styles.linearGradient}>
                                    <Text style={{color: '#fff', fontSize: scaleSize(24)}}>重复</Text>
                                </LinearGradient>
                            }
                        </View>
                    </View>
                </TouchableOpacity>

                {
                    buildingTreeId ?
                        <TouchableOpacity
                            disabled={item.canReportState === 2 || item.canReportState === 3 || reportDisable ? true : false}
                            style={[styles.quickReport, {backgroundColor: (reportStatus[item.canReportState] || {}).bgc}]}
                            onPress={() => {
                                debounce(this.handlePressReport(item, index))
                            }}>
                            {
                                reportIndex === index ? <ActivityIndicator/> :
                                    <Text style={styles.rightText(item.canReportState)}>{(reportStatus[item.canReportState] || {}).text}</Text>
                            }
                        </TouchableOpacity>
                        :
                        item.isTrueCustomer ?
                            <>
                                <this.TodoInItem style={{flex: 1}} type={1} onPress={() => this.doCall(item)}/>
                                <this.TodoInItem style={{flex: 1}} type={2} onPress={() => this.gotoMoreFollow(item)}/>
                            </>
                            :
                            <>
                                <View style={{flex: 1}}/>
                                <this.TodoInItem style={{flex: 1}} type={2} onPress={() => this.gotoMoreFollow(item)}/>
                            </>
                }

            </View>
        )
    }

    report = async (otherParams = {}) => {
        const {buildingTreeId, buildingName, buildingId, customerList, complate, supplement, modalVisible} = this.state
        const {user: {userInfo}, config} = this.props
        const {id: customerId, customerName, sex, phones} = complate
        const {wholePhone, font, behind} = supplement
        const {expectedBeltTime, reportExtension} = otherParams
        const _phones = phones.map(a => ({
            phoneId: a.id,
            phone: wholePhone ? a.phone.slice(0, 11) : (a.phone.slice(0, font) + '*'.repeat(11 - font - behind) + a.phone.slice(-behind))
        }))
        const params = {
            customerInfo: {
                customerId,
                customerName,
                sex: sex ? 1 : 0,
                phones: _phones,
            },
            buildingInfo: {
                buildingId,
                buildingTreeId,
                buildingTreeName: buildingName,
            },
            brokerInfo: {
                city: (userInfo || {}).city,
                companyName: (userInfo || {}).filiale,
                companyShortName: (userInfo || {}).filialeShortName,
                deptName: (userInfo || {}).deptName,
            },
            expectedBeltTime,
            reportExtension,
            source: 1,
            version: 'V2.2',
        }
        console.log(params, 'params')
        try {
            // const isRepeat = await ApiCustom.beforeQuickReport(config.requestUrl.api, customerId)
            // const { code, extension = [] } = isRepeat
            // if (code === '0' && extension.length > 0) {
            //     if (modalVisible) {
            //         this.setState({ toastText: `报备号码与名${isRepeat.extension[0].name}的${isRepeat.extension[0].phone}号码 重复！请保持唯一号码报备` })
            //         const timer = setTimeout(() => {
            //             this.setState({ toastText: '' })
            //             clearTimeout(timer)
            //         }, 3000);
            //     } else {
            //         Toast.message(`报备号码与名${isRepeat.extension[0].name}的${isRepeat.extension[0].phone}号码 重复！请保持唯一号码报备`)
            //     }
            // }
            await ApiCustom.quickReport(config.requestUrl.api, params)
            customerList.map((item, index) => {
                if (index === this.state.reportIndex) {
                    item.canReportState = 2
                }
            })
            this.setState({
                customerList,
                modalVisible: false,
                reportIndex: '',
                reportDisable: false,
                supplement: {},
                complate: {}
            })
            Toast.message('一键报备成功')
        } catch (e) {
            if (modalVisible) {
                this.setState({toastText: e.message})
                const timer = setTimeout(() => {
                    this.setState({toastText: ''})
                    clearTimeout(timer)
                }, 3000);
            } else {
                Toast.message(e.message)
                this.setState({
                    reportIndex: '',
                    reportDisable: false,
                })
            }
        }
    }

    handlePressReport = async (item, index) => {
        this.props.sendPoint.add({target: '一键报备_button', page: '工作台-客户管理'})
        this.setState({reportIndex: index, reportDisable: true})
        let {buildingTreeId, reportTemplate, supplement} = this.state
        const canReport = await ApiCustom.canReport(this.props.config.requestUrl.api, buildingTreeId)
        //can report
        if (!canReport.extension) {
            //缩进空格，别删！
            Toast.message('      暂无法报备此楼盘\n具体原因请咨询项目经理')
            return this.setState({
                reportIndex: '',
                reportDisable: false
            })
        }
        // set customerInfo in complate
        this.setState({
            complate: {
                id: item.id,
                customerName: item.customerName,
                sex: item.sex,
                phones: item.phones.map(a => ({...a})),
            }
        })
        // compared with template
        let needSupplement
        reportTemplate.forEach(a => {
            switch (a.key) {
                case 'watchTime':
                    needSupplement = true
                    supplement.needWatchTime = true
                    const time = new Date()
                    //默认当前时间小时+2，分钟取0
                    this.state.complate.visitTime = new Date(time.getFullYear(), time.getMonth(), time.getDate(), time.getHours() + 2, 0)
                    //最小选择时间为当前时间分钟向上取5的倍数
                    this.state.complate.minTime = new Date(time.getFullYear(), time.getMonth(), time.getDate(), time.getHours(), time.getMinutes() + (5 - (time.getMinutes() % 5)))
                    break;
                case 'customerPhone':
                    supplement.font = a.rule.split(',')[0]
                    supplement.behind = a.rule.split(',')[1]
                    supplement.wholePhone = (supplement.font === '11' && supplement.behind === '0')
                    item.phones.forEach(b => {
                        const phoneStr = supplement.wholePhone ? b.phone.slice(0, supplement.font) : (b.phone.slice(0, supplement.font) + b.phone.slice(-supplement.behind))
                        if (/\*/g.test(phoneStr)) {
                            needSupplement = true
                            supplement.needCustomerPhone = true
                        }
                    })
                    break;
                default:
                    break;
            }
            if (/^customize\d+/.test(a.key)) {
                needSupplement = true
                supplement.needCustomize = true
            }
        })
        if (needSupplement) {
            return this.setState({
                modalVisible: true,
                supplement,
            })
        }
        this.report()
    }

    immediateReport = async () => {
        try {
            await verifyUser('stronge', '', <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Text>您还未完善报备需要的个人信息</Text>
                <Text>(姓名、经纪公司)</Text>
            </View>, true)
            this.props.sendPoint.add({target: '选择楼盘_button', page: '工作台-客户管理'})
            this.props.navigation.navigate('reportBuilding', {fromCus: true})
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

    handleModalSubmit = () => {
        const {complate, supplement, reportTemplate} = this.state
        const {font, behind, needCustomerPhone, needCustomize, needWatchTime, wholePhone} = supplement
        let finish = true
        //检查号码填写
        needCustomerPhone && complate.phones.forEach(element => {
            const phoneStr = wholePhone ? element.phone.slice(0, 11) : (element.phone.slice(0, font) + element.phone.slice(-behind))
            if (!/^\d+$/.test(phoneStr)) {
                finish = false
            }
        })
        //检查时间选择
        if (needWatchTime && !complate.visitTime) complate.visitTime = new Date()
        //检查自定义项
        if (needCustomize) {
            const customizeArr = []
            reportTemplate.forEach(a => /^customize\d+/.test(a.key) && customizeArr.push(a.key))
            customizeArr.forEach(a => {
                if (!complate[a]) finish = false
            })
        }
        if (!finish) {
            this.setState({toastText: '请完善所有报备信息！'})
            const timer = setTimeout(() => {
                this.setState({toastText: ''})
                clearTimeout(timer)
            }, 3000);
            return
        }
        //将数据格式化，带入报备请求
        const keys = Object.keys(complate)
        const reportExtension = []
        keys.forEach(key => {
            if (/customize\d+/.test(key)) {
                reportExtension.push({key, value: complate[key]})
            }
        });
        const params = {
            expectedBeltTime: complate.visitTime,
            reportExtension
        }
        this.report(params)
    }

    handleInputChange = (text, indexSt, indexSec) => {
        const {complate, supplement} = this.state
        const {font, behind} = supplement
        let current = complate.phones[indexSt].phone
        //修改当前位
        const singleArr = current.split('')
        singleArr[indexSec] = text || '*'
        complate.phones[indexSt].phone = singleArr.join('')
        if (!text) return
        //找到下一个可填项
        for (indexSec; indexSec < 11; indexSec++) {
            //当前行下一位是否为前x后x
            if (indexSec + 1 <= font - 1 || indexSec + 1 >= (11 - behind)) {
                //遍历至最后,若不为可填，则跳向下一行号码再次重复该过程
                if (indexSec === 10) {
                    indexSec = 0
                    indexSt += 1
                    current = complate.phones[indexSt]?.phone
                    if (indexSt <= complate.phones.length - 1) {
                    } else {
                      break
                    }
                }
                if (current[indexSec + 1] === '*') {
                    this[`input${indexSt}${indexSec + 1}`].focus()
                    break
                }
            }
            continue
        }
    }


    handleKeyPress = (e, indexSt, indexSec) => {
        const {complate, supplement, customerList, reportIndex} = this.state
        const {font, behind} = supplement
        if (e.nativeEvent.key !== 'Backspace') return
        //当前位有内容时直接返回
        if (complate.phones[indexSt].phone[indexSec] !== '*') return
        //光标移到上一个可输入框且把上一个输入框里的内容删除   产品必死！！！
        for (indexSec; indexSec > 0; indexSec--) {
            if (indexSec - 1 <= font - 1 || indexSec - 1 >= (11 - behind)) {
                if (customerList[reportIndex].phones[indexSt].phone[indexSec - 1] === '*') {
                    const singleArr = complate.phones[indexSt].phone.split('')
                    singleArr[indexSec - 1] = '*'
                    complate.phones[indexSt].phone = singleArr.join('')
                    this[`input${indexSt}${indexSec - 1}`].setNativeProps({text: ''})
                    this[`input${indexSt}${indexSec - 1}`].focus()
                    break
                }
            }
            continue
        }
    }

    modalItem = ({title, children}) => {
        return <View style={{paddingHorizontal: scaleSize(40), marginBottom: scaleSize(30), width: '100%', position: 'relative'}}>
            <Text style={{fontSize: scaleSize(24), lineHeight: scaleSize(33), color: '#868686', marginBottom: scaleSize(28)}}>{title}</Text>
            {children}
        </View>
    }

    listFooterComponent = () => {
        const {hasMore, showEmptyComponent} = this.state;
        if (showEmptyComponent) return null;
        return hasMore ? <ActivityIndicator/> : <Text style={styles.more}>~没有更多了</Text>
    };


    render() {
        const Item = this.modalItem
        const {customerList, buildingName, refreshing, modalVisible, reportTemplate, complate, supplement, reportIndex} = this.state;
        const {showEmptyComponent} = this.state;
        const {customerName, visitTime, minTime} = complate
        const {font, behind, needCustomerPhone, needCustomize, needWatchTime, wholePhone} = supplement;
        return (
            <View style={{height: '100%'}}>
                <View style={styles.chooseReport}>
                    {
                        !!buildingName &&
                        <TouchableOpacity style={styles.chooseViewLeft} onPress={this.handleReset}>
                            <Image style={{width: scaleSize(24), height: scaleSize(24), marginRight: scaleSize(10)}} source={CLEARN}/>
                            <Text style={styles.proText}>清除</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.textView} onPress={this.immediateReport}>
                        <Image source={PROJECT} style={[styles.proImg]}/>
                        <Text
                            numberOfLines={1}
                            style={{...styles.proText, marginLeft: scaleSize(15), maxWidth: scaleSize(300)}}
                        >
                            {buildingName ? buildingName : '请选择一键报备项目'}
                        </Text>
                        <Image source={CHOOSE} style={[styles.proImg, {marginLeft: scaleSize(10)}]}/>
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
                    ListEmptyComponent={showEmptyComponent ? <NoData tips='抱歉，暂时没有客户'/> : null}
                    ListFooterComponent={this.listFooterComponent}
                />
                <Modal
                    title={[`正在报备客户“${customerName}”`, '请先完善报备信息']}
                    visible={modalVisible}
                    contentStyle={{width: '80%'}}
                    onCancel={() => this.setState({modalVisible: false, reportIndex: '', reportDisable: false, complate: {}, supplement: {}})}
                    onSubmit={debounce(this.handleModalSubmit)}
                    toast={this.state.toastText}
                >
                    <ScrollView style={{maxHeight: scaleSize(600)}}>
                        {
                            needWatchTime &&
                            <Item title='预计到访时间'>
                                <View style={{flexDirection: 'row', marginTop: scaleSize(-30), height: scaleSize(30), zIndex: 1}}>
                                    <Text style={{
                                        color: '#fff',
                                        fontWeight: '600',
                                        marginLeft: scaleSize(110),
                                        position: 'relative',
                                        top: scaleSize(102)
                                    }}>/</Text>
                                    <Text style={{
                                        color: '#fff',
                                        fontWeight: '600',
                                        marginLeft: scaleSize(85),
                                        position: 'relative',
                                        top: scaleSize(102)
                                    }}>/</Text>
                                    <Text style={{
                                        color: '#fff',
                                        fontWeight: '600',
                                        marginLeft: scaleSize(195),
                                        position: 'relative',
                                        top: scaleSize(100)
                                    }}>:</Text>
                                </View>
                                <DatePickerView
                                    minuteStep={5}
                                    value={visitTime}
                                    mode='datetime'
                                    onChange={v => {
                                        this.state.complate.visitTime = v
                                        this.forceUpdate()
                                    }}
                                    minDate={minTime}
                                />
                            </Item>
                        }
                        {
                            needCustomerPhone &&
                            <Item title='客户手机号'>
                                {
                                    customerList[reportIndex]?.phones.map((phoneObj, index) =>
                                        <View style={styles.phoneLayoutInModal}>
                                            {
                                                phoneObj.phone.split('').map((a, i) =>
                                                    <TextInput
                                                        onChangeText={text => this.handleInputChange(text, index, i)}
                                                        ref={ref => this[`input${index}${i}`] = ref}
                                                        style={[styles.phoneInput, (wholePhone ? a === '*' : ((i <= font - 1 || i >= 11 - behind) && a === '*')) && {borderBottomColor: '#CBCBCB'}]}
                                                        editable={wholePhone ? a === '*' : ((i <= font - 1 || i >= 11 - behind) && a === '*')}
                                                        keyboardType='numeric'
                                                        maxLength={1}
                                                        onKeyPress={e => this.handleKeyPress(e, index, i)}
                                                        blurOnSubmit={false}
                                                    >
                                                        {/* 如果是全号码【有值则显示，*则填空】，如果是半号码【前x位或者后x位且不为*，则直接显示，为*则填空，中间则默认为*】  */}
                                                        {a = wholePhone ? a === '*' ? undefined : a : (i <= font - 1 || i >= 11 - behind) ? a === '*' ? undefined : a : '*'}
                                                    </TextInput>
                                                )
                                            }
                                        </View>
                                    )
                                }
                            </Item>
                        }
                        {
                            needCustomize &&
                            reportTemplate.map(a => {
                                if (/^customize\d+/.test(a.key)) {
                                    return < Item title={a.name}>
                                        <TextInput
                                            placeholder={`请输入${a.name}`}
                                            style={{paddingBottom: scaleSize(2), borderBottomColor: '#CBCBCB', borderBottomWidth: scaleSize(2)}}
                                            onChangeText={text => {
                                                const {complate} = this.state
                                                complate[a.key] = text
                                            }}
                                        />
                                    </Item>
                                }
                                return null
                            })
                        }
                    </ScrollView>
                </Modal>

            </View>
        )
    }
}

const mapStateToProps = ({config, user, point, global}) => {
    return {config, user, sendPoint: point.buryingPoint, global}
}

export default connect(mapStateToProps)(CusList)
