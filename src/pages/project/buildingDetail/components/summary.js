import { Text, View} from "react-native";
import React from "react";
import styles from "../styles";
import {Label} from '../../../../components/new-space'

const ProjectInfo = ({onLayout, dictionaries, buildingDetail = {}}) => {
    // console.log(buildingDetail)
    let {basicInfo: {tradeMixPlanningList = []}} = buildingDetail
    let {trade_mixplanning_obj = []} = dictionaries
    return (
        <View style={styles.subContent} onLayout={onLayout}>
            <Text style={styles.subHeader}>项目简介</Text>
            <View style={styles.summaryLabelContent}>
                {
                    tradeMixPlanningList.map(v => {
                        return <Label style={{marginRight: 10, marginBottom: 4}} _key={trade_mixplanning_obj[v]}/>
                    })
                }
            </View>
            <Text style={styles.PIText}>
                {buildingDetail.summary || ''}
            </Text>
        </View>
    )
};

export default ProjectInfo;

