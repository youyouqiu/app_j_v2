import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Page from '../../../components/Page';
import styles from './styles'
import {XKJScrollTabView} from '../../../components/XKJScrollTabView/XKJScrollTabView';
import projectService from '../../../services/projectService';
import {scaleSize} from '../../../utils/screenUtil';
import ChoiceModal from '../../../components/ChoiceModal/ChoiceModal';
import Toast from 'teaset/components/Toast/Toast';


const statusStyle = {
    1: {text: '待售', backgroundColor: '#CBCBCB', color: '#868686', priceBackgroundColor: '#fff'},
    2: {text: '在售', backgroundColor: '#56A1F0', color: '#FFFFFF', priceBackgroundColor: '#fff'},
    3: {text: '锁定', backgroundColor: '#56A1F0', color: '#FFFFFF', priceBackgroundColor: '#fff'},
    4: {text: '已认购', backgroundColor: '#56A1F0', color: '#FFFFFF', priceBackgroundColor: '#fff'},
    10: {text: '已售', backgroundColor: '#FF7F6D', color: '#FFFFFF', priceBackgroundColor: '#FF7F6D'},
};

class ShopList extends React.Component {

    constructor(props) {
        super();
        this.state = {
            choiceVisible: false,
            floorList: [],
            searchShopArea: [],
            shopStatus: [],
            shopSaleStatus: [],
            searchPriceXyh: [],
            buildingNos: []
        };

        this.requestData = {
            'pageIndex': 0,
            'pageSize': 0,
            'buildingTreeId': props.navigation.state.params.buildingTreeId,
        };
        this.selectOption = {};
        this.common = {
            choiceOption: [],
            fullName: props.navigation.state.params.fullName
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.dictionaries.searchShopArea !== prevState.searchShopArea) {
            return {
                ...prevState,
                searchShopArea: nextProps.dictionaries.search_shops_area,
                shopStatus: nextProps.dictionaries.shop_status,
                shopSaleStatus: nextProps.dictionaries.shop_sale_status,
                searchPriceXyh: nextProps.dictionaries.search_price_xyh,
            }
        }
        return null
    }

    componentDidMount() {
        this.getShopsSearch();
        this.getSearchShopAreaDic();
        this.getBuildingNo();
    };

    getSearchShopAreaDic = () => {
        const {dispatch, requestUrl} = this.props;
        dispatch({
            type: 'dictionaries/getDictionaryDefines',
            payload: {
                requestUrl: requestUrl.public,
                requestData: ['SEARCH_SHOPS_AREA', 'SEARCH_PRICE_XYH', 'SHOP_STATUS', 'SHOP_SALE_STATUS', 'SHOP_CATEGORY']
            }
        })
    };

    getBuildingNo = async () => {
        const {requestUrl} = this.props;
        const {buildingTreeId} = this.requestData;
        if (!buildingTreeId) {
            Toast.message('参数错误');
            return
        }
        const res = await projectService.buildingNosReq(requestUrl.api, this.requestData);
        this.setState({buildingNos: res.extension});
    };

    getShopsSearch = async () => {
        const {requestUrl} = this.props;
        const response = await projectService.shopsSearchReq(requestUrl.api, this.requestData);
        this.setState({floorList: response.extension})
    };

    openChoice = () => {
        const {searchShopArea, searchPriceXyh, shopStatus, shopSaleStatus} = this.state;
        const {choiceOption} = this.common;
        if (searchShopArea.length > 0 && choiceOption.length === 0) {
            this.common.choiceOption = [
                {label: '面积', data: searchShopArea, index: 0, key: 'area'},
                {label: '价格', data: searchPriceXyh, index: 1, key: 'price'},
                {label: '铺状态', data: shopStatus, index: 2, key: 'shopStatus'},
                {label: '售卖状态', data: shopSaleStatus, index: 3, key: 'saleStatus'},
            ]
        }
        this.setState({choiceVisible: true})
        this.props.sendPoint.add({
            target: '筛选内容_button',
            page: '房源-房源详情-商铺列表',
            action_param: {
                buildingid: this.props.navigation.state.params.buildingId
            }
        })
    };

    modalClosed = () => {
        this.setState({choiceVisible: false})
    };

    requestDataManual = (callback) => {
        this.requestDataManual = callback
    };

    onChangeTab = (buildingNos) => {
        this.requestData.buildingNos = buildingNos;
    };

    submitOption = (params) => {
        this.modalClosed();
        if (params.hasOwnProperty('area')) {
            let value = params.area;
            if (value.includes('-')) {
                let values = value.split('-');
                this.requestData.minArea = values[0];
                this.requestData.maxArea = values[1]
            } else {
                this.requestData.maxArea = value
            }
        } else {
            delete this.requestData.minArea;
            delete this.requestData.maxArea;
        }

        if (params.hasOwnProperty('price')) {
            let value = params.price;
            if (value.includes('-')) {
                let values = value.split('-');
                this.requestData.minPrice = values[0];
                this.requestData.maxPrice = values[1]
            } else {
                this.requestData.maxPrice = value
            }
        } else {
            delete this.requestData.minPrice;
            delete this.requestData.maxPrice;
        }
        if (params.hasOwnProperty('saleStatus')) {
            this.requestData.saleStatus = [params.saleStatus]
        } else {
            delete this.requestData.saleStatus
        }
        if (params.hasOwnProperty('shopStatus')) {
            this.requestData.status = [params.shopStatus]
        } else {
            delete this.requestData.status
        }
        this.setState({}, () => {
            this.requestDataManual()
        });
        this.selectOption = params
    };

