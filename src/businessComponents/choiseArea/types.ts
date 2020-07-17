/**
 * @author: zxs
 * @date: 2020/5/6
 */
import {IAreaSubmitType} from "@/pages/workbench/searchBuilding/components/types";

export interface ChoiceAreaType {
    config?: any,
    projectLocation?: any,
    dispatch?: any,
    global?: any,
    location?: any,
    showTopCity?: boolean,
    visible?: boolean,
    areaSubmit?: any
    changeVisible?: () => void,
    onConfirm?:({city, _district, _area, showText}: IAreaSubmitType) => void,
}
