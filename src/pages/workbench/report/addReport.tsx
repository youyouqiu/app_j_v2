import React, {Component, PureComponent, ReactElement} from 'react';
import {DeviceEventEmitter, Image, Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import {connect, MapStateToProps} from 'react-redux';
import {Toast} from 'teaset';
import {scaleSize} from '../../../utils/screenUtil';
import {addReportDataApi} from '../../../services/report';
import BaseContainer from '../../../components/Page';
import Input from '../../../components/Form/Input';
import {STYLE} from './style';
import {NavigationScreenProps} from 'react-navigation';

interface propsTypes {
    config: any
}

class routeParam {
    customerInfo: selectCustomerInfoParam|null = null;
    buildingInfo: selectBuildingInfoParam|null = null;
    type: 'formBuild'|'customer'|'continue'|'ordinary' = 'ordinary'; // 从楼盘进入 从客户进入 从继续报备进入 不带参数的进入
}

interface phoneListTypes {
    phone: string;
    isFocus: boolean;
    isMain: boolean;
}

export class selectBuildingInfoParam {
    public buildTreeId: string|null = null;
    public buildingId: string|null = null;
    public buildingName: string|null = null;
}

export class selectCustomerInfoParam {
    public customerName: string|null = null;
    public customerId: string|null = null;
    public sex: boolean = true;
    public phones: {phone: string, isMain: boolean}[] = [];
}

class AddReport extends Component<propsTypes & NavigationScreenProps> {
    state = {
        selectBuildingInfo: new selectBuildingInfoParam(),
        selectCustomerInfo: new selectCustomerInfoParam(),
        phoneList: [] as phoneListTypes[],
        loading: false
    };
    routeParameter: routeParam = (this.props.navigation.state.params as routeParam) || new routeParam(); // 路由参数
    addListener: any; // 监听返回
    listener: any; // 返2

    constructor (props: any) {
        super(props);
    }

    componentDidMount () {
        console.log(this.props.navigation.state.params, 'this.props.navigation.state.params');
        console.log(this.routeParameter, 'routeParameter');
        this._initData();
        this.addListener = DeviceEventEmitter.addListener('addReport', (params: routeParam) => {
            this.routeParameter = params;
            if (params.type === 'continue') {
                this.setState({
                    selectCustomerInfo: new selectCustomerInfoParam(),
                    phoneList: [],
                }, () => {
                    this._initData()
                })
            }
        });
        this.listener = DeviceEventEmitter.addListener('buildingData', (message) => {
            this.setBuilding(message);
        });
    }

    componentWillUnmount() {
        this.addListener && this.addListener.remove();
        this.listener && this.listener.remove();
    }

    _initData = async () => {
        try {
            const {customerInfo, buildingInfo} = this.routeParameter;
            customerInfo && await this.setState({
                selectCustomerInfo: customerInfo,
            });
            const phoneList = this._initPhoneList(customerInfo ? customerInfo.phones : []);
            await this.setState({phoneList});
            buildingInfo && await this.setState({
                selectBuildingInfo: buildingInfo
            });
        } catch (e) {
            console.log(e, '初始化失败')
        }
    };

    _substringPhone = (phone: string = ''): string => {
        if (!phone && phone.length !== 11) return '';
        return phone.substring(0, 3) +  phone.substring(7, 11)
    };

    _initPhoneList = (phoneList: any[]): phoneListTypes[] => {
        const list: phoneListTypes[] = [{
            phone: '',
            isMain: true,
            isFocus: false
        }];
        let _list: phoneListTypes[] = phoneList.reduce((res: phoneListTypes[], curr: { phone: string, isMain: boolean }) => {
            let item: phoneListTypes = {
                phone: this._substringPhone(curr.phone),
                isMain: curr.isMain,
                isFocus: false
            };
            curr.isMain ? res.unshift(item) : res.push(item);

            return res;
        }, [] as phoneListTypes[]);
        return _list.length ? _list : list;
    };

    _renderBottom = (): ReactElement => {
        const {loading} = this.state;
        return <View style={STYLE.btnWarp}>
            <TouchableOpacity
                style={STYLE.btn}
                disabled={loading}
                onPress={this._onSubmit}
            >
                <Text style={STYLE.btnText}>提交报备</Text>
                {loading ? <ActivityIndicator/> : null}
            </TouchableOpacity>
        </View>
    };

    _goBuildingList = () => {
        this.props.navigation.navigate('reportBuilding');
        // this.props.navigation.navigate('reportBuilding', this.setBuilding);
    };

    _customerChoice = () => {
        this.props.navigation.navigate('cusLJ', this.setCustomer);
    };

    setCustomer = (selectCustomerInfo: selectCustomerInfoParam|null) => {
        console.log('选择的客户信息', selectCustomerInfo);
        if (!selectCustomerInfo || !selectCustomerInfo.customerId || !selectCustomerInfo.customerName) return;
        const {customerId, customerName, sex, phones} = selectCustomerInfo;

        const phoneList = this._initPhoneList(phones || []);
        this.setState({
            selectCustomerInfo: {
                customerId: customerId,
                customerName: customerName,
                sex: sex
            },
            phoneList: phoneList
        });
    };

    setBuilding = (selectBuildingInfo: selectBuildingInfoParam|null) => {
        selectBuildingInfo && this.setState({
            selectBuildingInfo,
        })
    };

    _setCustomerInfo = ((key, val) => {
        let customer = this.state.selectCustomerInfo;
        // @ts-ignore
        customer[key] = val;
        this.setState({
            customer: customer
        })
    }) as (key: keyof selectCustomerInfoParam, val: selectCustomerInfoParam[keyof selectCustomerInfoParam]) => void;

    _setPhoneList = (item: phoneListTypes, index: number, val: string) => {
        console.log(item, val, '输入');
        const phoneList = this.state.phoneList;
        console.log(phoneList, '_setPhoneList');
        const afterItem = phoneList[index + 1];
        if (val.length === 7) {
            console.log(val, '赋值');
            phoneList[index].phone = val;
            if (afterItem && afterItem.phone.length < 7) {
                console.log(val, '跳下一行');
                phoneList.forEach((curr, i) => {
                    curr.isFocus = i === index + 1 && curr.isMain === afterItem.isMain;
                });
                // @ts-ignore
                this[`phoneNum_${index + 1}`] && this[`phoneNum_${index + 1}`].focus();
            }
        } else if (val.length < 7){
            console.log(val, '赋值');
            phoneList[index].phone = val;
        } else {
            console.log('不操作');
        }
        this.setState({phoneList})
    };

    _toBlur = (isMain: boolean, key: number) => {
        let phoneList: phoneListTypes[] = this.state.phoneList;
        phoneList.forEach((curr, index) => {
            if (index === key && curr.isMain === isMain) {
                curr.isFocus = false
            }
        });
        this.setState({phoneList})
    };

    _toFocus = (isMain: boolean,  key: number) => {
        // @ts-ignore
        this[`phoneNum_${key}`] && this[`phoneNum_${key}`].focus();
        let phoneList: phoneListTypes[] = this.state.phoneList;
        phoneList.forEach((curr, index) => {
            curr.isFocus = index === key && curr.isMain === isMain;
        });
        this.setState({phoneList})
    };

    _getBorder = (item: phoneListTypes, i: number, list: string[]) => {
        if (!item.isFocus) return null;
        if (list.length === 7 && i === 6) return STYLE.inputYesBorder;
        if (!item.phone && i === 0) return STYLE.inputYesBorder;
        if (list.length && i === list.length) return STYLE.inputYesBorder;
    };

    _rightContent = (key: number, isMain: boolean) => {
        let valueList: string[] = [];
        valueList = (this.state.phoneList[key] || '').phone.split('');
        const item = this.state.phoneList[key];
        return (
            <View style={STYLE.inputRightWarp}>
                {
                    [0,1,2,3,4,5,6].map((i) => {
                        return  <View key={i}  style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity style={{marginRight: scaleSize(i === 2 ? null : 8)}}
                                              activeOpacity={0.8}
                                              onPress={() => {
                                                  this._toFocus(isMain, key)
                                              }}>
                                <Text style={[STYLE.textWarpSmall,
                                    this._getBorder(item, i, valueList)
                                ]}>{valueList[i]}</Text>
                            </TouchableOpacity>
                            {
                                i === 2 ?  <Text style={{fontSize: scaleSize(28), color: '#868686', textAlign: 'center', width: scaleSize(60)}}>****</Text> : null
                            }
                        </View>
                    })
                }
                {
                    !isMain ? <TouchableOpacity
                        style={{paddingLeft: scaleSize(5), paddingRight: scaleSize(13)}}
                        activeOpacity={0.8}
                        onPress={() => {this._deletePhone(key)}}
                    >
                        <Image
                            style={{width: scaleSize(30), height: scaleSize(30)}}
                            source={require('../../../images/icons/delelte2.png')}
                        />
                    </TouchableOpacity>
                        :
                        <View style={{ width: scaleSize(48), height: scaleSize(30)}}/>
                }
            </View>
        )
    };

    _deletePhone = (key: number) => {
        const phoneList = this.state.phoneList;
        phoneList.splice(key, 1);
        console.log(phoneList, '_deletePhone');
        this.setState({phoneList})
    };

    _addPhone = (val?: string) => {
        let phoneList = this.state.phoneList;
        let item: phoneListTypes = {
            phone: val ? val : '',
            isMain: false,
            isFocus: false
        };
        phoneList.push(item);
        this.setState({
            phoneList,
        })
    };
    
    _checkPhone = (phoneList: phoneListTypes[]): boolean => {
        if (!phoneList || !phoneList.length) {
            return false
        }
        for (let curr of phoneList) {
            if (!/^[1][3,4,5,6,7,8,9][0-9]{5}$/.test(curr.phone)) {
                return false;
            }
        }
        return true;
    };

    _getMainAndOtherPhone = (): {main: string, list: string[]} => {
        let {phoneList} = this.state;
        let res: {main: string, list: string[]} = {main: '', list: []};
        phoneList && phoneList.forEach((curr: phoneListTypes) => {
            const phone = curr.phone.substr(0, 3) + '****' + curr.phone.substr(3, 7);
            if (curr.isMain) {
                res.main = phone;
            } else {
                res.list.push(phone);
            }
        });
        return res
    };

    _onSubmit = async () => {
        try {
            await this.setState({loading: true});
            let {selectBuildingInfo: build, selectCustomerInfo: customer, phoneList} = this.state;
            if (!build.buildingId || !build.buildingName || !build.buildTreeId) {
                Toast.message('请选择报备楼盘');
                return
            }
            if (!customer.customerName) {
                Toast.message('请输入客户姓名');
                return
            }
            if (!/^[\u4e00-\u9fa5]{1,10}$/.test(customer.customerName)) {
                Toast.message('姓名为10位以内的汉字');
                return
            }
            if (!this._checkPhone(phoneList)) {
                Toast.message('请完善客户手机号码');
                return
            }

            const phone_obj = this._getMainAndOtherPhone();

            const param = {
                source: 1,
                phones: phone_obj.list,
                customerInfos: {
                    customerId: customer.customerId, //todo 选择客户时才有值--感觉产品逻辑有问题
                    customerName: customer.customerName,
                    sex: customer.sex ? 1 : 0,
                    customerPhone: phone_obj.main
                },
                buildingId: build.buildingId || '',
                buildingTreeId: build.buildTreeId || '',
                buildingName: build.buildingName || '',
            };
            console.log(param, 'requestData');
            const res = await addReportDataApi(param);
            console.log(res, '提交报备成功');
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
            DeviceEventEmitter.emit('refreshReportData', 1);
            this.props.navigation.navigate('reportSuccess', reportSuccessInfo);
        } catch (e) {
            console.log(e, '提交报备失败');
            Toast.message(e.message || '提交报备失败');
        } finally {
            this.setState({loading: false});
        }
    };

    render () {
        let {selectBuildingInfo: build, selectCustomerInfo: customer, phoneList} = this.state;
        const sex = customer ? customer.sex : true;
        return (
            <BaseContainer
                title='添加报备'
                bodyStyle={{padding: 0, backgroundColor: '#fff'}}
                footer={this._renderBottom()}
            >
                <View  style={STYLE.pageBox}>
                    <TouchableOpacity activeOpacity={0.8} style={{position: 'absolute', zIndex: 10,width: '100%', height: '100%'}} onPress={this._goBuildingList}/>
                    <Input
                        value={(build && build.buildingName) ?  build.buildingName : ''}
                        style={{textAlign: 'right', paddingRight: scaleSize(16)}}
                        placeholder='请选择'
                        editable={false}
                        label={
                            <View style={{width: 100, marginLeft: scaleSize(32)}}>
                                <Text style={{fontSize: scaleSize(28), color: 'rgb(134,134,134)'}}>报备项目</Text>
                            </View>
                        }
                        rightContent={
                            <View
                                style={[STYLE.bigBtns, {paddingRight: scaleSize(32)}]}
                            >
                                <Image
                                    style={{width: scaleSize(40), height: scaleSize(40)}}
                                    source={require('../../../images/icons/chose.png')}
                                />
                            </View>
                        }
                    />
                </View>
                <Input
                    onChange={(e: any) => this._setCustomerInfo('customerName', e)}
                    value={(customer && customer.customerName) ? customer.customerName : ''}
                    label={
                        <View style={{width: 100, marginLeft: scaleSize(32)}}>
                            <Text style={{fontSize: scaleSize(28), color: 'rgb(134,134,134)'}}>客户姓名</Text>
                        </View>
                    }
                    placeholder='请输入客户名'
                    style={{textAlign: 'right', paddingRight: scaleSize(16)}}
                    rightContent={
                        <TouchableOpacity
                            style={[STYLE.bigBtns, {paddingRight: scaleSize(32)}]}
                            activeOpacity={0.8}
                            onPress={this._customerChoice}
                        >
                            <Image
                                style={{width: scaleSize(40), height: scaleSize(40)}}
                                source={require('../../../images/icons/kehu2.png')}
                            />
                        </TouchableOpacity>
                    }
                />
                <Input
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
                                        sex ? STYLE.sexYes : STYLE.sexNo
                                    ]
                                }
                                activeOpacity={0.8}
                                onPress={() => {this._setCustomerInfo('sex', true)}}
                            >
                                <Text
                                    style={
                                        [
                                            STYLE.inputContext,
                                            sex ? STYLE.sexYesFont : STYLE.sexNoFont
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
                                        !sex ? STYLE.sexYes : STYLE.sexNo
                                    ]
                                }
                                activeOpacity={0.8}
                                onPress={() => {this._setCustomerInfo('sex', false)}}
                            >
                                <Text
                                    style={
                                        [
                                            STYLE.inputContext,
                                            !sex ? STYLE.sexYesFont : STYLE.sexNoFont
                                        ]
                                    }
                                >
                                    女
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }
                />

                {
                    phoneList.map((item, index) => {
                        return (
                            <Input
                                key={index}
                                value={item.phone}
                                // autoFocus={item.isFocus}
                                onChange={(e: any) => this._setPhoneList(item, index, e)}
                                label={
                                    <View style={{width: 50, marginLeft: scaleSize(32)}}>
                                        <Text style={{fontSize: scaleSize(28), color: 'rgb(134,134,134)'}}>手机号</Text>
                                    </View>
                                }
                                placeholder=''
                                maxLength={7}
                                keyboardType='numeric'
                                selectionColor="transparent"
                                onBlur={() => this._toBlur(item.isMain, index)}
                                // @ts-ignore
                                elem={(ref: ReactElement) => this[`phoneNum_${index}`] = ref}
                                style={{width: 0, height: 0, padding: 2, backgroundColor: '#fff'}}
                                rightContent={this._rightContent(index, item.isMain)}
                            />
                        )
                    })
                }

                {
                    phoneList.length < 5 ?
                        <TouchableOpacity
                            style={[STYLE.topRight, {padding: scaleSize(32)}]}
                            activeOpacity={0.8}
                            onPress={() => {this._addPhone()}}
                        >
                            <Image
                                style={{width: scaleSize(40), height: scaleSize(40)}}
                                source={require('../../../images/icons/addPhone2.png')}
                            />
                            <Text style={{fontSize: scaleSize(28), color: 'rgba(0,0,0,1)'}}>添加电话</Text>
                        </TouchableOpacity>
                        :
                        null
                }

            </BaseContainer>
        )
    }

}

const mapStateToProps: MapStateToProps<propsTypes, any, any> = ({config}) => ({config});

export default connect(mapStateToProps)(AddReport)