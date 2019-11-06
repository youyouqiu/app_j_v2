import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Image, Clipboard, Linking, DeviceEventEmitter} from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient'; // 渐变
import { Toast } from 'teaset';
import QRCode from 'react-native-qrcode-svg';
import moment from 'moment';
import {ActivityIndicator} from 'react-native';
// 工具
import { scaleSize } from './../../../utils/screenUtil';
import { qCoderDataApi } from './../../../services/report';
import {verifyUser} from '../../../utils/utils'
// 组件
import BaseContainer from '../../../components/Page';
import { XKJScrollTabView } from './../../../components/XKJScrollTabView/XKJScrollTabView';
import Modal from './../../../components/Modal';
import SwitchView from './../../../components/SwitchView';

// 样式
import { STYLE } from './style';
const SwitchViewItem = SwitchView.Item;
class Report extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false, // 弹窗状态
            reportId: '', // 报备 id
            reportInfo: {}, // 选中的报备信息
            // qCoderContent: '' // 二维码信息
        }

        this.common = {
            labelList: [
                { name: '报备', type: '1' },
                { name: '到访', type: '2' },
                { name: '失效', type: '3' },
            ],
            requestData: {
                type: '',
                filterContent: '',
                pageIndex: 0,
                pageSize: 30,
            }
        }
    }

    componentDidMount() {
        // this.initReportData(1); // 报备
        // this.initReportData(2); // 到访
        // this.initReportData(3); // 失效
        // this.requestDataManual();
        // this.refreshMarkers();
        this.refreshReportListener = DeviceEventEmitter.addListener('refreshReportData', (message) => {
            if (message === 1) {
                console.log('监听监听监听监听监听监听监听')
                this.requestDataManual();
                this.refreshMarkers();
            }
        });

        this.props.sendPoint.add({ target: '页面', page: '工作台-报备管理', action: 'view' });
    }

    // 跳转搜索页面
    gotoSearchPage = () => {
        this.props.navigation.navigate('reportSearch');
    }

    // 跳转详情选择
    gotoSelectInfo = async (type, typeId, reportInfo, visitType) => {
        console.log('跳转 - 报备-1，到访-2，失效-3，新增报备-4')
        const {user} = this.props;

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
                    this.props.sendPoint.add({ target: '到访列表跳转详情_button', page: '工作台-报备管理' })
                }
                break;

            case 3:
                this.props.navigation.navigate('', typeId);
                break;

            case 4:
                try {
                    await verifyUser('stronge')
                    this.props.navigation.navigate('addReport', typeId);
                    this.props.sendPoint.add({ target: '添加报备_button', page: '工作台-报备管理' });
                } catch (e) {}
                break;

            default:
                console.log('没有default');
        }
    }

    // 拨打电话
    callPhone = (userPhoneNumber) => {
        console.log('拨打电话', userPhoneNumber)

        Linking.openURL(`tel:${userPhoneNumber}`);
    }

    // 跳转录入带看页面/确认弹窗
    onOk = () => {
        console.log('跳转录入带看页面/确认弹窗')

        let { reportInfo } = this.state;
        const {user} = this.props;

        this.setState({
            visible: false,
        }, async () => {
            // if (((user || {}).userInfo || {}).filialeId !== null && ((user || {}).userInfo || {}).filialeId !== '10000') {
                try {
                    await verifyUser('stronge')
                    this.props.navigation.navigate('visitInfo', reportInfo);
                } catch (e) {}
            // } else {
            //     Toast.message('目前报备功能仅向合作公司经纪人开放，请谅解！');
            // }
        });
        this.props.sendPoint.add({ target: '填写带看单_input', page: '工作台-报备管理' })
    }

    // onRequestClose Android 后退键激活 modal 关闭事件
    onRequestClose = () => {
        this.setState({
            visible: false,
        })
    }

    // 复制报备信息/关闭弹窗
    onClose = () => {
        console.log('复制报备信息/关闭弹窗')

        let { reportInfo } = this.state;
        let copyText = '';
        let newPhone = [];

        ((reportInfo || {}).customerPhoneList || []).map((item, index) => {
            newPhone.push(item.customerPhone || '');
        })

        if (reportInfo) {
            copyText = '报备楼盘：' + reportInfo.buildingFullName + '\n' + '经纪公司：' + (reportInfo.userCompanyShortName || '暂无数据') + ' | ' + reportInfo.userCompanyName + '\n' + '客户姓名：' + reportInfo.customerName + '\n' + '客户电话：' + newPhone.join(',') + '\n' + '经纪人：' + reportInfo.userTrueName + '\n' + '经纪人电话：' + reportInfo.userPhoneNumber + '\n' + '业务组别：' + (reportInfo.userDeptName || '暂无数据');
        }

        Clipboard.setString(copyText);

        this.setState({
            visible: false,
        }, () => {
            Toast.message('已复制到粘贴板');
        });

        this.props.sendPoint.add({ target: '报备详情复制_button', page: '工作台-报备管理' });
    }

    // X
    setVisible = () => {
        this.setState({
            visible: false,
        })
    }

    // 二维码信息接口
    initqCoderData = async (reportId) => {
        console.log('二维码信息接口')

        let { api } = this.props.config.requestUrl;

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

    // 报备
    tabItemComponentOne = ({ item }) => {
        let {user} = this.props;
        let userType = ((user ||{}).userInfo || {}).isResident;
        let userId = ((user ||{}).userInfo || {}).id;
        let type = 1;
        let reportId = item.id;
        let reportYear = moment(item.reportTime).format('YYYY');
        let nowReportYear = moment().format('YYYY');
        let validEndDay = '';
        let nowValidDay = moment().format('DD');
        let reportTime = '';
        let validDay = '';
        let validHour = '';

        if (item.reportValidityTime === '永久') {
            validDay = '永久';
        } else {
            validEndDay = moment(item.reportValidityTime).format('DD');
            validDay = moment(item.reportValidityTime).format('MM-DD');
            validHour = moment(item.reportValidityTime).format('HH:mm');
        }

        if (reportYear === nowReportYear) {
            reportTime = moment(item.reportTime).format('MM-DD HH:mm:ss')
        } else {
            reportTime = moment(item.reportTime).format('YYYY-MM-DD HH:mm:ss');
        }

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={STYLE.click}
                onPress={() => {
                    this.gotoSelectInfo(type, reportId, item)
                }}
            >
                <View style={STYLE.warp}>
                    <View style={STYLE.top}>
                        <Text style={STYLE.topRightFont}>
                            单号：<Text>{item.reportNumber || ''}</Text>
                        </Text>
                        <View style={STYLE.topRight}>
                            <Image
                                style={STYLE.topImg}
                                source={require('./../../../images/icons/time2.png')}
                                alt='图标'
                            />
                            <Text style={STYLE.topRightFont}>{reportTime}</Text>
                        </View>
                    </View>

                    <View style={STYLE.line}></View>

                    <View>
                        <View style={[STYLE.top, { alignItems: 'flex-start' }]}>
                            <View style={STYLE.topRight}>
                                {
                                    item.customerSex === 0
                                        ? <Image
                                            style={STYLE.topImg}
                                            source={require('./../../../images/icons/woman2.png')}
                                            alt='图标'
                                        />
                                        : <Image
                                            style={STYLE.topImg}
                                            source={require('./../../../images/icons/man2.png')}
                                            alt='图标'
                                        />
                                }
                                <Text style={STYLE.contentFont}>{item.customerName || ''}</Text>
                                {
                                    item.interiorRepetition
                                        ? <LinearGradient
                                            colors={['rgba(255,138,107,1)', 'rgba(254,81,57,1)']}
                                            style={STYLE.LinearGradient}
                                        >
                                            <Text style={{ color: 'rgba(255,255,255,1)', textAlign: 'center' }}>! 重</Text>
                                        </LinearGradient>
                                        : null
                                }
                            </View>
                            <View style={STYLE.contentPhones}>
                                {
                                    item.customerPhoneList.map((item, index) => {
                                        if (index === 0) {
                                            return (
                                                <Text style={STYLE.contentFont} key={index}>{item.customerPhone || ''}</Text>
                                            )
                                        }

                                        return (
                                            <Text style={STYLE.contentPhonesFont} key={index}>{item.customerPhone || ''}</Text>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View style={[STYLE.top, { marginTop: scaleSize(16) }]}>
                            <View style={STYLE.topRight}>
                                <Text style={STYLE.buildingTypeText}>{item.buildingType || ''}</Text>
                                <Text
                                    style={STYLE.fontMiddle}
                                    numberOfLines={1}
                                    ellipsizeMode={'middle'}
                                >
                                    {item.buildingFullName || ''}
                                </Text>
                            </View>
                            {
                                item.reportValidityTime === '永久'
                                    ? <Text style={STYLE.topRightFont}>
                                        <Text>{validDay}</Text>有效
                                    </Text>
                                    : <Text style={STYLE.topRightFont}>
                                        {
                                            validEndDay === nowValidDay
                                                ? '今日'
                                                : validDay + ' '
                                        }
                                        <Text style={{ color: 'rgba(0,0,0,1)' }}>{validHour}</Text>前有效
                                    </Text>
                            }

                        </View>
                    </View>

                    {
                        userType && userId !== item.userId
                            ? <View>
                                <View style={STYLE.line}></View>

                                <View style={[STYLE.top, {alignItems: 'center'}]}>
                                    <Text
                                        style={[STYLE.fontMiddle, {width: scaleSize(420)}]}
                                        numberOfLines={1}
                                        ellipsizeMode={'middle'}
                                    >
                                        {item.userTrueName || '暂无数据'}<Text> | </Text>{item.userDeptName || '暂无数据'}
                                    </Text>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={[STYLE.phoneWarp, STYLE.topRight]}
                                        onPress={() => {
                                            this.callPhone(item.userPhoneNumber || '')
                                        }}
                                    >
                                        <Image
                                            style={STYLE.topImg}
                                            source={require('./../../../images/icons/phone2.png')}
                                            alt='图标'
                                        />
                                        <Text style={{ fontSize: scaleSize(24), color: 'rgba(75,106,197,1)' }}>拨打电话</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            : null
                    }

                </View>
            </TouchableOpacity>
        )
    }

    // 到访
    tabItemComponentTwo = ({ item }) => {
        let {user} = this.props;
        let userType = ((user ||{}).userInfo || {}).isResident;
        let userId = ((user ||{}).userInfo || {}).id;
        let type = 2;
        let visitId = {
            reportId: item.id || '',
            buildingId: item.buildingId || '',
            buildingTreeId: item.buildingTreeId || '',
        };
        let reportTime = moment(item.reportTime).format('YYYY-MM-DD HH:mm:ss');
        let visitTime = moment(item.visitTime).format('YYYY-MM-DD HH:mm:ss');
        let day = item.beltLookValidityNumber;
        let grade = '';

        switch (item.grade) {
            case 1:
                grade = 'A';
                break;

            case 2:
                grade = 'B+';
                break;

            case 3:
                grade = 'B';
                break;

            case 4:
                grade = 'C';
                break;

            case 5:
                grade = 'D';
                break;

            default:
                console.log('没有default')
        }

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={STYLE.click}
                onPress={() => {
                    this.gotoSelectInfo(type, visitId, {}, item.visitStatus)
                }}
            >
                <View style={STYLE.warp}>
                    <View style={STYLE.top}>
                        <Text style={STYLE.topRightFont}>
                            单号：<Text>{item.reportNumber || ''}</Text>
                        </Text>
                        <Text style={{ fontSize: scaleSize(28), color: 'rgba(254,81,57,1)' }}>
                            {
                                item.visitStatus === 0
                                    ? '未确认'
                                    : '到访已确认'
                            }
                        </Text>
                    </View>

                    <View style={STYLE.line}></View>

                    <View>
                        <View style={[STYLE.top, { alignItems: 'flex-start' }]}>
                            <View style={STYLE.topRight}>
                                {
                                    item.customerSex === 0
                                        ? <Image
                                            style={STYLE.topImg}
                                            source={require('./../../../images/icons/woman2.png')}
                                            alt='图标'
                                        />
                                        : <Image
                                            style={STYLE.topImg}
                                            source={require('./../../../images/icons/man2.png')}
                                            alt='图标'
                                        />
                                }
                                <Text style={STYLE.contentFont}>{item.customerName || ''}</Text>
                                <Text style={[STYLE.contentFont, { marginLeft: scaleSize(8), fontSize: scaleSize(24) }]}>{grade}</Text>
                            </View>
                            <View style={STYLE.contentPhones}>
                                {
                                    item.customerPhoneList.map((item, index) => {
                                        if (index === 0) {
                                            return (
                                                <Text style={STYLE.contentFont} key={index}>{item.customerPhone || ''}</Text>
                                            )
                                        }

                                        return (
                                            <Text style={STYLE.contentPhonesFont} key={index}>{item.customerPhone || ''}</Text>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View style={[STYLE.topRight, { marginTop: scaleSize(16), justifyContent: 'flex-start' }]}>
                            <Text style={STYLE.buildingTypeText}>{item.buildingType || ''}</Text>
                            <Text
                                style={STYLE.fontMiddle}
                                numberOfLines={1}
                                ellipsizeMode={'middle'}
                            >
                                {item.buildingFullName || ''}
                            </Text>
                        </View>
                    </View>

                    <View style={STYLE.line}></View>

                    <View style={[STYLE.top, { alignItems: 'center' }]}>
                        <View>
                            <Text style={{ fontSize: scaleSize(24), color: 'rgba(134,134,134,1)' }}>
                                报备时间：
                                <Text style={{ color: 'rgba(0,0,0,1)' }}>{reportTime}</Text>
                            </Text>
                            <Text style={{ fontSize: scaleSize(24), color: 'rgba(134,134,134,1)' }}>
                                到访时间：
                                <Text style={{ color: 'rgba(0,0,0,1)' }}>{visitTime}</Text>
                            </Text>
                        </View>

                        {
                            item.visitStatus === 1
                                ? <View style={STYLE.contentTimeWarp}>
                                    <Text style={{ fontSize: scaleSize(36), color: 'rgba(254,81,57,1)' }}>{day}</Text>
                                    <Text style={{ fontSize: scaleSize(24), color: 'rgba(134,134,134,1)' }}>保护期/天</Text>
                                </View>
                                : null
                        }
                    </View>

                    {
                        userType && userId !== item.userId
                        ? <View>
                            <View style={STYLE.line}></View>

                            <View style={[STYLE.top, { alignItems: 'center' }]}>
                                <Text
                                    style={[STYLE.fontMiddle, { width: scaleSize(420) }]}
                                    numberOfLines={1}
                                    ellipsizeMode={'middle'}
                                >
                                    {item.userTrueName || '暂无数据'}<Text> | </Text>{item.userDeptName || '暂无数据'}
                                </Text>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[STYLE.phoneWarp, STYLE.topRight]}
                                    onPress={() => {
                                        this.callPhone(item.userPhoneNumber || '')
                                    }}
                                >
                                    <Image
                                        style={STYLE.topImg}
                                        source={require('./../../../images/icons/phone2.png')}
                                        alt='图标'
                                    />
                                    <Text style={{ fontSize: scaleSize(24), color: 'rgba(75,106,197,1)' }}>拨打电话</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        : null
                    }

                </View>
            </TouchableOpacity>
        )
    };


    // 失效
    tabItemComponentThree = ({ item }) => {
        let type = 3;
        let invalidId = item.id;
        let reportYear = moment(item.reportTime).format('YYYY');
        let nowReportYear = moment().format('YYYY');
        let visitTime = moment(item.visitTime).format('YYYY-MM-DD HH:mm:ss');
        let reportTime = '';
        let grade = '';

        if (reportYear === nowReportYear) {
            reportTime = moment(item.reportTime).format('MM-DD HH:mm:ss')
        } else {
            reportTime = moment(item.reportTime).format('YYYY-MM-DD HH:mm:ss')
        }

        switch (item.grade) {
            case 1:
                grade = 'A';
                break;

            case 2:
                grade = 'B+';
                break;

            case 3:
                grade = 'B';
                break;

            case 4:
                grade = 'C';
                break;

            case 5:
                grade = 'D';
                break;

            default:
                console.log('没有default')
        }


        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={STYLE.click}
                onPress={() => {
                    this.gotoSelectInfo(type, invalidId)
                }}
            >
                <View style={STYLE.warp}>
                    <View style={STYLE.top}>
                        <Text style={STYLE.topRightFont}>
                            单号：<Text>{item.reportNumber || ''}</Text>
                        </Text>
                        <View style={STYLE.topRight}>
                            <Image
                                style={STYLE.topImg}
                                source={require('./../../../images/icons/time2.png')}
                                alt='图标'
                            />
                            <Text style={STYLE.topRightFont}>{reportTime}</Text>
                        </View>
                    </View>

                    <View style={STYLE.line}></View>

                    <View>
                        <View style={[STYLE.top, { alignItems: 'flex-start' }]}>
                            <View style={STYLE.topRight}>
                                {
                                    item.customerSex === 0
                                        ? <Image
                                            style={STYLE.topImg}
                                            source={require('./../../../images/icons/woman2.png')}
                                            alt='图标'
                                        />
                                        : <Image
                                            style={STYLE.topImg}
                                            source={require('./../../../images/icons/man2.png')}
                                            alt='图标'
                                        />
                                }
                                <Text style={STYLE.contentFont}>{item.customerName || ''}</Text>
                                <Text style={[STYLE.contentFont, { marginLeft: scaleSize(8), fontSize: scaleSize(24) }]}>{grade}</Text>
                            </View>
                            <View style={STYLE.contentPhones}>
                                {
                                    item.customerPhoneList.map((item, index) => {
                                        if (index === 0) {
                                            return (
                                                <Text style={STYLE.contentFont} key={index}>{item.customerPhone || ''}</Text>
                                            )
                                        }

                                        return (
                                            <Text style={STYLE.contentPhonesFont} key={index}>{item.customerPhone || ''}</Text>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View style={[STYLE.top, { marginTop: scaleSize(16), alignItems: 'center' }]}>
                            <View>
                                <View style={STYLE.topRight}>
                                    <Text style={STYLE.buildingTypeText}>{item.buildingType || ''}</Text>
                                    <Text
                                        style={STYLE.fontMiddle}
                                        numberOfLines={1}
                                        ellipsizeMode={'middle'}
                                    >
                                        {item.buildingFullName || ''}
                                    </Text>
                                </View>
                                <Text style={STYLE.contentTime}>
                                    到访时间：
                                    <Text style={{ color: 'rgba(0,0,0,1)' }}>{visitTime}</Text>
                                </Text>
                            </View>
                            <View style={{}}>
                                <Image
                                    style={{ width: scaleSize(140), height: scaleSize(141) }}
                                    source={require('./../../../images/icons/shixiao2.png')}
                                    alt='印章'
                                />
                            </View>
                        </View>
                    </View>

                    <View style={STYLE.line}></View>

                    <View style={[STYLE.top, { alignItems: 'center' }]}>
                        <Text
                            style={[STYLE.fontMiddle, { width: scaleSize(420) }]}
                            numberOfLines={1}
                            ellipsizeMode={'middle'}
                        >
                            {item.userTrueName || '暂无数据'}<Text> | </Text>{item.userDeptName || '暂无数据'}
                        </Text>
                        <View style={[STYLE.noPhoneWarp, STYLE.topRight]}>
                            <Image
                                style={STYLE.topImg}
                                source={require('./../../../images/icons/nophone2.png')}
                                alt='图标'
                            />
                            <Text style={{ fontSize: scaleSize(24), color: 'rgba(134,134,134,1)' }}>拨打电话</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        let { visible, qCoderContent, animating } = this.state;
        let { labelList, requestData } = this.common;
        let logoImg = require('../../../images/pictures/ic_launcher.png');
        const rightView = (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity activeOpacity={0.8} onPress={this.gotoSearchPage} style={STYLE.bigBtns}>
                    <Image style={STYLE.titleRightImg} source={require('../../../images/icons/Search2.png')}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.gotoSelectInfo(4)} style={STYLE.bigBtns}>
                    <Image style={STYLE.titleRightImg} source={require('../../../images/icons/Add2.png')}/>
                </TouchableOpacity>
            </View>
        );

        return (
            <BaseContainer title='报备管理' bodyStyle={{ padding: 0,backgroundColor: '#F8F8F8'}} scroll={false} rightView={rightView}>

                <View style={{ height: '100%'}}>
                    <XKJScrollTabView tabs={labelList} tabIdKey='type' dataRequestUrl={this.props.config.requestUrl.api + '/v2.0/api/customerreport/search'}
                        markerRequestUrl={this.props.config.requestUrl.api + '/v2.0/api/customerreport/searchtotal'}
                        requestData={requestData} tabBarBackgroundColor='white' refreshMarkers={(callback) => this.refreshMarkers = callback}
                        requestDataManual={(callback) => this.requestDataManual = callback}
                        tabItemComponent={[this.tabItemComponentOne, this.tabItemComponentTwo, this.tabItemComponentThree]}
                        tabBarUnderlineStyle={{ backgroundColor: '#1F3070', height: scaleSize(5), width: scaleSize(55) }}
                        style={{ borderWidth: 0, backgroundColor: 'rgba(248,248,248,1)' }}
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
                    onClosable={this.setVisible}>
                    <View style={STYLE.modalQRCodeWarp}>
                        <SwitchView current={animating ? 'loading' : 'default' }>
                            <SwitchViewItem type='loading'>
                                <View style={STYLE.modalQRCodeAnimating}>
                                    <ActivityIndicator animating={animating} />
                                </View>
                            </SwitchViewItem>
                            <SwitchViewItem type={'default'}>
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <View style={{ marginTop: scaleSize(77), marginBottom: scaleSize(32) }}>
                                        <QRCode value={qCoderContent} logo={logoImg} logoBorderRadius={1} color={'#191919'} backgroundColor={'#ffffff'} logoSize={38}
                                                size={160} />
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

const mapStateToProps = ({ config, user, point }) => {
    return {
        config,
        user,
        sendPoint: point.buryingPoint,
    }
}

export default connect(mapStateToProps)(Report);
