/**
 * @author: zxs
 * @date: 2020/6/11
 */
import styles from "@/pages/personal/businessCard/chooseBuilding/styles";
import {Image, Text, TouchableOpacity, View} from "react-native";
import Label from "@/components/new-space/components/Label";
import React, {useEffect, useRef, useState} from "react";
import {OnSelectedParamsType, ShopItemPropsType} from "@/pages/personal/businessCard/types";
import {Toast} from "@new-space/teaset";
import {Commission} from "@/businessComponents/commission";

const default_img = require('../../../../images/defaultImage/default_2.png');
const checkbox_1 = require('../../../../images/icons/checkbox_1.png');
const checkbox_2 = require('../../../../images/icons/checkbox_2.png');

const ShopItem = ({
                    onSelected,
                    data,
                    selectedIds
                  }: ShopItemPropsType) => {

  const [checked, setChecked] = useState(() => {
    return selectedIds.includes(data.shopId)
  });
  let renderCount = useRef(0);

  useEffect(() => {
    //阻止初始化时调用
    if (renderCount.current++) {
      const params: OnSelectedParamsType = {
        id: data.shopId,
        selected: checked
      };
      onSelected && onSelected(params);
    }
  }, [checked]);

  const _onSelected = () => {
    if (selectedIds.length >= 3 && !selectedIds.includes(data.shopId)) {
      Toast.message('最多选择3个');
      return
    }
    setChecked(prevState => !prevState);
  };

  const checkboxSource = checked ? checkbox_2 : checkbox_1;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={_onSelected} style={styles.cb_building_item_wrapper}>
      <View style={styles.cb_building_image_wrapper}>
        <Image style={styles.cb_building_image} source={{uri: data.shopUrl}} defaultSource={default_img}/>
        <Image source={checkboxSource} style={styles.cb_building_image_checkbox}/>
      </View>
      <View style={styles.cb_building_info}>
        <View style={styles.cb_building_row}>
          <Text style={styles.cb_shop_name} numberOfLines={1}>{data.shopName}</Text>
          <Label.ShopCategoryType _key={data.shopCategoryType}/>
        </View>
        <View style={styles.cb_building_row}>
          <Text style={styles.cb_building_price} numberOfLines={1}>{data.totalPrice}万</Text>
          <Text style={styles.cb_building_unitPrice} numberOfLines={1}>| {data.unitPrice}元/㎡</Text>
        </View>
        <View style={styles.cb_building_row}>
          <Text style={styles.cb_building_area} numberOfLines={1}>{data.districtName}{data.areaName}｜建面{data.buildingArea}㎡</Text>
        </View>
        <View style={styles.cb_building_row}>
          <Commission commission={data.commission}/>
        </View>
        <View style={styles.cb_building_row}>
          <Text style={styles.cb_shop_building_name_line}/><Text style={styles.cb_shop_building_name} numberOfLines={1}>{data.buildingTreeName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
};

export default ShopItem
