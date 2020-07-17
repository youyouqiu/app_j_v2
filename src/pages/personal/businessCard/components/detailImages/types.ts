/**
 * @author: zxs
 * @date: 2020/6/16
 */
import {ImageSourcePropType} from "react-native";
import {SystemImagesType} from "@/pages/personal/businessCard/editComponent/types";

export interface DetailImagesPropsType {
  upload_icon: ImageSourcePropType,
  imageArr: Array<SystemImagesType>,
  title: string,
  uploadOnClick: () => void,
  deleteOnClick: (params: Array<SystemImagesType>) => void,
  size?: number
}

export interface DetailImagesStateType {
  imageArr: Array<SystemImagesType>,
}
