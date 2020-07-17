/**
 * Created by Kary on 2020/05/12 17:06.
 */

import request from '../../utils/request';
import {ResponseCommon} from "@/services/typings/types";
const getApi = () => request.getUrl().api;

export default function (): Promise<ResponseCommon<null>> {
    return request.post(`${getApi()}/v2/api/message/readmessage/all`)
}