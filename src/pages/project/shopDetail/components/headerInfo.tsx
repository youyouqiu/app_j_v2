import React, {useState, useEffect} from 'react'
import {
  Image, View, Text, TouchableOpacity,
  Modal, StatusBar, Platform,
} from 'react-native'
import {Carousel} from '@new-space/teaset'
import ImageViewer from '@new-space/react-native-image-zoom-viewer'
import {Label} from '@/components/new-space'
import projectService from '@/services/projectService'
import {checkBlank} from '@/utils/utils'
import shopJson from '../shopJson'
import styles from '../styles'
import {FiledHalf, FiledWhole} from "@/pages/project/shopDetail/components/FiledComponent";
import {IHeaderInfoPropsType} from "@/pages/project/shopDetail/types/headerInfoTypes";
import {connect} from "react-redux";

const defaultSource = require('../../../../images/pictures/building_def.png');
const rankingIcon = require('../../../../images/icons/rankingIcon.png');
const arrowRight = require('../../../../images/icons/05.png');

const defaultImage = <Image source={defaultSource} style={styles.bd_carouselImage}/>;

const defaultState = {
  images: [],
  imageViewerIdx: 0,
  imageViewerVisible: false
};

const HeaderInfo = ({
                      shopId = '',
                      headerInfo,
                      navigation,
                      featureShopHeader
                    }: IHeaderInfoPropsType) => {

  const [state, setState] = useState(defaultState);
  useEffect(() => {
    shopId && queryFilesReq();
  }, [shopId]);

  const queryFilesReq = async () => {
    let {extension} = await projectService.queryFilesReq(shopId);
    const images = extension.map((v: any) => ({
      url: v.medium
    }));
    setState({...state, images});
  };

  const _onPress = () => {
    navigation.push('shopListSpecial', {featureId: featureShopHeader?.featureId || headerInfo.recommendId, curShopId: shopId})
  };

  const imageViewerToggle = (idx: any) => {
    if (Platform.OS === 'android') {
      if (!state.imageViewerVisible) {
        StatusBar.setBarStyle('light-content', true);
        StatusBar.setBackgroundColor('#000', true)
      } else {
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setBackgroundColor('rgba(255,255,255,0)', true)
      }
    }
    setState({
      ...state,
      imageViewerVisible: !state.imageViewerVisible,
      imageViewerIdx: typeof idx === 'number' ? idx : 0
    });
  };

  const CarouselContent = (
    <Carousel control style={{height: 275}}>
      {state.images.map((v: any, i) => (
        <TouchableOpacity activeOpacity={1} onPress={() => imageViewerToggle(i)} key={i}>
          <Image resizeMode='cover'
                 source={{uri: v.url}}
                 defaultSource={defaultSource}
                 style={styles.bd_carouselImage}
          />
        </TouchableOpacity>
      ))}
    </Carousel>
  );

  console.log('HeaderInfo', headerInfo);
  return (
    <View style={styles.sd_headerInfo_wrapper}>

      {/**轮播图*/}
      {state.images.length ? CarouselContent : defaultImage}

      <View style={styles.bd_headContainer}>

        <Text style={styles.bd_title} numberOfLines={1}>{headerInfo.name || ''}</Text>

        <View style={styles.sd_hi_labels}>
          <Label.ShopSaleStatus _key={headerInfo.saleStatus}/>
          <Label.ShopCategoryType _key={headerInfo.shopCategoryType}/>
          <Text style={styles.sd_hi_label_blank}/>
          {(headerInfo.recommendTitle && headerInfo.recommendId) ? (
            <TouchableOpacity activeOpacity={0.8} onPress={_onPress} style={styles.sd_hi_ranking_wrapper}>
              <Image style={styles.sd_hi_ranking_icon} source={rankingIcon}/>
              <Text style={styles.sd_hi_ranking_text}>入选“{featureShopHeader?.featureTitle || headerInfo.recommendTitle}”榜单</Text>
              <Image style={styles.sd_hi_ranking_arrow} source={arrowRight}/>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.sd_numerical_wrapper}>
          <View style={[styles.sd_numerical_item]}>
            <Text style={styles.sd_area_value}>
              {headerInfo.houseArea || ''}/{headerInfo.buildingArea || ''}<Text style={styles.sd_area_unit}>㎡</Text>
            </Text>
            <Text style={styles.sd_numerical_label}>套内/建面</Text>
          </View>
          <View style={styles.sd_numerical_line}/>
          <View style={[styles.sd_numerical_item, styles.sd_numerical_item_right]}>
            <Text style={styles.sd_price_value}>
              {headerInfo.totalPrice || ''}<Text style={styles.sd_price_unit || ''}>万</Text>
            </Text>
            <Text style={styles.sd_numerical_label}>参考总价</Text>
          </View>
          <View style={styles.sd_numerical_line}/>
          <View style={[styles.sd_numerical_item, styles.sd_numerical_item_right]}>
            <Text style={styles.sd_unitPrice_value}>
              {headerInfo.unitPrice || ''}元<Text style={styles.sd_unitPrice_unit || ''}>/㎡</Text>
            </Text>
            <Text style={styles.sd_numerical_label}>单价&nbsp;</Text>
          </View>
        </View>

        <View style={styles.sd_filed_wrapper}>
          {headerInfo.shopCategoryStr ? (
            <FiledHalf label={`${headerInfo.shopCategoryTypeStr}类型`} value={headerInfo.shopCategoryStr}/>
          ) : null}
          {[1, 4].includes(headerInfo.shopCategoryType) && <FiledHalf label='套内层数' value={headerInfo.floors+ '层'}/>}
          {headerInfo.width ? (
            <FiledHalf label={<Text>开间</Text>} value={`${headerInfo.width || ''}m`}/>
          ) : null}
          {headerInfo.depth ? (
            <FiledHalf label={<Text>进深</Text>} value={`${headerInfo.depth || ''}m`}/>
          ) : null}
          {headerInfo.height ? (
            <FiledHalf label={<Text>层高</Text>} value={`${headerInfo.height || ''}m`}/>
          ) : null}
        </View>

        {headerInfo.commission ? (
          <View style={styles.sd_active_wrapper}>
            <Text style={styles.sd_commission_label}>佣金 </Text>
            <Text style={styles.sd_commission_value}>{headerInfo.commission}</Text>
          </View>
        ) : null}

        {headerInfo.dealreward ? (
          <View style={styles.sd_active_wrapper}>
            <Text style={styles.sd_commission_label}>奖励 </Text>
            <Text style={styles.sd_commission_value}>{headerInfo.dealreward}</Text>
          </View>
        ) : null}

        {headerInfo.preferentialPolicies ? (
          <View style={styles.sd_active_wrapper}>
            <Text style={styles.sd_commission_label}>优惠 </Text>
            <Text style={styles.sd_commission_value}>{headerInfo.preferentialPolicies}</Text>
          </View>
        ) : null}

      </View>

      <Modal visible={state.imageViewerVisible} transparent={true} onRequestClose={() => imageViewerToggle('')} animationType='fade'>
        <ImageViewer imageUrls={state.images} index={state.imageViewerIdx} saveToLocalByLongPress={false} onClick={imageViewerToggle}/>
      </Modal>
    </View>
  )
};

const mapStateToProps = ({dictionaries}: any) => ({
  dictionaries,
});

export default connect(mapStateToProps)(HeaderInfo)

