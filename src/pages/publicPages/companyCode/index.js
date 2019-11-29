import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator,Dimensions } from 'react-native'
import { scaleSize } from '../../../utils/screenUtil'
import { connect } from 'react-redux'
import Page from '../../../components/Page'
import SwitchView from '../../../components/SwitchView'
import QRCode from 'react-native-qrcode-svg'
import * as WeChat from 'xkj-react-native-wechat'
import ViewShot,{ captureRef } from 'react-native-view-shot'
import CameraRoll from '@react-native-community/cameraroll';
import { Toast } from 'teaset'
import { getQRCodeAsync, resetQRCodeAsync } from '../../../services/auth'


const {height} = Dimensions.get('window')
const SwitchViewItem = SwitchView.Item
class CompanyCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            code: '',
            qrCodeError: ''
        }
    }

    componentDidMount() {
        this.handleGetCode()
    }

    handleGetCode = async () => {
        this.setState({ loading: true })
        let url = this.props.config.requestUrl.cqAuth;
        let message = ''
        try {
            let res = await getQRCodeAsync(url)
            if (res.extension) {
                this.setState({
                    myCode: res.extension
                })
            }
        } catch (e) {
            message = e.message
        } finally {
            if (message) {
                this.setState({ qrCodeError: message })
            }
            this.setState({ loading: false })
        }
    }

    handleResetCode = async () => {
        this.setState({ loading: true })
        let url = this.props.config.requestUrl.cqAuth;
        let message = ''
        try {
            let res = await resetQRCodeAsync(url)
            if (res.extension) {
                this.setState({
                    myCode: res.extension
                })
            }
        } catch (e) {
            message = e.message
        } finally {
            if (message) {
                this.setState({ qrCodeError: message })
            }
            this.setState({ loading: false })
        }
    }

    // 保存
    handleSave = async () => {
        try {
            let url = await captureRef(this.refEl, { format: 'jpg', quality: 0.8 })
            await CameraRoll.saveToCameraRoll(url);
            Toast.message('保存成功，请在相册查看')
        } catch (e) {
            Toast.message(`保存失败：${e.message}`)
        } finally {

        }
    }
    // 分享
    handleShare = async () => {
        const installed = await WeChat.isWXAppInstalled();
        if (!installed) {
            Toast.message('请您安装微信之后再试');
            return
        }
        try {
            let fileName = '分享'
            let url = await captureRef(this.refEl, { format: 'jpg', quality: 0.8 })
            let result = await WeChat['shareToSession']({
                type: 'imageFile',
                title: fileName, // WeChat app treat title as file name
                description: '公司二维码',
                mediaTagName: '公司二维码',
                imageUrl: 'file://' + url
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

        }
    }

    render() {
        let { loading, qrCodeError, myCode } = this.state
        let userInfo = (this.props.user || {}).userInfo || {}
        return (
            <Page title='公司二维码' scroll={false}>
                <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', height:'100%',width:'100%' }}>
                    <View style={{ justifyContent: 'center', paddingBottom: scaleSize(150), alignItems: 'center',height:'100%',width:'100%' }}>

                        <View style={companyStyles.hideImgHeader}>
                            <Text style={companyStyles.headText} numberOfLines={2}>{userInfo.filiale}</Text>
                        </View>
                        <View>
                            <SwitchView current={loading ? 'loading' : qrCodeError ? 'error' : 'defaiult'}>
                                <SwitchViewItem type='loading'>
                                    <View style={companyStyles.loading}>
                                        <ActivityIndicator />
                                    </View>
                                </SwitchViewItem>
                                <SwitchViewItem type='error'>
                                    <View style={companyStyles.qrCodeContent}>
                                        <Text style={companyStyles.errorText}>
                                            获取二维码失败
                                        </Text>
                                        <Text style={companyStyles.errorText}>
                                            {qrCodeError}
                                        </Text>
                                    </View>
                                </SwitchViewItem>
                                <SwitchViewItem type='defaiult'>
                                    <View style={companyStyles.qrCodeContent}>
                                        <QRCode
                                            value={myCode}
                                            ecl='H'
                                            color={'#464646'}
                                            logoSize={40}
                                            logo={require('../../../images/pictures/ic_launcher.png')}
                                            size={scaleSize(300)}
                                        />
                                    </View>
                                </SwitchViewItem>
                            </SwitchView>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            disabled={loading}
                            style={companyStyles.bottom}
                            onPress={this.handleResetCode}
                        >
                            <Image style={companyStyles.refresh} source={require('../../../images/icons/refresh.png')} />
                            <Text style={companyStyles.resetText}>点击刷新二维码</Text>
                        </TouchableOpacity>

                        <View style={companyStyles.bottom}>
                            <TouchableOpacity
                                style={companyStyles.save}
                                activeOpacity={0.8}
                                onPress={this.handleSave}
                            >
                                <Text style={companyStyles.cancelText}>保存</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[companyStyles.save, companyStyles.share]}
                                activeOpacity={0.8}
                                onPress={this.handleShare}
                            >
                                <Text style={{ color: '#FFFFFF', fontSize: scaleSize(28) }}>分享</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <ViewShot ref={el => this.refEl = el} style={[companyStyles.hideImg]}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                        <View style={{ marginBottom: scaleSize(150), justifyContent: 'center', alignItems: 'center' }}>
                            <View style={companyStyles.hideImgHeader}>
                                <Text style={companyStyles.headText} numberOfLines={2}>{userInfo.filiale}</Text>
                            </View>
                            <SwitchView current={loading ? 'loading' : qrCodeError ? 'error' : myCode ? 'defaiult' : 'null'}>
                                <SwitchViewItem type='loading'>
                                    <View style={companyStyles.loading}>
                                        <ActivityIndicator />
                                    </View>
                                </SwitchViewItem>
                                <SwitchViewItem type='error'>
                                    <View style={companyStyles.qrCodeContent}>
                                        <Text style={companyStyles.errorText}>
                                            获取二维码失败
                                        </Text>
                                        <Text style={companyStyles.errorText}>
                                            {qrCodeError}
                                        </Text>
                                    </View>
                                </SwitchViewItem>
                                <SwitchViewItem type='defaiult'>
                                    <View style={companyStyles.qrCodeContent}>
                                        <QRCode
                                            value={myCode}
                                            ecl='H'
                                            color={'#464646'}
                                            logoSize={40}
                                            logo={require('../../../images/pictures/ic_launcher.png')}
                                            size={scaleSize(300)}
                                        />
                                    </View>
                                </SwitchViewItem>
                                <SwitchViewItem type='null'>
                                    {null}
                                </SwitchViewItem>
                            </SwitchView>
                        </View>
                    </View>
                </ViewShot>
            </Page>
        )
    }
}

const companyStyles = StyleSheet.create({
    hideImgHeader:{
        marginBottom: scaleSize(32),
        width:scaleSize(500),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    headText:{
        color:'#000',
        fontSize:scaleSize(28),
        fontWeight:'bold'
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
        marginTop: scaleSize(32)
    },
    errorText: {
        color: '#868686',
        textAlign: 'center',
        marginBottom: scaleSize(12)
    },
    qrCodeContent: {
        height:scaleSize(311),
        width:scaleSize(304)
    },
    loading: {
        height:scaleSize(311),
        width:scaleSize(304)
    },
    hideImg: {
        position: 'absolute',
        top: height,
        left: 0,
        width: '100%',
        padding: scaleSize(32)
    },
    save: {
        width: scaleSize(244),
        height: scaleSize(72),
        borderRadius: scaleSize(44),
        borderColor: '#CBCBCB',
        borderWidth: 1,
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    share: {
        backgroundColor: '#1F3070',
        marginLeft: scaleSize(20)
    }
})

const mapStateToProps = ({ config, user }) => {
    return { config, user }
}
export default connect(mapStateToProps)(CompanyCode)
