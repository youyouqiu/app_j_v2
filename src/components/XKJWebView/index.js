import React, {Component} from 'react';
import BaseContainer from '../Page';
import {WebView} from 'react-native-webview';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {checkArticleUrl} from '@/utils/utils';
import {CONSTANT, STORAGE_KEY} from '@/constants';
import {connect} from 'react-redux';
import articleService from '@/services/articleService';
import {Toast} from '@new-space/teaset';
import {shareInformation} from '@/services/component';
import ShareView from '@/components/Share/shareView';
import * as WeChat from 'xkj-react-native-wechat';
import {scaleSize} from '@/utils/screenUtil';
import BuryingPoint from '../../utils/BuryPoint'
import ArticleDetailSkeleton from '@/components/skeleton/components/ArticleDetailSkeleton';
import storage from '@/utils/storage'

class XKJWebView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      url: props.navigation.state.params.url || '',
      title: props.navigation.state.params.title || '',
      source: props.navigation.state.params.source,
      isBdt: props.navigation.state.params.isBdt,
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
    if (this.state.isBdt) {
      this.isInit()
    }
    this.addViewCount();
    const {articleId, title, source} = this.state;
    //埋点
    const params = {
      page: '文章详情页',
      target: '页面',
      action: 'view',
      action_param: {
        source: source || '',
        id: articleId || '',
        title: title || ''
      }
    };
    BuryingPoint.add(params)
  }

  isInit = async () => {
    let init = false
    // await storage.remove(STORAGE_KEY.ISINIT_BDT)
    try {
      let res = await storage.get(STORAGE_KEY.ISINIT_BDT)
      if (res == 1) {
        init = false
      }
    } catch (e) {
      init = true
      storage.set(STORAGE_KEY.ISINIT_BDT, 1)
    } finally {
      this.setState({
        init
      })
    }
  }

  componentWillUnmount() {
    // let callBack = (((this.props.navigation || {}).state || {}).params || {}).callBack
    // callBack && callBack()
    // let callBack = (((this.props.navigation || {}).state || {}).params || {}).callBack
    // callBack && callBack()
  }

  addViewCount = async (articleId) => {
    const {requestUrl} = this.props;
    const _articleId = articleId || this.state.articleId;
    await articleService.addViewCountReq(requestUrl.api, _articleId).catch(err => {
      console.log('文章浏览量增加失败：', err)
    });
  };

  getInfoDetail = async () => {
    const {requestUrl} = this.props;
    const {articleId} = this.state;
    if (!articleId) return;
    const responseData = await shareInformation(requestUrl.api, articleId).catch(err => {
      console.log('文章详情获取失败：', err)
    });
    if (!responseData) return;
    const {extension} = responseData;
    this.setState({articleDetail: extension})
  };

  onLoadEnd = () => {
    this.setState({loading: false});
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
      this.setState({url: param}, () => {
        const articleId = checkArticleUrl(param);
        if (articleId) {
          this.addViewCount(articleId);
        }
      });
    }
  };

  shareSelect = async (key) => {
    const {articleId, url, source} = this.state;
    this.props.sendPoint.add({
      target: key === 'shareToTimeline' ? '微信朋友圈_button' : '微信好友_button',
      page: '文章详情页',
      action_param: {articleId, url, source}
    });
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
        thumbImage: encodeURI(articleDetail.cover),
        description: articleDetail.subtitle || '',
        webpageUrl: articleDetail.url + '?userid=' + this.props.user.id
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
        thumbImage: encodeURI(articleDetail.cover),
        description: articleDetail.subtitle || '',
        webpageUrl: articleDetail.url + '?userid=' + this.props.user.id
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
    const {source} = this.state;
    !this.state.visible && this.props.sendPoint.add({
      target: '分享_button',
      page: '文章详情页',
      action_param: {
        infoId: this.state.articleId,
        source: source
      }
    })
  };

  render() {
    const {loading, title, isArticle, source, visible, init} = this.state;
    let url = this.state.url;
    if (isArticle) {
      if (url.includes('from=web')) {
        url = url.split('?')[0] + '?from=broker_app&channel=' + CONSTANT.CHANNEL + '&source=' + source + '&cityCode=' + this.props.cityCode;
      } else {
        url = url + '?from=broker_app&channel=' + CONSTANT.CHANNEL + '&source=' + source + '&cityCode=' + this.props.cityCode;
      }
    }
    const rightView = (
      <TouchableOpacity style={styles.ad_shareWrap} onPress={this.modalToggle} activeOpacity={0.8}>
        <Image style={styles.ad_shareIcon}
               source={require('../../images/icons/project/share_black.png')}/>
      </TouchableOpacity>
    );

    return (
      <BaseContainer scroll={false} alwaysBounceHorizontal={false} alwaysBounceVertical={false} title={title} rightView={isArticle ? rightView : null}
                     bodyStyle={{paddingLeft: 0}}>
        <WebView
          source={{uri: url, method: 'GET', headers: { 'Cache-Control':'no-cache' }}}
          bounces={false}
          onLoadEnd={this.onLoadEnd}
          onMessage={this.onMessage}
          style={{width: '100%', height: '100%', flex: 1}}
        />
        {isArticle && loading ? (
          <View style={styles.ad_skeleton}>
            <ArticleDetailSkeleton/>
          </View>
        ) : null}
        {!isArticle && loading ? (
          <View style={styles.ad_skeleton}>
            {/* <ArticleDetailSkeleton/> */}
            <Image style={styles.ad_loadingImg} source={require('@/images/pictures/loadingImg.png')}/>
            <Text style={styles.ad_loadingText}>加载中...</Text>
          </View>
        ) : null}
        {
          !loading & init ? (
            <TouchableOpacity activeOpacity={0.9} onPress={() => {
              this.setState({init: false})
            }} style={styles.ad_skeleton}>
              <Image resizeMode='stretch' style={styles.initImg} source={require('@/images/pictures/bdtGuide.png')}/>
            </TouchableOpacity>
          ) : null
        }
        <ShareView visible={visible} keys={['shareToTimeline', 'sharingFriends']} shareSelect={this.shareSelect} closeModal={this.modalToggle}/>
      </BaseContainer>
    )
  }
}

const mapStateToProps = ({config, global, point, user}) => {
  return {
    requestUrl: config.requestUrl,
    consultationTypes: global.consultationTypes,
    cityCode: global.cityCode || global.defaultCityCode,
    sendPoint: point.buryingPoint,
    user: user.userInfo
  }
};

export default connect(mapStateToProps)(XKJWebView)

const styles = StyleSheet.create({
  initImg: {
    width: '100%',
    height: '100%'
  },
  ad_shareWrap: {
    paddingRight: scaleSize(32),
    paddingLeft: scaleSize(20)
  },
  ad_shareIcon: {
    width: scaleSize(60),
    height: scaleSize(60)
  },
  ad_skeleton: {
    position: 'absolute',
    zIndex: 999,
    height: '100%',
    width: '100%'
  },
  ad_loadingImg: {
    width: scaleSize(750),
    height: scaleSize(280),
    marginTop: scaleSize(48),
    marginBottom: scaleSize(18)
  },
  ad_loadingText: {
    width: '100%',
    textAlign: 'center'
  }
});

