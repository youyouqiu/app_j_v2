import React, { FunctionComponent, useState } from 'react'
import { StyleSheet, Text, Image } from 'react-native'
// import { Button } from 'teaset'
// import { scaleSize } from '../../utils/screenUtil'
import Modal from '../Modal'
import ImageCropPicker from "react-native-image-crop-picker";
import { checkPermission } from '../../utils/utils'
import { connect } from 'react-redux'
import { ConfigState } from '../../models/types'
import { uploadFile } from '../../services/component'

interface successType {
    file: object,
    extension?: string
}

const ImagePicker: FunctionComponent<{
    visible?: boolean,
    onClose: Function, // modal关闭事件
    multiple?: boolean, // 是否多选  暂时不支持。
    onSuccess: (file: successType) => void, // 获取值
    onStart?: (file: successType) => void,
    onError?: Function,
    upload?: boolean,
    addId?: string, // upload 文件上传需要的id，比如用户修改头像对应的userId,上传楼盘图片对应buildingid
    config: ConfigState
}> = ({
    visible = false,
    onClose,
    onSuccess,
    onError,
    onStart,
    upload = true,
    multiple = false,
    addId = '',
    config
}) => {
        const imagePicker: Array<object> = [{
            label: '从手机相册选取',
            code: 'album'
        }, {
            label: '拍照',
            code: 'camera'
        }]

        const _uploadFile = async (name: string, path: string) => {
            const { requestUrl: { upload: uploadUrl } } = config
            console.log(uploadUrl)
            try {
                let res = await uploadFile(uploadUrl, addId, { path, name })
                console.log(res,'res')
                onSuccess({ file: { name, path }, extension: res.path })
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
                            multiple: false,
                            mediaType: 'photo',
                            cropping: false,
                            compressImageQuality: 0.8,
                            cropperChooseText: '选取',
                            cropperCancelText: '取消',
                        })
                    } else {
                        let res = await checkPermission('camera')
                        if (!res) return
                        images = await ImageCropPicker.openCamera({
                            multiple: false,
                            mediaType: 'photo',
                            compressImageQuality: 0.8,
                        })
                    }
                    if (!upload) {
                        onSuccess({ file: images })
                        return
                    }
                    onStart ? onStart(images) : null
                    await _uploadFile(images.filename || 'avator.jpg', images.path)
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

const styles = StyleSheet.create({
})

const mapStateToProps = ({ config }: { config: ConfigState }) => {
    return { config }
}
export default connect(mapStateToProps)(ImagePicker)
