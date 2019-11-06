import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import BaseContainer from '../../../components/Page'
import { scaleSize } from '../../../utils/screenUtil'
import Input from '../../../components/Form/Input'
import Button from '../../../components/Button'
import {sendMessageAsync, verifyCodeAsync} from '../../../services/component'
import {phoneModifyPwd} from '../../../services/auth'
import {Toast} from 'teaset'
import {connect} from 'react-redux'
import validations from '../../../utils/validations'
class ForgetPwd extends Component {

    constructor(props) {
        super(props)
        this.state = {
            step: 'verifyPhone',
            phone: '',
            code: '',
            verifiTime: 59,
            verfi: 'end',
            password: '',
            guid: '',
            sendLoading: false,
            confirmPwd: ''
        }
    }

    setValue = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    showLoading() {
        if (ForgetPwd.loading) return;
        ForgetPwd.loading = Toast.show({
            text: '请稍后...',
            modal: true,
            icon: <ActivityIndicator size='large'/>,
            position: 'center',
            duration: 1000000,
        })
    }

    hideLoading() {
        if (!ForgetPwd.loading) return;
        Toast.hide(ForgetPwd.loading);
        ForgetPwd.loading = null;
    }

    verifiCode = async () => {
        let {auth} = this.props.config.requestUrl
        let {code, phone, guid} = this.state
        let message: string = ''
        try {
            this.showLoading()
            let condition = {
                code,
                phone,
                guid,
                capchaType: 0 // 0-忘记密码  1-登录
            }
            await verifyCodeAsync(auth, condition)
            this.setState({
                step: 'setNewPwd'
            })
        } catch (e) {
            message = e.message
        } finally {
            this.hideLoading()
            if (message) {
                Toast.message(message)
            }
        }
        
    }

    submitPwd = async () => {
        let {auth} = this.props.config.requestUrl
        let {code, phone, guid, password, confirmPwd} = this.state
        let errorMessage
        if (confirmPwd !== password) {
            errorMessage = '两次密码不一致'
        }
        if (!validations.password(confirmPwd) || !validations.password(password)) {
            errorMessage = '密码为8~16位的数字/字母组成'
        }
        if (errorMessage) {
            Toast.message(errorMessage)
            return
        }
        let message: string = ''
        try {
            this.showLoading()
            let condition = {
                code,
                phone,
                guid,
                password
            }
            await phoneModifyPwd(auth, condition)
            Toast.success('密码修改成功')
            this.props.navigation.navigate('login')
        } catch (e) {
            message = e.message
        } finally {
            this.hideLoading()
            if (message) {
                Toast.message(message)
            }
        }
        
    }

    nextStep = async () => {
        let {step} = this.state
        if (step === 'verifyPhone') {
            this.verifiCode() // 验证验证码是否正确
            return
        }
        this.submitPwd() // 提交修改密码
    }

    count = () => {
        this.siv = setInterval(() => {
            let {verifiTime} = this.state
            this.setState({ verifiTime: (verifiTime - 1) }, () => {
                if (verifiTime <= 0) {
                    clearInterval(this.siv);　　//倒计时( setInterval() 函数会每秒执行一次函数)，用 clearInterval() 来停止执行:
                    this.setState({ verfi: 'end', verifiTime: 60 })
                }
            }) 
        }, 1000)
    }

    componentWillUnmount () {
        this.siv && clearInterval(this.siv)
    }

    sendMessage = async () => {
        let {phone, verfi} = this.state
        if (verfi === 'start') {
            return
        }
        if (!phone || !validations.isPhoneNumber(phone)) {
            Toast.message('必须输入正确的手机号')
            return
        }
        let message: string = ''
        try {
            await this.setState({sendLoading: true})
            this.showLoading()
            let {auth} = this.props.config.requestUrl
            let condition = {
                phone,
                capchaType: 0
            }
            let res = await sendMessageAsync(auth, condition)
            console.log(res, condition)
            await this.setState({verfi: 'start', guid: res.extension.guid})
            this.count()
        } catch (e) {
            console.log(e)
            message = e.message
        } finally {
            await this.setState({sendLoading: false})
            this.hideLoading()
            if (message) {
                Toast.message(message)
            }
        }
    }

