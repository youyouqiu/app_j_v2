import Page from "../../components/Page";
import React from "react";
import {WebView} from "react-native-webview";

const MapWebView = (params) => {
    const {txLatitude, txLongitude, name, selfLatitude, selfLongitude}=params.navigation.state.params;
    let url = `https://apis.map.qq.com/uri/v1/routeplan?type=drive&from=${name}&fromcoord=${selfLatitude},${selfLongitude}&to=${name}&tocoord=${txLatitude},${txLongitude}&policy=1&referer=VEBBZ-WOSKI-37RGW-56BGE-ODU5Z-TUB2Z`;
    return (
        <Page scroll={false}>
            <WebView style={{height:300}} source={{uri: url}}/>
        </Page>
    )
};

export default MapWebView
