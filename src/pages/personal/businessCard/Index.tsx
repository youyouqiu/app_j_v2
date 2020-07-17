/**
 * @author: zxs
 * @date: 2020/6/9
 */
import React, {useEffect} from "react";
import {Dimensions, Image, Modal, Text, TouchableOpacity, View} from "react-native";
import Page from "@/components/Page";
import BuildingsComponent from "./components/BuildingsComponent";
import ShopsComponent from "./components/ShopsComponent";
import styles from './styles'
import UserInfo from "@/pages/personal/businessCard/components/UserInfo";
import WechatCode from "@/pages/personal/businessCard/components/WechatCode";
import UserDescribe from "@/pages/personal/businessCard/components/UserDescribe";
import request from "@/utils/request";
import {wxApi} from "@/utils/wxUtils";
import {Toast} from "@new-space/teaset";
import {useSelector} from "react-redux";
import StoreState from "@/models/types";
import businessCardService from "@/services/businessCardService/businessCardService";
import {stringify} from "qs";

const share_friend = require('../../../images/icons/share_friend.png');

const BusinessCard = () => {

  const {userInfo} = useSelector((state: StoreState) => state.user);

  /**获取分享小程序图片*/
  const getShareImage = () => {
    const requestData = {
      trueName: userInfo.trueName,
      phoneNumber: userInfo.phoneNumber,
      avatarUrl: userInfo.avatar,
      companyName: userInfo.filialeShortName,
      companyAddress: userInfo.address
    };
    return request.getUrl().api + '/api/card/broker/image?' + stringify(requestData)
  };

  const shareBusinessCard = () => {
    try {
      let thumbImage = getShareImage();
      // 商铺2 楼盘1 首页3 sourceId 对应期组或者商铺id
      const path = `pages/share/index?type=${3}&brokerId=${userInfo.id}`;
      const data = {
        type: 'miniProgram',
        webpageUrl: 'https://www.baidu.com/',
        title: `您好，我是${userInfo.filiale}的${userInfo.trueName || ''}`,
        description: 'description',
        thumbImage: thumbImage,
        userName: 'gh_c12e5ce23095',
        path: path
      };
      console.log('shareBusinessCard', data);
      wxApi.handleShareToSession(data).catch(e => {
        Toast.message(e.message)
      });
    } catch (e) {
      Toast.message('分享失败')
    }
  };

  return (
    <View style={styles.bc_wrapper}>
      <Page title='个人名片' scroll={true}>
        {/**用户信息*/}
        <UserInfo/>

        {/**微信二维码*/}
        <WechatCode/>

        {/**个人简介*/}
        <UserDescribe/>
        <View style={styles.bc_container2}>
          <View style={styles.bc_recommend_building_wrapper}>
            <View style={styles.bc_recommend_tips_wrapper}>
              <Text style={styles.bc_recommend_tips_line}/>
              <Text style={styles.bc_recommend_tips}>添加推荐房源</Text>
              <Text style={styles.bc_recommend_tips_line}/>
            </View>
            <BuildingsComponent/>
            <ShopsComponent/>
          </View>
        </View>
      </Page>
      <View style={styles.bc_footer_wrapper}>
        <TouchableOpacity onPress={shareBusinessCard} style={styles.bc_footer_touch} activeOpacity={0.8}>
          <Image source={share_friend} style={styles.bc_footer_touch_icon}/>
          <Text style={styles.bc_footer_touch_text}>分享获客</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

};

export default BusinessCard
