import React, { FunctionComponent, useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, ImageBackground, ActivityIndicator, Dimensions, StatusBar, NativeModules, DeviceEventEmitter } from 'react-native'
import { connect } from 'react-redux'
import CameraRoll from "@react-native-community/cameraroll";
// @ts-ignore
import Shadow from '../../components/Shadow'
import { scaleSize } from '../../utils/screenUtil'
import FlexItem from './ListItem'
// @ts-ignore
import QuickEntry from '../../businessComponents/quickEntry'
import QRCode from 'react-native-qrcode-svg';
import { getQRCodeAsync, resetQRCodeAsync, getReportNum } from '../../services/auth'
import { Toast } from 'teaset'
import Modal from '../../components/Modal'
import SwitchView from '../../components/SwitchView'
// @ts-ignore
import Theme from 'teaset/themes/Theme';
// @ts-ignore
import * as WeChat from 'xkj-react-native-wechat'
import {checkPermission} from '../../utils/utils'
import ViewShot,{ captureRef } from 'react-native-view-shot'
// import {XKJImage} from '../../components/XKJImage';
const Feedback = NativeModules.Feedback;

const { height } = Dimensions.get("window")

const SwitchViewItem = SwitchView.Item

const Personal: FunctionComponent<any> = props => {


    const [reportNumber, setReportNumber] = useState(0)
    const [takeLookNumber, setTakeLookNumber] = useState(0)
    const [signNumber, setSignNumber] = useState(0)
    const [loading, setLoading] = useState(false)
    const [myCode, setCode] = useState('')
    const [visible, setVisible] = useState(false)
    const [qrCodeError, setQrCodeError] = useState('')

    const { config, user: { userInfo = {} } } = props

    let refEl: any

    const gotoPersonalInfo = () => {
        props.navigation.navigate('personalInfo')
    }

    const getUserReportData = async () => {
        console.log('getUserReportData')
        StatusBar.setBarStyle('light-content')
        DeviceEventEmitter.emit('initMessage') // 进入页面的时候调用获取消息  因为静默消息的原因临时处理
        let url = config.requestUrl.api;
        try {
            let res = await getReportNum(url)
            let { extension = {} } = res
            setReportNumber(extension.reportCount || 0)
            setTakeLookNumber(extension.visitCount || 0)
            setSignNumber(extension.subCount || 0)
        } catch (e) {
            e.message && Toast.message(e.message)
        }
    }

    useEffect(() => {
        if (props.guest) {
            return
        }
        getUserReportData()
        let focusListener = props.navigation.addListener('didFocus', getUserReportData) // 添加监听事件
        return function cleanup() {
            focusListener.remove()
        }
    }, [props.user])

    const feedback = () => {
        console.log(Feedback)
        if (!Feedback) {
            return;
        }
        let name = '';
        if (userInfo.trueName) {
            name = userInfo.trueName
        }
        Feedback.setDefaultUserContactInfo(name)
        Feedback.show(() => {
            Feedback.getFeedbackUnreadCount((ok: any, count: any) => {
                if (count != null && count !== '') {
                    // this.setState({feedbackCount: count})
                } else {
                    // this.setState({feedbackCount: 0})
                }
            })
        });
    }

    const getQRCode = async () => {
        setLoading(true)
        let url = config.requestUrl.cqAuth;
        let message: string = ''
        setVisible(true)
        try {
            let res = await getQRCodeAsync(url)
            if (res.extension) {
                setCode(res.extension)
            }
        } catch (e) {
            message = e.message
        } finally {
            if (message) {
                setQrCodeError(message)
            }
            setLoading(false)
        }
    }

    const handleResetCode = async () => {
        setLoading(true)
        let url = config.requestUrl.cqAuth;
        let message: string = ''
        try {
            let res = await resetQRCodeAsync(url)
            if (res.extension) {
                setCode(res.extension)
            }
        } catch (e) {
            message = e.message
        } finally {
            if (message) {
                setQrCodeError(message)
            }
            setLoading(false)
        }
    }

    const handleSave = async () => {
        try {
            let url = await captureRef(refEl, { format: "jpg", quality: 0.8 })
            setVisible(false)
            let res = await checkPermission('photo')
            if (!res) return
            await CameraRoll.saveToCameraRoll(url);
            Toast.message('保存成功，请在相册查看')
        } catch (e) {
            Toast.message(`保存失败：${e.message}`)
        } finally {
        }
    }

    const handleShare = async () => {
        const installed = await WeChat.isWXAppInstalled();
        if (!installed) {
            Toast.message('请您安装微信之后再试');
            setVisible(false)
            return
        }
        try {
            let fileName = '分享'
            let url = await captureRef(refEl, { format: "jpg", quality: 0.8 })
            let result = await WeChat['shareToSession']({
                type: 'imageFile',
                title: fileName, // WeChat app treat title as file name
                description: '公司二维码',
                mediaTagName: '公司二维码',
                imageUrl: "file://" + url
            })
            console.log('share word file to chat session successful', result);
        } catch (e) {
            console.log(e)
            if (e instanceof WeChat.WechatError) {
                console.error(e.stack);
            } else {
                throw e;
            }
        } finally {
            setVisible(false)
        }
    }
    let imgData = {
        styles: styles.avatar,
        uri: userInfo.avatar,
        sex: userInfo.sex,
        man: require('../../images/pictures/personal_man.png'),
        woman: require('../../images/pictures/personal_woman.png'),
    };
    const realAvatar = userInfo.avatar ? {uri: userInfo.avatar} : (userInfo.sex === 1 ? require('../../images/pictures/personal_man.png') : require('../../images/pictures/personal_woman.png'))
    
    return <>
        <ImageBackground
            source={require('../../images/pictures/personal_bg.png')}
            style={[styles.header, { height: scaleSize(322) + Theme.statusBarHeight }]}
        >
            <StatusBar
                translucent={true}
                barStyle='dark-content'
                backgroundColor='rgba(255,255,255,0)'
            />
            <TouchableOpacity onPress={gotoPersonalInfo} style={styles.headerLeft}>
                <Image style={styles.avatar} source={realAvatar} />
                {/* <XKJImage imgData={imgData} /> */}
                <View>
                    <Text style={styles.trueName}>{userInfo.trueName}</Text>
                    <Text style={styles.company} numberOfLines={1}>{userInfo.filialeShortName || userInfo.filiale || '暂无公司'} | {userInfo.deptName || '暂无组别'}</Text>
                </View>
            </TouchableOpacity>
            {
                userInfo.isResident
                    ?
                    <TouchableOpacity onPress={getQRCode}>
                        <Image style={styles.qrCode} source={require('../../images/icons/QRcode.png')} />
                    </TouchableOpacity>
                    :
                    null
            }
        </ImageBackground>
        <Shadow style={styles.shadow}>
            <View style={styles.numberItem}>
                <Text style={styles.labelText}>报备有效</Text>
                <Text style={styles.numText}>{reportNumber}</Text>
            </View>
            <View style={styles.numberItem}>
                <Text style={styles.labelText}>带看保护</Text>
                <Text style={styles.numText}>{takeLookNumber}</Text>
            </View>
            <View style={styles.numberItem}>
                <Text style={styles.labelText}>等待签约</Text>
                <Text style={styles.numText}>{signNumber}</Text>
            </View>
        </Shadow>
        <View style={styles.content}>
            <FlexItem title='奖金提现' icon={require('../../images/icons/personal_jj.png')} right='0' hideIcon />
            <FlexItem title='积分兑换' icon={require('../../images/icons/personal_jifen.png')} right='0' hideIcon />
            <FlexItem title='意见反馈' icon={require('../../images/icons/personal_QA.png')} onPress={feedback} />
            <FlexItem title='系统设置' icon={require('../../images/icons/personla_setting.png')} path='system' />
        </View>
        <Modal
            visible={visible}
            onClose={handleSave}
            onOk={handleShare}
            onRequestClose={() => setVisible(false)}
            onClosable={() => setVisible(false)}
            closable
            type='basic'
            width={541}
            height={663}
            cancelText='保存'
            confirmText='分享'
            title={userInfo.filiale}
        >
            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <SwitchView current={loading ? 'loading' : qrCodeError ? 'error' : 'defaiult'}>
                    <SwitchViewItem type='loading'>
                        <View style={styles.loading}>
                            <ActivityIndicator />
                        </View>
                    </SwitchViewItem>
                    <SwitchViewItem type='error'>
                        <View style={styles.qrCodeContent}>
                            <Text style={styles.errorText}>
                                获取二维码失败
                            </Text>
                            <Text style={styles.errorText}>
                                {qrCodeError}
                            </Text>
                        </View>
                    </SwitchViewItem>
                    <SwitchViewItem type='defaiult'>
                        <View style={styles.qrCodeContent}>
                            <QRCode
                                value={myCode}
                                ecl='H'
                                color={'#464646'}
                                logoSize={40}
                                logo={require('../../images/pictures/ic_launcher.png')}
                                size={scaleSize(300)}
                            />
                        </View>
                    </SwitchViewItem>
                </SwitchView>
                <TouchableOpacity
                    activeOpacity={0.9}
                    disabled={loading}
                    style={styles.bottom}
                    onPress={handleResetCode}
                >
                    <Image style={styles.refresh} source={require('../../images/icons/refresh.png')} />
                    <Text style={styles.resetText}>点击刷新二维码</Text>
                </TouchableOpacity>
            </View>

        </Modal>
        <QuickEntry visible={config.showQuickPage.routeName === 'Personal'} />
        <ViewShot ref={el => refEl = el} style={styles.hideImg}>
            <View style={styles.hideImgHeader}>
                <Text>{userInfo.filiale}</Text>
            </View>
            <SwitchView current={loading ? 'loading' : qrCodeError ? 'error' : myCode ? 'defaiult' : 'null'}>
                <SwitchViewItem type='loading'>
                    <View style={styles.loading}>
                        <ActivityIndicator />
                    </View>
                </SwitchViewItem>
                <SwitchViewItem type='error'>
                    <View style={styles.qrCodeContent}>
                        <Text style={styles.errorText}>
                            获取二维码失败
                        </Text>
                        <Text style={styles.errorText}>
                            {qrCodeError}
                        </Text>
                </View>
                </SwitchViewItem>
                <SwitchViewItem type='defaiult'>
                    <View style={styles.qrCodeContent}>
                        <QRCode
                            value={myCode}
                            ecl='H'
                            color={'#464646'}
                            logoSize={40}
                            logo={require('../../images/pictures/ic_launcher.png')}
                            size={scaleSize(300)}
                        />
                    </View>
                </SwitchViewItem>
                <SwitchViewItem type='null'>
                    {null}
                </SwitchViewItem>
            </SwitchView>
        </ViewShot>
    </>
}

