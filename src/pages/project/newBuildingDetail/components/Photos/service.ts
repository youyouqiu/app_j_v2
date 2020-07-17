import request from '@/utils/request'
import { ResponseCommon } from '@/services/typings/types'

export default {
  queryBuildingTreePictures: (id: string): Promise<ResponseCommon<BuildingTreePictures[]>> => {
    return request.get(`${request.getUrl().api}/v2.0/api/buildingtree/querybuildingtreepictures/${id}`)
  }
}

export interface BuildingTreePictures {
  buildingTreeId: string
  fileGuid: string
  fileUrl: string
  fileExt: string
  from: string
  group: '1' | '2' | '3' | '4' | '5'
  name: string
  isIcon: boolean
  images: {
    icon: string
    medium: string
    original: string
    row: string
    small: string
  }
  size: number
}
