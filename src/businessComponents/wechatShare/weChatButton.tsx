import React, { FC, useState, useContext, useCallback } from 'react'
import { Text, Image, TouchableOpacity, GestureResponderEvent, StyleProp, ViewStyle, TextStyle, ImageStyle, View } from 'react-native'
import styles from './weChatButton.styles'
import { scaleSize } from '@/utils/screenUtil'
import navigation from '../../utils/navigation'
import Modal from '../../components/Modal'
import projectService from '../../services/projectService';
import BuryingPoint, { BehaviorLog } from '../../utils/BuryPoint'
import { NavigationScreenProps } from 'react-navigation'
import { debounce } from '@/utils/utils'



export interface props {
  onPress?: (event: GestureResponderEvent) => void
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  imageStyle?: StyleProp<ImageStyle>
  projectInfo?: any
  pageFrom?: string
}
const WeChatButton: FC<props> = ({
  onPress,
  projectInfo = {},
  style,
  textStyle,
  imageStyle,
  pageFrom
}) => {
  const [visible, setVisible] = useState(false)
  const {
    buildingTreeId, buildingTreeName, fullName, areaFullName, buildIcon,
    city, cityName, district, area, minPrice, maxPrice, images
  } = projectInfo

  const getBuildIcon = () => {
    if (Array.isArray(images)) return images[0]?.fileUrl
    return buildIcon
  }
  if (!onPress) {
    onPress = useCallback(() => {
      // @ts-ignore
      const { user } = global.store.getState()
      const params: BehaviorLog = {
        page: '房源',
        target: '微信推广',
        action: 'click',
        page_param: {
          buildingTreeId,
          userId: user.userInfo.id,
        }
      };
      BuryingPoint.add(params)

      if (user.status === 404) {
        return navigation.navigate('login')
      }
      if (!user.userInfo.trueName) {
        return setVisible(true)
      }
      // 添加头像
      projectService.addShareAvatar({
        BuildingTreeId: buildingTreeId,
        Avatar: user.userInfo.avatar
      })
      // 获取是否存在海报
      projectService.buildingHasPoster([buildingTreeId]).then(res => {
        const { posterId: pids, slogan } = res.extension[0]
        navigation.navigate('poster', {
          posterIds:pids,  // 海报id数组
          buildingTreeId,  // 楼盘id
          slogan,  // 海报分享的文案
          from: pageFrom
        })
      })
    }, [projectInfo])
  }

  const handlePressOk = () => {
    setVisible(false)
    navigation.navigate('personalInfo')
  }

  return (
    <>
      <TouchableOpacity onPress={debounce(onPress)} activeOpacity={.8} style={style ?? styles.Wrap}>
        <Image style={imageStyle ?? styles.icon} source={require('@/images/icons/haibao.png')} />
        <Text style={textStyle ?? { ...styles.text, marginLeft: scaleSize(8) }}>推广海报</Text>
      </TouchableOpacity>
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        onOk={handlePressOk}
        type='conform'
        width={scaleSize(900)}
        height={scaleSize(450)}
        confirmText='去完善'
        contentStyle={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.modalText}>您还未完善用于微信推广的信息</Text>
          <Text style={styles.modalText}>（姓名、头像、性别）</Text>
        </View>
      </Modal>
    </>
  )
}

export default WeChatButton

