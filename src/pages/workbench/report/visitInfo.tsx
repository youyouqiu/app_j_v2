import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, DeviceEventEmitter, ActivityIndicator} from 'react-native';
import {connect, MapStateToProps} from 'react-redux';
import {Toast} from 'teaset';
import {DatePicker} from '@new-space/date-picker';
import moment from 'moment';
import { NavigationScreenProps } from 'react-navigation';
// 工具
import {scaleSize} from './../../../utils/screenUtil';
import {VisitInfoDataApi} from './../../../services/report';

// 组件
import Page from '../../../components/Page';
import Input from '../../../components/Form/Input';
import ReportUpload from './reportUpload';

// 样式
import {STYLE} from './style';

interface customerPhoneListType {
    customerName: string;
    customerPhone: string;
    interiorRepetition: boolean;
    customerSex: number;
}
interface phonesTypes {
    phone: string;
    isFocus: boolean;
    middlePhone: string;
}
class routeParam {
    id: string|null = null;
    customerName: string|null = null;
    customerSex: number = 1; // 1 男 0
    customerPhoneList: customerPhoneListType[] = [];
}

class VisitInfo extends Component<propsTypes & NavigationScreenProps> {
    routeParameter: routeParam = (this.props.navigation.state.params as routeParam) || new routeParam(); // 路由参数
    state = {
        name: '',
        sex: 1,
        phoneList: [],
        visitTime: undefined,
        files: [],
        loading: false,
    };

    componentDidMount () {
        console.log(this.routeParameter, 'routeParameter--routeParameter');
        this._initData();
    };

    _initData = () => {
        try {
            const {customerName, customerSex, customerPhoneList} = this.routeParameter;
            this.setState({
                name: customerName,
                sex: customerSex,
                phoneList: this._getPhones(customerPhoneList || [])
            })
        } catch (e) {

        }
    };

