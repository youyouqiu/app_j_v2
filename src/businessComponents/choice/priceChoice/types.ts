/**
 * @author: zxs
 * @date: 2020/5/8
 */
import { ILabelGroupOnchangeParamsType } from "@/pages/workbench/searchBuilding/components/types";
import { IChoiceLabelDataPropsType } from "@/businessComponents/LabelGroup/types";

export interface IModalPriceChoicePropsType {
  label: string,
  content: JSX.Element,
  onchange?: (params: IModalPriceChoiceOnConfirmType) => void
  onConfirm?: (params: IModalPriceChoiceOnChangeType) => void,
  onReset?: () => void,
  totalPriceSelectValues?: Array<IChoiceLabelDataPropsType>
  unitPriceSelectValues?: Array<IChoiceLabelDataPropsType>
}

export type PriceType = 'total' | 'unit'



export type IModalPriceChoiceOnChangeType = {
  [key in PriceType]: Array<IChoiceLabelDataPropsType>
}

export type IModalPriceChoiceOnConfirmType = {
  [key in PriceType]: Array<IChoiceLabelDataPropsType>
}

export interface IModalPriceChoiceStateType {
  visible: boolean,
  label: string,
  //例如总价和单价的total,unit
  type: string | undefined,
  totalPriceSelectValues: Array<IChoiceLabelDataPropsType>
  unitPriceSelectValues: Array<IChoiceLabelDataPropsType>
}

export interface IChoicePricePropsType {
  dictionaries?: any,
  onchange?: (params: Array<IChoiceLabelDataPropsType>, type?: string) => void,
  onReset?: () => void,
  onConfirm?: (params: Array<ILabelGroupOnchangeParamsType>) => void,
  totalPriceSelectValues?: Array<IChoiceLabelDataPropsType>
  unitPriceSelectValues?: Array<IChoiceLabelDataPropsType>
  dispatch?: any
  config?: any
}
