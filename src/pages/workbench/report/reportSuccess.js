import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity, Clipboard, DeviceEventEmitter, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {Toast} from '@new-space/teaset';
import * as WeChat from 'xkj-react-native-wechat';
import {copyMult} from '../../../services/report';
import {STORAGE_KEY} from '@/constants';
import {Carousel} from '@new-space/teaset';

// 工具
import {scaleSize} from '../../../utils/screenUtil';

// 组件
import BaseContainer from '../../../components/Page';
import storage from '../../../utils/storage';
import {ScrollView} from 'react-native-gesture-handler';

const {height} = Dimensions.get('window');

class ReportSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], // 报备信息
            lineHadCopy: '', //被复制行
            errors: [], // 报备失败的list
            loading: true,
        }
    }

    componentDidMount() {
        const {reportIds, errors} = this.props.navigation.state.params;
        if (reportIds.length !== 0) {
            this.initData(reportIds);
        } else {
            this.setState({
                loading: false
            })
        }
        this.setState({
            errors
        })
        this.props.sendPoint.add({target: '页面', page: '报备成功页面', action: 'view'})
    }

    initData = async (reportIds) => {
        const res = await copyMult({reportIds: reportIds});
        const {templateList = []} = res.extension
        //为什么后端是这种结构？？
        this.setState({data: templateList, loading: false})
    }

    // 复制报备信息
    copyReportInfo = (text) => {
        storage.set(STORAGE_KEY.REPORT_CLIPBOARD_DATA, text);
        Clipboard.setString(text);
        this.setState({lineHadCopy: ''})
        Toast.message('已复制到粘贴板');
        this.props.sendPoint.add({target: '复制_button', page: '报备成功页面'})
    }

    // 分享微信好友
    shareReportInfo = (text) => {
        WeChat.isWXAppInstalled().then(async (isInstalled) => {
            if (isInstalled) {
                try {
                    Clipboard.setString(text);
                    Toast.message('复制成功，即将跳转到微信');
                    setTimeout(() => {
                        WeChat.openWXApp();
                    }, 2000)
                    // let result = await WeChat.shareToSession({
                    //     type: 'text',
                    //     description: text,
                    // });

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
        this.props.sendPoint.add({target: '转发报备_button', page: '报备成功页面'})
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
                this.props.navigation.navigate('addReport', {type: 'continue'});
                DeviceEventEmitter.emit('addReport', {
                    type: 'continue',
                });
                this.props.sendPoint.add({target: '继续报备', page: '报备成功页面'})
                break;

            default:
                console.log('没有default');
        }
    }

    handleLineCopy = (key, content) => {
        Clipboard.setString(content);
        this.setState({lineHadCopy: key});
        Toast.message('已复制到粘贴板');
    };

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
                    <View style={STYLE.line}/>
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

    /**
     * @param title 题目
     * @param content:string | array  内容
     * @param needCopy:boolean 是否需要单独复制
     */
    item = ({title, content, needCopy, lineKey}) => {
        if (!content || typeof content === 'string') {
            return <View style={STYLE.detailContent}>
                <Text style={STYLE.leftText}>{title}</Text>
                {
                    needCopy ?
                        this.state.lineHadCopy === lineKey ?
                            <View style={STYLE.lineContent}>
                                <Text style={STYLE.rightText}>{content}</Text>
                                <Text style={[STYLE.lineCopyText, {color: '#868686'}]}>已复制</Text>
                            </View>
                            :
                            <View style={STYLE.lineContent}>
                                <Text style={STYLE.rightText}>{content}</Text>
                                <Text style={STYLE.lineCopyText} onPress={() => this.handleLineCopy(lineKey, content)}>复制</Text>
                            </View>
                        :
                        <Text style={STYLE.rightText}>{content}</Text>
                }
            </View>
        } else {
            return <View style={STYLE.detailContent}>
                <Text style={STYLE.leftText}>{title}</Text>
                <View style={STYLE.contentPhones}>

                    {
                        needCopy ?
                            content.map((v, i) => {
                                return <View style={[STYLE.lineContent, i !== 0 && {marginTop: scaleSize(24)}]}>
                                    <Text style={STYLE.rightText} numberOfLines={1} ellipsizeMode={'tail'}>{v}</Text>
                                    {
                                        this.state.lineHadCopy === `${lineKey}${i}` ?
                                            <Text style={[STYLE.lineCopyText, {color: '#868686'}]}>已复制</Text>
                                            :
                                            <Text style={STYLE.lineCopyText} onPress={() => this.handleLineCopy(`${lineKey}${i}`, v)}>复制</Text>
                                    }
                                </View>
                            })
                            : content.map(v => <Text style={STYLE.rightText} numberOfLines={1} ellipsizeMode={'tail'}>{v}</Text>)
                    }
                </View>
            </View>
        }
    }

    render() {
        let {data, errors, loading} = this.state;
        data = data.map(item => {
            item.type = 'success';
            return item
        })
        errors = errors.map(item => {
            item.type = 'errors';
            return item
        })
        const mapArr = data.concat(errors);
        // const mapArr = [{type: '2'}, {type: '2'}, {type: '2'}, {type: '2'}]
        const Item = this.item
        const sucImg = require('../../../images/pictures/reportSuc.png')
        const warnImg = require('../../../images/pictures/reportWarn.png')
        const errorImg = require('../../../images/pictures/reportError.png')
        return (
            <BaseContainer
                title='报备成功'
                bodyStyle={{padding: 0, flexDirection: 'column', backgroundColor: 'rgba(248,248,248,1)', flex: 1}}
                leftView={null}
                footer={this._renderBottom()}
                footerStyle={{}}
            >
                <View style={STYLE.topView}>
                    {
                        loading ?
                            null
                            :
                            <Image
                                source={data.length === 0 ? errorImg : (errors.length === 0 ? sucImg : warnImg)}
                                style={STYLE.sucImg}
                                alt='图片'
                            />
                    }
                </View>
                <View style={STYLE.sucView}>
                    <Text style={STYLE.sucText}>{loading ? '' : data.length === 0 ? '报备失败' : (errors.length === 0 ? '报备成功' : `${errors.length}条报备失败`)}</Text>
                </View>
                <Carousel startIndex={0} cycle={false} control={
                    mapArr.length === 1 ? null : <Carousel.Control
                        style={{position: 'absolute', left: 0, bottom: 0}}
                        dot={<View style={{
                            width: scaleSize(18),
                            marginHorizontal: scaleSize(4),
                            height: scaleSize(18),
                            backgroundColor: '#D8D8D8',
                            borderRadius: scaleSize(9)
                        }}/>}
                        activeDot={<View style={{
                            width: scaleSize(18),
                            marginHorizontal: scaleSize(4),
                            height: scaleSize(18),
                            backgroundColor: '#4B6AC5',
                            borderRadius: scaleSize(9)
                        }}/>}
                    />
                } style={{height: height - scaleSize(780), flex: 1, paddingBottom: scaleSize(40)}} carousel={false}>
                    {mapArr.map(item => {
                        if (item.type === 'success') {
                            return <View style={[STYLE.reportInfo]}>
                                <View style={{height: height - scaleSize(780) - scaleSize(230)}}>
                                  <ScrollView showsVerticalScrollIndicator style={STYLE.reportInfoItem}>
                                      <Text style={STYLE.generateText}>已生成报备信息</Text>
                                      <View style={STYLE.detailView}>
                                          {
                                              (item.templateValues || []).map(a => <Item title={a.name + '：'} lineKey={a.key} content={a.values || a.value} needCopy={a.isCopy}/>)
                                          }
                                      </View>
                                  </ScrollView>
                                </View>
                                <View style={STYLE.buttonView}>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={[STYLE.copyView, {marginRight: scaleSize(8)}]}
                                        onPress={() => {
                                            this.copyReportInfo(item.copyText)
                                        }}
                                    >
                                        <Image style={STYLE.wechat} source={require('@/images/icons/report_copy.png')}/>
                                        <Text style={STYLE.copyText}>复制</Text>
                                    </TouchableOpacity>
                                    <View style={STYLE.line}/>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={[STYLE.reportingView, {marginLeft: scaleSize(8)}]}
                                        onPress={() => {
                                            this.shareReportInfo(item.copyText)
                                        }}
                                    >
                                        <Image
                                            source={require('../../../images/icons/weixin_green.png')}
                                            style={STYLE.wechat}
                                            alt='图标'
                                        />
                                        <Text style={STYLE.repotrText}>转发报备</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        } else {
                            return <ScrollView style={STYLE.reportInfo}>
                                <View style={STYLE.reportInfoItem}>
                                    <Text style={STYLE.generateText}>失败原因：{item.errorMessage}</Text>
                                    <View style={STYLE.detailView}>
                                        <View style={STYLE.detailContent}>
                                            <Text style={STYLE.leftText}>报备楼盘</Text>
                                            <Text style={STYLE.rightText}>{item?.buildingTreeName}</Text>
                                        </View>
                                        <View style={STYLE.detailContent}>
                                            <Text style={STYLE.leftText}>客户姓名</Text>
                                            <Text style={STYLE.rightText}>{item?.customerName}</Text>
                                        </View>
                                        <View style={STYLE.detailContent}>
                                            <Text style={STYLE.leftText}>客户电话</Text>
                                            <View style={STYLE.phoneWrapper}>
                                                {
                                                    item?.phones?.map(v => (
                                                        <Text style={STYLE.rightText}>{v}</Text>
                                                    ))
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        }

                    })}
                </Carousel>


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

const STYLE = StyleSheet.create({
    line: {
        height: scaleSize(30),
        width: StyleSheet.hairlineWidth,
        backgroundColor: '#979797'
    },
    topView: {
        marginTop: scaleSize(55),
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sucImg: {
        width: scaleSize(380),
        height: scaleSize(279),
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
        color: '#000000',
        fontSize: scaleSize(40),
    },
    reportInfo: {
        marginHorizontal: scaleSize(62),
        marginTop: scaleSize(32),
        backgroundColor: '#fff',
        flexDirection: 'column',
        height: height - 400,
        paddingTop: scaleSize(40),
        // paddingBottom: scaleSize(130),
        width: scaleSize(623),
        borderRadius: scaleSize(8),
        borderColor: 'rgba(203,203,203,1)',
    },
    reportInfoItem: {
        paddingHorizontal: scaleSize(24),
        flex: 1
        // paddingTop: scaleSize(40),
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
        alignSelf: 'center'
    },
    detailView: {
        width: '100%',
        marginTop: scaleSize(48 - 24),
        flexDirection: 'column',
    },
    detailContent: {
        marginTop: scaleSize(24),
        flexDirection: 'row',
    },
    leftText: {
        color: '#868686',
        fontSize: scaleSize(28),
        lineHeight: scaleSize(40),
        alignSelf: 'flex-start',
        marginRight: scaleSize(16)
    },
    phoneWrapper: {
        flex: 1,
        flexDirection:'column'
    },
    rightText: {
        color: '#000000',
        fontSize: scaleSize(28),
        flex: 1,
        lineHeight: scaleSize(40),
        marginRight: scaleSize(24)
    },
    lineCopyText: {
        color: '#1F3070',
        fontSize: scaleSize(28),
        lineHeight: scaleSize(40),
    },
    lineContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonView: {
        height: scaleSize(130),
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 9,
    },
    copyView: {
        width: '48%',
        height: scaleSize(88),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    copyText: {
        color: '#4B6AC5',
        fontSize: scaleSize(28),
        marginLeft: scaleSize(15),
    },
    reportingView: {
        width: '48%',
        height: scaleSize(88),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    wechat: {
        width: scaleSize(40),
        height: scaleSize(40),
    },
    repotrText: {
        color: '#3AD047',
        fontSize: scaleSize(28),
        marginLeft: scaleSize(15),
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
    // line: {
    //     width: scaleSize(2),
    //     height: scaleSize(56),
    //     backgroundColor: '#CBCBCB',
    //     marginLeft: scaleSize(24),
    // },
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
        flexDirection: 'column',
        alignSelf: 'flex-end',
        flex: 1
    },
    contentPhonesFont: {
        fontSize: scaleSize(28),
        color: 'rgba(0,0,0,1)',
        marginTop: scaleSize(8),
    },
});
