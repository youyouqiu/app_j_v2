import styles from "../styles";
import {Text, View} from "react-native";
import {checkBlank} from "../../buildingDetail/components/baseInfo";
import React from "react";

const ShopIntroduce = ({summary, onLayout}) => {

    return (
        <View style={styles.bd_subWrapper} onLayout={onLayout}>
            <View style={styles.bd_subContainer}>
                <Text style={styles.bd_subHeader}>商铺简介</Text>
                <Text style={styles.bd_introduce}>{checkBlank(summary)}</Text>
            </View>
        </View>
    )
};
export default ShopIntroduce
