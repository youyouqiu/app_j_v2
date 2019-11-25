import {StyleProp, TextStyle, View, ViewStyle} from "react-native";
import React, {ReactElement, useEffect, useState} from "react";
import styles from "../searchBuilding/styles";
import ChoiceLabel from "./ChoiceLabel";
import {Toast} from 'teaset'
import {scaleSize} from "@/components/new-space/utils/screenUtil";

interface choiceLabelProps {
    data: any,
    selectValues?: Array<string>,
    labelSelectedOnchange?: Function,
    multiple?: boolean,
    style?: StyleProp<ViewStyle>,
    selectedStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    textSelectedStyle?: StyleProp<TextStyle>,
    minSize?: number,
    maxSize?: number,
    flex?: boolean
}


const LabelGroup = (params: choiceLabelProps) => {
    const {data, multiple = false, minSize = 0, maxSize = 0, flex = false, ...otherProps} = params;
    const [selectValues, setSelectValues] = useState(params.selectValues || []);

    useEffect(() => {
        const _selectValues: any = params.selectValues;
        params.selectValues ? setSelectValues(_selectValues) : null;
    }, [params.selectValues]);

    const labelSelectedOnchange = (key: any, value: any) => {
        let _selectValues: any = [...selectValues];
        if (multiple) {
            if (selectValues.includes(key)) {
                _selectValues.splice(_selectValues.indexOf(key), 1);
            } else {
                if (maxSize > 0 && _selectValues.length >= maxSize) {
                    Toast.message('最多选择' + maxSize + '个');
                    return;
                }
                _selectValues.push(key);
            }
        } else {
            console.log('selectValues', selectValues, key);
            if (selectValues.includes(key)) {
                if (minSize > 0) return;
                _selectValues = []
            } else {
                _selectValues = [key]
            }
        }
        let selectedArr: any = [];
        _selectValues.forEach((item: any) => {
            let selectedObj = {
                key: item,
                value: data[item]
            };
            selectedArr.push(selectedObj)
        });
        params.labelSelectedOnchange && params.labelSelectedOnchange(selectedArr);
        setSelectValues(_selectValues);
    };


    const renderContent = () => {
        let content = [];
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                const isSelected = selectValues.includes(key);
                const choiceLabel = (
                    <ChoiceLabel idx={key} isSelected={isSelected}{...otherProps} data={{key, value: data[key]}} labelSelectedOnchange={labelSelectedOnchange}/>
                );
                content.push(flex ? flexContent(choiceLabel) : choiceLabel)
            }
        }
        return content
    };

    const flexContent = (choiceLabel: any) => {
        return (
            <View
                style={{width: '25%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingLeft: scaleSize(6), paddingRight: scaleSize(6)}}>
                {choiceLabel}
            </View>
        )
    };

    const content = renderContent();

    return (
        <View style={styles.sb_itemContainer}>
            <View style={styles.sb_areaContent}>
                {content}
            </View>
        </View>
    )
};

export default LabelGroup;


