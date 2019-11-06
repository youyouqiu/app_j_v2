import styles from "../styles";
import React from "react";
import {Text, View} from "react-native";
import {checkBlank} from "../../buildingDetail/components/baseInfo";

const ShopOtherInfo = ({otherInfo, onLayout}) => {
    const isCorner = checkBlank(otherInfo.isCorner);
    const isFaceStreet = checkBlank(otherInfo.isFaceStreet);
    return (
        <View onLayout={onLayout}>
            <View style={styles.bd_subWrapper}>
                <View style={styles.bd_subContainer}>
                    <Text style={styles.bd_subHeader}>商铺外摆信息</Text>
                    <View style={styles.bd_descItemContent}>
                        <DescItem label='赠送面积' value={checkBlank(otherInfo.freeArea,'㎡')}/>
                        <DescItem label='临街' value={checkBlank(otherInfo.streetDistance,'㎡')}/>
                        <DescItem label='拐角铺' value={isCorner === 'true' ? '是' : (isCorner === 'false' ? '否' : isCorner)}/>
                        <DescItem label='双边接' value={isFaceStreet === 'true' ? '是' : (isFaceStreet === 'false' ? '否' : isFaceStreet)}/>
                    </View>
                </View>
            </View>
        </View>
    )
};

export default ShopOtherInfo

export const DescItem = ({label, value}) => {

    return (
        <View style={styles.bd_descItem}>
            <Text style={styles.bd_descLabel}>{label}:</Text>
            <Text style={styles.bd_descValue}>{value}</Text>
        </View>
    )
};
