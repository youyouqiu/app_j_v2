import React, { Component } from 'react'
import BaseContainer from '../../../components/Page'
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, DeviceEventEmitter, KeyboardAvoidingView } from 'react-native'
import { scaleSize } from '../../../utils/screenUtil';
import Input from '../../../components/Form/Input'
import BuyGrade from './grade'
import ApiCustom from '../../../services/customManager'
import { Toast } from 'teaset'
import { createForm, formShape } from 'rc-form'
import { Picker } from '@new-space/date-picker'
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
        borderBottomWidth: 1
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
        borderWidth: 1,
        borderRadius: scaleSize(22),
        backgroundColor: '#F8F8F8'
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
        marginLeft: scaleSize(16),
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
        borderBottomWidth: 1,
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
        borderBottomWidth: 1
    },
    inputWrap: {
        padding: scaleSize(32)
    },
    inputStyle: {
        backgroundColor: '#F8F8F8',
        borderColor: '#CBCBCB',
        borderWidth: 1,
        width: '100%',
        height: scaleSize(272),
        padding: scaleSize(20),
        textAlignVertical: 'top',
        borderRadius: scaleSize(8)
    },
    itemBase: {
        flexDirection: 'row',
        alignItems: 'center'
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
            provinceCode: '',
            cityCode: ''
        }
        this.firstCity = []  //已加载的一级城市
        this.secondCity = [] //已加载的二级城市
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
        this.getListCity(0)
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
        console.log(customerPhones, 'customerPhones')
        let phoneData = []
        customerPhones.slice(0, 3).map((item, index) => {
            phoneData.push({ key: index, status: regPhone.test(item.phone), phone: item.phone, seq: item.seq, id: item.id })
        })

        await this.setState({
            phoneList: phoneData,
            num: phoneData.length,
            city: dataInfo.city,
            provinceCode: dataInfo.province,
            areaCode: dataInfo.area,
            ageChooseValue: (dataInfo.portrait || {}).age || '',
            chooseResidentArea: (dataInfo.portrait || {}).address || '',
            buildTypeChooseValue: (dataInfo.portrait || {}).buildingCategory || '',
            chooseMatchingValue: (dataInfo.portrait || {}).matching || '',
            chooseTowardValue: (dataInfo.portrait || {}).direction || '',
            choosepurchasePoseValue: (dataInfo.portrait || {}).homePurchaseTarget || '',
            chooseAreafullName: (dataInfo || {}).areaFullName || '',
            mark: (dataInfo || {}).mark || '',
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
        if (dataInfo.maxSumBudget) {
            dataInfo.maxSumBudget = dataInfo.maxSumBudget + ''
        }
        if (dataInfo.maxSumArea) {
            dataInfo.maxSumArea = dataInfo.maxSumArea + ''
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

    /**
     * 选择picker触发的事件
     */
    handlePickerChange = (record, index) => {
        if (index === 0) {
            const code = record[0].replace(/^.+_/, '')
            const repeat = this.firstCity.filter(a => a === code)
            return repeat.length === 0 ? this.getListCity(code, index + 1) : undefined
        }
        if (index === 1) {
            const firstCode = record[0].replace(/^.+_/, '')
            const secondCode = record[1].replace(/^.+_/, '')
            const repeat = this.secondCity.filter(a => a === secondCode)
            return repeat.length === 0 ? this.getListCity(secondCode, index + 1, firstCode) : undefined
        }
    }

    /**
     * 获取城市列表
     * @param code 父级城市code
     * @param lv:number 层级  0｜1｜2
     *【0】初始、【1】查询第一层级城市（北京、重庆。。）、【2】查询第二层级下城市（渝北区、南岸区。。。）
     * @param firstCode 当前第一层级的key,查询第二层级时需传此参数
     */
    getListCity = async (code, lv = 0, firstCode) => {
        const _public = this.props.config.requestUrl.public
        const nullLabel = { key: '', value: '', label: '不限', }
        const format = (item) => ({
            key: item.areaCode,
            value: item.name + '_' + item.areaCode,
            label: item.name,
        })

        if (lv === 0) {
            // 一级地区
            const first = await this.callApi(() => ApiCustom.getAllCity(_public, code), '查询城市一级列表报错')
            if (!first) return
            const list = first.map(format)
            // 二级地区
            const sec = await this.callApi(() => ApiCustom.getAllCity(_public, first[0].areaCode), '查询城市二级列表报错')
            if (!sec) return
            const _sec = sec.map(format)
            _sec.unshift(nullLabel)

            list[0].children = _sec
            _sec[0].children = [nullLabel]
            this.firstCity.push(first[0].areaCode)
            this.setState({ cityList: list })
            return
        }

        if (lv === 1) {
            const { cityList } = this.state
            // 二级地区
            const sec = await this.callApi(() => ApiCustom.getAllCity(_public, code), '查询城市二级列表报错')
            if (!sec) return
            const _sec = sec.map(format)
            _sec.unshift(nullLabel)
            _sec[0].children = [nullLabel]
            //找到当前所选第一层级
            const index = cityList.findIndex(a => a.key === parseInt(code))
            cityList[index].children = _sec
            await this.setState({ cityList })
            this.firstCity.push(code)
            return
        }

        if (lv === 2) {
            const { cityList } = this.state
            // 三级地区
            const third = await this.callApi(() => ApiCustom.getAllCity(_public, code), '查询城市三级列表报错')
            if (!third) return
            const _third = third.map(format)
            _third.unshift(nullLabel)
            //找到当前所选的第一层级
            const firstIndex = cityList.findIndex(a => a.key === parseInt(firstCode))
            //第二层级
            const secondIndex = cityList[firstIndex].children.findIndex(a => a.key === parseInt(code))
            cityList[firstIndex].children[secondIndex].children = _third
            await this.setState({ cityList })
            this.secondCity.push(code)
            return
        }
    }

    /**
     * 接口请求公共方法,需判断返回结果
     * const bar = await this.callApi(() => api(param), '错误提示')
     * @param call 需要请求的api
     * @param message 出错后的弹窗提示内容
     * @returns extension或void
     */
    callApi = async (call, message) => {
        try {
            const res = await call()
            if (res.code === '0') return res.extension
            Toast.message(message + res.message || '')
        }
        catch (e) {
            Toast.message(message)
        }
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

        if (phoneList.length >= 2) {
            this.setState({
                addPhoneFlag: false
            })
        }
        if (phoneList.length > 3) {
            Toast.message('抱歉,最多只能添加3个电话')
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
        let regName = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{1,7}$/,regPhone = /^1[3-9]{1}[\d]{9}$/,regBanPhone = /^1[3-9][\d]{1}\*\*\*\*[\d]{4}$/,regNum = /^[1-9][0-9]{0,3}$/;
        let numberTest = (number, text) => {
            if (regNum.test(number)) return true
            Toast.message(text + '可填范围：1·9999, 整数')
            return false
        };
        submitObj.customerName && (submitObj.customerName = submitObj.customerName.trim())
        if (!regName.test(submitObj.customerName)) {
            Toast.message('姓名为7位以内的汉字');
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

        let { sumArea, maxSumArea, sumBudget, maxSumBudget } = submitObj
        //范围检测
        if (sumArea && !numberTest(sumArea, '建面')) return
        if (maxSumArea && !numberTest(maxSumArea, '建面')) return
        if (sumBudget && !numberTest(sumBudget, '预算')) return
        if (maxSumBudget && !numberTest(maxSumBudget, '预算')) return
        if (parseInt(sumArea) > parseInt(maxSumArea)) {
            [maxSumArea, sumArea] = [sumArea, maxSumArea]
        }
        if (parseInt(sumBudget) > parseInt(maxSumBudget)) {
            [maxSumBudget, sumBudget] = [sumBudget, maxSumBudget]
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
        obj.xkjCustomerDemandRequest = {
            city: this.state.cityCode,
            province: this.state.provinceCode,
            area: this.state.areaCode,
            grade: this.state.isEdit ? FIVE - this.state.activeIndex : FIVE - this.state.grade,
            areaFullName: this.state.chooseAreafullName,
            sumArea,
            sumBudget,
            maxSumArea,
            maxSumBudget
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
        let isStick = false
        phoneList.map((item) => {
            const phoneItem = {
                id: item.id,
                phone: item.phone,
            }
            if (!isStick && regPhone.test(item.phone)) {
                phoneArr.unshift(phoneItem)
                obj.mainPhone = item.phone
                isStick = true
            } else {
                phoneArr.push(phoneItem)
            }
        })
        obj.phones = phoneArr
        console.log(obj, 'request obj')

        if (id) {
            try {
                let res = await ApiCustom.updateCustom(api, obj)
                if (res.code === '0') {
                    this.props.navigation.navigate('customerList')
                    DeviceEventEmitter.emit('ReportBack')
                    Toast.message('修改成功')
                } else {
                    Toast.message(res.message)
                }
            } catch (e) {
                Toast.message(e.message)
            }
        } else {
            try {
                let res = await ApiCustom.addCustom(api, obj)
                if (res.code === '0') {
                    form.resetFields()
                    //页面顺序：首页=》列表=》新增=》列表  ----堆栈会变为---->  首页=》列表
                    //页面顺序：首页=》新增=》列表        ----堆栈会变为---->  首页=》新增=》列表
                    //从快速入口直接新增，确定后会导致堆栈中列表页在该页之上
                    const parent = this.props.navigation.dangerouslyGetParent();
                    parent.state.routes[parent.state.routes.length - 2].routeName === 'customerList' ?
                        this.props.navigation.navigate('customerList') : this.props.navigation.replace('customerList')

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
                    Toast.message(res.message)
                }
            } catch (e) {
                Toast.message(e.message)
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

    Ok = (v, type, key) => {
        const { form } = this.props
        key && form.setFieldsValue({ key: v })
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

    dealAdress = (va = []) => {
        let cityAndCode = va[0] || '',
            provinceAndCode = va[1] || '',
            areaAndCode = va[2] || '',
            cityArr = cityAndCode.split('_'),
            provinceArr = provinceAndCode.split('_'),
            areaArr = areaAndCode.split('_')
        this.setState({
            chooseResidentArea: cityArr[0] + (provinceArr[0] && '-') + provinceArr[0] + (areaArr[0] && '-') + areaArr[0],
        })
    }


    dealShowData = (va) => {
        let cityAndCode = va[0] || '',
            provinceAndCode = va[1] || '',
            areaAndCode = va[2] || '',
            cityArr = cityAndCode.split('_'),
            provinceArr = provinceAndCode.split('_'),
            areaArr = areaAndCode.split('_')
        this.setState({
            chooseAreafullName: cityArr[0] + (provinceArr[0] && '-') + provinceArr[0] + (areaArr[0] && '-') + areaArr[0],
            cityCode: cityArr[1],
            provinceCode: provinceArr[1],
            areaCode: areaArr[1],
        })
    }

    _renderBottom = () => {
        return (
            <TouchableOpacity onPress={debounce(this.submit)}>
                <View style={styles.bottomView}>
                    <Text style={styles.bottomText}>确认提交</Text>
                </View>
            </TouchableOpacity>
        )
    }

    deleteOne = (item) => {
        let { phoneList } = this.state
        phoneList = phoneList.filter((v) => v.key !== item.key)
        if (phoneList.length <= 2) {
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
            chooseMatchingValue: matchText,
            selectCode
        })
    }

    render() {
        const { form } = this.props
        const { selectCode, showMatching, isMan, phoneList, isEdit, ageChooseValue, buildTypeChooseValue,
            choosepurchasePoseValue, chooseTowardValue, chooseMatchingValue, cityList, chooseAreafullName,
            chooseResidentArea, dataInfo, addPhoneFlag, mark } = this.state;
        return (
            <KeyboardAvoidingView style={{ height: '100%' }} behavior="height" enabled>
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
                                        <TouchableOpacity style={[styles.sexView, isMan && { backgroundColor: '#1F3070', borderWidth: 0 }]} onPress={() => this.chooseMan()}>
                                            <Text style={[styles.sexText, isMan && { color: '#fff' }]}>男</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.sexView, !isMan && { backgroundColor: '#1F3070', borderWidth: 0 }]} onPress={() => this.chooseWomen()}>
                                            <Text style={[styles.sexText, !isMan && { color: '#fff' }]}>女</Text>
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
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <TouchableOpacity onPress={() => this.changePhoneStatus(item)}>
                                                        <Image source={item.status ? SWITCHON : SWITCHOFF} style={styles.switchImg} />
                                                    </TouchableOpacity>
                                                    <Text style={[styles.rightText, { marginLeft: scaleSize(11) }]}>{item.status ? '全号码' : '半号码'}</Text>
                                                </View>
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
                        addPhoneFlag && phoneList.length < 3 ?
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
                            <View style={styles.gradeView}>
                                <Text style={[styles.text]}>购买强度</Text>
                                <BuyGrade aaa={this.getGrade} activeIndex={this.state.activeIndex} />
                            </View>
                        )
                    }
                    <View style={styles.itemBase}>
                        {
                            form.getFieldDecorator('sumBudget', {

                            })(
                                <Input
                                    viewStyle={{ flex: 5 }}
                                    label={
                                        <Text style={styles.text}>客户预算</Text>
                                    }
                                    placeholder='请输入'
                                    style={{ textAlign: 'right' }}
                                    keyboardType='numeric'
                                    maxLength={7}
                                    rightContent={
                                        <Text style={styles.yiyuan}>&emsp;&emsp;~</Text>
                                    }
                                />
                            )
                        }
                        {
                            form.getFieldDecorator('maxSumBudget', {

                            })(
                                <Input
                                    viewStyle={{ flex: 2 }}
                                    placeholder='请输入'
                                    style={{ textAlign: 'right' }}
                                    keyboardType='numeric'
                                    maxLength={7}
                                    rightContent={
                                        <Text style={styles.yiyuan}>万</Text>
                                    }
                                />
                            )
                        }
                    </View>
                    <View style={styles.itemBase}>
                        {
                            form.getFieldDecorator('sumArea', {

                            })(
                                <Input
                                    viewStyle={{ flex: 5 }}
                                    label={
                                        <Text style={styles.text}>建筑面积</Text>
                                    }
                                    placeholder='请输入'
                                    style={{ textAlign: 'right' }}
                                    keyboardType='numeric'
                                    maxLength={7}
                                    rightContent={
                                        <Text style={styles.yiyuan}>&emsp;&emsp;~</Text>
                                    }
                                />
                            )
                        }
                        {
                            form.getFieldDecorator('maxSumArea', {

                            })(
                                <Input
                                    viewStyle={{ flex: 2 }}
                                    placeholder='请输入'
                                    style={{ textAlign: 'right' }}
                                    keyboardType='numeric'
                                    maxLength={7}
                                    rightContent={
                                        <Text style={styles.yiyuan}>㎡</Text>
                                    }
                                />
                            )
                        }
                    </View>

                    {
                        form.getFieldDecorator('areaFullName', {

                        })(
                            <Picker
                                data={cityList}
                                cols={3}
                                onOk={v => this.Ok(v, 'chooseAreafullName', 'areaFullName')}
                                onPickerChange={this.handlePickerChange}
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
                                cols={3}
                                onOk={v => this.Ok(v, 'chooseResidentArea', 'residentArea')}
                                onPickerChange={this.handlePickerChange}
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
                    <TouchableOpacity style={styles.gradeView} onPress={this.showMatchingModal}>
                        <Text style={[styles.text]}>配置信息</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text
                                style={{ color: '#CBCBCB', fontSize: scaleSize(28) }}
                            >
                                {chooseMatchingValue ?
                                    chooseMatchingValue.split(',').length > 4 ?
                                        chooseMatchingValue.split(',').slice(0, 4).join(',') + '...'
                                        : chooseMatchingValue
                                    : '请选择'
                                }
                            </Text>
                            <Image source={ARROW} style={styles.arrowImg} />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.topView}>
                        <Text style={styles.topText}>备注(选填)</Text>
                    </View>
                    <View style={styles.inputWrap}>
                        <TextInput
                            onChangeText={(text) => { this.setState({ mark: text }) }}
                            maxLength={200}
                            multiline={true}
                            style={styles.inputStyle}
                            value={mark}
                        />
                        <Text style={{ position: 'absolute', top: scaleSize(248), right: scaleSize(53), color: '#868686' }}>{(mark && mark.length) || 0}/200</Text>
                    </View>

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
            </KeyboardAvoidingView >
        )
    }
}

const mapStateToProps = ({ config, user, dictionaries, location }) => {
    return { config, user, dictionaries, location }
}

export default connect(mapStateToProps)(createForm()(AddCustom))
