import React, { Component } from 'react'
import BaseContainer from '../../../components/Page'
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, DeviceEventEmitter ,KeyboardAvoidingView} from 'react-native'
import { scaleSize } from '../../../utils/screenUtil';
import Input from '../../../components/Form/Input'
import BuyGrade from './grade'
import ApiCustom from '../../../services/customManager'
import { Toast } from 'teaset'
import { createForm, formShape } from 'rc-form'
import { Picker } from 'xkjdatepicker'
import { debounce } from '../../../utils/utils'
import MatchModal from '../../../components/Modal/index'

const styles = StyleSheet.create({
    topView: {
        width: '100%',
        height: scaleSize(80),
        backgroundColor: '#F8F8F8'
    },
    topText: {
        color: '#000000',
        fontSize: scaleSize(24),
        marginLeft: scaleSize(32),
        marginTop: scaleSize(24)
    },
    nameView: {
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: scaleSize(1)
    },
    text: {
        color: '#868686',
        fontSize: scaleSize(28),
        marginLeft: scaleSize(32),
        width: 100,
    },
    rightText: {
        color: '#CBCBCB',
        fontSize: scaleSize(28),
        marginRight: scaleSize(32)
    },
    sexBet: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: scaleSize(360),
        marginRight: scaleSize(32)
    },
    sexView: {
        width: scaleSize(170),
        height: scaleSize(46),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#CBCBCB',
        borderWidth: scaleSize(1),
        borderRadius: scaleSize(22)
    },
    sexText: {
        color: '#868686',
        fontSize: scaleSize(24)
    },
    phoneView: {
        display: 'flex',
        flexDirection: 'row'
    },
    switchImg: {
        width: scaleSize(64),
        height: scaleSize(40)
    },
    addPhoneView: {
        width: '100%',
        height: scaleSize(100),
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addPhoneImg: {
        width: scaleSize(40),
        height: scaleSize(40)
    },
    yiyuan: {
        marginRight: scaleSize(32),
        color: '#000000',
        fontSize: scaleSize(28)
    },
    arrowImg: {
        width: scaleSize(16),
        height: scaleSize(30),
        marginRight: scaleSize(32)
    },
    bottomView: {
        width: scaleSize(686),
        height: scaleSize(108),
        backgroundColor: '#1F3070',
        borderRadius: scaleSize(8),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: scaleSize(32)
    },
    bottomText: {
        color: '#FFFFFF',
        fontSize: scaleSize(32)
    },
    buyGrade: {
        width: '100%',
        height: scaleSize(105),
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: scaleSize(1),
        justifyContent: 'space-between'
    },
    grade: {
        color: '#868686',
        fontSize: scaleSize(28),
        marginLeft: scaleSize(32)
    },
    pickerView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: scaleSize(104),
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,
        width: '100%'
    },
    gradeView: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: scaleSize(104),
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: scaleSize(1)
    },
    inputStyle: {
        backgroundColor: '#F8F8F8',
        borderColor: '#CBCBCB',
        borderWidth: scaleSize(1),
        width: scaleSize(686),
        height: scaleSize(272),
        marginLeft: scaleSize(32),
        marginTop: scaleSize(32),
        padding: scaleSize(20),
        textAlignVertical: 'top'
    }
})

const FIVE = 5

const SWITCHON = require('../../../images/icons/switchOn.png')
const SWITCHOFF = require('../../../images/icons/switchOff.png')
const ADDPHONE = require('../../../images/icons/addPhone2.png')
const ARROW = require('../../../images/icons/arrow_right.png')
const DELETE = require('../../../images/icons/delelte2.png')

const matchData = [
    { label: '公交', code: '公交' },
    { label: '轨道交通', code: '轨道交通' },
    { label: '幼儿园', code: '幼儿园' },
    { label: '小学', code: '小学' },
    { label: '中学', code: '中学' },
    { label: '大学', code: '大学' },
    { label: '商场', code: '商场' },
    { label: '超市', code: '超市' },
    { label: '医院', code: '医院' },
    { label: '银行', code: '银行' }
]

class AddCustom extends Component {
    static propTypes = {
        form: formShape
    }

