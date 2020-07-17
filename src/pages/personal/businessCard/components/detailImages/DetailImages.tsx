/**
 * @author: zxs
 * @date: 2020/6/16
 */
import styles from "./styles";
import {Image, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {DetailImagesPropsType, DetailImagesStateType} from "@/pages/personal/businessCard/components/detailImages/types";
import request from "@/utils/request";
import {Toast} from "@new-space/teaset";
import {SystemImagesType} from "@/pages/personal/businessCard/editComponent/types";

const default_img = require('../../../../../images/defaultImage/default_1.png');
const delete_red = require('../../../../../images/icons/delete_fy.png');


const defaultState: DetailImagesStateType = {
  imageArr: [],
};

const DetailImages = ({
                        upload_icon,
                        imageArr,
                        title,
                        uploadOnClick,
                        deleteOnClick,
                        size = 0
                      }: DetailImagesPropsType) => {

  const [state, setState] = useState<DetailImagesStateType>(() => {
    return {
      ...defaultState,
      imageArr: imageArr
    }
  });

  useEffect(() => {
    const _imageArr = imageArr ? [...imageArr] : [];
    setState(prevState => ({
      ...prevState,
      imageArr: _imageArr
    }))
  }, [imageArr]);

  const _uploadOnClick = () => {
    if (size > 0 && state.imageArr.filter((v) => v.fileUrl).length >= size) {
      Toast.message(`最多添加${size}张照片`);
      return
    }
    uploadOnClick && uploadOnClick()
  };

  const _deleteOnClick = (idx: number) => {
    let _imageArr = state.imageArr;
    _imageArr = _imageArr.filter((v, i) => idx !== i).filter((v) => v.fileUrl);
    deleteOnClick && deleteOnClick(_imageArr)
  };

  const imageFlexLayout = (_imageArr: Array<SystemImagesType> = []): Array<SystemImagesType> => {
    const irl = _imageArr.length % 3 + 1;
    _imageArr.push(...new Array(irl === 0 ? 0 : 3 - irl).fill({fileUrl: ''}));
    return _imageArr
  };

  return (
    <View style={styles.eb_image_container}>
      <Text style={styles.eb_images_title}>{title}</Text>
      <View style={styles.eb_image_arr}>
        <TouchableOpacity activeOpacity={0.8} style={styles.eb_add_image_content} onPress={_uploadOnClick}>
          <Image style={styles.eb_add_icon} source={upload_icon}/>
        </TouchableOpacity>
        {imageFlexLayout(state?.imageArr).map((v, i) => (
          v?.fileUrl?.length > 0 ? (
            <View style={styles.eb_image_wrapper}>
              <Image style={styles.eb_image}
                     source={v.fileUrl.includes('http') ? {uri: v.fileUrl} : {uri: request.getUrl().upload + '/image/' + v.fileUrl}}
                     defaultSource={default_img}/>
              <TouchableOpacity style={styles.eb_image_footer} onPress={() => _deleteOnClick(i)}>
                <Image style={styles.eb_image_footer_icon} source={delete_red}/>
              </TouchableOpacity>
            </View>
          ) : <View style={styles.eb_image_wrapper}/>
        ))}
      </View>
    </View>
  )
};

export default DetailImages