const styles = StyleSheet.create({
    labelText: {
        color: '#CBCBCB',
        fontSize: scaleSize(24),
        paddingBottom: scaleSize(26)
    },
    numText: {
        color: '#000',
        fontSize: scaleSize(32)
    },
    hideImgHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height:scaleSize(70),
        backgroundColor:'#fff'
    },
    hideImg: {
        position: 'absolute',
        top: height,
        left: 0,
        width: '100%',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        height:scaleSize(390),
        paddingBottom: scaleSize(20)
    },
    refresh: {
        width: scaleSize(30),
        height: scaleSize(30),
        marginRight: scaleSize(16)
    },
    resetText: {
        color: '#868686',
        fontSize: scaleSize(24)
    },
    bottom: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop:scaleSize(30)
    },
    errorText: {
        color: '#868686',
        textAlign: 'center',
        marginBottom: scaleSize(12)
    },
    qrCodeContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: scaleSize(300),
        height: scaleSize(300)
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: scaleSize(300),
        height: scaleSize(300)
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32)
    },
    content: {
        marginTop: scaleSize(47)
    },
    numberItem: {
        display: 'flex',
        // height: scaleSize(104),
        flexDirection: 'column',
        // justifyContent: 'space-around',
        alignItems: 'center',
    },
    shadow: {
        width: scaleSize(702),
        height: scaleSize(170),
        marginLeft: scaleSize(24),
        marginRight: scaleSize(24),
        marginTop: scaleSize(-90),
        shadowOffset: {
            width: scaleSize(0),
            height: scaleSize(10),
        },
        borderRadius: scaleSize(8),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: scaleSize(44),
        paddingRight: scaleSize(44)
    },
    qrCode: {
        width: scaleSize(55),
        height: scaleSize(55)
    },
    avatar: {
        width: scaleSize(104),
        height: scaleSize(104),
        borderRadius: scaleSize(52),
        marginRight: scaleSize(24)
    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    trueName: {
        color: '#fff',
        fontSize: scaleSize(36),
        lineHeight: scaleSize(50),
        fontWeight: '500'
    },
    company: {
        color: 'rgba(134,148,200,1)',
        fontWeight: '400',
        fontSize: scaleSize(24),
        lineHeight: scaleSize(33),
        marginTop: scaleSize(12),
        width:scaleSize(480)
    }
})

const mapStateToProps = ({ config, user }: { config: any, user: any }) => {
    return { config, user, guest: user.status === 404 }
}
export default connect(mapStateToProps)(Personal)
