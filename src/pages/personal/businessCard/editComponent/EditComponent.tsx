/**
 * @author: zxs
 * @date: 2020/6/10
 * 楼盘商铺通用编辑页
 */
import Page from "@/components/Page";
import React, {useEffect, useMemo, useState} from "react";
import {Image, Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Label} from "@/components/new-space";
import styles from './styles'
import {
  EditComponentCommonType,
  EditComponentPropsType,
  EditComponentStateType,
  NewExtensionType,
  OriginalDataType, SystemImagesType
} from "@/pages/personal/businessCard/editComponent/types";
import businessCardService from "@/services/businessCardService/businessCardService";
import {ResponseCommon} from "@/services/typings/types";
import {dataFormat} from "@/pages/personal/businessCard/editComponent/dataFormat";
import {Toast} from "@new-space/teaset";
import EditName from "@/pages/personal/businessCard/components/EditName";
import {connect, useSelector} from "react-redux";
import DetailImages from "@/pages/personal/businessCard/components/detailImages/DetailImages";
import ImagePicker from "@/components/ImagePicker";
import projectService from "@/services/projectService";
import ShareModal from "@/pages/personal/businessCard/components/shareModal/ShareModal";
import {wxApi} from "@/utils/wxUtils";
import request from "@/utils/request";
import {stringify} from "qs";
import StoreState from "@/models/types";
import {examineImage} from "@/utils/examine";

const default_1 = require('../../../../images/defaultImage/default_1.png');
const edit_blue = require('../../../../images/icons/edit_blue.png');
const upload_icon = require('../../../../images/pictures/upload.png');
const manage_icon = require('../../../../images/pictures/manage.png');
const share_dark = require('../../../../images/icons/share_dark.png');
const share_poster = require('../../../../images/icons/share_poster.png');
const share_friend = require('../../../../images/icons/share_friend.png');
const UUID = require('uuid');
const defaultState: EditComponentStateType = {
  detail: {} as NewExtensionType,
  visible: false,
  name: '',
  posterIds: [],
  slogan: '',
  shareModalVisible: false
};

const defaultCommon: EditComponentCommonType = {
  id: '',
  type: ''
};

