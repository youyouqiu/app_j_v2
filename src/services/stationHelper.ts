/**
 * Created by Kary on 2019/09/09 19:38.
 */
import request from '../utils/request';
const API = {
    customerReport: (api: string, body: {pageIndex: number, pageSize: number}) => {
        return request.post(`${request.getUrl().api}/v2.0/api/customerreport/querybuildingonsiteassistant`, {
            body: body
        })
    },
    searchBuidingStation: (treeId: string) => {
        return request.get(`${request.getUrl().api}/v2.0/api/customerreport/analysis/buildinginfo/${treeId}`)
    },
    searchCustomerReportStation: (body: {treeId: string, startTime: string, endTime: string}) => {
        return request.post(`${request.getUrl().api}/v2.0/api/customerreport/analysis/number`, {
            body: body
        })
    },
    reportTemplate: (buildingTreeId: any) => {
        return request.get(request.getUrl().api + '/v2/api/customerreport/template/' + buildingTreeId)
    }
};
export default API
