/**
 * @author: zxs
 * @date: 2020/4/27
 */
import React, {useEffect, useMemo, useState} from "react";
import {ActivityIndicator, FlatList, Image, ListRenderItem, ScrollView, Text, TouchableOpacity, View} from "react-native";
import Page from "@/components/Page";
import styles from './styles'
import {
  ISearchRequestType,
  ISearchResultCommonType,
  ISearchResultPropsTypes,
  ISearchResultResponseType,
  ISearchResultStateType,
  IshopAreasType,
  IShopPriceType
} from "@/pages/workbench/searchBuilding/types/index";
import {connect} from "react-redux";
import ChoicePrice from "@/businessComponents/choice/priceChoice/priceChoice";
import {searchBuildingService} from "@/services/searchBuildingService";
import {ResponsePagination} from "@/services/typings/types";
import Label from "@/components/new-space/components/Label";
import PriceChoiceModal from "@/businessComponents/choice/priceChoice/priceChoiceModal";
import AreaChoiceModal from "@/businessComponents/choice/areaChoice/areaChoiceModal";
import {IModalPriceChoiceOnChangeType} from "@/businessComponents/choice/priceChoice/types";
import {IChoiceLabelDataPropsType} from "@/businessComponents/LabelGroup/types";
import ChoiceArea from "@/businessComponents/choice/areaChoice/areaChoice";
import RegionChoiceModal from "@/businessComponents/choice/choiceRegion/regionChoiceModal";
import RegionChoice from "@/businessComponents/choice/choiceRegion/regionChoice";
import {IRegionType} from "@/businessComponents/choice/choiceRegion/types";
import NoData from "@/businessComponents/noData";
import {Commission} from "@/businessComponents/commission";
import LabelSelector from "@/components/LabelSelector";
import LabelCheckBox from "@/components/LabelCheckBox";
import {FEATURE_SELECTION, SHOP_TYPE_SELECTION} from "@/pages/workbench/searchBuilding/constant";
import BuryPoint from '@/utils/BuryPoint';


const buildingImg = require('../../../../images/pictures/building_def.png');
const discountIcon = require('../../../../images/icons/06.png');
const arrowRight_1 = require('../../../../images/icons/arrowRight_1.png');
type TValue = string | number | undefined

const defaultState: ISearchResultStateType = {
  visible: false,
  choiceType: '',
  shopList: [],
  totalPriceSelectValues: [],
  unitPriceSelectValues: [],
  areaSelectValues: [],
  regionSelectedValues: {} as IRegionType,
  refreshing: false,
  fetchRandom: Math.random(),
  regionChoiceLabel: ''
};

const defaultCommon: ISearchResultCommonType = {
  hasMore: true,
  showEmptyComponent: false,
  fetchFlag: true,
};

