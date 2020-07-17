import React, {PureComponent, ReactText} from 'react'
import {View, Text, Image, ViewStyle, TextStyle, StyleProp} from 'react-native'
import styles from './styles'
import shopJson from "@/pages/project/shopDetail/shopJson";

const status: any = {
  buildingSale: {
    1: {text: '在售', style: {backgroundColor: '#F4F5F9'}, textStyle: {color: '#1F3070'}},
    2: {text: '待售', style: {backgroundColor: '#EDF6FF'}, textStyle: {color: '#49A1FF'}},
    3: {text: '售罄', style: {backgroundColor: '#F8F8F8'}, textStyle: {color: '#CBCBCB'}},
    4: {text: '停售', style: {backgroundColor: '#FFE3BD'}, textStyle: {color: '#E58400'}},
  },
  shopSaleStatus: {
    1: {text: '待售', style: {backgroundColor: '#F8F8F8'}, textStyle: {color: '#CBCBCB'}},
    2: {text: '在售', style: {backgroundColor: '#E4F1FF'}, textStyle: {color: '#49A1FF'}},
    3: {text: '锁定', style: {backgroundColor: '#FFE3BD'}, textStyle: {color: '#E58400'}},
    4: {text: '已认购', style: {backgroundColor: '#FFE3BD'}, textStyle: {color: '#E58400'}},
    10: {text: '已售', style: {backgroundColor: '#FFDDD8'}, textStyle: {color: '#FE5139'}},
  },
  shopStatus: {
    1: {text: '期铺', style: {backgroundColor: '#EAEAEA'}, textStyle: {color: '#868686'}},
    2: {text: '现铺', style: {backgroundColor: '#FFDDD8'}, textStyle: {color: '#FE5139'}},
  },
  treeCategory: {
    1: {text: '商铺'},
    2: {text: '车库'},
    3: {text: '写字楼'},
    4: {text: '公寓'}
  }
};

export interface SoloBuidlingProps {
  isSolo?: boolean
}

export type ShopSaleStatusKeyType = 1 | 2 | 3 | 4 | 10
export type ShopCategoryTypeKeyType = 1 | 2 | 3 | 4
export type BuildingSaleStatusKeyType = 1 | 2 | 3 | 4
export type TreeCategoryKeyType = 1 | 2 | 3 | 4

export interface ShopSaleStatusType {
  _key: ShopSaleStatusKeyType
}

export interface ShopCategoryTypeType {
  _key: ShopCategoryTypeKeyType
}

export interface BuildingSaleStatusType {
  _key: BuildingSaleStatusKeyType
}

export interface TreeCategoryType {
  _key: TreeCategoryKeyType
}

export interface LabelType {
  _key: string,
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

/**
 * 独家
 * @param isSolo
 * @constructor
 */
const SoloBuilding = ({isSolo = true}: SoloBuidlingProps) => (
  <View style={!isSolo ? {display: 'none'} : null}>
    <Image style={styles.l_soloStyle} source={require('@/images/icons/07.png')}/>
  </View>
);

/**
 * 层级类型
 * @param props
 * @constructor
 */
const TreeCategory = ({_key}: TreeCategoryType) => (
  <View style={styles.label_base_style_wrap}>
    <Text style={styles.label_base_style}>
      {status.treeCategory[_key]?.text || _key}
    </Text>
  </View>
);

/**
 * 楼盘销售状态
 * @param _key
 * @constructor
 */
const BuildingSaleStatus = ({_key}: BuildingSaleStatusType) => (
  <View style={styles.label_base_style_wrap}>
    <Text style={[styles.label_base_style, status.buildingSale[_key]?.style, status.buildingSale[_key]?.textStyle]}>
      {status.buildingSale[_key]?.text}
    </Text>
  </View>
);


/**
 * 商铺销售状态
 * @param _key
 * @constructor
 */
const ShopSaleStatus = ({_key}: ShopSaleStatusType) => (
  <View style={styles.label_base_style_wrap}>
    <Text style={[styles.label_base_style, status.shopSaleStatus[_key]?.style]}>
      {status.shopSaleStatus[_key]?.text}
    </Text>
  </View>
);

const HighCommison = ({style}: { style: ViewStyle }) => (
  <View style={[styles.highCommison, style]}>
    <Image style={styles.img} source={require('@/images/icons/project/commision.png')}/>
    <Text style={styles.redText}>高佣金</Text>
  </View>
)

/**
 * 商铺分类
 * @param _key
 * @constructor
 */
const ShopCategoryType = ({_key}: ShopCategoryTypeType) => (
  <View style={styles.label_base_style_wrap}>
    <Text style={styles.label_base_style}>
      {shopJson[_key]?.shopCategoryType || ''}
    </Text>
  </View>
);

export default class Label extends PureComponent<LabelType> {

  // building
  static BuildingSaleStatus = BuildingSaleStatus;
  static SoloBuilding = SoloBuilding;
  static HighCommison = HighCommison;
  static TreeCategory = TreeCategory;

  // shop
  static ShopSaleStatus = ShopSaleStatus;
  static ShopCategoryType = ShopCategoryType;

  render() {
    return (
      <View style={[styles.label_base_style_wrap, this.props.style]}>
        <Text style={[styles.label_base_style, this.props.textStyle]}>
          {this.props._key}
        </Text>
      </View>
    )
  }
}
