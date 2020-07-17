/**
 * @author: zxs
 * @date: 2020/5/8
 */
import { ILabelGroupOnchangeParamsType } from "@/pages/workbench/searchBuilding/components/types";
import { IChoiceLabelDataPropsType } from "@/businessComponents/LabelGroup/types";

export interface IModalAreaChoicePropsType {
  label: string,
  content: JSX.Element,
  onchange?: (params: Array<IChoiceLabelDataPropsType>) => void
  onConfirm?: (params: Array<IChoiceLabelDataPropsType>) => void,
  onReset?: () => void,
  areaSelectValues?: Array<IChoiceLabelDataPropsType>
}

export interface IModalAreaChoiceStateType {
  visible: boolean,
  label: string,
  //例如总价和单价的total,unit
  type: string | undefined,
  totalPriceSelectValues: Array<IChoiceLabelDataPropsType>
  unitPriceSelectValues: Array<IChoiceLabelDataPropsType>
}

export interface IChoiceAreaPropsType {
  dictionaries?: any,
  onchange?: (params: Array<IChoiceLabelDataPropsType>, type?: string) => void,
  onReset?: () => void,
  onConfirm?: (params: Array<ILabelGroupOnchangeParamsType>) => void,
  areaSelectValues?: Array<IChoiceLabelDataPropsType>
  config?: any
  dispatch?: any
}
