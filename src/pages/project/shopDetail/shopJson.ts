export type ShopCategoryType = 1 | 2 | 3 | 4
export interface InfoItem {
    key: string
    label: string
    boolLabel?: string[]
    isMoment?: boolean
    unit?: string
    single?: boolean
    dictionary?: string
}
export interface ShopInfo {
    shopCategoryType: string
    status: any
    row2Info: any[]
    basicInfo: InfoItem[]
    seatNum?: boolean
    shopUnique?: InfoItem[]
}
export type ShopJson = {
    [type in ShopCategoryType]: ShopInfo
}
const shopJson: ShopJson = {
    1: {
        shopCategoryType: '商铺',
        status: {
            1: '期铺',
            2: '现铺',
        },
        row2Info: [{
            key: 'shopType',
            label: '商铺类型',
            dictionary: 'SHOP_CATEGORY',
        }, {
            key: 'floors',
            label: '铺内层数',
            unit: '层',
        }, {
            key: 'width',
            label: '开间',
            unit: 'm',
        }, {
            key: 'depth',
            label: '进深',
            unit: 'm',
        }, {
            key: 'height',
            label: '层高',
            unit: 'm'
        }],
        basicInfo: [{
            key: 'buildingNo',
            label: '所属楼栋'
        }, {
            key: 'floorNo',
            label: '所属楼层',
        }, {
            key: 'toward',
            label: '朝向',
            dictionary: 'SHOP_TOWARD'
        }, {
            key: 'trueHeight',
            label: '商铺净高',
            unit: 'm'
        }, {
            key: 'outsideCorridorWidth',
            label: '外廊道宽',
            unit: 'm'
        }, {
            key: 'voltage',
            label: '电压',
            unit: 'v'
        }, {
            key: 'groundLoad',
            label: '地面荷载',
            unit: 'kg/㎡'
        }, {
            key: 'outsideArea',
            label: '外摆区域',
            unit: '㎡'
        }, {
            key: 'isMazoutChannel',
            label: '生化池',
            boolLabel: ['已连接', '未连接']
        }, {
            key: 'isMuchChannel',
            label: '运渣通道',
            boolLabel: ['已连接', '未连接']
        }, {
            key: 'isUnloadArea',
            label: '卸货平台',
            boolLabel: ['有', '没有']
        }, {
            key: 'doubleLayer',
            label: '一拖二',
            boolLabel: ['是', '否']
        }, {
            key: 'propertyTerm',
            label: '产权年限',
            unit: '年'
        }, {
            key: 'landExpireDate',
            label: '产权到期',
            isMoment: true
        }, {
            key: 'preferentialPolicies',
            label: '优惠政策',
            single: true,
        }],
        shopUnique: [{
            key: 'freeArea',
            label: '赠送面积',
            unit: '㎡'
        }, {
            key: 'hasStreet',
            label: '临街',
            boolLabel: ['是', '否'],
        }, {
            key: 'isFaceStreet',
            label: '双边街',
            boolLabel: ['是', '否'],
        }, {
            key: 'isCorner',
            label: '拐角铺',
            boolLabel: ['是', '否'],
        }]
    },
    2: {
        shopCategoryType: '车库',
        status: {
            1: '期库',
            2: '现库'
        },
        row2Info: [{
            key: 'garageType',
            label: '车位类型',
            dictionary: 'PARKING_TYPE'
        }, {
            key: 'width',
            label: '开间',
            unit: 'm',
        }, {
            key: 'depth',
            label: '进深',
            unit: 'm',
        }, {
            key: 'height',
            label: '层高',
            unit: 'm',
        }],
        basicInfo: [{
            key: 'buildingNo',
            label: '所属楼栋'
        }, {
            key: 'floorNo',
            label: '所属楼层',
        }, {
            key: 'columnSpace',
            label: '柱距',
            unit: 'm',
        }, {
            key: 'propertyTerm',
            label: '产权年限',
            unit: '年'
        }, {
            key: 'landExpireDate',
            label: '产权到期',
            isMoment: true
        }, {
            key: 'preferentialPolicies',
            label: '优惠政策',
            single: true,
        }],
    },
    3: {
        shopCategoryType: '写字楼',
        status: {
            1: '期房',
            2: '现房'
        },
        seatNum: true,
        row2Info: [{
            key: 'buildinglevel',
            label: '写字楼类型',
            dictionary: 'LEVEL_OFFICE_LEVEL'
        }, {
            key: 'width',
            label: '开间',
            unit: 'm',
        }, {
            key: 'depth',
            label: '进深',
            unit: 'm',
        }, {
            key: 'height',
            label: '层高',
            unit: 'm'
        }],
        basicInfo: [{
            key: 'buildingNo',
            label: '所属楼栋'
        }, {
            key: 'floorNo',
            label: '所属楼层',
        }, {
            key: 'toward',
            label: '朝向',
            dictionary: 'SHOP_TOWARD'
        }, {
            key: 'trueHeight',
            label: '楼层净高',
            unit: 'm'
        }, {
            key: 'propertyTerm',
            label: '产权年限',
            unit: '年'
        }, {
            key: 'landExpireDate',
            label: '产权到期',
            isMoment: true
        }, {
            key: 'preferentialPolicies',
            label: '优惠政策',
            single: true,
        }],
    },
    4: {
        shopCategoryType: '公寓',
        status: {
            1: '期房',
            2: '现房'
        },
        row2Info: [{
            key: 'apartmentType',
            label: '公寓类型',
            dictionary: 'APART_TYPE'
        }, {
            key: 'floors',
            label: '套内层数',
            unit: '层',
        }, {
            key: 'width',
            label: '开间',
            unit: 'm',
        }, {
            key: 'depth',
            label: '进深',
            unit: 'm',
        }, {
            key: 'height',
            label: '层高',
            unit: 'm'
        }],
        basicInfo: [{
            key: 'buildingNo',
            label: '所属楼栋'
        }, {
            key: 'floorNo',
            label: '所属楼层',
        }, {
            key: 'toward',
            label: '朝向',
            dictionary: 'SHOP_TOWARD'
        }, {
            key: 'trueHeight',
            label: '楼层净高',
            unit: 'm'
        }, {
            key: 'propertyTerm',
            label: '产权年限',
            unit: '年'
        }, {
            key: 'landExpireDate',
            label: '产权到期',
            isMoment: true
        }, {
            key: 'preferentialPolicies',
            label: '优惠政策',
            single: true,
        }],
    }
}

export default shopJson
