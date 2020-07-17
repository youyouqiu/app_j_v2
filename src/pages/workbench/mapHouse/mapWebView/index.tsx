/**
 * Created by Kary on 2020/06/01 10:36.
 */
import React, {FunctionComponent, useEffect} from 'react';
import {WebView} from "react-native-webview";
import {districtListParam} from "@/services/mapHouse/mapSearch";
import {IRegionType} from "@/businessComponents/choice/choiceRegion/types";

interface propsParam {
  city: {
    code?: string,
    name: string,
    latitude: number
    longitude: number
  },
  config: any,
  selectId: string|null,
  // regionChange: number,
  zoomLevel: number,
  region: IRegionType,
  districtList: districtListParam[]
  getAreaBuilds: (item: districtListParam) => void
  getBuildList: (param: districtListParam) => void
  onZoomEnd: (zoomLevel: number) => void
  getBuildingDetails: (buildingTreeId: string) => void
}

const WebViewScreen: FunctionComponent<propsParam> = (props) => {
  let webViewRef: any = null;

  useEffect(() => {
    console.log(props.city, 'setCity');
    webViewRef && webViewRef.injectJavaScript(`setCity(${JSON.stringify(props.city)})`)
  }, [props.city]);

  useEffect(() => {
    console.log('init', props.districtList);
    webViewRef && webViewRef.injectJavaScript(`init(${JSON.stringify(props.districtList)})`)
    webViewRef && webViewRef.injectJavaScript(`setSelectElem(${JSON.stringify(props.selectId)})`)
  }, [props.districtList]);

  useEffect(() => {
    console.log('setSelectElem', props.selectId);
    webViewRef && webViewRef.injectJavaScript(`setSelectElem(${JSON.stringify(props.selectId)})`)
  }, [props.selectId]);

  useEffect(() => {
    console.log('setZoom', props.region);
    const {cityName, districtName} = props.region;
    webViewRef && webViewRef.injectJavaScript(`setZoom(${JSON.stringify(props.zoomLevel)})`);
    webViewRef && webViewRef.injectJavaScript(`getBoundary(${JSON.stringify(districtName ? cityName + districtName : '')})`)
  }, [props.region]);

  const onLoad = () => {
    console.log('onLoad');
    webViewRef.injectJavaScript(`setCity(${JSON.stringify(props.city)})`);
    webViewRef && webViewRef.injectJavaScript(`init(${JSON.stringify(props.districtList)})`);
    webViewRef && webViewRef.injectJavaScript(`setSelectElem(${JSON.stringify(props.selectId)})`)
  };

  const onMessage = (obj: any) => {// 点击区域 放大缩小
    console.log(obj.nativeEvent.data, 'onMessage');
    const data = JSON.parse(obj.nativeEvent.data);
    if (data.type === 'clickArea') {
      props.getAreaBuilds(data.param)
    }
    if (data.type === 'clickProject') {
      if (data.param.buildingTreeIds.length > 1) {
        props.getBuildList(data.param)
      } else {
        props.getBuildingDetails(data.param.id)
      }
    }
    if (data.type === 'zoomEnd') {
      props.onZoomEnd(data.param.zoomLevel)
    }
  };
  return (
    <WebView
      ref={ref => webViewRef = ref}
      source={{uri: `${props.config.requestUrl.AIurl}/map/map.html?time=65`}}
      startInLoadingState
      domStorageEnabled
      style={{height: 500}}
      onLoad={onLoad}
      onMessage={onMessage}
    />
  )
};
export default WebViewScreen