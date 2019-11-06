import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Vibration, ActivityIndicator} from 'react-native';
import BaseContainer from '../../../components/Page'
import {scaleSize} from '../../../utils/screenUtil'
import Input from '../../../components/Form/Input'
import Button from '../../../components/Button'
import {register, refreshToken} from '../../../services/auth'
import {Toast} from 'teaset'
import {connect} from 'react-redux'
import validations from '../../../utils/validations'
import {getQrCodeInfo} from '../../../services/component'
import {checkPermission} from "../../../utils/utils";
import { getUserInfo } from '../../../utils/storage'

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            trueName: '',
            deptName: '',
            company: {},
        }
    }

    showLoading() {
        if (Register.loading) return;
        Register.loading = Toast.show({
            text: '请稍后...',
            modal: true,
            icon: <ActivityIndicator size='large'/>,
            position: 'center',
            duration: 1000000,
        })
    }

    hideLoading() {
        if (!Register.loading) return;
        Toast.hide(Register.loading);
        Register.loading = null;
    }

    setValue = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    getScanValue = async (value) => {
        let message = ''
        try {
            this.showLoading()
            let url = this.props.config.requestUrl.public
            let res = await getQrCodeInfo(url, value)
            let {extension = {}} = res
            if (extension.type !== 5) { // 5对应邀请
                // message = ''
                // return
                throw new Error('此二维码不包含经纪公司信息，请扫描正确二维码')
            }
            this.setState({
                company: JSON.parse(extension.content)
            })
            Vibration.vibrate(1500)
        } catch (e) {
            message = e.message
        } finally {
            this.hideLoading()
            if (message) {
                Toast.message(message)
            }
        }
    }

    scan = async () => {
        const res = await checkPermission('camera');
        if (res) {
            this.props.navigation.navigate('registerScan', {getInfo: this.getScanValue})
        }
    };

    register = async () => {
        let {trueName, deptName, company} = this.state
        let message = ''
        // 反序验证添加
        if (!validations.isNormalString(deptName)) {
            message = '组别仅允许数字、汉字、字母和“-”“_”'
        }
        if (!validations.isTrueName(trueName)) {
            message = '姓名只能10位以内汉字'
        }
        if (!trueName) {
            message = '请填写你的真实姓名'
        }
        if (message) {
            Toast.message(message)
            return
        }
        let {cqAuth} = this.props.config.requestUrl
        let condition = {
            trueName,
            deptName
        }
        if (company.filialeId) {
            condition.filialeId = company.filialeId
        }
        try {
            this.showLoading()
            await register(cqAuth, condition)
            let refreshCondition = {
                grant_type: 'refresh_token',
                client_id: '8595c44f4c0841b38ad85f8f2b054db0',
                client_secret: 'Secret',
                refresh_token: this.props.user.refresh_token
            }
            let refreshRes = await refreshToken(refreshCondition)
            var user = {
                access_token: refreshRes.access_token,
                refresh_token: refreshRes.refresh_token,
            }
            store.dispatch({
                type: 'user/updateUserAsync',
                payload: user
            })
            Toast.success('注册成功')
            getUserInfo().then((userInfo: any) => {
                this.props.dispatch({ // 注册成功之后要重新处理拿去用户信息数据
                    type: 'user/interfaceUpdateUserAsync',
                    payload: userInfo
                })
            })
            this.props.navigation.navigate('AppRouter')
        } catch (e) {
            Toast.message(`注册失败:${e.message}`)
        } finally {
            this.hideLoading()
        }
    }

    render() {
        const {trueName, deptName, company = {}} = this.state;
        return (
            <BaseContainer bodyStyle={styles.main} scroll={false}>
                <KeyboardAvoidingView behavior="padding" style={styles.content}>
                    <Text style={styles.title}>新用户注册信息</Text>
                    <Input viewStyle={styles.input} onChange={(e) => this.setValue('trueName', e)} value={trueName} placeholder='姓名'/>
                    <Input viewStyle={styles.input} onChange={(e) => this.setValue('deptName', e)} value={deptName} placeholder='业务组别'/>
                    <Input viewStyle={styles.input} disabled value={company.filialeName} placeholder='所属公司' textContentType='username' rightContent={
                        <TouchableOpacity onPress={this.scan}>
                            <Image source={require('../../../images/icons/scan.png')} style={styles.scan}/>
                        </TouchableOpacity>
                    }/>
                    <Button
                        style={styles.loginButton}
                        disableStyle={styles.loginButtonDisable}
                        title={'注册'}
                        onPress={this.register}
                        titleStyle={styles.titleStyle}
                    />
                </KeyboardAvoidingView>
            </BaseContainer>

        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: scaleSize(639),
    },
    loginButton: {
        width: scaleSize(638),
        marginTop: scaleSize(124)
    },
    loginButtonDisable: {
        backgroundColor: '#6a739a'
    },
    titleStyle: {
        letterSpacing: scaleSize(6),
        fontSize: scaleSize(32),
    },
    main: {
        paddingLeft: scaleSize(56),
        paddingRight: scaleSize(56),
    },
    checkedIconStyle: {
        tintColor: '#75D458'
    },
    registerProtocol: {
        marginTop: scaleSize(44),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    uncheckedIconStyle: {
        opacity: 0
    },
    checkBox: {
        width: scaleSize(30),
        borderColor: '#CBCBCB',
        backgroundColor: '#fff',
        borderWidth: 1,
        height: scaleSize(30),
        borderRadius: scaleSize(30)
    },
    scan: {
        width: scaleSize(40),
        height: scaleSize(40)
    },
    content: {
        marginTop: scaleSize(68)
    },
    title: {
        fontSize: scaleSize(48),
        color: '#000',
        lineHeight: scaleSize(67),
        fontWeight: '400',
        marginBottom: scaleSize(53)
    },
    agreeTextWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: scaleSize(22),
        paddingLeft: scaleSize(10)
    },
    agreeText: {
        // fontSize: scaleSize(24),
        // color: '#000',
        // lineHeight: scaleSize(33),
        // fontWeight: '400',
    },
    agreeProtocolText: {
        color: '#1F3070'
    }
})

const mapStateToProps = ({config, user}) => {
    return {config, user}
}
export default connect(mapStateToProps)(Register)
