
export interface BuildValue {
    buildCategoryType: string
    status: any
    seatNum?: boolean
    row2Info?: any[]
    basicInfo: Array<BasicInfoItem>
}

export interface BasicInfoItem {
    func?: (...a: any[]) => void,
    key?: string 
    label: string, 
    boolLabel?: string[], 
    unit?: string, 
    dictionary?: string
    moment?: boolean
    flex?: any
}

export const aroundType : Array<{key: number | string,label: string, icon: string, mapIcon: string}> = [{
    key: 1,
    label: '医院',
    icon: require('../../../images/icons/projectSurround/icon_yiyuan.png'),
    mapIcon: require('../../../images/icons/projectSurround/map_yiliao.png')
}, {
    key: 2,
    label: '学校',
    icon: require('../../../images/icons/projectSurround/icon_jiaoyu.png'),
    mapIcon: require('../../../images/icons/projectSurround/map_jiaoyu.png')
}, {
    key: 3,
    label: '公交',
    icon: require('../../../images/icons/projectSurround/icon_gongjiao.png'),
    mapIcon: require('../../../images/icons/projectSurround/map_gongjiao.png')
}, {
    key: 4,
    label: '地铁',
    icon: require('../../../images/icons/projectSurround/icon_ditie.png'),
    mapIcon: require('../../../images/icons/projectSurround/map_ditie.png')
}, {
    key: 5,
    label: '银行',
    icon: require('../../../images/icons/projectSurround/icon_yinghang.png'),
    mapIcon: require('../../../images/icons/projectSurround/map_yinhang.png')
}, {
    key: 6,
    label: '娱乐',
    icon: require('../../../images/icons/projectSurround/icon_yule.png'),
    mapIcon: require('../../../images/icons/projectSurround/map_yule.png')
}, {
    key: 7,
    label: '购物',
    icon: require('../../../images/icons/projectSurround/icon_gouwu.png'),
    mapIcon: require('../../../images/icons/projectSurround/map_shenghuo.png')
}, {
    key: 8,
    label: '餐饮',
    icon: require('../../../images/icons/projectSurround/icon_canying.png'),
    mapIcon: require('../../../images/icons/projectSurround/map_canying.png')
}]

export interface BuildJson {
    1: BuildValue
    2: BuildValue
    3: BuildValue
    4: BuildValue
}

export type BuildCategoryType = 1 | 2 | 3 | 4

const defaultBasicInfo : Array<BasicInfoItem> = [{
    key: 'developerName',
    label: '开发商',
    flex: 1
}, {
    key: 'pmc',
    label: '物业公司',
    flex: 1
}, {
    key: 'housPMF,pmf',
    label: '管理费',
    flex: 1,
    func: (a: string, b: string) => {return `${a ? a + '元/㎡(住宅)' : ''}  ${b ? b + '元/㎡(商业)' : ''}`}
}, {
    key: 'housesNumber',
    label: '规划户数',
    unit: '户'
}, {
    key: 'buildingNum',
    label: '楼栋总数',
    unit: '栋'
}, {
    key: 'builtupArea',
    label: '建筑面积',
    unit: '㎡'
}, {
    key: 'greeningRate',
    label: '绿化率',
    unit: '%',
}, {
    key: 'floorSurface',
    label: '占地面积',
    unit: '㎡'
}, {
    key: 'plotRatio',
    label: '容积率',
}]


