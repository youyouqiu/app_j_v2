import {
    buildsParam,
    customizeFormParam,
    phoneListTypes,
    phoneNumItemTypes, reportBuildsParam,
    reportTemplateParam
} from "@/pages/workbench/report/types/addReport";
import {getReportTemplates} from "@/services/report";

/**
 * Created by Kary on 2019/12/11 09:43.
 */
/**
 * 是否是数字位置
 * @param type
 * @param i
 * @private
 */
const _isNumSite = (type: string = '3,4', i: number) => {
    let index = i + 1;
    const numberType = type.split(',');
    if ((index > 0 && index <= (+numberType[0])) || (index > (11 - (+numberType[1] || 0)) && index <= 11)) {// 排除星号位置
        return true;
    }
    return false;
};

/**
 * 填充一个默认电话号码
 * @param type
 * @private
 */
const _fillPhoneNumItem = (type: string = '3,4') => {
    return [1,2,3,4,5,6,7,8,9,10,11].reduce((res, curr: number, index) => {
        let isNumSite = _isNumSite(type, index);
        let item = {
            value: '',
            isCanEdit: isNumSite,
            isNum: isNumSite,
            // isFocus: false,
        };
        res.push(item);
        return res;
    }, [] as phoneNumItemTypes[])
};


/**
 * 提取一个电话号码
 * @param list
 * @private
 */
const _getNumbers = (list: phoneNumItemTypes[]):string => {
    return (list || []).reduce((res: string, curr: phoneNumItemTypes) => {
        res += (curr.value || '*');
        return res;
    }, '');
};

/**
 * 检查电话号码正确性
 * @param phoneList
 * @param numberType
 * @private
 */
const _checkPhone = (phoneList: phoneListTypes[], numberType: string = '3,4'): boolean => {
    if (!phoneList || !phoneList.length) return false;
    for (let curr of phoneList) {
        const phone = curr.phone || [];
        if (!phone.length || phone.length < 11) return false;
        for (let i = 0; i < phone.length; i ++) {
            if (i === 0) {
                if (phone[i].value !== (1+'')) return false;
            } else if (i === 1 && (+numberType.split(',')[0]) >= 2) {
                if (![3,4,5,6,7,8,9].includes((+phone[i].value))) return false;
            } else {
                const isNumSite = _isNumSite(numberType, i);
                if (isNumSite && !/^[0-9]$/.test(phone[i].value)) {
                    return false;
                }
            }
        }
    }
    return true;
};

/**
 * 是否有相同的全号码
 */
const _isHasIdenticalPhone = (phoneList: phoneListTypes[] = []) => {
    let hash: string[] = [];
    for(let i in phoneList) {
        const phone = _getNumbers(phoneList[i].phone);
        if(hash.includes(phone) && /^[0-9]$/.test(phone)) {
            return true;
        }
        hash.push(phone)
    }
    return false;
};

/**
 * 提取模板信息
 * @param tempArr
 * @private
 */
const _handleReportTemplate = (tempArr: reportTemplateParam[] | null): { numberType: string, isHasWatchTime: false, customizeForm: customizeFormParam[], tempArr: reportTemplateParam[] }  => {
    try {
        if (!tempArr || !tempArr.length) return {
            isHasWatchTime: false,
            numberType: '3,4',
            customizeForm: [],
            tempArr: []
        };
        let isHasWatchTime = false;
        let numberType = '3,4';
        let customizeForm: customizeFormParam[] = [];
        tempArr.forEach((curr) => {
            if (curr.key === 'customerPhone' && curr.rule) numberType = curr.rule;
            if (curr.key === 'watchTime') isHasWatchTime = true;
            if ((curr.key || '').indexOf('customize') === 0) {
                const item = {
                    key: curr.key!,
                    name: curr.name!,
                    isRequired: !!curr.isRequired,
                    value: null,
                    isRight: !curr.isRequired,
                };
                customizeForm.push(item);
            }
        });
        return {
            isHasWatchTime: isHasWatchTime,
            numberType: numberType,
            customizeForm: customizeForm,
            tempArr: tempArr
        };
    } catch (e) {
        return {isHasWatchTime: false, numberType: '3,4', customizeForm: [], tempArr: []}
    }
};

