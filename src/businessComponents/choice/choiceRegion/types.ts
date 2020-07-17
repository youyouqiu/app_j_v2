import {IAreaSubmitType} from "@/pages/workbench/searchBuilding/components/types";

/**
 * @author: zxs
 * @date: 2020/5/12
 */
export interface IRegionChoicePropsType {
    config?: any,
    projectLocation?: any,
    dispatch?: any,
    global?: any,
    location?: any,
    showTopCity?: boolean,
    visible?: boolean,
    changeVisible?: () => void,
    onConfirm?: ({city, _district, _area, showText}: IAreaSubmitType) => void,
    onChange?: (params: IRegionType) => void,
    regionSelectedValues?:IRegionType
}

export interface IRegionChoiceModalStateType {
    visible: boolean,
    label: string,
    regionSelectedValues:IRegionType
}

export interface IRegionType {
    city: string,
    cityName: string,
    district: string,
    districtName: string,
    area: Array<string>,
    areaName: Array<string>,
    regionText: Array<string>
}
