/**
 * @author: zxs
 * @date: 2020/6/16
 */
import {NavigationRoute, NavigationScreenProp} from "react-navigation";
import {BusinessCardModalStateType} from "@/models/businessCard/types";

export interface DetailCommentPropsType {
  dispatch: any,
  navigation: NavigationScreenProp<NavigationRoute>,
  businessCard: BusinessCardModalStateType
}

export interface DetailCommentStateType {
  inputText: string,
  evaluateList: Array<EvaluateTemplateType>
}

interface EvaluateTemplateType {
  label: string,
  explain: string,
  value: string
}

export interface DetailCommentCommonType {
  loadingNumber: number,
  id: string,
  detailId: string,
  detailName: string
}
