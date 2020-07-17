/**
 * Created by Kary on 2020/05/06 14:35.
 */

import request from '../../utils/request';
import {ResponseCommon} from "@/services/typings/types";
const getApi = () => request.getUrl().api;

export default function (data: deleteFavoriteRequest): Promise<ResponseCommon<null>> {
    console.log(data, '删除请求体')
    return request.post(`${getApi()}/v2/api/customer/favorite/cancel`, {
        body: data
    })
}

export interface deleteFavoriteRequest {
    buildingTreeIds?: string[];
    isAll?: boolean;
}