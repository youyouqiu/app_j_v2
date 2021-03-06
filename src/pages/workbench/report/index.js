import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Image, Clipboard, Linking, DeviceEventEmitter} from 'react-native';
import {connect} from 'react-redux';
import {Toast} from '@new-space/teaset';
import QRCode from 'react-native-qrcode-svg';
import {ActivityIndicator} from 'react-native';
// 工具
import {scaleSize} from './../../../utils/screenUtil';
import {qCoderDataApi, reportDataApi, reportCountApi, copyMult} from './../../../services/report';
import {verifyUser} from '../../../utils/utils'
// 组件
import BaseContainer from '../../../components/Page';
import Modal from './../../../components/Modal';
import SwitchView from './../../../components/SwitchView';
import MyselfTabs from './_components/_tabs';
// 样式
import {STYLE} from './style';

const SwitchViewItem = SwitchView.Item;

class Report extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reportData: {}, // 报备列表数据
            totalCount: {}, // 报备列表数量
            pageSize: 30, // 报备列表数据初始条数
            visible: false, // 弹窗状态
            reportId: '', // 报备 id
            reportInfo: {}, // 选中的报备信息
            // qCoderContent: '' // 二维码信息
        }
        this.listenerAddReport = ''; // ! 监听新增报备数据刷新
        this.listenerRefreshReportData = ''; // ! 监听新增到访数据刷新
    }

    componentDidMount() {
        const init = this.props.navigation.state.params?.source==='personal' ? 1 : 0
        this.initReportData(init); // 报备
        this.initReportCount(); // 数量
        this.listenerAddReport = DeviceEventEmitter.addListener('addReport', (params) => { // 监听页面刷新
            console.log(params, 'params');
            if ((params || {}).type === 'check') {
                this.initReportData(0); // 报备
                this.initReportCount(); // 数量
            }
        });
        this.listenerRefreshReportData = DeviceEventEmitter.addListener('refreshReportData', (params) => { // 监听页面刷新
            console.log(params, 'params');
            if (params === 1) {
                this.initReportData(0); // ! 因为到访确认后依然跳转报备列表项，所以继续刷新报备列表
                this.initReportCount(); // 数量
            }
        });
        this.props.sendPoint.add({target: '页面', page: '工作台-报备管理', action: 'view'});
    }

    componentWillUnmount() {
        this.listenerAddReport && this.listenerAddReport.remove();
        this.listenerRefreshReportData && this.listenerRefreshReportData.remove();
    }

    // 报备列表数据
    initReportData = async (type) => {
        const {pageSize, reportData} = this.state;
        let newReportData = {...reportData};
        let oneData = []; // 报备
        let twoData = []; // 到访
        let threeData = []; // 失效
        let {api} = this.props.config.requestUrl;
        let body = {
            type: type + 1,
            filterContent: '',
            pageIndex: 0,
            pageSize,
        }
        try {
            let res = await reportDataApi(api, body);
            if (res && res.code === '0') {
                let data = res.extension || {};
                let newPageSize = pageSize;
                if (newPageSize < res.totalCount) {
                    newPageSize += 30;
                }
                if (type === 0) {
                    oneData = [...data];
                    newReportData[0] = oneData;
                }
                if (type === 1) {
                    twoData = [...data];
                    newReportData[1] = twoData;
                }
                if (type === 2) {
                    threeData = [...data];
                    newReportData[2] = threeData;
                }
                this.setState({
                    pageSize: newPageSize,
                    reportData: newReportData,
                })
            }
        } catch (error) {
            console.log(error, 'error');
        }
    }

    // 报备列表数量
    initReportCount = async () => {
        let {api} = this.props.config.requestUrl;
        try {
            let res = await reportCountApi(api);
            if (res && res.code === '0') {
                let data = res.extension || {};
                this.setState({
                    totalCount: data,
                })
            }
        } catch (error) {
            console.log(error, 'error');
        }
    }

    // 跳转搜索页面
    gotoSearchPage = () => {
        this.props.navigation.navigate('reportSearch');
    }

    // 跳转详情选择
    gotoSelectInfo = async (type, typeId, reportInfo, visitType) => {
        switch (type) {
            case 1:
                this.initqCoderData(typeId);
                this.setState({
                    reportId: typeId,
                    reportInfo,
                    visible: true,
                })
                break;

            case 2:
                if (visitType === 0) {
                    Toast.message('到访单请联系项目经理确认！');
                } else if (visitType === 1) {
                    this.props.navigation.navigate('visitDetail', typeId);
                    this.props.sendPoint.add({target: '到访列表跳转详情_button', page: '工作台-报备管理'})
                }
                break;

            case 3:
                this.props.navigation.navigate('', typeId);
                break;

            case 4:
                try {
                    await verifyUser('stronge', '', <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Text>您还未完善报备需要的个人信息</Text>
                        <Text>(姓名、经纪公司)</Text>
                    </View>, true)
                    this.props.navigation.navigate('addReport', typeId);
                    this.props.sendPoint.add({target: '添加报备_button', page: '工作台-报备管理'});
                } catch (e) {
                    console.log(e, 'error');
                }
                break;

            default:
                console.log('没有default');
        }
    }

    // 拨打电话
    callPhone = (userPhoneNumber) => {
        Linking.openURL(`tel:${userPhoneNumber}`);
    }

    // 跳转录入带看页面/确认弹窗
    onOk = () => {
        let {reportInfo} = this.state;
        this.setState({
            visible: false,
        }, async () => {
            try {
                await verifyUser('stronge')
                this.props.navigation.navigate('visitInfo', reportInfo);
            } catch (e) {
            }
        });
        this.props.sendPoint.add({target: '填写带看单_input', page: '工作台-报备管理'})
    }

    // onRequestClose Android 后退键激活 modal 关闭事件
    onRequestClose = () => {
        this.setState({
            visible: false,
        })
    }

    // 复制报备信息/关闭弹窗
    onClose = async () => {
        let {reportInfo} = this.state;
        const response = await copyMult({reportIds: [reportInfo.id]});
        Clipboard.setString(response.extension.copyText);
        this.setState({
            visible: false,
        }, () => {
            Toast.message('已复制到粘贴板');
        });
        this.props.sendPoint.add({ target: '报备详情复制_button', page: '工作台-报备管理' });
    };

    // X
    setVisible = () => {
        this.setState({
            visible: false,
        })
    }

    // 二维码信息接口
    initqCoderData = async (reportId) => {
        console.log('二维码信息接口')
        let {api} = this.props.config.requestUrl;
        try {
            await this.setState({animating: true});
            let res = await qCoderDataApi(api, reportId);
            console.log(res, 'res');
            if (res && res.code === '0') {
                let data = res.extension[0] || {};
                this.setState({
                    qCoderContent: data.qCoderContent || '',
                })
            }
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({animating: false})
        }
    }

    render() {
        const {visible, qCoderContent, animating, reportData, totalCount} = this.state;
        let logoImg = require('../../../images/pictures/ic_launcher.png');
        const rightView = (
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <TouchableOpacity activeOpacity={0.8} onPress={this.gotoSearchPage} style={STYLE.bigBtns}>
                    <Image style={STYLE.titleRightImg} source={require('../../../images/icons/Search2.png')}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.gotoSelectInfo(4)} style={STYLE.bigBtns}>
                    <Image style={STYLE.titleRightImg} source={require('../../../images/icons/Add2.png')}/>
                </TouchableOpacity>
            </View>
        );
        return (
            <BaseContainer
                title='报备管理'
                bodyStyle={{padding: 0, backgroundColor: '#F8F8F8'}}
                scroll={false}
                rightView={rightView}
            >
                <View style={{height: '100%'}}>
                    <MyselfTabs
                        {...this.props}
                        reportData={reportData}
                        totalCount={totalCount}
                        gotoSelectInfo={this.gotoSelectInfo}
                        callPhone={this.callPhone}
                        initReportData={this.initReportData}
                        initReportCount={this.initReportCount}
                        initPage={this.props.navigation.state.params?.source==='personal' ? 1 : 0}
                    />
                </View>
                <Modal
                    visible={visible}
                    transparent={true}
                    type='basic'
                    width={541}
                    height={633}
                    title={''}
                    footerType={'two'}
                    confirmText={'填写带看确认单'}
                    cancelText={'复制报备信息'}
                    onOk={this.onOk}
                    onClose={this.onClose}
                    onRequestClose={this.onRequestClose}
                    closable
                    onClosable={this.setVisible}
                >
                    <View style={STYLE.modalQRCodeWarp}>
                        <SwitchView current={animating ? 'loading' : 'default'}>
                            <SwitchViewItem type='loading'>
                                <View style={STYLE.modalQRCodeAnimating}>
                                    <ActivityIndicator animating={animating}/>
                                </View>
                            </SwitchViewItem>
                            <SwitchViewItem type={'default'}>
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <View style={{marginTop: scaleSize(77), marginBottom: scaleSize(32)}}>
                                        <QRCode
                                            value={qCoderContent}
                                            logo={logoImg}
                                            logoBorderRadius={1}
                                            color={'#191919'}
                                            backgroundColor={'#ffffff'}
                                            logoSize={38}
                                            size={160}
                                        />
                                    </View>
                                    <Text style={STYLE.modalQRCodeText}>出示二维码给项目经理确认</Text>
                                </View>
                            </SwitchViewItem>
                        </SwitchView>
                    </View>
                </Modal>
            </BaseContainer>
        )
    }
}

const mapStateToProps = ({config, user, point}) => {
    return {
        config,
        user,
        sendPoint: point.buryingPoint,
    }
}

export default connect(mapStateToProps)(Report);