    render() {
        const { step, code, phone, confirmPwd, password, verfi, verifiTime, sendLoading } = this.state
        let sendText = verfi === 'end' ? '发送验证码' : `${verifiTime}s 重新发送`
        let {navigation = {}} = this.props

        return (
            <BaseContainer bodyStyle={styles.main} title={navigation.state.params.title || '找回密码'}>
                <View style={styles.header}>
                    <View style={styles.headerItem}>
                        <ImageBackground style={styles.setPwdImage1} source={require('../../../images/icons/login_rectangle2.png')}>
                            <Text style={[styles.phoneText]}>1.验证手机号</Text>
                        </ImageBackground>
                        <Image style={styles.headerIcon} source={require('../../../images/icons/login_phone.png')} />
                    </View>
                    <View style={styles.headerItem}>
                        {
                            step === 'verifyPhone'
                                ?
                                <View style={styles.verifySet}>
                                    <Text style={[styles.phoneText, styles.setPwd]}>2.设置新密码</Text>
                                </View>
                                :
                                <ImageBackground style={styles.setPwdImage} source={require('../../../images/icons/login_rectangle.png')}>
                                    <Text style={[styles.phoneText]}>2.设置新密码</Text>
                                </ImageBackground>
                        }
                        <Image style={styles.headerIcon} source={require('../../../images/icons/login_lock.png')} />
                    </View>
                </View>
                {
                    step === 'verifyPhone'
                        ?
                        <View>
                            <Input viewStyle={styles.input} onChange={(e) => this.setValue('phone', e)} value={phone} placeholder='输入手机号码' style={styles.phoneInput} keyboardType='number-pad' />
                            <Input viewStyle={styles.input} onChange={(e) => this.setValue('code', e)} value={code} placeholder='输入短信验证码' keyboardType='number-pad' rightContent={
                                sendLoading
                                ?
                                <ActivityIndicator />
                                :
                                <TouchableOpacity onPress={this.sendMessage}>
                                    <Text style={[styles.sendMessage]}>{sendText}</Text>
                                </TouchableOpacity>
                            } />
                        </View>
                        :
                        <View>
                            <Input viewStyle={styles.input} textContentType='password' onChange={(e) => this.setValue('password', e)} value={password} placeholder='请设置8-16位新的登录密码' style={styles.phoneInput} />
                            <Input viewStyle={styles.input} textContentType='password' onChange={(e) => this.setValue('confirmPwd', e)} value={confirmPwd} placeholder='请再次输入新的登录密码'/>
                        </View>
                }
                
                <Button
                    style={styles.loginButton}
                    disabled={!phone || !code}
                    disableStyle={styles.loginButtonDisable}
                    title={step === 'verifyPhone' ? '下一步' : '提交'}
                    onPress={this.nextStep}
                    titleStyle={styles.titleStyle}
                />
            </BaseContainer>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: scaleSize(639)
    },
    sendMessage: {
        color: '#1F3070',
        fontSize: scaleSize(28)
    },
    loginButton: {
        width: scaleSize(638),
        marginTop: scaleSize(94)
    },
    loginButtonDisable: {
        backgroundColor: '#6a739a'
    },
    main: {
        paddingLeft: scaleSize(56),
        paddingRight: scaleSize(56),
        backgroundColor: '#fff'
    },
    triangleViewStyle: {
        width: 0,
        height: 0,
        borderTopWidth: scaleSize(32),
        borderTopColor: 'transparent',
        borderRightWidth: scaleSize(16),
        borderRightColor: 'transparent',
        borderLeftWidth: scaleSize(32),
        borderLeftColor: '#3AD047',
        borderBottomWidth: scaleSize(32),
        borderBottomColor: 'transparent',
    },
    setPwd: {
        color: '#868686'
    },
    verifySet: {
        width: scaleSize(280),
        height: scaleSize(66),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    fullViewStyle: {
        width: scaleSize(314),
        height: scaleSize(66),
        backgroundColor: '#3AD047',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        marginTop: scaleSize(92),
        display: 'flex',
        flexDirection: 'row',
        marginBottom: scaleSize(101)
    },
    phoneText: {
        fontSize: scaleSize(32),
        color: '#fff',
        fontWeight: '400',
        lineHeight: scaleSize(45),
        marginLeft: scaleSize(32)
    },
    headerItem: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: scaleSize(168),
        // backgroundColor: 'red'
    },
    headerLeftTop: {
        display: 'flex',
        flexDirection: 'row'
    },
    headerIcon: {
        width: scaleSize(50),
        height: scaleSize(50)
    },
    setPwdImage: {
        width: scaleSize(312),
        height: scaleSize(66),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scaleSize(-26)
    },
    setPwdImage1: {
        width: scaleSize(351),
        height: scaleSize(66),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const mapStateToProps = ({config, user})=> {
    return {config, user}
}
export default connect(mapStateToProps)(ForgetPwd)

