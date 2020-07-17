/**
 * @author: zxs
 * @date: 2020/4/28
 */
import {
  ISellingPointType,
  IShopDetailBaseInfoType,
  IShopDetailFormatReturnType,
  IShopDetailResponseBasicInfoType,
  IShopDetailResponseExtensionType,
} from "@/pages/project/shopDetail/types/shopDetailTypes";
import {IHeaderInfoType} from "@/pages/project/shopDetail/types/headerInfoTypes";
import shopJson from "@/pages/project/shopDetail/shopJson";
import {ShopCategoryTypeKeyType} from "@/components/new-space/components/Label";
import {IReportOtherInfoType} from "@/pages/project/shopDetail/types/ReportRuleTypes";
import {SELLING_POINTS} from "@/pages/project/shopDetail/constant";

const shopDetailFormat = (
  originalData: IShopDetailResponseExtensionType,
  dictionaries: any
): IShopDetailFormatReturnType => {
  const headerInfo = {} as IHeaderInfoType;
  const reportOtherInfo = {} as IReportOtherInfoType;
  const baseInfo = {} as IShopDetailBaseInfoType;
  const sellingPoint = [] as Array<ISellingPointType>;
  let facility = [] as Array<string>;

  try {
    const {name, buildingArea, houseArea, depth, width, height, totalPrice, saleStatus, floors}: IShopDetailResponseBasicInfoType = originalData.basicInfo;
    const {caseSystem, lookProcess, moneyProgramme}: IReportOtherInfoType = originalData;
    const {dealreward, preferentialPolicies, commission, shopTreeExtdata, buildingTreeId, buildingId, cityCode, buildingTreeIcon, recommendTitle, recommendId} = originalData;
    const shopCategoryType = originalData?.basicInfo?.shopCategoryType as ShopCategoryTypeKeyType;
    console.log('dictionaries', dictionaries);
    headerInfo.name = name || '';
    headerInfo.saleStatus = saleStatus || 1;
    headerInfo.buildingArea = buildingArea;
    headerInfo.floors = floors || 1;
    headerInfo.houseArea = houseArea || '';
    headerInfo.totalPrice = totalPrice;
    headerInfo.unitPrice = (totalPrice * 10000 / buildingArea).toFixed(0);
    headerInfo.depth = depth || '';
    headerInfo.width = width || '';
    headerInfo.height = height || '';
    headerInfo.shopCategoryType = shopCategoryType || 1;
    headerInfo.shopCategoryTypeStr = shopJson[shopCategoryType]?.shopCategoryType || '';
    headerInfo.shopCategory = shopTreeExtdata.shopCategory || 0;

    if (shopCategoryType === 1) {
      headerInfo.shopCategoryStr = dictionaries.shop_category_obj[shopTreeExtdata.shopCategory] || '';
    } else if (shopCategoryType === 2) {
      headerInfo.shopCategoryStr = dictionaries.parking_type_obj[shopTreeExtdata.shopCategory] || '';
    } else if (shopCategoryType === 3) {
      headerInfo.shopCategoryStr = dictionaries.level_office_level_obj[shopTreeExtdata.shopCategory] || ''
    } else if (shopCategoryType === 4) {
      headerInfo.shopCategoryStr = dictionaries.apart_type_obj[shopTreeExtdata.shopCategory] || ''
    }

    headerInfo.dealreward = dealreward || '';
    headerInfo.preferentialPolicies = preferentialPolicies || '';
    headerInfo.commission = commission || '';
    headerInfo.recommendTitle = recommendTitle || '';
    headerInfo.recommendId = recommendId || '';

    reportOtherInfo.caseSystem = caseSystem;
    reportOtherInfo.lookProcess = lookProcess;
    reportOtherInfo.moneyProgramme = moneyProgramme;

    baseInfo.buildingId = buildingId;
    baseInfo.buildingTreeId = buildingTreeId;
    baseInfo.cityCode = cityCode;
    baseInfo.buildingTreeIcon = buildingTreeIcon;

    shopTreeExtdata?.buyDictionary?.map((v) => {
      if (SELLING_POINTS.hasOwnProperty(v.key)) {
        sellingPoint.push({
          key: v.key,
          label: v.label,
          value: v.value,
          icon: SELLING_POINTS[v.key].icon
        })
      }
    });

    facility = shopTreeExtdata.facility;
  } catch (e) {
    console.log('shopDetailFormat_err', e)
  }

  return {headerInfo, facility, reportOtherInfo, baseInfo, sellingPoint}
};

export default shopDetailFormat
