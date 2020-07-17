/**
 * @author: zxs
 * @date: 2020/5/8
 */
import {IFeatureShopResponseType, IFeatureShopType} from "@/pages/main/types/featureShopTypes";

export const featureShopFormat = (originalData: Array<IFeatureShopResponseType>):Array<IFeatureShopType> => {
    const newData = [] as Array<IFeatureShopType>;
    originalData.map((v, i) => {
        const {featureIcon, featureSubtitle, featureTitle, featureShopList,featureId} = v;

        const featureShopHeader = {
            featureIcon, featureSubtitle, featureTitle,featureId
        };
        const featureShop:IFeatureShopType = {
            featureShopHeader,
            featureShopList
        };
        newData.push(featureShop)
    });
    return newData
};
