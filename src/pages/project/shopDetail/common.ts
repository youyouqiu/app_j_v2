import {ImageSourcePropType} from "react-native";

export interface FACILITIES_ITEM_TYPE {
    label: string,
    icon1: ImageSourcePropType,
    icon2: ImageSourcePropType,
    type: Set<number>
}

export interface FACILITIES_TYPE {
    [key: string]: FACILITIES_ITEM_TYPE
}

export const FACILITIES: FACILITIES_TYPE = {
    UP_WATER: {
        label: '上水',
        icon1: require('../../../images/icons/facilitiesIcon/shangshui1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/shangshui2.png'),
        type: new Set([1, 3, 4]),
    },
    DOWN_WATER: {
        label: '下水',
        icon1: require('../../../images/icons/facilitiesIcon/xiashui1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/xiashui2.png'),
        type: new Set([1, 3, 4]),
    },
    HEATING: {
        label: '暖气',
        icon1: require('../../../images/icons/facilitiesIcon/nuanqi1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/nuanqi2.png'),
        type: new Set([1, 4]),
    },
    NATURAL_GAS: {
        label: '天然气',
        icon1: require('../../../images/icons/facilitiesIcon/tianranqi1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/tianranqi2.png'),
        type: new Set([1, 4]),
    },
    FLUE: {
        label: '烟道',
        icon1: require('../../../images/icons/facilitiesIcon/yandao1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/yandao2.png'),
        type: new Set([1, 3, 4]),
    },
    EXHAUST_PIPE: {
        label: '排气管道',
        icon1: require('../../../images/icons/facilitiesIcon/pqgd1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/pqgd2.png'),
        type: new Set([1]),
    },
    OPEN_FIRE: {
        label: '可明火',
        icon1: require('../../../images/icons/facilitiesIcon/keminghuo1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/keminghuo2.png'),
        type: new Set([1]),
    },
    DETACHABLE: {
        label: '可拆分',
        icon1: require('../../../images/icons/facilitiesIcon/kechaifen1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/kechaifen2.png'),
        type: new Set([1, 4]),
    },
    PASSENGER_ELEVATOR: {
        label: '客梯',
        icon1: require('../../../images/icons/facilitiesIcon/keti1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/keti2.png'),
        type: new Set([1]),
    },
    FREIGHT_ELEVATOR: {
        label: '货梯',
        icon1: require('../../../images/icons/facilitiesIcon/huoti1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/huoti2.png'),
        type: new Set([1]),
    },
    ESCALATOR: {
        label: '扶梯',
        icon1: require('../../../images/icons/facilitiesIcon/futi1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/futi2.png'),
        type: new Set([1]),
    },
    OUT_AREA: {
        label: '外摆区',
        icon1: require('../../../images/icons/facilitiesIcon/waibaiqu1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/waibaiqu2.png'),
        type: new Set([1]),
    },
    CENTER_AC: {
        label: '中央空调',
        icon1: require('../../../images/icons/facilitiesIcon/zhongyangkt1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/zhongyangkt2.png'),
        type: new Set([1]),
    },
    OVERHEAD_LAYER: {
        label: '架空层',
        icon1: require('../../../images/icons/facilitiesIcon/jiakongcheng1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/jiakongcheng2.png'),
        type: new Set([1, 4]),
    },
    PARKING: {
        label: '停车位',
        icon1: require('../../../images/icons/facilitiesIcon/tingchewei1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/tingchewei2.png'),
        type: new Set([1]),
    },
    ELECTRIC_METER: {
        label: '电表',
        icon1: require('../../../images/icons/facilitiesIcon/dianbiao1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/dianbiao2.png'),
        type: new Set([1]),
    },
    BATHROOM: {
        label: '卫生间',
        icon1: require('../../../images/icons/facilitiesIcon/weishengjian1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/weishengjian2.png'),
        type: new Set([4]),
    },
    KITCHEN: {
        label: '厨房',
        icon1: require('../../../images/icons/facilitiesIcon/chufang1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/chufang2.png'),
        type: new Set([4]),
    },
    AC: {
        label: '空调',
        icon1: require('../../../images/icons/facilitiesIcon/kongtiao1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/kongtiao2.png'),
        type: new Set([4]),
    },
    BALCONY: {
        label: '阳台',
        icon1: require('../../../images/icons/facilitiesIcon/yangtai1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/yangtai2.png'),
        type: new Set([3, 4]),
    },
    BAY_WINDOW: {
        label: '飘窗',
        icon1: require('../../../images/icons/facilitiesIcon/piaoc1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/piaoc2.png'),
        type: new Set([4]),
    },
    SEWAGE_PIPE: {
        label: '排污管道',
        icon1: require('../../../images/icons/facilitiesIcon/pwgd1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/pwgd2.png'),
        type: new Set([1, 3, 4]),
    },
    CHARGING_PORT: {
        label: '充电口',
        icon1: require('../../../images/icons/facilitiesIcon/cdk1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/cdk2.png'),
        type: new Set([2]),
    },
    CHARGING_GUN: {
        label: '充电枪',
        icon1: require('../../../images/icons/facilitiesIcon/cdq1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/cdq2.png'),
        type: new Set([2]),
    },
    INDEPENDENT_METER: {
        label: '独立电表',
        icon1: require('../../../images/icons/facilitiesIcon/dulidb1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/dulidb2.png'),
        type: new Set([2]),
    },
    DUCT: {
        label: '风管',
        icon1: require('../../../images/icons/facilitiesIcon/fengguan1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/fengguan2.png'),
        type: new Set([2]),
    },
    MONITOR: {
        label: '监控',
        icon1: require('../../../images/icons/facilitiesIcon/jiankong1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/jiankong2.png'),
        type: new Set([2]),
    },
    NEARBY_PILLAR: {
        label: '临柱',
        icon1: require('../../../images/icons/facilitiesIcon/lingzhu1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/lingzhu2.png'),
        type: new Set([2]),
    },
    NEARBY_AISLE: {
        label: '挨过道',
        icon1: require('../../../images/icons/facilitiesIcon/guodao1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/guodao2.png'),
        type: new Set([2]),
    },
    STAIRS: {
        label: '楼梯',
        icon1: require('../../../images/icons/facilitiesIcon/louti1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/louti2.png'),
        type: new Set([2]),
    },
    ELEVATOR: {
        label: '电梯',
        icon1: require('../../../images/icons/facilitiesIcon/dianti1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/dianti2.png'),
        type: new Set([2]),
    },
    UNIT_PORT: {
        label: '单元口',
        icon1: require('../../../images/icons/facilitiesIcon/danyuankou1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/danyuankou2.png'),
        type: new Set([2]),
    },
    INDIVIDUAL_WASHROOM: {
        label: '独立卫生间',
        icon1: require('../../../images/icons/facilitiesIcon/duliwsj1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/duliwsj2.png'),
        type: new Set([3]),
    },
    SPLITTABLE: {
        label: '可分割',
        icon1: require('../../../images/icons/facilitiesIcon/kefenge1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/kefenge2.png'),
        type: new Set([3]),
    },
    YINTAI: {
        label: '阴台',
        icon1: require('../../../images/icons/facilitiesIcon/yintai1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/yintai2.png'),
        type: new Set([3]),
    },
    REGISTERABLE: {
        label: '可注册',
        icon1: require('../../../images/icons/facilitiesIcon/kezhuce1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/kezhuce2.png'),
        type: new Set([3]),
    },
    EXIT: {
        label: '安全通道',
        icon1: require('../../../images/icons/facilitiesIcon/anquantd1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/anquantd2.png'),
        type: new Set([3]),
    },
    BROADBAND: {
        label: '宽带',
        icon1: require('../../../images/icons/facilitiesIcon/kuandai1.png'),
        icon2: require('../../../images/icons/facilitiesIcon/kuandai2.png'),
        type: new Set([3]),
    },
}
