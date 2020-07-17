import {StyleProp, TextStyle, ViewStyle} from "react-native";

/**
 * @author: zxs
 * @date: 2020/5/11
 */
export interface IChoiceLabelPropsType {
    idx: any,
    data: IChoiceLabelDataPropsType,
    isSelected?: boolean,
    onChange?: (params: IChoiceLabelDataPropsType) => void,
    style?: StyleProp<ViewStyle>,
    selectedStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    textSelectedStyle?: StyleProp<TextStyle>,
}

export interface ILabelGroupPropsType {
    data: Array<IChoiceLabelDataPropsType>,
    selectValues?: Array<IChoiceLabelDataPropsType>,
    onchange?: (params: Array<IChoiceLabelDataPropsType>) => void,
    multiple?: boolean,
    style?: StyleProp<ViewStyle>,
    selectedStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    textSelectedStyle?: StyleProp<TextStyle>,
    minSize?: number,
    maxSize?: number,
    flex?: boolean
}


export interface IChoiceLabelDataPropsType {
    value: string | number
    label: string | number,
}
