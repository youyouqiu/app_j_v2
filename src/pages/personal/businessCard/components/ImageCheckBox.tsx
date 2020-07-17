/**
 * @author: zxs
 * @date: 2020/6/11
 */
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {scaleSize} from "@/utils/screenUtil";
import {DetailImageType} from "@/pages/personal/businessCard/buildingImage/types";

const default_img = require('../../../../images/defaultImage/default_1.png');
const checkbox_1 = require('../../../../images/icons/checkbox_1.png');
const checkbox_2 = require('../../../../images/icons/checkbox_2.png');

interface ImageCheckBoxPropsType {
  urlObj: DetailImageType,
  onchange?: (params: DetailImageType, checked: boolean) => void,
  checked?: boolean
}

interface ImageCheckBoxStateType {
  checked: boolean
}

const defaultState: ImageCheckBoxStateType = {
  checked: false
};

const ImageCheckBox = ({
                         urlObj,
                         checked = false,
                         onchange
                       }: ImageCheckBoxPropsType) => {

  const [state, setState] = useState<ImageCheckBoxStateType>(() => {
    return {...defaultState, checked: checked}
  });

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      checked
    }))
  }, [checked]);

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      checked: checked || false
    }))
  }, [urlObj]);

  const touchOnPress = () => {
    setState(prevState => ({
      ...prevState,
      checked: !prevState.checked
    }));
    onchange && onchange(urlObj, !state.checked);
  };

  const checkboxSource = state.checked ? checkbox_2 : checkbox_1;

  return (
    <TouchableOpacity onPress={touchOnPress} activeOpacity={0.8} style={styles.icb_image_container}>
      <Image style={styles.icb_image} source={{uri: urlObj.fileUrl}} defaultSource={default_img}/>
      <Image source={checkboxSource} style={styles.icb_checkbox}/>
    </TouchableOpacity>
  )
};

export default ImageCheckBox

const styles = StyleSheet.create({
  icb_image: {
    width: scaleSize(216),
    height: scaleSize(216)
  },
  icb_checkbox: {
    width: scaleSize(50),
    height: scaleSize(50),
    position: 'absolute',
    bottom: scaleSize(12),
    right: scaleSize(12),
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: scaleSize(25)
  },
  icb_image_container: {
    width: scaleSize(216),
    height: scaleSize(216),
    marginBottom: scaleSize(20)
  },
});