    rightView = (
        <TouchableOpacity activeOpacity={0.8} onPress={this.openChoice} style={{paddingRight: scaleSize(16)}}>
            <Image source={require('../../../images/icons/choice.png')} style={{width: scaleSize(40), height: scaleSize(40)}}/>
        </TouchableOpacity>
    );

    gotoShopDetail = (item) => {
        const routerParams = {
            shopId: item.id,
            buildingTreeId: item.buildingTreeId
        };
        this.props.navigation.navigate('shopDetail', routerParams)
    };

    shopItem = (item) => {
        const saleStatus = Number(item.saleStatus);
        const {backgroundColor, color, priceBackgroundColor} = statusStyle[saleStatus];
        return (
            <TouchableOpacity onPress={() => this.gotoShopDetail(item)} activeOpacity={0.8} key={item.id} style={styles.roomItemWrap}>
                <View style={[styles.roomNumWrap, {backgroundColor: backgroundColor}]}>
                    {/*<Text style={[styles.roomNum, { backgroundColor: backgroundColor, color: color }]} numberOfLines={1}>{item.number}</Text>*/}
                    <View style={[styles.roomNumContainer, {backgroundColor: backgroundColor}]}>
                        <Text style={[styles.roomNum,{color: color}]} numberOfLines={1}>{item.number}</Text>
                    </View>
                    {item.saleStatus === '4' || item.saleStatus === '3' ? (
                        <View style={styles.roomLockWrap}>
                            <Image style={styles.roomLock} source={require('../../../images/icons/subscriptionLock.png')}/>
                        </View>
                    ) : null}
                </View>
                <Text style={[styles.roomArea, {backgroundColor: backgroundColor, color: color}]}>{item.buildingArea}㎡</Text>
                {saleStatus !== 10?(
                    <Text style={[styles.roomPrise, {backgroundColor: priceBackgroundColor}]}
                          numberOfLines={1}>
                        {saleStatus !== 10 ? item.totalPrice + '万' : ' '}
                    </Text>
                ):<Text style={[styles.roomPrise, {backgroundColor: priceBackgroundColor}]}>&emsp;</Text>}

            </TouchableOpacity>
        )
    };

    tabItemComponent = ({item}) => {
        return (
            <View style={styles.floorItem} key={Math.random()}>
                <View style={styles.floorHeader}>
                    <Text style={styles.floorNumber}>{item.floorNo}</Text>
                    {/*<View style={styles.floorRight}>*/}
                    {/*    <Image source={require('../../../images/icons/scenery.png')}*/}
                    {/*           style={styles.floorIcon}/>*/}
                    {/*    <Text style={styles.floorRightText}>平面图</Text>*/}
                    {/*    <Image source={require('../../../images/icons/chose.png')}*/}
                    {/*           style={styles.floorRightIcon}/>*/}
                    {/*</View>*/}
                </View>
                <View style={styles.floorContent}>
                    {item.shopListSearchNewResponses.map(item2 => this.shopItem(item2))}
                </View>
            </View>
        )
    };

    render() {
        const {buildingNos, choiceVisible} = this.state;
        const {requestUrl} = this.props;
        const {choiceOption, fullName} = this.common;

        return (
            <Page title={fullName || ''} scroll={false} rightView={this.rightView}>
                <BuildingStatusTips/>
                <View style={{flex: 1}}>
                    <XKJScrollTabView tabs={buildingNos}
                                      dataRequestUrl={requestUrl.api + '/v2.0/api/shops/search'}
                                      tabIdKey='buildingNos' requestData={this.requestData}
                                      scrollView={true} onChangeTab={this.onChangeTab}
                                      merge={false}
                                      tabBarUnderlineStyle={{backgroundColor: '#ff332c', height: 2, width: 40}}
                                      style={{borderWidth: 0, backgroundColor: 'rgba(248,248,248,1)'}}
                                      requestDataManual={this.requestDataManual}
                                      tabItemComponent={[this.tabItemComponent]}
                    />
                </View>
                {choiceVisible ? (
                    <ChoiceModal visible={choiceVisible} title={fullName} selectOption={this.selectOption} random={Math.random()}
                                 modalClosed={this.modalClosed}
                                 choiceOption={choiceOption} submitOption={this.submitOption}/>
                ) : null}
            </Page>
        )
    }
}

const mapStateToProps = ({config, global, dictionaries, point}) => {
    return {
        requestUrl: config.requestUrl,
        global, dictionaries,
        sendPoint: point.buryingPoint
    }
};

export default connect(mapStateToProps)(ShopList)

export const BuildingStatusTips = () => {

    return (
        <View style={styles.tipsContent}>
            <Disorder color='#49A1FF' text='在售'/>
            <Disorder color='#FE5139' text='已售'/>
            <Disorder color='#D2D0D2' text='待售'/>
            <View style={styles.tipsRight}>
                <Image style={styles.subscriptionLock} source={require('../../../images/icons/subscriptionLock.png')}/>
                <Text style={styles.tipsRightText}>已认购 / 锁定</Text>
            </View>
        </View>
    )
};

export const Disorder = ({text, color}) => {
    return (
        <View style={styles.disorderItem}>
            <Text style={[styles.tipsCircular, {backgroundColor: color}]}/>
            <Text style={[styles.tipsStatusText, {color: color}]}>{text}</Text>
        </View>
    )
};
