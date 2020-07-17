/**
 * Created by Kary on 2020/05/25 18:00.
 */

import request from '../../utils/request';
import {ResponseCommon} from "@/services/typings/types";
import {BuildingTreeArea, BuildingTreePrice} from "@/services/building/buildingList";
const getApi = () => request.getUrl().api;

export default function (data: mapSearchRequest): mapSearchResponse {
  console.log(JSON.stringify(data), '请求体')
  return request.post(`${getApi()}/v2/api/buildingtree/mapsearch`, {
    body: data
  })
}
export type mapSearchResponse = Promise<ResponseCommon<mapSearchResponseExtension[]>>

export interface shopPriceType {
  minPrice: number,
  maxPrice: number
}
export interface shopAreasType {
  minArea: number | string,
  maxArea: number | string
}

export class mapSearchRequest {
  city?: string  // 城市code
  district?: string  // 区域
  areas?: string[]  // 片区
  buildingTreeAreas?: BuildingTreeArea[]  // 楼盘面积区间
  buildingTreeTotalPrices?: BuildingTreePrice[]  // 总价区间
  buildingTreeUnitPrices?: BuildingTreePrice[]  // 单价区间
  treeCategory?: number  // 楼期类型(1 商铺,2 车库,3 写字楼,4 公寓)
  projectType?: number  // 项目类型(1 独家,2 平行分销,3 电商)
  maxCommission?: boolean  // 是否高佣金
  cashPrize?: boolean  // 是否现金奖
  batelyBegin?: boolean  // 是否近期开盘
  discounts?: boolean  // 是否有优惠

}

export interface mapSearchResponseExtension {
  districtCode: string;
  districtName: string;
  buildingTreeNumber: number;
  buildingTreeList: mapSearchResponseBuildingTreeListItem[];
}

export interface mapSearchResponseBuildingTreeListItem {
  buildingTreeId: string;
  buildingTreeName: string;
  buildingName: string;
  minPrice: string;
  longitude: number;
  latitude: number;
  treeCategory: number;
}
export type districtListParam = {
  longitude: number,
  latitude: number,
  id: string,
  buildingTreeIds?: string[], // project
  name: string,
  buildingName?: string, // project
  number?: number,// level === region
  treeCategoryName?: number,// level === region
  level: 'region'|'project'
}
const treeCategoryType = {1: '商铺', 2: '车库', 3: '写字楼', 4: '公寓', };
export function handleDistrictList(district: mapSearchResponseExtension[]): districtListParam[] {
  return district.reduce((res, curr) => {
    let tempArr: districtListParam[] = [];
    const buildingTreeList: districtListParam[] = curr.buildingTreeList.reduce((res, item) => {
      const build: districtListParam = {
        id: item.buildingTreeId,
        name: item.buildingTreeName,
        longitude: item.longitude,
        latitude: item.latitude,
        level: 'project',
        buildingName: item.buildingName,
        // @ts-ignore
        treeCategoryName: (item.treeCategory && treeCategoryType[item.treeCategory]) ? treeCategoryType[item.treeCategory]:null,
      };
      res.push(build);
      tempArr.push(build);
      return res;
    }, [] as districtListParam[]);
    let items: districtListParam[] = [];
    let newArrObj: {[key: string]: districtListParam[]} = {};
    buildingTreeList.forEach((build, i) => {
      if (build.longitude && build.latitude && !newArrObj.hasOwnProperty(`${build.longitude}_${build.latitude}`)) {
        newArrObj[`${build.longitude}_${build.latitude}`] = tempArr.filter((item) => {
          return (item.longitude === build.longitude) && (item.latitude === build.latitude)
        });
      }
    });
    Object.values(newArrObj).forEach((sameCurr) => {
      let item = sameCurr[0];
      item.name = sameCurr[0].buildingName!;
      item.buildingTreeIds = sameCurr.map((i) => i.id);
      items.push(item)
    });
    res.push(...items);
    return res;
  }, [] as districtListParam[])
}
