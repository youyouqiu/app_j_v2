import React, {Component} from 'react';
import {Text, View, ScrollView, ImageBackground, StyleSheet, Image, DeviceEventEmitter, TouchableOpacity, FlatList, TextInput} from 'react-native'
import {scaleSize} from '../../../../../utils/screenUtil';
import Input from '../../../../../components/Form/Input'
import ApiCustom from '../../../../../services/customManager'
import {Toast} from 'teaset'
import {connect} from 'react-redux'
import moment from 'moment'
import ReModal from '../../../../../components/Modal/index'
import {selectCustomerInfoParam} from '../../../report/addReport'

const CHATBACK = require('../../../../../images/pictures/chastBg.png')
const HEAD = require('../../../../../images/pictures/head.png')
const SEE = require('../../../../../images/icons/see.png')
const GUANZHU = require('../../../../../images/icons/guanzhu.png')
const COMPASS = require('../../../../../images/icons/compass.png')
const ARROW = require('../../../../../images/icons/arrow_right.png')
const RADIO = require('../../../../../images/icons/radio.png')
const INSEE = require('../../../../../images/icons/inSee.png')
const XINYI = require('../../../../../images/icons/xinyi.png')
const SHANGPU = require('../../../../../images/icons/shangpu.png')
const SELECT = require('../../../../../images/icons/select.png')
const UNSELECT = require('../../../../../images/icons/unSelect.png')

const styles = StyleSheet.create({
    bgImg: {
        width: scaleSize(708),
        height: scaleSize(313),
        margin: scaleSize(20)
    },
    topView: {
        width: '100%',
        height: scaleSize(180),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    topLeftView: {
        display: 'flex',
        flexDirection: 'row'
    },
    headImg: {
        width: scaleSize(100),
        height: scaleSize(100),
        marginLeft: scaleSize(50),
        borderRadius: scaleSize(50)
    },
    chatView: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: scaleSize(16)
    },
    nameText: {
        fontSize: scaleSize(32),
        color: '#FFFFFF'
    },
    bindText: {
        fontSize: scaleSize(24),
        color: '#66739B',
        marginTop: scaleSize(28)
    },
    topRightView: {
        width: scaleSize(170),
        height: scaleSize(67),
        backgroundColor: '#1F3070',
        borderRadius: scaleSize(8),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scaleSize(40)
    },
    relaText: {
        fontSize: scaleSize(28),
        color: '#FFFFFF'
    },
    bottomView: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: scaleSize(45)
    },
    seeView: {
        display: 'flex',
        flexDirection: 'column',
        width: scaleSize(120)
    },
    iconImg: {
        width: scaleSize(30),
        height: scaleSize(30)
    },
    seeTop: {
        display: 'flex',
        flexDirection: 'row'
    },
    text: {
        color: '#66739B',
        fontSize: scaleSize(24),
        marginLeft: scaleSize(5)
    },
    dynamic: {
        margin: scaleSize(32)
    },
    dynamicTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: scaleSize(45)
    },
    textTitle: {
        color: '#000000',
        fontSize: scaleSize(32),
        fontWeight: '500'
    },
    arrowImg: {
        height: scaleSize(30),
        width: scaleSize(16),
        marginLeft: scaleSize(8)
    },
    dynamicMiddle: {
        display: 'flex',
        flexDirection: 'row'
    },
    step: {
        display: 'flex',
        // flexDirection: 'column'
        marginTop: scaleSize(32)
    },
    card: {
        marginTop: scaleSize(32),
    },
    cardContent: {
        width: scaleSize(625),
        height: scaleSize(177),
        backgroundColor: '#FFFFFF',
        display: 'flex',
        marginLeft: scaleSize(19),
        flexDirection: 'column',
        marginBottom: scaleSize(40),
        padding: scaleSize(25)
    },
    timeText: {
        color: '#CBCBCB',
        fontSize: scaleSize(24),
        marginBottom: scaleSize(7),
        lineHeight: scaleSize(40)
    },
    radioImg: {
        width: scaleSize(47),
        height: scaleSize(47)
    },
    moren: {
        color: '#868686',
        fontSize: scaleSize(28),
        marginTop: scaleSize(8)
    },
    blueText: {
        color: '#1F3070',
        fontSize: scaleSize(28)
    },
    dataView: {
        display: 'flex',
        flexDirection: 'column',
    },
    dataText: {
        color: '#000000',
        fontSize: scaleSize(32),
        fontWeight: '500',
        marginLeft: scaleSize(36),
    },
    dataCard: {
        width: '100%',
        height: scaleSize(230),
        // backgroundColor: '#FFFFFF',
        marginTop: scaleSize(24),
        marginBottom: scaleSize(40),
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    },
    cardText: {
        color: '#000000',
        fontSize: scaleSize(32),
        fontWeight: '500',
        marginTop: scaleSize(16),
        marginLeft: scaleSize(45)
    },
    bottomText: {
        color: '#868686',
        fontSize: scaleSize(24),
        fontWeight: '400',
        marginLeft: scaleSize(16)
    },
    flCard: {
        width: scaleSize(396),
        height: scaleSize(223),
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderRadius: scaleSize(8),
        marginLeft: scaleSize(40),
        padding: scaleSize(24),
    },
    reportCus: {
        width: scaleSize(686),
        height: scaleSize(108),
        marginLeft: scaleSize(30),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1F3070',
        borderRadius: scaleSize(8)
    },
    reportCusText: {
        color: '#FFFFFF',
        fontSize: scaleSize(32)
    },
    morenView: {
        display: 'flex',
        flexDirection: 'column'
    },
    reView: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: scaleSize(20)
    },
    selectImg: {
        height: scaleSize(30),
        width: scaleSize(30),
        marginTop: scaleSize(5)
    },
    allPhone: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: scaleSize(65)
    },
    phoneText: {
        color: '#000000',
        fontSize: scaleSize(28),
        fontWeight: '400',
        marginLeft: scaleSize(15)
    },
    relaModalText: {
        color: '#1F3070',
        fontSize: scaleSize(28),
        fontWeight: '400',
        marginLeft: scaleSize(60),
        marginTop: scaleSize(50)
    },
    relaDataView: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: scaleSize(78),
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    relaDataText: {
        color: '#000000',
        fontSize: scaleSize(28)
    },
    addModalView: {
        display: 'flex',
        flexDirection: 'column'
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'row',
        height: scaleSize(45),
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: scaleSize(100)
    },
    textWarpSmall: {
        width: scaleSize(52),
        height: scaleSize(60),
        borderBottomColor: 'rgba(203,203,203,1)',
        borderBottomWidth: scaleSize(2),
        backgroundColor: 'rgba(255,255,255,1)',
        textAlign: 'center',
        lineHeight: scaleSize(70),
    },
    inputYesBorder: {
        borderColor: 'rgba(31,48,112,1)',
    },
    inputRightWarp: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scaleSize(32),
    },
    itemContent: {
        // backgroundColor: 'red',
        // marginTop: scaleSize(0),
    }
})


class WechatInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            showDel: false,
            banPhone: ''
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this._getweChatInfo()
        })
    }

    gotoAddReport = async () => {
        const wechatInfo = this.state.wechatInfo || {}
        let {api} = this.props.config.requestUrl
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
                let dataArr = []
                customerPhones.map((item, index) => {
                    dataArr.push({phone: item.phone, isMain: index === 0 ? true : false})
                })

                let _q = new selectCustomerInfoParam()

                _q.phones = dataArr
                _q.customerName = dataInfo.customerName || '';
                _q.customerId = dataInfo.id || '';
                _q.sex = dataInfo.sex || false;
                this.props.navigation.navigate('addReport', {customerInfo: _q})
            } else {
                Toast.message('报备失败' + res.message)
            }
        } catch (e) {
            Toast.message('报备失败')
        }
    }

    _getweChatInfo = async () => {
        let {api} = this.props.config.requestUrl
        let id = ''
        // id是交叉的
        let obj = (((this.props.navigation || {}).state || {}).params || {})
        if (obj.fromCusList) {
            id = obj.relationCustomerId
        } else {
            id = obj.id
        }

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

    _keyExtractor = (index) => index + '';

    gotoBuildingDetail = (id) => {
        this.props.navigation.navigate('buildingDetail', {buildingTreeId: id})
    };

    gotoShopDetail = (buildingTreeId, shopId) => {
        this.props.navigation.navigate('shopDetail', {shopId, buildingTreeId})
    };

    myStep = ({item}) => {
        console.log('myStep', item);
        let renderContent = null
        if (item.trackType === 1) {
            renderContent = (
                <View style={styles.itemContent}>
                    <Text style={styles.timeText}>{item.createTime ? moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') : null}</Text>
                    <Text style={styles.moren}>
                        第<Text style={styles.blueText}>{item.viewCount}</Text>
                        <Text style={styles.moren}>次浏览楼盘</Text>
                        <Text style={styles.blueText} onPress={() => this.gotoBuildingDetail(item.buildingId)}>"{item.buildingName}"</Text>
                        {item.shopName ? (
                            <Text style={styles.moren}>的商铺
                                <Text style={styles.blueText} onPress={() => this.gotoShopDetail(item.buildingId,item.shopId)}>{item.shopName}</Text>
                            </Text>
                        ) : null}
                    </Text>
                </View>
            )
        } else if (item.trackType === 2) {
            renderContent = (
                <View>
                    <Text style={styles.timeText}>{item.createTime ? moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') : null}</Text>
                    <Text>
                        <Text style={styles.moren}>关注了楼盘</Text>
                        <Text style={styles.blueText} onPress={() => this.gotoBuildingDetail(item.buildingId)}>"{item.buildingName}"</Text>
                        {item.shopName ? (
                            <Text style={styles.moren}>的商铺
                                <Text style={styles.blueText} onPress={() => this.gotoShopDetail(item.buildingId,item.shopId)}>{item.shopName}</Text>
                            </Text>
                        ) : null}
                    </Text>
                </View>
            )
        } else if (item.trackType === 3) {
            renderContent = (
                <View>
                    <Text style={styles.timeText}>{item.createTime ? moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') : null}</Text>
                    <Text>
                        <Text style={styles.moren}>取消关注了楼盘</Text>
                        <Text style={styles.blueText} onPress={() => this.gotoBuildingDetail(item.buildingId)}>"{item.buildingName}"</Text>
                        {item.shopName ? (
                            <Text style={styles.moren}>的商铺
                                <Text style={styles.blueText} onPress={() => this.gotoShopDetail(item.buildingId,item.shopId)}>{item.shopName}</Text>
                            </Text>
                        ) : null}
                    </Text>
                </View>
            )
        } else if (item.trackType === 4) {
            renderContent = (
                <View>
                    <Text style={styles.timeText}>{item.createTime ? moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') : null}</Text>
                    <Text style={styles.moren}> 搜索了<Text style={styles.text}> &quot;{item.word}&quot;</Text></Text>
                </View>
            )
        } else {
            renderContent = (
                <View>
                    <Text style={styles.timeText}>{item.createTime ? moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') : null}</Text>
                    <Text style={styles.moren}>{item.dataType == 1 ? (
                        <Text>筛选了{item.wordType === 1 ? '总价' : '面积'}
                            <Text style={styles.text}>{item.word}</Text>的楼盘</Text>
                    ) : (
                        <Text>在楼盘
                            <Text style={styles.text} onPress={() => this.gotoBuildingDetail(item.buildingId)}>{item.buildingName}</Text>
                            中筛选了{item.wordType == 1 ? '总价' : '面积'}
                            <Text style={styles.text}>{item.word}</Text>的商铺
                        </Text>
                    )}
                    </Text>
                </View>
            )
        }

        return <View style={styles.cardContent}>
            {renderContent}
        </View>
    }

    _renderFloorItem = ({item}) => {
        let cardContent = null
        if (item.type === 'building') {
            console.log(item.value,'item.value')
            cardContent = (
                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.gotoBuildingDetail(item.value.buildingId)} style={styles.flCard}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Image source={INSEE} style={{width: scaleSize(30), height: scaleSize(30)}}/>
                        <Text style={styles.bottomText}>浏览最多的楼盘</Text>
                    </View>
                    <Text style={styles.cardText}>{item.value.buildingName}</Text>
                </TouchableOpacity>
            )
        } else if (item.type === 'area') {
            cardContent = (
                <View style={styles.flCard}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Image source={XINYI} style={{width: scaleSize(30), height: scaleSize(30)}}/>
                        <Text style={styles.bottomText}>最心仪的区域</Text>
                    </View>
                    <Text style={styles.cardText}>{item.value}</Text>
                </View>
            )
        } else {
            cardContent = (
                <View style={styles.flCard}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Image source={SHANGPU} style={{width: scaleSize(30), height: scaleSize(30)}}/>
                        <Text style={styles.bottomText}>最关注这样的商铺</Text>
                    </View>
                    <Text style={styles.cardText}>平均 {item.value.price} / {item.value.area}㎡上下</Text>
                </View>
            )
        }
        return cardContent
    }

    gotodynLogger = () => {
        const { id, relationCustomerId, source } = this.props.navigation.state.params
        this.props.navigation.navigate('dynamicLogging', { id, relationCustomerId, source })
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
        let {phone, number, changeBoolean, fromData} = this.state
        let {api} = this.props.config.requestUrl
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
        let {wechatInfo} = this.state
        let params = {
            wxCustomerId: wechatInfo.id,
            relationCustomerId: va.id,
            bindPhone: va.mainPhone
        }
        let {api} = this.props.config.requestUrl
        try {
            let res = await ApiCustom.relationCus(api, params)
            if (res.code === '0') {
                Toast.message('关联客户成功')
                let params = {
                    fromWeInfo: true
                }
                this.props.navigation.navigate('customerList')
                DeviceEventEmitter.emit('AddCustomer', params)
                // this._getweChatInfo()
            } else {
                Toast.message('关联客户失败')
            }
        } catch (e) {
            Toast.message('关联客户失败')
        }
    }

    _keyExtractor = (index) => index.toString()

    _renderItems = ({item}) => {
        let {dataSelect} = this.state
        return (
            <TouchableOpacity onPress={() => this.relationCus(item)}>
                <View style={styles.relaDataView}>
                    <Image source={dataSelect ? SELECT : UNSELECT} style={styles.selectImg}/>
                    <Text style={[styles.relaDataText], {width: scaleSize(200)}} numberOfLines={1}>{item.customerName}</Text>
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
        let {banPhone, wechatInfo, phone, changeBoolean} = this.state
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
        let {api} = this.props.config.requestUrl
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
                    style={{marginRight: scaleSize(8)}}
                    activeOpacity={0.8}
                    onPress={() => {
                        this.onFocusColor(num)
                    }}
                >
                    <Text style={[styles.textWarpSmall, valueList.length === 1 ? styles.inputYesBorder : null]}>{valueList[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{marginRight: scaleSize(8)}}
                    activeOpacity={0.8}
                    onPress={() => {
                        this.onFocusColor(num)
                    }}
                >
                    <Text style={[styles.textWarpSmall, valueList.length === 2 ? styles.inputYesBorder : null]}>{valueList[1]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{marginRight: scaleSize(8)}}
                    activeOpacity={0.8}
                    onPress={() => {
                        this.onFocusColor(num)
                    }}
                >
                    <Text style={[styles.textWarpSmall, valueList.length === 3 ? styles.inputYesBorder : null]}>{valueList[2]}</Text>
                </TouchableOpacity>

                <Text style={{fontSize: scaleSize(28), color: 'rgba(0,0,0,1)', marginLeft: scaleSize(8)}}>****</Text>

                <TouchableOpacity
                    style={{marginRight: scaleSize(8)}}
                    activeOpacity={0.8}
                    onPress={() => {
                        this.onFocusColor(num)
                    }}
                >
                    <Text style={[styles.textWarpSmall, valueList.length === 4 ? styles.inputYesBorder : null]}>{valueList[3]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{marginRight: scaleSize(8)}}
                    activeOpacity={0.8}
                    onPress={() => {
                        this.onFocusColor(num)
                    }}
                >
                    <Text style={[styles.textWarpSmall, valueList.length === 5 ? styles.inputYesBorder : null]}>{valueList[4]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{marginRight: scaleSize(8)}}
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
        let {fromData} = this.state;

        Object.assign(fromData, {[key]: value});

        this.setState({
            fromData,
        })
    }


    render() {
        let {wechatInfo, developData, dataAnalysis, reVisible, showReleData, relaData, addCus, phone, changeBoolean, fromData} = this.state
        const Step = () => {
            return (
                <View>
                    <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: scaleSize(47)}}>
                        <Image source={RADIO} style={styles.radioImg}/>
                        <View style={{width: scaleSize(3), height: scaleSize(160), backgroundColor: '#EAEAEA'}}></View>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: scaleSize(47)}}>
                        <Image source={RADIO} style={styles.radioImg}/>
                        <View style={{width: scaleSize(3), height: scaleSize(160), backgroundColor: '#EAEAEA'}}></View>
                    </View>
                </View>
            )
        }

        return (
            <ScrollView>
                <ImageBackground source={CHATBACK} style={styles.bgImg}>
                    <View style={styles.topView}>
                        <View style={styles.topLeftView}>
                            <Image source={wechatInfo.headImg ? {uri: wechatInfo.headImg} : HEAD} style={styles.headImg}/>
                            <View style={styles.chatView}>
                                <Text style={styles.nameText}>{wechatInfo.customerName}</Text>
                                <Text style={styles.bindText}>{wechatInfo.isRelationCustomerId ? '已绑定' : '未绑定'}</Text>
                            </View>
                        </View>
                        {
                            !wechatInfo.isRelationCustomerId ?
                                <TouchableOpacity onPress={this.relaCus}>
                                    <View style={styles.topRightView}>
                                        <Text style={styles.relaText}>关联客户</Text>
                                    </View>
                                </TouchableOpacity>
                                : null
                        }

                    </View>
                    <View style={styles.bottomView}>
                        <View style={styles.seeView}>
                            <View style={styles.seeTop}>
                                <Image source={SEE} style={styles.iconImg}/>
                                <Text style={styles.text}>浏览</Text>
                            </View>
                            <Text style={[styles.relaText, {marginLeft: scaleSize(40), marginTop: scaleSize(8)}]}>{wechatInfo.viewCount}</Text>
                        </View>
                        <View style={styles.seeView}>
                            <View style={styles.seeTop}>
                                <Image source={GUANZHU} style={styles.iconImg}/>
                                <Text style={styles.text}>关注</Text>
                            </View>
                            <Text style={[styles.relaText, {marginLeft: scaleSize(40), marginTop: scaleSize(8)}]}>{wechatInfo.likeCount}</Text>
                        </View>
                        <View style={[styles.seeView]}>
                            <View style={styles.seeTop}>
                                <Image source={COMPASS} style={styles.iconImg}/>
                                <Text style={styles.text}>浏览倾向</Text>
                            </View>
                            <Text style={[styles.relaText, {
                                marginLeft: scaleSize(40),
                                marginTop: scaleSize(8),
                                width: scaleSize(300)
                            }]}>{wechatInfo.likeType || '暂无'}</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.dynamic}>
                    <View style={styles.dynamicTitle}>
                        <Text style={styles.textTitle}>近期动态</Text>
                        <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}} onPress={this.gotodynLogger}>
                            <Text>更多</Text>
                            <Image source={ARROW} style={styles.arrowImg}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dynamicMiddle}>
                        <View style={styles.step}>
                            {/* <Image source={RADIO} style={styles.radioImg}/> */}
                            <Step/>
                        </View>
                        <View style={styles.card}>
                            <FlatList
                                style={{flex: 1}}
                                keyExtractor={this._keyExtractor}
                                renderItem={this.myStep}
                                data={developData}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.dataView}>
                    <Text style={styles.dataText}>Ta的数据分析</Text>
                    <View style={styles.dataCard}>
                        <FlatList
                            horizontal={true}
                            data={dataAnalysis}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderFloorItem}
                        />
                    </View>
                </View>
                <View style={{marginBottom: scaleSize(20)}}>
                    {
                        wechatInfo.isRelationCustomerId ?
                            <TouchableOpacity style={styles.reportCus} onPress={() => this.gotoAddReport()}>
                                <Text style={styles.reportCusText}>报备客户</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity disabled={true} style={[styles.reportCus, {backgroundColor: '#EAEAEA'}]}>
                                <Text style={[styles.reportCusText, {color: '#CBCBCB'}]}>未关联客户 无法报备</Text>
                            </TouchableOpacity>
                    }

                </View>
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
                                <Image source={changeBoolean ? SELECT : UNSELECT} style={styles.selectImg}/>
                                <Text style={styles.phoneText}>{changeBoolean ? '全号码' : '半号码'}</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            changeBoolean ?
                                <TextInput
                                    placeholder='请输入11位手机号'
                                    keyboardType='numeric'
                                    maxLength={11}
                                    style={{borderBottomWidth: scaleSize(1), borderBottomColor: '#EAEAEA'}}
                                    onChangeText={this.changePhoneText}
                                /> :
                                <Input
                                    onChange={(e) => this.setValue('phone', e)}
                                    value={fromData.phone}
                                    placeholder=''
                                    maxLength={7}
                                    keyboardType='numeric'
                                    elem={ref => this.inputTest0 = ref}
                                    style={{textAlign: 'right', paddingRight: scaleSize(32), width: 0, height: 0, padding: 2}}
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
                        style={{flex: 1}}
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
                        <Text style={[styles.blueText], {marginTop: scaleSize(100), marginLeft: scaleSize(150)}}>是否新增客户资料</Text>
                    </View>
                </ReModal>
            </ScrollView>
        )
    }
}

const mapStateToProps = ({config, user}) => {
    return {config, user}
}

export default connect(mapStateToProps)(WechatInfo)
