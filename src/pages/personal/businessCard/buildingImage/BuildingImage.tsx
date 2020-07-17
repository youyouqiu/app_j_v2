/**
 * @author: zxs
 * @date: 2020/6/10
 */
import {Image, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useMemo, useState} from "react";
import Page from "@/components/Page";
import styles from './styles'
import ImageCheckBox from "@/pages/personal/businessCard/components/ImageCheckBox";
import businessCardService from "@/services/businessCardService/businessCardService";
import {
  BuildingImageCommonType,
  BuildingImagePropsType,
  BuildingImageStateType,
  DetailImageType,
  ImagesDataType
} from "@/pages/personal/businessCard/buildingImage/types";
import {connect} from "react-redux";
import request from "@/utils/request";
import {Toast} from "@new-space/teaset";

const checkbox_1 = require('../../../../images/icons/checkbox_1.png');
const checkbox_2 = require('../../../../images/icons/checkbox_2.png');

const defaultState: BuildingImageStateType = {
  photoCategories: [],
  detailImages: [],
  imagesData: [],
  allChecked: false,
  selectImageArr: []
};

const defaultCommon: BuildingImageCommonType = {
  id: '',
  type: '',
};

const BuildingImage = ({
                         navigation,
                         dispatch,
                         dictionaries
                       }: BuildingImagePropsType) => {

  const [state, setState] = useState<BuildingImageStateType>(() => {
    return {
      ...defaultState,
      photoCategories: dictionaries.photo_categories,
      selectImageArr: navigation?.state?.params?.selectImageArr || [],
      id: navigation?.state?.params?.id || [],
    }
  });

  const common = useMemo<BuildingImageCommonType>(() => {
    return {
      ...defaultCommon,
      id: navigation?.state?.params?.id || '',
      type: navigation?.state?.params?.type || '',
    }
  }, []);

  useEffect(() => {
    !dictionaries.photo_categories && getPhotoCategory()
  }, []);

  useEffect(() => {
    dictionaries.photo_categories && getDetailImages();
  }, [state.photoCategories]);

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      photoCategories: dictionaries.photo_categories
    }));
  }, [dictionaries.photo_categories]);

  useEffect(() => {
    if (state.detailImages.length > 0) {
      assembleData(state.detailImages);
    }
  }, [state.detailImages]);

  const getPhotoCategory = () => {
    dispatch({
      type: 'dictionaries/getDictionaryDefines',
      payload: {
        requestUrl: request.getUrl().public,
        requestData: ['PHOTO_CATEGORIES']
      }
    })
  };

  const getDetailImages = async () => {
    const res = await businessCardService.getDetailImages(common.id).catch(err => {
      console.error('getDetailImages', err)
    });
    if (res.code === '0') {
      setState(prevState => ({
        ...prevState,
        detailImages: res.extension
      }))
    }
  };

  /**
   * 组装数据
   */
  const assembleData = (detailImages: Array<DetailImageType>) => {
    const imagesData = state.photoCategories.map((v1) => {
      const images = detailImages.filter((v2) => v1.value === v2.group);
      const len = images.length % 3;
      images.push(...new Array(len === 0 ? 0 : 3 - len).fill({fileUrl: ''}));
      const imagesDataItem: ImagesDataType = {
        label: v1.label,
        images: images,
        group: v1.value,
      };
      return imagesDataItem
    }).filter((v) => v.images.length > 0);
    setState(prevState => ({
      ...prevState,
      imagesData,
      allChecked: detailImages.length === state.selectImageArr.length
    }));
  };

  const onchange = (params: DetailImageType, checked: boolean) => {
    if (checked) {
      setState(prevState => ({
        ...prevState,
        selectImageArr: [...prevState.selectImageArr, params]
      }))
    } else {
      setState(prevState => ({
        ...prevState,
        selectImageArr: prevState.selectImageArr.filter((v) => v.fileUrl !== params.fileUrl)
      }))
    }
  };

  /**全选*/
  const selectAll = () => {
    setState(prevState => ({
      ...prevState,
      allChecked: !prevState.allChecked,
      selectImageArr: !prevState.allChecked ? prevState.detailImages : []
    }))
  };

  /**保存*/
  const saveImages = async () => {
    const requestData = {
      id: common.id,
      type: 2,
      images: state.selectImageArr
    };
    const res = await businessCardService.saveDetailImage(requestData).catch(err => {
      Toast.message(err.message)
    });
    if (res && res.code === '0') {
      Toast.message('保存成功');
      dispatch({type: 'businessCard/getEditDetailAsync', payload: {id: common.id, type: common.type}});
      navigation.goBack();
    }
  };

  const checkboxSource = state.allChecked ? checkbox_2 : checkbox_1;

  return (
    <View style={styles.bi_wrapper}>
      <Page title='楼盘名称'>
        <View style={styles.bi_container}>
          {state.imagesData.map((v1, i) => (
            <View style={styles.bi_item}>
              <Text style={styles.bi_label}>{v1.label}</Text>
              <View style={styles.bi_image_wrapper}>
                {v1?.images?.map((v2, i) => (
                  v2.fileUrl ? (
                    <ImageCheckBox urlObj={v2}
                                   checked={state.selectImageArr.some((v3) => v1.group === v3.group && v2.fileUrl === v3.fileUrl)}
                                   onchange={onchange}/>
                  ) : (
                    <View style={styles.bi_image_container}/>
                  )
                ))}
              </View>
            </View>
          ))}
        </View>

      </Page>
      <View style={styles.bi_footer_wrapper}>
        <View style={styles.bi_footer_row}>
          <TouchableOpacity style={styles.bi_footer_all} activeOpacity={0.8} onPress={selectAll}>
            <Image source={checkboxSource} style={styles.bi_footer_all_icon}/>
            <Text style={styles.bi_footer_all_text}>全选</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bi_footer_row}>
          <TouchableOpacity style={styles.bi_footer_save} activeOpacity={0.8} onPress={saveImages}>
            <Text style={styles.bi_footer_save_text}>保存</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};

const mapStateToProps = ({businessCard, dictionaries}: any) => {
  return {businessCard, dictionaries}
};
export default connect(mapStateToProps)(BuildingImage)
