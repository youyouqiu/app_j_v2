import React, { PureComponent } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator,Platform } from 'react-native'
import { scaleSize } from '../../../utils/screenUtil'
import Button from '../../../components/Button'
import Input from '../../../components/Form/Input'
import navigation from '../../../utils/navigation'
import {login, getUserInfo, setUserExtension} from '../../../services/auth'
import {sendMessageAsync} from '../../../services/component'
import {debounce} from '../../../utils/utils'
import {Toast} from 'teaset'
import {connect} from 'react-redux'
import validations from '../../../utils/validations'
import DeviceInfo from 'react-native-device-info'

// import * as WeChat from 'xkj-react-native-wechat'


class PhoneLogin extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            verifiTime: 59,
            verfi: 'end',
            guid: null,
            sendLoading: false
        }
        this.siv = null
        // WeChat.registerApp('wxcb4a3da46de63809');
    }
    componentWillUnmount () {
        this.siv && clearInterval(this.siv)
    }

    showLoading() {
        if (PhoneLogin.loading) return;
        PhoneLogin.loading = Toast.show({
            text: '请稍后...',
            modal: true,
            icon: <ActivityIndicator size='large'/>,
            position: 'center',
            duration: 1000000,
        })
    }

    hideLoading() {
        if (!PhoneLogin.loading) return;
        Toast.hide(PhoneLogin.loading);
        PhoneLogin.loading = null;
    }

    login = async () => {
        let {phone, code, guid} = this.state
        let {auth} = this.props.config.requestUrl
        let res, succes = true
        try {
            this.showLoading()
            res = await login(auth, {
                phone,
                code,
                client_id: '8595c44f4c0841b38ad85f8f2b054db0',
                client_secret: 'Secret',
                grant_type: 'phone',
                guid
            })
            if (res.newUser) {
                this.props.dispatch({
                    type: 'user/updateUserAsync',
                    payload: {
                        status: 202,
                        access_token: res.access_token,
                        refresh_token: res.refresh_token
                    }
                })
                navigation.navigate('register')
                return
            }
            let userInfo = await getUserInfo(res.access_token)
            if (userInfo && userInfo.code === '0') {
                let {extension = {}} = userInfo
                if (extension.filialeStatus === 2) {
                    throw new Error('经济公司已被停用，请联系客服人员')
                }
                if (extension.isAdmin) {
                    throw new Error('你暂无权限登录app')
                }
                this.props.dispatch({
                    type: 'user/updateUserAsync',
                    payload: {
                        status: 200,
                        userInfo: extension,
                        access_token: res.access_token,
                        refresh_token: res.refresh_token
                    }
                })
                navigation.navigate('AppRouter')
            }
        } catch (e) {
            succes = false
            Toast.message(`登录失败：${e.message}`)
        } finally {
            this.hideLoading()
            if (succes) { // 在请求成功之后 对用户信息扩展字段的保存
                let extendeds = [
                    { 'parName': 'APP_PUSH_ID', 'parValue': this.props.user.jpushID },
                    { 'parName': 'APP_OS', 'parValue': Platform.OS },
                    { 'parName': 'APP_OS_VERSION', 'parValue': Platform.Version },
                    { 'parName': 'APP_VERSION', 'parValue': DeviceInfo.getReadableVersion() || '' }
                ]
                await setUserExtension(extendeds)
            }
        }
    }

    sendMessage = async() => {
        if (this.state.verfi === 'start') {
            return
        }
        let {phone} = this.state
        if (!phone || !validations.isPhoneNumber(phone)) {
            Toast.message('必须输入正确的手机号')
            return
        }
        try {
            await this.setState({sendLoading: true})
            let {auth} = this.props.config.requestUrl
            let condition = {
                phone,
                capchaType: 1 // 0-忘记密码  1-登录
            }
            let res = await sendMessageAsync(auth, condition)
            await this.setState({verfi: 'start', guid: res.extension.guid})
            this.count()
        } catch (e) {
            // console.log(e)
            Toast.message(e.message)
        } finally {
            await this.setState({sendLoading: false})
        }
        
    }

    setValue = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    count = () => {
        const codeTime = this.state.verifiTime;
        /*过期时间戳（毫秒） +1000 毫秒容错*/
        const overTimeStamp = Date.now() + codeTime * 1000 + 1000;
        this.siv = setInterval(() => {
            if (Date.now() >= (overTimeStamp - 1000)) {
                this.siv && clearInterval(this.siv);
                this.setState({ verfi: 'end', verifiTime: 59 })
            } else {
                const leftTime = parseInt((overTimeStamp - Date.now()) / 1000, 10);
                this.setState({ verifiTime: leftTime })
            }
        }, 1000)

        /*this.siv = setInterval(() => {
            let {verifiTime} = this.state
            this.setState({ verifiTime: (verifiTime - 1) }, () => {
                if (verifiTime <= 0) {
                    this.siv && clearInterval(this.siv);　　//倒计时( setInterval() 函数会每秒执行一次函数)，用 clearInterval() 来停止执行:
                    this.setState({ verfi: 'end', verifiTime: 60 })
                }
            })
        }, 1000)*/
    }

    render() {
        let {verfi, verifiTime, phone, code, sendLoading} = this.state
        let sendText = verfi === 'end' ? '发送验证码' : `${verifiTime}s 重新发送`
        return (
            <View style={styles.content}>
                <View style={styles.loginContent}>
                    <Input 
                        viewStyle={styles.input} 
                        onChange={(e) => this.setValue('phone', e)} 
                        value={phone} 
                        placeholder='手机号   *新手机号将自动进行注册' 
                        // style={styles.phoneInput} 
                        keyboardType='number-pad' 
                        // label='手机号' 
                    />
                    <Input 
                        viewStyle={styles.input} 
                        onChange={(e) => this.setValue('code', e)} 
                        value={code} 
                        placeholder='验证码' 
                        keyboardType='number-pad' 
                        rightContent={
                            sendLoading
                            ?
                            <ActivityIndicator color='#1F3070'/>
                            :
                            <TouchableOpacity onPress={debounce(this.sendMessage, 200)}>
                                <Text style={[styles.sendMessage]}>{sendText}</Text>
                            </TouchableOpacity>
                        } 
                    />
                    <Button
                        style={styles.loginButton}
                        disabled={!phone || !code}
                        disableStyle={styles.loginButtonDisable}
                        title={'登录'}
                        onPress={this.login}
                        titleStyle={styles.titleStyle}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: scaleSize(639)
    },
    content: {
        marginTop: scaleSize(126)
    },
    phoneInput: {
        paddingLeft: scaleSize(45)
    },
    loginContent: {
        marginLeft: scaleSize(56)
    },
    loginButton: {
        width: scaleSize(638),
        marginTop: scaleSize(90)
    },
    loginButtonDisable: {
        backgroundColor: '#6a739a'
    },
    titleStyle: {
        letterSpacing: scaleSize(6),
        fontSize: scaleSize(32)
    },
    sendMessage: {
        color: '#1F3070',
        fontSize: scaleSize(28)
    }
})

const mapStateToProps = ({config, user})=> {
    return {config, user}
}
export default connect(mapStateToProps)(PhoneLogin)