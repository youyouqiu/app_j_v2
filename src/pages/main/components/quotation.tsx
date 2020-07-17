/**
 * @author: zxs
 * @date: 2020/4/27
 */
import React, {useEffect, useState} from "react";
import {View, Text, Image} from "react-native";
import SubHeader from "@/pages/main/components/SubHeader";
import styles from '../style'
import projectService from "@/services/projectService";
import {connect} from "react-redux";
import quotationFormat from "@/pages/main/formatUtils/quotationFormat";
import {IQuotationDetailType, IQuotationPropsType} from "@/pages/main/types/quotationTypes";

const rateDown = require('../../../images/icons/down.png');
const rateUp = require('../../../images/icons/down.png');

const Quotation = (props: IQuotationPropsType) => {

    const [detail, setDetail] = useState({} as IQuotationDetailType);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        trendRequest();
    }, [props.projectLocation.cityCode, props.refreshingRandom]);

    const trendRequest = async () => {
        try {
            const {cityCode, defaultCityCode} = props.projectLocation;
            const response = await projectService.trendReq(cityCode || defaultCityCode);
            if (response.code === '0') {
                if (response.extension) {
                    const quotationDetail = quotationFormat(response.extension);
                    setDetail(quotationDetail);
                    setVisible(true)
                } else {
                    setVisible(false)
                }
            }
        } catch (e) {

        }
    };

    return (
        visible ? (
            <View style={styles.m_quotation_wrapper}>
                <SubHeader subTitle='市场行情'/>
                <View style={styles.m_quotation_container}>
                    <View style={styles.m_quotation_content}>

                        <View style={styles.m_quotation_left}>
                            <Text style={styles.m_quotation_date}>
                                <Text style={styles.m_quotation_location}>{detail.cityName}</Text> / {detail.dateMonth}月
                            </Text>
                            <Text style={styles.m_quotation_desc}>商业行情走势</Text>
                        </View>

                        <View style={styles.m_quotation_right}>
                            <View style={styles.m_quotation_price_content}>
                                <View style={styles.m_quotation_price_icon}/>
                                <Text style={styles.m_quotation_label}>平均价格：</Text>
                                <Text style={styles.m_quotation_price_value}>
                                    <Text style={styles.m_quotation_price_value_text}>{detail.price}</Text>元/㎡
                                </Text>
                            </View>
                            <View style={styles.m_quotation_rate_content}>
                                <View style={styles.m_quotation_rate_icon}/>
                                <Text style={styles.m_quotation_label}>增长率：</Text>
                                <View style={styles.m_quotation_rate_value}>
                                    <Image style={styles.m_quotation_rate_value_img} source={detail.floatType === 2 ? rateDown : rateUp}/>
                                    <Text style={styles.m_quotation_rate_value_text_content}>
                                        <Text style={styles.m_quotation_rate_value_text}>{detail.proportion}</Text>%
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        ) : null
    )
};

const mapStateToProps = ({config, projectLocation}: any) => {
    return {
        config, projectLocation
    }
};
export default connect(mapStateToProps)(Quotation)
