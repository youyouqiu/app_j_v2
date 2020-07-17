/** 输入框联想搜索
 * Created by Kary on 2020/05/27 09:23.
 */

import request from '../../utils/request';
import {ResponseCommon, ResponsePagination} from "@/services/typings/types";
const getApi = () => request.getUrl().api;

export const mapAssociateSearch = function (data: mapAssociateSearchRequest): mapAssociateSearchResponse {
  console.log(data, '请求体')
  return request.post(`${getApi()}/v2/api/maphouse/search`, {
    body: data
  })
}

export type mapAssociateSearchResponse = Promise<ResponsePagination<mapAssociateSearchExtension[]>>

export interface mapAssociateSearchRequest {
  city: string;
  keyWord: string|null;
}

export interface mapAssociateSearchExtension {
  type: number; // 区分区域或者楼期【1：城市，2：二级区域，3：三级区域，4：楼期】
  treeCategory: number; // (1 商铺,2 车库,3 写字楼,4 公寓)
  buildingTreeId?: string; // 城市code或者楼期id
  value: string; // 区域或者楼期名称
  number: number; // 楼期数量
  city?: string;
  cityName?: string;
  district?: string;
  districtName?: string;
  area?: string;
  areaName?: string;
}
export type mapAssociateSearchItemParam = {label: string} & mapAssociateSearchExtension


const type = {1: '城市', 2: '城区', 3: '街道', 4: '项目', };

export function handleMapAssociateSearchExtension(list: mapAssociateSearchExtension[]) {
  return list.reduce((res, curr) => {
    let item: mapAssociateSearchItemParam = {
      ...curr,
      // @ts-ignore
      label: [1,2,3].includes(curr.type) ? `${type[curr.type]}` : `${curr.treeCategory}`
    };
    res.push(item);
    return res;
  }, [] as mapAssociateSearchItemParam[])
}