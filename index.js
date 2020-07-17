import React from 'react'
import { AppRegistry, Alert } from 'react-native'
import { Initializer } from 'react-native-baidumap-sdk'
import { name as appName } from './app.json'
import { Toast } from '@new-space/teaset'
import Index from './src/index'
import dva from './src/utils/dva'
import userModel from './src/models/user'
import configModel from './src/models/config'
import globalModel from './src/models/global'
import searchModel from './src/models/search'
import dicModel from './src/models/dic';
import locationModel from './src/models/location'
import weatherModel from './src/models/weather'
import point from './src/models/point'
import getLastNews from './src/models/getLastNews'
import { setJSExceptionHandler } from 'react-native-exception-handler';
import {projectLocation} from "@/pages/project/ProjectLocation";
import BusinessCardModal from "@/models/businessCard/businessCard";

const errorHandler = (e, isFatal) => {
  if (isFatal) {
    Alert.alert(
        '抱歉',
        `
        Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}
        若您需要帮助，请截图保存并联系新空间
        `,
      [{
        text: '关闭'
      }]
    );
  } else {
    // console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  }
}

setJSExceptionHandler(errorHandler, true)

try {
  Initializer.init('EubmlR0HLgCDFUClm8lQMjGn3ZHeDLct').catch(e => console.error('百度地图初始化失败', e));
} catch (e) {
  console.error('百度地图初始化失败', e)
}

// 修改Toast的默认位置
Toast.messageDefaultPosition = 'center';
Toast.defaultPosition = 'center';

//屏蔽黄框
console.disableYellowBox = true

// 初始化dva容器
const app = dva({
  initialState: {},
  models: [BusinessCardModal,userModel, configModel, globalModel, searchModel, dicModel, locationModel, weatherModel, point,getLastNews,projectLocation],
  onError: (e) => console.log('onError', e)
});
const App = () => app.start(<Index />);

AppRegistry.registerComponent(appName, App);
