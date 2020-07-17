import React, { Component, ReactElement } from 'react';
import { View, Text, TouchableOpacity, Image, DeviceEventEmitter, ActivityIndicator, TextInput } from 'react-native';
import { connect, MapStateToProps } from 'react-redux';
import { Toast } from '@new-space/teaset';
import { DatePicker } from '@new-space/date-picker';
import moment from 'moment';
import { NavigationScreenProps } from 'react-navigation';
// 工具
import { scaleSize } from './../../../utils/screenUtil';
import { VisitInfoDataApi } from './../../../services/report';

// 组件
import Page from '../../../components/Page';
import Input from '../../../components/Form/Input';
import ReportUpload from './reportUpload';

// 样式
import { STYLE } from './style';

interface customerPhoneListType {
    customerName: string;
    customerPhone: string;
    interiorRepetition: boolean;
    customerSex: number;
}
class routeParam {
    id: string | null = null;
    customerName: string | null = null;
    customerSex: number = 1; // 1 男 0
    customerPhoneList: customerPhoneListType[] = [];
    visitTime: string | undefined = undefined
    expectedBeltTime: string | undefined = undefined
}

class VisitInfo extends Component<propsTypes & NavigationScreenProps> {
    routeParameter: routeParam = (this.props.navigation.state.params as routeParam) || new routeParam(); // 路由参数
    state = {
        name: '',
        sex: 1,
        phoneList: [],//完善后的电话号码
        visitTime: undefined,
        visitTimeObj:new Date(),
        files: [],
        loading: false,
        phoneListSource: []//未完善前的电话号码
    };

    componentDidMount() {
        this._initData();
    };

