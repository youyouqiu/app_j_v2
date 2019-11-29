import React, {ReactElement, useEffect, useState} from "react";
import BaseContainer from '../../../../components/Page'
import {connect} from "react-redux";
import {
    Modal,
    TouchableOpacity,
    View,
    Text,
    FlatList,
    Image,
    ActivityIndicator,
    Clipboard,
    KeyboardAvoidingView,
    Platform,
    DeviceEventEmitter
} from "react-native";
import styles from "./styles";
import TextArea from "../../../../components/TextArea/TextArea";
import ApiCustom from "../../../../services/customManager";
import {Toast} from 'teaset'
import {scaleSize} from "../../../../utils/screenUtil";
import {RenderContent1, RenderContent2, RenderContent3, RenderContent4, RenderContent5, RenderContent6} from "./RenderContent";
import NoData from "../../../../businessComponents/noData";
import {debounce, verifyUser} from "../../../../utils/utils";
import {STYLE} from "../../report/style";
import SwitchView from "../../../../components/SwitchView";
import QRCode from "react-native-qrcode-svg";
import {qCoderDataApi, qCoderDataApi_followUp} from "../../../../services/report";
import FollowTypeGroup from "./FollowType";
import BuryingPoint from "@/utils/BuryPoint";

const SwitchViewItem = SwitchView.Item;
const labels = {'1': '微信', '2': '电话', '3': '见面', '4': '邮件', '5': '其他', '6': '微信'};
const logoImg = require('../../../../images/pictures/ic_launcher.png');
const _dataDefault = {
    refreshing: false,
    pageIndex: 0,
    pageSize: 6,
    hasMore: true,
    hasRequest: false,
    random: Math.random()
};
const defaultQRData: any = {
    animating: true,
    lookVisible: false,
    random: Math.random()
};
const followListDefault: any = [];

