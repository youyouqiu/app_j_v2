import {Image, ScrollView, StatusBar, Text, View, Animated, Easing, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import styles from "./styles";
// @ts-ignore
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import LabelGroup from "../components/LabelGroup";
import {connect} from "react-redux";
import ChoiceArea from "../components/ChoiceArea";
import {XKJImage} from "../../../../components/XKJImage/XKJImage";
import {scaleSize} from "../../../../components/new-space/utils/screenUtil";
import BuryingPoint from "@/utils/BuryPoint";


const buildingFacilities = {
    "公交": "公交",
    "地铁": "地铁",
    "学校": "学校",
    "医院": "医院",
    "银行": "银行",
    "娱乐": "娱乐",
    "购物": "购物",
    "餐饮": "餐饮",
};


const fadeAnim1 = new Animated.Value(0);
const fadeAnim2 = new Animated.Value(1);
const SearchBuilding = (props: any) => {

    const defaultCommonData: any = {
        sliderLength: 0,
        minPriceConstant: 0,
        maxPriceConstant: 5000,
        minPrice: 0,
        maxPrice: 5000,
        city: '',
        district: '',
        area: [],
        showText: [],
        selectHouseType: '',
        shopConfigurationCategory: {},
        requestData: {}
    };


    const {dictionaries, config, dispatch, navigation, user, global,location} = props;
    const _public = config.requestUrl.public;
    const {search_shops_area_obj, house_type_obj, shop_configuration_obj} = dictionaries;

    const [commonData, setCommonData] = useState(defaultCommonData);

    useEffect(() => {
        const {house_type_obj, house_type, shop_configuration} = dictionaries;
        if (!house_type_obj || !shop_configuration) return;
        let _shopConfigurationCategory: any = {};
        for (let key in house_type_obj) {
            if (house_type_obj.hasOwnProperty(key)) {
                let obj: any = {};
                shop_configuration.map((item: any) => {
                    if (item.ext1.includes(key.toString())) {
                        obj[item.value] = item.label
                    }
                });
                _shopConfigurationCategory[key] = obj;
            }
        }
        const _selectHouseType: any = house_type[0].value;
        setCommonData({...commonData, selectHouseType: _selectHouseType, shopConfigurationCategory: _shopConfigurationCategory});
    }, [dictionaries.shop_configuration_obj]);

    useEffect(() => {
        StatusBar.setBarStyle('dark-content')
        const getDictionaries = () => {
            dispatch({
                type: 'dictionaries/getDictionaryDefines',
                payload: {
                    requestUrl: _public,
                    requestData: ['SEARCH_SHOPS_AREA', 'HOUSE_TYPE', 'SHOP_CONFIGURATION', 'SUPPOTR_INFO']
                }
            });
        };
        getDictionaries();
    }, []);

    const labelSelectedOnchange = (selectValues: any, type: string) => {
        const requestData = commonData.requestData;
        if (type === 'area') {
            if (selectValues.length === 0) {
                delete requestData.minArea;
                delete requestData.maxArea;
                setCommonData({...commonData, requestData});
                return
            }
            const _selectValues = selectValues[0].key.split('-');
            requestData.minArea = _selectValues[0];
            requestData.maxArea = _selectValues[1];
            setCommonData({...commonData, requestData});
        } else if (type === 'projectType') {
            requestData.shopFacilities = [];
            setCommonData({...commonData, requestData, selectHouseType: selectValues[0].key});
        } else if (type === 'shopFacilities') {
            console.log('shopFacilities', selectValues);
            requestData.shopFacilities = selectValues.map((item: any) => {
                return item.key
            });
            setCommonData({...commonData, requestData})
        } else if (type === 'buildingFacilities') {
            requestData.buildingFacilities = selectValues.map((item: any) => {
                return item.key
            });
            setCommonData({...commonData, requestData})
        }
    };

    const areaSubmit = ({city, area, district, showText}: any) => {
        const requestData = {...commonData.requestData, city, area, district, showText};
        setCommonData({...commonData, requestData, city, area, district, showText});
    };

    const onScroll = (e: any) => {
        const offsetY = e.nativeEvent.contentOffset.y;
        Animated.timing(fadeAnim1, {
                toValue: offsetY / 100,
                duration: 0,
                easing: Easing.linear,
            }
        ).start();
        Animated.timing(fadeAnim2, {
                toValue: 1 - (offsetY / 100),
                duration: 0,
                easing: Easing.linear,
            }
        ).start();
    };

    const search = () => {
        BuryingPoint.add({
            page: '工作台-侦探寻铺',
            target: '帮忙找铺_button',
        });
        const {minPrice, maxPrice, city, area, district, selectHouseType, showText, requestData} = commonData;
        const requestData1 = {
            "pageIndex": 0,
            "pageSize": 10,
            "minPrice": minPrice,
            "maxPrice": maxPrice,
            "city": city || location.locationCityCode || (user.userInfo || {}).city || location.conversionCode,
            "district": district,
            "area": area,
            "showText": showText.length === 0 ? [location.locationCityName || (user.userInfo || {}).cityName || global.defaultCityName] : showText,
            "shopType": selectHouseType,
        };
        const _requestData = {...requestData, ...requestData1};
        if (_requestData.hasOwnProperty('shopFacilities')) {
            _requestData.shopFacilities = _requestData.shopFacilities.map((item: string) => {
                return shop_configuration_obj[item]
            })
        }
        console.log('_requestData', _requestData);
        navigation.navigate('searchResult', {requestData: _requestData})
    };

    const budgetOnLayout = (event: any) => {
        setCommonData({...commonData, sliderLength: event.nativeEvent.layout.width})
    };


    const onValuesChange = (e: any) => {
        const {requestData} = commonData;
        const minPrice = (e[0] / 10 * commonData.maxPriceConstant).toFixed(0);
        const maxPrice = (e[1] / 10 * commonData.maxPriceConstant).toFixed(0);
        requestData.minPrice = minPrice;
        requestData.maxPrice = maxPrice;
        setCommonData({...commonData, requestData, minPrice: parseInt(minPrice), maxPrice: parseInt(maxPrice)});
    };
    return (
        <View style={styles.sb_wrapper}>
            <Animated.View style={[styles.sb_headerWrapper, {opacity: fadeAnim1}]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../../../images/icons/back.png')} style={styles.sb_headerImage}/>
                </TouchableOpacity>
                <Text style={styles.sb_headerTitle}>侦探寻铺</Text>
                <View style={styles.sb_headerImage}/>
            </Animated.View>
            <Animated.View style={[styles.sb_headerWrapper, {backgroundColor: 'rgba(255,255,255,0)'}, {opacity: fadeAnim2}]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../../../images/icons/back_white.png')} style={styles.sb_headerImage}/>
                </TouchableOpacity>
            </Animated.View>
            <ScrollView style={styles.sb_scrollView} onScroll={onScroll} scrollEventThrottle={10}>
                <XKJImage style={styles.sb_bannerImage} source={require('../../../../images/pictures/searchBuilding.png')}/>
                <View style={styles.sb_scrollViewContent}>
                    <View style={styles.sb_budget}>
                        <Text style={styles.budget}>您的预算:
                            <Text style={styles.budgetText}>{commonData.minPrice}-{commonData.maxPrice}万</Text>
                        </Text>
                        <View style={styles.sb_multiSlider_wrap} onLayout={budgetOnLayout}>
                            <MultiSlider
                                selectedStyle={{backgroundColor: '#4B6AC5'}}
                                unselectedStyle={{backgroundColor: '#EAEAEA'}}
                                values={[commonData.minPrice / commonData.maxPriceConstant * 10, commonData.maxPrice / commonData.maxPriceConstant * 10]}
                                onValuesChange={onValuesChange}
                                step={0.1}
                                isMarkersSeparated={true}
                                customMarkerLeft={() => (
                                    <View style={styles.sb_customMarker_left}>
                                        <Image style={styles.sb_customMarker} source={require('../../../../images/icons/sliderBtn.png')}/>
                                    </View>
                                )}
                                customMarkerRight={() => (
                                    <View style={styles.sb_customMarker_right}>
                                        <Image style={styles.sb_customMarker} source={require('../../../../images/icons/sliderBtn.png')}/>
                                    </View>
                                )}
                                markerOffsetY={4}
                                sliderLength={commonData.sliderLength}
                                containerStyle={{height: 50}}
                                markerStyle={{height: 12, width: 12}}
                                trackStyle={{borderRadius: 5, height: 10}}
                                markerContainerStyle={{height: 50}}/>
                        </View>
                        <View style={styles.sb_multiSlider_text}>
                            <Text style={styles.sb_multiSlider_value}>0</Text>
                            <Text style={styles.sb_multiSlider_value}>5000万</Text>
                        </View>
                    </View>
                    <View style={styles.sb_contentItem}>
                        <Text style={styles.sb_subTitle}>您想要的区域是？</Text>
                        <ChoiceArea areaSubmit={areaSubmit}/>
                    </View>
                    <View style={{position: 'relative', zIndex: -1}}>
                        <View style={styles.sb_contentItem}>
                            <Text style={styles.sb_subTitle}>期望的面积？</Text>
                            <LabelGroup data={search_shops_area_obj}
                                        flex={true}
                                        labelSelectedOnchange={(selectValues: any) => labelSelectedOnchange(selectValues, 'area')}/>
                        </View>
                        <View style={styles.sb_contentItem}>
                            <Text style={styles.sb_subTitle}>期望的房源类型？</Text>
                            <LabelGroup selectValues={[commonData.selectHouseType]}
                                        minSize={1}
                                        flex={true}
                                        data={house_type_obj}
                                        labelSelectedOnchange={(selectValues: any) => labelSelectedOnchange(selectValues, 'projectType')}/>
                        </View>
                        <View style={styles.sb_contentItem}>
                            <Text style={styles.sb_subTitle}>期望的商铺配置？</Text>
                            <LabelGroup multiple={true}
                                        flex={true}
                                        selectValues={commonData.requestData.shopFacilities}
                                        data={commonData.shopConfigurationCategory[commonData.selectHouseType] || []}
                                        labelSelectedOnchange={(selectValues: any) => labelSelectedOnchange(selectValues, 'shopFacilities')}/>
                        </View>
                        <View style={styles.sb_contentItem}>
                            <Text style={styles.sb_subTitle}>期望的楼盘周边？</Text>
                            <LabelGroup multiple={true}
                                        flex={true}
                                        data={buildingFacilities}
                                        labelSelectedOnchange={(selectValues: any) => labelSelectedOnchange(selectValues, 'buildingFacilities')}/>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={search} style={styles.sb_searchBtn}>
                            <Text style={styles.sb_searchBtnText}>帮忙找铺</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};

const mapStateToProps = (props: any) => {

    const {dictionaries, config, global, user,location} = props;
    return {dictionaries, config, global, user,location}
};

export default connect(mapStateToProps)(SearchBuilding);
