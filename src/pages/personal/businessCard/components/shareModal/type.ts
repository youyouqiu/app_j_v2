/**
 * @author: zxs
 * @date: 2020/6/22
 */
export interface ShareModalStateType {
  carouselIdx: number,
  visible: boolean
}

export interface ShareModalPropsType {
  sourceId: string,
  buildingTreeId: string,
  posterIds: Array<string>,
  slogan: string,
  from: string,
  visible: boolean,
  onDismiss: () => void,
  name: string
  icon: string,
  buildingId:string
}

export interface ShareModalCommonType {
  buildingTreeId: string,
  posterIds: Array<string>,
  slogan: string,
  from: string
}
