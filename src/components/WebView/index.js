import React, {Component} from 'react';
import BaseContainer from '../Page'
import {WebView} from 'react-native-webview';
import {View} from "react-native";

class XKJWebView extends Component {

    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            loading: true, // 默认loading为true
            url: props.navigation.state.params.url,
            title: props.navigation.state.params.title || ''
        }
    }

    componentDidMount() {
    }


    render() {
        const {loading, url,title} = this.state;
        return (
            <BaseContainer scroll={false} title={title} loading={loading} bodyStyle={{paddingLeft: 0}}>
                <WebView
                    onLoadEnd={() => {
                        console.log('???');
                        this.setState({loading: false})
                    }}
                    style={{width: '100%', height: '100%', flex: 1}}
                    source={{uri: url}}
                />
            </BaseContainer>
        )
    }
}

export default XKJWebView;
