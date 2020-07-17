import {IFeatureConfigTypes} from "@/pages/main/types/featureShopTypes";
import {IMainLabelType} from "@/pages/main/types/mainTypes";

const LGStart = {x: 0, y: 0};
const LGEnd = {x: 0, y: 0.75};

export const FEATURE_CONFIG: Array<IFeatureConfigTypes> = [
    {
        color: '#1F3070',
        labelIcon: require('../images/label_icon_2.png'),
        arrowIcon: require('../images/arrow_right_2.png'),
        lg_config: {
            start: LGStart,
            end: LGEnd,
            colors: ['#F4F7FF', '#FFFFFF']
        }
    },
    {
        color: '#0E5EB4',
        labelIcon: require('../images/label_icon_3.png'),
        arrowIcon: require('../images/arrow_right_3.png'),
        lg_config: {
            start: LGStart,
            end: LGEnd,
            colors: ['#EDF4FF', '#FFFFFF']
        }
    },
    {
        color: '#027394',
        labelIcon: require('../images/label_icon_4.png'),
        arrowIcon: require('../images/arrow_right_4.png'),
        lg_config: {
            start: LGStart,
            end: LGEnd,
            colors: ['#E7F6FF', '#FFFFFF']
        }
    },
    {
        color: '#027394',
        labelIcon: require('../images/label_icon_4.png'),
        arrowIcon: require('../images/arrow_right_4.png'),
        lg_config: {
            start: LGStart,
            end: LGEnd,
            colors: ['#E7F6FF', '#FFFFFF']
        }
    },
    {
      color: '#925500',
      labelIcon: require('../images/label_icon_1.png'),
      arrowIcon: require('../images/arrow_right_1.png'),
      lg_config: {
          start: LGStart,
          end: LGEnd,
          colors: ['#FEEBDC', '#FFFFFF']
      },
    },
    {
      color: '#4B6AC5',
      labelIcon: require('../images/label_icon_5.png'),
      arrowIcon: require('../images/arrow_right_5.png'),
      lg_config: {
          start: LGStart,
          end: LGEnd,
          colors: ['#F0F4FF', '#FFFFFF']
      },
    },
];


export const mainLabels: Array<IMainLabelType> = [
    {
        id: 'buildingList',
        color: '#1F3070',
        label: '全部楼盘',
        desc: '一键看新盘',
        icon: require('../images/label_1.png')
    },
    {
        id: 'searchShop',
        color: '#18AF25',
        label: '侦探寻铺',
        desc: '小铺帮你查',
        icon: require('../images/label_2.png')
    },
    {
      id: 'mapHouse',
      color: '#0082C0',
      label: '地图找铺',
      desc: '地图找铺',
      icon: require('../images/label_4.png')
    },
    {
        id: 'articleList',
        color: '#0082C0',
        label: '聚焦热点',
        desc: '资讯全知道',
        icon: require('../images/label_3.png')
    },
];
