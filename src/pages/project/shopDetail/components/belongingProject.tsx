/**
 * @author: zxs
 * @date: 2020/5/18
 */
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import SubHeader from "@/pages/main/components/SubHeader";
import Label from "@/components/new-space/components/Label";
import styles from '../styles'
import {IBelongingProjectPropsTypes, IBelongingProjectStateTypes} from "@/pages/project/shopDetail/types/belongingProjectTypes";
import postBuildingList, {BuildingListRequestConditions, IBuildingPreview} from '../../../../services/building/buildingList'
import {ResponseCommon} from "@/services/typings/types";
import {belongingProjectFormat} from "@/pages/project/shopDetail/formatUtil/belongingProjectFormat";
import {Commission} from "@/businessComponents/commission";
import navigation from "@/utils/navigation";
import {object} from "prop-types";


const defaultState = {
    buildingDetail: {}
} as IBelongingProjectStateTypes;
const BelongingProject = ({
                              buildingTreeId,
                              cityCode
                          }: IBelongingProjectPropsTypes) => {

    const [state, setState] = useState(defaultState);

    useEffect(() => {
        buildingTreeId && getBuildingDetail();
    }, [buildingTreeId]);

    const getBuildingDetail = async () => {
        const requestData: BuildingListRequestConditions = {
            buildingTreeIds: [buildingTreeId],
            pageSize: 1,
            pageIndex: 0,
            city:cityCode
        };
        const response: ResponseCommon<Array<IBuildingPreview>> = await postBuildingList.postBuildingList(requestData);
        if (response.code === '0') {
            if (response.extension.length > 0){
                const buildingDetail = belongingProjectFormat(response.extension[0]);
                setState(prevState => ({
                    ...prevState,
                    buildingDetail: buildingDetail
                }))
            }
        }
    };

    const gotoBuildingDetail = (buildingTreeId: string) => {
        navigation.navigate('buildingDetail', {buildingTreeId})
    };

    if (Object.keys(state.buildingDetail).length === 0) return  null;

    return (
        <View style={styles.sd_bp_wrapper}>
            <SubHeader subTitle='归属项目'/>
            <TouchableOpacity activeOpacity={0.8}
                              style={styles.sd_bp_content}
                              onPress={() => gotoBuildingDetail(state.buildingDetail.buildingTreeId)}>
                <Image style={styles.sd_bp_building_img} source={state.buildingDetail.buildingIcon}/>
                <View style={styles.sd_bp_building_info}>
                    <View style={styles.sd_bp_building_name_content}>
                        <Text style={styles.sd_bp_building_name} numberOfLines={1}>{state.buildingDetail.buildingTreeName}</Text>
                        <Label.BuildingSaleStatus _key={1}/>
                    </View>
                    <Text style={styles.sd_bp_building_price_content} numberOfLines={1}>
                        <Text style={styles.sd_bp_building_price}>
                            {state.buildingDetail.minPrice}-{state.buildingDetail.maxPrice}万&nbsp;
                        </Text>
                        <Text style={styles.sd_bp_building_rest}>
                            剩余{state.buildingDetail.surplusShopNumber}/{state.buildingDetail.sumShopNumber}套
                        </Text>
                    </Text>
                    <Text style={styles.sd_bp_building_location} numberOfLines={1}>
                        {state.buildingDetail.area}｜建面{state.buildingDetail.minArea}-{state.buildingDetail.maxArea}㎡
                    </Text>
                    <View style={styles.sd_bp_building_labels}>
                        {state.buildingDetail.projectType === 1 ? (
                            <Label.SoloBuilding/>
                        ) : null}
                        <Label.TreeCategory _key={state.buildingDetail.treeCategory}/>
                        {state.buildingDetail.labels?.map((v) => (
                            <Label _key={v}/>
                        ))}
                    </View>
                    <View style={styles.sd_bp_building_discount_content}>
                        <Commission commission={state.buildingDetail.commission}/>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const mapStateToProps = ({config, dictionaries, user}: any) => ({
    dictionaries,
    user,
});

export default connect(mapStateToProps)(BelongingProject)
