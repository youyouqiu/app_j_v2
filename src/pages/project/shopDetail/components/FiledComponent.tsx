import {IFiledTypes} from "@/pages/project/shopDetail/types/headerInfoTypes";
import {Text, View} from "react-native";
import React from "react";
import styles from '../styles'

/**
 * @author: zxs
 * @date: 2020/4/28
 */
export const FiledHalf = ({label,value}: IFiledTypes) => {
    return (
        <View style={styles.sd_filedHalf_wrapper}>
            <Text style={styles.sd_filed_label}>{label}：</Text>
            <Text style={styles.sd_sd_filed_value}>{value}</Text>
        </View>
    )
};

export const FiledWhole = ({label,value}: IFiledTypes) => {
    return (
        <View style={styles.sd_filedWhole_wrapper}>
            <Text style={styles.sd_filed_label}>{label}：</Text>
            <Text style={styles.sd_sd_filed_value}>{value}</Text>
        </View>
    )
};
