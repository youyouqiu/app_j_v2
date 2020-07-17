/**
 * Created by Kary on 2019/07/30 15:59.
 */
import {calculate, detail_Type} from "./calculate";

export interface keyLabelParam {
    key: number;
    label: string;
}

export type currColumnType = 'loan_key' | 'count_key' | 'year_key' | 'accumulationFund_key' | 'percent_key' | null;

export const equal_types = [
    {key: 0, label: '等额本息'},
    {key: 1, label: '等额本金'},
];

export const loan_types = [
    {key: 0, label: '商业贷款'},
    {key: 1, label: '公积金贷款'},
    {key: 2, label: '组合贷款'},
];

export const business_types = [
    {key: 0.049, label: '基准利率（4.9%）'},
    {key: 0.034, label: '基准利率7折（3.43%）'},
    {key: 0.0368, label: '基准利率75折（3.68%）'},
    {key: 0.0392, label: '基准利率8折（3.92%）'},
    {key: 0.0417, label: '基准利率85折（4.17%）'},
    {key: 0.0441, label: '基准利率9折（4.41%）'},
    {key: 0.0466, label: '基准利率95折（4.66%）'},
    {key: 0.0515, label: '基准利率1.05倍（5.15%）'},
    {key: 0.0539, label: '基准利率1.1倍（5.39%）'},
    {key: 0.0588, label: '基准利率1.2倍（5.88%）'},
    {key: 0.0637, label: '基准利率1.3倍（6.37%）'},
];

export const accumulationFund_types = [
    {key: 0.0325, label: '基准利率（3.25%）'},
    {key: 0.0227, label: '基准利率7折（2.27%）'},
    {key: 0.0244, label: '基准利率75折（2.44%）'},
    {key: 0.026, label: '基准利率8折（2.60%）'},
    {key: 0.0276, label: '基准利率85折（2.76%）'},
    {key: 0.0293, label: '基准利率9折（2.93%）'},
    {key: 0.0309, label: '基准利率95折（3.09%）'},
    {key: 0.0341, label: '基准利率1.05倍（3.41%）'},
    {key: 0.0358, label: '基准利率1.1倍（3.58%）'},
    {key: 0.039, label: '基准利率1.2倍（3.90%）'},
    {key: 0.0423, label: '基准利率1.3倍（4.23%）'},
];

export const year_types = [
    {key: 30 * 12, label: '30年'},
    {key: 29 * 12, label: '29年'},
    {key: 28 * 12, label: '28年'},
    {key: 27 * 12, label: '27年'},
    {key: 26 * 12, label: '26年'},
    {key: 25 * 12, label: '25年'},
    {key: 24 * 12, label: '24年'},
    {key: 23 * 12, label: '23年'},
    {key: 22 * 12, label: '22年'},
    {key: 21 * 12, label: '21年'},
    {key: 20 * 12, label: '20年'},
    {key: 19 * 12, label: '19年'},
    {key: 18 * 12, label: '18年'},
    {key: 17 * 12, label: '17年'},
    {key: 16 * 12, label: '16年'},
    {key: 15 * 12, label: '15年'},
    {key: 14 * 12, label: '14年'},
    {key: 13 * 12, label: '13年'},
    {key: 12 * 12, label: '12年'},
    {key: 11 * 12, label: '11年'},
    {key: 10 * 12, label: '10年'},
    {key: 9 * 12, label: '9年'},
    {key: 8 * 12, label: '8年'},
    {key: 7 * 12, label: '7年'},
    {key: 6 * 12, label: '6年'},
    {key: 5 * 12, label: '5年'},
    {key: 4 * 12, label: '4年'},
    {key: 3 * 12, label: '3年'},
    {key: 2 * 12, label: '2年'},
    {key: 12, label: '1年'},
];

export const count_types = [
    {key: 0, label: '按房价总额'},
    {key: 1, label: '按贷款总额'}
];

