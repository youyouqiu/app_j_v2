/**
 * @author: zxs
 * @date: 2020/6/24
 */
import React, {useEffect, useState} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import Label from "@/components/new-space/components/Label";
import style from './styles'
import {BuildingItemPropsType, BuildingItemStateType} from "@/pages/personal/businessCard/searchCardBuilding/types";
import {Commission} from "@/businessComponents/commission";
import styles from "@/pages/personal/businessCard/chooseBuilding/styles";

const default_2 = require('../../../../images/defaultImage/default_2.png');
const checkbox_1 = require('../../../../images/icons/checkbox_1.png');
const checkbox_2 = require('../../../../images/icons/checkbox_2.png');

const defaultState: BuildingItemStateType = {
  checked: false
};

const BuildingItem = ({
                        data,
                        checked,
                        onChange
                      }: BuildingItemPropsType) => {

  const [state, setState] = useState<BuildingItemStateType>(() => {
    return {
      ...defaultState,
      checked
    }
  });

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      checked
    }))
  }, [checked]);

  const checkIcon = state.checked ? checkbox_2 : checkbox_1;

  const checkToggle = () => {
    onChange && onChange(data.id)
  };


  return (
    <View style={style.scb_building_wrapper}>
      <View style={style.scb_building_container}>
        <TouchableOpacity onPress={checkToggle} activeOpacity={0.8} style={style.scb_building_content}>
          <Image source={checkIcon} style={style.scb_building_checkbox_icon}/>
          <Image source={{uri: data.icon}} defaultSource={default_2} style={style.scb_building_image}/>
          <View style={style.scb_building_info}>

            <View style={style.scb_building_row}>
              <Text style={style.scb_building_name} numberOfLines={1}>{data.name}</Text>
              <Label.TreeCategory _key={data.treeCategory}/>
            </View>

            {data.isShop ? (
              <View style={style.scb_building_row}>
                <Text style={style.scb_building_price} numberOfLines={1}>{data.totalPrice}万</Text>
                <Text style={style.scb_building_room_number} numberOfLines={1}>| {data.unitPrice}元/㎡</Text>
              </View>
            ) : (
              <View style={style.scb_building_row}>
                <Text style={style.scb_building_price} numberOfLines={1}>{data.minPrice}万/套起</Text>
                <Text style={style.scb_building_room_number} numberOfLines={1}>剩余{data.surplusShopNumber}/{data.sumShopNumber}套</Text>
              </View>
            )}

            <View style={style.scb_building_row}>
              <Text style={style.scb_building_address}>
                {data.district}{data.area} {data.isShop ? null : `｜建面${data.minArea}-${data.maxArea}㎡`}
              </Text>
            </View>

            <View style={style.scb_building_row}>
              <Label.SoloBuilding isSolo={data.projectType === 1}/>
              {data.commission ? (
                <Commission commission={data.commission}/>
              ) : null}
            </View>


            {data.isShop ? (
              <View style={styles.cb_building_row}>
                <Text style={styles.cb_shop_building_name_line}/><Text style={styles.cb_shop_building_name} numberOfLines={1}>{data.name}</Text>
              </View>
            ) : null}


          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default BuildingItem
