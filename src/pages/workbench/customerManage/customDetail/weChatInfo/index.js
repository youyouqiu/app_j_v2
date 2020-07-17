import React, { Component } from 'react'
import {
    Text, View, ScrollView, Image, FlatList, ActivityIndicator,
    DeviceEventEmitter, TouchableOpacity, TextInput
} from 'react-native'
import { scaleSize } from '@/utils/screenUtil'
import Input from '@/components/Form/Input'
import ApiCustom from '@/services/customManager'
import { Toast } from '@new-space/teaset'
import { connect } from 'react-redux'
import ReModal from '@/components/Modal/index'
import { currCustomerInfoParam } from '../../../report/types/addReport'
import LinearGradient from 'react-native-linear-gradient'
import Echarts from '@new-space/native-echarts'
import s, { styles } from './styles'
import Label from '@/components/new-space/components/Label'
import moment from 'moment'
import storage from '@/utils/storage'
import lo from 'lodash'

const SELECT = require('@/images/icons/select.png')
const UNSELECT = require('@/images/icons/unSelect.png')

const Card = ({ title, bodyStyle, children }) => {
    return (
        <View style={s.cardView}>
            <View style={s.cardTitleLayer}>
                <Text style={s.cardTitle}>{title}</Text>
            </View>
            <View style={bodyStyle}>{children}</View>
        </View>
    )
}

const ChartRightItem = ({ color, title, value, percent }) => {
    return (
        <View style={s.chartRightItem}>
            <View style={[s.chartRightItemColor, { backgroundColor: color }]} />
            <Text style={s.chartRightItemText1}>{title}</Text>
            <Text style={s.chartRightItemText2}>{value}</Text>
            <Text style={s.chartRightItemText3}>{percent}</Text>
        </View>
    )
}

class WechatInfo extends Component {
    state = {
        wechatInfo: {},
        developData: [],
        dataAnalysis: [],
        reVisible: false,
        phone: '',
        number: 10,
        relaData: [],
        showReleData: false,
        dataSelect: false,    //选择关联对象
        addCus: false,    //新增Modal
        changeBoolean: true,
        fromData: {},
        banPhone: '',

        // v2.3.1
        logs: [],
        lookTime: moment(),
        newLogNum: 0,
        totalLogNum: 0,
        intentionArea: 0,
        intentionPrice: 0,
        buildingArea: {
            area: '--',
            street: '--',
        },
        sumCount: 0,
        buildingTypeInfo: {
            sp: { count: 0, percent: '0.00%' },
            xzl: { count: 0, percent: '0.00%' },
            gy: { count: 0, percent: '0.00%' },
            ck: { count: 0, percent: '0.00%' },
        },
        buildingList: [],
        loading: {
            weChatDev: true,
            dynamicNumber: true,
            intention: true,
            detailBuildingBrowse: true,
            buildingTypeNumber: true,
        },
    }

    componentDidMount() {
        this.didFocusListener = this.props.navigation.addListener('didFocus', this.navigationDidFocus)
        this.getLookTime()
        const cusId = this.getCusId()
        setTimeout(() => {
            this._getweChatInfo(cusId)
        })
        this.fetchWeChatDev({
            id: cusId,
            pageIndex: 0,
            pageSize: 2,
        })
        this.fetchDynamicNumber(cusId)
        this.fetchIntention(cusId)
        this.fetchDetailBuildingBrowse(cusId)
        this.fetchBuildingTypeNumber(cusId)
    }

    navigationDidFocus = () => {
        this.getLookTime()
    }

    // 获取上次动态浏览时间
    getLookTime = async () => {
        try {
            const lookTime = await storage.get('lookTime')
            this.setState({ lookTime: moment(lookTime) })
        } catch {
            this.setState({ lookTime: moment('1970-1-1') })
        }
    }

    /**
     * 请求控制：
     * lodaing控制
     */
    fetchCtl = (key, callback) => {
        const setLoading = (_loading) => ({ loading }) => ({
            loading: { ...loading, [key]: _loading }
        })
        this.setState(setLoading(true), async () => {
            try {
                await callback()
            } catch (e) {
                console.log('fetchCtl error:', e)
            }
            this.setState(setLoading(false))
        })
    }

