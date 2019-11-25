import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text, ActivityIndicator, Platform} from 'react-native';
import {scaleSize} from '../../../utils/screenUtil'
import Button from '../../../components/Button'
import Input from '../../../components/Form/Input'
import {connect} from 'react-redux'
import {login, getUserInfo, setUserExtension} from '../../../services/auth'
import {Toast} from 'teaset'
import navigation from '../../../utils/navigation'
import DeviceInfo from 'react-native-device-info'

const EYE_OPEN = require('../../../images/icons/login_eye_open.png')
const EYE_CLOSE = require('../../../images/icons/login_eye_close.png')

class AccountLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPassword: true,
            password: '',
            username: '',
            // password: '123456',
            // username: 'xyy',
        }
    }

    showLoading() {
        if (AccountLogin.loading) return;
        AccountLogin.loading = Toast.show({
            text: '请稍后...',
            modal: true,
            icon: <ActivityIndicator size='large'/>,
            position: 'center',
            duration: 1000000,
        })
    }

    hideLoading() {
        if (!AccountLogin.loading) return;
        Toast.hide(AccountLogin.loading);
        AccountLogin.loading = null;
    }

    login = async () => {
        let {password, username} = this.state
        let {auth} = this.props.config.requestUrl
        let res, succes = true
        try {
            this.showLoading()
            res = await login(auth, {
                password,
                username,
                client_id: '8595c44f4c0841b38ad85f8f2b054db0',
                client_secret: 'Secret',
                grant_type: 'password',
            }) // 获取token
            console.log('res', res)
            let userInfo = await getUserInfo(res.access_token) // 获取userInfo
            if (userInfo && userInfo.code === '0') {
                let {extension = {}} = userInfo
                if (extension.filialeStatus === 2) {
                    throw new Error('经纪公司已被停用，请联系客服人员')
                }
                if (extension.isAdmin) {
                    throw new Error('你暂无权限登录app')
                }
                this.props.dispatch({
                    type: 'user/updateUserAsync',
                    payload: {
                        status: extension.filialeId && extension.filialeId !== '10000' ? 200 : 202,
                        userInfo: extension,
                        access_token: res.access_token,
                        refresh_token: res.refresh_token
                    }
                })
                navigation.navigate('AppRouter')
            }
        } catch (e) {
            succes = false
            this.hideLoading()
            Toast.message(`登录失败：${e.message}`)
        } finally {
            this.hideLoading()
            if (succes) { // 在请求成功之后 对用户信息扩展字段的保存
                let extendeds = [
                    {'parName': 'APP_PUSH_ID', 'parValue': this.props.user.jpushID},
                    {'parName': 'APP_OS', 'parValue': Platform.OS},
                    {'parName': 'APP_OS_VERSION', 'parValue': Platform.Version},
                    {'parName': 'APP_VERSION', 'parValue': DeviceInfo.getReadableVersion() || ''}
                ]
                await setUserExtension(extendeds, res.access_token)
            }
        }
    }

    setValue = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    setPasswordType = () => {
        this.setState({
            isPassword: !this.state.isPassword
        })
    }

    forgetPwd = () => {
        this.props.navigation.navigate('forgetPwd', 'hasdias')
    }

    render() {
        let {isPassword, password, username} = this.state
        return (
            <View style={styles.content}>
                <View style={styles.loginContent}>
                    <Input
                        viewStyle={styles.input}
                        onChange={(e) => this.setValue('username', e)}
                        value={username}
                        placeholder='账号'
                        textContentType='username'
                    />
                    <Input
                        viewStyle={styles.input}
                        onChange={(e) => this.setValue('password', e)}
                        value={password}
                        placeholder='密码'
                        secureTextEntry={isPassword}
                        textContentType='password'
                        rightContent={
                            <TouchableOpacity activeOpacity={0.85} onPress={this.setPasswordType}>
                                <Image source={isPassword ? EYE_CLOSE : EYE_OPEN} style={styles.eye}/>
                            </TouchableOpacity>
                        }
                    />
                    <View style={styles.forgetPwdContent}>
                        <TouchableOpacity onPress={this.forgetPwd}>
                            <Text style={styles.forgetPwd}>忘记密码</Text>
                        </TouchableOpacity>
                    </View>
                    <Button
                        style={styles.loginButton}
                        disabled={!password || !username}
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
        marginTop: scaleSize(23)
    },
    loginButtonDisable: {
        backgroundColor: '#6a739a'
    },
    titleStyle: {
        letterSpacing: scaleSize(6),
        fontSize: scaleSize(32)
    },
    eye: {
        width: scaleSize(40),
        height: scaleSize(40)
    },
    forgetPwdContent: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginTop: scaleSize(34),
        paddingRight: scaleSize(56)
    },
    forgetPwd: {
        fontSize: scaleSize(24),
        color: '#000'
    }
})

const mapStateToProps = ({config, user}) => {
    return {config, user}
}
export default connect(mapStateToProps)(AccountLogin)
