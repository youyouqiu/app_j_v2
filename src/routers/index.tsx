import React, {useEffect, FunctionComponent, useState} from 'react'
import {createAppContainer, NavigationScreenProps, createStackNavigator} from 'react-navigation'
import AppRouter from './AppRouter'
import AuthRouter from './AuthRouter'
import storage, {getUserInfo} from '../utils/storage'
import requestUrl, {apiTypes} from '../constants/requestUrl'
import SplashScreen from 'react-native-splash-screen'
import {Image} from 'react-native'
import GuidePage from './guidePage'

const AuthLoading: FunctionComponent<NavigationScreenProps> = props => {
  const [initFirst, setInitFirst] = useState(false);
  global.navigation = props.navigation;
  useEffect(() => {
    SplashScreen.hide()
    // 为了在部分热更新的时候也要显示对应值。res对应要连续自增。包括在guidePage页面也需要设置自增值
    storage.get('initFirst').then((res: any) => {
      if (res === 5) {
        setTimeout(init, 3500)
      } else {
        setTimeout(() => {
          setInitFirst(true)
        }, 3500)
      }
    }).catch(() => {
      setTimeout(() => {
        setInitFirst(true)
      }, 3500)
    })
  }, [])

  const getUeserInfo = () => {
    getUserInfo().then((userInfo: any) => {
      if (userInfo.access_token) {
        global.store.dispatch({ // 重新处理用户信息数据
          type: 'user/updateUserComplete',
          payload: userInfo
        });
        if (userInfo.status !== 404) {
          global.store.dispatch({ // 重新处理用户信息数据放在路由跳转之后。之前会卡顿。不知道是不是这个所影响
            type: 'user/interfaceUpdateUserAsync',
            payload: {...userInfo}
          })
        }
      }
      props.navigation.navigate('AppRouter')
    }).catch(e => {
      props.navigation.navigate('AppRouter')
    })
  };

  const init = () => {
    storage.get('currentEnvironment').then((config: keyof apiTypes) => {
      if (requestUrl[config]) {
        global.store.dispatch({
          type: 'config/updateRequestUrl',
          payload: requestUrl[config]
        })
        global.store.dispatch({
          type: 'config/updateCurrentEnvironment',
          payload: config
        })
      }
      getUeserInfo()
    }).catch(e => {
      getUeserInfo()
    })
  }


  return !initFirst
    ?
    <Image source={require('../images/pictures/start.gif')} style={{width: '100%', height: '100%'}}/>
    :
    <GuidePage init={init}/>
}

const switchNavigator = createStackNavigator({
  AuthLoading: {
    screen: AuthLoading
  },
  AppRouter: {
    screen: AppRouter
  },
  AuthRouter: {
    screen: AuthRouter
  },
}, {initialRouteName: 'AuthLoading', headerMode: 'none'})

export default createAppContainer(switchNavigator)