export const percent_types = [
    {key: 7, label: '7成'},
    {key: 6, label: '6成'},
    {key: 5, label: '5成'},
    {key: 4, label: '4成'},
    {key: 3, label: '3成'},
    {key: 2, label: '2成'},
];

export function getColumns(key: currColumnType): string[] {
    if (!key) return [];
    let columns: keyLabelParam[] = [];
    switch (key) {
        case 'count_key':
            columns = count_types;
            break;
        case 'percent_key':
            columns = percent_types;
            break;
        case 'year_key':
            columns = year_types;
            break;
        case 'accumulationFund_key':
            columns = accumulationFund_types;
            break;
        default:
            columns = [];
            break;
    }
    return columns.reduce((res: string[], curr: keyLabelParam) => {
        res.push(curr.label);
        return res;
    }, [])
};

interface optionType {
    commercialTotal: number;
    accumulationFundTotal: number;
    loan_key: number;
    percent_key: number;
    accumulationFund_key: number;
    year_key: number;
    count_key: number;
    basicPoint: number;
    LPR: number;
}

export function handleCount(option: optionType): detail_Type | null {
    let {commercialTotal, accumulationFundTotal, basicPoint, LPR, loan_key, percent_key, accumulationFund_key, year_key, count_key} = option;
    commercialTotal = +commercialTotal || 0;
    accumulationFundTotal = +accumulationFundTotal || 0;
    LPR = +LPR || 0;
    basicPoint = +basicPoint || 0;

    const parentActiveIndex = loan_key; // 贷款方式
    const commercial_total = ((count_key == 1 || loan_key == 2) ? commercialTotal : commercialTotal * percent_types[percent_key].key / 10); // 商业总额
    const accumulationFund_total = ((count_key == 1 || loan_key == 2) ? accumulationFundTotal : accumulationFundTotal * percent_types[percent_key].key / 10); // 公积金总额
    const interestRatePerMou0 = (LPR + basicPoint / 100) / 100; // 商业贷利率
    const interestRatePerMou1 = accumulationFund_types[accumulationFund_key].key; // 公积金利率
    const totalMouths = year_types[year_key].key; // 贷款年限


    let detail: any = null;
    switch (parentActiveIndex) {
        case 0:
            console.log('商业贷款');
            detail = calculate((+commercial_total) * 10000, +interestRatePerMou0 / 12, +totalMouths);
            break;
        case 1:
            console.log('公积金');
            detail = calculate((+accumulationFund_total) * 10000, +interestRatePerMou1 / 12, +totalMouths);
            break;
        case 2:
            console.log('组合贷款');
            const tmp: any = calculate((+commercial_total) * 10000, +interestRatePerMou0 / 12, +totalMouths);
            detail = calculate((+accumulationFund_total) * 10000, +interestRatePerMou1 / 12, +totalMouths);
            for (let key in detail) {
                if (typeof detail[key] === "number" && tmp.hasOwnProperty(key)) {
                    detail[key] = +((detail[key] + tmp[key]).toFixed(2));
                } else if (key === "repaymentTable") {
                    for (let arr in detail[key]['repayPerMouObjAi']) {
                        if (tmp[key].hasOwnProperty(arr)) {
                            for (let i = 0; i < detail[key][arr].length; i++) {
                                detail[key][arr][i] = +((detail[key][arr][i] + tmp[key][arr][i]).toFixed(2));
                            }
                        }
                    }
                    for (let arr in detail[key]['repayPerMouObjAp']) {
                        if (tmp[key].hasOwnProperty(arr)) {
                            for (let i = 0; i < detail[key][arr].length; i++) {
                                detail[key][arr][i] = +((detail[key][arr][i] + tmp[key][arr][i]).toFixed(2));
                            }
                        }
                    }
                }
            }
            break;
        default:
            detail = null;
            break;
    }

    return detail as detail_Type | null;
}