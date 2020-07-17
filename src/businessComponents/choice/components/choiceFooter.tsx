/**
 * @author: zxs
 * @date: 2020/5/11
 */
import styles from "../styles";
import {Image, Text, TouchableOpacity, View} from "react-native";
import React from "react";

export interface IChoiceFooterPropsTypes {
    onReset: () => void,
    onConfirm: () => void
}

const cleanIcon = require('../../../images/icons/clean.png');

const ChoiceFooter = (props: IChoiceFooterPropsTypes) => {

    return (
        <View style={styles.sr_footer}>
            <TouchableOpacity style={styles.sr_reset_wrapper} onPress={props.onReset}>
                <Image source={cleanIcon} style={styles.sr_reset_icon}/>
                <Text style={styles.sr_reset_text}>重置</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sr_confirm} activeOpacity={0.8} onPress={props.onConfirm}>
                <Text style={styles.sr_confirm_text}>确定</Text>
            </TouchableOpacity>
        </View>
    )

};
export default ChoiceFooter
