/**
 * Created by Kary on 2019/12/11 09:44.
 */

export class routeParam {
    customerInfo: currCustomerInfoParam | null = null;
    buildingInfo: selectBuildingInfoParam[] | null = null;
    type: 'formBuild' | 'customer' | 'continue' | 'ordinary' = 'ordinary'; // 从楼盘进入 从客户进入 从继续报备进入 不带参数的进入
}

export interface phoneNumItemTypes {
    value: string,
    isCanEdit: boolean,
    isNum: boolean
}

export interface phoneListTypes {
    phone: phoneNumItemTypes[];
    isMain: boolean;
    phoneId: string | null
}

export interface userLocationTypes {
    latitude: any,
    longitude: any
}

export class selectBuildingInfoParam {
    public buildTreeId: string | null = null;
    public buildingId: string | null = null;
    public buildingName: string | null = null;
}

/*export class selectCustomerInfoParam {
    public customerName: string | null = null;
    public customerId: string | null = null;
    public sex: number = 1;   // 客户性别（1-男，0-女）
    public phones: { phone: {phoneId: string, phoneNumber: string}, isMain: boolean }[] = [];
}*/

export interface reportTemplateParam {
    key: string | null;
    name: string | null;
    default: string;
    rule: string | null;
    isRequired: number;
}

export interface customizeFormParam {
    key: string,
    name: string,
    value: any,
    isRequired: boolean,
    isRight: boolean
}

export class buildsParam {
    public id:  string|null = null;
    public name:  string|null = null;
    public buildId: string|null = null;
    public isHasWatchTime: boolean = false;
    public numberType: string = '3,4';
    public customizeForm: customizeFormParam[] = [];
    public allTemplate: reportTemplateParam[] = [];
}

export class reportBuildsParam {
    public name: string|null = null;
    public isHasWatchTime: boolean = false;
    public numberType: string = '3,4';
    public customizeForm: customizeFormParam[] = [];
    public builds: buildsParam[] = [];
}

export class currBuildingInfoParam {
    public id: string | null = null;
    public name: string | null = null;
    public buildId: string | null = null;
    public isHasWatchTime: boolean = false;
    public numberType: string = '3,4';
    // public numberType: string = '11,0';
    public customizeForm: customizeFormParam[] = [];
}

export class currCustomerInfoParam {
    public customerName: string | null = null;
    public customerId: string | null = null;
    public isChooseCus: boolean = false;// 是否是选择的客户，其他页面传了客户参数的都是true
    public sex: number = 1;  // 客户性别（1-男，0-女）
    public phones: { phoneId: string | null, phoneNumber: string, isMain: boolean }[] = [];
}
