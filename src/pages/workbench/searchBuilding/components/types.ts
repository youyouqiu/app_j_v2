import {StyleProp, TextStyle, ViewStyle} from "react-native";
import {IRegionType} from "@/businessComponents/choice/choiceRegion/types";

/**
 * @author: zxs
 * @date: 2020/5/6
 */
export interface ILabelGroupPropsType {
    data: Array<ILabelGroupDataType>,
    selectValues?: Array<string>,
    onchange?: (params: Array<ILabelGroupOnchangeParamsType>) => void,
    multiple?: boolean,
    style?: StyleProp<ViewStyle>,
    selectedStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    textSelectedStyle?: StyleProp<TextStyle>,
    minSize?: number,
    maxSize?: number,
    flex?: boolean
}

export interface ILabelGroupOnchangeParamsType {
    key: string,
    value: string,
}

export type ILabelGroupDataType = {
    [key in string | number]: string | number;
};

export interface IAreaSubmitType {
    city: string,
    _district: string,
    _area: Array<string>,
    showText: Array<string>
}

export interface IChoiceAreaWrapperStateType {
    visible: boolean,
    regionSelectedValues: IRegionType
}


export interface IChoiceAreaWrapperPropsType {
    regionSelectedValues: IRegionType,
    onConfirm: (params: IRegionType) => void,
    projectLocation?: any,
    onReset?: () => void
}

export interface IChoiceLabelsPropsType {
    onChange: (params: { name?: string, value: boolean | number | string }) => void
}
