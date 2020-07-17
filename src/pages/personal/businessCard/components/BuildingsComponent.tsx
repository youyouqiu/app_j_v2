/**
 * @author: zxs
 * @date: 2020/6/9
 */
import React, {useEffect, useRef, useState} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import Header from "./Header";
import AddArea from "@/pages/personal/businessCard/components/AddArea";
import styles from '../styles'
import Label from "@/components/new-space/components/Label";
import navigation from "@/utils/navigation";
import {connect} from "react-redux";
import {BuildingsComponentPropsType, BuildingsComponentStateType} from "@/pages/personal/businessCard/types";
import businessCardService from "@/services/businessCardService/businessCardService";
import {Toast} from "@new-space/teaset";

const default_img = require('../../../../images/defaultImage/default_2.png');
const edit_white = require('../../../../images/icons/edit_white.png');
const delete_red = require('../../../../images/icons/delete_red.png');
const featureIcon = require('../../../../images/icons/featureIcon.png');

const defaultState: BuildingsComponentStateType = {
  buildingList: []
};

const BuildingsComponent = ({
                              dispatch,
                              businessCard
                            }: BuildingsComponentPropsType) => {

  const [state, setState] = useState(defaultState);
  const renderCount = useRef(0);

  useEffect(() => {
    if (renderCount.current++) {
      setState(prevState => ({
        ...prevState,
        buildingList: businessCard.buildingList || []
      }))
    }
  }, [businessCard.buildingList]);

  useEffect(() => {
    getSelectedBuilding();
  }, []);

  const getSelectedBuilding = () => {
    dispatch({type: 'businessCard/getSelectedBuildingAsync'})
  };

  const editBuilding = (id: string) => {
    navigation.navigate('editComponent', {id, type: 'building'})
  };

  const deleteBuilding = async (id: string, buildingTreeId: string) => {
    const res = await businessCardService.deleteSelectedBuilding(id).catch(err => {
      Toast.message('删除失败')
    });
    if (res.code === '0') {
      Toast.message('删除成功');
      dispatch({
        type: 'businessCard/businessCardSelectedBuildings',
        payload: buildingTreeId
      });
      getSelectedBuilding()
    }
  };

  return (
    <View style={styles.bc_recommend_wrapper}>
      <Header title='选择楼盘' length={state?.buildingList?.length || 0}/>
      <View style={styles.bc_recommend_content}>
        {state?.buildingList?.map((v, i) => (
          <View style={styles.bc_recommend_building_detail}>

            <View style={styles.bc_recommend_building_image_wrapper}>
              <Image source={{uri: v.buildIcon}} defaultSource={default_img} style={styles.bc_recommend_building_image}/>
              <View style={styles.bc_recommend_building_footer}>
                <TouchableOpacity style={styles.bc_recommend_building_footer_row}
                                  activeOpacity={0.8}
                                  onPress={() => editBuilding(v.id)}>
                  <Image source={edit_white} style={styles.bc_recommend_building_footer_icon}/>
                  <Text style={styles.bc_recommend_building_edit_text}>编辑</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bc_recommend_building_footer_row} activeOpacity={0.8}
                                  onPress={() => deleteBuilding(v.id, v.buildingTreeId)}>
                  <Image source={delete_red} style={styles.bc_recommend_building_footer_icon}/>
                  <Text style={styles.bc_recommend_building_delete_text}>删除</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.bc_recommend_detail_right}>
              <View style={styles.bc_recommend_detail_row}>
                <Text style={styles.bc_recommend_building_name} numberOfLines={1}>{v.buildingTreeName}</Text>
              </View>
              <View style={styles.bc_recommend_detail_row}>
                <Text style={styles.bc_recommend_building_price} numberOfLines={1}>{v.minPrice}万/套起</Text>
              </View>
              <View style={styles.bc_recommend_detail_row}>
                <Text style={styles.bc_recommend_building_area} numberOfLines={1}>
                  建面{v.minArea}-{v.maxArea}㎡ | {v.district}{v.area}
                </Text>
              </View>
              <View style={styles.bc_recommend_detail_row}>
                <Label.TreeCategory _key={v.treeCategory}/>
                {v?.labels?.map((v) => <Label style={styles.bc_label_style} textStyle={styles.bc_label_text_style} _key={v}/>)}
              </View>
              {v.featureLabels?.length > 0 ? (
                <View style={styles.bc_recommend_detail_row}>
                  <Image source={featureIcon} style={styles.bc_recommend_feature_labels_icon}/>
                  {v.featureLabels?.map((v) => (
                    <Text style={styles.bc_recommend_feature_labels_text}>{v}</Text>
                  ))}
                </View>
              ) : null}

            </View>

          </View>
        ))}
        {state?.buildingList?.length < 3 ? <AddArea path='building' title='添加推广房源'/> : null}
      </View>
    </View>
  )
};

const mapStateToProps = ({businessCard}: any) => {
  return {businessCard}
};
export default connect(mapStateToProps)(BuildingsComponent)

