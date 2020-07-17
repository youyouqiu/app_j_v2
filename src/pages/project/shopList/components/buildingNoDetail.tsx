/**
 * @author: zxs
 * @date: 2020/5/21
 */
import {IBuildingNoDetailPropsType, IShopListSearchNewResponsesType} from "@/pages/project/shopList/types";
import styles from "@/pages/project/shopList/styles";
import {ActivityIndicator, Image, Text, TouchableOpacity, View} from "react-native";
import React, {useState, useEffect} from "react";
import navigation from "@/utils/navigation";
import {findLastIndex} from 'lodash'
import {ScrollView} from "react-native-gesture-handler";
// import { ScrollView } from "react-native-gesture-handler";

const statusStyle: any = {
  2: {text: '在售', backgroundColor: '#56A1F0', color: '#FFFFFF', priceBackgroundColor: '#fff'},
  10: {text: '已售', backgroundColor: '#FF7F6D', color: '#FFFFFF', priceBackgroundColor: '#FF7F6D'},
};
const BuildingNoDetail = ({floorList, shopInfoLoading, onPressFloor, shopInfo, choiceOption}: IBuildingNoDetailPropsType) => {


  const gotoShopDetail = (params: IShopListSearchNewResponsesType) => {
    const routerParams = {
      shopId: params.id,
      buildingTreeId: params.buildingTreeId
    };
    navigation.push({type: 'Navigation/PUSH', routeName: 'shopDetail', params: routerParams})
  };
  const soldNumber = shopInfo?.soldNumber || 0
  const onsaleNumber = shopInfo?.onsaleNumber || 0
  const shopListSearchNewResponses = shopInfo?.shopListSearchNewResponses || []
  const totalNum = soldNumber + onsaleNumber
  const saleStatus = choiceOption?.saleStatus || []
  const loadingContent = (
    <View style={[styles['floorListLoading']]}>
      <ActivityIndicator/>
      <Text style={[styles['floorListLoadingText']]}>数据加载中…</Text>
    </View>
  );
  const emptyContent = (
    <View style={[styles['noShopData']]}>
      <Image style={[styles['noShopDataImg']]} source={require('@/images/pictures/noShopData.png')}/>
      <Text style={[styles['noShopDataText']]}>抱歉～小铺正在努力为您录入铺源</Text>
    </View>
  );
  let renderContent = loadingContent;
  if (!shopInfoLoading && shopListSearchNewResponses.length === 0) {
    renderContent = emptyContent;
  }
  return (
    <View style={[styles['floorScrollWrapper']]}>
      <View>
        <ScrollView showsHorizontalScrollIndicator={false} style={[styles['floorScroll']]} horizontal>
          {floorList.map(item => (
            <TouchableOpacity onPress={() => onPressFloor(item)} style={[styles['floorListItem'], item.active ? styles['activeFloorListItem'] : null]}>
              <Text style={[styles['floorText'], item.active ? styles['activeFloorText'] : null]}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{flex: 1}}>
        <ScrollView style={[styles['buildingNoDetail']]}>
          <View style={styles['row1']}>
            <View style={[styles['floorPrice']]}>
              <View style={[styles['floorPriceOne']]}>
                <Image style={[styles['money']]} source={require('@/images/icons/project/money.png')}/>
                <Text style={[styles['moneyText']]}>均价</Text>
              </View>
              <Text style={styles['moneyNumber']}>{shopInfo?.averagePrice}元/㎡</Text>
            </View>
            <View style={[styles['floorSaleNum']]}>
              <View style={[styles['floorSaleNumRow1']]}>
                <Text style={[styles['zs']]}>{saleStatus === 10 ? '' : `在售：${onsaleNumber}`}</Text>
                <Text style={[styles['ys']]}>{saleStatus === 2 ? '' : `已售：${soldNumber}`}</Text>
              </View>
              <View style={[styles['floorSaleNumRow2']]}>
                <View style={[styles['ysLine'], {width: totalNum === 0 ? '0%' : `${soldNumber * 100 / totalNum}%`}]}/>
              </View>
            </View>
          </View>
          {shopListSearchNewResponses.length > 0 ? (
            <View style={styles.floorContent}>
              {shopListSearchNewResponses.map(item => {
                const status = (item.saleStatus === '2' && item.controlSaleStatus === '0') ? 2 : 10;
                // status 2 的情况是在售，其他都是已售
                return (
                  <TouchableOpacity onPress={() => gotoShopDetail(item)} activeOpacity={0.8} key={item.id} style={styles.roomItemWrap}>
                    <View style={[styles.roomNumWrap, {backgroundColor: statusStyle[status]?.backgroundColor}]}>
                      <View style={[styles.roomNumContainer, {backgroundColor: statusStyle[status]?.backgroundColor}]}>
                        <Text style={[styles.roomNum, {color: statusStyle[status]?.color}]} numberOfLines={1}>{item.number}</Text>
                      </View>
                    </View>
                    <Text style={[styles.roomArea, {backgroundColor: statusStyle[status]?.backgroundColor, color: statusStyle[status]?.color}]}>
                      {item.buildingArea}㎡
                    </Text>
                    {status === 2 ? (
                      <Text style={[styles.roomPrise, {backgroundColor: statusStyle[status]?.priceBackgroundColor}]} numberOfLines={1}>
                        {item.totalPrice + '万'}
                      </Text>
                    ) : (
                      <Text style={[styles.roomPriseNone, {backgroundColor: statusStyle[status]?.priceBackgroundColor}]}>&emsp;</Text>
                    )}
                  </TouchableOpacity>
                )
              })
              }
            </View>
          ) : renderContent}
        </ScrollView>
      </View>
    </View>
  )
};

export default BuildingNoDetail
