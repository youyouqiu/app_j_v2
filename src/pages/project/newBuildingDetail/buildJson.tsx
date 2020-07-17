
export interface BuildValue {
  buildCategoryType: string
  status: any
  seatNum?: boolean
  row2Info?: any[]
  basicInfo: Array<BasicInfoItem>
}

export interface BasicInfoItem {
  func?: (...a: any[]) => void,
  key: string
  label: string,
  boolLabel?: string[],
  unit?: string,
  dictionary?: string
  moment?: boolean
  flex?: any
}

interface Around {
  key: number | string,
  label: string,
  icon: string,
  mapIcon: string,
  tag?: string
}

export const aroundType : Array<Around> = [{
  key: 1,
  label: '医院',
  icon: require('../../../images/icons/projectSurround/icon_yiyuan.png'),
  mapIcon: require('../../../images/icons/projectSurround/map_yiliao.png'),
  tag: '综合医院,专科医院,诊所,药店,急救中心,疾控中心'
}, {
  key: 2,
  label: '学校',
  icon: require('../../../images/icons/projectSurround/icon_jiaoyu.png'),
  mapIcon: require('../../../images/icons/projectSurround/map_jiaoyu.png'),
  tag: '高等院校,中学,小学,幼儿园'
}, {
  key: 3,
  label: '公交',
  tag: '公交车站',
  icon: require('../../../images/icons/projectSurround/icon_gongjiao.png'),
  mapIcon: require('../../../images/icons/projectSurround/map_gongjiao.png')
}, {
  key: 4,
  label: '地铁',
  tag: '地铁站',
  icon: require('../../../images/icons/projectSurround/icon_ditie.png'),
  mapIcon: require('../../../images/icons/projectSurround/map_ditie.png')
}, {
  key: 5,
  label: '银行',
  tag: '银行,ATM,信用社',
  icon: require('../../../images/icons/projectSurround/icon_yinghang.png'),
  mapIcon: require('../../../images/icons/projectSurround/map_yinhang.png')
}, {
  key: 6,
  label: '娱乐',
  tag: '度假村,农家院,电影院,KTV,剧院,舞厅,网吧,游戏场所,洗浴按摩,休闲广场',
  icon: require('../../../images/icons/projectSurround/icon_yule.png'),
  mapIcon: require('../../../images/icons/projectSurround/map_yule.png')
}, {
  key: 7,
  label: '购物',
  tag: '购物中心,百货商场,超市,便利店,家电数码,商铺,集市',
  icon: require('../../../images/icons/projectSurround/icon_gouwu.png'),
  mapIcon: require('../../../images/icons/projectSurround/map_shenghuo.png')
}, {
  key: 8,
  label: '餐饮',
  tag: '中餐厅,外国餐厅,小吃快餐店,蛋糕甜品店',
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
  key: 'developers',
  label: '开发商',
  flex: 1,
  func: (list: {developerId: string, developerName: string}[]) => {
    return list.reduce((res: string, curr, index) => {
      if (curr.developerName) res += curr.developerName + `${index === list.length - 1 ? '' : ','}`;
      return res
    }, '').replace(/,/g, '\n')
  }
},{// 这个应该可以不用了吧 ---Kary
  key: 'developerName',
  label: '开发商',
  flex: 1,
}, {
  key: 'pmc',
  label: '物业公司',
  flex: 1
}, {
  key: 'housPMF,pmf',
  label: '物业费',
  flex: 1,
  func: (a: string, b: string) => {return `${a ? a + '元/㎡(住宅)' : ''}  ${b ? b + '元/㎡(商业)' : ''}`}
},
  {
  key: 'builtupArea',
  label: '项目建筑面积',
  unit: '㎡'
}, {
  key: 'plotRatio',
  label: '容积率',
}, {
  key: 'propertyTerm',
  label: '产权剩余',
  unit: '年'
}]


const buildJson : BuildJson = {
  1: { /**商铺 */
    buildCategoryType: '商铺',
    status: { // 商铺类型
      1: '期铺',
      2: '现铺'
    },
    basicInfo: [
      ...defaultBasicInfo,
      {
        key: 'housesNumber',
        label: '住宅规划户数',
        unit: '户'
      }, {
        key: 'buildingNum',
        label: '住宅楼栋总数',
        unit: '栋'
      },
      {
        key: 'greeningRate',
        label: '绿化率',
        unit: '%',
      },
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
      },
    ]
  },
  2: { /**车库 */
    buildCategoryType: '车库',
    status: {
      1: '期库',
      2: '现库'
    },
    basicInfo: [
      ...defaultBasicInfo,
      {
        key: 'housesNumber',
        label: '项目规划户数',
        unit: '户'
      }, {
        key: 'buildingNum',
        label: '项目楼栋总数',
        unit: '栋'
      },
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
        key: 'parkingProportionMolecule,parkingProportionDenominator',
        label: '车位配比',
        func: (a: any, b: any) => {return `${a}:${b}`}
      },
    ]
  },
  3: { /**写字楼 */
    buildCategoryType: '写字楼',
    status: {
      1: '期房',
      2: '现房'
    },
    seatNum: true, // 容纳工位
    basicInfo: [
      ...defaultBasicInfo,
      {
        key: 'housesNumber',
        label: '项目规划户数',
        unit: '户'
      }, {
        key: 'buildingNum',
        label: '项目楼栋总数',
        unit: '栋'
      },
      {
        key: 'greeningRate',
        label: '绿化率',
        unit: '%',
      },
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
        key: 'interiorFinish',
        label: '装修情况',
        dictionary: 'LEVEL_DECORATION_SITUATION'
      },{
        key: 'lobbyheight',
        label: '大堂层高',
        unit: 'm'
      },{
        key: 'isforeign',
        label: '是否涉外',
        boolLabel: ['是', '否']
      },{
        key: 'freightElevatorSum,elevatorSum',
        label: '电梯部数',
        flex: 1,
        func: (a: string, b: string) => {return (a ? `货梯${a}部  ` : '') + (b ? `客梯${b}部` : '')}
      },
    ]
  },
  4: { /**公寓 */
    buildCategoryType: '公寓',
    status: {
      1: '期房',
      2: '现房'
    },
    basicInfo: [
      ...defaultBasicInfo,
      {
        key: 'housesNumber',
        label: '公寓规划户数',
        unit: '户'
      }, {
        key: 'buildingNum',
        label: '公寓楼栋总数',
        unit: '栋'
      },
      {
        key: 'greeningRate',
        label: '绿化率',
        unit: '%',
      },
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
        key: 'interiorFinish',
        label: '装修情况',
        dictionary: 'LEVEL_DECORATION_SITUATION'
      },
    ]
  }
}

export const fileIcons: any = {
  xls: require('../../../images/icons/marketing/xls.png'),
  xlsx: require('../../../images/icons/marketing/xls.png'),
  pdf: require('../../../images/icons/marketing/pdf.png'),
  doc: require('../../../images/icons/marketing/doc.png'),
  docx: require('../../../images/icons/marketing/doc.png'),
};

export default buildJson