const FollowUp = (props: any) => {
    let companyId = (props.user.userInfo || {}).filialeId;
    const customerId = props.navigation.state.params.id;
    const [visible, setVisible] = useState(false);
    const [QRData, setQRData] = useState(defaultQRData);
    const [confirmData, setConfirmData] = useState({type: '', text: ''});
    const [toastData, setToastData] = useState({message: '', visible: false});
    const [followList, setFollowList] = useState(followListDefault);
    const [_data, _setData] = useState(_dataDefault);

    /**
     * 从列表而来，直接打开写跟进modal
     */
    useEffect(() => {
        const {source} = props.navigation.state.params
        source === 'cusList' && modalVisibleToggle()
    }, [])

    /*跟进信息*/
    useEffect(() => {
        console.log('跟进信息_useEffect');
        const getFollowData = async () => {
            const {pageIndex, pageSize} = _data;
            let requestData = {
                "customerId": customerId,
                "pageIndex": pageIndex,
                "pageSize": pageSize
            };
            console.log('requestData', requestData);
            const result = await ApiCustom.getFollowData(requestData).catch(err => {
                console.error('获取跟进信息失败111', err)
            });
            try {
                if (!result) return;
                console.log('跟进信息：', result);
                const {extension, totalCount, pageSize, pageIndex} = result;
                setFollowList([...followList, ...extension]);
                _setData({
                    ..._data,
                    refreshing: false,
                    hasRequest: true,
                    hasMore: totalCount > pageSize * (pageIndex + 1)
                })
            } catch (e) {
                console.log('获取跟进信息失败', e);
                _setData({
                    ..._data,
                    refreshing: false,
                    hasRequest: true,
                })
            }
        };
        customerId && getFollowData();
    }, [customerId, _data.pageIndex, _data.random]);

    /*二维码信息*/
    useEffect(() => {
        const getQRContent = async () => {
            const {config} = props;
            const result = await qCoderDataApi_followUp(config.requestUrl.api, QRData.reportId).catch(err => {
                console.log('获取二维码失败', err)
            });
            if (!result) return;
            console.log('获取二维码：', result);
            setQRData({...QRData, ...result.extension, animating: false})
        };
        QRData.reportId && getQRContent();
    }, [QRData.random]);

    const modalVisibleToggle = () => {
        if (visible) setConfirmData({type: '', text: ''});
        setVisible(!visible)
    };

    const lookModalVisibleToggle = (reportInfo: any) => {
        console.log('lookModalVisibleToggle', QRData.lookVisible, reportInfo);
        if (QRData.lookVisible) {
            setQRData({...QRData, lookVisible: false, animating: true})
        } else {
            setQRData({...QRData, lookVisible: true, reportId: reportInfo.reportId, random: Math.random()})
        }
    };

    const onChangeText = (text: any) => {
        setConfirmData({...confirmData, text: text})
    };

    const labelSelectedOnchange = (data: any) => {
        setConfirmData({...confirmData, type: data})
    };

    const confirm = async () => {
        BuryingPoint.add({
            page: '工作台-客户管理',
            target: '写跟进_button',
        });

        if (!confirmData.type || !confirmData.text) {
            setToastData({message: '请完善信息!', visible: true});
            setTimeout(() => {
                setToastData({message: '', visible: false});
            }, 2000);
            return
        }
        const body = [{
            "companyId": companyId,
            "customerId": customerId,
            "source": 0,
            "type": confirmData.type,
            "content": confirmData.text
        }];
        const result = await ApiCustom.addFollow(body).catch(err => {
            console.log('跟进信息添加失败：', err)
        });
        if (!result) return;
        setVisible(false);
        Toast.message('跟进信息添加成功！');
        setConfirmData({...confirmData, type: ''});
        onRefresh();
        DeviceEventEmitter.emit('hadAddFollowUp')
    };

    /*跳转录入带看页面/确认弹窗*/
    const onOk = async () => {
        console.log('onOk', QRData.reportInfo);
        await verifyUser('stronge');
        let customerPhoneList: any = [];
        QRData.reportPhones.map((item: any) => {
            customerPhoneList.push({
                customerName: QRData.customerName,
                customerPhone: item,
                interiorRepetition: false,
                customerSex: QRData.customerSex,
            })
        });
        const reportInfo = {
            id: QRData.id,
            customerName: QRData.customerName,
            customerSex: QRData.customerSex,
            customerPhoneList: customerPhoneList
        };
        console.log('reportInfo:', reportInfo);
        setQRData({...QRData, lookVisible: false});
        props.navigation.navigate('visitInfo', reportInfo);
        props.sendPoint.add({target: '填写带看单_input', page: '工作台-报备管理'})
    };

    const onClose = async () => {
        const {buildingTreeName, userCompanyShortName, userCompanyName, customerName, userTrueName, userPhoneNumber, userDeptName, reportPhones} = QRData;
        const copyText = '报备楼盘：' + buildingTreeName + '\n' + '经纪公司：' + (userCompanyShortName || '暂无数据') + ' | ' + userCompanyName + '\n' + '客户姓名：' + customerName + '\n' + '客户电话：' + reportPhones.join(',') + '\n' + '经纪人：' + userTrueName + '\n' + '经纪人电话：' + userPhoneNumber + '\n' + '业务组别：' + (userDeptName || '暂无数据');
        Clipboard.setString(copyText);
        setQRData({...QRData, lookVisible: false});
        Toast.message('复制成功');
    };

    const onRefresh = () => {
        console.log('onRefresh');
        setFollowList([]);
        _setData({..._data, refreshing: true, hasRequest: false, pageIndex: 0, random: Math.random()});
    };

    const onEndReached = () => {
        if (_data.hasMore && _data.hasRequest) {
            console.log('onEndReached');
            // @ts-ignore
            debounce(_setData)({..._data, pageIndex: _data.pageIndex + 1});
        }
    };

    const listFooterComponent = () => {
        if (followList.length === 0 && _data.hasRequest) return null;
        if (_data.hasMore) return <View style={styles.s_footerWrapper}><ActivityIndicator/><Text>&emsp;加载中</Text></View>;
        return <View style={styles.s_footerWrapper}><Text>无更多数据</Text></View>;
    };

    const renderItem = ({item}: any) => {
        let leftData: any = {
            text: '',
            icon: ''
        };
        let renderContentFun = () => {
            let _renderContent = null;
            if (item.source.toString() === '1') {
                leftData.text = item.type;
                leftData.icon = typeIcon(item.type).icon_1;
                if (['签约', '认购'].includes(item.type)) {
                    _renderContent = <RenderContent1 data={item}/>
                } else if (['报备', '到访'].includes(item.type)) {
                    _renderContent = <RenderContent2 lookModalVisibleToggle={lookModalVisibleToggle} data={item}/>
                } else if (['退房'].includes(item.type)) {
                    _renderContent = <RenderContent3 data={item}/>
                } else if ('换房' === item.type) {
                    _renderContent = <RenderContent4 data={item}/>
                } else if ('换客' === item.type) {
                    _renderContent = <RenderContent5 data={item}/>
                }
            } else if (item.source.toString() === '2') {
                leftData.text = '跟进';
                leftData.icon = typeIcon('跟进').icon_1;
                _renderContent = <RenderContent6 data={item}/>
            }
            return _renderContent;
        };
        const renderContent = renderContentFun();
        return (
            item.content ? (
                <View style={styles.s_stepItem}>

                    <View style={styles.s_stepItemLeft}>
                        <View style={styles.s_stepItemLeftContainer}>
                            <View style={styles.s_stepItemLeft_iconContent}>
                                <Image style={styles.s_stepItemLeft_icon} source={leftData.icon}/>
                            </View>
                            <View style={styles.s_stepItemLeft_textContent}>
                                <Text style={styles.s_stepItemLeft_text}>  {leftData.text}</Text>
                            </View>
                        </View>
                        <View style={styles.s_stepItemLeft_lineWrap}/>
                    </View>

                    <View style={styles.s_stepItemRight}>
                        {renderContent}
                    </View>
                </View>

            ) : <Text>{null}</Text>
        )
    };

    const followInfoModalContent = (
        <TouchableOpacity activeOpacity={1} onPress={modalVisibleToggle} style={styles.fu_modalContainer}>
            <TouchableOpacity style={styles.fu_modalContent} activeOpacity={1} onPress={() => null}>
                <View style={styles.fu_modalContentTop}>
                    <Text style={styles.fu_modalTitle}>选择跟进方式</Text>
                    {/*<LabelGroup data={labels} style={{width: '30%'}} labelSelectedOnchange={labelSelectedOnchange}/>*/}
                    <FollowTypeGroup labelSelectedOnchange={labelSelectedOnchange}/>
                    <TextArea multiline={true}
                              maxLength={200}
                              placeholder='最多填写200字内容'
                              textAlignVertical='top'
                              onChangeText={onChangeText}
                              style={styles.fu_modalTextInput}/>
                </View>
                <View style={styles.fu_modalFooter}>
                    <TouchableOpacity style={styles.fu_modalCancelBtn} activeOpacity={0.8} onPress={modalVisibleToggle}>
                        <Text style={styles.fu_modalCancelBtnText}>取消</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fu_modalConfirmBtn} activeOpacity={0.8} onPress={confirm}>
                        <Text style={styles.fu_modalConfirmBtnText}>确定</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            {toastData.visible ? (
                <TouchableOpacity activeOpacity={1} onPress={() => null} style={styles.fu_modalToast}>
                    <Text style={styles.fu_modalToastText}>{toastData.message}</Text>
                </TouchableOpacity>
            ) : null}
        </TouchableOpacity>
    );

    const keyboardContent = (content: any) => {
        let renderContent = content;
        if (Platform.OS === 'ios')
            renderContent = (
                <KeyboardAvoidingView behavior="padding" enabled>
                    {content}
                </KeyboardAvoidingView>
            );
        return renderContent
    };
    console.log('followList', followList);
    return (
        <BaseContainer title='跟进情况' scroll={false}>
            <View style={{flex: 1, paddingBottom: scaleSize(150)}}>
                <FlatList data={[...followList]}
                          keyExtractor={(item, idx) => idx.toString()}
                          renderItem={renderItem}
                          refreshing={_data.refreshing}
                          onEndReachedThreshold={0.1}
                          onEndReached={onEndReached}
                          onRefresh={onRefresh}
                          ListEmptyComponent={followList.length === 0 && _data.hasRequest ? <NoData/> : null}
                          ListFooterComponent={_data.refreshing ? null : listFooterComponent}
                />
            </View>
            <View style={styles.fu_footerWrapper}>
                <TouchableOpacity style={styles.fu_footerContent} activeOpacity={0.8} onPress={modalVisibleToggle}>
                    <Text style={styles.fu_footerContentText}>新增跟进</Text>
                </TouchableOpacity>
            </View>

            {/*添加跟进信息*/}
            <Modal transparent={true} visible={visible} onRequestClose={modalVisibleToggle}>
                {keyboardContent(followInfoModalContent)}
            </Modal>
            {/*录入带看信息*/}
            <Modal transparent={true} visible={QRData.lookVisible} onRequestClose={() => lookModalVisibleToggle('')}>
                <TouchableOpacity activeOpacity={1} onPress={() => lookModalVisibleToggle('')} style={styles.fu_look_modalWrapper}>
                    <View style={styles.fu_look_modalContainer}>
                        <View style={styles.fu_look_modalHeader}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => lookModalVisibleToggle('')}>
                                <Image style={styles.fu_look_modalHeader_close} source={require('../../../../images/icons/close.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.fu_look_modalContent}>
                            <SwitchView current={QRData.animating ? 'loading' : 'default'}>
                                <SwitchViewItem type='loading'>
                                    <View>
                                        <View style={styles.fu_look_modalLoadingContent}>
                                            <ActivityIndicator animating={QRData.animating}/>
                                        </View>
                                        <Text style={STYLE.modalQRCodeText}>&emsp;</Text>
                                    </View>
                                </SwitchViewItem>
                                <SwitchViewItem type={'default'}>
                                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                        <QRCode value={QRData.reportId} logo={logoImg} logoBorderRadius={1} color={'#191919'} backgroundColor={'#ffffff'}
                                                logoSize={34} size={152}/>
                                        <Text style={STYLE.modalQRCodeText}>出示二维码给项目经理确认</Text>
                                    </View>
                                </SwitchViewItem>
                            </SwitchView>
                        </View>
                        <View style={styles.fu_look_footer}>
                            <TouchableOpacity style={styles.fu_look_cancelBtn} onPress={onClose} activeOpacity={0.8}>
                                <Text style={styles.fu_look_cancelBtnText}>复制报备信息</Text>
                            </TouchableOpacity>
                            <View style={styles.fu_look_btnCenter}/>
                            <TouchableOpacity style={styles.fu_look_confirmBtn} onPress={onOk} activeOpacity={0.8}>
                                <Text style={styles.fu_look_confirmBtnText}>填写带看确认单</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </BaseContainer>
    )
};

