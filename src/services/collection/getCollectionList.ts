/**
 * Created by Kary on 2020/05/06 14:35.
 */

import request from '../../utils/request';
import {IBuildingPreview} from "@/services/building/buildingList";
import {ResponsePagination} from "@/services/typings/types";
const getApi = () => request.getUrl().api;

export default function (data: getCollectionListRequest): Promise<ResponsePagination<IBuildingPreview[]>> {
    console.log(data, '请求体')
    return request.post(`${getApi()}/v2/api/customer/favorite/List`, {
        body: data
    })
}

export interface getCollectionListRequest {
    pageIndex: number;
    pageSize: number;
}


