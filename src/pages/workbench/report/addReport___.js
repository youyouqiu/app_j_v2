import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {Toast} from 'teaset';

// 工具
import {scaleSize} from '../../../utils/screenUtil';
import {addReportDataApi} from './../../../services/report';
import {debounce} from '../../../utils/utils';

// 组件
import BaseContainer from '../../../components/Page';
import Input from '../../../components/Form/Input';

// 样式
import {STYLE} from './style';

class AddReport___ extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectBuildingInfo: {}, // 选择的楼盘信息
            selectCustomerInfo: {}, // 选择的客户信息
            customerInfo: {}, // 客户列表跳入信息
            sex: 1, // 男女
            phoneList: [], // 手机号列表
            num: 0,
            fromData: {}, // 报备表单信息
        }
    }

    componentDidMount() {
        let {navigation} = this.props;
        let customerInfo = (((navigation || {}).state || {}).params || {}).dataInfo || {};
        let buildingInfo = ((navigation || {}).state || {}).params || {};


        if (customerInfo.id) {
            this.setState({
                customerInfo,
                fromData: {
                    Name: customerInfo.customerName,
                    Phone0: ((customerInfo || {}).mainPhone || '').replace('****', ''),
                },
                sex: customerInfo.sex ? 1 : 0,
            })
        }

        if (buildingInfo.buildingId) {
            this.setState({
                selectBuildingInfo: buildingInfo,
            })
        }
    }

    setValue = (key, value) => {
        let {fromData} = this.state;

        Object.assign(fromData, {[key]: value});

        this.setState({
            fromData,
        })
    }

    setBuilding = (selectBuildingInfo) => {
        console.log('选择的楼盘信息', selectBuildingInfo)

        this.setState({
            selectBuildingInfo,
        })
    }

    setCustomer = (selectCustomerInfo) => {
        console.log('选择的客户信息', selectCustomerInfo)

        if ((selectCustomerInfo || {}).customerId) {
            this.setState({
                selectCustomerInfo,
                fromData: {
                    Name: selectCustomerInfo.customerName,
                    Phone0: ((selectCustomerInfo || {}).customerPhone || '').replace('****', ''),
                },
                sex: selectCustomerInfo.sex ? 1 : 0,
            })
        }
    }

    // 获取楼盘信息
    onBuildingData = () => {
        console.log('获取楼盘信息')

        this.props.navigation.navigate('reportBuilding', this.setBuilding);
    }

    // 客户选择
    customerChoice = () => {
        console.log('客户选择')

        this.props.navigation.navigate('cusLJ', this.setCustomer);
    }

    // 性别选择 sex
    onSex = (type) => {
        console.log('男女，0-女，1-男', type)

        let sex = 2;
        sex = type;

        // switch (type) {
        // case 0:
        //     111
        //     break;

        // case 1:
        //     2222
        //     break;

        // default: console.log('没有default');
        // }

        this.setState({
            sex,
        })
    }

    // 添加电话
    addPhone = () => {
        console.log('添加电话')
        let {num, phoneList} = this.state;

        num++;

        phoneList.push(num);

        this.setState({
            num,
            phoneList,
        })
    }

    // 假装获取焦点
    onFocusColor = (type) => {
        console.log('假装获取焦点', type)

        if (this[`inputTest${type}`]) {
            this[`inputTest${type}`].focus();
        }

        // switch () {
        // case 1:
        //     1111
        //     break;

        // case 2:
        //     2222
        //     break;

        // case 3:
        //     3333
        //     break;

        // case 4:
        //     4444
        //     break

        // default: console.log('没有default');
        // }
    }

    // 删除电话表单
    onDeleltePhone = (num) => {
        console.log('删除电话表单', num)

        let {phoneList} = this.state;
        let newPhoneList = phoneList.concat();

        phoneList.map((item, index) => {
            if (item === num) {
                newPhoneList.splice(index, 1)
            }
        })

        console.log(newPhoneList, 'newPhoneList')

        this.setState({
            phoneList: newPhoneList,
        })
    }

    // 数据处理
    handleData = () => {
        console.log('数据处理')

        let {selectBuildingInfo, selectCustomerInfo, customerInfo, fromData, sex, phoneList} = this.state;

        let newPhone0 = '';
        let phones = [];
        let customerInfos = {};
        let regPhone = /^1[3-9]{1}[\d]{5}$/;
        let verification = [];

        if (((fromData || {}).Phone0 || '') && ((fromData || {}).Phone0 || '').length !== 11) {
            newPhone0 = ((fromData || {}).Phone0 || '').slice(0, 3) + '****' + ((fromData || {}).Phone0 || '').slice(3);
        } else if (((fromData || {}).Phone0 || '') && ((fromData || {}).Phone0 || '').length === 11) {
            newPhone0 = ((fromData || {}).Phone0 || '').slice(0, 3) + '****' + ((fromData || {}).Phone0 || '').slice(7);
        }

        phoneList.map((item, index) => {
            let newPhones = ((fromData || {})[`Phone${item}`] || '').slice(0, 3) + '****' + ((fromData || {})[`Phone${item}`] || '').slice(3);

            phones.push(newPhones);
        })

        if ((selectCustomerInfo || {}).customerId) {
            customerInfos = {
                customerId: selectCustomerInfo.customerId,
                customerName: fromData.Name || '',
                sex: sex,
                customerPhone: newPhone0,
            }
        } else if ((customerInfo || {}).id) {
            customerInfos = {
                customerId: customerInfo.id,
                customerName: fromData.Name || '',
                sex: sex,
                customerPhone: newPhone0,
            }
        } else {
            customerInfos = {
                customerId: '',
                customerName: fromData.Name || '',
                sex: sex,
                customerPhone: newPhone0,
            }
        }

        // 数据合法检测
        if (!selectBuildingInfo.buildingName) {
            Toast.message('请选择报备楼盘');

            verification = [false];
        } else if (!customerInfos.customerName) {
            Toast.message('请输入客户姓名');

            verification = [false];
        } else if(!customerInfos.customerPhone) {
            Toast.message('请完善客户手机号码');

            verification = [false];
        } else if (!regPhone.test(newPhone0.replace(/\*\*\*\*/g, ''))) {
            Toast.message('请完善客户手机号码');

            verification = [false];
        } else if (phones.length > 0) {
            verification = phones.map((item, index) => {
                if (!regPhone.test(fromData[`Phone${index + 1}`])) {
                    Toast.message('请完善客户手机号码');

                    return false;
                }

                return true;
            })
        }

        if (verification.every(item => item)) {
            this.onAddReportData(customerInfos, phones, selectBuildingInfo);
        }
    }

    // 新增报备信息接口
    onAddReportData = async (customerInfos, phones, selectBuildingInfo) => {
        console.log('新增报备信息接口')

        let {api} = this.props.config.requestUrl;

        let body = {
            customerInfos: customerInfos,
            phones: phones,
            buildingId: selectBuildingInfo.buildingId || '',
            buildingTreeId: selectBuildingInfo.buildTreeId || '',
            buildingName: selectBuildingInfo.buildingName || '',
        }

        console.log(body, 'body')

        try {
            let res = await addReportDataApi(api, body);

            console.log(res, 'res');

            if (res && res.code === '0') {
                let reportSuccessInfo = {
                    buildingTreeName: (res.extension || {}).buildingTreeName || '暂无数据',
                    companyName: (res.extension || {}).companyName || '暂无数据',
                    customerName: (res.extension || {}).customerName || '暂无数据',
                    customerPhones: ((res.extension || {}).customerPhones || []),
                    userName: (res.extension || {}).userName || '暂无数据',
                    userPhone: (res.extension || {}).userPhone || '暂无数据',
                    userOrganizationName: (res.extension || {}).userOrganizationName || '暂无数据',
                    succeedTime: ((res.extension || {}).succeedTime || '暂无数据').replace(/T/g, ' ').replace(/\.[\s\S]{1,20}/, ''),
                };

                this.props.navigation.navigate('reportSuccess', reportSuccessInfo);
            }

        } catch(error) {
            console.log(error);

            Toast.message(error.message);
        }
    }

    // 提交报备信息
    onSubmit = () => {
        console.log('提交报备信息')

        this.handleData();
    }

    // 表单右侧自定义组件
    _rightContent = (num, values) => {
        let valueList = [];

        valueList = (values || '').split('');

        return (
            <View style={STYLE.inputRightWarp}>
                <TouchableOpacity
                    style={{marginRight: scaleSize(8)}}
                    activeOpacity={0.8}
                    onPress={() => {this.onFocusColor(num)}}
                >
                    <Text style={[STYLE.textWarpSmall, valueList.length === 1 ? STYLE.inputYesBorder : null]}>{valueList[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{marginRight: scaleSize(8)}}
                    activeOpacity={0.8}
                    onPress={() => {this.onFocusColor(num)}}
                >
                    <Text style={[STYLE.textWarpSmall, valueList.length === 2 ? STYLE.inputYesBorder : null]}>{valueList[1]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{marginRight: scaleSize(8)}}
                    activeOpacity={0.8}
                    onPress={() => {this.onFocusColor(num)}}
                >
                    <Text style={[STYLE.textWarpSmall, valueList.length === 3 ? STYLE.inputYesBorder : null]}>{valueList[2]}</Text>
                </TouchableOpacity>

                <Text style={{fontSize: scaleSize(28), color: 'rgba(0,0,0,1)', marginLeft: scaleSize(8)}}>****</Text>

                <TouchableOpacity
                    style={{marginRight: scaleSize(8)}}
                    activeOpacity={0.8}
                    onPress={() => {this.onFocusColor(num)}}
                >
                    <Text style={[STYLE.textWarpSmall, valueList.length === 4 ? STYLE.inputYesBorder : null]}>{valueList[3]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{marginRight: scaleSize(8)}}
                    activeOpacity={0.8}
                    onPress={() => {this.onFocusColor(num)}}
                >
                    <Text style={[STYLE.textWarpSmall, valueList.length === 5 ? STYLE.inputYesBorder : null]}>{valueList[4]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{marginRight: scaleSize(8)}}
                    activeOpacity={0.8}
                    onPress={() => {this.onFocusColor(num)}}
                >
                    <Text style={[STYLE.textWarpSmall, valueList.length === 6 ? STYLE.inputYesBorder : null]}>{valueList[5]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{}}
                    activeOpacity={0.8}
                    onPress={() => {this.onFocusColor(num)}}
                >
                    <Text style={[STYLE.textWarpSmall, valueList.length === 7 ? STYLE.inputYesBorder : null]}>{valueList[6]}</Text>
                </TouchableOpacity>
                {
                    num !== 0
                        ? <TouchableOpacity
                            style={{paddingLeft: scaleSize(18)}}
                            activeOpacity={0.8}
                            onPress={() => {this.onDeleltePhone(num)}}
                        >
                            <Image
                                style={{width: scaleSize(30), height: scaleSize(30)}}
                                source={require('../../../images/icons/delelte2.png')}
                                alt='图标'
                            />
                        </TouchableOpacity>
                        : <View style={{width: scaleSize(48), height: scaleSize(30)}}></View>
                }
            </View>
        )
    }

    // 底部固定栏
    _renderBottom = () => {
        return (
            <View style={STYLE.btnWarp}>
                <TouchableOpacity
                    style={STYLE.btn}
                    onPress={() => {debounce(this.onSubmit)()}}

                >
                    <Text style={STYLE.btnText}>提交报备</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        let {selectBuildingInfo, selectCustomerInfo, sex, phoneList, fromData} = this.state;

        return (
            <BaseContainer
                title='添加报备'
                bodyStyle={{padding: 0, backgroundColor: '#fff'}}
                footer={this._renderBottom()}
                footerStyle={{}}
            >
                <View style={{borderTopWidth: scaleSize(2), borderTopColor: 'rgba(234,234,234,1)'}}>
                    <Input
                        onChange={(e) => this.setValue('Building', e)}
                        value={fromData.Building}
                        label={
                            <View style={{width: 100, marginLeft: scaleSize(32)}}>
                                <Text style={{fontSize: scaleSize(28), color: 'rgb(134,134,134)'}}>报备项目</Text>
                            </View>
                        }
                        placeholder='请选择'
                        editable={false}
                        defaultValue={selectBuildingInfo.buildingName || ''}
                        style={{textAlign: 'right', paddingRight: scaleSize(16)}}
                        rightContent={
                            <TouchableOpacity
                                style={[STYLE.bigBtns, {paddingRight: scaleSize(32)}]}
                                activeOpacity={0.8}
                                onPress={() => {this.onBuildingData()}}
                            >
                                <Image
                                    style={{width: scaleSize(40), height: scaleSize(40)}}
                                    source={require('../../../images/icons/chose.png')}
                                    alt='图标'
                                />
                            </TouchableOpacity>
                        }
                    />
                    <Input
                        onChange={(e) => this.setValue('Name', e)}
                        value={fromData.Name}
                        label={
                            <View style={{width: 100, marginLeft: scaleSize(32)}}>
                                <Text style={{fontSize: scaleSize(28), color: 'rgb(134,134,134)'}}>客户姓名</Text>
                            </View>
                        }
                        placeholder='请输入客户名'
                        defaultValue={selectCustomerInfo.customerName || ''}
                        style={{textAlign: 'right', paddingRight: scaleSize(16)}}
                        rightContent={
                            <TouchableOpacity
                                style={[STYLE.bigBtns, {paddingRight: scaleSize(32)}]}
                                activeOpacity={0.8}
                                onPress={() => {this.customerChoice()}}
                            >
                                <Image
                                    style={{width: scaleSize(40), height: scaleSize(40)}}
                                    source={require('../../../images/icons/kehu2.png')}
                                    alt='图标'
                                />
                            </TouchableOpacity>
                        }
                    />
                    <Input
                        value={fromData.Sex}
                        label={
                            <View style={{width: 100, marginLeft: scaleSize(32)}}>
                                <Text style={{fontSize: scaleSize(28), color: 'rgb(134,134,134)'}}>性别</Text>
                            </View>
                        }
                        placeholder=''
                        editable={false}
                        rightContent={
                            <View style={{display: 'flex', flexDirection: 'row', marginRight: scaleSize(32)}}>
                                <TouchableOpacity
                                    style={
                                        [
                                            STYLE.inputWarp,
                                            {marginRight: scaleSize(16)},
                                            sex === 1
                                                ? STYLE.sexYes
                                                : STYLE.sexNo
                                        ]
                                    }
                                    activeOpacity={0.8}
                                    onPress={() => {this.onSex(1)}}
                                >
                                    <Text
                                        style={
                                            [
                                                STYLE.inputContext,
                                                sex === 1
                                                    ? STYLE.sexYesFont
                                                    : STYLE.sexNoFont
                                            ]
                                        }
                                    >
                                        男
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={
                                        [
                                            STYLE.inputWarp,
                                            sex === 0
                                                ? STYLE.sexYes
                                                : STYLE.sexNo
                                        ]
                                    }
                                    activeOpacity={0.8}
                                    onPress={() => {this.onSex(0)}}
                                >
                                    <Text
                                        style={
                                            [
                                                STYLE.inputContext,
                                                sex === 0
                                                    ? STYLE.sexYesFont
                                                    : STYLE.sexNoFont
                                            ]
                                        }
                                    >
                                        女
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        }
                    />
                    <Input
                        onChange={(e) => this.setValue('Phone0', e)}
                        value={fromData.Phone0}
                        label={
                            <View style={{width: 50, marginLeft: scaleSize(32)}}>
                                <Text style={{fontSize: scaleSize(28), color: 'rgb(134,134,134)'}}>手机号111</Text>
                            </View>
                        }
                        placeholder=''
                        defaultValue={((selectCustomerInfo || {}).customerPhone || '').replace('****', '') || ''}
                        maxLength={7}
                        keyboardType='numeric'
                        elem={ref => this.inputTest0 = ref}
                        style={{textAlign: 'right', paddingRight: scaleSize(32), width: 0, height: 0}}
                        rightContent={this._rightContent(0, fromData.Phone0)}
                    />

                    {
                        phoneList.map((item, index) => {
                            return (
                                <Input
                                    onChange={(e) => this.setValue(`Phone${item}`, e)}
                                    value={fromData[`Phone${item}`]}
                                    label={
                                        <View style={{width: 50, marginLeft: scaleSize(32)}}>
                                            <Text style={{fontSize: scaleSize(28), color: 'rgb(134,134,134)'}}>手机号</Text>
                                        </View>
                                    }
                                    placeholder=''
                                    maxLength={7}
                                    keyboardType='numeric'
                                    elem={ref => this[`inputTest${item}`] = ref}
                                    style={{textAlign: 'right', paddingRight: scaleSize(32), width: 0, height: 0}}
                                    key={index}
                                    rightContent={this._rightContent(item, fromData[`Phone${item}`])}
                                />
                            )
                        })
                    }

                    {
                        (phoneList || []).length < 4
                            ? <TouchableOpacity
                                style={[STYLE.topRight, {padding: scaleSize(32)}]}
                                activeOpacity={0.8}
                                onPress={() => {this.addPhone()}}
                            >
                                <Image
                                    style={{width: scaleSize(40), height: scaleSize(40)}}
                                    source={require('../../../images/icons/addPhone2.png')}
                                    alt='图标'
                                />
                                <Text style={{fontSize: scaleSize(28), color: 'rgba(0,0,0,1)'}}>添加电话</Text>
                            </TouchableOpacity>
                            : null
                    }
                </View>
            </BaseContainer>
        )
    }
}

const mapStateToProps = ({config, user})=> {
    return {config, user}
}

export default connect(mapStateToProps)(AddReport___);