const mapStateToProps = ({config, sendPoint, user}: any) => {

    return {config, sendPoint, user}
};

export default connect(mapStateToProps)(FollowUp);


export const typeIcon = (type: string = ''): any => {
    let icon: any = {
        icon_1: require('../../../../images/icons/followUp/1.png'),
        icon_2: require('../../../../images/icons/followUp/1_icon.png'),
    };
    switch (type) {
        case '签约':
            icon = {
                icon_1: require('../../../../images/icons/followUp/1.png'),
                icon_2: require('../../../../images/icons/followUp/1_icon.png'),
            };
            break;
        case '认购':
            icon = {
                icon_1: require('../../../../images/icons/followUp/2.png'),
                icon_2: require('../../../../images/icons/followUp/2_icon.png'),
            };
            break;
        case '到访':
            icon = {
                icon_1: require('../../../../images/icons/followUp/3.png'),
                icon_2: require('../../../../images/icons/followUp/3_icon.png'),
            };
            break;
        case '报备':
            icon = {
                icon_1: require('../../../../images/icons/followUp/4.png'),
                icon_2: require('../../../../images/icons/followUp/4_icon.png'),
            };
            break;
        case '退房':
            icon = {
                icon_1: require('../../../../images/icons/followUp/5.png'),
                icon_2: require('../../../../images/icons/followUp/5_icon_tui.png'),
            };
            break;
        case '换房':
            icon = {
                icon_1: require('../../../../images/icons/followUp/5.png'),
                icon_2: require('../../../../images/icons/followUp/5_icon_huan.png'),
            };
            break;
        case '换客':
            icon = {
                icon_1: require('../../../../images/icons/followUp/6.png'),
                icon_2: require('../../../../images/icons/followUp/6_icon.png'),
            };
            break;
        case '跟进':
            icon = {
                icon_1: require('../../../../images/icons/followUp/7.png'),
                icon_2: require('../../../../images/icons/followUp/7_icon.png'),
            };
            break;
    }
    return icon;
};
