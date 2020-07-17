/**
 * @author: zxs
 * @date: 2020/6/11
 */
import styles from "@/pages/personal/businessCard/chooseBuilding/styles";
import {Image, Text, TouchableOpacity, View} from "react-native";
import Label from "@/components/new-space/components/Label";
import React, {useEffect, useRef, useState} from "react";
import {BuildingItemPropsType, OnSelectedParamsType} from "@/pages/personal/businessCard/types";
import {Toast} from "@new-space/teaset";
import { scaleSize } from "@/utils/screenUtil";
import {Commission} from "@/businessComponents/commission";

const default_img = require('../../../../images/defaultImage/default_2.png');
const checkbox_1 = require('../../../../images/icons/checkbox_1.png');
const checkbox_2 = require('../../../../images/icons/checkbox_2.png');

const BuildingItem = ({
                        onSelected,
                        data,
                        selectedIds
                      }: BuildingItemPropsType) => {

  const [checked, setChecked] = useState(() => {
    return selectedIds.includes(data.buildingTreeId)
  });
  let renderCount = useRef(0);

  useEffect(() => {
    //阻止初始化时调用
    if (renderCount.current++) {
      const params: OnSelectedParamsType = {
        id: data.buildingTreeId,
        selected: checked
      };
      onSelected && onSelected(params);
    }
  }, [checked]);

  const _onSelected = () => {
    if (selectedIds.length >= 3 && !selectedIds.includes(data.buildingTreeId)) {
      Toast.message('最多选择3个');
      return
    }
    setChecked(prevState => !prevState);
  };

  const checkboxSource = checked ? checkbox_2 : checkbox_1;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={_onSelected} style={styles.cb_building_item_wrapper}>
      <View style={styles.cb_building_image_wrapper}>
        <Image style={styles.cb_building_image} source={{uri: data.buildIcon}} defaultSource={default_img}/>
        <Image source={checkboxSource} style={styles.cb_building_image_checkbox}/>
      </View>
      <View style={styles.cb_building_info}>
        <View style={styles.cb_building_row}>
          <Text style={styles.cb_building_name} numberOfLines={1}>{data.buildingTreeName}</Text>
          <Label.TreeCategory _key={data.treeCategory}/>
        </View>
        <View style={styles.cb_building_row}>
          <Text style={styles.cb_building_price} numberOfLines={1}>{data.minPrice}万/套起</Text>
          <Text style={styles.cb_building_number}>剩余{data.surplusShopNumber}/{data.sumShopNumber}套</Text>
        </View>
        <View style={styles.cb_building_row}>
          <Text style={styles.cb_building_area} numberOfLines={1}>{data.district}{data.area}｜建面{data.minArea}-{data.maxArea}㎡</Text>
        </View>
        <View style={styles.cb_building_row}>
          <Label.SoloBuilding isSolo={data.projectType === 1}/>
          <Commission commission={data.commission}/>
        </View>
      </View>
    </TouchableOpacity>
  )
};

export default BuildingItem
