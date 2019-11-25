import React, {Component} from 'react';
import BaseContainer from '../Page'
import {WebView} from 'react-native-webview';
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {checkArticleUrl} from "@/utils/utils";
import {CONSTANT} from "@/constants";
import {connect} from "react-redux";
import articleService from "@/services/articleService";
import {Toast} from "teaset";
import {shareInformation} from "@/services/component";
import ShareView from "@/components/Share/shareView";
import * as WeChat from "xkj-react-native-wechat";
import {scaleSize} from "@/utils/screenUtil";

class XKJWebView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            url: props.navigation.state.params.url || '',
            title: props.navigation.state.params.title || '',
            source: props.navigation.state.params.source,
            isArticle: false,
            articleId: '',
            articleDetail: null,
            visible: false
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const articleId = checkArticleUrl(nextProps.navigation.state.params.url);
        if (articleId) {
            return {
                ...prevState,
                articleId,
                isArticle: true
            }
        }
        return null;
    }

    componentDidMount() {
        this.state.isArticle && this.getInfoDetail();
        this.addViewCount();
    }

    addViewCount = async () => {
        const {requestUrl} = this.props;
        const {articleId} = this.state;
        await articleService.addViewCountReq(requestUrl.api, articleId).catch(err=>{
            console.log('文章浏览量增加失败：',err)
        });
    };

    getInfoDetail = async () => {
        const {requestUrl} = this.props;
        const {articleId} = this.state;
        if (!articleId) return;
        const responseData = await shareInformation(requestUrl.api, articleId).catch(err => {
            console.log('文章详情获取失败：',err)
        });
        if (!responseData) return;
        const {extension} = responseData;
        this.setState({articleDetail: extension})
    };

    onLoadEnd = () => {
        this.setState({loading: false})
    };

    onMessage = async (event) => {
        const param = event.nativeEvent.data;
        console.log('onMessage', param);

        try {
            const _param = JSON.parse(param);
            if (_param.buildingId) {
                const {requestUrl} = this.props;
                const res = await articleService.checkBuildingStatus(requestUrl.api, _param.buildingId).catch(() => {
                    Toast.message('无法查看该楼盘');
                });
                if (!res) return;
                if (res.extension === 32) {
                    Toast.message('该楼盘已下架');
                    return
                }
                this.props.navigation.navigate('buildingDetail', {buildingTreeId: _param.buildingId});
            }
        } catch (e) {
            this.setState({url: param});
        }
    };

    shareSelect = async (key) => {
        const installed = await WeChat.isWXAppInstalled();
        if (!installed && ['shareToTimeline', 'sharingFriends'].includes(key)) {
            this.setState({visible: false});
            Toast.message('请您安装微信之后再试');
            return
        }
        if (key === 'shareToTimeline') {
            this.shareToTimeline();
        } else if (key === 'sharingFriends') {
            this.sharingFriends();
        }
    };

    shareToTimeline = async () => {
        const {articleDetail} = this.state;
        if (!articleDetail) return;
        try {
            let data = {
                type: 'news',
                title: articleDetail.title || '',
                thumbImage: articleDetail.cover,
                description: articleDetail.subtitle || '',
                webpageUrl: articleDetail.url
            };
            WeChat.shareToTimeline(data);
        } catch (e) {
            console.log(e, '分享失败');
        } finally {
            this.modalToggle()
        }
    };

    sharingFriends = async () => {
        const {articleDetail} = this.state;
        if (!articleDetail) return;
        try {
            let shareData = {
                type: 'news',
                title: articleDetail.title || '',
                thumbImage: articleDetail.cover,
                description: articleDetail.subtitle || '',
                webpageUrl: articleDetail.url
            };
            WeChat.shareToSession(shareData);
        } catch (e) {
            Toast.message('分享失败')
        } finally {
            this.modalToggle()
        }
    };

    modalToggle = () => {
        this.setState((prev) => ({
            visible: !prev.visible
        }));
        this.props.sendPoint.add({
            target: '分享_button',
            page: '工作台-资讯干货',
            action_param: {
                inforid: this.state.articleId
            }
        })
    };

    render() {
        const {loading, title, isArticle, source, visible} = this.state;
        let url = this.state.url;
        if (isArticle) {
            if (url.includes('from=web')) {
                url = url.split('?')[0] + '?from=broker_app&channel=' + CONSTANT.CHANNEL + '&source=' + source + '&cityCode=' + this.props.cityCode;
            } else {
                url = url + '?from=broker_app&channel=' + CONSTANT.CHANNEL + '&source=' + source + '&cityCode=' + this.props.cityCode;
            }
        }
        console.log('xkjWebView_url', url);
        const rightView = (
            <TouchableOpacity style={styles.ad_shareWrap} onPress={this.modalToggle} activeOpacity={0.8}>
                <Image style={styles.ad_shareIcon}
                       source={require('../../images/icons/project/share_black.png')}/>
            </TouchableOpacity>
        );

        return (
            <BaseContainer scroll={false} title={title} loading={loading}
                           rightView={isArticle ? rightView : null}
                           bodyStyle={{paddingLeft: 0}}>
                <WebView
                    source={{uri: url}}
                    onLoadEnd={this.onLoadEnd}
                    onMessage={this.onMessage}
                    style={{width: '100%', height: '100%', flex: 1}}
                />
                <ShareView visible={visible} keys={['shareToTimeline', 'sharingFriends']} shareSelect={this.shareSelect} closeModal={this.modalToggle}/>
            </BaseContainer>
        )
    }
}

const mapStateToProps = ({config, global, point}) => {
    return {
        requestUrl: config.requestUrl,
        consultationTypes: global.consultationTypes,
        cityCode: global.cityCode || global.defaultCityCode,
        sendPoint: point.buryingPoint,
    }
};

export default connect(mapStateToProps)(XKJWebView)

const styles = StyleSheet.create({
    ad_shareWrap: {
        paddingRight: scaleSize(32),
        paddingLeft: scaleSize(20)
    },
    ad_shareIcon: {
        width: scaleSize(60),
        height: scaleSize(60)
    }
});