    constructor(props) {
        super(props)
        this.state = {
            isMan: true,
            phoneList: [{ key: 0, status: true, seq: 0 }],
            val: this.props.title,
            ageArr: [],
            buildType: [],
            purchasePose: [],
            toward: [],
            matchingArr: [],
            cityList: [],    //城市列表
            ageChooseValue: '',
            buildTypeChooseValue: '',
            mark: '',
            dataInfo: {},
            comPhone: '',
            num: 0,
            activeIndex: -1,
            addPhoneFlag: true,
            isShowBottom: true,
            showMatching: false,
            selectCode: [],
            areaCode: '',
            provinceCode: ''
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.dictionaries.age !== prevState.ageArr) {
            return {
                ...prevState,
                ageArr: nextProps.dictionaries.age || [],
                buildType: nextProps.dictionaries.project_type || [],
                purchasePose: nextProps.dictionaries.purchase_purpose || [],
                toward: nextProps.dictionaries.shop_toward || [],
                matchingArr: nextProps.dictionaries.suppotr_info || [],
            }
        }
    }

    componentDidMount() {
        let id = (((this.props.navigation || {}).state || {}).params || {}).id || ''
        let isEdit = (((this.props.navigation || {}).state || {}).params || {}).isEdit || false
        this.setState({
            isEdit: isEdit
        })
        this.getListCity()
        if (id || isEdit) {
            // 查询该客户详情
            this.getCusInfo(id)
        }
        // this.submit()
        const { buildType } = this.state
        if (buildType.length === 0 || isEdit) {
            this.getSearchInfoDic()
        }
        // buildType.length === 0 || this.state.isEdit ? this.getSearchInfoDic() : null
    }

    componentWillUnmount() {
        this.props.form.resetFields()
    }

    // 获取客户详情
    getCusInfo = async (id) => {
        let { api } = this.props.config.requestUrl
        let params = {
            customerId: id,
            buildingTreeId: ''
        }
        try {
            let res = await ApiCustom.cusDetail(api, params)
            if (res.code === '0') {
                let dataInfo = res.extension || {}
                this.setState({
                    dataInfo
                }, () => {
                    this.copyData()
                })
            } else {
                Toast.message('获取客户详情失败')
            }
        } catch (e) {
            Toast.message('获取客户详情失败')
        }
    }

    copyData = async () => {
        let { form } = this.props
        let { dataInfo, phoneList } = this.state
        let regPhone = /^1[3-9]{1}[\d]{9}$/;
        let customerPhones = dataInfo.customerPhones || []

        customerPhones.map((va) => {
            phoneList.map((item) => {
                item.phone = va.phone
            })
        })

        let phoneData = []
        customerPhones.map((item, index) => {
            phoneData.push({ key: index, status: regPhone.test(item.phone), phone: item.phone, seq: item.seq })
        })

        await this.setState({
            phoneList: phoneData,
            num: phoneData.length,
            areaCode: dataInfo.area,
            provinceCode: dataInfo.province,
            ageChooseValue: (dataInfo.portrait || {}).age || '',
            chooseResidentArea: (dataInfo.portrait || {}).address || '',
            buildTypeChooseValue: (dataInfo.portrait || {}).buildingCategory || '',
            chooseMatchingValue: (dataInfo.portrait || {}).matching || '',
            chooseTowardValue: (dataInfo.portrait || {}).direction || '',
            choosepurchasePoseValue: (dataInfo.portrait || {}).homePurchaseTarget || '',
            chooseAreafullName: (dataInfo || {}).areaFullName || ''
        }, () => {
            this.state.phoneList.map((item) => {
                form.setFieldsValue({ [`phone${item.key}`]: item.phone })
            })
        })

        if (dataInfo.sumBudget) {
            dataInfo.sumBudget = dataInfo.sumBudget + ''
        }
        if (dataInfo.sumArea) {
            dataInfo.sumArea = dataInfo.sumArea + ''
        }

        if ((dataInfo.portrait || {}).matching || '') {
            this.setState({
                selectCode: ((dataInfo.portrait || {}).matching || '').split(',')
            })
        }

        if (!dataInfo.sex) {
            await this.setState({
                isMan: !this.state.isMan
            })
        }
        if (typeof (dataInfo.grade) === 'number' && dataInfo.grade >= 0) {
            // if (dataInfo.grade === 0) {
            //     dataInfo.grade === 1
            // }
            await this.setState({
                activeIndex: FIVE - dataInfo.grade,
            })
        }

        form.setFieldsValue(dataInfo)

    }