    // 获取微信客户id
    getCusId = () => {
        let id = ''
        // id是交叉的
        let obj = (((this.props.navigation || {}).state || {}).params || {})
        if (obj.fromCusList) {
            id = obj.relationCustomerId
        } else {
            id = obj.id
        }
        return id
    }

    _getweChatInfo = async (id) => {
        let { api } = this.props.config.requestUrl
        let params = {
            customerId: id,
            buildingTreeId: ''
        }
        try {
            let res = await ApiCustom.wechatCusDetail(api, params)
            if (res.code === '0') {
                let data = res.extension || {}
                let dataAnalysis = data.buildingLikes || []
                this.setState({
                    wechatInfo: data,
                    developData: data.lastCustomerDynamics || [],
                    dataAnalysis
                })
            } else {
                Toast.message('获取客户详情失败')
            }
        } catch (e) {
            Toast.message('获取客户详情失败')
        }
    }

    /**
     * 小程序客户详情中 用户动态信息 带分页的 2.0
     * @param {Object} params - post参数对象
     * @param {number} params.pageIndex - 分页页面索引
     * @param {number} params.pageSize - 分页页面容量
     * @param {string} params.id - 客户id
     * @param {string} params.area - 不知道是啥
     * @param {string} params.city - 不知道是啥
     */
    fetchWeChatDev = params => {
        const callback = async () => {
            const { extension } = await ApiCustom.weChatDev(params)
            this.setState({ logs: extension })
        }
        this.fetchCtl('weChatDev', callback)
    }

    // 微信用户详情-近期动态数量
    fetchDynamicNumber = id => {
        const callback = async () => {
            const { extension } = await ApiCustom.dynamicNumber(id)
            this.setState({
                newLogNum: extension?.todayNumber || 0,
                totalLogNum: extension?.sumNumber || 0,
            })
        }
        this.fetchCtl('dynamicNumber', callback)
    }

    // 微信用户详情-意向分析
    fetchIntention = id => {
        const callback = async () => {
            const { extension } = await ApiCustom.intention(id)
            this.setState({
                intentionArea: extension?.intentionArea || 0,
                intentionPrice: extension?.intentionPrice || 0,
                buildingArea: {
                    area: extension?.buildingArea?.area || '--',
                    street: extension?.buildingArea?.street || '--',
                },
            })
        }
        this.fetchCtl('intention', callback)
    }

    // 微信用户详情-浏览项目详情
    fetchDetailBuildingBrowse = id => {
        const callback = async () => {
            const { extension } = await ApiCustom.detailBuildingBrowse(id)
            this.setState({ buildingList: extension })
        }
        this.fetchCtl('detailBuildingBrowse', callback)
    }

    // 微信用户详情-房源倾向
    fetchBuildingTypeNumber = id => {
        const callback = async () => {
            const { extension } = await ApiCustom.buildingTypeNumber(id)
            const propMap = { '商铺': 'sp', '写字楼': 'xzl', '公寓': 'gy', '车库': 'ck' }
            const _buildingTypeInfo = {}
            extension?.housetypeNumberResponses?.forEach?.(i => {
                const prop = propMap[i.category]
                if (prop) {
                    _buildingTypeInfo[prop] = {
                        count: i.count || 0,
                        percent: i.percentage || '0.00%',
                    }
                }
            })
            this.setState(({ buildingTypeInfo }) => ({
                sumCount: extension?.sumCount || 0,
                buildingTypeInfo: {
                    ...buildingTypeInfo,
                    ..._buildingTypeInfo,
                },
            }))
        }
        this.fetchCtl('buildingTypeNumber', callback)
    }

    gotodynLogger = () => {
        const { id, relationCustomerId, source } = this.props.navigation.state.params
        this.props.navigation.navigate('dynamicLogging', { id, relationCustomerId, source })
    }

    gotoBuildingDetail = (buildingTreeId) => () => {
        this.props.navigation.navigate('buildingDetail', { buildingTreeId })
    }

    gotoShopDetail = (buildingTreeId, shopId) => () => {
        this.props.navigation.navigate('shopDetail', { buildingTreeId, shopId })
    }