const SearchResult = ({
                        dictionaries,
                        navigation
                      }: ISearchResultPropsTypes) => {

  const defaultRequestData: ISearchRequestType = navigation?.state?.params?.requestData;
  const regionSelectedValues: IRegionType = navigation?.state?.params?.regionSelectedValues;

  const [newState, setNewState] = useState<ISearchResultStateType>(() => {

    const {shopAreas} = defaultRequestData;

    const areaSelectValues: Array<IChoiceLabelDataPropsType> = [];
    const totalPriceSelectValues: Array<IChoiceLabelDataPropsType> = [];
    const unitPriceSelectValues: Array<IChoiceLabelDataPropsType> = [];

    //初始化选中建面和处理多少平以上这种数据
    if (shopAreas.length > 0) {
      defaultRequestData.shopAreas = shopAreas.map((v) => {
        if (v.maxArea) {
          areaSelectValues.push({
            value: v.minArea + '-' + v.maxArea,
            label: dictionaries.search_shops_area_obj[v.minArea + '-' + v.maxArea]
          });
          return v;
        } else {
          areaSelectValues.push({
            value: v.minArea,
            label: dictionaries.search_shops_area_obj[v.minArea]
          });
          return {
            minArea: v.minArea,
            maxArea: 0x7fffffff
          }
        }
      });
    }


    //区域处理
    let regionChoiceLabel = '区域';
    if (regionSelectedValues.district || regionSelectedValues.area?.length > 0) {
      regionChoiceLabel = regionSelectedValues.regionText.join(',')
    }
    return {
      ...defaultState, areaSelectValues, totalPriceSelectValues, unitPriceSelectValues, regionSelectedValues, regionChoiceLabel
    }
  });

  const requestData = useMemo(() => defaultRequestData, []);

  const common = useMemo(() => ({...defaultCommon}), []);

  useEffect(() => {
    getShopList();
  }, [newState.fetchRandom]);

  const getShopList = async () => {
    console.log('requestData', {...requestData});
    const response: ResponsePagination<Array<ISearchResultResponseType>> = await searchBuildingService.detectiveSeek(requestData);
    console.log('getShopList', {...response});
    if (response.code === '0') {
      const {extension, totalCount, pageIndex, pageSize} = response;
      common.hasMore = pageSize * (pageIndex + 1) < totalCount;
      common.showEmptyComponent = [...newState.shopList, ...extension].length === 0;
      common.fetchFlag = true;
      setNewState((prevState: any) => ({
        ...newState,
        refreshing: false,
        shopList: [...prevState.shopList, ...extension]
      }));
    }
  };

  /**价格处理-确认*/
  const priceOnConfirm = (params: IModalPriceChoiceOnChangeType) => {
    const {total, unit} = params;
    if (total.length > 0) {
      const _shopTotalPrices: Array<IShopPriceType> = [];
      total.map((v) => {
        const valueArr = v.value.toString().split('-');
        //处理多少平以上这种数据
        if (valueArr.length === 2) {
          const shopTotalPrice: IShopPriceType = {
            minPrice: parseFloat(valueArr[0]),
            maxPrice: parseFloat(valueArr[1])
          };
          _shopTotalPrices.push(shopTotalPrice)
        } else {
          const shopTotalPrice: IShopPriceType = {
            minPrice: parseFloat(valueArr[0]),
            maxPrice: 0x7fffffff
          };
          _shopTotalPrices.push(shopTotalPrice)
        }
      });
      requestData.shopTotalPrices = _shopTotalPrices
    } else {
      requestData.shopTotalPrices = []
    }
    if (unit.length > 0) {
      const _shopUnitPrices: Array<IShopPriceType> = [];
      unit.map((v) => {
        const valueArr = v.value.toString().split('-');
        //处理多少平以上这种数据
        if (valueArr.length === 2) {
          const shopUnitPrice: IShopPriceType = {
            minPrice: parseFloat(valueArr[0]) * 10000,
            maxPrice: parseFloat(valueArr[1]) * 10000
          };
          _shopUnitPrices.push(shopUnitPrice)
        } else {
          const shopUnitPrice: IShopPriceType = {
            minPrice: parseFloat(valueArr[0]) * 10000,
            maxPrice: 0x7fffffff
          };
          _shopUnitPrices.push(shopUnitPrice)
        }

      });
      requestData.shopUnitPrices = _shopUnitPrices
    } else {
      requestData.shopUnitPrices = []
    }
    const updateState = {
      totalPriceSelectValues: params.total,
      unitPriceSelectValues: params.unit,
      shopList: []
    };
    updater(updateState);
  };

  /**地区处理-确定*/
  const regionOnConfirm = async (params: IRegionType) => {
    //对选择'全部'做处理
    requestData.district = params.district?.includes('_0') ? '' : params.district;
    requestData.areas = params.area[0]?.includes('_0') ? [] : params.area;
    requestData.pageIndex = 0;
    const updateState = {
      regionSelectedValues: params,
      shopList: []
    };
    updater(updateState);
  };

  /**面积处理-确定*/
  const areaOnConfirm = (params: Array<IChoiceLabelDataPropsType>) => {
    const shopAreas = [] as Array<IshopAreasType>;
    params.map((v, i) => {
      const shopAreasItemArr: Array<string> = v.value.toString().split('-');
      const shopAreasItem: IshopAreasType = {
        minArea: parseFloat(shopAreasItemArr[0]),
        maxArea: parseFloat(shopAreasItemArr[1] || 0x7fffffff.toString())
      };
      shopAreas.push(shopAreasItem);
    });
    defaultRequestData.shopAreas = shopAreas;
    const updateState = {
      areaSelectValues: params,
      shopList: []
    };
    updater(updateState);
  };

  /**刷新*/
  const _onRefresh = async () => {
    const updateState = {
      shopList: [],
      refreshing: true
    };
    updater(updateState);
  };

  /**Label筛选*/
  const choiceLabelsOnChange1 = (params: { name?: string, value: TValue | boolean }) => {
    const {name, value} = params;
    if (name === 'shopType') {
      shopTypeLabelBP(value as number);
      requestData.shopType = value as number
    } else if (name === 'featureType') {
      featureTypeLabelBP(value as number);
      requestData.featureType1 = value
    }
    const updateState = {
      shopList: [],
      refreshing: true
    };
    updater(updateState);
  };

  /**Label筛选*/
  const choiceLabelsOnChange2 = (params: { name?: string, value: TValue | boolean }) => {
    const {name, value} = params;
    if (name === 'height') {
      if (value) {
        requestData.featureType2.push(1)
      } else {
        requestData.featureType2 = requestData.featureType2.filter((v) => v !== 1)
      }
      value && labelBP('佣金高');
    } else if (name === 'prize') {
      if (value) {
        requestData.featureType2.push(4)
      } else {
        requestData.featureType2 = requestData.featureType2.filter((v) => v !== 4)
      }
      value && labelBP('现金奖');
    } else if (name === 'discount') {
      if (value) {
        requestData.featureType2.push(3)
      } else {
        requestData.featureType2 = requestData.featureType2.filter((v) => v !== 3)
      }
      value && labelBP('有优惠');
    }
    const updateState = {
      shopList: [],
      refreshing: true
    };
    updater(updateState);
  };

  /**label 埋点*/
  const labelBP = (labelName: string) => {
    BuryPoint.add({
      page: '侦探寻铺结果页',
      target: '第二层标签_button',
      action_param: {labelName},
    })
  };

  /**label-shopType 埋点*/
  const shopTypeLabelBP = (value: number) => {
    BuryPoint.add({
      page: '侦探寻铺结果页',
      target: '第二层标签_button',
      action_param: {
        labelName: SHOP_TYPE_SELECTION.find(i => i.value === value)?.label,
      },
    })
  };

  /**label-featureType 埋点*/
  const featureTypeLabelBP = (value?: number) => {
    if (!value) return
    BuryPoint.add({
      page: '侦探寻铺结果页',
      target: '第二层标签_button',
      action_param: {
        labelName: FEATURE_SELECTION.find(i => i.value === value)?.label,
      },
    })
  };

  const updater = (updateState: any) => {
    common.hasMore = true;
    common.showEmptyComponent = false;
    requestData.pageIndex = 0;
    setNewState((prevState: ISearchResultStateType) => ({
        ...prevState,
        ...updateState,
        fetchRandom: Math.random()
      }
    ))
  };


  /**
   * fetchFlag:防止_onEndReached多次调用
   * shopList：防止数据从有到无时调用（例如刷新）
   * @private
   */
  const _onEndReached = () => {
    if (!common.hasMore || !common.fetchFlag || newState.shopList.length === 0) return;
    requestData.pageIndex++;
    common.fetchFlag = false;
    getShopList()
  };

  const _listFooterComponent = () => {
    if (newState.refreshing) return null;
    let content;
    if (common.hasMore) {
      content = <View style={styles.sr_listFooter_loading}><ActivityIndicator/><Text>&emsp;加载中</Text></View>;
    } else {
      content = <View style={styles.sr_listFooter_loading}><Text>无更多数据</Text></View>;
    }
    return content
  };

  /**跳转商铺详情*/
  const gotoShopDetail = (data: ISearchResultResponseType) => {
    BuryPoint.add({
      page: '侦探寻铺结果页',
      target: '查看单铺_button',
    })
    navigation.navigate('shopDetail', {shopId: data.shopId, buildingTreeId: data.buildingTreeId})
  };

  /**跳转期组详情*/
  const gotoProjectDetail = (data: ISearchResultResponseType) => {
    navigation.navigate('buildingDetail', {buildingTreeId: data.buildingTreeId})
  };

  const _renderItem: ListRenderItem<ISearchResultResponseType> = ({item}) => {
    const imageSource = item.shopUrl ? {uri: item.shopUrl} : buildingImg;
    return (
      <TouchableOpacity style={styles.sr_item_wrapper} onPress={() => gotoShopDetail(item)}>
        <View>
          <Image style={styles.sr_shop_img} source={imageSource} defaultSource={buildingImg}/>
          {item.discounts ? (
            <Image style={styles.sr_shop_discount_icon} source={discountIcon}/>
          ) : null}
        </View>
        <View style={styles.sr_shop_info}>
          <View style={styles.sr_shop_name_content}>
            <Text style={styles.sr_shop_name} numberOfLines={1}>{item.shopName}</Text>
            <Label.ShopSaleStatus _key={item.saleStatus}/>
            <Label.ShopCategoryType _key={item.shopCategoryType}/>
          </View>
          <View style={styles.sr_shop_price_content}>
            <Text style={styles.sr_shop_price}>
              <Text style={styles.sr_shop_price_value}>{item.totalPrice}</Text>万
            </Text>
            <Text style={styles.sr_shop_price_line}/>
            <Text style={styles.sr_shop_area}>{item.unitPrice}元/㎡</Text>
          </View>
          <Text style={styles.sr_shop_location}>{item.districtName}｜建面{item.buildingArea}㎡</Text>
          <View style={styles.sr_shop_labels}>
            {item.featureLabels.map((v, i) => <Label _key={v} key={i}/>)}
          </View>
          <View style={styles.sr_shop_commission}>
            <Commission commission={item.commission}/>
          </View>
          <TouchableOpacity style={styles.sr_building_info} onPress={() => gotoProjectDetail(item)}>
            <Text style={styles.sr_building_point}/>
            <Text style={styles.sr_building_name} numberOfLines={1}>{item.buildingTreeName}</Text>
            <Text style={styles.sr_building_detail}>查看楼盘</Text>
            <Image style={styles.sr_building_icon} source={arrowRight_1}/>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <Page title='房源列表' scroll={false}>

      <View style={styles.sr_screen_wrapper}>
        <RegionChoiceModal
          label={newState.regionChoiceLabel}
          onConfirm={regionOnConfirm}
          regionSelectedValues={newState.regionSelectedValues}
          content={<RegionChoice/>}/>
        <PriceChoiceModal
          totalPriceSelectValues={newState.totalPriceSelectValues}
          unitPriceSelectValues={newState.unitPriceSelectValues}
          onConfirm={priceOnConfirm}
          label='价格'
          content={<ChoicePrice/>}/>
        <AreaChoiceModal
          areaSelectValues={newState.areaSelectValues}
          onConfirm={areaOnConfirm}
          label='建面'
          content={<ChoiceArea/>}/>
      </View>


      <View style={styles.cl_choice_labels_wrapper}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <LabelSelector selection={SHOP_TYPE_SELECTION}
                         defaultValue={requestData.shopType}
                         name='shopType'
                         separator
                         onChange={choiceLabelsOnChange1}/>

          <LabelSelector selection={FEATURE_SELECTION}
                         name='featureType'
                         separator
                         defaultValue={requestData.featureType1}
                         onChange={choiceLabelsOnChange1}/>

          <LabelCheckBox label='佣金高'
                         name='height'
                         separator
                         onChange={choiceLabelsOnChange2}/>

          <LabelCheckBox label='现金奖'
                         name='prize'
                         separator
                         onChange={choiceLabelsOnChange2}/>

          <LabelCheckBox label='有优惠'
                         name='discount'
                         onChange={choiceLabelsOnChange2}/>
        </ScrollView>
      </View>

      <FlatList
        keyExtractor={(item) => item.shopId}
        data={newState.shopList}
        onRefresh={_onRefresh}
        onEndReached={_onEndReached}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={common.showEmptyComponent ? <NoData/> : null}
        ListFooterComponent={common.showEmptyComponent ? null : _listFooterComponent}
        refreshing={newState.refreshing}
        renderItem={_renderItem}/>

    </Page>
  )
};

const mapStateToProps = ({config, global, dictionaries, point, projectLocation}: any) => {
  return {
    config: config,
    global, dictionaries, projectLocation,
    sendPoint: point.buryingPoint
  }
};

export default connect(mapStateToProps)(SearchResult)

