/**
 * @author: zxs
 * @date: 2020/5/15
 */
import {ISellingPointPropsTypes} from "@/pages/project/shopDetail/types/sellingPointTypes";
import React from "react";
import {Image, Text, View} from "react-native";
import SubHeader from "@/pages/main/components/SubHeader";
import styles from '../styles'

const SellingPoint = (params: ISellingPointPropsTypes) => {
    return (
        <View style={styles.sd_sp_wrapper}>
            <SubHeader subTitle='卖点信息'/>
            <View style={styles.sd_sp_content}>
                {params.sellingPoint.map((v) => (
                    <View style={styles.sd_sp_item}>
                        <Image style={styles.sd_sp_item_icon} source={v.icon}/>
                        <Text style={styles.sd_sp_item_name}>{v.label || ' '} </Text>
                        <Text style={styles.sd_sp_item_value}>{v.value || ' '} </Text>
                    </View>
                ))}
            </View>
        </View>
    )
};

export default SellingPoint