    getSearchInfoDic = () => {
        const { dispatch, config } = this.props;
        dispatch({
            type: 'dictionaries/getDictionaryDefines',
            payload: {
                requestUrl: config.requestUrl.public,
                requestData: ['PROJECT_TYPE', 'PURCHASE_PURPOSE', 'SHOP_TOWARD', 'AGE', 'SUPPOTR_INFO']
            }
        })
    }

    //  获取城市列表
    getListCity = async () => {
        let _public = this.props.config.requestUrl.public
        let params = this.props.user.userInfo.city
        try {
            let res = await ApiCustom.getCityList(_public, params)
            if (res && res.code === '0') {
                this.setState({
                    city: res.extension
                }, () => {
                    this.dealFirstLevel()
                })
            } else {
                Toast.message('查询城市列表报错' + res.message || '')
            }
        } catch (e) {
            Toast.message('查询城市列表报错')
        }
    }

    dealFirstLevel = () => {
        let { city } = this.state
        let arr = []
        for (let i in city) {
            arr.push({ key: city[i].code, value: city[i].name + '_' + city[i].code, label: city[i].name, children: city[i].childAreas || [] })
        }
        this.setState({
            cityList: arr
        }, () => {
            this.dealSecondLevel()
        })
    }

    dealSecondLevel = () => {
        let { cityList } = this.state
        cityList.map((item) => {
            item.children.map((va) => {
                va.label = va.name
                va.value = va.name + '_' + va.code
            })
        })
    }

    chooseMan = () => {
        this.setState({
            isMan: true,
        })
    }

    chooseWomen = () => {
        this.setState({
            isMan: !this.state.isMan,
        })
    }

    changePhoneStatus = ({ key, status }) => {
        let { phoneList } = this.state
        const { form } = this.props
        let phone = form.getFieldValue(`phone${key}`) || ''

        if (phone.length === 11 || phone.length === 0) {
            phoneList.map((item) => {
                if (key === item.key) {
                    item.status = !item.status
                }
            })
            this.setState({
                phoneList
            })
            let newPhoneValue = this.dealPhone(phone, !status)
            form.setFieldsValue({ [`phone${key}`]: newPhoneValue })

        } else {
            Toast.message('请正确操作')
            return
        }
    }

    dealPhone = (va, status) => {
        let str = ''
        if (status) {
            if (va.length === 0) return ''
            let xx = va.substring(3, va.length - 4)
            str = va.replace(xx, '0000')
        } else {
            if (va.length === 0) return ''
            // let xx = va.substring(3, va.length - 4)
            // str = va.replace(xx, '****')
            str = va.slice(0, 3) + '****' + va.substring(va.length - 4)
        }
        return str
    }

    setValue = (text, item) => {
        const { form } = this.props
        if (item.status) {
            form.setFieldsValue({ [`phone${item.key}`]: text })
        } else {
            if (text.length === 3) {
                let changeValue = form.getFieldValue(`phone${item.key}`) || ''
                if (changeValue.length > text.length) {
                    form.setFieldsValue({ [`phone${item.key}`]: text })
                } else {
                    text = text + '****'
                    form.setFieldsValue({ [`phone${item.key}`]: text })
                }
            } else {
                form.setFieldsValue({ [`phone${item.key}`]: text })
            }
        }
    }


    addPhone = () => {
        let { phoneList, num, isEdit } = this.state
        num++

        if (phoneList.length >= 4) {
            this.setState({
                addPhoneFlag: false
            })
        }
        if (phoneList.length >= 5) {
            Toast.message('抱歉,最多只能添加5个电话')
            return false
        }

        if (isEdit) {
            // 完善资料时进入
            phoneList.push({ key: num, status: true, seq: num })
        } else {

            // 新建
            phoneList.push({ key: num, status: true, seq: num })
        }

        this.setState({
            phoneList,
            num
        })
    }

