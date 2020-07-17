import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {scaleSize} from '@/utils/screenUtil'
import Phone from '../../phone/index'
import moment from 'moment'
import styles from "./styles";
import {baseType, customerInfoType, zcCustomerType} from "@/types/singDetail/subscriptionInfoTypes";

interface props {
    title: string,
    isHistory?: boolean,
    data: baseType,
    zcInfo?: zcCustomerType,
    gotoHistory?: () => void,
}

export default class _SubscriptionInfo extends Component<props, any> {
    constructor(props: any) {
        super(props)
    }

    render() {
        let {data, title, isHistory, gotoHistory, zcInfo = {} as zcCustomerType} = this.props;
        let text = title.indexOf('签约') !== -1 ? '签约' : '认购';
        let customers = data.customerInfo || [];
        return (
            <View style={styles.wrap}>
                <View style={styles.titleBox}>
                    <View style={[styles.row, {justifyContent: 'space-between'}]}>
                        <View style={styles.row}>
                            <Text style={styles.title}>{title}</Text>
                            {data.markTime && (
                                <Text style={styles.title_reportTime}> | {moment(data.markTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                            )}
                        </View>

                        {data.hasHistory ?
                            (
                                <TouchableOpacity style={styles.row} activeOpacity={0.9} onPress={gotoHistory}>
                                    <Text style={{color: '#000000', fontSize: scaleSize(24)}}>{data.historyText}</Text>
                                    <Image style={styles.arrow} source={require('../../../images/icons/arrow_right.png')}/>
                                </TouchableOpacity>
                            ) : null
                        }

                    </View>
                </View>


                <View style={[styles.row, styles.contentBox, {justifyContent: 'space-between'}]}>
                    <View style={styles.row}>
                        <Text style={[styles.label]}>项目经理：</Text>
                        <Text style={[styles.normalText]}>{zcInfo.trueName}</Text>
                    </View>
                    {zcInfo.phoneNumber ? <Phone telPhone={zcInfo.phoneNumber}/> : null}
                </View>


                <View style={[styles.row, styles.contentBox]}>
                    <View style={styles.row}>
                        <Text style={[styles.label]}>订单号：</Text>
                        <Text style={[styles.normalText]}>{data.orderNumber}</Text>
                    </View>
                </View>
                <View style={[styles.row, styles.contentBox, {alignItems: 'flex-start'}]}>
                    <Text style={[styles.label]}>签约商铺：</Text>
                    <Text style={[styles.normalText, {flex: 1, flexWrap: 'wrap', marginRight: scaleSize(32)}]}>{data.shopName}</Text>
                </View>
                <View style={[styles.row, styles.contentBox, {alignItems: 'flex-start', width: '100%'}]}>
                    <Text style={[styles.label]}>客户信息：</Text>
                    <View style={{flex: 1}}>
                        {
                            customers.map((item: customerInfoType, key: any) => {
                                return (
                                    <View key={key} style={[styles.row, {paddingBottom: customers.length > 1 ? scaleSize(16) : 0}]}>
                                        <Text style={[styles.normalText, {paddingRight: scaleSize(8), maxWidth: scaleSize(250)}]} numberOfLines={1}>
                                            {item.clientName}
                                        </Text>
                                        <Text style={[styles.normalText]}>{item.clientPhone}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
                <View style={[styles.row, styles.contentBox]}>
                    <Text style={[styles.label]}>{text}金额：</Text>
                    <Text style={[styles.normalText, {color: '#FE5139'}]}>{data.amount}</Text>
                </View>
                <View style={[styles.row, styles.contentBox]}>
                    <Text style={styles.label}>实际{text}日期：</Text>
                    <Text style={[styles.normalText]}>{data.actualTime}</Text>
                </View>

            </View>
        )
    }
}
