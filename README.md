# 开发版本
```
 cd android
./gradlew assembleReleaseDevelop --console plain
```
# 预测试版
```
 cd android
./gradlew assembleReleaseStaging --console plain
```
#正式版
```
 cd android
./gradlew assembleRelease --console plain
```
#安卓热更新
```
appcenter codepush release-react -a xin1-kong1-jian1/android -d Staging
```
#production热更新
```
code-push release-react broker_ios ios -d Production
```
#staging  -x false 代表默认启用
```
code-push release-react broker_ios ios -x false -d Staging --description "Modified the header color"
```

# 关于ECharts图表问题
1.复制node_modules/native-echarts/src/components/Echarts/tpl.html到android/app/src/main/assets/a.html
2.修改同目录下的index.js
```ES6
import React, { Component } from 'react';
import { Platform, WebView, View, StyleSheet } from 'react-native';
import renderChart from './renderChart';
import echarts from './echarts.min';
// const html = require('./tpl.html')
export default class App extends Component {
  

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.option) !== JSON.stringify(this.props.option)) {
      this.refs.chart.reload();
    }
  }

  render() {
    return (
      <View style={{ flex: 1, height: this.props.height || 400, }}>
        <WebView
          ref="chart"
          scrollEnabled={false}
          injectedJavaScript={renderChart(this.props)}
          automaticallyAdjustContentInsets={false}
          originWhitelist={['*']}
          style={{
            height: this.props.height || 400,
            backgroundColor: this.props.backgroundColor || 'transparent'
          }}
          allowFileAccess={true}
          scalesPageToFit={false}
          source={(Platform.OS == 'ios') ? require('./tpl.html') : {uri: 'file:///android_asset/tpl.html'}}
          // source={{baseUrl: '', html: html}}
          onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
        />
      </View>
    );
  }
}

```
3.图表避免在tab页面中使用，如果需要使用，控制在tab激活状态下才渲染ECharts组件
4.ECharts组件的双击缩放的禁用:找到native-echarts组件下的tpl.html加入如下代码,发布后即可实现禁用
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />

#关于andrid机加载baiduMapSDK会出现奔溃问题，在github作者给得解决方案如下：
1.修改node_modules里面react-native-baidumap-sdk/lib/android/src/main/java/cn/qiuxiang/modules/BaiduMapInitializerModule.kt

kotlin代码修改，import log包, 加try、catch

import android.util.Log

override fun onReceive(context: Context, intent: Intent) {
      try {
          if (intent.action == SDK_BROADTCAST_ACTION_STRING_PERMISSION_CHECK_OK) {
              promise?.resolve(null)
          } else {
              val code = intent.getIntExtra(SDK_BROADTCAST_INTENT_EXTRA_INFO_KEY_ERROR_CODE, 0)
              promise?.reject(code.toString(), intent.action)
          }
      } catch (e: Exception) {
          Log.e("baidu","百度地图错误", e);
      }
} 
#关于andrid机加载baiduMap会出现上一个页面得情况，在github作者给得解决方案如下：
1.修改node_modules里面react-native-baidumap-sdk/lib/android/src/main/java/cn/qiuxiang/mapview/BaiduMapView.kt

kotlin代码修改，在24行
val mapView = MapView(context) 改为下面那一个TextureMapView
val mapView = TextureMapView(context)

修改tabs下面的横线
brokers\app\node_modules\antd-mobile-rn\lib\tabs\style\index.native.js
  topTabBarSplitLine: {
      borderBottomColor: _default2['default'].border_color_base,
      borderBottomWidth: 0
  },
  bottomTabBarSplitLine: {
      borderTopColor: _default2['default'].border_color_base,
      borderTopWidth: 0
  }


rd /s /q node_modules