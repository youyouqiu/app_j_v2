import request from '../utils/request'

/**
 * 签约
 */
const ApiSing = {
    list: (api: string, params: ListConditions): Promise<ListResponse> => {
        return request.post(`${api}/v2.0/api/signing/list`, {
            method: 'POST',
            body: params,
        })
    },
    total: (api: string) => {
        return request.get(`${api}/v2.0/api/signing/list/total`)
    },
    search: (api: string, params: SearchConditions): Promise<SearchResponse> => {
        return request.post(`${api}/v2.0/api/signing/search`, {
            method: 'POST',
            body: params,
        })
    },
    detail: (api: string, params: any) => {
        return request.get(`${api}/v2.0/api/signing/details/${params}`)
    },
    baseDetail: (api: string, params: any) => {
        return request.get(`${api}/v2.0/api/buildings/details/${params}`)
    },
    zcDetail: (api: string, params: any) => {
        return request.post(`${api}/v2.0/api/signing/onsite`, {
            method: 'POST',
            body: params,
        })
    },
    hisory: (api: string, params: any) => {
        return request.get(`${api}/v2.0/api/signing/details/history/${params}`)
    },
}

//类型: (0-全部、1-认购[默认]、2-签约、3-退房)
export type Status = 0 | 1 | 2 | 3
export interface ListConditions {
    status: Status
    keyword?: string
    pageSize?: number
    pageIndex?: number
}
export type ListItem = {
    subscriptionNo?: string
    markTime?: string
    buildingId?: string
    buildingTreeId?: string
    buildingTreeName?: string
    status?: number
    shopId?: string
    shopName?: string
    buildingType?: string
    customerName?: string
    customerPhone?: string
    subscriptionTime?: string
    subscriptionId?: string
}
export interface ListResponse {
    pageIndex: number
    pageSize: number
    totalCount: number
    pageCount: number
    extension: ListItem[]
    code: string
    message: string
}
export interface SearchConditions {
    statusList: Status[]
    keyword: string
    pageSize?: number
    pageIndex?: number
}
export type SearchResponseItem = {
    [index: number]: ListResponse
}
export interface SearchResponse {
    extension: SearchResponseItem
    code: string
    message: string
}

export default ApiSing
