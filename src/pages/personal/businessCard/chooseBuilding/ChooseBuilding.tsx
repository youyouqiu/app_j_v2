/**
 * @author: zxs
 * @date: 2020/6/10
 */
import React, {useEffect, useMemo, useRef, useState} from "react";
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
import Page from "@/components/Page";
import styles from './styles'
import BuildingItem from "@/pages/personal/businessCard/components/BuildingItem";
import {
  BuildingDetailType,
  ChooseBuildingPropsType,
  ChooseBuildingStateType,
  CommonType,
  RequestDataType
} from "@/pages/personal/businessCard/chooseBuilding/types";
import businessCardService from "@/services/businessCardService/businessCardService";
import {connect, useSelector} from "react-redux";
import {OnSelectedParamsType} from "@/pages/personal/businessCard/types";
import {Toast} from "@new-space/teaset";
import navigation from "@/utils/navigation";
import {debounceLast} from "@/utils/utils";
import StoreState from "@/models/types";

const searchH = require('../../../../images/icons/seachH.png');

const defaultState: ChooseBuildingStateType = {
  activeKey: -1,
  selectedIds: [],
  groupCategory: [],
  buildingList: [],
  refreshing: false,
  searchText: ''
};

const defaultCommon: CommonType = {
  hasMore: true,
  fetchFlag: false,
};

const defaultRequestData: RequestDataType = {
  city: '',
  groupType: 0,
  pageSize: 10,
  pageIndex: 0
};

const ChooseBuilding = ({
                          businessCard,
                          projectLocation,
                          dispatch
                        }: ChooseBuildingPropsType) => {

  const [state, setState] = useState<ChooseBuildingStateType>(() => {
    const _selectedIds: Array<string> = businessCard.buildingList.map((v) => v.buildingTreeId);
    return {
      ...defaultState,
      selectedIds: _selectedIds || []
    }
  });
  const renderCount = useRef(0);
  const common = useRef({...defaultCommon});
  const {userInfo} = useSelector((s: StoreState) => s.user);

  const requestData = useMemo<RequestDataType>(() => {
    return {
      ...defaultRequestData,
      city: userInfo?.city || ''
    }
  }, []);

  useEffect(() => {
    getBuildingGroupTypes();
  }, []);

  useEffect(() => {
    if (renderCount.current++) {
      state.activeKey && getBuildingByGroupType();
    }
  }, [state.activeKey]);

  useEffect(() => {
    state.searchText !== '' && getBuildingByGroupType();
  }, [state.searchText]);

  useEffect(() => {
    state.refreshing && getBuildingByGroupType();
  }, [state.refreshing]);

  /**获取分类*/
  const getBuildingGroupTypes = async () => {
    const res = await businessCardService.getBuildingGroupTypes(requestData.city).catch(err => {
      console.error('groupCategory_err', err)
    });
    if (res.code === '0') {
      const newExtension = res.extension.filter((v: any) => v.groupNumber > 0);
      setState(prevState => ({
        ...prevState,
        groupCategory: res.extension,
        activeKey: newExtension[0]?.groupType,
      }))
    }
  };

  /**根据分类获取楼盘列表*/
  const getBuildingByGroupType = async () => {
    requestData.groupType = state.activeKey;
    const res = await businessCardService.getBuildingByGroupType(requestData).catch(err => {
      console.error('getBuildingByGroupType', err)
    });
    if (res.code === '0') {
      common.current.hasMore = [...state.buildingList, ...res.extension].length < res.totalCount;
      common.current.fetchFlag = true;
      setState(prevState => ({
        ...prevState,
        buildingList: [...prevState.buildingList, ...res.extension],
        refreshing: false,
      }));
    }
  };

  /**分类切换*/
  const changeTab = (key: number) => {
    if (state.activeKey === key) return;
    setState(prevState => ({
      ...prevState,
      activeKey: key,
      buildingList: [],
    }));
    requestData.groupType = key;
    requestData.pageIndex = 0;
    common.current.hasMore = true
  };

  /**楼盘选择*/
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

  const submitSelectedBuilding = async () => {
    const requestData = state.selectedIds.map((v, i) => ({sourceId: v, sort: i}));
    const res = await businessCardService.saveSelectedBuilding(requestData).catch(err => {
      console.error('submitSelectedBuilding', err)
    });
    if (res.code === '0') {
      Toast.message('添加成功');
      dispatch({type: 'businessCard/getSelectedBuildingAsync'});
      navigation.goBack()
    }
  };

  /**上拉加载*/
  const onEndReached = () => {
    if (common.current.hasMore && common.current.fetchFlag && state.buildingList.length > 0) {
      common.current.fetchFlag = false;
      requestData.pageIndex = requestData.pageIndex + 1;
      getBuildingByGroupType();
    }
  };

  /**刷新*/
  const onRefresh = () => {
    setState(prevState => ({
      ...prevState,
      refreshing: true,
      buildingList: [],
      selectedIds: []
    }));
    requestData.pageIndex = 0;
    common.current.hasMore = true
  };

  /**搜索*/
  const gotoSearchBuilding = () => {
    navigation.navigate('SearchCardBuilding', {type: 'building', selectedIds: state.selectedIds})
  };

  const renderItem: ListRenderItem<BuildingDetailType> = ({item}) => {
    return <BuildingItem selectedIds={state.selectedIds} data={item} onSelected={onSelected}/>
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
      <Page scroll={false} title='选择楼盘'>
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
                <Text onPress={() => changeTab(v.groupType)} key={i}
                      style={[styles.cb_left_btn, state.activeKey === v.groupType ? styles.cb_left_btn_active : null]}>
                  {v.groupName}({v.groupNumber})
                </Text>
              ) : null
            ))}
          </View>
          <View style={styles.cb_right_content}>
            <FlatList<BuildingDetailType> data={state.buildingList}
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
        <TouchableOpacity style={styles.cb_footer_touch} activeOpacity={0.8} onPress={submitSelectedBuilding}>
          <Text style={styles.cb_footer_text}>提交选中的{state.selectedIds.length}/3个楼盘</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};


const mapStateToProps = ({projectLocation, businessCard}: any) => {
  return {businessCard, projectLocation}
};
export default connect(mapStateToProps)(ChooseBuilding)
