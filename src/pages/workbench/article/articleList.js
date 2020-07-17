import React, {Component} from 'react'
import {Text, View, Image, TouchableOpacity} from 'react-native'
import BaseContainer from '../../../components/Page';
import {XKJScrollTabView} from '../../../components/XKJScrollTabView/XKJScrollTabView';
import {conStyle} from './styles';
import {connect} from 'react-redux'
import {extractIdFromUrl, transFormViewCount} from '../../../utils/utils';
import {scaleSize} from '../../../utils/screenUtil'
import {CONSTANT} from "../../../constants";
import {Toast} from '@new-space/teaset'
import ArticleListSkeleton from "@/components/skeleton/components/ArticleListSkeleton";
import articleService from "@/services/articleService";

class ArticleList extends Component {

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;
        if (params) {
            return {
                tabBarVisible: params.tabBarVisible
            }
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            consultationTypes: props.consultationTypes,
            articleTypes: [],
        };
        let {location} = props;
        this.common = {
            requestData: {
                pageIndex: 0,
                pageSize: 5,
                cityId: props.projectLocation.cityCode || props.projectLocation.defaultCityCode,
                app: 2,
                typeId: ''
            }
        };
    }

    componentDidMount() {
        this.getArticleTypes();
        this.props.sendPoint.add({target: '页面', page: '工作台-聚焦热点', action: 'view'})
    }

    getArticleTypes = async () => {
      try {
        const requestData = {
          'source': 2,
          'cityId': this.props.projectLocation.cityCode || this.props.projectLocation.defaultCityCode
        };
        const res = await articleService.articleTypesReq(requestData);
        const {code, extension} = res;
        if (code === '0') {
            this.setState({
                articleTypes: extension,
            })
        } else {
            Toast.message('获取文章失败！');
        }
      }catch (e) {
        console.log(e)
      }
        
    };

    consultationDetail = (item) => {
        if (!item.url) { // 错误数据没有地址，不进行跳转
            Toast.message('该文章数据有误，没有地址')
            return
        }
        const id = extractIdFromUrl(item.url);
        this.props.navigation.navigate('xkjWebView', {url: item.url, id, source: CONSTANT.SOURCE.ARTICLE_LIST});
        this.props.sendPoint.add({
            target: '聚焦热点跳转详情_button',
            page: '工作台-聚焦热点',
            action_param: {
                inforid: id
            }
        })
    };

    tabItemComponent = ({item = {}}) => {
        return (
            <TouchableOpacity key={item.newsId} activeOpacity={0.8} onPress={() => this.consultationDetail(item)}>
                <View style={conStyle.csItemContent}>
                    <View style={conStyle.csItemContains}>
                        <View style={conStyle.csItemLeft}>
                            <Text numberOfLines={2}
                                  style={conStyle.csItemTitle}>{item.title}</Text>
                            <View style={conStyle.csItemTimeWrap}>
                                {item.viewCount > 10000 ? (
                                    <Image style={conStyle.csItemTimeIcon} source={require('../../../images/icons/hot.png')}/>
                                ) : null}
                                <Text style={conStyle.csItemTime}>
                                    {transFormViewCount(item.viewCount)}浏览 | {item.publishTimeString}
                                </Text>
                            </View>
                        </View>
                        <Image resizeMode='stretch' source={{uri: item.cover}} defaultSource={require('../../../images/defaultImage/default_2.png')} style={conStyle.csItemRight}/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    render() {
        const {articleTypes} = this.state;
        const {requestData} = this.common;
        return (
            <BaseContainer title='聚焦热点' statusBarColor='#ff332c' scroll={false} bodyStyle={{padding: 0}}>
                <View style={{height: '100%'}}>
                    <XKJScrollTabView tabs={articleTypes}
                                      activeTab='0'
                                      dataRequestUrl={this.props.requestUrl.api + '/api/article/queryarticlelist'}
                                      requestData={requestData}
                                      scrollView={true}
                                      skeleton={<ArticleListSkeleton/>}
                                      tabIdKey='typeId'
                                      tabBarUnderlineStyle={{backgroundColor: '#1F3070', height: scaleSize(5), width: scaleSize(55)}}
                                      style={{borderWidth: 0, backgroundColor: '#fff'}}
                                      tabItemComponent={[this.tabItemComponent]}/>
                </View>
            </BaseContainer>
        )
    }
}

const mapStateToProps = ({config, global, point, location, projectLocation}) => {
    return {
        requestUrl: config.requestUrl,
        location: location,
        consultationTypes: global.consultationTypes,
        consultationTypesLoading: global.consultationTypesLoading,
        sendPoint: point.buryingPoint,
        projectLocation
    }
};

export default connect(mapStateToProps)(ArticleList)
