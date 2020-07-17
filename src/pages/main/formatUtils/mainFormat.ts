/**
 * @author: zxs
 * @date: 2020/4/27
 */
import {IAdvertisementType} from "@/pages/main/types/mainTypes";

export const advertisementFormat = (originalData: any = {}): IAdvertisementType => {
    const newData = {} as IAdvertisementType;
    for (let d in originalData) {
        if (originalData.hasOwnProperty(d)) {
        }
    }
    return newData
};
