import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform, DeviceEventEmitter, Image, ActivityIndicator} from 'react-native';
import ScrollableTabView from '@new-space/react-native-scrollable-tab-view'
import PhoneLogin from './phoneLogin'
import AccountLogin from './accountLogin'
import {connect} from 'react-redux'
import storage from '../../utils/storage'
import requestUrl from '../../constants/requestUrl'
import styles from './styles'
import Page from "@/components/Page";
import RNAliPhoneVerification from 'react-native-ali-phone-verification'
import {Toast} from "@new-space/teaset";
import {getUserInfo, login, setUserExtension} from "@/services/auth";
import request from "@/utils/request";
import DeviceInfo from "react-native-device-info";

const logo_login = require('../../images/icons/logo_login.png');
const auto_login_icon = require('../../images/icons/auto_login.png');
const account_login_icon = require('../../images/icons/account_login.png');
const code_login_icon = require('../../images/icons/code_login.png');

const loginType = {
  code: {
    key1: 'code',
    label1: '验证码登录',
    icon1: code_login_icon,
    key2: 'account',
    label2: '账号登录',
    icon2: account_login_icon
  },
  account: {
    key1: 'account',
    label1: '账号登录',
    icon1: account_login_icon,
    key2: 'code',
    label2: '验证码登录',
    icon2: code_login_icon
  }
};

const key_android = 'kyDswHKWTPak6FgXvD9wMlR82JMf+YhyF/BVC9PVCAe84hJ25gdRzHJlUj/wlTGP5ZRQEGGK35BF6D0YFb+t+TIoceyP0HMflxLY8d7jw4f6DSPd5RYStpySX16pY6EEhckPAqgYJwJrgpg1kgBtsorzpmed7gm4CNdYysGuJKcefQcZumTeVhpdCDWkojcy6IoyouaIHai7RJGNeSiL5DP7SLkTtq2QlF1l9KPmt7yixNX4IgMC8ep9wEFzY02zehGRzCcLZmaQP6xRrGjg8xle0GOW3nbhucFCshYeHbQ=';

class Login extends Component {

  tabRef = React.createRef();
  common = {
    loading: null
  };

  constructor(props) {
    super(props);
    this.state = {
      environment: null,
      loginTypeKey: 'code'
    }
  }

  componentDidMount() {
    DeviceEventEmitter.emit('setProtocolVisible');
    this.initAutoLogin();
    this.props.dispatch({
      type: 'user/updateUserAsync',
      payload: {
        status: 404,
        userInfo: {},
        access_token: null,
        refresh_token: null
      }
    });
    storage.get('currentEnvironment').then(res => {
      this.setState({
        environment: res
      })
    })
  }

  /**一键登录初始化*/
  initAutoLogin = async () => {
    const res = await RNAliPhoneVerification.tokenInit(key_android).catch(err => {
      console.log('一键登录初始化失败', err)
    });
    if (res) {
      console.log('一键登录初始化成功，即将打开一键登录页面', res);
      const res = await RNAliPhoneVerification.getLoginToken();
      this.saveUserInfo(res);
    }
  };

  /**一键登录*/
  autoLogin = async () => {
    this.showLoading();
    const res = await RNAliPhoneVerification.getLoginToken().catch(() => {
      this.hideLoading();
      Toast.message('一键登录失败，请更换登录方式')
    });
    this.saveUserInfo(res);
  };

  /**获取用户信息*/
  saveUserInfo = async (token) => {
    if (!this.common.loading) this.showLoading();
    if (token) {
      const requestData = {
        token: token,
        client_id: '8595c44f4c0841b38ad85f8f2b054db0',
        client_secret: 'Secret',
        grant_type: 'phoneauth',
      };
      try {
        const response = await login(request.getUrl().auth, requestData);
        if (response.newUser) {
          this.props.dispatch({
            type: 'user/updateUserAsync',
            payload: {
              status: 202,
              access_token: response.access_token,
              refresh_token: response.refresh_token
            }
          })
          this.props.navigation.navigate('register')
          return
        }
        let userInfo = await getUserInfo(response.access_token);
        if (userInfo && userInfo.code === '0') {
          let {extension = {}} = userInfo;
          if (extension.filialeStatus === 2) {
            Toast.message('经纪公司已被停用，请联系客服人员');
            return
          }
          if (extension.isAdmin) {
            Toast.message('你暂无权限登录app');
            return
          }
          this.props.dispatch({
            type: 'user/updateUserAsync',
            payload: {
              status: extension.filialeId && extension.filialeId !== '10000' ? 200 : 202,
              userInfo: extension,
              access_token: response.access_token,
              refresh_token: response.refresh_token
            }
          });
          let excessData = [
            {'parName': 'APP_PUSH_ID', 'parValue': this.props.user.jpushID},
            {'parName': 'APP_OS', 'parValue': Platform.OS},
            {'parName': 'APP_OS_VERSION', 'parValue': Platform.Version},
            {'parName': 'APP_VERSION', 'parValue': DeviceInfo.getReadableVersion() || ''}
          ];
          await setUserExtension(excessData, response.access_token);
          this.props.navigation.navigate('Main')
        }
      } catch (e) {
        Toast.message('登录失败')
      } finally {
        this.hideLoading();
      }
    } else {
      this.hideLoading();
    }
  };

