import styles from "../../pages/workbench/searchBuilding/searchBuilding/styles";
import {Text, TouchableOpacity} from "react-native";
import React from "react";
import {IChoiceLabelPropsType} from "@/businessComponents/LabelGroup/types";

const styleTransForm = (style: any) => {
    return style ? JSON.parse(JSON.stringify(style)) : style
};

const ChoiceLabel = (params: IChoiceLabelPropsType) => {
    const {idx, data, onChange, selectedStyle, style, textSelectedStyle, textStyle} = params;

    const _selectedStyle = Object.assign(styleTransForm(styles.sb_areaLabel_selected), styleTransForm(selectedStyle));

    const _textSelectedStyle = Object.assign(styleTransForm(styles.sb_areaText_selected), styleTransForm(textSelectedStyle));

    const _onPress = (value: string | number, label: string | number) => {
        onChange && onChange({value, label});
    };

    return (
        <TouchableOpacity key={idx} activeOpacity={1}
                          onPress={() => _onPress(data.value, data.label)}
                          style={[styles.sb_areaLabelBase, style, params.isSelected && _selectedStyle]}>
            <Text style={[styles.sb_areaTextBase, textStyle, params.isSelected && _textSelectedStyle]} numberOfLines={1}>
                {data.label}
            </Text>
        </TouchableOpacity>
    )
};

export default ChoiceLabel




