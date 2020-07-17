/**
 * @author: zxs
 * @date: 2020/6/10
 */
import React, {useEffect, useMemo, useRef, useState} from "react";
import {ActivityIndicator, FlatList, Image, ListRenderItem, Text, TouchableOpacity, View} from "react-native";
import Page from "@/components/Page";
import styles from './styles'
import businessCardService from "@/services/businessCardService/businessCardService";
import {connect, useSelector} from "react-redux";
import {OnSelectedParamsType} from "@/pages/personal/businessCard/types";
import {Toast} from "@new-space/teaset";
import navigation from "@/utils/navigation";
import {
  ChooseShopPropsType,
  ChooseShopStateType,
  GroupCategoryType,
  RequestDataType,
  CommonType,
  ShopDetailType
} from "@/pages/personal/businessCard/chooseShop/types";
import {ResponseCommon} from "@/services/typings/types";
import ShopItem from "@/pages/personal/businessCard/components/ShopItem";
import StoreState from "@/models/types";

const searchH = require('../../../../images/icons/seachH.png');
const defaultState: ChooseShopStateType = {
  activeKey: '',
  selectedIds: [],
  groupCategory: [],
  shopList: [],
  refreshing: false
};

const defaultCommon: CommonType = {
  hasMore: true,
  fetchFlag: false
};

const defaultRequestData: RequestDataType = {
  city: '',
  groupType: 0,
  pageSize: 10,
  pageIndex: 0,
  key: '',
  featureId: ''
};

