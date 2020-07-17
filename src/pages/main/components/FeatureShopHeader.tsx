import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "../style";
import { IFeatureHeaderTypes } from "@/pages/main/types/featureShopTypes";
import navigation from "@/utils/navigation";
import BuryPoint from '@/utils/BuryPoint';

const FeatureShopHeader = (props: IFeatureHeaderTypes) => {

  const _onPress = () => {
    BuryPoint.add({
      page: '房源首页',
      target: '铺优选_查看更多_button',
      action: 'click',
    })
    navigation.navigate('shopListSpecial', { featureId: props.data.featureId })
  };

  return (
    <View style={styles.m_feature_wrapper}>
      <View style={styles.m_feature_left}>
        <Image style={styles.m_feature_left_icon} source={props.labelIcon} />
        <Text style={[styles.m_feature_left_title, { color: props.color }]}>{props.data.featureTitle}</Text>
        <Text style={[styles.m_feature_left_desc, { color: props.color }]}>{props.data.featureSubtitle}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.9} onPress={_onPress} style={styles.m_feature_right}>
        <Text style={[styles.m_feature_right_more, { color: props.color }]}>查看更多</Text>
        <Image style={styles.m_feature_right_icon} source={props.arrowIcon} />
      </TouchableOpacity>
    </View>
  )
};

export default FeatureShopHeader
