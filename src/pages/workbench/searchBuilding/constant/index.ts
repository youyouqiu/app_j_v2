/**
 * @author: zxs
 * @date: 2020/4/29
 */
import {IScreenItemTypes} from "@/pages/workbench/searchBuilding/types";
import {IChoiceLabelDataPropsType} from "@/businessComponents/LabelGroup/types";


export const screenData: Array<IScreenItemTypes> = [
  {
    key: 'location',
    label: '区域'
  },
  {
    key: 'price',
    label: '价格'
  },
  {
    key: 'area',
    label: '建面'
  }
];

export const FEATURE_TYPE: Array<IChoiceLabelDataPropsType> = [
  {label: '超高挑', value: 1,},
  {label: '大开间', value: 2,},
  {label: '超大外摆', value: 3,},
  {label: '转角铺', value: 4,},
];

export const SHOP_TYPE_SELECTION = [
  {label: '商铺', value: 1},
  {label: '车库', value: 2},
  {label: '写字楼', value: 3},
  {label: '公寓', value: 4},
];

export const FEATURE_SELECTION = [
  {label: '不限', value: undefined, defaultLabel: '卖点'},
  {label: '超挑高', value: 1},
  {label: '大开间', value: 2},
  {label: '超大外摆', value: 3},
  {label: '转角铺', value: 4},
];
