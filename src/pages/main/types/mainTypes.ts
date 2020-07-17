import {IBuildingTreeIds} from "@/pages/main/types/buildingLikeTypes";
import {ImageRequireSource} from "react-native";

/**
 * @author: zxs
 * @date: 2020/4/27
 */
export interface IAdvertisementType {
    [key: string]: Array<IAdvertisementDetailType>
}

export interface IAdvertisementDetailType {
    adName: string,
    id: string,
    cover: string,
    jumpType: number,
    link: string,
    site: string,
    time: string,
    timerStr: string
}

export interface IMainStateType {
    bl_buildingTreeIds: Array<any>;
    bannerList: Array<any>,
    fullScreenList: Array<any>,
    fullScreenListRandom:number,
    refreshing:boolean,
    refreshingRandom:number
}


export interface IMainLabelType {
    id: string,
    label: string,
    desc: string,
    icon: ImageRequireSource,
    color: string
}

export interface IAdvertisementDetailType {
    adName: string,
    cover: string,
    id: string,
    jumpType: number,
    link: string,
    timerStr: string
}
