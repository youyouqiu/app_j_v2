import React from "react";
import {Image, Text, View} from "react-native";
import styles from "../styles";
import {ListItem} from "./projectInfo";
import moment from "moment";
import {checkBlank} from "./baseInfo";

const defaultHandleShare = () => null;
const ReportRule = ({reportRule = {}, onLayout, shareWeChat = true, handleShare = defaultHandleShare}) => {
    const transFormReportTime = reportRule.reportTime ? moment(new Date(reportRule.reportTime)).format('YYYY-MM-DD HH:mm') : '暂无数据';
    const startTime = reportRule.liberatingStart ? moment(new Date(reportRule.liberatingStart)).format('HH:mm') : '';
    const endTime = reportRule.liberatingEnd ? moment(new Date(reportRule.liberatingEnd)).format('HH:mm') : '';
    const data = [
        {label: '报备开始时间', value: transFormReportTime},
        {label: '报备有效期', value: checkBlank(reportRule.reportValidity)},
        {label: '到访保护期', value: checkBlank(reportRule.takeLookValidity)},
        {label: '接访时间', value: startTime ? startTime + ' - ' + endTime : '暂无数据'},
        {label: '报备备注', value: checkBlank(reportRule.mark)}
    ];
    const renderRight1 = (
        <View style={styles.PIListRightIconWrap}>
            <Image style={styles.PIListRightIcon} source={require('../../../../images/icons/chose.png')}/>
        </View>
    );

    return (
        <View style={[styles.subContent, styles.reportRuleContent]} onLayout={onLayout}>
            <Text style={styles.subHeader}>报备规则</Text>
            <View style={styles.RRTable}>
                {data.map((item, idx) => (
                    <View style={styles.RRTableRow} key={idx}>
                        <View style={styles.RRTableLabelWrap}><Text style={styles.RRTableLabel}>{item.label}</Text></View>
                        <View style={styles.RRTableValueWrap}><Text style={styles.RRTableValue}>{item.value}</Text></View>
                    </View>
                ))}
            </View>
            {shareWeChat ? (
                <ListItem leftIcon={require('../../../../images/icons/wechat_green.png')}
                          onPress={handleShare}
                          RenderRight={renderRight1} rightData={[{id: 1, trueName: '分享报备小程序'}]}/>
            ) : null}

        </View>
    )
};

export default ReportRule
