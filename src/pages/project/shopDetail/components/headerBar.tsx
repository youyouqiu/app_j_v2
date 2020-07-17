import styles from "@/pages/project/shopDetail/styles";
import {Animated, Image, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {IHeaderBarPropsType} from "@/pages/project/shopDetail/types/headerBarTypes";
import navigation from "@/utils/navigation";

/**
 * @author: zxs
 * @date: 2020/5/15
 */


const HeaderBar = (params:IHeaderBarPropsType)=>{

    const  goBack = () => {
        navigation.goBack()
    };
    return (
        <View style={styles.bd_headerAbsolute}>
            <Animated.View style={[styles.bd_headerAnimated0, {opacity: params.headerOpacity1}]}>
                <TouchableOpacity activeOpacity={0.8} onPress={goBack}>
                    <Image style={[styles.bd_headerIcon]}
                           source={require('../../../../images/icons/project/back_white.png')}/>
                </TouchableOpacity>
                <Text style={styles.bd_headerIconDivision}/>
                <TouchableOpacity activeOpacity={0.8} onPress={params.modalToggle}>
                    <Image style={styles.bd_headerIcon}
                           source={require('../../../../images/icons/project/more_white.png')}/>
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.bd_headerAnimated1, {opacity: params.headerOpacity0}]}>
                <TouchableOpacity activeOpacity={0.8} onPress={goBack}>
                    <Image style={styles.bd_headerIcon}
                           source={require('../../../../images/icons/project/back_black.png')}/>
                </TouchableOpacity>
                <Text style={styles.bd_headerIconDivision}>{params.shopCategoryTypeStr + '详情'}</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={params.modalToggle}>
                    <Image style={styles.bd_headerIcon}
                           source={require('../../../../images/icons/project/more_black.png')}/>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )

};
export default HeaderBar
