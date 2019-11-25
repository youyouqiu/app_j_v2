import React, { useEffect, FunctionComponent, useState } from 'react'
import { createSwitchNavigator, createAppContainer, NavigationScreenProps } from 'react-navigation'
import AppRouter from './AppRouter'
import AuthRouter from './AuthRouter'
import storage, { getUserInfo } from '../utils/storage'
import requestUrl, { apiTypes } from '../constants/requestUrl'
import SplashScreen from 'react-native-splash-screen'
import {Image} from 'react-native'
import GuidePage from './guidePage'
const AuthLoading: FunctionComponent<NavigationScreenProps> = props => {
  const [initFirst, setInitFirst] = useState(false);
  global.navigation = props.navigation;
  useEffect(() => {
    SplashScreen.hide()
    storage.get('initFirst').then((res: any) => {
      setTimeout(init, 2500)
    }).catch(() => {
      setTimeout(() => {
        setInitFirst(true)
      }, 2500)
    })
  }, [])

  const init = () => {
    storage.get('currentEnvironment').then((config: keyof apiTypes) => {
      if (requestUrl[config]) {
        global.store.dispatch({
          type: 'config/updateRequestUrl',
          payload: requestUrl[config]
        })
      }
      getUeserInfo()
    }).catch(e => {
      getUeserInfo()
    })
  }

  const getUeserInfo = () => {
    getUserInfo().then((userInfo: any) => {
      global.store.dispatch({ // 重新处理用户信息数据
        type: 'user/updateUserComplete',
        payload: userInfo
      })
      if (userInfo.status !== 404) {
        global.store.dispatch({ // 重新处理用户信息数据
          type: 'user/interfaceUpdateUserAsync',
          payload: userInfo
        })
        props.navigation.navigate('AppRouter')
      } else {
        props.navigation.navigate('AuthRouter')
      }
    }).catch(e => {
      props.navigation.navigate('AuthRouter')
    })
  }

  return !initFirst
    ?
    <Image source={require('../images/pictures/start.gif')} style={{width: '100%', height: '100%'}}/>
    :
    <GuidePage init={init}/>
  }

const switchNavigator = createSwitchNavigator({
  AuthLoading,
  AppRouter,
  AuthRouter,
}, { initialRouteName: 'AuthLoading' })

export default createAppContainer(switchNavigator)
