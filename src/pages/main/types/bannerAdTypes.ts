/**
 * @author: zxs
 * @date: 2020/4/29
 */
import {NavigationRoute, NavigationScreenProp} from "react-navigation";
import {IAdvertisementDetailType} from "@/pages/main/types/mainTypes";
import {useState} from "react";

export interface IBannerAdPropsTypes {
    bannerList: Array<IAdvertisementDetailType>,
    config: any,
    projectLocation: any,
    user: any,
    navigation: NavigationScreenProp<NavigationRoute>,
    sendPoint: any,
    advertisementDetail: (params: IAdvertisementDetailType, source: number, target: string) => void
}

export interface IBannerAdStateTypes {
    bannerList:Array<IAdvertisementDetailType>,
    showSkeleton:boolean

}
