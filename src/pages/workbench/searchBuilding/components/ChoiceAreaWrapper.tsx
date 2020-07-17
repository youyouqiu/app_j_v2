/**
 * @author: zxs
 * @date: 2020/5/6
 */
import {Image, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import styles from '../searchBuilding/styles'
import {IAreaSubmitType, IChoiceAreaWrapperPropsType, IChoiceAreaWrapperStateType} from "@/pages/workbench/searchBuilding/components/types";
import ChoiceArea from "@/businessComponents/choiseArea/ChoiceArea";
import RegionChoice from "@/businessComponents/choice/choiceRegion/regionChoice";
import {IRegionType} from "@/businessComponents/choice/choiceRegion/types";
import ChoiceFooter from "@/businessComponents/choice/components/choiceFooter";
import {connect} from "react-redux";

const area_open = require('../../../../images/icons/arrowOpen.png');
const area_close = require('../../../../images/icons/arrowClosed.png');
const defaultSelectArea: IAreaSubmitType = {
    _area: [],
    _district: "",
    showText: [],
    city: ''
};

const defaultState = {
    visible: false,
    regionSelectedValues: {}
} as IChoiceAreaWrapperStateType;

const ChoiceAreaWrapper = ({
                               regionSelectedValues = {} as IRegionType,
                               onConfirm,
                               projectLocation,
                               onReset,
                           }: IChoiceAreaWrapperPropsType) => {

    const changeAreaVisible = () => {
        setState({
            ...state,
            regionSelectedValues,
            visible: !state.visible
        })
    };

    const [state, setState] = useState<IChoiceAreaWrapperStateType>(() => ({
            ...defaultState
        }
    ));

    const _onChange = (params: IRegionType) => {
        setState({
            ...state,
            regionSelectedValues:params
        })
    };

    const _onConfirm = () => {
        setState({
            ...state,
            visible: false
        });
        onConfirm && onConfirm(state.regionSelectedValues)
    };

    const _onReset = () => {
        const _regionSelectedValues: IRegionType = {
            area: [],
            areaName: [],
            city: projectLocation.cityCode || projectLocation.defaultCityCode,
            cityName: projectLocation.cityName || projectLocation.defaultCityName,
            district: "",
            districtName: "",
            regionText: [projectLocation.cityName || projectLocation.defaultCityName]
        };
        setState(prevState => ({
            ...prevState,
            regionSelectedValues:_regionSelectedValues,
        }));
        onReset && onReset()
    };

    return (
        <View style={styles.sb_choice_area_wrapper}>
            <TouchableOpacity activeOpacity={0.9} onPress={changeAreaVisible} style={styles.sb_location}>
                <Image style={styles.sb_locationIcon} source={require('../../../../images/icons/map.png')}/>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <Text numberOfLines={1} style={styles.sb_locationLabel}>
                        {regionSelectedValues.regionText?.length > 0 ? (
                            <Text style={{flex: 1}}>{regionSelectedValues.regionText.join(',')}</Text>
                        ) : '不限'}
                    </Text>
                </View>
                <Image source={state.visible ? area_open : area_close} style={styles.sb_areaArrow}/>
            </TouchableOpacity>
            {state.visible ? (
                <View>
                    <RegionChoice regionSelectedValues={state.regionSelectedValues}
                                  showTopCity={false}
                                  onChange={_onChange}/>
                    <ChoiceFooter onConfirm={_onConfirm} onReset={_onReset}/>
                </View>
            ) : null}
        </View>
    )
};

const mapStateToProps = ({projectLocation}: any) => {
    return {projectLocation}
};
export default connect(mapStateToProps)(ChoiceAreaWrapper)
