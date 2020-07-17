/**
 * @author: zxs
 * @date: 2020/6/24
 */
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  View
} from "react-native";
import React, {useEffect, useMemo, useRef, useState} from "react";
import styles from './styles'
import BuildingItem from "@/pages/personal/businessCard/searchCardBuilding/buildingItem";
import api from '../../../../services/building/buildingList'
import {connect, useSelector} from "react-redux";
import StoreState from "@/models/types";
import {
  SearchCardBuildingCommonType,
  SearchCardBuildingPropsType,
  SearchCardBuildingResultType,
  SearchCardBuildingStateType
} from "@/pages/personal/businessCard/searchCardBuilding/types";
import dataFormat from "@/pages/personal/businessCard/searchCardBuilding/dataFormat";
import NoData from "@/businessComponents/noData";
import {Toast} from "@new-space/teaset";
import {searchBuildingService} from "@/services/searchBuildingService";
import businessCardService from "@/services/businessCardService/businessCardService";

const searchCus = require('../../../../images/icons/searchCus.png');
const cleanInput = require('../../../../images/icons/cleanInput.png');

const defaultState: SearchCardBuildingStateType = {
  inputText: '',
  list: [],
  refreshing: false,
  selectedIds: [],
  type: '',
  searchRandom: Math.random()
};

const defaultRequestData = {
  keyWord: '',
  city: '',
  pageIndex: 0,
  pageSize: 10
};

const defaultCommon: SearchCardBuildingCommonType = {
  hasMore: true,
  showEmptyComponent: false
};


const SearchCardBuilding = ({
                              navigation,
                              dispatch
                            }: SearchCardBuildingPropsType) => {

  const {userInfo = {}} = useSelector((state: StoreState) => state.user);

  const [state, setState] = useState<SearchCardBuildingStateType>(() => {
    return {
      ...defaultState,
      selectedIds: navigation?.state?.params?.selectedIds,
      type: navigation?.state?.params?.type,
    }
  });

  const requestData = useMemo(() => {
    return {
      ...defaultRequestData,
      city: userInfo.city
    }
  }, []);

  const common = useMemo(() => defaultCommon, []);

  useEffect(() => {
    getBuildingOrShopList()
  }, [state.searchRandom]);

  useEffect(() => {
    state.refreshing && getBuildingOrShopList();
  }, [state.refreshing]);

  const getBuildingOrShopList = async () => {
    let res: any = null;
    if (state.type === 'building') {
      res = await api.postBuildingList(requestData).catch(err => {
        console.log('getBuildingOrShopList_err', err)
      });
    } else {
      res = await searchBuildingService.detectiveSeek(requestData).catch(err => {
        console.log('getBuildingOrShopList_err', err)
      });
    }
    if (res && res.code === '0') {
      common.hasMore = res.pageSize * (res.pageIndex + 1) < res.totalCount;
      common.showEmptyComponent = [...state.list, res.extension].length === 0;
      setState(prevState => ({
        ...prevState,
        list: [...prevState.list, ...res.extension],
        refreshing: false
      }));
    }
  };

  const onChangeText = (text: string) => {
    setState(prevState => ({
      ...prevState,
      inputText: text
    }))
  };

  /**搜索*/
  const onSubmitEditing = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    requestData.keyWord = e.nativeEvent.text;
    common.hasMore = true;
    common.showEmptyComponent = false;
    setState(prevState => ({
      ...prevState,
      list: [],
      searchRandom: Math.random()
    }))
  };

  const cleanInputText = () => {
    setState(prevState => ({
      ...prevState,
      inputText: ''
    }))
  };

  /**刷新*/
  const _onRefresh = () => {
    requestData.pageIndex = 0;
    setState(prevState => ({
      ...prevState,
      refreshing: true,
      list: []
    }))
  };

  /**上拉加载*/
  const _onEndReached = () => {
    if (common.hasMore && !state.refreshing) {
      requestData.pageIndex++;
      getBuildingOrShopList()
    }
  };

  const _onChange = (id: string) => {
    if (state.selectedIds.includes(id)) {
      setState(prevState => ({
        ...prevState,
        selectedIds: prevState.selectedIds.filter((v) => v !== id)
      }))
    } else {
      if (state.selectedIds.length >= 3) {
        Toast.message('最多选择3个');
      } else {
        setState(prevState => ({
          ...prevState,
          selectedIds: [...prevState.selectedIds, id]
        }))
      }
    }
  };

  const submitSelectedBuildingOrShop = async () => {
    let res: any;
    const requestData = state.selectedIds.map((v, i) => ({sourceId: v, sort: i}));
    if (state.type === 'building') {
      res = await businessCardService.saveSelectedBuilding(requestData).catch(err => {
        console.error('submitSelectedBuilding', err)
      });
    } else {
      res = await businessCardService.saveSelectedShop(requestData).catch(err => {
        console.error('submitSelectedBuilding', err)
      });
    }
    if (res && res.code === '0') {
      state.type === 'building' ? dispatch({type: 'businessCard/getSelectedBuildingAsync'}) : dispatch({type: 'businessCard/getSelectedShopAsync'});
      Toast.message('添加成功');
      navigation.navigate('businessCard')
    }
  };

  const gotoBack = () => {
    navigation.goBack()
  };

  const _listFooterComponent = () => {
    if (state.refreshing) return null;
    let content;
    if (common.hasMore) {
      content = <View style={styles.scb_footer_loading}><ActivityIndicator/><Text>&emsp;加载中</Text></View>;
    } else {
      content = <View style={styles.scb_footer_loading}><Text>无更多数据</Text></View>;
    }
    return content
  };

  const _renderItem: ListRenderItem<SearchCardBuildingResultType> = ({item}) => {
    const newData = dataFormat(item);
    return <BuildingItem data={newData} checked={state.selectedIds.includes(newData.id)} onChange={_onChange}/>
  };

  return (
    <View style={styles.scb_wrapper}>
      <View style={styles.scb_container}>
        <View style={styles.scb_header}>
          <View style={styles.scb_header_content}>
            <Image style={styles.scb_header_icon} source={searchCus}/>
            <TextInput style={styles.scb_header_input}
                       returnKeyType='done'
                       returnKeyLabel='确定'
                       value={state.inputText}
                       onChangeText={onChangeText}
                       onSubmitEditing={onSubmitEditing}
                       placeholder='输入铺号、商铺名称'/>
            <TouchableOpacity onPress={cleanInputText}>
              <Image style={styles.scb_header_icon} source={cleanInput}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.scb_header_cancel} onPress={gotoBack}>取消</Text>
        </View>

        <View style={styles.scb_content}>
          <FlatList data={state.list}
                    refreshing={state.refreshing}
                    keyExtractor={(item) => item.shopId || item.buildingTreeId}
                    onRefresh={_onRefresh}
                    onEndReachedThreshold={0.1}
                    onEndReached={_onEndReached}
                    ListEmptyComponent={common.showEmptyComponent ? <NoData/> : null}
                    ListFooterComponent={common.showEmptyComponent ? null : _listFooterComponent}
                    renderItem={_renderItem}/>
        </View>

        <View style={styles.scb_footer}>
          <TouchableOpacity style={styles.scb_footer_touch} activeOpacity={0.8} onPress={submitSelectedBuildingOrShop}>
            <Text style={styles.scb_footer_text}>提交选中的{state.selectedIds.length}/3个楼盘</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};

const mapStateToProps = () => {
  return {}
};
export default connect(mapStateToProps)(SearchCardBuilding)

