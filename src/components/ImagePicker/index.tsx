import React, {FunctionComponent, useState} from 'react'
import {StyleSheet, Text, Image} from 'react-native'
import Modal from '../Modal'
import ImageCropPicker from "react-native-image-crop-picker";
import {checkPermission} from '@/utils/utils'
import {connect} from 'react-redux'
import {ConfigState} from '@/models/types'
import {uploadFile} from '@/services/component'

export interface successType {
  file: object,
  extension?: string
}

export interface ImagePickerType {
  label: string,
  code: string
}

const defaultImagePicker: Array<ImagePickerType> = [{
  label: '从手机相册选取',
  code: 'album'
}, {
  label: '拍照',
  code: 'camera'
}]

const ImagePicker: FunctionComponent<{
  visible?: boolean,
  onClose: Function, // modal关闭事件
  multiple?: boolean, // 是否多选  暂时不支持。
  onSuccess: (file: successType) => void, // 获取值
  onStart?: (file: successType) => void,
  onError?: Function,
  upload?: boolean,
  addId?: string, // upload 文件上传需要的id，比如用户修改头像对应的userId,上传楼盘图片对应buildingid
  config: ConfigState,
  cropping?: boolean,
  width?: number,
  height?: number,
  imagePicker?: Array<ImagePickerType>
}> = ({
        visible = false,
        onClose,
        onSuccess,
        onError,
        onStart,
        upload = true,
        multiple = false,
        addId = '',
        config,
        cropping = false,
        width = 0,
        height = 0,
        imagePicker = defaultImagePicker
      }) => {


  const _uploadFile = async (name: string, path: string,base64:string) => {
    const {requestUrl: {upload: uploadUrl}} = config
    try {
      let res = await uploadFile(uploadUrl, addId, {path, name});
      onSuccess({file: {name, path,base64}, extension: res.path})
    } catch (e) {
      console.log(e)
    }
  }

  const onChange = async (e: { code: string }) => {
    onClose(false)
    let images: any
    try {
      await setTimeout(async () => {
        if (e.code === 'album') {
          let res = await checkPermission('photo')
          if (!res) return
          images = await ImageCropPicker.openPicker({
            cropping: cropping,
            forceJpg: true,
            width: width,
            height: height,
            multiple: false,
            mediaType: 'photo',
            compressImageQuality: 0.5,
            cropperChooseText: '选取',
            cropperCancelText: '取消',
            includeBase64: true
          })
          console.log('onChange',images);
        } else {
          let res = await checkPermission('camera')
          if (!res) return
          images = await ImageCropPicker.openCamera({
            multiple: false,
            mediaType: 'photo',
            forceJpg: true,
            compressImageQuality: 0.8,
          })
        }
        console.log('upload',images);
        if (!upload) {
          onSuccess({file: images})
          return
        }
        onStart ? onStart(images) : null
        await _uploadFile(images.filename || 'avator.jpg', images.path, images.data)
      }, 500) // ios必须有延迟。不然会卡死
    } catch (e) {
      onError ? onError(e) : null
      console.log(e)
    }
  }

  return (
    <Modal
      transparent={true}
      visible={visible}
      onClose={() => onClose(false)}
      type='select'
      data={imagePicker}
      onChange={onChange}
    />
  )
}

const styles = StyleSheet.create({})

const mapStateToProps = ({config}: { config: ConfigState }) => {
  return {config}
}
export default connect(mapStateToProps)(ImagePicker)
