import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import React from "react";
import moment from "moment";
import Label from "../../../../components/new-space/components/Label";
import {scaleSize} from "@/components/new-space/utils/screenUtil";
import {connect} from "react-redux";
import ApiCustom from "../../../../services/customManager";
import {Toast} from '@new-space/teaset'
import {customerNameSubstring} from "@/utils/utils";

const BACK_ICON = require('@/images/icons/followUp/back.png');
const CLOSE_ICON = require('@/images/icons/chose.png');

const toSingDetail = (data: any, status: number) => {
    let params: any = {
        reportId: data.content.reportId,
        buildingId: data.content.buildingId,
        buildingTreeId: data.content.buildingTreeId,
        subscriptionId: data.content.subscriptionId,
        status
    };
    global.navigation.navigate('singDetail', params);
};

const followVerify = (type: any, key: any) => {
    const body = {type, key};
    return ApiCustom.followVerify(body)
};

/**
 * 签约 认购
 * @param props
 * @constructor
 */
const _RenderContent1 = (props: any) => {
    const data = {...props.data, content: JSON.parse(props.data.content)};
    const {isBack} = data.content;
    const renderBackIcon = () => {
        return data.type === '签约' && isBack ? <Image source={BACK_ICON} style={styles.s_stepItem_backIcon}/> : null;
    };
    const status: number = data.type === '签约' ? 2 : 1;
    const time = data.type === '签约' ? data.content.dealDate : data.content.subscriptionDate;
    const verify = async () => {
        const id = data.type === '签约' ? data.content.dealId : data.content.subscriptionId;
        const result: any = await followVerify(data.type, id).catch(err => {
            console.log('客户跟进信息验证失败：', err)
        });
        if (!result) return;
        result.extension ? toSingDetail(data, status) : Toast.message('业务状态已发生改变')
    };
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => isBack ? null : verify()}>
            <View style={[styles.s_stepItem_subContent, {alignItems: 'center'}]}>
                <Text style={styles.s_stepItem_label}>系统时间</Text>
                <Text style={styles.s_stepItem_time}>{moment(data.createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                {data.allowJump ? (
                    <Image style={styles.s_stepItem_timeRightIcon} source={CLOSE_ICON}/>
                ) : null}
            </View>
            <View style={[styles.s_stepItem_subContent, {alignItems: 'center'}]}>
                <Text style={styles.s_stepItem_label}>{data.type}日期</Text>
                <Text style={styles.s_stepItem_time}>{moment(time).format('YYYY-MM-DD')}</Text>
            </View>
            <View style={styles.s_stepItem_subContent}>
                <Text style={styles.s_stepItem_label}>楼盘信息</Text>
                <View style={styles.s_stepItem_buildingInfo}>
                    <View style={styles.s_stepItem_titleWrap}>
                        <Label _key={data.content.buildingTreeType}/>
                        <Text style={styles.s_stepItem_title} numberOfLines={1}>{data.content.buildingTreeName}</Text>
                    </View>
                    <Text style={styles.s_stepItem_buildingNo}>{data.content.shopName}</Text>
                </View>
            </View>
            <View style={styles.s_stepItem_subContent}>
                <Text style={styles.s_stepItem_label}>客户信息</Text>
                <View style={styles.s_stepItem_userInfo_wrap}>
                    {[...data.content.clientInfo].map((item: any, idx: any) => (
                        <View style={[styles.s_stepItem_userInfo]} key={idx}>
                            <Text style={styles.s_stepItem_name} numberOfLines={1}>{customerNameSubstring(item.clientName, 3)}</Text>
                            <Text style={styles.s_stepItem_mobile}>{item.clientPhone}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <View style={[styles.s_stepItem_subContent, {alignItems: 'center'}]}>
                <Text style={styles.s_stepItem_label}>{data.type}金额</Text>
                {/*<Text style={styles.s_stepItem_price}>{(data.content.totalPrice / 10000).toFixed(2)}万</Text>*/}
                <Text style={styles.s_stepItem_price}>
                    {data.content.totalPrice && `￥${String(data.content.totalPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                </Text>
            </View>
            {renderBackIcon()}
        </TouchableOpacity>
    )
};

export const RenderContent1 = connect()(_RenderContent1);

/**
 * 报备 到访
 * @param props
 * @constructor
 */
export const RenderContent2 = (props: any) => {
    const data = {...props.data, content: JSON.parse(props.data.content)};
    const followVerify = async () => {
        const body = {
            "type": data.type,
            "key": data.content.reportId
        };
        const result: any = await ApiCustom.followVerify(body).catch(err => {
            console.log('客户跟进信息验证失败：', err)
        });
        if (!result) return;
        result.extension ? toDetail() : Toast.message('业务状态已发生改变')
    };
    const toDetail = () => {
        if (data.type === '报备') {
            props.lookModalVisibleToggle && props.lookModalVisibleToggle(data.content)
        } else if (data.type === '到访') {
            const params = {
                reportId: data.content.reportId,
                buildingId: data.content.buildingId,
                buildingTreeId: data.content.buildingTreeId
            };
            global.navigation.navigate('visitDetail', params);
        }
    };
    console.log('RenderContent2',data);
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={followVerify}>
            <View style={[styles.s_stepItem_subContent, {alignItems: 'center'}]}>
                <Text style={styles.s_stepItem_label}>系统时间</Text>
                <Text style={styles.s_stepItem_time}>{moment(data.createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                {data.allowJump ? (
                    <Image style={styles.s_stepItem_timeRightIcon} source={CLOSE_ICON}/>
                ) : null}
            </View>
            {data.type === '到访' ? (
                <View style={styles.s_stepItem_subContent}>
                    <Text style={styles.s_stepItem_label}>{data.type}日期</Text>
                    <Text style={styles.s_stepItem_time}>{moment(data.content.visitTime).format('YYYY-MM-DD')}</Text>
                </View>
            ) : null}
            <View style={styles.s_stepItem_subContent}>
                <Text style={styles.s_stepItem_label}>楼盘信息</Text>
                <View style={styles.s_stepItem_buildingInfo}>
                    <View style={styles.s_stepItem_titleWrap}>
                        <Label _key={data.content.buildingTreeType}/>
                        <Text style={styles.s_stepItem_title} numberOfLines={1}>{data.content.buildingTreeName}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.s_stepItem_subContent}>
                <Text style={styles.s_stepItem_label}>客户信息</Text>
                <View style={[styles.s_stepItem_userInfo_wrap]}>
                    {data.content.reportPhones.map((item: any, idx: any) => (
                        <Text style={[styles.s_stepItem_mobile, {textAlign: 'left'}]}>{item}</Text>
                    ))}
                </View>
            </View>
            {data.type === '到访' && (
                <View style={styles.s_stepItem_subContent}>
                    <Text style={styles.s_stepItem_label}>{data.type}状态</Text>
                    <Text>已确认</Text>
                </View>
            )}
        </TouchableOpacity>
    )
};

/**
 * 退房
 * @param props
 * @constructor
 */
export const RenderContent3 = (props: any) => {
    const data = {...props.data, content: JSON.parse(props.data.content)};
    const verify = async () => {
        const result: any = await followVerify(data.type, data.content.subscriptionId).catch(err => {
            console.log('客户跟进信息验证失败：', err)
        });
        if (!result) return;
        result.extension ? toSingDetail(data, 5) : Toast.message('业务状态已发生改变')
    };
    return (
        <TouchableOpacity onPress={verify}>
            <View style={[styles.s_stepItem_subContent, {alignItems: 'center'}]}>
                <Text style={styles.s_stepItem_label}>系统时间</Text>
                <Text style={styles.s_stepItem_time}>{moment(data.createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                {data.allowJump ? (
                    <Image style={styles.s_stepItem_timeRightIcon} source={CLOSE_ICON}/>
                ) : null}
            </View>
            <View style={styles.s_stepItem_subContent}>
                <Text style={styles.s_stepItem_label}>楼盘信息</Text>
                <View style={styles.s_stepItem_buildingInfo}>
                    <View style={styles.s_stepItem_titleWrap}>
                        <Label _key={data.content.buildingTreeType}/>
                        <Text style={styles.s_stepItem_title} numberOfLines={1}>{data.content.buildingTreeName}</Text>
                    </View>
                    <Text style={styles.s_stepItem_buildingNo}>1栋8层-15号</Text>
                </View>
            </View>
            <View style={styles.s_stepItem_subContent}>
                <Text style={styles.s_stepItem_label}>客户信息</Text>
                <View style={styles.s_stepItem_userInfo_wrap}>
                    {data.content.clientInfo.map((item: any, idx: any) => (
                        <View style={[styles.s_stepItem_userInfo]} key={idx}>
                            <Text style={styles.s_stepItem_name} numberOfLines={1}>{customerNameSubstring(item.clientName, 3)}</Text>
                            <Text style={styles.s_stepItem_mobile}>{item.clientPhone}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    )
};

/**
 * 换房
 * @param props
 * @constructor
 */
export const RenderContent4 = (props: any) => {
    const data = {...props.data, content: JSON.parse(props.data.content)};
    const verify = async () => {
        const result: any = await followVerify(data.type, data.content.subscriptionId).catch(err => {
            console.log('客户跟进信息验证失败：', err)
        });
        if (!result) return;
        result.extension ? toSingDetail(data, 3) : Toast.message('业务状态已发生改变')
    };
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={verify}>
            <View style={[styles.s_stepItem_subContent, {alignItems: 'center'}]}>
                <Text style={styles.s_stepItem_label}>系统时间</Text>
                <Text style={styles.s_stepItem_time}>{moment(data.createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                {data.allowJump ? (
                    <Image style={styles.s_stepItem_timeRightIcon} source={CLOSE_ICON}/>
                ) : null}
            </View>
            <View style={styles.s_stepItem_subContent}>
                <Text style={styles.s_stepItem_label}>楼盘信息(旧)</Text>
                <View style={styles.s_stepItem_buildingInfo}>
                    <View style={styles.s_stepItem_titleWrap}>
                        <Label _key={data.content.buildingTreeType}/>
                        <Text style={styles.s_stepItem_title} numberOfLines={1}>{data.content.buildingTreeName}</Text>
                    </View>
                    <Text style={styles.s_stepItem_buildingNo}>{data.content.oldShopName}</Text>
                </View>
            </View>
            <View style={styles.s_stepItem_subContent}>
                <Text style={styles.s_stepItem_label}>客户信息</Text>
                <View style={styles.s_stepItem_userInfo_wrap}>
                    {data.content.newClientInfo.map((item: any, idx: any) => (
                        <View style={[styles.s_stepItem_userInfo]} key={idx}>
                            <Text style={styles.s_stepItem_name} numberOfLines={1}>{customerNameSubstring(item.clientName, 3)}</Text>
                            <Text style={styles.s_stepItem_mobile}>{item.clientPhone}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <View style={styles.s_stepItem_subContent}>
                <Text style={styles.s_stepItem_label}>变更信息(新)</Text>
                <View style={styles.s_stepItem_buildingInfo}>
                    <View style={styles.s_stepItem_titleWrap}>
                        <Label _key={data.content.buildingTreeType}/>
                        <Text style={styles.s_stepItem_title} numberOfLines={1}>{data.content.buildingTreeName}</Text>
                    </View>
                    <Text style={styles.s_stepItem_buildingNo}>{data.content.newShopName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

/**
 * 换客
 * @param props
 * @constructor
 */
export const RenderContent5 = (props: any) => {
    const data = {...props.data, content: JSON.parse(props.data.content)};
    const verify = async () => {
        const result: any = await followVerify(data.type, data.content.subscriptionId).catch(err => {
            console.log('客户跟进信息验证失败：', err)
        });
        if (!result) return;
        result.extension ? toSingDetail(data, 4) : Toast.message('业务状态已发生改变')
    };
    return (
        <TouchableOpacity onPress={verify} activeOpacity={0.8}>
            <View style={[styles.s_stepItem_subContent, {alignItems: 'center'}]}>
                <Text style={styles.s_stepItem_label}>系统时间</Text>
                <Text style={styles.s_stepItem_time}>{moment(data.createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                {data.allowJump ? (
                    <Image style={styles.s_stepItem_timeRightIcon} source={CLOSE_ICON}/>
                ) : null}
            </View>
            <View style={styles.s_stepItem_subContent}>
                <Text style={styles.s_stepItem_label}>楼盘信息</Text>
                <View style={styles.s_stepItem_buildingInfo}>
                    <View style={styles.s_stepItem_titleWrap}>
                        <Label _key={data.content.buildingTreeType}/>
                        <Text style={styles.s_stepItem_title} numberOfLines={1}>{data.content.buildingTreeName}</Text>
                    </View>
                    <Text style={styles.s_stepItem_buildingNo}>{data.content.shopName}</Text>
                </View>
            </View>
            <View style={styles.s_stepItem_subContent}>
                <Text style={styles.s_stepItem_label}>客户信息(旧)</Text>
                <View style={styles.s_stepItem_userInfo_wrap}>
                    {data.content.oldclientInfo.map((item: any, idx: any) => (
                        <View style={[styles.s_stepItem_userInfo]} key={idx}>
                            <Text style={styles.s_stepItem_name} numberOfLines={1}>{customerNameSubstring(item.clientName, 3)}</Text>
                            <Text style={styles.s_stepItem_mobile}>{item.clientPhone}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <View style={styles.s_stepItem_subContent}>
                <Text style={styles.s_stepItem_label}>客户信息(新)</Text>
                <View style={styles.s_stepItem_userInfo_wrap}>
                    {data.content.newclientInfo.map((item: any, idx: any) => (
                        <View style={[styles.s_stepItem_userInfo]} key={idx}>
                            <Text style={styles.s_stepItem_name} numberOfLines={1}>{customerNameSubstring(item.clientName, 3)}</Text>
                            <Text style={styles.s_stepItem_mobile}>{item.clientPhone}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    )
};

/**
 * 跟进
 * @param data
 * @constructor
 */
export const RenderContent6 = ({data}: any) => {
    return (
        <View>
            <View style={[styles.s_stepItem_subContent, {alignItems: 'center'}]}>
                <Text style={styles.s_stepItem_label}>跟进时间</Text>
                <Text style={styles.s_stepItem_time}>{moment(data.createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
            </View>
            <View style={styles.s_stepItem_subContent}>
                <Text style={styles.s_stepItem_label}>跟进方式</Text>
                <Text style={styles.s_stepItem_time}>{data.type}</Text>
            </View>
            <View style={[styles.s_stepItem_subContent]}>
                <Text style={styles.s_stepItem_label}>备注</Text>
                <Text style={styles.s_stepItem_time}>{data.content}</Text>
            </View>
        </View>
    )
};
