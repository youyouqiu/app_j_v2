/**
 * @author: zxs
 * @date: 2020/5/18
 */
import {Image, Text, View} from "react-native";
import React from "react";
import {styles} from './styles'
import {ICommissionPropsType} from "@/businessComponents/commission/types";

const commissionIcon = require('../../images/icons/commission.png');
const cashPrizeIcon = require('../../images/icons/cashPrize.png');
const featureIcon = require('../../images/icons/featureIcon.png');

export const Commission = ({
                               commission,
                               featureText
                           }: ICommissionPropsType) => {

    let content: Array<JSX.Element> = [];

    if (commission) {
        const cashPrizeIconContent = <Image style={styles.c_shop_commission_prizeIcon} source={cashPrizeIcon}/>;
        const commissionIconContent = <Image style={styles.c_shop_commission_prizeIcon} source={commissionIcon}/>;
        const {commissionsType, commissionsValue, dealPrize, takeLookPrize} = commission;
        //佣金
        if (commissionsType && commissionsValue) {
            content.push(commissionIconContent);
        }
        //现金奖
        if (dealPrize || takeLookPrize) {
            content.push(cashPrizeIconContent)
        }
    } else if (featureText) {
        //特色
        const featureContent = (
            <View style={styles.c_shop_feature_wrapper}>
                <Image style={styles.c_shop_feature_icon} source={featureIcon}/>
                <Text style={styles.c_shop_feature_text} numberOfLines={1}>{featureText}</Text>
            </View>
        );
        content.push(featureContent)
    }

    return (
        <View style={styles.c_shop_commission_content}>{content}</View>
    )

};