    gotoAddReport = async () => {
        const wechatInfo = this.state.wechatInfo || {}
        let { api } = this.props.config.requestUrl
        let id = wechatInfo.relationCustomerId || ''
        let params = {
            customerId: id,
            buildingTreeId: ''
        }
        try {
            let res = await ApiCustom.cusDetail(api, params)
            if (res && res.extension) {
                let dataInfo = res.extension || {}
                let customerPhones = dataInfo.customerPhones || []
                let phones = [];
                customerPhones.map((item, index) => {
                    phones.push({
                        phoneId: item.id,
                        phoneNumber: item.phone,
                        isMain: index === 0
                    })
                })

                let _q = new currCustomerInfoParam();
                _q.customerId = dataInfo.id;
                _q.isChooseCus = true;
                _q.phones = phones;
                _q.customerName = dataInfo.customerName;
                _q.sex = dataInfo.sex ? 1 : 0;
                this.props.navigation.navigate('addReport', { customerInfo: _q })
            } else {
                Toast.message('报备失败' + res.message)
            }
        } catch (e) {
            Toast.message('报备失败')
        }
    }

    relaCus = () => {
        this.setState({
            reVisible: true
        })
    }

    onRelaModalClose = () => {
        this.setState({
            reVisible: false,
        })
    }

    sure = () => {
        this.setState({
            reVisible: false,
        }, () => {
            this.queryRela()
        })
    }

    queryRela = async () => {
        let { phone, number, changeBoolean, fromData } = this.state
        let { api } = this.props.config.requestUrl
        let regPhone = /^1[3-9]{1}[\d]{5}$/;
        let regAllPhone = /^1[3-9]{1}[\d]{9}$/;
        let params = []

        if (changeBoolean) {
            // 全号码
            if (!regAllPhone.test(phone)) {
                Toast.message('请输入正确的手机号')
                return
            }
            params = {
                phone,
                number    //查询电话号码最多10条
            }
        } else {
            // 半号码
            let rPh = fromData.phone
            let banPhone = ''
            banPhone = rPh.slice(0, 3) + '****' + rPh.slice(3)
            if (!regPhone.test(rPh)) {
                Toast.message('请输入正确的手机号')
                return
            }
            this.setState({
                banPhone
            })
            params = {
                phone: banPhone,
                number    //查询电话号码最多10条
            }
        }
        try {
            let res = await ApiCustom.queryRelation(api, params)
            if (res.code === '0') {
                if (res.extension.length === 0) {
                    this.setState({
                        addCus: true
                    })
                } else {
                    this.setState({
                        relaData: res.extension,
                        showReleData: true
                    })
                }
            } else {
                Toast.message('关联信息查询失败')
            }
        } catch (e) {
            Toast.message('关联信息查询失败')
        }
    }

    changePhoneText = async (e) => {
        if (e.length === 11) {
            await this.setState({
                phone: e
            })
        } else {
            return
        }
    }

    showCloseData = () => {
        this.setState({
            showReleData: false
        })
    }

    relationCus = async (item) => {
        await this.setState({
            showReleData: false
        }, () => {
            this.relationCustomer(item)
        })
    }

    relationCustomer = async (va) => {
        let { wechatInfo } = this.state
        let params = {
            wxCustomerId: wechatInfo.id,
            relationCustomerId: va.id,
            bindPhone: va.mainPhone
        }
        let { api } = this.props.config.requestUrl
        try {
            let res = await ApiCustom.relationCus(api, params)
            if (res.code === '0') {
                Toast.message('关联客户成功')
                this.props.navigation.navigate('customerList')
            } else {
                Toast.message('关联客户失败')
            }
        } catch (e) {
            Toast.message('关联客户失败')
        }
    }

    _keyExtractor = (index) => index.toString()

