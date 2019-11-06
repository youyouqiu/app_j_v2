import React, { FunctionComponent, useState } from 'react'
import { Text, View, StyleSheet, Switch, Image, ActivityIndicator, Vibration, Platform, Alert } from 'react-native'
import { connect } from 'react-redux'
import { scaleSize } from '../../../utils/screenUtil'
import FlexItem from '../ListItem'
import BaseContainer from '../../../components/Page';
import Modal from '../../../components/Modal'
import Input from '../../../components/Form/Input'
import ImagePicker from '../../../components/ImagePicker'
import { Toast } from 'teaset'
import { updateUserBasic, updateUser, leaveCom, joinCompany } from '../../../services/auth'
import Button from '../../../components/Button'
import { getQrCodeInfo } from '../../../services/component'
// import * as WeChat from 'xkj-react-native-wechat'

const Segmentation: FunctionComponent<any> = props => {
    return <View style={styles.segmentation}>
        <Text>{props.title}</Text>
    </View>
}

const PersonalInfo: FunctionComponent<any> = props => {

    const modalText: any = {
        email: '修改邮箱',
        trueName: '您仅有一次可修改真实姓名的机会',
        userName: '您仅有一次可修改用户名的机会',
        deptName: '修改公司组别'
    }

    const { user: { userInfo = {} }, config: { requestUrl = {} } } = props
    const [visible, setVisible] = useState('')
    const [imageModal, setimageModal] = useState(false)
    const [leaveVisible, setLeaveVisible] = useState(false)
    const [value, setValue] = useState('')
    const [leaveLoading, setLeaveLoading] = useState(false)
    const pickerImage = () => {
        setimageModal(true)
    }
    const { sex = 1, avatar, deptName, modifyNickName, address, trueName, filialeId, userName, phoneNumber, openId, email, filiale } = userInfo
    // console.log(filialeId)
    let loading: any
    const showLoading = () => {
        if (loading) return;
        loading = Toast.show({
            text: '请稍后...',
            modal: true,
            icon: <ActivityIndicator size='large' />,
            position: 'center',
            duration: 1000000,
        })
    }

    const hideLoading = () => {
        if (!loading) return;
        Toast.hide(loading);
        loading = null;
    }

    const onSuccess = async (file: any) => {
        console.log(file)
        let message: string = ''
        try {
            showLoading()
            let res = await updateUserBasic(requestUrl.cqAuth, { avatar: file.extension })
            if (res.code === '0') {
                message = '修改成功'
                props.dispatch({
                    type: 'user/updateUserInfo',
                    payload: {
                        avatar: file.file.path
                    }
                })
            }
        } catch (e) {
            message = `修改头像失败：${e.message}`
        } finally {
            hideLoading()
            Toast.message(message)
        }
    }

    const bindWechat = () => {
        Toast.message('请从进入铺侦探经纪人小程序进行绑定')
        // let scope = 'snsapi_userinfo';
        // let state = 'wechat_sdk_demo';
        // //判断微信是否安装
        // WeChat.isWXAppInstalled()
        //     .then((isInstalled: any) => {
        //         if (isInstalled) {
        //             //发送授权请求
        //             WeChat.sendAuthRequest(scope, state)
        //                 .then((responseCode: any) => {
        //                     //返回code码，通过code获取access_token
        //                     console.log(responseCode.code)
        //                     getAccessToken(responseCode.code);
        //                 })
        //                 .catch((err: any) => {
        //                     Alert.alert('登录授权发生错误：', err.message, [
        //                         { text: '确定' }
        //                     ]);
        //                 })
        //         } else {
        //             Platform.OS == 'ios' ?
        //                 Alert.alert('没有安装微信', '是否安装微信？', [
        //                     { text: '取消' },
        //                     { text: '确定', }
        //                 ]) :
        //                 Alert.alert('没有安装微信', '请先安装微信客户端在进行登录', [
        //                     { text: '确定' }
        //                 ])
        //         }
        //     })
    }
    // 获取 access_token
    const getAccessToken = (responseCode: any) => {
        let appid = 'wxcb4a3da46de63809'
        let secretID = '25d47177ce5f0e3b815592524e95f551'
        let AccessTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=' + secretID + '&code=' + responseCode + '&grant_type=authorization_code';
        fetch(AccessTokenUrl, {
            method: 'GET',
            // timeout: 2000,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
            .then((response: any) => response.json())
            .then((responseData: any) => {
                console.log('responseData.refresh_token=', responseData);
                getRefreshToken(responseData.refresh_token);
            })
            .catch((error: any) => {
                if (error) {
                    console.log('error=', error);
                }
            })
    }
    //  获取 refresh_token
    const getRefreshToken = (refreshtoken: any) => {
        let appid = 'wxcb4a3da46de63809'
        let getRefreshTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=' + appid + '&grant_type=refresh_token&refresh_token=' + refreshtoken;
        // console.log('getRefreshTokenUrl=',getRefreshTokenUrl);
        fetch(getRefreshTokenUrl, {
            method: 'GET',
            // timeout: 2000,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log('responseData.accesstoken=', responseData);
                getUserInfo(responseData);
            })
            .catch((error) => {
                if (error) {
                    console.log('error=', error);
                }
            })
    }
    //获取用户信息
    const getUserInfo = (responseData: any) => {
        console.log(responseData);
        var getUserInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + responseData.access_token + '&openid=' + responseData.openid;
        console.log('getUserInfoUrl=', getUserInfoUrl);
        fetch(getUserInfoUrl, {
            method: 'GET',
            // timeout: 2000,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log('getUserInfo=', responseData);
            })
            .catch((error) => {
                if (error) {
                    console.log('error=', error);
                }
            })
    }

    const setEmail = async () => {
        let message: string = ''
        try {
            showLoading()
            let res = await updateUserBasic(requestUrl.cqAuth, { email: value })
            if (res.code === '0') {
                message = '修改成功'
                props.dispatch({
                    type: 'user/updateUserInfo',
                    payload: {
                        email: value
                    }
                })
            }
        } catch (e) {
            message = `修改邮箱失败：${e.message}`
        } finally {
            hideLoading()
            setValue('')
            if (message) {
                Toast.message(message)
            }
        }
    }

    const setPersonalInfo = async (type: string) => {
        let message: string = ''
        try {
            showLoading()
            let res = await updateUser(requestUrl.cqAuth, { deptName, trueName, userName, [type]: value })
            if (res.code === '0') {
                message = '修改成功'
                let newInfo: any = {}
                newInfo[type] = value
                if (type === 'trueName') {
                    newInfo.modifyNickName = false
                }
                props.dispatch({
                    type: 'user/updateUserInfo',
                    payload: {
                        ...newInfo
                    }
                })
            }
        } catch (e) {
            message = `修改失败：${e.message}`
        } finally {
            setValue('')
            hideLoading()
            Toast.message(message)
        }
    }

    const quit = () => {
        setLeaveVisible(true)
    }

    const onOk = async () => {
        if (!value) {
            return
        }
        if (visible === 'email') {
            setEmail()
        } else {
            setPersonalInfo(visible)
        }
        setVisible('')
    }

    const leaveCompany = async () => {
        // console.log(userInfo)
        let url = requestUrl.cqAuth;
        setLeaveLoading(true)
        let message: string = ''
        try {
            let res = await leaveCom(url, userInfo.id)
            props.navigation.navigate('login')
        } catch (e) {
            message = e.message || '退出经济公司失败'
        } finally {
            setLeaveVisible(false)
            if (message) {
                Toast.message(message)
            }
            setLeaveLoading(false)
        }
    }

    const scanPage = () => {
        // console.log(userInfo)
        // return
        props.navigation.navigate('businessScanPage') // 使用另外一个页面。不需要在我这处理逻辑
        // props.navigation.navigate('businessScanPage', { getInfo })
    }

    const realAvatar = avatar ? { uri: avatar } : (sex === 1 ? require('../../../images/pictures/personal_man.png') : require('../../../images/pictures/personal_woman.png'))

    return <BaseContainer title='个人资料'>
        <View>
            <Segmentation title='基本信息' />
            <FlexItem title={
                <Image style={styles.avator} source={realAvatar} />
            } contentStyle={styles.contentStyle} onPress={pickerImage} right='更换头像' rightTextStyle={styles.rightTextStyle}/>
            <FlexItem leftTextStyle={styles.leftTextStyle} title='真实姓名' disabled={!modifyNickName} hideIcon={!modifyNickName} onPress={() => setVisible('trueName')} right={trueName} rightTextStyle={styles.rightTextStyle}/>
            <FlexItem leftTextStyle={styles.leftTextStyle} title='用户名' right={userName} disabled hideIcon={true} rightTextStyle={styles.rightTextStyle} />
            <FlexItem leftTextStyle={styles.leftTextStyle} title='手机号' right={phoneNumber} hideIcon={true} rightTextStyle={styles.rightTextStyle} />
            {/* <FlexItem onPress={bindWechat} disabled={openId} leftTextStyle={styles.leftTextStyle} title='绑定微信' right={openId ? '已绑定' : '未绑定'} hideIcon={openId} /> */}
            <FlexItem leftTextStyle={styles.leftTextStyle} title='邮箱' onPress={() => { setVisible('email') }} rightTextStyle={styles.rightTextStyle} right={email} />
            <Segmentation title='公司信息' />

            {
                filialeId !== '10000' ?
                    <View>
                        <FlexItem leftTextStyle={styles.leftTextStyle} title='所属公司' right={filiale} hideIcon={true} rightTextStyle={styles.rightTextStyle} />
                        <FlexItem leftTextStyle={styles.leftTextStyle} onPress={() => { setVisible('deptName') }} title='公司组别' right={deptName} rightTextStyle={styles.rightTextStyle} />
                        <FlexItem leftTextStyle={styles.leftTextStyle} title='公司地址' right={address} hideIcon={true} rightTextStyle={styles.rightTextStyle} />
                    </View>
                    :
                    <FlexItem onPress={scanPage} leftTextStyle={styles.leftTextStyle} rightTextStyle={styles.rightTextStyle} title='所属公司' right={
                        <View style={styles.scanRight}>
                            <Text style={styles.scanRightText}>请扫描公司二维码加入</Text>
                            <Image style={styles.scanRightImg} source={require('../../../images/icons/scan.png')} />
                        </View>
                    } />
            }
        </View>
        {
            filialeId !== '10000'
                ?
                <View style={styles.footer}>
                    <Button onPress={quit} title='退出公司' style={styles.btn} />
                </View>
                :
                null
        }
        <Modal
            visible={Boolean(visible)}
            onClose={() => {setVisible('');setValue('')}}
            onOk={onOk}
            type='basic'
            width={541}
            height={416}
            title={modalText[visible]}
            contentStyle={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
        >
            <Input placeholder='请输入' value={value} onChange={(e: any) => setValue(e)} viewStyle={{ borderWidth: scaleSize(1), paddingLeft: scaleSize(22), paddingRight: scaleSize(22) }} />
        </Modal>
        <Modal
            visible={leaveVisible}
            onClose={() => setLeaveVisible(false)}
            onOk={leaveCompany}
            type='conform'
            width={541}
            height={320}
            title='你是否已经离职？（谨慎操作）'
        >
            <View style={styles.content}>
                {
                    leaveLoading ?
                        <ActivityIndicator />
                        :
                        <Text>
                            请确认
                    </Text>
                }

            </View>
        </Modal>
        <ImagePicker addId={userInfo.id} onSuccess={onSuccess} visible={imageModal} onClose={setimageModal} />
    </BaseContainer>
}

const styles = StyleSheet.create({
    rightTextStyle: {
        color: '#000000'  // 是否需要颜色。 黑色表现没有那么好看。
    },
    scanRightText: {
        color: '#CBCBCB'
    },
    scanRightImg: {
        width: scaleSize(32),
        height: scaleSize(32),
        marginLeft: scaleSize(10)
    },
    scanRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avator: {
        width: scaleSize(104),
        height: scaleSize(104),
        borderRadius: scaleSize(52)
    },
    segmentation: {
        height: scaleSize(79),
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8'
    },
    segmentationText: {
        color: '#000',
        fontSize: scaleSize(24),
        fontWeight: '400',
        lineHeight: scaleSize(33)
    },
    leftTextStyle: {
        color: '#868686'
    },
    contentStyle: {
        height: scaleSize(152)
    },
    btn: {
        width: scaleSize(566),
        height: scaleSize(104),
        backgroundColor: '#3AD047'
    },
    footer: {
        marginTop: scaleSize(64),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = ({ user, config }: { user: any, config: any }) => {
    return { user, config }
}
export default connect(mapStateToProps)(PersonalInfo)