const _getNextRef = (phoneList: phoneListTypes[], currIndex: number, ref_index: 0|1, numberType: string): string|null => {
    // const phoneList = list.slice(currIndex, list.length);
    const _type: string[] = numberType.split(',');
    let type: number[] = [];
    type[0] = +_type[0];
    type[1] = +_type[1];
    for (let phoneIndex = 0 ; phoneIndex < phoneList.length; phoneIndex ++) {
        const _phoneItem = phoneList[phoneIndex].phone;
        const halfNumber: any = _getHalfNumber(_phoneItem, numberType);
        const {before, after} = halfNumber;
        let text: string = ref_index === 0 ? before : after;
        // 保证当前输入框填写完整再继续
        if (phoneIndex === currIndex && text.length !== type[ref_index]) return null;
        // 前一个输入框完整跳转下一个
        if (phoneIndex === currIndex && ref_index === 0 && after.length < type[1]) return `halfInput_after_${phoneIndex}`;

        if (phoneIndex > currIndex) {
            if (before.length < type[0]) return `halfInput_before_${phoneIndex}`;
            if (after.length < type[1]) return `halfInput_after_${phoneIndex}`;
        }
    }
    return null
};

const _getNextIndex = ( phoneList: phoneListTypes[], index: number, site: number): {nextPhoneIndex: number|null, nextNumIndex: number|null} => {
    let nextPhoneIndex: number|null = null;
    let nextNumIndex: number|null = null;
    for (let phoneIndex = 0; phoneIndex < phoneList.length; phoneIndex ++) {
        const _phoneItem = phoneList[phoneIndex].phone;
        for (let numIndex = 0; numIndex < _phoneItem.length; numIndex ++) {
            const _numItem = _phoneItem[numIndex];
            if (!_numItem.value && _numItem.isCanEdit && _numItem.isNum) {
                if (phoneIndex === index && numIndex > site) {
                    nextPhoneIndex = phoneIndex;
                    nextNumIndex = numIndex;
                    return {nextPhoneIndex: nextPhoneIndex, nextNumIndex: nextNumIndex}
                } else if (phoneIndex > index) {
                    nextPhoneIndex = phoneIndex;
                    nextNumIndex = numIndex;
                    return {nextPhoneIndex: nextPhoneIndex, nextNumIndex: nextNumIndex}
                }
            }
        }
    }
    return {nextPhoneIndex: nextPhoneIndex, nextNumIndex: nextNumIndex}
};

const _getHalfNumber = function (phoneList: phoneNumItemTypes[], numberType: string = '3,4'): {before: string, after: string, beforeLength: number, afterLength: number, fillText: string} {
    const nums = _getNumbers(phoneList);
    const type: string[] = numberType.split(',');
    const fillText: string = new Array(11 - ((+type[0]) + (+type[1]))).fill("*").join("");
    const before = nums.substring(0, +type[0]).replace(/[^\d]/g, "");
    const beforeLength = before.length >= (+type[0]) ? (+type[0]) : 20;
    const after = nums.substring(11 - (+type[1]), 11).replace(/[^\d]/g, "");
    const afterLength = after.length >= (+type[1]) ? (+type[1]) : 20;
    return {
        before: before,
        beforeLength: beforeLength,
        after: after,
        afterLength: afterLength,
        fillText: fillText
    }
};

export function _getAnticipateNumber (phone: string|null = '', numberType: string = '3,4'): string {
    return ((phone || '').split('') || []).reduce((res, curr, index) => {
        let isNum = _isNumSite(numberType, index);
        res += isNum ? curr : '*';
        return res
    }, '' as string).toString()
}