    _renderItems = ({ item }) => {
        let { dataSelect } = this.state
        return (
            <TouchableOpacity onPress={() => this.relationCus(item)}>
                <View style={styles.relaDataView}>
                    <Image source={dataSelect ? SELECT : UNSELECT} style={styles.selectImg} />
                    <Text style={[styles.relaDataText], { width: scaleSize(200) }} numberOfLines={1}>{item.customerName}</Text>
                    <Text style={styles.relaDataText}>{item.sex ? '男' : '女'}</Text>
                    <Text>{item.mainPhone}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    noDataClose = () => {
        this.setState({
            addCus: false
        })
    }

    addCusModal = () => {
        this.setState({
            addCus: false
        }, () => {
            this.addCustomer()
        })
    }

    addCustomer = async () => {
        let { banPhone, wechatInfo, phone, changeBoolean } = this.state
        let params = {}
        if (changeBoolean) {
            params = {
                wxCustomerId: wechatInfo.id,
                bindPhone: phone
            }
        } else {
            params = {
                wxCustomerId: wechatInfo.id,
                bindPhone: banPhone,
            }
        }
        let { api } = this.props.config.requestUrl
        try {
            let res = await ApiCustom.relationCus(api, params)
            if (res.code === '0') {
                Toast.message('新增客户成功')
                let params = {
                    fromWeInfo: true
                }
                this.props.navigation.navigate('customerList')
                DeviceEventEmitter.emit('AddCustomer', params)
            } else {
                Toast.message('新增客户失败' + res.message)
            }
        } catch (e) {
            Toast.message('新增客户失败')
        }
    }

    changePhone = async () => {
        this.setState({
            changeBoolean: !this.state.changeBoolean
        })
    }

    onFocusColor = (type) => {
        if (this[`inputTest${type}`]) {
            this[`inputTest${type}`].focus();
        }
    }

    _rightContent = (num, values) => {
        let valueList = [];
        valueList = (values || '').split('');

        return (
            <View style={styles.inputRightWarp}>
                <TouchableOpacity
                    style={{ marginRight: scaleSize(8) }}
                    activeOpacity={0.8}
                    onPress={() => {
                        this.onFocusColor(num)
                    }}
                >
                    <Text style={[styles.textWarpSmall, valueList.length === 1 ? styles.inputYesBorder : null]}>{valueList[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginRight: scaleSize(8) }}
                    activeOpacity={0.8}
                    onPress={() => {
                        this.onFocusColor(num)
                    }}
                >
                    <Text style={[styles.textWarpSmall, valueList.length === 2 ? styles.inputYesBorder : null]}>{valueList[1]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginRight: scaleSize(8) }}
                    activeOpacity={0.8}
                    onPress={() => {
                        this.onFocusColor(num)
                    }}
                >
                    <Text style={[styles.textWarpSmall, valueList.length === 3 ? styles.inputYesBorder : null]}>{valueList[2]}</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: scaleSize(28), color: 'rgba(0,0,0,1)', marginLeft: scaleSize(8) }}>****</Text>

                <TouchableOpacity
                    style={{ marginRight: scaleSize(8) }}
                    activeOpacity={0.8}
                    onPress={() => {
                        this.onFocusColor(num)
                    }}
                >
                    <Text style={[styles.textWarpSmall, valueList.length === 4 ? styles.inputYesBorder : null]}>{valueList[3]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginRight: scaleSize(8) }}
                    activeOpacity={0.8}
                    onPress={() => {
                        this.onFocusColor(num)
                    }}
                >
                    <Text style={[styles.textWarpSmall, valueList.length === 5 ? styles.inputYesBorder : null]}>{valueList[4]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginRight: scaleSize(8) }}
                    activeOpacity={0.8}
                    onPress={() => {
                        this.onFocusColor(num)
                    }}
                >
                    <Text style={[styles.textWarpSmall, valueList.length === 6 ? styles.inputYesBorder : null]}>{valueList[5]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{}}
                    activeOpacity={0.8}
                    onPress={() => {
                        this.onFocusColor(num)
                    }}
                >
                    <Text style={[styles.textWarpSmall, valueList.length === 7 ? styles.inputYesBorder : null]}>{valueList[6]}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    setValue = (key, value) => {
        let { fromData } = this.state;
        Object.assign(fromData, { [key]: value });
        this.setState({
            fromData,
        })
    }

    // 是否是新的动态
    isNewLog = ({ createTime }) => {
        const { lookTime } = this.state
        return moment(createTime).isAfter(lookTime)
    }

    // 获取动态文案
    getFormatLog = ({
        trackType, userName, buildingName, shopName,
        viewCount, word, wordType, dataType,
    }) => {
        let str = ''
        switch (trackType) {
            case 1: {
                if (dataType === 1) {
                    str = `${userName}第${viewCount}次浏览了${buildingName}`
                } else {
                    str = `${userName}第${viewCount}次浏览楼盘${buildingName}的${shopName}`
                }
                break
            }
            case 2: {
                if (dataType === 1) {
                    str = `${userName}关注了${buildingName}`
                } else {
                    str = `${userName}关注了楼盘${buildingName}的${shopName}`
                }
                break
            }
            case 3: {
                if (dataType === 1) {
                    str = `${userName}取消关注了${buildingName}`
                } else {
                    str = `${userName}取消关注了楼盘${buildingName}的${shopName}`
                }
                break
            }
            case 4: {
                str = `${userName}搜索了“${word}”`
                break
            }
            case 5: {
                if (dataType === 1) {
                    if (wordType === 1) {
                        str = `${userName}筛选了价格${word}的楼盘`
                    } else {
                        str = `${userName}筛选了面积${word}的楼盘`
                    }
                } else {
                    if (wordType === 1) {
                        str = `${userName}在${buildingName}中筛选了价格${word}的商铺`
                    } else {
                        str = `${userName}在${buildingName}中筛选了面积${word}的商铺`
                    }
                }
                break
            }
        }
        return str
    }

    // 重制图片icon
    handleImgError = (i, ii) => () => {
        this.setState(({ buildingList }) => {
            const nBL = lo.cloneDeep(buildingList)
            nBL[i].shopList[ii].icon = ''
            return {
                buildingList: nBL
            }
        })
    }

    // 获取时间字符串
    getFormatTime = ({ createTime }) => {
        const time = moment(createTime)
        if (time.isAfter(moment().subtract(1, 'hours'))) return '刚刚'
        if (time.isSame(moment().subtract(1, 'days'), 'day')) return '昨天'
        const diff = moment().diff(time, 'hours')
        if (diff < 24) return `${diff}小时内`
        return moment(createTime).format('MM-DD')
    }

    isLoading = () => {
        const { loading } = this.state
        for (let i in loading) {
            if (loading[i]) return true
        }
        return false
    }

    render() {
        const {
            wechatInfo, reVisible, showReleData, relaData, loading,
            addCus, phone, changeBoolean, fromData, buildingList,
        } = this.state

        const { area, street } = this.state.buildingArea
        const { sp, xzl, gy, ck } = this.state.buildingTypeInfo

        if (this.isLoading()) {
            return <ActivityIndicator style={{ marginTop: 20 }} />
        }

        return (
            <>
                <ScrollView>
                    {/* 个人信息 */}
                    <LinearGradient style={s.top} colors={["#6D8EEE", "#042289"]}>
                        <View style={s.topRow1}>
                            <Image style={s.topImg} source={wechatInfo.headImg ? { uri: wechatInfo.headImg } : require('@/images/pictures/head.png')} />
                            <View style={s.topText}>
                                <Text style={s.topTextRow1}>{wechatInfo.customerName}</Text>
                                <Text style={s.topTextRow2}>
                                    {`最近浏览：${!loading.weChatDev ? moment(this.state.logs?.[0]?.createTime).format('YYYY-MM-DD HH:mm') : ''}`}
                                </Text>
                            </View>
                            {!wechatInfo.isRelationCustomerId ? (
                                <TouchableOpacity onPress={this.relaCus} style={s.topBtn}>
                                    <Text style={s.topBtnText}>关联客户</Text>
                                </TouchableOpacity>
                            ) : null}
                        </View>
                    </LinearGradient>

                    {/* 动态 */}
                    <View style={s.log}>
                        <View style={s.logNum}>
                            <View style={s.logNumItem}>
                                <Text style={s.logNumItemValue1}>{this.state.newLogNum}</Text>
                                <Text style={s.logNumItemLabel}>今日新增/条</Text>
                            </View>
                            <View style={s.line} />
                            <View style={s.logNumItem}>
                                <Text style={s.logNumItemValue2}>{this.state.totalLogNum}</Text>
                                <Text style={s.logNumItemLabel}>总动态数/条</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={s.logNew} activeOpacity={1} onPress={this.gotodynLogger}>
                            <View style={s.logNewList}>
                                {this.state.logs.map((item, index) => (
                                    <View key={index} style={s.logNewItem}>
                                        {this.isNewLog(item) && <View style={s.logNewItemDot} />}
                                        <Text style={s.logNewItemTitle} numberOfLines={1}>
                                            {this.getFormatLog(item)}
                                        </Text>
                                        <Text style={s.logNewItemTime}>
                                            {this.getFormatTime(item)}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                            <View style={s.logNewGo}>
                                <Text style={s.logNewGoText}>近期动态</Text>
                                <Image style={s.logNewGoImg} source={require('@/images/icons/01.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* 用户画像 */}
                    <Card title='用户画像' bodyStyle={s.yhhxLayer}>
                        <View style={s.yhhxItem}>
                            <Text style={s.yhhxValueText1} numberOfLines={1}>{area} {street}</Text>
                            <View style={s.yhhxLabel}>
                                <Image style={s.yhhxLabelImg} source={require('@/images/icons/02.png')} />
                                <Text style={s.yhhxLabelText}>最心意的区域</Text>
                            </View>
                        </View>
                        <View style={s.line} />
                        <View style={s.yhhxItem}>
                            <Text style={s.yhhxValueText1}>{this.state.intentionArea}㎡左右</Text>
                            <View style={s.yhhxLabel}>
                                <Image style={s.yhhxLabelImg} source={require('@/images/icons/03.png')} />
                                <Text style={s.yhhxLabelText}>最想要的建面</Text>
                            </View>
                        </View>
                        <View style={s.line} />
                        <View style={s.yhhxItem}>
                            <Text style={s.yhhxValueText2}>{this.state.intentionPrice}万左右</Text>
                            <View style={s.yhhxLabel}>
                                <Image style={s.yhhxLabelImg} source={require('@/images/icons/04.png')} />
                                <Text style={s.yhhxLabelText}>最在意的价格</Text>
                            </View>
                        </View>
                    </Card>

                    {/* 房源类型 */}
                    <Card title='房源类型倾向' bodyStyle={s.fylxLayer}>
                        {/* 图标&中间文本 */}
                        <View style={s.fylxChart}>
                            <Echarts
                                height={scaleSize(264)}
                                width={scaleSize(264)}
                                option={{
                                    series: [{
                                        type: 'pie',
                                        radius: ['60%', '100%'],
                                        silent: true,
                                        label: { normal: { show: false } },
                                        data: [
                                            { value: sp.count, itemStyle: { normal: { color: '#31B9DF' } } },
                                            { value: xzl.count, itemStyle: { normal: { color: '#2ED8A9' } } },
                                            { value: gy.count, itemStyle: { normal: { color: '#728FE2' } } },
                                            { value: ck.count, itemStyle: { normal: { color: '#7053E4' } } },
                                            { value: this.state.sumCount ? 0 : 1, itemStyle: { normal: { color: '#EAEAEA' } } }
                                        ],
                                    }],
                                }}
                            />
                            <View style={s.fylxChartCenter}>
                                <Text style={s.fylxChartCenterValue}>{this.state.sumCount}</Text>
                                <Text style={s.fylxChartCenterLabel}>浏览房源/次</Text>
                            </View>
                        </View>

                        {/* 右侧统计数据 */}
                        <View style={s.fylxRight}>
                            <ChartRightItem color='#31B9DF' title='商铺' value={sp.count} percent={sp.percent} />
                            <ChartRightItem color='#2ED8A9' title='写字楼' value={xzl.count} percent={xzl.percent} />
                            <ChartRightItem color='#728FE2' title='公寓' value={gy.count} percent={gy.percent} />
                            <ChartRightItem color='#7053E4' title='车库' value={ck.count} percent={ck.percent} />
                        </View>
                    </Card>

                    {/* 浏览房源记录 */}
                    <View style={s.fyjl}>
                        <View style={s.fyjlLabel}>
                            <Text style={s.fyjlLabelText}>浏览房源记录</Text>
                        </View>
                        {buildingList.map((item, index) => (
                            <View style={s.bli} key={index}>
                                <TouchableOpacity style={s.bliTitle} onPress={this.gotoBuildingDetail(item.buildingTreeId)}>
                                    <Text style={s.bliText} numberOfLines={1}>
                                        <Text style={{ color: '#FE5139' }}>{`NO.${index + 1} `}</Text>
                                        {item.buildingTreeName}
                                    </Text>
                                    <Image style={s.bliImg} source={require('@/images/icons/05.png')} />
                                </TouchableOpacity>
                                <View style={s.bliMRow}>
                                    <View style={s.bliTags}>
                                        <Label.BuildingSaleStatus _key={item.saleStatus} />
                                        <Label.TreeCategory _key={item.type} />
                                    </View>
                                    <Text style={s.bliMRowRight}>{`浏览 ${item.viewCount || 0}`}</Text>
                                </View>
                                <ScrollView horizontal style={s.bliItemList}>
                                    {item?.shopList?.map?.((iitem, iindex) => (
                                        <TouchableOpacity style={s.bliIitem} key={iindex} onPress={this.gotoShopDetail(item.buildingTreeId, iitem.shopId)}>
                                            {
                                                iitem.icon
                                                    ? <Image style={s.bliIcon} source={{ uri: iitem.icon }} onError={this.handleImgError(index, iindex)} />
                                                    : <Image style={s.bliIcon} source={require('@/images/defaultImage/default_2.png')} />
                                            }
                                            <View style={s.bliIitemTV}>
                                                <Text style={s.blit1} numberOfLines={1}>{iitem.shopName}</Text>
                                                <Text style={s.nlit2} numberOfLines={1}>{iitem.area}㎡/<Text style={{ color: '#FE5139' }}>{iitem.price}万</Text></Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                {/* 底部按钮 */}
                <View style={s.fixedBottom}>
                    {wechatInfo.isRelationCustomerId
                        ?
                        <TouchableOpacity style={styles.reportCus} onPress={this.gotoAddReport}>
                            <Text style={styles.reportCusText}>提交报备</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity disabled={true} style={[styles.reportCus, { backgroundColor: '#EAEAEA' }]}>
                            <Text style={[styles.reportCusText, { color: '#CBCBCB' }]}>未关联客户 无法报备</Text>
                        </TouchableOpacity>
                    }
                </View>

                {/* 关联客户 */}
                <ReModal
                    visible={reVisible}
                    onClose={this.onRelaModalClose}
                    onOk={this.sure}
                    type='basic'
                    width={541}
                    height={560}
                    title='关联已有客户'
                >
                    <View style={styles.reView}>
                        <View>
                            <TouchableOpacity style={styles.allPhone} onPress={() => {
                                this.changePhone()
                            }}>
                                <Image source={changeBoolean ? SELECT : UNSELECT} style={styles.selectImg} />
                                <Text style={styles.phoneText}>{changeBoolean ? '全号码' : '半号码'}</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            changeBoolean ?
                                <TextInput
                                    placeholder='请输入11位手机号'
                                    keyboardType='numeric'
                                    maxLength={11}
                                    style={{ borderBottomWidth: 1, borderBottomColor: '#EAEAEA' }}
                                    onChangeText={this.changePhoneText}
                                /> :
                                <Input
                                    onChange={(e) => this.setValue('phone', e)}
                                    value={fromData.phone}
                                    placeholder=''
                                    maxLength={7}
                                    keyboardType='numeric'
                                    elem={ref => this.inputTest0 = ref}
                                    style={{ textAlign: 'right', paddingRight: scaleSize(32), width: 0, height: 0, padding: 2 }}
                                    rightContent={this._rightContent(0, fromData.phone)}
                                />
                        }

                        <Text style={styles.relaModalText}>请输入电话号码进行关联</Text>
                    </View>
                </ReModal>

                {/* 搜索有结果时的Madal */}
                <ReModal
                    visible={showReleData}
                    onClose={this.showCloseData}
                    type='basic'
                    footerType='one'
                    width={541}
                    height={560}
                    title='请选择'
                    cancelText='取消'
                >
                    <FlatList
                        extraData={this.state}
                        style={{ flex: 1 }}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItems}
                        data={relaData}
                    />
                </ReModal>

                {/* 搜索无结果时的Modal */}
                <ReModal
                    visible={addCus}
                    onClose={this.noDataClose}
                    onOk={this.addCusModal}
                    type='basic'
                    width={541}
                    height={560}
                    title='没有关联客户'
                    footerType='two'
                >
                    <View style={styles.addModalView}>
                        <View style={styles.modalContent}>
                            <Text style={styles.relaDataText}>{wechatInfo.customerName}</Text>
                            <Text style={styles.relaDataText}>{this.state.banPhone || phone}</Text>
                        </View>
                        <Text style={[styles.blueText], { marginTop: scaleSize(100), marginLeft: scaleSize(150) }}>是否新增客户资料</Text>
                    </View>
                </ReModal>
            </>
        )
    }
}

export default connect(({ config, user }) => ({
    config, user
}))(WechatInfo)
