/**
 * @author: zxs
 * @date: 2020/4/29
 */
import {IDynamicResponseExtensionType, IDynamicResponseListType} from "@/pages/main/types/dynamicType";
import {timeToString} from "@/utils/utils";

export const df_buildingDetailFormat = (originalData: IDynamicResponseExtensionType): IDynamicResponseExtensionType => {

    const newData = {
        dynamicList:[] as Array<IDynamicResponseListType>
    } as IDynamicResponseExtensionType;

    originalData.dynamicList.forEach((v) => {
        const buildingTreeId = v.buildingTreeId;
        const buildingTreeName = v.buildingTreeName;
        const title = v.title;
        const content = v.content;
        const label = v.label;
        const createTime = timeToString(v.createTime);
        const imageFiles = v.imageFiles || [];
        const buildingDetail: IDynamicResponseListType = {buildingTreeName,buildingTreeId, title, content, label, createTime,imageFiles};

        newData.dynamicList.push(buildingDetail)
    });
    newData.hasSubscribe = originalData.hasSubscribe;
    newData.todayCount = originalData.todayCount;
    return newData
};
