import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import FeatureShopHeader from "@/pages/main/components/FeatureShopHeader";
import styles from '../style'
import LinearGradient from "react-native-linear-gradient";
import { IFeatureShopPropsType, IFeatureShopResponseType, IFeatureShopType } from "@/pages/main/types/featureShopTypes";
import { FEATURE_CONFIG } from "@/pages/main/constants";
import projectService from "@/services/projectService";
import { ResponseCommon } from "@/services/typings/types";
import { featureShopFormat } from "@/pages/main/formatUtils/featureShopFormat";
import navigation from "@/utils/navigation";
import Label from "@/components/new-space/components/Label";
import BuryPoint from '@/utils/BuryPoint';
import {IFeatureShopHeaderType} from '@/pages/main/types/featureShopTypes'
const defaultSource = require('../../../images/defaultImage/default_3.png');

const FeatureShop = ({ cityCode, refreshingRandom }: IFeatureShopPropsType) => {

  const [featureShopList, setFeatureShopList] = useState([] as Array<IFeatureShopType>);

  useEffect(() => {
    cityCode && getFeatureShop();
  }, [cityCode, refreshingRandom]);

  const getFeatureShop = async () => {
    const response: ResponseCommon<Array<IFeatureShopResponseType>> = await projectService.getFeatureShop(cityCode);
    if (response.code === '0') {
      const newData = featureShopFormat(response.extension);
      setFeatureShopList(newData)
    }
  };

  const _onPress = (shopId: string, buildingTreeId: string, featureShopHeader: IFeatureShopHeaderType) => {
    BuryPoint.add({
      page: '房源首页',
      target: '铺优选_查看单铺_button',
      action: 'click',
      action_param: {
        shopId,
      }
    })
    navigation.navigate('shopDetail', { shopId, buildingTreeId, featureShopHeader })
  };

  return (
    <View>
      {featureShopList.map((v, i) => (
        v.featureShopList.length > 0 && i < 5 ? (
          <View style={styles.feature_wrapper}>
            <LinearGradient start={FEATURE_CONFIG[i].lg_config.start}
              end={FEATURE_CONFIG[i].lg_config.end}
              colors={FEATURE_CONFIG[i].lg_config.colors}
              style={styles.m_fs_lg_content} />
            <View style={styles.m_feature_scrollView}>
              <FeatureShopHeader arrowIcon={FEATURE_CONFIG[i].arrowIcon}
                labelIcon={FEATURE_CONFIG[i].labelIcon}
                data={v.featureShopHeader}
                color={FEATURE_CONFIG[i].color} />
              <View style={styles.m_shop_scroll_view_wrapper}>
                <ScrollView horizontal={true}
                  style={styles.m_shop_scroll_view}
                  showsHorizontalScrollIndicator={false}>
                  {v.featureShopList.map((v1, i1) => (
                    <TouchableOpacity activeOpacity={0.9}
                      onPress={() => _onPress(v1.shopId, v1.buildingTreeId, v.featureShopHeader)}
                      style={styles.m_shop_wrapper}>
                      <Image style={styles.m_shop_img} defaultSource={defaultSource} source={{ uri: v1.shopImage }} />
                      <View style={styles.m_shop_info}>
                        <View style={styles.m_shop_name_wrapper}>
                          <Text style={styles.m_shop_name} numberOfLines={1}>{v1.shopName}</Text>
                          <Label.ShopSaleStatus _key={v1.saleStatus} />
                        </View>
                        <View style={styles.m_building_name_wrapper}>
                          <Text style={styles.m_building_name} numberOfLines={1}>{v1.buildingTreeName}</Text>
                          <Text style={styles.m_building_sale_price}>{v1.totalPrice}万元</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                  {/**ScrollView paddingRight失效*/}
                  <View style={styles.m_shop_scroll_view_empty} />
                </ScrollView>
              </View>
            </View>
          </View>
        ) : null
      ))}
    </View>
  )
};

export default FeatureShop
