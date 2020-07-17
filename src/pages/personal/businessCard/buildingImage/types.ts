/**
 * @author: zxs
 * @date: 2020/6/17
 */
import {NavigationRouter, NavigationScreenProp} from "react-navigation";

export interface BuildingImageStateType {
  photoCategories: Array<PhotoCategoriesType>,
  detailImages: Array<DetailImageType>,
  imagesData: Array<ImagesDataType>,
  allChecked: boolean,
  selectImageArr: Array<DetailImageType>
}

export interface PhotoCategoriesType {
  key: string,
  label: string,
  value: string,
}

export interface DetailImageType {
  group: string,
  fileUrl: string,
  url: string,
  sort: number
}

export interface ImagesDataType {
  label: string,
  group: string,
  images: Array<DetailImageType>
}

export interface BuildingImagePropsType {
  navigation: NavigationScreenProp<NavigationRouter>,
  dispatch: any,
  dictionaries: any
}

export interface BuildingImageCommonType {
  id: string,
  type: string,
}
