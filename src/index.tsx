import React, { PureComponent } from 'react'
import { Platform, StatusBar, NativeModules, TextInput, Text, AppState, Linking, DeviceEventEmitter } from 'react-native'
import { TopView, Alert } from '@new-space/teaset'
import NetInfo, { NetInfoChangeHandler } from '@react-native-community/netinfo'
import BuryPoint, { LogBodyData } from './utils/BuryPoint'
// @ts-ignore
import XGPush from '@new-space/react-native-xinge-push'
import Index from './routers'
import navigation, { setNavigator } from './utils/navigation'
import { NavigationContainerComponent } from 'react-navigation'
import { wxApi } from './utils/wxUtils'
import codePush from 'react-native-code-push'
import storage from '@/utils/storage'
import UpdateModal from './pages/personal/updateModal'
import { connect, MapStateToProps } from 'react-redux'
import updateApi from './services/update'
import {registerPush} from './services/auth'
import DeviceInfo from 'react-native-device-info';
import MainModal from './businessComponents/mainModal/index'
import ProtocolModal from './businessComponents/protocolModal/index'
import {protocolKey, protocoGuid} from '@/constants/index'
import BuryingPoint, { BehaviorLog } from '@/utils/BuryPoint'
// @ts-ignore
import JAnalytics from 'janalytics-react-native';

const JAnalyticsModule = NativeModules.JAnalyticsModule
import Orientation from 'react-native-orientation-locker'

// @ts-ignore
TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, { defaultProps: false })
// @ts-ignore
Text.defaultProps = Object.assign({}, Text.defaultProps, { allowFontScaling: false })
class RealRoot extends PureComponent<any, any> {

    private listener: any

    state = {
        updateVisble: false,
        updateInfo: {},
        appState: AppState.currentState,
        updateUrl:'',
        protocolVisible: false,
        protocolWillVisible: false,
        mainVisble:false
    }

    componentDidMount() {
      Orientation.lockToPortrait()
      wxApi.registerApp('wxcb4a3da46de63809')  // 微信注册
      AppState.addEventListener('change', this.handleAppStateChange)  // 添加app切换状态
      codePush.notifyAppReady()
      this.initStatusBar()  // 初始化状态栏
      this.initPush()  // 初始化push
      this.location()  // 获取位置
      // 网络变化更新信息
      NetInfo.addEventListener(this.saveNetInfo)
      this.fetchNetInfo()
      this.initStatistical() // 统计消息
      // @ts-ignore
      global.store.dispatch({ type: 'config/isFirst' })
      setTimeout(() => { // 所有的信息要等首页动画展示完毕之后再开始执行。
        this.init()  // 默认初始化中会请求一次更新
      }, 2000)
    }

    componentWillUnmount() {
        this.listener && this.listener.remove()
        XGPush.removeEventListener('register', this._onRegister);
        XGPush.removeEventListener('message', this._onMessage);  // 警告说暂时不支持，还未具体查看
        XGPush.removeEventListener('notification', this._onNotification);
    }

    componentWillReceiveProps (nextProps: any) {
      if (nextProps.location.locationCityCode !== this.props.location.locationCityCode) {
        let condition = {
          source: 'broker', 
          os: Platform.OS,
          osVersion: DeviceInfo.getSystemVersion(),
          appVersion: DeviceInfo.getVersion(),
          locationCity: nextProps.location.locationCityCode
        }
        registerPush(condition)
      }
    }

    initStatistical = () => {
        JAnalyticsModule.setup({appKey: "5db7235974fbb29c3949d178"})
        JAnalytics.crashLogON()
      }
    // 获取网络信息
    fetchNetInfo = () => {
        NetInfo.fetch()
            .then(this.saveNetInfo)
            .catch(e => console.log('Fetch Network Information Error:', e))
    }

    // 保存当前网络信息
    saveNetInfo: NetInfoChangeHandler = ({ type, details = {} }) => {
        const netInfo: LogBodyData = {
          // @ts-ignore
            network: type === 'cellular' ? details.cellularGeneration : type
        }
        BuryPoint.setLogBodyData(netInfo)
    }

