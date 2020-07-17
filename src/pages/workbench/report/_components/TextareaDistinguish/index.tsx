/**
 * Created by Kary on 2019/12/06 15:27.
 */
import {Image, Text, View, Clipboard, TouchableOpacity, Modal, ActivityIndicator, Platform} from "react-native";
import React, {useState, useEffect, useReducer} from "react";
import styles from './css';
import TextArea from "../../../../../components/TextArea/TextArea";
import {getBuildInfoByNameAndCity, intelligentRecognition} from "@/services/report";
import {Toast} from '@new-space/teaset';
// @ts-ignore
import Theme from '@new-space/teaset/themes/Theme';
import {
    currCustomerInfoParam, customizeFormParam,
    selectBuildingInfoParam
} from "@/pages/workbench/report/types/addReport";
import {scaleSize} from "@/utils/screenUtil";
import storage from "@/utils/storage";
import {STORAGE_KEY} from "@/constants";

export interface distinguishParam {
    customerInfo?: currCustomerInfoParam;
    buildingInfo?: selectBuildingInfoParam;
    templates?: any[];
    watchTime?: string;
}

export const TextareaDistinguish = ({isCreate = false, cityCode = '', continueReport = 0, isCloseTips = false, isCanDistinguish=(val: boolean):any=>{}, distinguish = (obj: distinguishParam) => {}}) => {
    const [pageLoading, setPageLoading] = useState<number|null>(null);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [showYellowText, setShowYellowText] = useState(false);
    const [showTips, setShowTips] = useState(false);
    const reducer = (state: any, action: any) => {
        return {...state, ...action.payload}
    };
    const [config, setConfig] = useReducer(reducer, {
        isShowTextarea: false,
        clipboardData: '',
    });

    const methods = {
        async distinguish (val: string) {
            if (!val) {
                setShowYellowText(false);
                return;
            }
            let obj: distinguishParam = {};
            try {
                setLoading(true);
                const res = await intelligentRecognition({content: val});
                const distinguishInfo = res.extension || {};
                let phone: string[] = (distinguishInfo.phoneList || []);
                let _phone: { phoneId: string|null, phoneNumber: string, isMain: boolean }[] = [];
                phone.forEach((curr, i) => {
                    if (i < 3) {
                        let item = {
                            phoneId: null,
                            phoneNumber: curr,
                            isMain: i === 0
                        };
                        _phone.push(item)
                    }
                });
                console.log(_phone, '_phone-后端');
                setShowYellowText(true);
                obj.customerInfo = {
                    customerName: distinguishInfo.custmerName,
                    sex: distinguishInfo.custmerSex,
                    isChooseCus: false,
                    customerId: null,
                    phones: _phone
                };
                obj.watchTime = distinguishInfo.expectedVisitTime;
                obj.templates = distinguishInfo.teamplateValues;
                if (!distinguishInfo.bulidingName || !cityCode) return;
                const buildIdInfo_res = await getBuildInfoByNameAndCity({keyWord: distinguishInfo.bulidingName, city: cityCode})
                const buildIdInfo = buildIdInfo_res.extension;
                if (!buildIdInfo.id) return;
                obj.buildingInfo = {
                    buildTreeId: buildIdInfo.id,
                    buildingName: buildIdInfo.name,
                    buildingId: buildIdInfo.buildingId,
                };
            } catch (e) {
                console.log(e, '识别出错')
            } finally {
                await distinguish(obj);
                setLoading(false);
            }
        },

        _isCanDistinguish: (val: string | null, _val: string | null) => {
            let isCanDistinguishState = false;
            if (val && val !== _val) {
                const item = ['报备项目', '报备楼盘', '带看项目', '带看楼盘', '项目', '楼盘', '项目名称', '楼盘名称',
                    '客户姓名', '客户', '客户手机号', '客户电话', '客户联系方式'].find((curr) => val.indexOf(curr) >= 0);
                isCanDistinguishState = !!item;
            }
            return isCanDistinguishState
        },

        getClipboardData: async () => {
            let _showTips = showTips;
            try {
                const res = await Clipboard.getString();
                const result = await storage.get(STORAGE_KEY.REPORT_CLIPBOARD_DATA);
                if (res && res !== result && methods._isCanDistinguish(res, config.clipboardData)) {
                    console.log(res, result, '剪切板内容');
                    await storage.set(STORAGE_KEY.REPORT_CLIPBOARD_DATA, res);
                    setShowTips(true);
                    _showTips = true;
                    const payload = {clipboardData: res};
                    setConfig({type: 'updateDemandData', payload});
                }
                isCanDistinguish(_showTips)
            } catch (e) {

            }finally {
                isCanDistinguish(_showTips)
            }
        },
        sure: () => {
            setShowTips(false);
            setValue((config.clipboardData || '').trim().substring(0, 200));
            methods.distinguish(config.clipboardData);
            methods.showTextarea();
        },
        close: () => {
            setShowTips(false);
        },
        clearText: () => {
            setValue('')
        },
        showTextarea: () => {
            console.log('showTextarea');
            const payload = {isShowTextarea: true};
            setConfig({type: 'updateDemandData', payload})
        },
        onChangeValue: (text: string) => {
            setValue((text || '').trim() ? text : '' )
        },
        pageLoading: (loading: boolean) => {
            if (loading) {
                setPageLoading(Toast.show({
                    text: '识别中...',
                    icon: <ActivityIndicator size='large' color={'#FFFFFF'} />,
                    duration: 1000000,
                }));
            } else {
                Toast.hide(pageLoading as number);
                setPageLoading(null)
            }
        }
    };

    useEffect(() => {
        const fun = methods.pageLoading;
        fun(loading);
    }, [loading]);

    useEffect(() => {
        const fun = methods.getClipboardData;
        isCreate && fun();
    }, [isCreate]);

    useEffect(() => {
        if (!isCloseTips || !showTips) return;
        methods.close();
    }, [isCloseTips]);

    useEffect(() => {
        console.log(continueReport, 'continueReport');
        if (!continueReport) return;
        setShowYellowText(false);
        setValue('');
        const payload = {isShowTextarea: false};
        setConfig({type: 'updateDemandData', payload});
        const fun = methods.getClipboardData;
        fun();
    }, [continueReport]);

    return (
        <View  style={{
            backgroundColor: '#F8F8F8',
            zIndex: 100
        }}>
            <View  style={{
                paddingHorizontal: scaleSize(35),
                paddingVertical: scaleSize(15),
            }}>
                {
                    (!config.isShowTextarea && <View style={[styles.position_relative]}>
                        <TouchableOpacity activeOpacity={1} onPress={methods.showTextarea} style={[styles.inputView]}>
                            <Text style={[styles.inputView_text]}>智能识别，支持粘贴或输入整段报备信息</Text>
                            <Image style={[styles.inputView_img]} source={require('../../../../../images/icons/t.png')}/>
                        </TouchableOpacity>
                    </View>)
                }
                {
                    (config.isShowTextarea && <View style={[styles.textAreaView]}>
                <TextArea multiline={true}
                          value={value}
                          numCountVisible={false}
                          maxLength={200}
                          placeholder='智能识别，支持粘贴或输入整段报备信息，自动识别客户姓名、手机号码、楼盘名称'
                          textAlignVertical='top'
                          onChangeText={methods.onChangeValue}
                          style={[styles.textAreaView_textArea]}/>
                        <View style={[styles.textAreaView_tools]}>
                            <Text style={[styles.textAreaView_tools_nums]}>{value.length}/200</Text>
                            <TouchableOpacity activeOpacity={0.9} onPress={methods.clearText}>
                                <Text style={[styles.textAreaView_tools_clear]}>清空</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} disabled={!value || loading} style={[styles.textAreaView_tools_btn, !value ? {backgroundColor: '#CBCBCB'} : {}]} onPress={() => methods.distinguish(value)}>
                                <Text style={[styles.textAreaView_tools_btn_text]}>智能识别</Text>
                            </TouchableOpacity>
                        </View>
                    </View>)
                }
            </View>
            {
                (showYellowText && <Text style={[styles.resView]}>识别结果已自动填入，请确认信息无误后提交报备</Text>)
            }
             <Modal
                visible={showTips}
                transparent={true}
                onRequestClose={() => {
                    setShowTips(false);
                }}
                >
                 <TouchableOpacity onPress={() => {
                     setShowTips(false);
                 }} style={{width: '100%', height: '100%'}}>
                     <View style={[styles.tipsView, {top: Theme.navBarContentHeight + scaleSize(88) + (Platform.OS === 'ios' ? Theme.statusBarHeight : 0)}]}>
                         <TouchableOpacity activeOpacity={1} style={[styles.tipsView_btn]} onPress={methods.sure}>
                             <View style={[styles.tipsView_btn_arrow]}>
                                 <View style={styles.tipsView_btn_arrow_em}/>
                                 <View style={styles.tipsView_btn_arrow_span}/>
                             </View>
                             <Text style={[styles.tipsView_text]}>检测到粘贴板有内容，是否要识别? | 确认识别</Text>
                         </TouchableOpacity>
                     </View>
                 </TouchableOpacity>

            </Modal>
        </View>
    )
};
