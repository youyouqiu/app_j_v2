import {NavigationRoute, NavigationScreenProp} from "react-navigation";
import {IImageInfo} from '@new-space/react-native-image-zoom-viewer/built/image-viewer.type'

/**
 * @author: zxs
 * @date: 2020/5/21
 */

export interface ISaleControlDetails {
  visible: boolean
  onClosePress: (buildNo: string, floor: string) => void
  buildingNoList: IBuildingNoDetailType[]
  choiceOption?: any
  activeBuildingNo?: string
  defaultFloorList?: Array<IFloorItem>
  buildingTreeId?: string
  requestUrl?: any
  activeFloorNo?: string
  fullName?: string
  user?: any
}

export interface IshopFilterType {
  min: number
  max: number
}

export interface IShopResponse {
  averagePrice?: number
  onsaleNumber?: number
  soldNumber?: number
  shopListSearchNewResponses?: Array<IShopItem>
}

export interface IShopItem {
  id: string
  buildingId: string
  buildingTreeId: string
  buildingNo: string
  status: string
  buildingArea: number
  saleStatus: string
  floorNo: string
  number: string
  totalPrice: number
  controlSaleStatus: string
}

export interface IShopListPropsType {
  navigation: NavigationScreenProp<NavigationRoute>,
  dictionaries: any,
  requestUrl: any,
  dispatch: any,
  sendPoint: any,
  user: any
}

export interface IShopListStateType {
  buildingNoList: Array<IBuildingNoDetailType>,
  drawingNoList: Array<IBuildingNoDetailType>,
  showSkeleton: boolean,
  choiceOption: any
  loading: boolean
  visible: boolean
  buildingTreeId?: string
  imgloading: boolean
  fullName?: string
  saleControl: boolean
  floorList: Array<IFloorItem>
  shopInfoLoading: boolean
  drawingFloorList: Array<IFloorItem>
  shopInfo?: IShopResponse
  lastActiveFloor?: string
}

export interface IBuildingNoDetailRequestDataType {
  buildingTreeId: string,
  buildingNos: string,
  minPrice: number | null,
  maxPrice: number | null,
  minArea: number | null,
  maxArea: number | null,
  saleStatus: Array<string>,
  status: Array<string>,
}

export interface IBuildingNoDetailType {
  buildingId: string,
  buildingNo: string,
  buildingTreeId: string,
  count: number
  name: string,
  isDrawing?: boolean
  floorList?: Array<IFloorDetailType>
}

export interface IBuildingNoDetailPropsType {
  floorList: Array<IFloorItem>
  shopInfoLoading: boolean
  onPressFloor: (item: IFloorItem) => void
  shopInfo?: IShopResponse
  choiceOption?: any
}

export interface IFloorDetailType {
  averagePrice: number,
  floorNo: string,
  segmentation?: number
  shopListSearchNewResponses: Array<IShopListSearchNewResponsesType>
  data: Array<IShopListSearchNewResponsesType>
}

export interface IFloorItem {
  floor: string,
  name: string,
  count: number,
  active?: boolean,
  isDrawing?: boolean
}

export interface IShopListSearchNewResponsesType {
  buildingArea: number,
  buildingId: string,
  buildingNo: string,
  buildingTreeId: string,
  floorNo: string,
  id: string,
  number: string,
  saleStatus: string,
  status: any,
  totalPrice: number
}
