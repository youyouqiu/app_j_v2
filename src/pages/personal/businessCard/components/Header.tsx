/**
 * @author: zxs
 * @date: 2020/6/9
 */
import {Text, View} from "react-native";
import React from "react";
import {HeaderPropsType} from "@/pages/personal/businessCard/types";
import styles from '../styles'

const Header = ({
                  title,
                  length
                }: HeaderPropsType) => {
  return (
    <View style={styles.bc_header_title_wrapper}>
      <Text style={styles.bc_header_title}>{title} ({length}/3)</Text>
    </View>
  )
};

export default Header
