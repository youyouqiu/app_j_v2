import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity, Clipboard, DeviceEventEmitter} from 'react-native';
import {connect} from 'react-redux';
import {Toast} from 'teaset';
import * as WeChat from 'xkj-react-native-wechat';

// 工具
import {deviceWidth, scaleSize} from '../../../utils/screenUtil';

// 组件
import BaseContainer from '../../../components/Page';

const STYLE = StyleSheet.create({
    topView: {
        marginTop: scaleSize(55),
    },
    sucImg: {
        // width:scaleSize(750),
        // height:scaleSize(240),
        width: deviceWidth,
        height: deviceWidth * 246 / 750,
    },
    sucView: {
        width: scaleSize(750),
        height: scaleSize(45),
        marginTop: scaleSize(26),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sucText: {
        color: '#868686',
        fontSize: scaleSize(28),
    },
    reportInfo: {
        width: scaleSize(686),
        backgroundColor: '#FFFFFF',
        margin: scaleSize(32),
        display: 'flex',
        flexDirection: 'column',
        marginBottom: scaleSize(50),
        borderRadius: scaleSize(8),
        borderWidth: scaleSize(2),
        borderColor: 'rgba(203,203,203,1)',
    },
    textView: {
        width: scaleSize(686),
        height: scaleSize(45),
        marginTop: scaleSize(34),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    generateText: {
        color: '#000000',
        fontSize: scaleSize(32),
        fontWeight: 'bold',
    },
    detailView: {
        marginLeft: scaleSize(24),
        marginTop: scaleSize(41),
        display: 'flex',
        flexDirection: 'column',
    },
    detailContent: {
        marginBottom: scaleSize(27),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftText: {
        color: '#868686',
        fontSize: scaleSize(28),
    },
    rightText: {
        color: '#000000',
        fontSize: scaleSize(28),
        width: scaleSize(400),
        marginLeft: scaleSize(50),
    },
    buttonView: {
        height: scaleSize(100),
        width: '100%',
        marginTop: scaleSize(25),
        marginBottom: scaleSize(25),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    copyView: {
        width: scaleSize(310),
        height: scaleSize(90),
        backgroundColor: '#FFFFFF',
        borderColor: '#CBCBCB',
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scaleSize(8),
    },
    copyText: {
        color: '#000000',
        fontSize: scaleSize(28),
    },
    reportingView: {
        width: scaleSize(310),
        height: scaleSize(90),
        backgroundColor: '#3AD047',
        borderRadius: scaleSize(8),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wechat: {
        width: scaleSize(40),
        height: scaleSize(40),
    },
    repotrText: {
        color: '#FFFFFF',
        fontSize: scaleSize(28),
        marginLeft: scaleSize(24),
    },
    bottomView: {
        height: scaleSize(140),
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'row',
    },
    backImg: {
        width: scaleSize(30),
        height: scaleSize(30),
    },
    line: {
        width: scaleSize(2),
        height: scaleSize(56),
        backgroundColor: '#CBCBCB',
        marginLeft: scaleSize(24),
    },
    bottomLeft: {
        marginLeft: scaleSize(30),
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        color: '#000000',
        fontSize: scaleSize(24),
        marginLeft: scaleSize(10),
    },
    bottomRight: {
        marginLeft: scaleSize(77),
        width: scaleSize(432),
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    seeView: {
        width: scaleSize(208),
        height: scaleSize(108),
        backgroundColor: '#FFFFFF',
        borderColor: '#CBCBCB',
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scaleSize(8),
    },
    seeText: {
        color: '#000000',
        fontSize: scaleSize(32),
    },
    continueView: {
        width: scaleSize(208),
        height: scaleSize(108),
        backgroundColor: '#1F3070',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scaleSize(8),
    },
    contentPhones: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    contentPhonesFont: {
        fontSize: scaleSize(28),
        color: 'rgba(0,0,0,1)',
        marginTop: scaleSize(8),
    },
});

class ReportSuccess extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reportSuccessInfo: {}, // 报备信息
        }
    }

    componentDidMount() {
        let {navigation} = this.props;
        let reportSuccessInfo = ((navigation || {}).state || {}).params || {};

        this.setState({
            reportSuccessInfo,
        })
        this.props.sendPoint.add({target: '页面', page: '报备成功页面', action: 'view'})
    }

    // 复制报备信息
    copyReportInfo = () => {
        console.log('复制报备信息')

        let {reportSuccessInfo} = this.state;
        let copyText = '';

        if (reportSuccessInfo) {
            const userOrganizationName = reportSuccessInfo.userOrganizationName === '' ? '\n' + '公司组别：' + reportSuccessInfo.userOrganizationName : '';
            copyText = '报备楼盘：' + reportSuccessInfo.buildingTreeName + '\n' + '经纪公司：' + reportSuccessInfo.companyName + '\n' + '客户姓名：' + reportSuccessInfo.customerName + '\n' + '客户电话：' + reportSuccessInfo.customerPhones.join(',') + '\n' + '经纪人：' + reportSuccessInfo.userName + '\n' + '经纪人电话：' + reportSuccessInfo.userPhone + userOrganizationName;
        }

        Clipboard.setString(copyText);

        Toast.message('已复制到粘贴板');
        this.props.sendPoint.add({target: '复制_button', page: '报备成功页面'})
    }

    // 转发报备信息
    shareReportInfo = () => {
        console.log('转发报备信息')

        this.SharingFriends();
        this.props.sendPoint.add({target: '转发报备_button', page: '报备成功页面'})
    }

    // 分享微信好友
    SharingFriends = () => {
        let {reportSuccessInfo} = this.state;
        let copyText = '';

        if (reportSuccessInfo) {
            const userOrganizationName = reportSuccessInfo.userOrganizationName === '' ? '\n' + '公司组别：' + reportSuccessInfo.userOrganizationName : '';
            copyText = '报备楼盘：' + reportSuccessInfo.buildingTreeName + '\n' + '经纪公司：' + reportSuccessInfo.companyName + '\n' + '客户姓名：' + reportSuccessInfo.customerName + '\n' + '客户电话：' + reportSuccessInfo.customerPhones.join(',') + '\n' + '经纪人：' + reportSuccessInfo.userName + '\n' + '经纪人电话：' + reportSuccessInfo.userPhone + userOrganizationName;
        }

        WeChat.isWXAppInstalled().then(async (isInstalled) => {
            if (isInstalled) {
                try {
                    let result = await WeChat.shareToSession({
                        type: 'text',
                        description: copyText,
                    });

                    console.log('share text message to time line successful:', result);

                } catch (error) {
                    if (error instanceof WeChat.WechatError) {
                        console.error(error.stack);
                    } else {
                        throw error;
                    }
                }
            } else {
                Toast.info('没有安装微信软件，请您安装微信之后再试！');
            }
        }).catch(error => {
            Toast.message(error.message);
        })
    }

    /**
     * @param {type} 跳转 - 返回工作台-1，查看报备列表-2，返回报备表单继续报备-3
     */
        // 底部导航跳转选择
    gotoSelectInfo = (type, typeId) => {
        switch (type) {
            case 1:
                this.props.navigation.navigate('Workbench', typeId);
                this.props.sendPoint.add({target: '返回工作台_button', page: '报备成功页面'})
                break;

            case 2:
                this.props.navigation.navigate('reportList', typeId);
                DeviceEventEmitter.emit('addReport', {
                    type: 'check',
                });
                this.props.sendPoint.add({target: '查看_button', page: '报备成功页面'})
                break;

            case 3:
                this.props.navigation.navigate('addReport');
                DeviceEventEmitter.emit('addReport', {
                    type: 'continue',
                });
                this.props.sendPoint.add({target: '继续报备', page: '报备成功页面'})
                break;

            default:
                console.log('没有default');
        }
    }

    // 底部固定栏
    _renderBottom = () => {
        let {reportId} = this.state;

        return (
            <View style={STYLE.bottomView}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={STYLE.bottomLeft}
                    onPress={() => {
                        this.gotoSelectInfo(1, '')
                    }}
                >
                    <Image
                        source={require('../../../images/icons/reportBack.png')}
                        style={STYLE.backImg}
                        alt='图标'
                    />
                    <Text style={STYLE.backText}>返回工作台</Text>
                    <View style={STYLE.line}></View>
                </TouchableOpacity>
                <View style={STYLE.bottomRight}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={STYLE.seeView}
                        onPress={() => {
                            this.gotoSelectInfo(2, reportId)
                        }}
                    >
                        <Text style={STYLE.seeText}>查 看</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={STYLE.continueView}
                        onPress={() => {
                            this.gotoSelectInfo(3, '')
                        }}
                    >
                        <Text style={[STYLE.seeText, {color: '#FFFFFF'}]}>继续报备</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        let {reportSuccessInfo} = this.state;

        return (
            <BaseContainer
                title='报备成功'
                bodyStyle={{padding: 0, backgroundColor: 'rgba(248,248,248,1)'}}
                leftView={null}
                footer={this._renderBottom()}
                footerStyle={{}}
            >
                <View style={STYLE.topView}>
                    <Image
                        source={require('../../../images/pictures/reportSuc.png')}
                        style={STYLE.sucImg}
                        alt='图片'
                    />
                </View>
                <View style={STYLE.sucView}>
                    <Text style={STYLE.sucText}>报备成功！</Text>
                </View>
                <View style={[STYLE.sucView, {marginTop: scaleSize(65), flexDirection: 'row'}]}>
                    <Text style={STYLE.sucText}>你的报备于</Text>
                    <Text style={[STYLE.sucText, {color: '#000000'}]}>{reportSuccessInfo.succeedTime}</Text>
                    <Text style={STYLE.sucText}>成功提交</Text>
                </View>

                <View style={STYLE.reportInfo}>
                    <View style={STYLE.textView}>
                        <Text style={STYLE.generateText}>已生成报备信息</Text>
                    </View>
                    <View style={STYLE.detailView}>
                        <View style={STYLE.detailContent}>
                            <Text style={STYLE.leftText}>报备楼盘：</Text>
                            <Text
                                style={STYLE.rightText}
                                numberOfLines={1}
                                ellipsizeMode={'middle'}
                            >
                                {reportSuccessInfo.buildingTreeName}
                            </Text>
                        </View>
                        <View style={STYLE.detailContent}>
                            <Text style={STYLE.leftText}>经纪公司：</Text>
                            <Text
                                style={STYLE.rightText}
                                numberOfLines={1}
                                ellipsizeMode={'middle'}
                            >
                                {reportSuccessInfo.companyName}
                            </Text>
                        </View>
                        <View style={STYLE.detailContent}>
                            <Text style={STYLE.leftText}>客户姓名：</Text>
                            <Text style={STYLE.rightText}>{reportSuccessInfo.customerName}</Text>
                        </View>
                        <View style={[STYLE.detailContent, {alignItems: 'flex-start'}]}>
                            <Text style={STYLE.leftText}>客户电话：</Text>
                            <View style={[STYLE.contentPhones, {marginLeft: scaleSize(50)}]}>
                                {
                                    (reportSuccessInfo.customerPhones || []).length > 0
                                        ? reportSuccessInfo.customerPhones.map((item, index) => {
                                            if (index === 0) {
                                                return (
                                                    <Text style={[STYLE.contentPhonesFont, {marginTop: 0}]} key={index}>{item || ''}</Text>
                                                )
                                            }

                                            return (
                                                <Text style={STYLE.contentPhonesFont} key={index}>{item || ''}</Text>
                                            )
                                        })
                                        : null
                                }
                            </View>
                        </View>
                        <View style={STYLE.detailContent}>
                            <Text style={STYLE.leftText}>经纪人：</Text>
                            <Text style={[STYLE.rightText, {marginLeft: scaleSize(80)}]}>{reportSuccessInfo.userName}</Text>
                        </View>
                        <View style={STYLE.detailContent}>
                            <Text style={STYLE.leftText}>经纪人电话：</Text>
                            <Text style={[STYLE.rightText, {marginLeft: scaleSize(25)}]}>{reportSuccessInfo.userPhone}</Text>
                        </View>
                        <View style={STYLE.detailContent}>
                            <Text style={STYLE.leftText}>业务组别：</Text>
                            <Text
                                style={STYLE.rightText}
                                numberOfLines={1}
                                ellipsizeMode={'middle'}
                            >
                                {reportSuccessInfo.userOrganizationName}
                            </Text>
                        </View>
                    </View>
                    <View style={STYLE.buttonView}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[STYLE.copyView, {marginRight: scaleSize(8)}]}
                            onPress={() => {
                                this.copyReportInfo()
                            }}
                        >
                            <Text style={STYLE.copyText}>复制</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[STYLE.reportingView, {marginLeft: scaleSize(8)}]}
                            onPress={() => {
                                this.shareReportInfo()
                            }}
                        >
                            <Image
                                source={require('../../../images/icons/wechat.png')}
                                style={STYLE.wechat}
                                alt='图标'
                            />
                            <Text style={STYLE.repotrText}>转发报备</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BaseContainer>
        )
    }
}

const mapStateToProps = ({config, user, point}) => {
    return {
        config,
        user,
        sendPoint: point.buryingPoint
    }
}

export default connect(mapStateToProps)(ReportSuccess);
