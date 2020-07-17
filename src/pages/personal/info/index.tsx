import React, {FunctionComponent, useState} from 'react'
import {Text, View, StyleSheet, Switch, Image, ActivityIndicator, Vibration, Platform, Alert} from 'react-native'
import {connect} from 'react-redux'
import {scaleSize} from '../../../utils/screenUtil'
import FlexItem from '../ListItem'
import BaseContainer from '../../../components/Page';
import Modal from '../../../components/Modal'
import Input from '../../../components/Form/Input'
import ImagePicker from '../../../components/ImagePicker'
import {Toast} from '@new-space/teaset'
import {updateUserBasic, updateUser, leaveCom, bindWechatAsync, refreshToken} from '../../../services/auth'
import Button from '../../../components/Button'
import request from '../../../utils/request'
//@ts-ignore
import * as WeChat from 'xkj-react-native-wechat'
import {StackActions, NavigationActions} from 'react-navigation';
import {checkPermission} from "@/utils/utils";
import {Picker} from '@new-space/date-picker'


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

  const {user: {userInfo = {}}, config: {requestUrl = {}}, dispatch} = props
  const [visible, setVisible] = useState('')
  const [imageModal, setimageModal] = useState(false)
  const [leaveVisible, setLeaveVisible] = useState(false)
  const [value, setValue] = useState('')
  const [leaveLoading, setLeaveLoading] = useState(false)
  const [sexModal, setSexModal] = useState(false)

  const pickerImage = () => {
    setimageModal(true)
  }
  const {sex = 1, avatar, deptName, modifyNickName, address, trueName, filialeId, userName, phoneNumber, unionid, email, filiale} = userInfo
  let loading: any
  const showLoading = () => {
    if (loading) return;
    loading = Toast.show({
      text: '请稍后...',
      modal: true,
      icon: <ActivityIndicator size='large'/>,
      position: 'center',
      duration: 1000000,
    })
  }

  const hideLoading = () => {
    if (!loading) return;
    Toast.hide(loading);
    loading = null;
  }

  const setUserInfo = async (attr: string, value: any) => {
    let message: string = ''
    try {
      showLoading()
      let params, type
      if (attr === 'avatar') {
        params = {avatar: value.extension}
        // payload = { avatar: value.file.path }
        type = 'user/interfaceUpdateUserAsync'
      }
      if (attr === 'sex') {
        params = {sex: value}
        type = 'user/interfaceUpdateUserAsync'
      }
      let res = await updateUserBasic(requestUrl.cqAuth, params)
      if (res.code === '0') {
        message = '修改成功'
        props.dispatch({type})
      }
    } catch (e) {
      message = `修改头像失败：${e.message}`
    } finally {
      hideLoading()
      Toast.message(message)
    }
  }

  const bindWechat = () => {
    // Toast.message('请从进入铺侦探经纪人小程序进行绑定')
    let scope = 'snsapi_userinfo';
    let state = 'wechat_sdk_demo';
    //判断微信是否安装
    console.log('???????')
    WeChat.isWXAppInstalled()
      .then((isInstalled: any) => {
        if (isInstalled) {
          // 发送授权请求
          WeChat.sendAuthRequest(scope, state)
            .then((responseCode: any) => {
              // 返回code码，通过code获取access_token
              getAccessToken(responseCode.code);
            })
            .catch((err: any) => {
              Alert.alert('登录授权发生错误：', err.message, [
                {text: '确定'}
              ]);
            })
        } else {
          Platform.OS == 'ios' ?
            Alert.alert('没有安装微信', '请先安装微信客户端在进行登录', [
              {text: '确定',}
            ]) :
            Alert.alert('没有安装微信', '请先安装微信客户端在进行登录', [
              {text: '确定'}
            ])
        }
      })
  }
  // 获取 access_token
  const getAccessToken = async (responseCode: any) => {
    let appid = 'wxcb4a3da46de63809'
    let secretID = '25d47177ce5f0e3b815592524e95f551'
    try {
      let AccessTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=' + secretID + '&code=' + responseCode + '&grant_type=authorization_code';
      let responseData = await request.getPure(AccessTokenUrl)
      await bindWechatAsync({openId: responseData.openid, unionid: responseData.unionid})
      props.dispatch({
        type: 'user/updateUserInfo',
        payload: {
          openId: responseData.openid,
          unionid: responseData.unionid
        }
      })
      Toast.message(`绑定微信成功`)
    } catch (e) {
      Toast.message(`绑定微信失败:${e.message}`)
      throw new Error(e.message)
    }
  }

  const setEmail = async () => {
    let message: string = ''
    try {
      showLoading()
      let res = await updateUserBasic(requestUrl.cqAuth, {email: value})
      if (res.code === '0') {
        await _refreshToken();
        message = '修改成功';
        // props.dispatch({
        //   type: 'user/updateUserInfo',
        //   payload: {
        //     email: value
        //   }
        // })
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
      let res = await updateUser(requestUrl.cqAuth, {deptName, trueName, userName, [type]: value})
      if (res.code === '0') {
        message = '修改成功';
        await _refreshToken();
        // let newInfo: any = {}
        // newInfo[type] = value
        // props.dispatch({
        //   type: 'user/updateUserInfo',
        //   payload: {
        //     ...newInfo
        //   }
        // })
      }
    } catch (e) {
      message = `修改失败：${e.message}`
    } finally {
      setValue('')
      hideLoading();
      Toast.message(message)
    }
  }

  const _refreshToken = async () => {
    let refreshCondition = {
      grant_type: 'refresh_token',
      client_id: '8595c44f4c0841b38ad85f8f2b054db0',
      client_secret: 'Secret',
      refresh_token: props.user.refresh_token
    }
    let refreshRes = await refreshToken(refreshCondition)
    const user = {
      access_token: refreshRes.access_token,
      refresh_token: refreshRes.refresh_token,
    }
    await props.dispatch({
      type: 'user/updateUserAsync',
      payload: user
    });
    props.dispatch({type: 'user/interfaceUpdateUserAsync'})
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
    let url = requestUrl.cqAuth;
    setLeaveLoading(true);
    let message: string = ''
    try {
      let res = await leaveCom(url, userInfo.id);
      setLeaveLoading(false);
      setLeaveVisible(false);
      setTimeout(() => {
        Alert.alert("退出公司成功", "您的账号权限已更新，请重新登录", [
          {
            text: '确定', onPress: () => {
              props.dispatch({type: 'config/controlIsShow'}) // 设置广告已经显示过为true，就不会再展示广告了
              const resetAction = StackActions.reset({
                index: 0,
                key: 'AppRouter',
                actions: [NavigationActions.navigate({routeName: 'Main'})],
              });
              props.navigation.dispatch(resetAction)
              props.navigation.navigate('login')
              // setTimeout
            }
          }
        ])
      }, 200)
      // props.navigation.navigate('login')
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

  const scanPage = async () => {
    try {
      let res = await checkPermission('camera')
      if (res) {
        props.navigation.navigate('businessScanPage') // 使用另外一个页面。不需要在我这处理逻辑
      }
    } catch (e) {

    }
  }

  // 选择性别时调用
  const onSexChange = (item: any) => {
    setUserInfo('sex', item.code)
  }

  const realAvatar = avatar ? {uri: avatar} : (sex === 1 ? require('../../../images/pictures/personal_man.png') : require('../../../images/pictures/personal_woman.png'))

  return <BaseContainer title='个人资料'>
    <View>
      <Segmentation title='基本信息'/>
      <FlexItem title={
        <Image style={styles.avator} source={realAvatar}/>
      } contentStyle={styles.contentStyle} onPress={pickerImage} right='更换头像' rightTextStyle={styles.rightTextStyle}/>
      <FlexItem leftTextStyle={styles.leftTextStyle} title='真实姓名' disabled={!modifyNickName} hideIcon={!modifyNickName} onPress={() => setVisible('trueName')}
                right={trueName} rightTextStyle={styles.rightTextStyle}/>
      <FlexItem leftTextStyle={styles.leftTextStyle} title='性别' onPress={() => setSexModal(true)} right={sex ? '男' : '女'}
                rightTextStyle={styles.rightTextStyle}/>
      <FlexItem leftTextStyle={styles.leftTextStyle} title='用户名' right={userName} disabled hideIcon={true} rightTextStyle={styles.rightTextStyle}/>
      <FlexItem leftTextStyle={styles.leftTextStyle} title='手机号' right={phoneNumber} hideIcon={true} rightTextStyle={styles.rightTextStyle}/>
      <FlexItem onPress={bindWechat} disabled={unionid} leftTextStyle={styles.leftTextStyle} title='绑定微信' right={unionid ? '已绑定' : '未绑定'} hideIcon={unionid}/>
      <FlexItem leftTextStyle={styles.leftTextStyle} title='邮箱' onPress={() => {
        setVisible('email')
      }} rightTextStyle={styles.rightTextStyle} right={email}/>
      <Segmentation title='公司信息'/>

      {
        filialeId !== '10000' ?
          <View>
            <FlexItem leftTextStyle={styles.leftTextStyle} title='所属公司' right={filiale} hideIcon={true} rightTextStyle={styles.rightTextStyle}/>
            <FlexItem leftTextStyle={styles.leftTextStyle} onPress={() => {
              setVisible('deptName')
            }} title='公司组别' right={deptName} rightTextStyle={styles.rightTextStyle}/>
            <FlexItem leftTextStyle={styles.leftTextStyle} title='公司地址' right={address} hideIcon={true} rightTextStyle={styles.rightTextStyle}/>
          </View>
          :
          <FlexItem onPress={scanPage} leftTextStyle={styles.leftTextStyle} rightTextStyle={styles.rightTextStyle} title='所属公司' right={
            <View style={styles.scanRight}>
              <Text style={styles.scanRightText}>请扫描公司二维码加入</Text>
              <Image style={styles.scanRightImg} source={require('../../../images/icons/scan.png')}/>
            </View>
          }/>
      }
    </View>
    {
      filialeId !== '10000'
        ?
        <View style={styles.footer}>
          <Button onPress={quit} title='退出公司' style={styles.btn}/>
        </View>
        :
        null
    }
    <Modal
      visible={Boolean(visible)}
      onClose={() => {
        setVisible('');
        setValue('')
      }}
      onOk={onOk}
      type='basic'
      width={541}
      height={416}
      title={modalText[visible]}
      contentStyle={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
    >
      <Input placeholder='请输入' value={value} onChange={(e: any) => setValue(e)}
             viewStyle={{borderWidth: 1, paddingLeft: scaleSize(22), paddingRight: scaleSize(22)}}/>
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
            <ActivityIndicator/>
            :
            <Text>
              请确认
            </Text>
        }

      </View>
    </Modal>
    {/* 性别选择modal */}
    <Modal
      visible={sexModal}
      onClose={() => setSexModal(false)}
      type='select'
      data={[
        {label: '男', code: 1},
        {label: '女', code: 0},
      ]}
      onChange={onSexChange}
    />
    {/* 头像选择picker */}
    <ImagePicker cropping={Platform.OS === "ios"} width={400} height={400} addId={userInfo.id} onSuccess={(e: any) => setUserInfo('avatar', e)}
                 visible={imageModal} onClose={setimageModal}/>
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

const mapStateToProps = ({user, config}: { user: any, config: any }) => {
  return {user, config}
}
export default connect(mapStateToProps)(PersonalInfo)
