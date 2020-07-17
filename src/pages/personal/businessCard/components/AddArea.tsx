/**
 * @author: zxs
 * @date: 2020/6/9
 */
import {Image, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {AddAreaPropsType} from "@/pages/personal/businessCard/types";
import styles from '../styles'
import navigation from "@/utils/navigation";

const add_circular = require('../../../../images/icons/add_circular.png');

const AddArea = ({
                   title,
                   path
                 }: AddAreaPropsType) => {

  const onPress = () => {
    if (path === 'shop'){
      navigation.navigate('chooseShop')
    }else {
      navigation.navigate('chooseBuilding')
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.bc_add_area_wrapper}>
      <Image source={add_circular} style={styles.bc_add_area_icon}/>
      <Text style={styles.bc_add_area_title}>{title}</Text>
    </TouchableOpacity>
  )
};

export default AddArea
