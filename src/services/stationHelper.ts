/**
 * Created by Kary on 2019/09/09 19:38.
 */
import request from '../utils/request';
const API = {
    customerReport: (api: string, body: {pageIndex: number, pageSize: number}) => {
        return request.post(`${request.getUrl().api}/v2.0/api/customerreport/querybuildingonsiteassistant`, {
            body: body
        })
    }
};
export default API