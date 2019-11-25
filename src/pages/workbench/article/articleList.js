import React, {Component} from 'react'
import {Text, View, Image, TouchableOpacity} from 'react-native'
import BaseContainer from '../../../components/Page';
import {XKJScrollTabView} from '../../../components/XKJScrollTabView/XKJScrollTabView';
import {conStyle} from './styles';
import {connect} from 'react-redux'
import {extractIdFromUrl, transFormViewCount} from '../../../utils/utils';
import {scaleSize} from '../../../utils/screenUtil'
import {CONSTANT} from "../../../constants";

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
        super();
        this.state = {
            consultationTypes: props.consultationTypes,
        };
        let {location} = props
        this.common = {
            requestData: {
                pageIndex: 0,
                pageSize: 5,
                cityId: location && location.conversionCode,
                app: 2,
                typeId: ''
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.consultationTypes !== prevState.consultationTypes) {
            return {
                ...prevState,
                consultationTypes: nextProps.consultationTypes
            }
        }
        return null;
    }

    componentDidMount() {
        const {consultationTypes} = this.props;
        if (consultationTypes.length === 0) {
            this.getArticleTypes();
        }
        this.props.sendPoint.add({target: '页面', page: '工作台-资讯干货', action: 'view'})
    }

    getArticleTypes = () => {
        const {dispatch, requestUrl} = this.props;
        dispatch({type: 'global/getArticleTypes', payload: {requestUrl: requestUrl.api}})
    };

    consultationDetail = (item) => {
        const id = extractIdFromUrl(item.url);
        this.props.navigation.navigate('xkjWebView', {url: item.url, id, source: CONSTANT.SOURCE.ARTICLE_LIST});
        this.props.sendPoint.add({
            target: '资讯跳转详情_button',
            page: '工作台-资讯干货',
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
                        <Image source={{uri: item.cover}} defaultSource={require('../../../images/defaultImage/default_2.png')} style={conStyle.csItemRight}/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    render() {
        const {consultationTypes} = this.state;
        const {requestData} = this.common;
        return (
            <BaseContainer title='资讯管理' statusBarColor='#ff332c' scroll={false} bodyStyle={{padding: 0}}>
                <View style={{height: '100%'}}>
                    <XKJScrollTabView tabs={consultationTypes} activeTab='0' dataRequestUrl={this.props.requestUrl.api + '/api/article/queryarticlelist'}
                                      requestData={requestData} scrollView={true} tabIdKey='typeId'
                                      tabBarUnderlineStyle={{backgroundColor: '#1F3070', height: scaleSize(5), width: scaleSize(55)}}
                                      style={{borderWidth: 0, backgroundColor: '#fff'}} tabItemComponent={[this.tabItemComponent]}/>
                </View>
            </BaseContainer>
        )
    }
}

const mapStateToProps = ({config, global, point, location}) => {
    return {
        requestUrl: config.requestUrl,
        location: location,
        consultationTypes: global.consultationTypes,
        sendPoint: point.buryingPoint
    }
};

export default connect(mapStateToProps)(ArticleList)