const buildJson : BuildJson = {
    1: { /**商铺 */
        buildCategoryType: '商铺',
        status: { // 商铺类型
            1: '期铺',
            2: '现铺'
        },
        row2Info: [{
                key: 'type',
                dictionary: 'HOUSE_TYPE'
            }, {
                key: 'floors',
                label: '铺内层数',
            }, {
                key: 'width',
                label: '开间',
            }, {
                key: 'depth',
                label: '进深',
            }, {
                key: 'toward',
                label: '朝向',
                dictionary: 'SHOP_TOWARD'
            }
        ],
        basicInfo: [
            ...defaultBasicInfo,
            {
                key: 'parkingSpace',
                label: '地面车位',
                unit: '个'
            },{
                key: 'basementParkingSpace',
                label: '地下车位',
                unit: '个'
            },{
                key: 'parkingProportionMolecule,parkingProportionDenominator',
                label: '车位配比',
                func: (a: any, b: any) => {return `${a}:${b}`}
            },{
                key: 'escalatorSum',
                label: '扶梯对数',
                unit: '对'
            },{
                key: 'freightElevatorSum,elevatorSum',
                label: '电梯部数',
                flex: 1,
                func: (a: string, b: string) => {return a ? `货梯${a}部  ` : '' + b ? `客梯${b}部` : ''}
            },{
                key: 'toiletScale',
                label: '卫生间综合覆盖率',
                flex: 1,
                unit: '%'
            },{
                key: 'populations',
                label: '附近3公里居住人数',
                flex: 1,
                unit: '人'
            },
        ]
    },
    2: { /**车库 */
        buildCategoryType: '车库',
        status: {
            1: '期库',
            2: '现库'
        },
        row2Info: [
            {
                key: 'type',
                dictionary: 'PARKING_TYPE'
            }, {
                key: 'width',
                label: '开间',
            }, {
                key: 'depth',
                label: '进深',
            }, {
                key: 'height',
                label: '层高',
            }, {
                key: 'columnSpace',
                label: '柱距'
            }
        ],
        basicInfo: [
            ...defaultBasicInfo,
            {
                key: 'parkingSpace',
                label: '地面车位',
                unit: '个'
            },{
                key: 'basementParkingSpace',
                label: '地下车位',
                unit: '个'
            },{
                key: 'roadWidth',
                label: '道路宽度',
                unit: 'm'
            },{
                key: 'parkingRadius',
                label: '最小回车半径',
                unit: 'm'
            },{
                key: 'parkingProportionMolecule,parkingProportionDenominator',
                label: '车位配比',
                func: (a: any, b: any) => {return `${a}:${b}`}
            },{
                key: 'voltage',
                label: '电压',
                unit: 'v'
            },{
                key: 'populations',
                label: '附近3公里居住人数',
                unit: '人',
                flex: 1
            }
        ]
    },
    3: { /**写字楼 */
        buildCategoryType: '写字楼',
        status: {
            1: '期房',
            2: '现房'
        },
        seatNum: true, // 容纳工位
        row2Info: [
            {
                key: 'type',
                dictionary: 'LEVEL_OFFICE_LEVEL'
            }, {
                key: 'width',
                label: '开间',
            }, {
                key: 'depth',
                label: '进深',
            }, {
                key: 'toward',
                label: '朝向',
                dictionary: 'SHOP_TOWARD'
            }
        ],
        basicInfo: [
            ...defaultBasicInfo,
            {
                key: 'parkingSpace',
                label: '地面车位',
                unit: '个'
            },{
                key: 'basementParkingSpace',
                label: '地下车位',
                unit: '个'
            },{
                key: 'parkingProportionMolecule,parkingProportionDenominator',
                label: '车位配比',
                func: (a: any, b: any) => {return `${a}:${b}`}
            },{
                key: 'voltage',
                label: '电压',
                unit: 'v'
            },{
                key: 'interiorfinish',
                label: '装修情况',
                dictionary: 'LEVEL_DECORATION_SITUATION'
            },{
                key: 'lobbyheight',
                label: '大堂层高',
                unit: 'm'
            },{
                key: 'isforeign',
                label: '是否涉外',
                flex: 1,
                boolLabel: ['是', '否']
            },{
                key: 'freightElevatorSum,elevatorSum',
                label: '电梯部数',
                flex: 1,
                func: (a: string, b: string) => {return a ? `货梯${a}部  ` : '' + b ? `客梯${b}部` : ''}
            },{
                key: 'populations',
                label: '附近3公里居住人数',
                flex: 1,
                unit: '人'
            },

        ]
    },
    4: { /**公寓 */
        buildCategoryType: '公寓',
        status: {
            1: '期房',
            2: '现房'
        },
        row2Info: [
            {
                key: 'type',
                dictionary: 'APART_TYPE'
            }, {
                key: 'floors',
                label: '套内层数',
            }, {
                key: 'width',
                label: '开间',
            }, {
                key: 'depth',
                label: '进深',
            }, {
                key: 'toward',
                label: '朝向',
                dictionary: 'SHOP_TOWARD'
            }
        ],
        basicInfo: [
            ...defaultBasicInfo,
            {
                key: 'parkingSpace',
                label: '地面车位',
                unit: '个'
            },{
                key: 'basementParkingSpace',
                label: '地下车位',
                unit: '个'
            },{
                key: 'parkingProportionMolecule,parkingProportionDenominator',
                label: '车位配比',
                func: (a: any, b: any) => {return `${a}:${b}`}
            },{
                key: 'voltage',
                label: '电压',
                unit: 'v'
            },{
                key: 'interiorfinish',
                label: '装修情况',
                dictionary: 'LEVEL_DECORATION_SITUATION'
            },{
                key: 'populations',
                label: '附近3公里居住人数',
                flex: 1,
                unit: '人'
            },
        ]
    }
}

export default buildJson