    submit = async () => {
        let { form } = this.props
        let { isMan, phoneList, dataInfo } = this.state
        let { api } = this.props.config.requestUrl
        let id = (((this.props.navigation || {}).state || {}).params || {}).id || ''
        let huaXiangId = (dataInfo.portrait || {}).id || ''
        let submitObj = form.getFieldsValue()
        if (submitObj.customerName === undefined || submitObj.phone0 === undefined) {
            Toast.message('请填写必填信息后再提交')
            return
        }
        let regName = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{1,10}$/;
        let regPhone = /^1[3-9]{1}[\d]{9}$/;
        let regBanPhone = /^1[3-9][\d]{1}\*\*\*\*[\d]{4}$/
        let regNum = /^[1-9][0-9]{0,3}$/

        if (!regName.test(submitObj.customerName)) {
            Toast.message('姓名为10位以内的汉字');
            return false;
        }
        phoneList.map((item) => {
            item.phone = submitObj[`phone${item.key}`]
        })

        let flag = true

        phoneList.some((item) => {
            if (item.status) {
                if (!regPhone.test(item.phone)) {
                    Toast.message('请输入正确的手机号');
                    flag = false
                    return
                }
            } else {
                if (!regBanPhone.test(item.phone)) {
                    Toast.message('请输入正确的手机号');
                    flag = false
                    return
                }
            }
        })

        if (!flag) return

        if (submitObj.sumArea) {
            if (!regNum.test(submitObj.sumArea)) {
                Toast.message('建面可填范围：1·9999, 整数');
                return false;
            }
        }
        if (submitObj.sumBudget) {
            if (!regNum.test(submitObj.sumBudget)) {
                Toast.message('预算可填范围：1·9999, 整数');
                return false;
            }
        }
        let obj = {}
        // 编辑修改时 有客户id
        if (id) {
            obj.customerInfoId = id
        }
        if (isMan) {
            obj.sex = true
        } else {
            obj.sex = false
        }
        obj.mark = this.state.mark || ''
        obj.customerName = submitObj.customerName || ''
        obj.mainPhone = submitObj.phone0 || ''
        console.log(this.state.areaCode, this.state.provinceCode)
        obj.xkjCustomerDemandRequest = {
            city: this.props.user.userInfo.city,
            area: this.state.areaCode,
            province: this.state.provinceCode,
            sumArea: submitObj.sumArea,
            sumBudget: submitObj.sumBudget,
            grade: this.state.isEdit ? FIVE - this.state.activeIndex : FIVE - this.state.grade,
            areaFullName: this.state.chooseAreafullName,
        },
            obj.customerPortrait = {
                age: this.state.ageChooseValue,
                address: this.state.chooseResidentArea,
                buildingCategory: this.state.buildTypeChooseValue,
                matching: this.state.chooseMatchingValue,
                direction: this.state.chooseTowardValue,
                homePurchaseTarget: this.state.choosepurchasePoseValue,
                id: huaXiangId ? huaXiangId : ''
            }
        obj.isFullPhone = phoneList[0].status

        let phoneArr = []

        phoneList.map((item) => {
            phoneArr.push({ phone: item.phone, seq: item.seq })
        })

        phoneArr.map((item, index) => {
            if (index === 0) {
                item.isMain = true
            } else {
                item.isMain = false
            }
        })

        obj.phones = phoneArr

        console.log(obj, 'objobjobj')

        if (id) {
            try {
                obj
                let res = await ApiCustom.updateCustom(api, obj)
                if (res.code === '0') {
                    this.props.navigation.navigate('customerList')
                    DeviceEventEmitter.emit('ReportBack')
                    Toast.message('修改成功')
                } else {
                    Toast.message('修改失败')
                }
            } catch (e) {
                Toast.message('修改失败')
            }
        } else {
            try {
                let res = await ApiCustom.addCustom(api, obj)
                if (res.code === '0') {
                    form.resetFields()
                    this.props.navigation.navigate('customerList')
                    await this.setState({
                        isMain: true,
                        activeIndex: -1,
                        chooseAreafullName: '',
                        ageChooseValue: '',
                        chooseResidentArea: '',
                        buildTypeChooseValue: '',
                        chooseMatchingValue: '',
                        chooseTowardValue: '',
                        choosepurchasePoseValue: '',
                        mark: ''
                    })
                    DeviceEventEmitter.emit('ReportBack')
                    Toast.message('新建成功')
                } else {
                    Toast.message('新建失败:' + res.message)
                }
            } catch (e) {
                Toast.message('新建失败:' + e.message)
            }
        }
    }

