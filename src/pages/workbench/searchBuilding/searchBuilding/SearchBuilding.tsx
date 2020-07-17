import { Animated, Easing, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./styles";
import { connect } from "react-redux";
import BuryingPoint from "@/utils/BuryPoint";
import ChoiceAreaWrapper from "@/pages/workbench/searchBuilding/components/ChoiceAreaWrapper";
import XKJImage from "@/components/XKJImage/XKJImage";
import PriceSlider from "@/pages/workbench/searchBuilding/components/PriceSlider";
import { IChoiceLabelDataPropsType } from "@/businessComponents/LabelGroup/types";
import LabelGroup from "@/businessComponents/LabelGroup/LabelGroup";
import { FEATURE_TYPE } from "@/pages/workbench/searchBuilding/constant";
import {
  ISearchRequestType,
  IshopAreasType,
  IShopPriceType
} from "@/pages/workbench/searchBuilding/types";
import { IRegionType } from "@/businessComponents/choice/choiceRegion/types";
import { ISearchBuildingStateType } from "@/pages/workbench/searchBuilding/searchBuilding/types";


const fadeAnim1 = new Animated.Value(0);
const fadeAnim2 = new Animated.Value(1);
const defaultUnitPrice = {
  minPrice: 0,
  maxPrice: 200
};

const SearchBuilding = (props: any) => {

  const defaultRequestData = useMemo<ISearchRequestType>(() => {
    return {
      pageIndex: 0,
      pageSize: 30,
      shopTotalPrices: [{ minPrice: defaultUnitPrice.minPrice, maxPrice: defaultUnitPrice.maxPrice }],
      shopUnitPrices: [],
      city: props.projectLocation.cityCode || props.projectLocation.defaultCityCode,
      district: '',
      shopAreas: [],
      areas: [],
      shopType: (props.dictionaries?.house_type || [])[0]?.value || 0,
      featureType1: null,
      featureType2: []
    }
  }, [props.dictionaries, props.projectLocation]);


  const defaultState = {
    shopConfigurationCategory: {},
    selectHouseType: {},
    regionSelectedValues: {} as IRegionType,
    defaultShopType: (props.dictionaries?.house_type || [])[0] || {},//默认商铺
  } as ISearchBuildingStateType;


  const { dictionaries, config, dispatch, navigation } = props;
  const _public = config.requestUrl.public;
  const { house_type, search_shops_area } = dictionaries;

  const [state, setState] = useState(defaultState);

  useEffect(() => {
    const { house_type_obj, house_type, shop_configuration } = dictionaries;
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
    setState({ ...state, selectHouseType: _selectHouseType, shopConfigurationCategory: _shopConfigurationCategory });
  }, [dictionaries.shop_configuration_obj]);

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    const getDictionaries = () => {
      dispatch({
        type: 'dictionaries/getDictionaryDefines',
        payload: {
          requestUrl: _public,
          requestData: ['SEARCH_SHOPS_AREA', 'HOUSE_TYPE']
        }
      });
    };
    getDictionaries();
  }, []);

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
      page: '侦探寻铺选择页',
      target: '帮忙找铺_button',
    });
    navigation.navigate('searchResult', { requestData: defaultRequestData, regionSelectedValues: state.regionSelectedValues })
  };

  /**价格处理*/
  const onValuesChange = (params: { minUnitPrice: number, maxUnitPrice: number }) => {
    const shopUnitPrice: IShopPriceType = {
      minPrice: params.minUnitPrice,
      maxPrice: params.maxUnitPrice
    };
    defaultRequestData.shopTotalPrices = [shopUnitPrice]
  };

  /**区域处理*/
  const regionOnConfirm = (params: IRegionType) => {
    defaultRequestData.city = params.city;
    defaultRequestData.areas = params.area;
    defaultRequestData.district = params.district;
    setState({ ...state, regionSelectedValues: params });
  };

  /**Label处理*/
  const labelSelectedOnchange = (selectValues: Array<IChoiceLabelDataPropsType>, type: string) => {
    if (type === 'area') {
      const shopAreas = [] as Array<IshopAreasType>;
      selectValues.map((v, i) => {
        const shopAreasItem = {} as IshopAreasType;
        const shopAreasItemArr = (v.value as string).split('-');
        shopAreasItem.minArea = shopAreasItemArr[0];
        shopAreasItem.maxArea = shopAreasItemArr[1];
        shopAreas.push(shopAreasItem);
      });
      defaultRequestData.shopAreas = shopAreas;
    } else if (type === 'shopType') {
      // @ts-ignore
      defaultRequestData.shopType = parseInt(selectValues[0]?.value)
    } else if (type === 'featureType1') {
      defaultRequestData.featureType1 = selectValues[0]?.value
    }
  };

  return (
    <View style={styles.sb_wrapper}>
      <Animated.View style={[styles.sb_headerWrapper, { opacity: fadeAnim1 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../../images/icons/back.png')} style={styles.sb_headerImage} />
        </TouchableOpacity>
        <Text style={styles.sb_headerTitle}>侦探寻铺</Text>
        <View style={styles.sb_headerImage} />
      </Animated.View>
      <Animated.View style={[styles.sb_headerWrapper, { backgroundColor: 'rgba(255,255,255,0)' }, { opacity: fadeAnim2 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../../images/icons/back_white.png')} style={styles.sb_headerImage} />
        </TouchableOpacity>
      </Animated.View>
      <ScrollView style={styles.sb_scrollView} onScroll={onScroll} scrollEventThrottle={10}>
        <XKJImage style={styles.sb_bannerImage} source={require('../../../../images/pictures/searchBuilding.png')} />

        <View style={styles.sb_scrollViewContent}>

          {/**价格*/}
          <PriceSlider onValuesChange={onValuesChange} />

          {/**区域*/}
          <View style={[styles.sb_contentItem, { zIndex: 999 }]}>
            <Text style={styles.sb_subTitle}>您想要的区域是？</Text>
            <ChoiceAreaWrapper regionSelectedValues={state.regionSelectedValues}
              onConfirm={regionOnConfirm} />
          </View>

          {/**商铺类型*/}
          <View style={styles.sb_contentItem}>
            <Text style={styles.sb_subTitle}>期望的商铺类型？</Text>
            <LabelGroup selectValues={[defaultState.defaultShopType]}
              minSize={1}
              flex={true}
              data={house_type}
              onchange={(selectValues: any) => labelSelectedOnchange(selectValues, 'shopType')} />
          </View>

          {/**面积*/}
          <View style={styles.sb_contentItem}>
            <Text style={styles.sb_subTitle}>期望的面积？</Text>
            <LabelGroup data={search_shops_area}
              multiple={true}
              flex={true}
              onchange={(selectValues: any) => labelSelectedOnchange(selectValues, 'area')} />
          </View>

          {/**特色铺类型*/}
          <View style={styles.sb_contentItem}>
            <Text style={styles.sb_subTitle}>期望的特色铺类型？</Text>
            <LabelGroup flex={true}
              data={FEATURE_TYPE}
              onchange={(selectValues: any) => labelSelectedOnchange(selectValues, 'featureType1')} />
          </View>

          <TouchableOpacity activeOpacity={0.8} onPress={search} style={styles.sb_searchBtn}>
            <Text style={styles.sb_searchBtnText}>帮忙找铺</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
};

const mapStateToProps = (props: any) => {

  const { dictionaries, config, projectLocation } = props;
  return { dictionaries, config, projectLocation }
};

export default connect(mapStateToProps)(SearchBuilding);