  gotoPage = (path) => {
    this.props.navigation.navigate(path)
  };

  goBack = () => {
    this.props.navigation.goBack(null)
  };

  /**验证码，账号登录切换*/
  login = (key) => {
    this.setState({
      loginTypeKey: key
    }, () => {
      this.tabRef.goToPage(key === 'code' ? 0 : 1);
    });
  };

  showLoading() {
    if (AccountLogin.loading) return;
    this.common.loading = Toast.show({
      text: '请稍后...',
      modal: true,
      icon: <ActivityIndicator size='large'/>,
      position: 'center',
      duration: 1000000,
    })
  }

  hideLoading() {
    if (!this.common.loading) return;
    Toast.hide(this.common.loading);
    this.common.loading = null;
  }

  render() {
    let {environment, loginTypeKey} = this.state;
    const {label1, key2, label2, icon2} = loginType[loginTypeKey];
    return (
      <Page title='' scroll={false} backButtonPress={this.goBack}>
        <View style={[styles.content]}>

          {/**Header*/}
          <View style={styles.header_wrapper}>
            <View style={[styles.header]}>
              <Image source={logo_login} style={styles.header_logo}/>
              <Text style={[styles.hello]}>{label1}</Text>
            </View>
            <View style={styles.registerProtocol}>
              <Text style={styles.agreeTextWrap}>
                <Text style={styles.agreeText}>登录即代表同意《</Text>
                <Text onPress={() => this.gotoPage('registrationLogin')} style={styles.agreeProtocolText}>铺侦探服务协议</Text>
                <Text style={styles.agreeText}>》及《</Text>
                <Text onPress={() => this.gotoPage('privacyLogin')} style={styles.agreeProtocolText}>隐私政策</Text>
                <Text style={styles.agreeText}>》</Text>
              </Text>
            </View>
          </View>

          {/**登录界面*/}
          <View style={styles.tab_wrapper}>
            <ScrollableTabView locked={false} ref={e => this.tabRef = e} initialPage={0} tabBarStyle={styles.tabBarStyle}>
              <PhoneLogin data-value={{name: '手机号登录'}} navigation={this.props.navigation}/>
              <AccountLogin data-value={{name: '账号登录'}} navigation={this.props.navigation}/>
            </ScrollableTabView>
          </View>

          {/**其他登录方式*/}
          <View style={styles.footer_wrapper}>
            <View style={styles.footer_header}>
              <View style={styles.footer_line}/>
              <Text style={styles.footer_text}>其他登录方式</Text>
              <View style={styles.footer_line}/>
            </View>
            <View style={styles.footer_content}>
              <View style={styles.footer_content_item}>
                <TouchableOpacity style={styles.footer_content_touch} onPress={this.autoLogin}>
                  <View style={styles.footer_login_logo_wrapper}>
                    <Image source={auto_login_icon} style={styles.footer_login_logo}/>
                  </View>
                  <Text style={styles.footer_login_text}>一键登录</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.footer_content_item}>
                <TouchableOpacity style={styles.footer_content_touch} onPress={() => this.login(key2)}>
                  <View style={styles.footer_login_logo_wrapper}>
                    <Image source={icon2} style={styles.footer_login_logo}/>
                  </View>
                  <Text style={styles.footer_login_text}>{label2}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text style={[styles.touristText]}>{(requestUrl[environment] || {}).label || ''}</Text>

        </View>
      </Page>
    )
  }
}

const mapStateToProps = ({config, user}) => {
  return {config, user}
}
export default connect(mapStateToProps)(Login)