    getDicName = (dicList, value) => {
        if (!dicList) {
            return ''
        }
        let dicGroup = dicList.find(x => x.value === value + '');
        if (dicGroup) {
            return dicGroup.key;
        }

        return '';
    }

    getGrade = async (va) => {
        await this.setState({
            grade: va,
            activeIndex: va
        })
    }

    Ok = (v, type) => {
        if (type === 'ageChooseValue') {
            this.setState({
                ageChooseValue: this.getDicName(this.props.dictionaries.age, v[0]) || ''
            })
        } else if (type === 'buildTypeChooseValue') {
            this.setState({
                buildTypeChooseValue: this.getDicName(this.props.dictionaries.project_type, v[0]) || ''
            })
        } else if (type === 'choosePurchasePoseValue') {
            this.setState({
                choosepurchasePoseValue: this.getDicName(this.props.dictionaries.purchase_purpose, v[0]) || ''
            })
        } else if (type === 'chooseTowardValue') {
            this.setState({
                chooseTowardValue: this.getDicName(this.props.dictionaries.shop_toward, v[0]) || ''
            })
        } else if (type === 'chooseAreafullName') {
            this.dealShowData(v)
        } else if (type === 'chooseResidentArea') {
            this.dealAdress(v)
        } else { }
    }

    dealAdress = (va) => {
        let areaAndCode = (va || [])[0]
        let provinceAndCode = (va || [])[1]
        let areaArr = areaAndCode.split('_') || ''
        let provinceArr = provinceAndCode.split('_') || ''
        this.setState({
            chooseResidentArea: (areaArr || [])[0] + '-' + (provinceArr || [])[0],
        })
    }


    dealShowData = (va) => {
        let areaAndCode = (va || [])[0]
        let provinceAndCode = (va || [])[1]
        let areaArr = areaAndCode.split('_') || ''
        let provinceArr = provinceAndCode.split('_') || ''
        this.setState({
            chooseAreafullName: (areaArr || [])[0] + '-' + (provinceArr || [])[0],
            areaCode: (areaArr || [])[1],
            provinceCode: (provinceArr || [])[1]
        })
    }

    _renderBottom = () => {
        return (
            <TouchableOpacity onPress={() => { debounce(this.submit()) }}>
                <View style={styles.bottomView}>
                    <Text style={styles.bottomText}>确认提交</Text>
                </View>
            </TouchableOpacity>
        )
    }

    deleteOne = (item) => {
        let { phoneList } = this.state
        phoneList = phoneList.filter((v) => v.key !== item.key)
        if (phoneList.length <= 4) {
            this.setState({
                addPhoneFlag: true,
                phoneList
            })
        } else {
            this.setState({
                phoneList
            })
        }
    }

    showMatchingModal = () => {
        this.setState({
            showMatching: true
        })
    }

    onClose = () => {
        this.setState({
            showMatching: false
        })
    }

    onOk = (item, selectCode) => {
        let matchText = ''
        let matchArr = []
        item.map((va) => {
            matchArr.push(va.label)
        })
        matchText = matchArr.join(',')
        this.setState({
            showMatching: false,
            chooseMatchingValue: matchText.slice(0, 15),
            selectCode
        })
    }

