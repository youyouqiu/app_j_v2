import React, {Component, ReactElement} from 'react';
import {DeviceEventEmitter, KeyboardAvoidingView, Platform, Image, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, ImageBackground, View, ActivityIndicator} from 'react-native';
import {connect, MapStateToProps} from 'react-redux';
import {Toast} from '@new-space/teaset';
import {scaleSize, deviceHeight, deviceWidth} from '@/utils/screenUtil'
import {
    addReportDataApi,
    buildingsIsCanReport,
    getReportTemplate,
    verifyReport_v2,
    getBuildingInfoByLngAndLat, buildingDataApi, addReportsApi
} from '@/services/report';
import BaseContainer from '../../../components/Page';
import Input from '../../../components/Form/Input';
import {STYLE} from './style';
import {NavigationScreenProps} from 'react-navigation';
import XkjModal from '../../../components/Modal'
import {distinguishParam, TextareaDistinguish} from "@/pages/workbench/report/_components/TextareaDistinguish";
import {DatePicker} from '@new-space/date-picker';
import moment from "moment";
import {
    currBuildingInfoParam,
    currCustomerInfoParam,
    phoneListTypes, routeParam,
    selectBuildingInfoParam,
    customizeFormParam, phoneNumItemTypes, reportBuildsParam, buildsParam
} from "@/pages/workbench/report/types/addReport";
import HANDLE from './handle/addReport';
import storage from "@/utils/storage";
import {STORAGE_KEY} from "@/constants";
import locationApi from '../../../services/location'

