import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, DeviceEventEmitter} from 'react-native';
import {connect} from 'react-redux';
import {Toast} from 'teaset';
import {DatePicker} from 'xkjdatepicker';
import moment from 'moment';

// 工具
import {scaleSize} from './../../../utils/screenUtil';
import {VisitInfoDataApi} from './../../../services/report';
import {debounce} from '../../../utils/utils';

// 组件
import BaseContainer from '../../../components/Page';
import Input from '../../../components/Form/Input';
import ReportUpload from './reportUpload';

// 样式
import {STYLE} from './style';

class VisitInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reportInfo: '', // 报备单数据
            sex: 1, // 男女
            timeData: undefined, // 时间
            fromData: {}, // 录入表单信息
            files: [], // 图片信息
        }
    }

    componentDidMount() {
        let {navigation} = this.props;
        let reportInfo = ((navigation || {}).state || {}).params || {};

        if (reportInfo.id) {
            this.setState({
                reportInfo,
                fromData: {
                    Name: reportInfo.customerName,
                },
                sex: reportInfo.customerSex,
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

    // 图片上传信息
    getImagesList = (imageList) => {
        console.log('图片上传信息', imageList)

        this.setState({
            imageList,
        })
    }

    // 关闭图片上传组件
    onClose = () => {
        console.log('关闭图片上传组件')


    }

    // 时间选择
    onChange = (value) => {
        console.log('时间选择')

        let timeData = moment(value).format('YYYY-MM-DD HH:mm:ss');

        this.setState({
            timeData,
        }, () => {
            this.setValue();
        })
    }

    // 数据处理
    handleData = () => {
        console.log('数据处理')

        let {reportInfo, sex, fromData, timeData} = this.state;
        let newClientList = [];
        let regName = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{1,10}$/;
        let regPhone = /^\d{4}$/;

        for (let i = 0; i < ((reportInfo || {}).customerPhoneList || []).length; i++) {
            let newPhoneList = {};
            let key = 'Phone' + i;
            let phoneThree = `${((((reportInfo || {}).customerPhoneList || [])[i] || {}).customerPhone || '').slice(0, 3)}`;
            let phoneFour = `${((((reportInfo || {}).customerPhoneList || [])[i] || {}).customerPhone || '').slice(7)}`;

            if (fromData[key]) {
                Object.assign(newPhoneList, {
                    clientName: fromData.Name,
                    clientSex: sex,
                    clientPhone: `${phoneThree}${fromData[key]}${phoneFour}`,
                    isPrimary: i === 0 ? true : false,
                })

                newClientList.push(newPhoneList);
            }
        }

        if (!regName.test(fromData.Name)) {
            Toast.message('姓名为10位以内的汉字');

            return false;
        }

        // 数据合法检测
        let verification = newClientList.map((item, index) => {
            if (!fromData[`Phone${index}`]) {
                return false;
            }

            if (!regPhone.test(fromData[`Phone${index}`])) {
                Toast.message('手机号码仅允许输入数字');

                return false;
            }

            return true;
        })

        if (!verification.some(item => item)) {
            Toast.message('请至少输入一组手机号');

            return false;
        }

        if (!timeData) {
            setTimeout(() => {
                Toast.message('请选择时间和日期');
            }, 2000)

            return false;
        }

        if (regName.test(fromData.Name) && verification.some(item => item) && timeData) {
            this.onVisitData(newClientList);
        }
    }

    // 录入到访信息接口
    onVisitData = async (newClientList) => {
        console.log('录入到访信息接口')

        let {reportInfo, imageList, timeData} = this.state;
        let {api} = this.props.config.requestUrl;

        let body = {
            reportId: reportInfo.id,
            beltLookClient: newClientList,
            beltLookAttach: imageList,
            visitTime: timeData,
        }

        try {
            let res = await VisitInfoDataApi(api, body);

            if (res && res.code === '0') {
                Toast.message('录入成功，请联系项目经理确认')

                DeviceEventEmitter.emit('refreshReportData', 1);

                this.props.navigation.navigate('reportList');
            }

        } catch(error) {
            console.log(error);

            Toast.message(error.message);
        }
    }

    // 提交到访信息
    onSubmit = () => {
        console.log('提交到访信息')

        this.handleData();
    }

    // 表单右侧自定义组件
    _rightContent = (num, item, values) => {
        let valueList = (values || '').split('');

        return (
            <View style={STYLE.inputRightWarp}>
                <Text style={{fontSize: scaleSize(28), color: 'rgba(0,0,0,1)', marginRight: scaleSize(9)}}>
                    {((item || {}).customerPhone || '').slice(0, 3)}
                </Text>
                <TouchableOpacity
                    style={{marginRight: scaleSize(8)}}
                    activeOpacity={0.8}
                    onPress={() => {this.onFocusColor(num)}}
                >
                    <Text style={[STYLE.textWarp, valueList.length === 1 ? STYLE.inputYesBorder : null]}>{valueList[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{marginRight: scaleSize(8)}}
                    activeOpacity={0.8}
                    onPress={() => {this.onFocusColor(num)}}
                >
                    <Text style={[STYLE.textWarp, valueList.length === 2 ? STYLE.inputYesBorder : null]}>{valueList[1]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{marginRight: scaleSize(8)}}
                    activeOpacity={0.8}
                    onPress={() => {this.onFocusColor(num)}}
                >
                    <Text style={[STYLE.textWarp, valueList.length === 3 ? STYLE.inputYesBorder : null]}>{valueList[2]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{}}
                    activeOpacity={0.8}
                    onPress={() => {this.onFocusColor(num)}}
                >
                    <Text style={[STYLE.textWarp, valueList.length === 4 ? STYLE.inputYesBorder : null]}>{valueList[3]}</Text>
                </TouchableOpacity>
                <Text style={{fontSize: scaleSize(28), color: 'rgba(0,0,0,1)', marginLeft: scaleSize(9), marginRight: scaleSize(32)}}>
                    {((item || {}).customerPhone || '').slice(7)}
                </Text>
            </View>
        )
    }

    // 底部固定栏
    _renderBottom = () => {
        return (
            <View style={STYLE.btnWarp}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={STYLE.btn}
                    onPress={() => {debounce(this.onSubmit)()}}
                >
                    <Text style={STYLE.btnText}>提交信息</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        let {sex, fromData, timeData, reportInfo} = this.state;

        return (
            <BaseContainer
                title='录入到访信息'
                bodyStyle={{padding: 0, backgroundColor:'#fff'}}
                footer={this._renderBottom()}
                footerStyle={{}}
            >
                <View style={{borderTopWidth: scaleSize(2), borderTopColor: 'rgb(234,234,234)'}}>
                    <Input
                        onChange={(e) => this.setValue('Name', e)}
                        value={fromData.Name}
                        label={
                            <View style={{width: 100, marginLeft: scaleSize(32)}}>
                                <Text style={{fontSize: scaleSize(28), color: 'rgb(134,134,134)'}}>
                                    {/* <Text style={{color: 'red'}}>*</Text> */}姓名
                                </Text>
                            </View>
                        }
                        placeholder='请输入真实客户姓名'
                        maxLength={10}
                        defaultValue={reportInfo.customerName || ''}
                        style={{textAlign: 'right', paddingRight: scaleSize(32)}}
                    />
                    <Input
                        onChange={(e) => this.setValue('Sex', e)}
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
                                    style={[STYLE.inputWarp, sex === 0 ? STYLE.sexYes : STYLE.sexNo]}
                                    activeOpacity={0.8} onPress={() => {this.onSex(0)}}>
                                    <Text style={[STYLE.inputContext, sex === 0 ? STYLE.sexYesFont : STYLE.sexNoFont]}>女
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        }
                    />

                    {
                        (reportInfo.customerPhoneList || []).map((item, index) => {
                            return (
                                <Input
                                    onChange={(e) => this.setValue(`Phone${index}`, e)}
                                    value={fromData[`Phone${index}`]}
                                    label={
                                        <View style={{width: 100, marginLeft: scaleSize(32)}}>
                                            <Text style={{fontSize: scaleSize(28), color: 'rgb(134,134,134)'}}>手机号</Text>
                                        </View>
                                    }
                                    placeholder=''
                                    maxLength={4}
                                    keyboardType='numeric'
                                    elem={ref => this[`inputTest${index}`] = ref}
                                    style={{textAlign: 'right', width: 0, height: 0}}
                                    key={index}
                                    rightContent={this._rightContent(index, item, fromData[`Phone${index}`])}
                                />
                            )
                        })
                    }
                </View>

                <View style={STYLE.strongLine}></View>

                <View>
                    <Input
                        onChange={(e) => this.setValue('Building', e)}
                        value={fromData.Building}
                        label={
                            <View style={{width: 100, marginLeft: scaleSize(32)}}>
                                <Text style={{fontSize: scaleSize(28), color: 'rgb(134,134,134)'}}>具体到访时间</Text>
                            </View>
                        }
                        placeholder='选择时间和日期'
                        editable={false}
                        defaultValue={timeData || ''}
                        style={{textAlign: 'right', paddingRight: scaleSize(16)}}
                        rightContent={
                            <DatePicker
                                value={this.state.value}
                                mode="datetime"
                                defaultDate={new Date()}
                                minDate={new Date(2015, 7, 6)}
                                maxDate={new Date(2026, 11, 3)}
                                onChange={this.onChange}
                                format="YYYY-MM-DD hh:mm"
                            >
                                <TouchableOpacity
                                    style={[STYLE.bigBtns, {paddingLeft: scaleSize(216)}]}
                                    activeOpacity={0.8}
                                >
                                    <Image
                                        style={{width: scaleSize(40), height: scaleSize(40), paddingLeft:scaleSize(10)}}
                                        source={require('../../../images/icons/chose.png')}
                                        alt='图标'
                                    />
                                </TouchableOpacity>
                            </DatePicker>
                        }
                    />
                </View>

                <View style={STYLE.strongLine}/>

                <View style={{padding: scaleSize(32)}}>
                    <ReportUpload
                        reportId={reportInfo.id || ''}
                        getImagesList={this.getImagesList}
                        navigation={this.props.navigation}
                    />
                </View>
            </BaseContainer>
        )
    }
}

const mapStateToProps = ({config, user})=> {
    return {config, user}
}

export default connect(mapStateToProps)(VisitInfo);