    render() {
        const { form } = this.props
        let { selectCode, showMatching, isShowBottom, isMan, phoneList, isEdit, ageChooseValue, buildTypeChooseValue, choosepurchasePoseValue, chooseTowardValue, chooseMatchingValue, cityList, chooseAreafullName, chooseResidentArea, dataInfo, addPhoneFlag } = this.state;
        // let age = (dataInfo.portrait || {}).age || ''
        // let address = (dataInfo.portrait || {}).address || ''
        // let buildingCategory = (dataInfo.portrait || {}).buildingCategory || ''
        // let homePurchaseTarget = (dataInfo.portrait || {}).homePurchaseTarget || ''
        // let direction = (dataInfo.portrait || {}).direction || ''
        // let matching = (dataInfo.portrait || {}).matching || ''
        return (
            <KeyboardAvoidingView style={{height:'100%'}} behavior="height" enabled>
            <BaseContainer
                title={isEdit ? '编辑客户' : '新增客户'}
                contentViewStyle={{ padding: 0, backgroundColor: '#fff' }}
                // footer={isShowBottom ? this._renderBottom() : null}
                footer={this._renderBottom()}
            >

                    <View style={styles.topView}>
                        <Text style={styles.topText}>客户信息(必填)</Text>
                    </View>
                    {
                        form.getFieldDecorator('customerName', {
                            rules: [
                                { required: true, message: '请输入姓名!' },
                            ],
                        })(
                            <Input
                                label={
                                    <Text style={[styles.text, { width: scaleSize(200) }]}>客户姓名</Text>
                                }
                                style={{ textAlign: 'right', marginRight: scaleSize(32) }}
                                placeholder='*姓名必须准确'
                            />
                        )
                    }
                    {
                        form.getFieldDecorator('sex', {
                            rules: [
                                { required: true, message: '请选择性别' }
                            ],
                        })(
                            <Input
                                label={
                                    <Text style={styles.text}>性别</Text>
                                }
                                style={{ textAlign: 'right' }}
                                rightContent={
                                    <View style={styles.sexBet}>
                                        <TouchableOpacity style={[styles.sexView, { backgroundColor: isMan ? '#1F3070' : '#F8F8F8' }]} onPress={() => this.chooseMan()}>
                                            <Text style={styles.sexText}>男</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.sexView, { backgroundColor: isMan ? '#F8F8F8' : '#1F3070' }]} onPress={() => this.chooseWomen()}>
                                            <Text style={styles.sexText}>女</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            />
                        )
                    }

                    {
                        phoneList.map((item) => {
                            let { form } = this.props
                            return (
                                form.getFieldDecorator(`phone${item.key}`, {

                                })(
                                    <Input
                                        label={
                                            <Text style={styles.text}>手机号</Text>
                                        }
                                        placeholder='请输入手机号码'
                                        onChangeText={(e) => this.setValue(e, item)}
                                        maxLength={11}
                                        keyboardType='numeric'
                                        rightContent={
                                            <View style={styles.phoneView}>
                                                <TouchableOpacity onPress={() => this.changePhoneStatus(item)}>
                                                    <Image source={item.status ? SWITCHON : SWITCHOFF} style={styles.switchImg} />
                                                </TouchableOpacity>
                                                <Text style={[styles.rightText, { marginLeft: scaleSize(11) }]}>{item.status ? '全号码' : '半号码'}</Text>
                                                {
                                                    item.key === 0 ? (
                                                            <View style={{ width: scaleSize(30), height: scaleSize(30), marginRight: scaleSize(30), marginTop: scaleSize(5) }} />
                                                        ) :
                                                        <TouchableOpacity onPress={() => this.deleteOne(item)}>
                                                            <Image source={DELETE} style={{ width: scaleSize(30), height: scaleSize(30), marginRight: scaleSize(30), marginTop: scaleSize(5) }} />
                                                        </TouchableOpacity>
                                                }
                                            </View>
                                        }
                                    />
                                )
                            )
                        })
                    }

                    {
                        addPhoneFlag && phoneList.length < 5 ?
                            <View>
                                <TouchableOpacity style={styles.addPhoneView} onPress={() => this.addPhone()}>
                                    <Image source={ADDPHONE} style={styles.addPhoneImg} />
                                    <Text style={{ color: '#000000', fontSize: scaleSize(28) }}>添加电话</Text>
                                </TouchableOpacity>
                            </View> : null
                    }

                    <View style={styles.topView}>
                        <Text style={styles.topText}>购买意愿(选填)</Text>
                    </View>
                    {
                        form.getFieldDecorator('grade', {

                        })(
                            // <Input
                            //     label={
                            //         <Text style={[styles.text]}>购买强度</Text>
                            //     }
                            //     style={{ textAlign: 'right' }}
                            //     rightContent={
                            //
                            //     }
                            // />
                            <View style={styles.gradeView}>
                                <Text style={[styles.text]}>购买强度</Text>
                                <BuyGrade aaa={this.getGrade} activeIndex={this.state.activeIndex} />
                            </View>
                        )
                    }
                    {
                        form.getFieldDecorator('sumBudget', {

                        })(
                            <Input
                                label={
                                    <Text style={styles.text}>客户预算</Text>
                                }
                                placeholder='请输入'
                                style={{ textAlign: 'right' }}
                                keyboardType='numeric'
                                maxLength={11}
                                rightContent={
                                    <Text style={styles.yiyuan}>万</Text>
                                }
                            />
                        )
                    }
                    {
                        form.getFieldDecorator('sumArea', {

                        })(
                            <Input
                                label={
                                    <Text style={styles.text}>建筑面积</Text>
                                }
                                placeholder='请输入'
                                style={{ textAlign: 'right' }}
                                keyboardType='numeric'
                                maxLength={11}
                                rightContent={
                                    <Text style={styles.yiyuan}>㎡</Text>
                                }
                            />
                        )
                    }
                    {
                        form.getFieldDecorator('areaFullName', {

                        })(
                            <Picker
                                data={cityList}
                                cols={2}
                                cascade={true}
                                // onChange={v => this.areaChange(v)}
                                // value={this.state.chooseAreaFullNameArr}
                                onOk={v => this.Ok(v, 'chooseAreafullName')}
                            >
                                <TouchableOpacity style={styles.pickerView}>
                                    <Text style={styles.text}>意向区域</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{ color: '#CBCBCB', fontSize: scaleSize(28) }}>{chooseAreafullName ? chooseAreafullName : dataInfo.areaFullName ? dataInfo.areaFullName : '请选择'}</Text>
                                        <Image source={ARROW} style={styles.arrowImg} />
                                    </View>
                                </TouchableOpacity>
                            </Picker>
                        )
                    }
                    <View style={styles.topView}>
                        <Text style={styles.topText}>客户画像(选填)</Text>
                    </View>
                    {
                        form.getFieldDecorator('age', {

                        })(
                            <Picker
                                data={this.state.ageArr}
                                cols={1}
                                onChange={v => this.setState({ ageValue: v })}
                                onOk={v => this.Ok(v, 'ageChooseValue')}
                            >
                                <TouchableOpacity style={styles.pickerView}>
                                    <Text style={styles.text}>年龄</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{ color: '#CBCBCB', fontSize: scaleSize(28) }}>{ageChooseValue ? ageChooseValue : '请选择'}</Text>
                                        <Image source={ARROW} style={styles.arrowImg} />
                                    </View>
                                </TouchableOpacity>
                            </Picker>
                        )
                    }
                    {
                        form.getFieldDecorator('residentArea', {

                        })(
                            <Picker
                                data={cityList}
                                cols={2}
                                onOk={v => this.Ok(v, 'chooseResidentArea')}
                            >
                                <TouchableOpacity style={styles.pickerView}>
                                    <Text style={styles.text}>居住区域</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{ color: '#CBCBCB', fontSize: scaleSize(28) }}>{chooseResidentArea ? chooseResidentArea : '请选择'}</Text>
                                        <Image source={ARROW} style={styles.arrowImg} />
                                    </View>
                                </TouchableOpacity>
                            </Picker>
                        )
                    }

                    {
                        form.getFieldDecorator('buildType', {

                        })(
                            <Picker
                                data={this.state.buildType}
                                cols={1}
                                // value={this.state.buildTypeValue}
                                onChange={v => this.setState({ buildTypeValue: v })}
                                onOk={v => this.Ok(v, 'buildTypeChooseValue')}
                            >
                                <TouchableOpacity style={styles.pickerView}>
                                    <Text style={styles.text}>楼盘类别</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{ color: '#CBCBCB', fontSize: scaleSize(28) }}>{buildTypeChooseValue ? buildTypeChooseValue : '请选择'}</Text>
                                        <Image source={ARROW} style={styles.arrowImg} />
                                    </View>
                                </TouchableOpacity>
                            </Picker>
                        )
                    }
                    {
                        form.getFieldDecorator('homePurchaseTarget', {

                        })(
                            <Picker
                                data={this.state.purchasePose}
                                cols={1}
                                // value={this.state.choosepurchasePoseValue}
                                onChange={v => this.setState({ purchasePoseValue: v })}
                                onOk={v => this.Ok(v, 'choosePurchasePoseValue')}
                            >
                                <TouchableOpacity style={styles.pickerView}>
                                    <Text style={styles.text}>置业目的</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{ color: '#CBCBCB', fontSize: scaleSize(28) }}>{choosepurchasePoseValue ? choosepurchasePoseValue : '请选择'}</Text>
                                        <Image source={ARROW} style={styles.arrowImg} />
                                    </View>
                                </TouchableOpacity>
                            </Picker>
                        )
                    }
                    {
                        form.getFieldDecorator('chooseTowardValue', {

                        })(
                            <Picker
                                data={this.state.toward}
                                cols={1}
                                setFieldsValue={this.state.towardValue}
                                onChange={v => this.setState({ towardValue: v })}
                                onOk={v => this.Ok(v, 'chooseTowardValue')}
                            >
                                <TouchableOpacity style={styles.pickerView}>
                                    <Text style={styles.text}>风水朝向</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{ color: '#CBCBCB', fontSize: scaleSize(28) }}>{chooseTowardValue ? chooseTowardValue : '请选择'}</Text>
                                        <Image source={ARROW} style={styles.arrowImg} />
                                    </View>
                                </TouchableOpacity>
                            </Picker>
                        )
                    }
                    {/* {
                    form.getFieldDecorator('matching', {

                    })(
                        <Picker
                            data={this.state.matchingArr}
                            cols={1}
                            setFieldsValue={this.state.matchingArrValue}
                            // onChange={v => this.setState({ matchingArrValue: v })}
                            onOk={v => this.Ok(v, 'chooseMatchingValue')}
                        >
                            <TouchableOpacity style={styles.pickerView}>
                                <Text style={styles.text}>配置信息</Text>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Text style={{ color: '#CBCBCB', fontSize: scaleSize(28) }}>{chooseMatchingValue ? chooseMatchingValue : matching ? matching : '请选择'}</Text>
                                    <Image source={ARROW} style={styles.arrowImg} />
                                </View>
                            </TouchableOpacity>
                        </Picker>
                    )
                } */}
                    {
                        form.getFieldDecorator('matching', {

                        })(
                            <TouchableOpacity style={styles.gradeView} onPress={this.showMatchingModal}>
                                <Text style={[styles.text]}>配置信息</Text>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Text style={{ color: '#CBCBCB', fontSize: scaleSize(28) }}>{chooseMatchingValue ? chooseMatchingValue : '请选择'}</Text>
                                    <Image source={ARROW} style={styles.arrowImg} />
                                </View>
                            </TouchableOpacity>
                        )
                    }

                    <View style={styles.topView}>
                        <Text style={styles.topText}>备注(选填)</Text>
                    </View>
                    {
                        form.getFieldDecorator('mark', {

                        })(

                            <TextInput
                                // value={mark}
                                onChangeText={(e) => this.setState({ mark: e })}
                                maxLength={200}
                                multiline={true}
                                // onFocus={() => this.setState({ isShowBottom: false })}
                                // onBlur={() => this.setState({ isShowBottom: true })}
                                style={styles.inputStyle}
                            />

                        )
                    }


                <MatchModal
                    width={scaleSize(750)}
                    height={scaleSize(470)}
                    visible={showMatching}
                    onClose={this.onClose}
                    onOk={this.onOk}
                    type='multiSelect'
                    data={matchData}
                    selectCode={selectCode}
                />

            </BaseContainer>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = ({ config, user, dictionaries }) => {
    return { config, user, dictionaries }
}

export default connect(mapStateToProps)(createForm()(AddCustom))
