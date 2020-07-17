import React, {FunctionComponent, useState, useEffect} from 'react'
import {View, StyleSheet, Switch, Text, Modal, ImageBackground, ScrollView, Platform} from 'react-native'
import XkjModal from '../../../components/Modal'
import {connect} from 'react-redux'
import FlexItem from '../ListItem'
import Button from '../../../components/Button'
import BaseContainer from '../../../components/Page';
import {scaleSize} from '../../../utils/screenUtil';
import {getSettingInfo, setSettingInfo, getUserPermission} from '../../../services/auth'
import {Toast} from '@new-space/teaset'
import codePush from "react-native-code-push";
import {checkPermission} from '../../../utils/utils'
import storage from '../../../utils/storage'
import * as Progress from 'react-native-progress';
import DeviceInfo from 'react-native-device-info'
import UpdateModal from '../updateModal'

const ios = Platform.OS === 'ios'
import requestUrl, {apiTypes} from '../../../constants/requestUrl'
import {StackActions, NavigationActions} from 'react-navigation';


const System: FunctionComponent<any> = props => {

  const {config, navigation} = props
  const [eventPush, setEventPush] = useState(false)
  const [loading, setLoding] = useState(false)
  const [warningPush, setWarningPush] = useState(false)
  const [updateVisble, setUpdateModa] = useState(false)
  const [updateInfo, setUpdateInfo] = useState({description: '', isPending: false})
  const [switchingModal, setSwitchingModal] = useState(false)
  const [version, setVersion] = useState(DeviceInfo.getVersion())
  const [envSwitch, setEnvSwitch] = useState(false)
  const getSetting = async () => {
    let url = config.requestUrl.cqAuth;
    try {
      let res = await getSettingInfo(url)
      let {extension} = res
      setEventPush(Boolean(extension.eventPush))
      setWarningPush(Boolean(extension.warningPush))
    } catch (e) {
      Toast.message(`${e.message || "获取设置失败"}`)
    }
  }

  useEffect(() => {
    console.log(props)
    if (props.user.status === 404) {
      return
    }
    getSetting()
    initPermission()
    codePush.getUpdateMetadata(codePush.UpdateState.RUNNING).then(res => {
      if (res) {
        setVersion(`${res.appVersion} ${res.label}`)
      }
    })
  }, [])

  const initPermission = async () => { // 获取环境切换权限
    try {
      let condition = ["ENV_SWITCH"]
      let res = await getUserPermission(condition)
      let {extension} = res
      let item = extension.find((x: any) => (x.permissionItem || '').toUpperCase() === 'ENV_SWITCH');
      if (item && item.isHave) {
        setEnvSwitch(true)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onValueChange: Function = async (type: string, value: Boolean, fun: Function) => {
    try {
      if (value && ios) {
        let res = await checkPermission('notification')
        // console.log(res)
        if (!res) {
          return
        }
      }
      let url = config.requestUrl.cqAuth;
      setLoding(true)
      if (loading) {
        return
      }
      let res = await setSettingInfo(url, {[type]: value})
      fun(value)
    } catch (e) {
      Toast.message(e.message)
    } finally {
      setLoding(false)
    }
  }

  const logout = () => {
    // 清楚保存的qizuId
    const {dispatch} = props
    dispatch({
      type: 'global/saveBuildingInfo',
      payload: {
        buildingTreeId: '',
        buildingName: '',
        buildingId: ''
      }
    });
    //清除model里面的用户数据
    dispatch({
      type: 'user/cleanUserInfo'
    });
    //重置本地缓存的用户数据
    storage.set('user', {status: 404, userInfo: {}}) // 设置用户信息的初始化
    navigation.navigate('Personal')
  };

  const checkUpdate = async () => {
    try {
      let p = await codePush.checkForUpdate();
      if (!p) {
        Toast.message('已经是最新版本了！')
      } else {
        setUpdateModa(true)
        setUpdateInfo(p)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const changeEnvironment = async (e: any) => {
    let code: keyof apiTypes = e.code
    await storage.set('currentEnvironment', code)
    props.dispatch({
      type: 'config/updateRequestUrl',
      payload: requestUrl[code]
    })
    props.dispatch({
      type: 'config/updateCurrentEnvironment',
      payload: code
    })
    setTimeout(() => {
      props.navigation.navigate('login');
      //切换环境清除游客token
      storage.remove('INITDEVICETOKEN')
    }, 500)
  }

  const changePwd = () => {
    props.navigation.navigate('personalForgetPwd', {title: '修改密码'})
  }

  const gotoPage = (path = '') => {
    props.navigation.navigate(path)
  }
  return <BaseContainer title='系统设置'>
    <View>
      <FlexItem disabled title='预警信息推送' right={<Switch value={warningPush} onValueChange={(e) => onValueChange('warningPush', e, setWarningPush)}/>}
                icon={require('../../../images/icons/setting_yjxxts.png')} hideIcon/>
      <FlexItem disabled title='活动推送' desc='（如开盘提醒、活动推荐信息）'
                right={<Switch onValueChange={(e) => onValueChange('eventPush', e, setEventPush)} value={eventPush}/>}
                icon={require('../../../images/icons/setting_ts.png')} hideIcon/>
      <FlexItem title='铺侦探服务协议' icon={require('../../../images/icons/setting_zc.png')} onPress={() => gotoPage('registration')}/>
      <FlexItem title='隐私政策' icon={require('../../../images/icons/setting_yinsi.png')} onPress={() => gotoPage('privacy')}/>
      <FlexItem title='检查更新' onPress={checkUpdate} icon={require('../../../images/icons/setting_update.png')} right={`${version}`} hideIcon/>
      <FlexItem title='修改密码' icon={require('../../../images/icons/setting_pwd.png')} onPress={changePwd}/>
      {
        envSwitch
          ?
          <FlexItem title='环境切换' icon={require('../../../images/icons/setting_hjqh.png')} onPress={() => setSwitchingModal(true)}/>
          :
          null
      }
    </View>
    <View style={styles.footer}>
      <Button onPress={logout} title='退出登录' style={styles.btn}/>
    </View>
    <UpdateModal visible={updateVisble} updateInfo={updateInfo} setUpdateModa={setUpdateModa}/>
    <XkjModal
      visible={switchingModal}
      onClose={() => setSwitchingModal(false)}
      onOk={() => setSwitchingModal(false)}
      type='select'
      data={[
        {label: '本地环境', code: 'local'},
        {label: '本地测试', code: 'localTesst'},
        {label: '测试环境', code: 'test'},
        {label: '正式环境', code: 'production'},
        {label: 'canary环境', code: 'canary'},
      ]}
      onChange={changeEnvironment}
    />
  </BaseContainer>
}

const styles = StyleSheet.create({
  contentText: {
    lineHeight: 20,
    color: "#92979E"
  },
  realModalContent: {
    width: '100%',
    // height: scaleSize(500),
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: scaleSize(24),
    borderBottomLeftRadius: scaleSize(24),
    borderBottomRightRadius: scaleSize(24)
  },
  contentHeaderText: {
    color: '#1F3070',
    fontSize: scaleSize(26)
  },
  contentHeader: {
    width: '100%',
    // padding: scaleSize()
    marginBottom: scaleSize(32)
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxHeight: scaleSize(450),
    minHeight: scaleSize(300),
    paddingLeft: scaleSize(32),
    paddingRight: scaleSize(32),
    paddingTop: scaleSize(32),
    // flex: 1,
    alignItems: 'center',
  },
  modalFooter: {
    display: 'flex',
    flex: 0,
    flexDirection: 'row',
    marginTop: scaleSize(32),
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  btnStyle: {
    borderRadius: scaleSize(44),
    width: scaleSize(244),
    height: scaleSize(72)
  },
  modalBg: {
    width: scaleSize(540),
    height: scaleSize(204),
  },
  modal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#000000AA'
  },
  realModal: {
    width: scaleSize(540),
    // flex: 1,
    borderRadius: scaleSize(24),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
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

const mapStateToProps = ({config, user}: { config: any, user: any }) => {
  return {config, user}
}
export default connect(mapStateToProps)(System)
