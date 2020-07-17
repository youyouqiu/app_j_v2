/**
 * @author: zxs
 * @date: 2020/4/28
 */
import SubHeader from "@/pages/main/components/SubHeader";
import React from "react";
import {View, Text} from "react-native";
// @ts-ignore
import ScrollableTabView from '@new-space/react-native-scrollable-tab-view'
import {FiledHalf} from "@/pages/project/shopDetail/components/FiledComponent";
import styles from '../styles'

const GarageInfo = () => {

    const BaseInfo = (props: any) => {
        return (
            <View style={styles.sd_gi_baseInfo_wrapper}>
                <FiledHalf label='所属楼栋' value='A馆'/>
                <FiledHalf label='所属楼层' value='L1'/>
                <FiledHalf label={<Text>朝&emsp;&emsp;向</Text>} value='北'/>
                <FiledHalf label={<Text>电&emsp;&emsp;压</Text>} value='220v'/>
                <FiledHalf label='产权年限' value='50年'/>
                <FiledHalf label='产权到期' value='2070-10'/>
                <FiledHalf label='优惠政策' value='期房95折，贷款98折'/>
            </View>
        )
    };

    return (
        <View style={styles.sd_gi_wrapper}>
            <SubHeader subTitle='车库信息'/>
            <View style={styles.sd_gi_content}>
                <ScrollableTabView tabBarStyle={styles.sd_gi_tabBar}
                                   tabBarUnderlineStyle={styles.sd_gi_tabBarUnderlineStyle}
                                   tabStyle={styles.sd_gi_tab_style}>
                    <BaseInfo data-value={{name: '基本信息'}}/>
                    <BaseInfo data-value={{name: '商铺简介'}}/>
                </ScrollableTabView>
            </View>
        </View>
    )
};

export default GarageInfo