const EditComponent = ({
                         dispatch,
                         businessCard,
                         navigation,
                         user
                       }: EditComponentPropsType
) => {

  const [state, setState] = useState<EditComponentStateType>(defaultState);

  const {userInfo} = useSelector((state: StoreState) => state.user);

  const common = useMemo<EditComponentCommonType>(() => {
    return {
      ...defaultCommon,
      id: navigation?.state?.params?.id,
      type: navigation?.state?.params?.type,
    }
  }, []);

  useEffect(() => {
    dispatch({type: 'businessCard/getEditDetailAsync', payload: {id: common.id, type: common.type}});
  }, []);

  useEffect(() => {
    if (Object.keys(businessCard.editDetail || {}).length > 0) {
      const newExtension = dataFormat(businessCard.editDetail);
      setState(prevState => ({
        ...prevState,
        detail: newExtension
      }));
      if (newExtension.buildingTreeId) buildingHasPoster(newExtension.buildingTreeId);
    }
  }, [businessCard.editDetail]);

  /**获取海报ids*/
  const buildingHasPoster = async (buildingTreeId: string) => {
    const res = await projectService.buildingHasPoster([buildingTreeId]).catch(err => {
      console.log('buildingHasPoster_err', err)
    });
    if (res && res.code === '0') {
      setState(prevState => ({
        ...prevState,
        posterIds: res?.extension[0]?.posterId || [],
        slogan: res?.extension[0]?.slogan || '',
      }));
    }
  };


  const modalToggle = async (e?: any) => {
    if (e) {
      const examineImageUrl = e.file.base64 || request.getUrl().file + '/image/' + e.extension;
      const examineImageType = e.file.base64 ? 'base64' : 'url';
      const res0 = await examineImage(examineImageUrl, examineImageType).catch(err => {
        Toast.message(err)
      });
      if (!res0) return;
      const _detail = {...state.detail};
      _detail.customImages = [..._detail.customImages, {fileUrl: e.extension, group: '0', sort: null}];
      setState(prevState => ({
        ...prevState,
        detail: _detail,
        visible: false
      }));
      const requestData = {
        id: state.detail.id,
        type: 1,
        images: _detail.customImages
      };
      const res = await businessCardService.saveDetailImage(requestData).catch();
      if (res.code === '0') {
        Toast.message('上传成功')
      }
    } else {
      setState(prevState => ({
        ...prevState,
        visible: !prevState.visible
      }))
    }
  };

  /**删除*/
  const _deleteOnClick = async (params: Array<SystemImagesType>, type: number) => {
    const _detail = state.detail;
    if (type === 1) {
      _detail.customImages = params;
    } else {
      _detail.systemImages = params;
    }

    const requestData = {
      id: state.detail.id,
      type: type,
      images: params.filter((v) => v.fileUrl)
    };
    const res = await businessCardService.saveDetailImage(requestData).catch(err => {
      Toast.message(err.message);
    });
    if (res.code === '0') {
      setState(prevState => ({
        ...prevState,
        detail: _detail,
        visible: false
      }));
      Toast.message('删除成功');
    }
  };

  const gotoEditEvaluate = () => {
    const params = {
      id: state.detail.id,
      detailName: state.detail.name,
      detailId: state.detail.buildingTreeId,
      type: common.type
    };
    navigation.navigate('detailComment', params)
  };

  const chooseSystemImages = () => {
    const params = {
      id: common.id || '',
      type: common.type,
      selectImageArr: state.detail.systemImages || []
    };
    navigation.navigate('buildingImage', params)
  };

  const shareModalToggle = () => {
    // setState(prevState => ({
    //   ...prevState,
    //   shareModalVisible: !prevState.shareModalVisible
    // }))
    navigation.navigate('poster', {
      posterIds: state.posterIds,  // 海报id数组
      buildingTreeId: state.detail.buildingTreeId,  // 楼盘id
      slogan: state.slogan,  // 海报分享的文案
      from: ''
    })
  };

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
    // 商铺2 楼盘1 首页3 sourceId 对应期组或者商铺id
    try {
      let thumbImage = state?.detail?.icon;
      const shareType = common.type === 'building' ? 1 : 2;
      const path = `pages/share/index?type=${shareType}&brokerId=${userInfo.id}&sourceId=${common.id}`;
      const data = {
        type: 'miniProgram',
        webpageUrl: 'https://www.baidu.com/',
        title: `您好，我是${userInfo.filiale}的${userInfo.trueName || ''}`,
        description: 'description',
        thumbImage: thumbImage,
        userName: 'gh_c12e5ce23095',
        path: path
      };
      wxApi.handleShareToSession(data).catch(e => {
        Toast.message('分享失败')
      });
    } catch (e) {
      Toast.message('分享失败')
    }
  };

  const imageLength = state.detail?.customImages?.filter((v) => v.fileUrl !== '')?.length || 0;

  const title = common.type === 'shop' ? state?.detail?.buildingTreeName + '-' + state?.detail?.shopName : state?.detail?.buildingTreeName;
  return (
    <View style={styles.eb_wrapper}>
      <Page title={title}>
        <Image style={styles.eb_building_img} defaultSource={default_1} source={{uri: state?.detail?.icon}}/>
        <View style={styles.eb_container}>
          <View style={styles.eb_building_baseInfo}>

            {/**编辑名称*/}
            <EditName name={state.detail.name} type={common.type} id={state.detail.id}/>

            {common.type === 'shop' ? (
              <View style={styles.eb_row}>
                <Label.ShopCategoryType _key={state.detail.shopCategoryType}/>
                {state.detail?.featureLabels?.map((v, i) => <Label style={styles.eb_label_style} textStyle={styles.eb_label_text_style} _key={v}/>)}
              </View>
            ) : (
              <View style={styles.eb_row}>
                <Label.TreeCategory _key={state.detail?.treeCategory}/>
                {state.detail?.labels?.map((v, i) => <Label style={styles.eb_label_style} textStyle={styles.eb_label_text_style} _key={v}/>)}
              </View>
            )}

            <View style={styles.eb_row}>
              {state.detail?.tipsArr?.map((v, i) => (
                <View style={styles.eb_building_row}>
                  <Text style={[styles.eb_building_value, {color: v.color ? v.color : '#FE5139'}]} numberOfLines={1}>{v.value}</Text>
                  <Text style={styles.eb_building_text}>{v.label}</Text>
                </View>
              ))}
            </View>
            <View style={styles.eb_row}>
              <View style={styles.eb_comment_content}>
                <View style={styles.eb_comment_header}>
                  <Text style={styles.eb_comment_title}>你的评价（非必填）</Text>
                  <TouchableOpacity style={styles.eb_comment_icon_wrapper}
                                    activeOpacity={0.8}
                                    onPress={gotoEditEvaluate}>
                    <Image style={styles.eb_comment_icon} source={edit_blue}/>
                  </TouchableOpacity>
                </View>
                <Text style={styles.eb_comment_tips}>{state.detail?.evaluate || '编辑您对此房源的评价'}</Text>
              </View>
            </View>
          </View>

          <View style={styles.eb_line}/>

          <View style={styles.eb_image_content}>
            <DetailImages title={`精选实拍照片(${imageLength}/5)`}
                          imageArr={state.detail.customImages}
                          size={5}
                          uploadOnClick={() => modalToggle()}
                          deleteOnClick={(params: Array<SystemImagesType>) => _deleteOnClick(params, 1)}
                          upload_icon={upload_icon}/>

            <DetailImages title='铺侦探房源相册'
                          imageArr={state.detail.systemImages}
                          uploadOnClick={chooseSystemImages}
                          deleteOnClick={(params: Array<SystemImagesType>) => _deleteOnClick(params, 2)}
                          upload_icon={manage_icon}/>
          </View>
        </View>
      </Page>


      <View style={styles.eb_footer}>
        {state.posterIds.length > 0 ? (
          <TouchableOpacity style={styles.eb_footer_poster} onPress={shareModalToggle}>
            <Image style={styles.eb_footer_share_icon} source={share_poster}/>
            <Text style={styles.eb_footer_poster_text}>推广海报</Text>
          </TouchableOpacity>
        ) : null}
        {state.posterIds.length > 0 ? (
          <View style={styles.eb_footer_line}/>
        ) : null}
        <TouchableOpacity style={styles.eb_footer_friend} onPress={shareBusinessCard} activeOpacity={0.8}>
          <Image style={styles.eb_footer_share_icon} source={share_friend}/>
          <Text style={styles.eb_footer_friend_text}>分享获客</Text>
        </TouchableOpacity>
      </View>

      {state.shareModalVisible ? (
        <ShareModal buildingTreeId={state.detail.buildingTreeId}
                    buildingId={state.detail.buildingId}
                    sourceId={common.type === 'shop' ? state.detail.shopId : state.detail.buildingTreeId}
                    visible={state.shareModalVisible}
                    from='个人名片'
                    icon={state.detail.icon}
                    name={state.detail.name}
                    onDismiss={shareModalToggle}
                    posterIds={state.posterIds}
                    slogan={state.slogan}/>
      ) : null}


      <ImagePicker addId={UUID.v1()} onSuccess={(e: any) => modalToggle(e)} visible={state.visible} onClose={() => modalToggle()}/>
    </View>
  )

};

const mapStateToProps = ({businessCard, user}: any) => {
  return {businessCard, user}
};
export default connect(mapStateToProps)(EditComponent)