    handleAppStateChange = (nextAppState: any) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            this.checkUpdate();
            // this.checkMainVersion() // 检测大版本更新
        } else if (nextAppState === 'background') {
            /* 数据埋点 */
        }
        this.setState({ appState: nextAppState });
    }

    // 大版本更新下载
    mainUpdate = () =>{
        let {updateUrl} = this.state
        if (Platform.OS === 'android') {
            NativeModules.DownloadApk.downloading(updateUrl, 'jjr2.0.apk')
        } else {
            Linking.canOpenURL(updateUrl)
                .then(supported => {
                    if (!supported) {
                    } else {
                        return Linking.openURL(updateUrl)
                    }
                })
                .catch(err => console.error('An error occurred', err))
        }
    }

    // 取消大版本更新
    closeMain = () =>{
        this.setState({mainVisble:false})
    }

    getProtocolStatus = async () => {
        let _this = this

        let res2
        try {
            res2 = await storage.get('initFirst')
        } catch (e) {
            //
        }
        try {
            let res = await storage.get(protocolKey)
            if (res !== protocoGuid) {
                _this.listener = DeviceEventEmitter.addListener('setProtocolVisible', () => {
                    if (_this.state.protocolWillVisible) {
                        _this.setState({
                            protocolVisible: true
                        })
                    }
                })
                await _this.setState({
                    protocolWillVisible: true,
                    protocolVisible: res2 == 1
                })
            }
        } catch (e) {
            _this.listener = DeviceEventEmitter.addListener('setProtocolVisible', () => {
                if (_this.state.protocolWillVisible) {
                    _this.setState({
                        protocolVisible: true
                    })
                }
            })
            await _this.setState({
                protocolWillVisible: true,
                protocolVisible: res2 == 1
            })
        }
    }

    init = async () => {
        await this.getProtocolStatus()
        this.checkUpdate()
    }

    // 检查更新
    checkUpdate = async () => {
        if (this.state.protocolWillVisible) {
            return
        }
        if (this.state.mainVisble) { // 已显示强制更新时不继续显示
            return
        }
        let containue: boolean = true
        try {
            // 检测大版本更新
            let res = await updateApi.mainVersion()
            if (res.code === '0') {
                let extension = res.extension
                let appVersion = extension.appVersion
                let myappVersion = DeviceInfo.getVersion()
                if (appVersion > myappVersion) {
                    containue = false // 检测到有大的新版本就不走热更新了
                    this.setState({
                        mainVisble: true,
                        updateUrl: extension.downLoadAddress,
                        updateVersion: appVersion
                    })
                    return
                }
            }
            // 热更新
        } catch (e) {
            console.log(e)
        } finally {
            if (containue) {
                let p = await codePush.checkForUpdate();
                if (p) {
                    if (p.isMandatory) {
                        this.setState({
                            updateVisble: true,
                            updateInfo: p
                        })
                    } else {
                        codePush.sync({ mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESUME })
                    }
                }
            }
        }
    }

    initStatusBar = () => {
        if (Platform.OS === 'android') {
            const statusBarHeight = StatusBar.currentHeight
            // @ts-ignore
            global.store.dispatch({
                type: 'config/updateStatusBarHeight',
                payload: statusBarHeight
            })
        } else {
            const { StatusBarManager } = NativeModules;
            StatusBarManager.getHeight((statusBarHeight: { height: any; }) => {
                // @ts-ignore
                global.store.dispatch({
                    type: 'config/updateStatusBarHeight',
                    payload: statusBarHeight.height
                })
            })
        }
    }

    initPush() {
        //初始化jshare
        if (Platform.OS === 'android') {
            XGPush.init(2100313822, 'AJZ9Q38N1H4U');
        } else {
            XGPush.init(2200313823, 'IV44AG64D4RA');
        }
        XGPush.setHuaweiDebug(true);
        // 小米
        XGPush.initXiaomi('2882303761517876748', '5611787687748');
        // 魅族
        //XGPush.initMeizu('appId', 'appKey');
        // 华为请到 build.gradle manifestPlaceholders 配置
        // 第三方推送开关（华为、小米、魅族）
        XGPush.enableOtherPush(true);
        // 注册
        XGPush.register()
        XGPush.addEventListener('register', this._onRegister);
        XGPush.addEventListener('message', this._onMessage);  // 警告说暂时不支持，还未具体查看
        // XGPush.addEventListener('localNotification', this._onLocalNotification);  // 警告说支持localNotification
        XGPush.addEventListener('notification', this._onNotification);
    }

    location = () => {
        // @ts-ignore
        console.log(111)
        global.store.dispatch({ type: 'location/getLocationInfo' })
    }

    async _onRegister(deviceToken: any) {
      if (deviceToken) {
        // @ts-ignore
        global.store.dispatch({
          type: 'user/updateJpushId',
          payload: deviceToken
        })
        try {
          let res = await storage.get('INITDEVICETOKEN')
          if (res) {
            return
          }
        } catch (e) {
          let condition = {
            source: 'broker', 
            os: Platform.OS,
            pushid: deviceToken,
            osVersion: DeviceInfo.getSystemVersion(),
            appVersion: DeviceInfo.getVersion(),
          }
          await registerPush(condition)
          storage.set('INITDEVICETOKEN', deviceToken)
        } finally {

        }
      }
    }

    _onLocalNotification(e: any) {
      console.log(e)
    }

    /**
     * 透传消息到达
     * @param message
     * @private
     */
    _onMessage(message: any) {
        if (typeof (message) == 'object') {
            let attach = message.custom_content;
            try {
                // let attachData = JSON.parse(attach);
                // let code = JSON.parse(attachData.attachData);
                // DeviceEventEmitter.emit('setChange', code.code);
            } catch (e) {
                console.log(e)
            }
        }
    }

    /**
     * 通知到达
     * @param notification
     * @private
     */
    _onNotification(notification: any) {
      /* 数据埋点 */
      const params: BehaviorLog = {
        page: '埋点落地页',
        target: '埋点',
        action: 'click',
        action_param: {
          info: notification,
          user: this?.props?.user,
        }
      };
      BuryingPoint.add(params)
      if (notification.clicked === true) {
          if (typeof (notification) == 'string') {
              try {
                  notification = JSON.parse(notification);
              } catch (e) {
              }
          }
          if (notification.custom_content) {
              notification = JSON.parse(notification.custom_content)
              if (Array.isArray(notification)) {
                  notification = notification[0]
              }
          }
          let attachData = notification.attachData || {}
          if (typeof (attachData) == 'string') {
              try {
                  attachData = JSON.parse(attachData);
              } catch (e) {
              }
          }
          // @ts-ignore
          global.store.dispatch({
              type: 'config/updateNoticeInfo',
              payload: attachData
          })
      } else {
      }
    }

    onRegister(deviceToken: any) {
        console.log('onRegister: ' + deviceToken)
    }

    setUpdateModa = () => {
        this.setState({ updateVisble: false })
    }

    protocolNavigation = (url: string) => {
        navigation.navigate(url, {callBack: () => {
            this.setState({protocolVisible: true})
        }})
        this.setState({
            protocolVisible: false
        })
    }

    operatingProtocol = () => {
        this.setState({
            protocolVisible: false,
            protocolWillVisible: false
        })
        storage.set(protocolKey, protocoGuid)
    }

    closeProtocol = () => {
        this.operatingProtocol()
        navigation.navigate('AppRouter')
    }

    onOk = () => {
        this.operatingProtocol()
    }

    render() {
        let { updateVisble, updateInfo,mainVisble, protocolVisible } = this.state
        return (
            // @ts-ignore
            <TopView>
                <Index ref={element => setNavigator(element as NavigationContainerComponent)} />
                <UpdateModal visible={updateVisble} updateInfo={updateInfo} setUpdateModa={this.setUpdateModa} />
                <MainModal visible={mainVisble} onClose={this.closeMain} onOk={this.mainUpdate}/>
                <ProtocolModal onOk={this.onOk} onCancel={this.closeProtocol} visible={protocolVisible} navigation={this.protocolNavigation} />
            </TopView>
        )
    }
}

interface TStateProps {
    config: any,
    user: any
}
const mapStateToProps: MapStateToProps<TStateProps, any, any> = ({ config, user, location }) => ({
    config,
    user,
    location
})
export default connect(mapStateToProps)(RealRoot)