class AddReport extends Component<propsTypes & NavigationScreenProps> {
    selectBuildingInfo: selectBuildingInfoParam[] = [];
    reportToastInfoTimeout = new Date().getTime();
    state = {
        currCustomerInfo: new currCustomerInfoParam(),
        reportBuilds: new reportBuildsParam(),
        phoneList: [] as phoneListTypes[],
        isChooseCus: false,
        continueReport: 0,
        isHasWatchTime: false,
        verifyModal: false,
        loading: false,
        modalVisible: false,     //遮罩层显示设置
        modalVisibleNext: false, // 第二步骤
        isCreate: false,
        watchTime: null as null | string,
        watchTimeObj: new Date(),
        verifyCus: [],
        isCloseTips: false,
        buildingPopoverVisible: false,
        reportToastInfo: new selectBuildingInfoParam(),
    };
    routeParameter: routeParam = (this.props.navigation.state.params as routeParam) || new routeParam(); // 路由参数
    addListener: any; // 监听返回
    listener: any; // 返2
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.isFirstIn()
        this.setState({isCreate: true});
        this._initData();
        this.addListener = DeviceEventEmitter.addListener('addReport', (params: routeParam) => {
            this.routeParameter = params;
            if (params.type === 'continue') {//todo 继续报备
                let continueReport = this.state.continueReport;
                this.setState({
                    currCustomerInfo: new currCustomerInfoParam(),
                    continueReport: ++continueReport,
                }, this._initContinue)
            }
        });
        this.listener = DeviceEventEmitter.addListener('buildingData', (message: selectBuildingInfoParam[]) => {
            this.setBuilding(message);
        });
    }

    isFirstIn = async () => {
      const result = await storage.get(STORAGE_KEY.FIRST_IN_REPORT).catch(() => {
        this.setState({
          modalVisible: true
        })
        storage.set(STORAGE_KEY.FIRST_IN_REPORT, '1')
      });
    }

    componentWillUnmount() {
        this.addListener && this.addListener.remove();
        this.listener && this.listener.remove();
    }

    _initContinue = async () => {
        await this._initPhoneList();
        await this._initBuildInfo();
    };

    _initData = async () => {
        try {
            const {customerInfo, buildingInfo} = this.routeParameter;
            buildingInfo && (this.selectBuildingInfo = buildingInfo);
            customerInfo && await this.setState({
                currCustomerInfo: customerInfo
            });
            await this._initPhoneList();
            await this._initBuildInfo();
        } catch (e) {
            console.log(e, '初始化失败')
        } finally {
        }
    };

    _isCanDistinguish = (val: boolean) => {
        //剪切板里没有信息，则展示报备提示框
        if (!val) {
            if (this.routeParameter.type === 'continue' || this.routeParameter.type === 'formBuild') return;
            this._reportToast();
        }
    };

    _reportToast = async () => {
        const storeData = await storage.get(STORAGE_KEY.REPORT_INFO).catch(() => {
            this.getNearbyBuildingInfo();
        });
        if (!storeData) return;
        try {
            const reportToastInfo = {
                buildingName: storeData.buildingName,
                buildTreeId: storeData.buildTreeId,
                buildingId: storeData.buildingId
            };
            this.setState({reportToastInfo, buildingPopoverVisible: true});
        } catch (e) {
            console.log('_reportToast_err', e)
        }
    };


    getNearbyBuildingInfo = async () => {
        const locationResult = await locationApi.fetchCoordinate().catch(() => null);
        if (!locationResult) return;
        const {longitude, latitude} = locationResult;
        //请求后端接口查询5km内的楼盘
        const requestData = {
            "city": (this.props.userInfo || {}).city,
            // "userLongitude": 106.552506,
            // "userLatitude": 29.748639,
            "userLongitude": longitude,
            "userLatitude": latitude,
            "orderBy": 0
        };
        const result = await getBuildingInfoByLngAndLat(requestData).catch(err => {
            console.log('err', err)
        });
        if (result && result.extension && new Date().getTime() - this.reportToastInfoTimeout <= 2000) {
            const reportToastInfo = {
                buildingName: result.extension.name,
                buildingId: result.extension.buildingId,
                buildTreeId: result.extension.id
            };
            this.setState({
                reportToastInfo,
                buildingPopoverVisible: true
            });
        }
    };


    _initPhoneList = async () => {
        try {
            const {phones, isChooseCus} = this.state.currCustomerInfo;
            const {numberType} = this.state.reportBuilds;
            let _list = [{
                phone: HANDLE.fillPhoneNumItem(numberType),
                isMain: true,
                phoneId: null,
            }];
            let list: phoneListTypes[] = (phones || []).reduce((res, curr) => {
                // 兼容错误号码
                if (curr.phoneNumber.length < 11) curr.phoneNumber += new Array(11 - curr.phoneNumber.length).fill("*").join("");
                if (curr.phoneNumber.length > 11) curr.phoneNumber = curr.phoneNumber.substring(0, 11);
                const phoneNums: string[] = curr.phoneNumber.split('');
                const phone = phoneNums.reduce((num_res, num, index) => {
                    const isNumSite = HANDLE.isNumSite(numberType, index);
                    const isNumValue = /^[\d]$/.test(num);
                    const value = (!isNumSite) ? '*' : isNumValue ? num : '';
                    let _item = {
                        value: value,
                        isCanEdit: isNumSite && ((isChooseCus && !value) || !isChooseCus),
                        isNum: isNumSite,
                    };
                    num_res.push(_item);
                    return num_res;
                }, [] as phoneNumItemTypes[]);
                let item: phoneListTypes = {
                    isMain: curr.isMain,
                    phone: phone,
                    phoneId: curr.phoneId
                };
                res.push(item);
                return res
            }, [] as phoneListTypes[]);
            await this.setState({
                phoneList: list.length ? list : _list
            })
        } catch (e) {
            console.log(e, '_initPhoneList-出错')
        }
    };

    _initBuildInfo = async () => {
        try {
            if (!this.selectBuildingInfo.length) return;
            const ids = this.selectBuildingInfo.reduce((res, curr) => {
                res.push({buildingTreeId: curr.buildTreeId, build: curr.buildingId});
                return res;
            }, [] as { build: string | null, buildingTreeId: string | null }[]);
            const buildTemplate_res = await HANDLE.getBuildTemplateInfo(ids);
            const {numberType} = buildTemplate_res;
            let {phoneList, currCustomerInfo} = this.state;
            const {numberType: old_numberType} = this.state.reportBuilds;
            if (old_numberType !== numberType) {// 规则变化时重新排列phoneList
                phoneList.forEach((curr: phoneListTypes, index: number) => {
                    curr.phone = (curr.phone || []).reduce((num_res, num_curr, num_index) => {
                        const isNumSite = HANDLE.isNumSite(numberType, num_index);
                        const isNumValue = /^[\d]$/.test(num_curr.value);
                        let value = '';
                        const _chooseCus_item: { phoneId: string | null, phoneNumber: string, isMain: boolean } | undefined = currCustomerInfo.phones.find((_curr) => _curr.phoneId === curr.phoneId);
                        if (currCustomerInfo.isChooseCus && curr.phoneId && _chooseCus_item) {// 选客要记录之前的电话
                            const _v = _chooseCus_item.phoneNumber.charAt(num_index);
                            value = /^[\d]$/.test(_v) ? _v : ''
                        } else {
                            value = (!isNumSite) ? '*' : isNumValue ? num_curr.value : '';
                        }
                        let item = {
                            value: value,
                            isCanEdit: isNumSite && ((currCustomerInfo.isChooseCus && !value) || !currCustomerInfo.isChooseCus),
                            isNum: isNumSite,
                        };
                        num_res.push(item);
                        return num_res;
                    }, [] as phoneNumItemTypes[])
                });
            }
            await this.setState({
                /*currBuildingInfo: {
                    id: buildTreeId,
                    name: buildingName,
                    buildId: buildingId,
                    numberType: numberType,
                    isHasWatchTime: isHasWatchTime,
                    customizeForm: customizeForm,
                    isCanReport: isCanReport_res.extension,
                },*/
                reportBuilds: buildTemplate_res,
                watchTime: null,
                phoneList: phoneList
            });
        } catch (e) {
            Toast.message(e.message || '查询楼盘模板下信息失败');
            console.log(e, '_initBuildInfo-报错')
        } finally {
        }
    };

    handleTemplate(template: any[] = []): customizeFormParam[] {
        let customizeForm: customizeFormParam[] = this.state.reportBuilds.customizeForm;
        if (customizeForm.length && template.length) {
            customizeForm.forEach((item: customizeFormParam) => {
                const same = template.find((curr) => curr.name === item.name);
                if (same) {
                    item.value = same.value;
                    if (item.isRequired) item.isRight = !!same.value
                }
            })
        }
        return customizeForm
    };

    handleCustomizeForm(list: customizeFormParam[] = [], template: any[] = []) {
        return list.reduce((res: customizeFormParam[], item: customizeFormParam) => {
            let same = template.find((curr) => curr.name === item.name) || this.state.reportBuilds.customizeForm.find((curr: any) => curr.name === item.name);
            if (same) {
                item.value = same.value;
                if (item.isRequired) item.isRight = !!same.value
            }
            res.push(item);
            return res
        }, [])
    };

    _distinguish = async (obj: distinguishParam) => { // todo
        // 赋值顺序不能变
        const {customerInfo, buildingInfo, templates, watchTime} = obj;

        if (buildingInfo) {
            this.selectBuildingInfo = [buildingInfo];
            await this._initBuildInfo();
        }

        if (templates && templates.length) {
            const forms = buildingInfo ? this.handleCustomizeForm(this.state.reportBuilds.customizeForm, templates) : this.handleTemplate(templates);
            await this.setState({
                reportBuilds: Object.assign({}, this.state.reportBuilds, {
                    customizeForm: forms
                })
            });
        }

        if (watchTime && this.state.reportBuilds.isHasWatchTime) {
            const timeData = moment(watchTime).format('YYYY-MM-DD HH:mm');
            await this.setState({watchTime: timeData});
        }

        if (customerInfo) {
            let currCustomerInfo = this.state.currCustomerInfo;
            currCustomerInfo.isChooseCus = customerInfo.isChooseCus;
            currCustomerInfo.customerId = customerInfo.customerId;
            if (customerInfo.customerName) currCustomerInfo.customerName = customerInfo.customerName;
            if (customerInfo.phones) currCustomerInfo.phones = customerInfo.phones;
            if (customerInfo.sex === 1 || customerInfo.sex === 0) currCustomerInfo.sex = customerInfo.sex;
            await this.setState({
                currCustomerInfo: currCustomerInfo
            });
            if (currCustomerInfo.phones.length) {
                await this._initPhoneList();
            }
        }

    };

    _renderBottom = (): ReactElement => {
        const {loading} = this.state;
        return <View style={[STYLE.btnWarp, {borderTopWidth: 0}]}>
            <TouchableOpacity
                style={[STYLE.btn, {marginVertical: scaleSize(20)}]}
                disabled={loading}
                onPress={this._onSubmit}
            >
                <Text style={[STYLE.btnText]}> 提交报备</Text>
                {loading && <ActivityIndicator/>}
            </TouchableOpacity>

            {/*<TouchableOpacity*/}
            {/*    style={[STYLE.btn, {marginVertical: scaleSize(20)}, !isCanReport ? {opacity: 0.8} : {}]}*/}
            {/*    disabled={loading || !isCanReport}*/}
            {/*    onPress={() => storage.remove(STORAGE_KEY.REPORT_INFO)}>*/}
            {/*    <Text style={[STYLE.btnText]}>清除缓存</Text>*/}
            {/*    {loading && <ActivityIndicator/>}*/}
            {/*</TouchableOpacity>*/}

        </View>
    };

    _goBuildingList = () => {
        this.props.navigation.navigate('reportBuilding');
    };

    _customerChoice = () => {
        this.props.navigation.navigate('cusLJ', this.setCustomer);
    };

    setCustomer = (customerInfo: currCustomerInfoParam | null) => {
        if (!customerInfo || !customerInfo.customerId || !customerInfo.customerName || !customerInfo.isChooseCus) return;
        this.setState({
            currCustomerInfo: customerInfo,
        }, this._initPhoneList);
    };

    cleanUser = () => {
        this.setState({
            currCustomerInfo: new currCustomerInfoParam(),
            phoneList: [{
                phone: HANDLE.fillPhoneNumItem(this.state.reportBuilds.numberType),
                isMain: true,
            }],
        });
    };

    setBuilding = (selectBuildingInfo: selectBuildingInfoParam[] | null) => {
        selectBuildingInfo && (this.selectBuildingInfo = selectBuildingInfo);
        this._initBuildInfo()
    };

    _handleCustomerInfoChange = ((key, val) => {
        let customer = this.state.currCustomerInfo;
        // @ts-ignore
        customer[key] = val;
        this.setState({
            currCustomerInfo: customer
        })
    }) as (key: keyof currCustomerInfoParam, val: currCustomerInfoParam[keyof currCustomerInfoParam]) => void;

    _getAllPhone = (list: phoneListTypes[]): { phoneId: string | null, phone: string }[] => {
        return (list || []).reduce((res, curr) => {
            const phone = HANDLE.getNumbers(curr.phone);
            res.push({
                phoneId: curr.phoneId || null,
                phone: phone
            });
            return res;
        }, [] as { phoneId: string | null, phone: string }[])
    };

    _getAllPhone_verify = (list: phoneListTypes[], consultList: any[]): { phoneId: string | null, phone: string }[] => {
        return list.reduce((res, curr) => {
            const phone = HANDLE.getNumbers(curr.phone);
            const item = consultList.find((item) => item.code && item.phone === phone);
            res.push({
                phoneId: item ? item.phoneId : null,
                phone: phone
            });
            return res
        }, [] as { phoneId: string | null, phone: string }[])
    };

    _addPhone = () => {
        let phoneList = this.state.phoneList;
        let item: phoneListTypes = {
            phone: HANDLE.fillPhoneNumItem(this.state.reportBuilds.numberType),
            isMain: false,
            phoneId: null
        };
        phoneList.push(item);
        this.setState({
            phoneList
        })
    };

    _deletePhone = (key: number) => {
        const phoneList = this.state.phoneList;
        phoneList.splice(key, 1);
        this.setState({phoneList})
    };

    _toFocus = (index: number, site: number) => {
        // @ts-ignore
        this[`phoneNum_${index}_${site}`] && this[`phoneNum_${index}_${site}`].focus();
    };

    _handleInputKeyPress = (e: any, index: number, site: number) => {
        if (e.nativeEvent.key !== 'Backspace') return;
        let phoneList = this.state.phoneList;
        let item = phoneList[index];
        let numItem = item.phone[site];
        if (!numItem.value) {
            let _site = -1;
            item.phone.forEach((curr, i) => {// 寻找上一个可编辑项
                if (curr.isNum && curr.isCanEdit && i < site) _site = i
            });
            if (_site < 0) return;
            this._toFocus(index, _site);
            this._handleInputChange('', index, _site);
        }
    };

    _handleInputChange = async (val: string, index: number, site: number) => {
        try {
            let phoneList = this.state.phoneList;
            let item = phoneList[index];
            let numItem = item.phone[site];
            const value = val.replace(/[^\d]/g, "").substring(0, 1);
            numItem.value = value;
            await this.setState({phoneList: phoneList});
            if (!value) return;// 没有值就不找下一个
            const nextIndex = HANDLE.getNextIndex(phoneList, index, site);
            if (nextIndex.nextNumIndex !== null && nextIndex.nextPhoneIndex !== null) this._toFocus(nextIndex.nextPhoneIndex, nextIndex.nextNumIndex);
        } catch (e) {
            console.log(e, '失败')
        }
    };

    _handleHalfInputKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key !== 'Backspace') return;
        // @ts-ignore
        const after_ref = this[`halfInput_after_${index}`];
        if (after_ref.props.value.length < 1) {
            // @ts-ignore
            const before_ref = this[`halfInput_before_${index}`];
            before_ref && before_ref.focus();
            const _val = (before_ref.props.value || '');
            this._handleHalfInputChange(_val.substring(0, _val.length - 1), index, 0)
        }
    };

    _handleHalfInputChange = async (value: string, index: number, ref_index: 0 | 1) => {
        try {
            value = (value || '').replace(/[\s]/g, "");
            // value = (value || '').replace(/[^\d]/g, "");
            const type = this.state.reportBuilds.numberType;
            const numberType = type.split(',');
            let phoneList = this.state.phoneList;
            let numberList = phoneList[index].phone;
            (numberList || []).forEach((curr, i) => {
                const isNumSite = HANDLE.isNumSite(type, i);
                if (isNumSite) {
                    if (ref_index === 0 && value.length > +numberType[0] && (i + 1) <= value.length) {// 复制走这里
                        curr.value = (value.substring(i, i + 1) || '').replace(/[^\d]/g, "");
                    } else {
                        if (ref_index === 0 && i <= +numberType[0]) {
                            curr.value = (value.substring(i, i + 1) || '').replace(/[^\d]/g, "")
                        }
                        if (ref_index === 1 && i >= (11 - (+numberType[1]))) {
                            const _a = i - ((+numberType[0]) + (11 - (+numberType[0]) - (+numberType[1])));
                            curr.value = (value.substring(_a, _a + 1) || '').replace(/[^\d]/g, "")
                        }
                    }
                } else {
                    curr.value = '*'
                }
            });
            await this.setState({
                phoneList: phoneList
            });
            // 找下一个输入框
            const ref = HANDLE.getNextRef(phoneList, index, ref_index, this.state.reportBuilds.numberType);
            // @ts-ignore
            this[`${ref}`] && this[`${ref}`].focus();
        } catch (e) {
        }
    };

    _inputView = (item: phoneListTypes, index: number, isChooseCus: boolean = false) => {
        let elem = null;
        const {phone} = item;
        const {numberType} = this.state.reportBuilds;
        switch (isChooseCus) {
            case true:
                elem = phone.map((curr: phoneNumItemTypes, i) => {
                    const {value, isCanEdit, isNum} = curr;
                    return <View key={i} style={{flexDirection: 'row', alignItems: 'center'}}>
                        {(isNum && isCanEdit) && <View style={[STYLE.inputRightWarp_phone_num_item]}>
                            <Input
                                key={index}
                                viewStyle={{borderBottomWidth: 0, height: scaleSize(60)}}
                                // @ts-ignore
                                elem={(ref: ReactElement) => this[`phoneNum_${index}_${i}`] = ref}
                                onChange={(v: any) => this._handleInputChange(v, index, i)}
                                onKeyPress={(e: any) => this._handleInputKeyPress(e, index, i)}
                                style={{borderBottomWidth: 0, textAlign: 'center', height: scaleSize(40), fontSize: scaleSize(28), color: '#000'}}
                                disabled={!isCanEdit}
                                value={value}
                                placeholder='*'
                                maxLength={1}
                                keyboardType='numeric'
                            />
                        </View>}
                        {(isNum && !isCanEdit) && <Text style={[STYLE.inputRightWarp_phone_num_item, {borderBottomWidth: 0}]}>{curr.value}</Text>}
                        {(!isNum) && <Text style={[STYLE.inputRightWarp_phone_num_item, {borderBottomWidth: 0}]}>*</Text>}
                    </View>
                });
                break;
            case false:
                const halfNumber = HANDLE.getHalfNumber(item.phone, numberType);
                const type = numberType.split(',');
                elem = <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: scaleSize(10)}}>
                    <View style={[{flex: 1}]}>
                        <Input
                            // @ts-ignore
                            elem={(ref: ReactElement) => this[`halfInput_before_${index}`] = ref}
                            viewStyle={{height: scaleSize(60), borderBottomWidth: 0, borderBottomColor: 'transparent'}}
                            style={[{
                                height: scaleSize(60),
                                borderBottomWidth: 0,
                                borderBottomColor: 'transparent',
                                textAlign: 'right',
                                fontSize: scaleSize(28),
                                color: '#000'
                            }]}
                            onChange={(val: any) => this._handleHalfInputChange(val, index, 0)}
                            placeholder={type[0] === '11' ? '手机号全11位' : `前${type[0]}位`}
                            maxLength={halfNumber.beforeLength}
                            value={halfNumber.before}
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: scaleSize(10)}}>
                        {
                            halfNumber.fillText.split('').map(() => {
                                return <Text style={{marginHorizontal: scaleSize(8), textAlign: 'center'}}>*</Text>
                            })
                        }
                    </View>
                    {
                        (type[1] !== '0') && <View style={{flex: 1}}>
                            <Input
                                // @ts-ignore
                                elem={(ref: ReactElement) => this[`halfInput_after_${index}`] = ref}
                                onChange={(val: any) => this._handleHalfInputChange(val, index, 1)}
                                onKeyPress={(e: any) => this._handleHalfInputKeyPress(e, index)}
                                viewStyle={{height: scaleSize(60), borderBottomWidth: 0, borderBottomColor: 'transparent'}}
                                style={{height: scaleSize(60), borderBottomWidth: 0, borderBottomColor: 'transparent', fontSize: scaleSize(28), color: '#000'}}
                                placeholder={`后${type[1]}位`}
                                maxLength={halfNumber.afterLength}
                                value={halfNumber.after}
                                keyboardType='numeric'
                                // keyboardType='default'
                            />
                        </View>
                    }
                </View>;
                break;
            default:
                break;
        }
        return elem
    };

    _rightContent = (item: phoneListTypes, index: number) => {
        const {isMain} = item;
        const {isChooseCus} = this.state.currCustomerInfo;
        return (
            <View style={STYLE.inputRightWarp}>
                {this._inputView(item, index, isChooseCus)}
                {
                    !isMain ? <TouchableOpacity
                            style={{paddingHorizontal: scaleSize(13), marginLeft: scaleSize(10)}}
                            activeOpacity={0.8}
                            onPress={() => {
                                this._deletePhone(index)
                            }}
                        >
                            <Image
                                style={{width: scaleSize(30), height: scaleSize(30)}}
                                source={require('../../../images/icons/delelte2.png')}
                            />
                        </TouchableOpacity>
                        :
                        <View style={{width: scaleSize(51), height: scaleSize(30), marginLeft: scaleSize(10)}}/>
                }
            </View>)
    };

    _customizeFormChange = (val: string, index: number) => {
        let reportBuilds = this.state.reportBuilds;
        let item = reportBuilds.customizeForm[index];
        item.value = val;
        (item.isRequired) && (item.isRight = !!val);
        this.setState(reportBuilds)
    };

    _onSubmit = async () => {
        try {
            let {reportBuilds, currCustomerInfo: customer, phoneList, watchTime} = this.state;
            if (!reportBuilds.builds.length) {
                Toast.message('请选择报备楼盘');
                return
            }
            if (!customer.customerName) {
                Toast.message('请输入客户姓名');
                return
            }
            if (!/^[\u4e00-\u9fa5]{1,7}$/.test((customer.customerName || '').trim())) {
                Toast.message('姓名为7位以内的汉字');
                return
            }
            if (!HANDLE.checkPhone(phoneList, reportBuilds.numberType)) {
                Toast.message('请完善客户手机号码');
                return
            }
            if (HANDLE.isHasIdenticalPhone(phoneList)) {
                Toast.message('请勿输入相同的手机号码');
                return
            }
            if (reportBuilds.isHasWatchTime && !watchTime) {
                Toast.message('请选择预计到访时间');
                return
            }
            const errorCustomizeForm = reportBuilds.customizeForm.find((curr: any) => !curr.isRight);
            if (errorCustomizeForm) {
                Toast.message(`请输入${errorCustomizeForm.name}`);
                return
            }
            await this.setState({loading: true});
            if (!customer.isChooseCus) { // 不是从客户列表选择的值得时候碰到前三后四需要处理
                this._verifyCustomer()
            } else {
                this._sendReport()
            }
        } catch (e) {
            // Toast.message(e.message || '提交报备失败');
        } finally {

        }
    };

    setModalVisble = () => {
      this.setState({
          modalVisible: false,
          modalVisibleNext: true,
      })
    }

    setModalVisbleNext = () => {
      this.setState({
        modalVisibleNext: false
      })
    }

    _verifyCustomer = async () => {
        try {
            const {currCustomerInfo: customer, phoneList} = this.state;
            let list: string[] = [];
            phoneList.forEach((curr: phoneListTypes) => list.push(HANDLE.getNumbers(curr.phone)));
            const res = await verifyReport_v2({
                customerName: customer.customerName,
                customerSex: customer.sex,
                phones: list
            });
            // @ts-ignore
            const {beforeVerifyResult, verifyCustomerList} = res.extension || {};
            let radioList: any[] = [];
            (verifyCustomerList || []).filter((v: any) => {
                radioList.push({
                    label: `${v.customerName}  ${v.customerSex ? '男' : '女'}  ${v.phone}`,
                    code: v.customerId,
                    phone: v.phone || '',
                    phoneId: v.phoneId || '',
                    name: v.customerName,
                    customerSex: v.customerSex
                })
            });
            if (!beforeVerifyResult) {
                this._sendReport();
                return;
            }
            if (beforeVerifyResult === 1) {
                this.setState({
                    verifyCus: radioList
                }, () => {
                    this._sendReport(radioList[0])
                });
                return;
            }
            if (beforeVerifyResult === 2) {
                this.setState({
                    verifyCus: radioList,
                    verifyModal: true
                });
                return;
            }
            if (beforeVerifyResult === 3) {
                radioList.push({
                    label: '以上都不是，新增一个',
                    code: ''
                });
                this.setState({
                    verifyCus: radioList,
                    verifyModal: true
                });
                return
            }
        } catch (e) {
            this.setState({loading: false});
            console.log(e, '重客失败')
        }
    };

    _sendReport = async (item?: any) => {
        try {
            const {reportBuilds} = this.state
            const param = this.handleRequestParam(item);
            const res = await addReportsApi(param);
            const {extension = []} = res
            DeviceEventEmitter.emit('refreshReportData', 1);

            if (reportBuilds?.builds?.length === 1) {
                const build = reportBuilds.builds[0]
                const storeData = {
                    buildTreeId: build.id,
                    buildingName: build.name,
                    buildingId: build.buildId,
                    time: new Date()
                };
                await storage.set(STORAGE_KEY.REPORT_INFO, storeData);
            }
            
            let succes = extension.filter((v: any) => v.isOk)
            let errors = extension.filter((v: any) => !v.isOk)
            let reportIds = succes.map((item: any) => item.reportId)
            this.props.navigation.navigate('reportSuccess', {reportIds: reportIds, errors});
        } catch (e) {
            Toast.message(e.message);
            console.log(e, '提交报备失败');
        } finally {
            this.setState({loading: false});
        }
    };

    handleRequestParam(item: any) {
        const {reportBuilds, currCustomerInfo: customer, watchTime, phoneList, verifyCus} = this.state;
        const {builds, isHasWatchTime, customizeForm} = reportBuilds;
        const userInfo = this.props.userInfo || {};

        let customerIdAndPhone: any = {customerId: '', phones: []};
        if (item && item.code) {
            customerIdAndPhone = {
                customerId: item.code,
                phones: this._getAllPhone_verify(phoneList, verifyCus)
            }
        } else {
            customerIdAndPhone = {
                customerId: customer.customerId,
                phones: this._getAllPhone(phoneList)
            }
        }

        let _q = {list: []};
        const brokerInfo_q = {
            city: userInfo.city,
            companyName: userInfo.filiale,
            companyShortName: userInfo.filialeShortName,
            groupName: userInfo.deptName,
        };

        (builds || []).forEach((buildItem: buildsParam) => {
            let buildInfo: any = {};
            buildInfo.buildingTreeId = buildItem.id;
            buildInfo.buildingId = buildItem.buildId;
            buildInfo.buildingTreeName = buildItem.name;


            let _customerPhones: any[] = [];
            customerIdAndPhone.phones.forEach((curr: any) => {
                let _p = {
                    phoneId: curr.phoneId,
                    // phone: HANDLE.getAnticipateNumber(curr.phone, buildItem.numberType)
                    phone: curr.phone
                };
                _customerPhones.push(_p)
            });

            let customer_q: any = {};
            customer_q.sex = customer.sex;
            customer_q.customerId = customerIdAndPhone.customerId;
            customer_q.phones = _customerPhones;
            customer_q.customerName = customer.customerName;

            let reportExtension: any[] = buildItem.customizeForm.reduce((res, curr) => {
                let item = customizeForm.find((_curr) => _curr.name === curr.name);
                item && res.push({
                    key: item.key,
                    value: item.value
                });
                return res;
            }, [] as any[]);

            let item: any = {};
            item.source = 2;
            item.expectedBeltTime = isHasWatchTime ? watchTime : null;
            item.brokerInfo = brokerInfo_q;
            item.customerInfo = customer_q;
            item.buildingInfo = buildInfo;
            item.reportExtension = reportExtension;

            // @ts-ignore
            _q.list.push(item)
        });
        return _q;
    };

    wrapperTouched = async (type?: any) => {
        const {buildingPopoverVisible, reportToastInfo} = this.state;
        buildingPopoverVisible && this.setState({buildingPopoverVisible: false});
        if (type === 'getReportTemplate') {
            //检测该楼盘是否可以报备
            const {userInfo, config} = this.props;
            const requestData = {
                keyWord: '',
                pageIndex: 0,
                pageSize: 1,
                buildingTreeId: reportToastInfo.buildTreeId,
                city: (userInfo || {}).city || '',
            };
            const res = await buildingDataApi(config.requestUrl.api, requestData).catch(err => {
                Toast.message('该楼盘不能报备');
            });
            if (!res) return;
            const {code, extension} = res;
            if (code === '0' && extension.length > 0) {
                this.selectBuildingInfo = [reportToastInfo];
                this._initBuildInfo();
            } else {
                Toast.message('该楼盘不能报备');
            }
        }
    };

    _modalTitle = () => {
        return <View style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around'
        }}>
            <Text style={{color: '#868686'}}>
                请关联相同客户
            </Text>
            <Text style={{color: '#868686'}}>
                系统检测到此号码曾报备，确保客户信息准确
            </Text>
        </View>
    };

    render() {
        const {continueReport, reportBuilds: build, verifyModal, currCustomerInfo: customer, phoneList, verifyCus, isCreate, watchTime, isCloseTips, watchTimeObj} = this.state;
        const {buildingPopoverVisible, reportToastInfo}: any = this.state;
        const isChooseCus = customer.isChooseCus;
        const {city} = this.props.userInfo;
        const sex = customer ? customer.sex : true;
        const inputLabel = (
            <View style={{width: 100, marginLeft: scaleSize(32)}}>
                <Text style={{fontSize: scaleSize(28), color: 'rgb(134,134,134)'}}>报备项目</Text>
            </View>
        );
        const rightContent = (
            <View style={[STYLE.bigBtns, {paddingRight: scaleSize(32)}]}>
                <Image style={{width: scaleSize(16), height: scaleSize(30)}}
                       source={require('../../../images/icons/chose_gr.png')}/>
            </View>
        );
        return (
            <KeyboardAvoidingView style={{height: '100%'}} behavior='padding' enabled={Platform.OS === 'ios'}>
                <BaseContainer keyboardDismissMode='on-drag' title='添加报备'
                               bodyStyle={{padding: 0, backgroundColor: '#fff'}}>
                    <View pointerEvents='auto' onTouchEnd={() => this.wrapperTouched()}>
                        <TextareaDistinguish continueReport={continueReport} isCloseTips={isCloseTips} isCreate={isCreate} cityCode={city}
                                             distinguish={this._distinguish} isCanDistinguish={this._isCanDistinguish}/>
                        <View style={STYLE.pageBox}>
                            <TouchableOpacity activeOpacity={0.8}
                                              style={{position: 'absolute', zIndex: 10, width: '100%', height: '100%', right: 0}}
                                              onPress={this._goBuildingList}/>
                            <Input value={(build && build.name) ? build.name : ''}
                                   style={{textAlign: 'right', paddingRight: scaleSize(0), fontSize: scaleSize(24), color: '#000'}}
                                   placeholder='支持批量报备'
                                   editable={false}
                                   label={inputLabel}
                                   rightContent={rightContent}/>

                            {buildingPopoverVisible && (
                                <View style={STYLE.buildingPopoverWrapper}>
                                    <View style={STYLE.buildingPopoverContent}>
                                        <TouchableOpacity activeOpacity={1} onPress={() => this.wrapperTouched()}>
                                            <Image style={STYLE.buildingPopover_close} source={require('../../../images/icons/closeWhite.png')}/>
                                        </TouchableOpacity>
                                        <Text onPress={() => this.wrapperTouched('getReportTemplate')}
                                              style={STYLE.buildingPopover_buildName}
                                              numberOfLines={1}>
                                            报备：{reportToastInfo.buildingName}
                                        </Text>
                                    </View>
                                    <View style={STYLE.buildingPopoverArrow}/>
                                </View>
                            )}

                        </View>

                        {build.builds.length > 1 ? (
                            <View style={STYLE.reportTips}>
                                <Text style={STYLE.reportTipsText}>填写以下信息并提交，可将选择的楼盘全部报备</Text>
                            </View>
                        ) : null}

                        <View>
                            <Input
                                onChange={(e: any) => this._handleCustomerInfoChange('customerName', e)}
                                disabled={isChooseCus}
                                value={(customer && customer.customerName) ? customer.customerName : ''}
                                label={
                                    <View style={{width: 100, marginLeft: scaleSize(32)}}>
                                        <Text style={{fontSize: scaleSize(28), color: 'rgb(134,134,134)'}}>客户姓名</Text>
                                    </View>
                                }
                                placeholder='请输入客户名'
                                style={{textAlign: 'right', paddingRight: scaleSize(16), fontSize: scaleSize(28), color: '#000'}}
                                rightContent={
                                    <View style={{alignContent: 'center', flexDirection: 'row'}}>
                                        {
                                            isChooseCus && <TouchableOpacity
                                                style={{padding: 10}}
                                                activeOpacity={0.8}
                                                onPress={this.cleanUser}
                                            >
                                                <Image
                                                    style={{width: scaleSize(30), height: scaleSize(30)}}
                                                    source={require('../../../images/icons/delelte2.png')}
                                                />
                                            </TouchableOpacity>
                                        }
                                        <TouchableOpacity
                                            style={[STYLE.bigBtns, {paddingRight: scaleSize(32), flexDirection: 'row', alignItems: 'center',}]}
                                            activeOpacity={0.8}
                                            onPress={this._customerChoice}
                                        >
                                            <Image
                                                style={{width: scaleSize(40), height: scaleSize(40), marginRight: scaleSize(10)}}
                                                source={require('../../../images/icons/guke3.png')}
                                            />
                                            <Text style={{color: '#000', fontSize: scaleSize(24)}}>导入</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            />
                        </View>
                        <Input
                            label={
                                <View style={{width: 100, marginLeft: scaleSize(32)}}>
                                    <Text style={{fontSize: scaleSize(28), color: 'rgb(134,134,134)'}}>性别</Text>
                                </View>
                            }
                            placeholder=''
                            editable={false}
                            rightContent={
                                <View style={{display: 'flex', flexDirection: 'row', marginRight: scaleSize(30)}}>
                                    <TouchableOpacity
                                        style={[STYLE.inputWarp, {marginRight: scaleSize(16)}, sex ? STYLE.sexYes : STYLE.sexNo]}
                                        activeOpacity={0.8}
                                        disabled={isChooseCus}
                                        onPress={() => {
                                            this._handleCustomerInfoChange('sex', 1)
                                        }}
                                    >
                                        <Text style={[STYLE.inputContext, sex ? STYLE.sexYesFont : STYLE.sexNoFont]}>男</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[STYLE.inputWarp, !sex ? STYLE.sexYes : STYLE.sexNo]}
                                        disabled={isChooseCus}
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            this._handleCustomerInfoChange('sex', 0)
                                        }}
                                    >
                                        <Text style={[STYLE.inputContext, !sex ? STYLE.sexYesFont : STYLE.sexNoFont]}>女</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                        {
                            phoneList.map((item, index) => {
                                return (
                                    <View style={{
                                        paddingLeft: scaleSize(32),
                                        paddingRight: scaleSize(10),
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#EAEAEA'
                                    }}>
                                        <View style={{width: 50}}>
                                            <Text style={{fontSize: scaleSize(28), color: 'rgb(134,134,134)'}}>手机号</Text>
                                        </View>
                                        <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center', height: scaleSize(103)}}>
                                            {this._rightContent(item, index)}
                                        </View>
                                    </View>
                                )
                            })
                        }
                        {
                            (phoneList.length < 3 && !isChooseCus) && <TouchableOpacity
                                style={[STYLE.topRight, {padding: scaleSize(32), borderBottomWidth: 1, borderBottomColor: '#EAEAEA'}]}
                                activeOpacity={0.8}
                                onPress={() => {
                                    this._addPhone()
                                }}
                            >
                                <Image
                                    style={{width: scaleSize(40), height: scaleSize(40)}}
                                    source={require('../../../images/icons/addPhone2.png')}
                                />
                                <Text style={{fontSize: scaleSize(28), color: 'rgba(0,0,0,1)'}}>添加电话</Text>
                            </TouchableOpacity>
                        }
                        {
                            build.isHasWatchTime && <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                borderBottomWidth: 1,
                                borderBottomColor: '#EAEAEA'
                            }}>
                                <View style={{width: 100, marginLeft: scaleSize(32), marginRight: 'auto'}}>
                                    <Text style={{fontSize: scaleSize(28), color: '#868686'}}>预计到访时间</Text>
                                </View>
                                <DatePicker
                                    mode="datetime"
                                    defaultDate={new Date()}
                                    value={watchTimeObj}
                                    minDate={new Date(2018, 1, 1)}
                                    onChange={(e) => {
                                        const timeData = e && moment(e).format('YYYY-MM-DD HH:mm');
                                        e && this.setState({
                                            watchTime: timeData,
                                            watchTimeObj: e
                                        })
                                    }}
                                    format="YYYY-MM-DD hh:mm">
                                    <TouchableOpacity style={[{
                                        width: scaleSize(500),
                                        height: scaleSize(104),
                                        paddingRight: scaleSize(30),
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end'
                                    }]}
                                                      activeOpacity={0.8}>
                                        <Text style={[{
                                            color: '#CBCBCB',
                                            fontSize: scaleSize(28)
                                        }, watchTime ? {color: '#000'} : {color: '#CBCBCB'}]}>{watchTime ? watchTime : '请选择预计到访时间'}</Text>
                                        <Image
                                            style={{width: scaleSize(16), height: scaleSize(30), marginLeft: scaleSize(20)}}
                                            source={require('../../../images/icons/chose_gr.png')}
                                        />
                                    </TouchableOpacity>
                                </DatePicker>
                            </View>
                        }

                        {
                            build.customizeForm.map((curr: customizeFormParam, index) => {
                                return <View key={index} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                                    <Input
                                        label={
                                            <View style={{marginLeft: scaleSize(32), paddingRight: scaleSize(10)}}>
                                                <Text style={{fontSize: scaleSize(28), color: '#868686'}}>{curr.name}</Text>
                                            </View>
                                        }
                                        style={{textAlign: 'right', paddingRight: scaleSize(50), fontSize: scaleSize(28), color: '#000'}}
                                        onChange={(v: any) => this._customizeFormChange(v, index)}
                                        maxLength={20}
                                        value={curr.value}
                                        placeholder={`请输入${curr.name}`}
                                    />
                                </View>
                            })
                        }
                        {/*廖xy让改的*/}
                        {this._renderBottom()}
                        <XkjModal
                            visible={verifyModal}
                            title={this._modalTitle()}
                            onClose={() => {
                                this.setState({verifyModal: false, loading: false})
                            }}
                            onOk={() => {
                            }}
                            type='select'
                            data={verifyCus}
                            onChange={(v: any) => this._sendReport(v)}
                        />
                    </View>
                    <Modal
                        transparent={true}
                        visible={this.state.modalVisible}
                    >
                        <TouchableWithoutFeedback onPress={this.setModalVisble}>
                            <Image resizeMode='stretch' style={{width: deviceWidth, height: deviceHeight}} source={require('@/images/pictures/report_init.png')}/>
                        </TouchableWithoutFeedback>
                    </Modal>
                    <Modal
                        transparent={true}
                        visible={this.state.modalVisibleNext}
                    >
                        <TouchableWithoutFeedback onPress={this.setModalVisbleNext}>
                            <Image resizeMode='stretch' style={{width: deviceWidth, height: deviceHeight}} source={require('@/images/pictures/report_next.png')}/>

                        </TouchableWithoutFeedback>
                    </Modal>
                </BaseContainer>
            </KeyboardAvoidingView>
        )
    }
}

interface propsTypes {
    config: any,
    userInfo: any,
    location: any
}

const mapStateToProps: MapStateToProps<propsTypes, any, any> = ({config, location, user}) => {
    return {
        config,
        location,
        userInfo: user.userInfo || {}
    }
};

export default connect(mapStateToProps)(AddReport)