function handleReportTemplate(_build: any, ids: {build: string|null, buildingTreeId: string|null}[]): buildsParam {
    let build_id = ids.find((id) => id.buildingTreeId === _build.buildingTreeId);
    let build = new buildsParam();
    build.buildId = build_id ? build_id.build : null;
    build.isHasWatchTime = false;
    build.numberType = '3,4';
    build.customizeForm = [];
    build.id = _build.buildingTreeId;
    build.name = _build.buildingTreeName;

    build.allTemplate = _build.reportTemplate || [];
    (_build.reportTemplate || []).forEach((temp: reportTemplateParam) => {
        if (temp.key === 'customerPhone' && temp.rule) build.numberType = temp.rule;
        if (temp.key === 'watchTime') build.isHasWatchTime = true;
        if ((temp.key || '').indexOf('customize') === 0) {
            const item = {
                key: temp.key!,
                name: temp.name!,
                isRequired: !!temp.isRequired,
                value: null,
                isRight: !temp.isRequired,
                buildingTreeId: build.buildId!
            };
            build.customizeForm.push(item);
        }
    });
    return build;
}

function handleReportBuildInfo(list: any[], ids: {build: string|null, buildingTreeId: string|null}[]): reportBuildsParam {
    let reportBuilds = new reportBuildsParam();
    let names = '';
    let builds: buildsParam[] = [];
    let isHasWatchTime = false;
    let numberType_l: number[] = [];
    let numberType_r: number[] = [];
    let customizeForm: customizeFormParam[] = [];

    (list || []).forEach((_build: any, index) => {
        names += (_build.buildingTreeName + `${index < list.length - 1 ? '、' : ''}`);
        let build = handleReportTemplate(_build, ids);
        builds.push(build);
        build.isHasWatchTime && (isHasWatchTime = true);
        let curr_numberType = build.numberType.split(',');
        numberType_l.push(Number(curr_numberType[0]));
        numberType_r.push(Number(curr_numberType[1]));
        customizeForm.push(...build.customizeForm.reduce((res, curr) => {
            const item = customizeForm.find((_curr) => _curr.name === curr.name);
            if (!item) res.push(curr);
            return res;
        }, [] as customizeFormParam[]));
    });

    let l = Math.max(...numberType_l);
    let r = Math.max(...numberType_r);

    reportBuilds.name = names;
    reportBuilds.builds = builds;
    reportBuilds.isHasWatchTime = isHasWatchTime;
    reportBuilds.numberType = (l + r) >= 11 ? '11,0' : [l, r].toString();
    reportBuilds.customizeForm = customizeForm;
    console.log(reportBuilds, 'reportBuilds');
    return reportBuilds;
}


function _getBuildTemplateInfo(ids: {build: string|null, buildingTreeId: string|null}[] = []): Promise<reportBuildsParam> {
    return new Promise((resolve, reject) => {
        let buildingTreeIds = ids.reduce((res, curr) => {
            curr.buildingTreeId && res.push(curr.buildingTreeId);
            return res;
        }, [] as string[]);
        getReportTemplates({buildingTreeIds: buildingTreeIds})
            .then((res) => {
                const info: reportBuildsParam = handleReportBuildInfo(res.extension, ids);
                console.log(info, '楼盘信息')
                resolve(info)
            })
            .catch((e) => {
                reject(e)
            })
    })
}

export default {
    isNumSite: _isNumSite,
    fillPhoneNumItem: _fillPhoneNumItem,
    getNumbers: _getNumbers,
    checkPhone: _checkPhone,
    getNextIndex: _getNextIndex,
    handleReportTemplate: _handleReportTemplate,
    isHasIdenticalPhone: _isHasIdenticalPhone,
    getHalfNumber: _getHalfNumber,
    getNextRef: _getNextRef,
    getAnticipateNumber: _getAnticipateNumber,
    getBuildTemplateInfo: _getBuildTemplateInfo,
}

