import React from "react";
import {Text, View} from "react-native";
import styles from "../styles";
import {DescItem} from "./shopOtherInfo";
import {checkBlank} from "../../buildingDetail/components/baseInfo";

const RelevantInfo = ({relevantInfo = {}, onLayout,shop_category_obj}) => {

    return (
        <View style={styles.bd_subWrapper} onLayout={onLayout}>
            <View style={styles.bd_subContainer}>
                <Text style={styles.bd_subHeader}>基本信息</Text>
                <View style={styles.bd_descItemContent}>
                    <DescItem label='商铺编号' value={checkBlank(relevantInfo.number)}/>
                    <DescItem label='类型' value={checkBlank(shop_category_obj[relevantInfo.shopCategory])}/>
                    <DescItem label='所属楼栋' value={checkBlank(relevantInfo.buildingNo)}/>
                    <DescItem label='所属楼层' value={checkBlank(relevantInfo.floorNo)}/>
                    <DescItem label='套内面积' value={checkBlank(relevantInfo.houseArea, '㎡')}/>
                    <DescItem label='建筑面积' value={checkBlank(relevantInfo.buildingArea, '㎡')}/>
                </View>
            </View>
        </View>
    )
};

export default RelevantInfo
