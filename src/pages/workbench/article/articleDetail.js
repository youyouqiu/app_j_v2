import React, {Component} from 'react';
import BaseContainer from '../../../components/Page'
import {WebView} from 'react-native-webview';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import {scaleSize} from '../../../utils/screenUtil';
import ShareView from '../../../components/Share/shareView';
import * as WeChat from 'xkj-react-native-wechat';
import Toast from 'teaset/components/Toast/Toast';
import {connect} from 'react-redux';
import {shareInformation} from '../../../services/component';
import {CONSTANT} from '../../../constants';
import articleService from "../../../services/articleService";

class ArticleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            url: props.navigation.state.params.url,
            id: props.navigation.state.params.id,
            visible: false,
            source: props.navigation.state.params.source
        };

        this.common = {
            articleDetail: {}
        }
    }

    componentDidMount() {
        this.getInfoDetail();
        this.addViewCount();
    }

    addViewCount = async () => {
        const {requestUrl} = this.props;
        const {id} = this.state;
        const res = await articleService.addViewCountReq(requestUrl.api, id);
        console.log('res', res)
    };

    getInfoDetail = async () => {
        const {requestUrl} = this.props;
        const {id} = this.state;
        const responseData = await shareInformation(requestUrl.api, id);
        const {extension} = responseData;
        this.common.articleDetail = extension
    };

    onLoadEnd = () => {
        this.setState({loading: false})
    };

    shareSelect = async (key) => {
        const installed = await WeChat.isWXAppInstalled();
        if (!installed && ['shareToTimeline', 'sharingFriends'].includes(key)) {
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
        const {articleDetail} = this.common;
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
        const {articleDetail} = this.common;
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
                inforid: this.state.id
            }
        })
    };

    onMessage = async (event) => {
        const param = event.nativeEvent.data;
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
            this.setState({url: param}, this.addViewCount);

        }
    };

    render() {
        const {loading, visible, source, id} = this.state;
        let {url} = this.state;
        if (url.includes('from=web')) {
            url = url.split('?')[0] + '?from=broker_app&channel=' + CONSTANT.CHANNEL + '&source=' + source + '&cityCode=' + this.props.cityCode;
        } else {
            url = url + '?from=broker_app&channel=' + CONSTANT.CHANNEL + '&source=' + source + '&cityCode=' + this.props.cityCode;
        }
        const rightView = (
            <TouchableOpacity style={styles.ad_shareWrap} onPress={this.modalToggle} activeOpacity={0.8}>
                <Image style={styles.ad_shareIcon}
                       source={require('../../../images/icons/project/share_black.png')}/>
            </TouchableOpacity>
        );
        console.log('文章地址', url);
        return (
            <BaseContainer title='资讯详情' rightView={id.includes('banner') ? null : rightView} loading={loading} bodyStyle={{paddingLeft: 0}} scroll={false}>
                <WebView onLoadEnd={this.onLoadEnd} source={{uri: url}}
                         onMessage={this.onMessage}
                         style={{width: '100%', height: '100%', flex: 1}}/>
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

export default connect(mapStateToProps)(ArticleDetail)

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
