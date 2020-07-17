/**
 * @author: zxs
 * @date: 2020/6/12
 */
import {BusinessCardModalStateType} from "@/models/businessCard/types";

export interface EditUserDescribePropsType {
  businessCard:BusinessCardModalStateType,
  dispatch:any
}
export interface EditUserDescribeStateType {
  inputText: string,
  labels: Array<string>,
}

export interface EditUserDescribeCommonType {
  loadingNumber:number,
  labels: Array<string>,
}

export interface UserDescribePropsType {
  dispatch:any,
  businessCard:BusinessCardModalStateType,
}

export interface UserDescribeStateType {
  describe:string,
  labels:Array<string>
}