    _getPhones = (list: customerPhoneListType[]): phonesTypes[] => {
        return list.reduce((res, curr: customerPhoneListType) => {
            res.push({
                middlePhone: '',
                phone: curr.customerPhone,
                isFocus: false
            });
            return res;
        }, [] as phonesTypes[]);
    };
    setValue = (key: string, val: any) => {
        this.setState({[key]: val})
    };
    _toFocus = (index: number) => {
        // @ts-ignore
        this[`phoneNum_${index}`] && this[`phoneNum_${index}`].focus();
        let phoneList: phonesTypes[] = this.state.phoneList;
        phoneList.forEach((curr: phonesTypes, key) => {
            curr.isFocus = index === key;
        });
        this.setState({phoneList})
    };
    _toBlur = (key: number) => {
        let phoneList: phonesTypes[] = this.state.phoneList;
        phoneList.forEach((curr, index) => {
            if (index === key) {
                curr.isFocus = false
            }
        });
        this.setState({phoneList})
    };
    _getFocusStyle = (item: phonesTypes, index: number, list: string[]) => {
        if (!item.isFocus) return null;
        if (list.length === 4 && index === 3) return STYLE.inputYesBorder; // 最后一位
        if (!item.middlePhone && index === 0) return STYLE.inputYesBorder;// 第一位
        if (list.length && index === list.length) return STYLE.inputYesBorder; // 其他=它位
    };
    _renderBottom = () => {
        const {loading} = this.state;
        return (
            <View style={STYLE.btnWarp}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[STYLE.btn]}
                    disabled={loading}
                    onPress={this._onSubmit}
                >
                    <Text style={STYLE.btnText}>提交信息</Text>
                    {loading ? <ActivityIndicator/> : null}
                </TouchableOpacity>
            </View>
        )
    };
    _rightContent = (item: phonesTypes, index: number) => {
        const valueList = (item.phone || '').split('');
        const middlePhone = (item.middlePhone || '').split('');
        return (
            <View style={STYLE.inputRightWarp}>
                <Text style={{fontSize: scaleSize(28), color: 'rgba(0,0,0,1)', marginRight: scaleSize(9),}}>
                    {valueList.slice(0, 3)}
                </Text>

                    {
                        [0,1,2,3].map((curr) => {
                            return (
                                <TouchableOpacity
                                    key={curr}
                                    style={{marginRight: scaleSize(8), backgroundColor: '#000'}}
                                    activeOpacity={0.8}
                                    onPress={() => {this._toFocus(index)}}
                                >
                                    <Text style={[STYLE.textWarp, this._getFocusStyle(item, curr, middlePhone)]}>{middlePhone[curr]}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                <Text style={{fontSize: scaleSize(28),minWidth:scaleSize(110), color: 'rgba(0,0,0,1)', textAlign:'left'}}>
                    {valueList.slice(7)}
                </Text>
            </View>
        )
    };
    _getImageList = (files: any[]) => {
        console.log('图片上传信息', files);
        this.setState({
            files,
        })
    };
    _setPhoneList = (item: phonesTypes, index: number, val: string) => {
        const phoneList: phonesTypes[] = this.state.phoneList;
        const afterItem: phonesTypes = phoneList[index + 1];
        if (val.length === 4) {
            console.log(val, '赋值');
            phoneList[index].middlePhone = val;
            if (afterItem && afterItem.middlePhone.length < 4) {
                console.log(val, '跳下一行');
                phoneList.forEach((curr, i) => {
                    curr.isFocus = i === index + 1;
                });
            }
            // @ts-ignore
            this[`phoneNum_${index + 1}`] && this[`phoneNum_${index + 1}`].focus();
        } else if (val.length < 4) {
            phoneList[index].middlePhone = val;
        } else {
            console.log('不操作');
        }

        /*if (val.length === 5 && afterItem && afterItem.middlePhone.length < 4) {// 下一行
            phoneList.forEach((curr, i) => {
                if (i === (index + 1)) {
                    curr.isFocus = true;
                    curr.middlePhone = curr.middlePhone + val.substring(4);
                } else {
                    curr.isFocus = false;
                }
            });
            // @ts-ignore
            this[`phoneNum_${index + 1}`] && this[`phoneNum_${index + 1}`].focus();
        } else if (val.length <=4 ) {// 赋值
            phoneList[index].middlePhone = val;
        } else {
            console.log('不操作');
        }*/
        this.setState({phoneList})
    };

    _checkPhone = (phoneList: phonesTypes[]) => {
        if (!phoneList || !phoneList.length) return false;
        let truePhones = 0;
        for (let curr of phoneList) {
            const phone = curr.phone.substring(0, 3) + curr.middlePhone + curr.phone.substring(7);
            if (phone && curr.middlePhone && !/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(phone)) {
                return false;
            }
            if (phone && /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(phone)) truePhones ++;
        }
        if (!truePhones) return false;
        return true;
    };

    _onSubmit = async () => {
        if (this.state.loading) return;
        try {
            await this.setState({loading: true});
            const {sex, files, phoneList, visitTime} = this.state;
            let {name} = this.state
            const {api} = this.props.config.requestUrl;
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
            const beltLookClient = phoneList.reduce((res, curr: phonesTypes, i) => {
                if (curr.middlePhone) {
                    res.push({
                        clientName: name,
                        clientSex: sex,
                        clientPhone: curr.phone.substring(0, 3) + curr.middlePhone + curr.phone.substring(7),
                        isPrimary: i === 0,
                    });
                }
                return res;
            }, [] as any[]);

            const res = await VisitInfoDataApi(api, {
                reportId: this.routeParameter.id,
                beltLookClient: beltLookClient,
                beltLookAttach: files,
                visitTime: visitTime,
            });
            console.log(res, '录入到访成功');
            Toast.message('录入成功，请联系项目经理确认');
            DeviceEventEmitter.emit('refreshReportData', 1);
            this.props.navigation.navigate('reportList');
        } catch (e) {
            console.log(e, '录入到访失败');
            Toast.message(e.message || '提交报备失败');
        } finally {
            this.setState({loading: false});
        }
    };
    render () {
        const {name, sex, visitTime, phoneList} = this.state;
        return (
            <Page
                title='录入到访信息'
                bodyStyle={{padding: 0, backgroundColor:'#fff'}}
                footer={this._renderBottom()}
            >
                <View style={{borderTopWidth: scaleSize(2), borderTopColor: 'rgb(234,234,234)'}}>
                    <Input
                        onChange={(e) => this.setValue('name', e)}
                        value={name}
                        label={
                            <View style={{width: 100, marginLeft: scaleSize(32)}}>
                                <Text style={{fontSize: scaleSize(28), color: 'rgb(134,134,134)'}}>姓名</Text>
                            </View>
                        }
                        placeholder='请输入真实客户姓名'
                        maxLength={10}
                        style={{textAlign: 'right', paddingRight: scaleSize(32)}}
                    />
                    <Input
                        onChange={(e) => this.setValue('sex', e)}
                        label={
                            <View style={{width: 100, marginLeft: scaleSize(32)}}>
                                <Text style={{fontSize: scaleSize(28), color: 'rgb(134,134,134)'}}>性别</Text>
                            </View>
                        }
                        placeholder=''
                        editable={false}
                        rightContent={
                            <View style={{display: 'flex', flexDirection: 'row', marginRight: scaleSize(32)}}>
                                {
                                    [1,0].map((curr, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                style={
                                                    [
                                                        STYLE.inputWarp,
                                                        {marginRight: scaleSize(curr === 1 ? 16 : 0)},
                                                        sex === curr ? STYLE.sexYes : STYLE.sexNo
                                                    ]
                                                }
                                                activeOpacity={0.8}
                                                onPress={() => {this.setValue('sex', curr)}}
                                            >
                                                <Text
                                                    style={
                                                        [
                                                            STYLE.inputContext,
                                                            sex === curr ? STYLE.sexYesFont : STYLE.sexNoFont
                                                        ]
                                                    }
                                                >
                                                    {curr ? '男':'女'}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        }
                    />
                    {
                        phoneList && phoneList.map((item: phonesTypes, index: number) => {
                            return (
                                <Input
                                    key={index}
                                    value={item.middlePhone}
                                    onChange={(e: any) => this._setPhoneList(item, index, e)}
                                    selectionColor="transparent"
                                    label={
                                        <View style={{width: 100, marginLeft: scaleSize(32)}}>
                                            <Text style={{fontSize: scaleSize(28), color: 'rgb(134,134,134)'}}>手机号</Text>
                                        </View>
                                    }
                                    placeholder=''
                                    maxLength={4}
                                    keyboardType='numeric'
                                    onBlur={() => this._toBlur(index)}
                                    // @ts-ignore
                                    elem={(ref: ReactElement) => this[`phoneNum_${index}`] = ref}
                                    style={{width: 0, height: 0, padding: 2, backgroundColor: '#fff'}}
                                    rightContent={this._rightContent(item, index)}
                                />
                            )
                        })
                    }
                    <View style={STYLE.strongLine}/>
                    <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'flex-end'}}>
                        <View style={{width: 100, marginLeft: scaleSize(32), marginRight: 'auto'}}>
                            <Text style={{fontSize: scaleSize(28), color: 'rgb(134,134,134)'}}>具体到访时间</Text>
                        </View>
                        <DatePicker
                            mode="datetime"
                            defaultDate={new Date()}
                            minDate={new Date(2018, 1, 1)}
                            onChange={(e) => {
                                const timeData = e && moment(e).format('YYYY-MM-DD HH:mm:ss');
                                e && this.setValue('visitTime', timeData)
                            }}
                            format="YYYY-MM-DD hh:mm"
                        >
                            <TouchableOpacity
                                style={[{width: scaleSize(500), paddingVertical: scaleSize(30), paddingRight: scaleSize(10), flexDirection: 'row', alignItems: 'center',justifyContent: 'flex-end'}]}
                                activeOpacity={0.8}
                            >
                                {
                                    visitTime ? <Text style={{fontSize: scaleSize(28), color: '#000'}}>{visitTime}</Text> : <Text style={{fontSize: scaleSize(28), color: '#CBCBCB'}}>选择日期和时间</Text>
                                }
                                <Image
                                    style={{width: scaleSize(40), height: scaleSize(40), paddingLeft:scaleSize(10)}}
                                    source={require('../../../images/icons/chose.png')}
                                />
                            </TouchableOpacity>
                        </DatePicker>
                    </View>
                    <View style={STYLE.strongLine}/>
                    <View style={{padding: scaleSize(32)}}>
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
const mapStateToProps: MapStateToProps<propsTypes, any, any> = ({config, user}) => ({config, user});

export default connect(mapStateToProps)(VisitInfo);
