/**
 * @author: zxs
 * @date: 2020/5/7
 */
import {IReportRuleTypes} from "@/pages/project/shopDetail/types/ReportRuleTypes";
import moment from "moment";

export const defaultRuleData: Array<IReportRuleTypes> = [
  {key: 'reportTime', data: {label: '报备开始时间', value: '暂无数据'}},
  {key: 'reportValidity', data: {label: '报备有效期', value: '暂无数据'}},
  {key: 'takeLookValidity', data: {label: '到访保护期', value: '暂无数据'}},
  {key: 'liberatingStart', data: {label: '接访时间', value: '暂无数据'}},
  {key: 'mark', data: {label: '报备备注', value: '暂无数据'}},
];
const reportRuleFormat = (originalData: any = {}): Array<IReportRuleTypes> => {
  if (!originalData) return [];
  const {reportTime, liberatingStart, liberatingEnd} = originalData;

  const startTime = liberatingStart ? moment(liberatingStart).format('HH:mm') : '';
  const endTime = liberatingEnd ? moment(liberatingEnd).format('HH:mm') : '';

  return defaultRuleData.map((v, i) => {
    if (v.key === 'reportTime') {
      v.data.value = reportTime ? moment(reportTime).format('YYYY-MM-DD HH:mm') : '暂无数据';
    } else if (v.key === 'liberatingStart') {
      v.data.value = startTime && endTime ? startTime + '-' + endTime : '暂无数据'
    } else {
      v.data.value = originalData[v.key] || '暂无数据'
    }
    return v
  })
};

export default reportRuleFormat
