/**
 * @author: zxs
 * @date: 2020/4/29
 */
import request from "@/utils/request";

export const mainService = {
    mainRecommendRequest: (body:any) => {
        return request.post(request.getUrl().api + '/v2/api/buildingtree/mainrecommend',{body})
    },
    dynamicListRequest: (body: any) => {
        return request.post(request.getUrl().api + '/v2/api/buildingtree/dynamic/home', {body})
    }
};
