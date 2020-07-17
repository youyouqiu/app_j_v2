/**
 * @author: zxs
 * @date: 2020/6/9
 */
import React, {useEffect, useRef, useState} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import Header from "@/pages/personal/businessCard/components/Header";
import AddArea from "@/pages/personal/businessCard/components/AddArea";
import navigation from "@/utils/navigation";
import businessCardService from "@/services/businessCardService/businessCardService";
import {Toast} from "@new-space/teaset";
import {BuildingsComponentPropsType, BuildingsComponentStateType, ShopComponentPropsType, ShopComponentStateType} from "@/pages/personal/businessCard/types";
import {connect} from "react-redux";
import styles from "@/pages/personal/businessCard/styles";
import Label from "@/components/new-space/components/Label";

const default_img = require('../../../../images/defaultImage/default_2.png');
const edit_white = require('../../../../images/icons/edit_white.png');
const delete_red = require('../../../../images/icons/delete_red.png');

const defaultState: ShopComponentStateType = {
  shopList: []
};

const ShopsComponent = ({
                          dispatch,
                          businessCard
                        }: ShopComponentPropsType) => {

  const [state, setState] = useState(() => {
    return {
      ...defaultState,
    }
  });
  const renderCount = useRef(0);

  useEffect(() => {
    if (renderCount.current++) {
      setState(prevState => ({
        ...prevState,
        shopList: businessCard.shopList || []
      }))
    }
  }, [businessCard.shopList]);

  useEffect(() => {
    getSelectedShop();
  }, []);

  const getSelectedShop = () => {
    dispatch({type: 'businessCard/getSelectedShopAsync'})
  };

  const editShop = (id: string) => {
    navigation.navigate('editComponent', {id, type: 'shop'})
  };

  const deleteBuilding = async (id: string) => {
    const res = await businessCardService.deleteSelectedBuilding(id).catch(err => {
      Toast.message('删除失败')
    });
    if (res.code === '0') {
      Toast.message('删除成功');
      getSelectedShop()
    }
  };

  return (
    <View>
      <Header title='选择单铺' length={state?.shopList?.length || 0}/>
      <View>
        {state?.shopList?.map((v, i) => (
          <View style={styles.bc_recommend_building_detail}>

            <View style={styles.bc_recommend_building_image_wrapper}>
              <Image source={{uri: v.shopUrl}} defaultSource={default_img} style={styles.bc_recommend_building_image}/>
              <View style={styles.bc_recommend_building_footer}>
                <TouchableOpacity style={styles.bc_recommend_building_footer_row} activeOpacity={0.8} onPress={() => editShop(v.id)}>
                  <Image source={edit_white} style={styles.bc_recommend_building_footer_icon}/>
                  <Text style={styles.bc_recommend_building_edit_text}>编辑</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bc_recommend_building_footer_row} activeOpacity={0.8} onPress={() => deleteBuilding(v.id)}>
                  <Image source={delete_red} style={styles.bc_recommend_building_footer_icon}/>
                  <Text style={styles.bc_recommend_building_delete_text}>删除</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.bc_recommend_detail_right}>
              <View style={styles.bc_recommend_detail_row}>
                <Text style={styles.bc_recommend_building_name} numberOfLines={1}>{v.shopName}</Text>
              </View>
              <View style={styles.bc_recommend_detail_row}>
                <Text style={styles.bc_recommend_building_price} numberOfLines={1}>{v.totalPrice}万&emsp;</Text>
                <Text style={styles.bc_recommend_building_unit_price}>{v.unitPrice}元/㎡</Text>
              </View>
              <View style={styles.bc_recommend_detail_row}>
                <Text style={styles.bc_recommend_building_area} numberOfLines={1}>
                  建面{v.buildingArea}㎡ | {v.districtName}{v.areaName}
                </Text>
              </View>
              <View style={styles.bc_recommend_detail_row}>
                <Label.TreeCategory _key={v.shopCategoryType}/>
                {v?.featureLabels?.map((v) => <Label style={styles.bc_label_style} textStyle={styles.bc_label_text_style} _key={v}/>)}
              </View>
            </View>

          </View>
        ))}
        {state?.shopList?.length < 3 ? <AddArea path='shop' title='添加推广房源'/> : null}
      </View>
    </View>
  )
};

const mapStateToProps = ({businessCard}: any) => {
  return {businessCard}
};
export default connect(mapStateToProps)(ShopsComponent)
