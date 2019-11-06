import moment from "moment";
import styles from "../../buildingDetail/styles";
import {Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import projectService from "../../../../services/projectService";

const ReportRule = ({requestUrl, buildingTreeId, onLayout, handleHasRule = () => {}}) => {
    let ruleData = [
        {key: 'reportTime', data: {label: '报备开始时间', value: ''}},
        {key: 'reportValidity', data: {label: '报备有效期', value: ''}},
        {key: 'takeLookValidity', data: {label: '到访保护期', value: ''}},
        {key: 'liberatingStart', data: {label: '接访时间', value: ''}},
        {key: 'mark', data: {label: '报备备注', value: ''}},
    ];
    const [reportRule, setReportRule] = useState([...ruleData]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await projectService.reportRuleReq(requestUrl.api, buildingTreeId);
            const {extension} = response;
            handleHasRule(!!response.extension);
            let newData = ruleData.map(item => {
                if (item.key === 'reportTime') {
                    item.data.value = moment(new Date(extension[item.key])).format('YYYY-MM-DD hh:mm');
                } else {
                    item.data.value = extension[item.key];
                }
                return item
            });
            setReportRule(newData)
        };
        fetchData();
    }, []);
    return (
        <View style={[styles.subContent, styles.reportRuleContent]} onLayout={onLayout}>
            <Text style={styles.subHeader}>报备规则</Text>
            <View style={styles.RRTable}>
                {reportRule.map(item => (
                    <View style={styles.RRTableRow} key={item.key}>
                        <View style={styles.RRTableLabelWrap}><Text
                            style={styles.RRTableLabel}>{item.data.label}</Text></View>
                        <View style={styles.RRTableValueWrap}><Text style={styles.RRTableValue}>{item.data.value || '暂无数据'}</Text></View>
                    </View>
                ))}
            </View>
        </View>
    )
};
export default ReportRule
