/**
 * @author: zxs
 * @date: 2020/4/29
 */

export interface IStateType {
  dynamicList: Array<IDynamicResponseListType>,
  hasSubscribe: boolean,
  todayCount: number
}

export interface IDynamicResponseExtensionType {
  dynamicList: Array<IDynamicResponseListType>,
  hasSubscribe: boolean,
  todayCount: number
}

export interface IDynamicResponseListType {
  buildingTreeId: string,
  buildingTreeName: string,
  content?: string,
  createTime?: string,
  id?: string,
  imageFiles: Array<string>,
  label?: string,
  labelId?: string,
  sort?: number,
  title?: string
}

export interface IDynamicPropsType {
  refreshingRandom: number,
  cityCode: string,
  user: any,
  projectLocation: any
}

export interface IDynamicCacheDataType {
  dynamicList: Array<IDynamicResponseListType>,
  hasSubscribe: boolean,
  todayCount: number,
}

export interface IDynamicCacheType {
  [key: string]: IDynamicCacheDataType
}
