import React from 'react'
import { View, Image } from 'react-native'
import {
  createBottomTabNavigator,
  NavigationRouteConfigMap,
  BottomTabNavigatorConfig,
  NavigationScreenConfig,
  NavigationBottomTabScreenOptions,
  NavigationScreenProp
} from 'react-navigation'
import Workbench from '../pages/workbench'
// import Project from '../pages/project'
import Message from '../pages/message'
import Personal from '../pages/personal'
import { scaleSize } from '@/utils/screenUtil';
// import {verifyUser} from '../utils/utils'
// import TestComponent from "@/components/testComponent/TestComponent";
import Main from "@/pages/main/main";
import TestComponent from "@/components/testComponent/TestComponent";

const ICON = {
  WORK: require('../images/icons/bottomTab/work.png'),
  WORK_ACTIVE: require('../images/icons/bottomTab/work_active.png'),
  PROJECT: require('../images/icons/bottomTab/project.png'),
  PROJECT_ACTIVE: require('../images/icons/bottomTab/project_active.png'),
  QUICK: require('../images/icons/quick.png'),
  MESSAGE: require('../images/icons/bottomTab/message.png'),
  MESSAGE_ACTIVE: require('../images/icons/bottomTab/message_active.png'),
  PERSONAL: require('../images/icons/bottomTab/personal.png'),
  PERSONAL_ACTIVE: require('../images/icons/bottomTab/personal_active.png'),
}

const routeConfigMap: NavigationRouteConfigMap = {
  Main: {
    screen: Main,
    // screen: TestComponent,
    navigationOptions: ({
      title: '房源',
      tabBarIcon: ({ focused }) => {
        return <Image style={{ width: 25, height: 25 }} source={focused ? ICON.PROJECT_ACTIVE : ICON.PROJECT} />
      },
    } as NavigationScreenConfig<NavigationBottomTabScreenOptions>)
  },
  Workbench: {
    screen: Workbench,
    navigationOptions: ({
      title: '工作',
      tabBarIcon: ({ focused }) => {
        return <Image style={{ width: 25, height: 25 }} source={focused ? ICON.WORK_ACTIVE : ICON.WORK} />
      },
    } as NavigationScreenConfig<NavigationBottomTabScreenOptions>)
  },
  // Project: {
  //   screen: Project,
  //   navigationOptions: ({
  //     title: '房源',
  //     tabBarIcon: ({ focused }) => {
  //       return <Image style={{ width: 25, height: 25 }} source={focused ? ICON.PROJECT_ACTIVE : ICON.PROJECT} />
  //     }
  //   } as NavigationScreenConfig<NavigationBottomTabScreenOptions>)
  // },
  Quick: {
    screen: () => { return <View></View> },
    navigationOptions: ({
      tabBarLabel: () => {
        return <View style={{ height: 62, marginBottom: 7 }}>
          <Image
              style={{ width: scaleSize(148), height: scaleSize(148), marginBottom: scaleSize(2) }}
              source={ICON.QUICK}
          />
        </View>
      },
      tabBarOnPress: async obj => {
        let { user } = global.store.getState()
        if (user.status === 404) {
          obj.navigation.navigate('login')
          return
        }
        const state = (obj.navigation.dangerouslyGetParent() as NavigationScreenProp<any>).state
        global.store.dispatch({
          type: 'config/updateQuickPage',
          payload: state.routes[state.index]
        })
      },
      tabBarOnLongPress: async obj => {
        let { user } = global.store.getState()
        if (user.status === 404) {
          obj.navigation.navigate('login')
          return
        }
        const state = (obj.navigation.dangerouslyGetParent() as NavigationScreenProp<any>).state
        global.store.dispatch({
          type: 'config/updateQuickPage',
          payload: state.routes[state.index]
        })
      },
    } as NavigationScreenConfig<NavigationBottomTabScreenOptions>)
  },
  Message: {
    screen: Message,
    // screen: TestComponent,
    // navigationOptions: ({
    //   title: '消息',
    //   tabBarIcon: ({focused}) => {
    //     return <Image style={{ width: 25, height: 25 }} source={focused ? ICON.MESSAGE_ACTIVE:ICON.MESSAGE} />
    //   },
    //   tabBarOnPress: async obj => {
    //     let {user} = global.store.getState()
    //     if (user.status === 404) {
    //       obj.navigation.navigate('login')
    //     } else {
    //       obj.defaultHandler()
    //     }
    //   }
    // } as NavigationScreenConfig<NavigationBottomTabScreenOptions>)
  },
  Personal: {
    screen: Personal,
    // screen:TestComponent,
    navigationOptions: ({
      title: '我的',
      tabBarIcon: ({ focused }) => {
        return <Image style={{ width: 25, height: 25 }} source={focused ? ICON.PERSONAL_ACTIVE : ICON.PERSONAL} />
      },
    } as NavigationScreenConfig<NavigationBottomTabScreenOptions>)
  },
}

const drawConfig: BottomTabNavigatorConfig = {
  lazy: false,
  tabBarOptions: {
    activeTintColor: '#000000',
    inactiveTintColor: '#CBCBCB',
    style: {
      height: 55,
      marginBottom: 7
    }
  },
};

export default createBottomTabNavigator(routeConfigMap, drawConfig)