const ChooseShop = ({
                      businessCard,
                      projectLocation,
                      dispatch
                    }: ChooseShopPropsType) => {

  const [state, setState] = useState<ChooseShopStateType>(() => {
    const _selectedIds: Array<string> = businessCard.shopList.map((v) => v.shopId);
    return {
      ...defaultState,
      selectedIds: _selectedIds || []
    }
  });
  const renderCount = useRef(0);
  const common = useRef({...defaultCommon});
  const {userInfo} = useSelector((s: StoreState) => s.user);
  const requestData = useMemo(() => {
    return {
      ...defaultRequestData,
      city: userInfo.city || ''
    }
  }, []);

  useEffect(() => {
    getShopGroupTypes();
  }, []);

  useEffect(() => {
    if (renderCount.current++) {
      state.activeKey && getShopByGroupType();
    }
  }, [state.activeKey]);

  useEffect(() => {
    state.refreshing && getShopByGroupType();
  }, [state.refreshing]);

  /**获取分类*/
  const getShopGroupTypes = async () => {
    const res: ResponseCommon<Array<GroupCategoryType>> = await businessCardService.getShopGroupTypes(requestData.city).catch(err => {
      console.error('groupCategory_err', err)
    });
    if (res.code === '0') {
      // @ts-ignore
      const newExtension: Array<GroupCategoryType> = res.extension.map((v: GroupCategoryType) => {
        if (v.groupNumber > 0) {
          v.key = v.groupType + '_' + (v.featureId || 0);
          return v
        }
      });
      setState(prevState => ({
        ...prevState,
        groupCategory: newExtension,
        activeKey: newExtension[0].key
      }))
    }
  };

  /**根据分类获取楼盘列表*/
  const getShopByGroupType = async () => {
    const keyArr = state.activeKey.split('_');
    requestData.groupType = parseInt(keyArr[0]);
    requestData.featureId = keyArr[1];
    const res = await businessCardService.getShopByGroupType(requestData).catch(err => {
      console.error('getBuildingByGroupType', err)
    });
    if (res.code === '0') {
      common.current.hasMore = [...state.shopList, ...res.extension].length < res.totalCount;
      common.current.fetchFlag = true;
      setState(prevState => ({
        ...prevState,
        shopList: [...prevState.shopList, ...res.extension],
        refreshing: false,
      }));
    }
  };

  /**分类切换*/
  const changeTab = (key: string) => {
    if (state.activeKey === key) return;
    setState(prevState => ({
      ...prevState,
      activeKey: key,
      shopList: [],
    }));
    requestData.pageIndex = 0;
    common.current.hasMore = true
  };

  /**商铺选择*/
  const onSelected = (params: OnSelectedParamsType) => {
    if (params.selected) {
      setState(prevState => ({
        ...prevState,
        selectedIds: [...prevState.selectedIds, params.id]
      }))
    } else {
      const _selectedIds = state.selectedIds.filter((v) => v !== params.id);
      setState(prevState => ({
        ...prevState,
        selectedIds: _selectedIds
      }))
    }
  };

  /**保存已选择的商铺*/
  const saveSelectedShop = async () => {
    const requestData = state.selectedIds.map((v, i) => ({sourceId: v, sort: i}));
    const res = await businessCardService.saveSelectedShop(requestData).catch(err => {
      console.error('submitSelectedBuilding', err)
    });
    if (res.code === '0') {
      Toast.message('添加成功');
      dispatch({type: 'businessCard/getSelectedShopAsync'});
      navigation.goBack()
    }
  };

  /**上拉加载*/
  const onEndReached = () => {
    if (common.current.hasMore && common.current.fetchFlag && state.shopList.length > 0) {
      common.current.fetchFlag = false;
      requestData.pageIndex = requestData.pageIndex + 1;
      getShopByGroupType();
    }
  };

  /**刷新*/
  const onRefresh = () => {
    setState(prevState => ({
      ...prevState,
      refreshing: true,
      shopList: [],
      selectedIds: []
    }));
    requestData.pageIndex = 0;
    common.current.hasMore = true
  };

  /**搜索*/
  const gotoSearchBuilding = () => {
    navigation.navigate('SearchCardBuilding', {type: 'shop', selectedIds: state.selectedIds})
  };

  const renderItem: ListRenderItem<any> = ({item}) => {
    return <ShopItem selectedIds={state.selectedIds} data={item} onSelected={onSelected}/>
  };

  const listFooterComponent = () => {
    if (state.refreshing) return null;
    if (common.current.hasMore) {
      return <View style={styles.cb_list_footer_wrapper}><ActivityIndicator/></View>
    } else {
      return <View style={styles.cb_list_footer_wrapper}><Text style={styles.cb_list_footer_text}>无更多数据</Text></View>
    }
  };

  return (
    <View style={styles.cb_wrapper}>
      <Page scroll={false} title='选择单铺'>
        <View style={styles.cb_input_wrapper}>
          <View style={styles.cb_input_container}>
            <Image source={searchH} style={styles.cb_input_icon}/>
            <Text style={styles.cb_input} onPress={gotoSearchBuilding}>输入铺号、商铺名称</Text>
          </View>
        </View>
        <View style={styles.cb_container}>
          <View style={styles.cb_left_content}>
            {state.groupCategory.map((v, i) => (
              v.groupNumber > 0 ? (
                <Text onPress={() => changeTab(v.key)} key={i}
                      style={[styles.cb_left_btn, state.activeKey === v.key ? styles.cb_left_btn_active : null]}>
                  {v.groupName}({v.groupNumber})
                </Text>
              ) : null
            ))}
          </View>
          <View style={styles.cb_right_content}>
            <FlatList<ShopDetailType> data={state.shopList}
                                      style={{flex: 1}}
                                      extraData={state}
                                      refreshing={state.refreshing}
                                      onRefresh={onRefresh}
                                      onEndReached={onEndReached}
                                      onEndReachedThreshold={0.1}
                                      ListFooterComponent={listFooterComponent}
                                      keyExtractor={(item, idx) => idx.toString()}
                                      renderItem={renderItem}/>
          </View>
        </View>
      </Page>
      <View style={styles.cb_footer}>
        <TouchableOpacity style={styles.cb_footer_touch} activeOpacity={0.8} onPress={saveSelectedShop}>
          <Text style={styles.cb_footer_text}>提交选中的{state.selectedIds.length}/3个楼盘</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const mapStateToProps = ({projectLocation, businessCard}: any) => {
  return {businessCard, projectLocation}
};
export default connect(mapStateToProps)(ChooseShop)
