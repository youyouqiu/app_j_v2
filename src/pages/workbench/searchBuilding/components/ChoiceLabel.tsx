import styles from "../searchBuilding/styles";
import {StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle} from "react-native";
import React from "react";

const styleTransForm = (style: any) => {
    return style ? JSON.parse(JSON.stringify(style)) : style
};

const ChoiceLabel = (params: ChoiceLabelProps) => {
    const {idx, data, isSelected, labelSelectedOnchange, selectedStyle, style, textSelectedStyle, textStyle} = params;

    const _selectedStyle = Object.assign(styleTransForm(styles.sb_areaLabel_selected), styleTransForm(selectedStyle));

    const _textSelectedStyle = Object.assign(styleTransForm(styles.sb_areaText_selected), styleTransForm(textSelectedStyle));

    return (
        <TouchableOpacity key={idx} activeOpacity={1}
                          onPress={() => labelSelectedOnchange && labelSelectedOnchange(data.key, data.value)}
                          style={[styles.sb_areaLabelBase, style, isSelected && _selectedStyle]}>
            <Text style={[styles.sb_areaTextBase, textStyle, isSelected && _textSelectedStyle]} numberOfLines={1}>{data.value}</Text>
        </TouchableOpacity>
    )
};

export default ChoiceLabel

interface dataProps {
    key?: any,
    value?: any
}

interface ChoiceLabelProps {
    idx: any,
    data: dataProps,
    isSelected?: boolean,
    labelSelectedOnchange?: Function,
    style?: StyleProp<ViewStyle>,
    selectedStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    textSelectedStyle?: StyleProp<TextStyle>,
}