    _initData = () => {
        try {
            const { customerName, customerSex, customerPhoneList, expectedBeltTime } = this.routeParameter;
            console.log(this.routeParameter)
            this.setState({
                name: customerName,
                sex: customerSex,
                phoneList: customerPhoneList.map(a => a.customerPhone),
                phoneListSource: customerPhoneList.map(a => a.customerPhone),
                visitTime: expectedBeltTime
            })
        } catch (e) {

        }
    };
    setValue = (key: string, val: any) => {
        this.setState({ [key]: val })
    };
    _renderBottom = () => {
        const { loading } = this.state;
        return (
            <View style={STYLE.btnWarp}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[STYLE.btn]}
                    disabled={loading}
                    onPress={this._onSubmit}
                >
                    <Text style={STYLE.btnText}>提交信息</Text>
                    {loading ? <ActivityIndicator /> : null}
                </TouchableOpacity>
            </View>
        )
    };
    handleInputChange = (text: string, indexSt: number, indexSec: number, record: string) => {
        const { phoneList } = this.state
        //@ts-ignore
        const singleArr: string[] = phoneList[indexSt].split('')
        singleArr[indexSec] = text || '*'
        //@ts-ignore
        phoneList[indexSt] = singleArr.join('')
        if (!text) return
        //找到下一个可填项
        for (indexSec; indexSec < 11; indexSec++) {
            //遍历至最后,若不为可填，则跳向下一行号码再次重复该过程
            if (indexSec === 10) {
                indexSec = -1
                indexSt += 1
                if (indexSt <= phoneList.length - 1) continue
                break
            }
            if (phoneList[indexSt][indexSec + 1] === '*') {
                //@ts-ignore
                this[`input${indexSt}${indexSec + 1}`].focus()
                break
            }
            continue
        }
    }
    handleKeyPress = (e: any, indexSt: number, indexSec: number, record: string) => {
        const first = record.indexOf('*')
        if (e.nativeEvent.key !== 'Backspace' || indexSec <= first) return
        const { phoneList } = this.state
        if (phoneList[indexSt][indexSec] !== '*') return
        // @ts-ignore
        const singleArr = phoneList[indexSt].split('')
        singleArr[indexSec - 1] = '*'
        // @ts-ignore
        phoneList[indexSt] = singleArr.join('')
        // @ts-ignore
        this[`input${indexSt}${indexSec - 1}`].setNativeProps({ text: '' })
        // @ts-ignore
        this[`input${indexSt}${indexSec - 1}`].focus()
    }

    _rightContent = (item: string, index: number) => {
        return (
            <View style={[STYLE.inputRightWarp]}>
                {
                    item.split('').map((a, i) => {
                        return (
                            <TextInput
                                onChangeText={text => this.handleInputChange(text, index, Number(i), item)}
                                // @ts-ignore
                                ref={ref => this[`input${index}${i}`] = ref}
                                style={[STYLE.phoneInput, a === '*' && { borderBottomColor: '#CBCBCB' }]}
                                editable={a === '*'}
                                keyboardType='numeric'
                                maxLength={1}
                                placeholder='*'
                                onKeyPress={e => this.handleKeyPress(e, index, Number(i), item)}
                                blurOnSubmit={true}
                            >
                                {a === '*' ? undefined : a}
                            </TextInput>
                        )
                    })
                }
            </View>
        )
    };
    _getImageList = (files: any[]) => {
        console.log('图片上传信息', files);
        this.setState({
            files,
        })
    };

    _checkPhone = (phoneList: string[]) => {
        let pass = true
        phoneList.forEach(a => {
            if (!/^\d{11}$/.test(a)) pass = false
        })
        return pass
    };

    _onSubmit = async () => {
        if (this.state.loading) return;
        try {
            await this.setState({ loading: true });
            const { sex, files, phoneList, visitTime } = this.state;
            let { name } = this.state
            const { api } = this.props.config.requestUrl;
            if (!name) {
                Toast.message('请输入客户姓名');
                return
            }
            name && (name = name.trim())
            if (!/^[\u4e00-\u9fa5]{1,10}$/.test(name)) {
                Toast.message('姓名为10位以内的汉字');
                return
            }
            if (!this._checkPhone(phoneList)) {
                Toast.message('请检查手机号码');
                return
            }
            if (!visitTime) {
                Toast.message('请选择具体到访时间');
                return
            }
            const beltLookClient = phoneList.reduce((res, curr: string[], i) => {
                res.push({
                    clientName: name,
                    clientSex: sex,
                    clientPhone: curr,
                    isPrimary: i === 0,
                });
                return res;
            }, [] as any[]);
            console.log('VisitInfoDataApi', {
                reportId: this.routeParameter.id,
                beltLookClient: beltLookClient,
                beltLookAttach: files,
                visitTime: visitTime,
            });
            const res = await VisitInfoDataApi(api, {
                reportId: this.routeParameter.id,
                beltLookClient: beltLookClient,
                beltLookAttach: files,
                visitTime: visitTime,
            });
            console.log(res, '录入到访成功');
            Toast.message('录入成功，请联系项目经理确认');
            DeviceEventEmitter.emit('refreshReportData', 1);
            this.props.navigation.goBack()
        } catch (e) {
            console.log(e, '录入到访失败');
            Toast.message(e.message || '提交报备失败');
        } finally {
            this.setState({ loading: false });
        }
    };
    render() {
        const { name, sex, visitTime, visitTimeObj, phoneListSource } = this.state;
        return (
            <Page
                title='录入到访信息'
                bodyStyle={{ padding: 0, backgroundColor: '#fff' }}
                footer={this._renderBottom()}
            >
                <View style={{ borderTopWidth: scaleSize(2), borderTopColor: 'rgb(234,234,234)' }}>
                    <Input
                        onChange={(e) => this.setValue('name', e)}
                        value={name}
                        label={
                            <View style={{ width: 100, marginLeft: scaleSize(32) }}>
                                <Text style={{ fontSize: scaleSize(28), color: 'rgb(134,134,134)' }}>姓名</Text>
                            </View>
                        }
                        placeholder='请输入真实客户姓名'
                        maxLength={10}
                        style={{ textAlign: 'right', paddingRight: scaleSize(56) }}
                    />
                    <Input
                        onChange={(e) => this.setValue('sex', e)}
                        label={
                            <View style={{ width: 100, marginLeft: scaleSize(32) }}>
                                <Text style={{ fontSize: scaleSize(28), color: 'rgb(134,134,134)' }}>性别</Text>
                            </View>
                        }
                        placeholder=''
                        editable={false}
                        rightContent={
                            <View style={{ display: 'flex', flexDirection: 'row', marginRight: scaleSize(32) }}>
                                {
                                    [1, 0].map((curr, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                style={
                                                    [
                                                        STYLE.inputWarp,
                                                        { marginRight: scaleSize(curr === 1 ? 16 : 0) },
                                                        sex === curr ? STYLE.sexYes : STYLE.sexNo
                                                    ]
                                                }
                                                activeOpacity={0.8}
                                                onPress={() => { this.setValue('sex', curr) }}
                                            >
                                                <Text
                                                    style={
                                                        [
                                                            STYLE.inputContext,
                                                            sex === curr ? STYLE.sexYesFont : STYLE.sexNoFont
                                                        ]
                                                    }
                                                >
                                                    {curr ? '男' : '女'}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        }
                    />
                    {
                        phoneListSource.map((item: string, index: number) => {
                            return (
                                <Input
                                    key={index}
                                    label={
                                        <View style={{ width: 100, marginLeft: scaleSize(32) }}>
                                            <Text style={{ fontSize: scaleSize(28), color: 'rgb(134,134,134)' }}>手机号</Text>
                                        </View>
                                    }
                                    style={{ width: 0, height: 0 }}
                                    rightContent={this._rightContent(item, index)}
                                    viewStyle={{ borderBottomWidth: 0 }}
                                />
                            )
                        })
                    }

                    <View style={STYLE.strongLine} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <View style={{ width: 100, marginLeft: scaleSize(32), marginRight: 'auto' }}>
                            <Text style={{ fontSize: scaleSize(28), color: 'rgb(134,134,134)' }}>具体到访时间</Text>
                        </View>
                        <DatePicker
                            mode="datetime"
                            defaultDate={visitTimeObj}
                            minDate={new Date(2018, 1, 1)}
                            onChange={(e) => {
                                const timeData = e && moment(e).format('YYYY-MM-DD HH:mm:ss');
                                e && this.setValue('visitTime', timeData);
                                e && this.setValue('visitTimeObj', e)
                            }}
                            format="YYYY-MM-DD hh:mm"
                        >
                            <TouchableOpacity
                                style={[{ width: scaleSize(500), paddingVertical: scaleSize(30), paddingRight: scaleSize(10), flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }]}
                                activeOpacity={0.8}
                            >
                                {
                                    visitTime ? <Text style={{ fontSize: scaleSize(28), color: '#000' }}>{moment(visitTime).format('YYYY-MM-DD HH:mm')}</Text> : <Text style={{ fontSize: scaleSize(28), color: '#CBCBCB' }}>选择日期和时间</Text>
                                }
                                <Image
                                    style={{ width: scaleSize(40), height: scaleSize(40), paddingLeft: scaleSize(10) }}
                                    source={require('../../../images/icons/chose.png')}
                                />
                            </TouchableOpacity>
                        </DatePicker>
                    </View>
                    <View style={STYLE.strongLine} />
                    <View style={{ padding: scaleSize(32) }}>
                        <Text style={{ fontSize: scaleSize(28), color: 'rgb(134,134,134)', marginBottom: scaleSize(32) }}>证据图上传（到访现场、确认单）</Text>
                        <ReportUpload
                            reportId={this.routeParameter.id || ''}
                            getImagesList={this._getImageList}
                            navigation={this.props.navigation}
                        />
                    </View>
                </View>
            </Page>
        )
    }
}

interface propsTypes {
    config: any
}
const mapStateToProps: MapStateToProps<propsTypes, any, any> = ({ config, user }) => ({ config, user });

export default connect(mapStateToProps)(VisitInfo);
