/**
 * @author: zxs
 * @date: 2020/4/27
 */
import {IQuotationDetailType} from "@/pages/main/types/quotationTypes";
import moment from "moment";

const quotationFormat = (originalData: IQuotationDetailType): IQuotationDetailType => {
    const proportion = originalData.proportion || '';
    const price = originalData.price || '';
    const floatType = originalData.floatType || 0;
    const cityName = originalData.cityName || '';
    const _dateMonth = moment(originalData.dateMonth).format('MM');
    let dateMonth = /^0/.test(_dateMonth) ? _dateMonth.substr(1, 1) : _dateMonth;
    return {proportion, price, floatType, dateMonth, cityName} as IQuotationDetailType
};

export default quotationFormat
