/**
 * @author: zxs
 * @date: 2020/5/21
 */
import {ISaleControlDetails} from "@/pages/project/shopList/types";
import styles from "@/pages/project/shopList/styles";
import {Image, Text, TouchableOpacity, View, Modal} from "react-native";
import React, {useState, useEffect} from "react";
import ImageViewer from '@new-space/react-native-image-zoom-viewer'
import {ResponseCommon} from "@/services/typings/types";
import { ScrollView } from "react-native-gesture-handler";
import projectService from '@/services/projectService';
import {
  IFloorItem,
  IShopResponse,
  IBuildingNoDetailType
} from "@/pages/project/shopList/types";
import * as WeChat from 'xkj-react-native-wechat';
import {cloneDeep} from 'lodash'

const SaleControlDetails = ({
  visible, 
  onClosePress, 
  buildingNoList, 
  activeBuildingNo, 
  defaultFloorList,
  buildingTreeId,
  requestUrl,
  activeFloorNo,
  fullName,
  user
}: ISaleControlDetails) => {
  const [floorList, setFloorList] = useState([] as Array<IFloorItem>)
  const [buildingNo, setBuildNo] = useState('')
  const [floorNo, setActiveFloorNo] = useState('')
  const [info, setInfo] = useState({} as IShopResponse)
  useEffect(() => {
    console.log(defaultFloorList, activeFloorNo)
    let newFloorList = cloneDeep(defaultFloorList || []).reverse() || []
    newFloorList = newFloorList.map(item => {
      item.active = false
      if (item.floor === activeFloorNo) {
        item.active = true
        setActiveFloorNo(item.floor)
      }
      return item
    })
    setFloorList(newFloorList)
  }, [defaultFloorList, activeFloorNo]);

  useEffect(() => {
    setBuildNo(activeBuildingNo || '')
  }, [activeBuildingNo]);

  useEffect(() => {
    if (visible) {
      getInfo(buildingNo, activeFloorNo || '')
    }
  }, [visible])

  const getInfo = async (building: string, floor: string) => {
    const choiceOption = {
      buildingTreeId: buildingTreeId,
      buildingNos: building,
      floors: floor
    }
    const response: ResponseCommon<IShopResponse> = await projectService.getBuildingShopList(choiceOption);
    const {code, extension} = response
    if (code === '0') {
      setInfo(extension)
    }
  }

  const share = () => {
    let shareData = {
      type: 'news',
      title: `${user.trueName}分享了${fullName}实时图纸销控`,
      thumbImage: encodeURI(`${requestUrl.api}/v2/api/shops/sellchart?buildingTreeId=${buildingTreeId}&buildingNo=${buildingNo}&FloorNo=${floorNo}&time=${new Date().getTime()}`),
      description: `点击查看${fullName}实时图纸销控`,
      webpageUrl: `${requestUrl.AIurl}/drawing/?btid=${buildingTreeId}&name=${fullName}`
    };
    WeChat.shareToSession(shareData);
  }

  const getFloorList = async (item: IBuildingNoDetailType) => {
    const condition = {
      buildingTreeId: buildingTreeId,
      buildingNos: item.buildingNo,
      pageIndex: 0,
      pageSize: 9999
    }
    try {
      const response: ResponseCommon<Array<IFloorItem>> = await projectService.getBuildingFloorList(condition);
      let {extension, code} = response
      if (code === '0') {
        setBuildNo(item.buildingNo)
        let newArr = extension.filter(item => item.isDrawing)
        newArr = newArr.map((item, index) => {
          item.active = false
          if (index === 0) {
            item.active = true
          }
          return item
        })
        const newFloorList = newArr?.concat([]).reverse() || []
        const activeFloor = newFloorList.find(item => item.active)
        setActiveFloorNo(activeFloor?.floor || '')
        setFloorList(newFloorList)
        getInfo(item.buildingNo, activeFloor?.floor || '')
      }
    } catch(e) {
    }
  }
  const setFloor = (item: IFloorItem) => {
    let newFloorList = floorList.concat([])
    newFloorList = newFloorList.map(it => {
      it.active = false
      if (it.floor === item.floor) {
        setActiveFloorNo(it.floor)
        it.active = true
      }
      return it
    })
    setFloorList(newFloorList)
  }
  const images = [{url: `${requestUrl.api}/v2/api/shops/sellchart?buildingTreeId=${buildingTreeId}&buildingNo=${buildingNo}&FloorNo=${floorNo}&time=${new Date().getTime()}`}]
  return (
    <Modal onRequestClose={() => {onClosePress(buildingNo, floorNo)}} visible={visible} transparent={true} animationType='fade' supportedOrientations = {['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}>
      <TouchableOpacity onPress={() => {onClosePress(buildingNo, floorNo)}} style={styles.backTouch}>
        <Image style={styles.goBack} source={require('@/images/icons/project/back_control.png')}/>
      </TouchableOpacity>
      <View style={styles.downView}>
        <View style={styles.downViewCon}>
          <Image style={styles.icon} source={require('@/images/icons/project/control_left.png')}/>
          <ScrollView horizontal style={styles.downScroll}>
            {
              buildingNoList.map(item => {
                return <TouchableOpacity onPress={() => {getFloorList(item)}} key={item.buildingNo} style={styles.buildingNoView}>
                  <Text style={[buildingNo === item.buildingNo ? styles.activeBuildingNoText : styles.buildingNoText]}>{item.buildingNo}</Text>
                </TouchableOpacity>
              })
            }
          </ScrollView>
          <Image style={styles.icon} source={require('@/images/icons/project/control_right.png')}/>
        </View>
      </View>
      <View style={styles.number}>
        <View style={styles.blue}>
        </View>
        <Text style={styles.white}>在售{info.onsaleNumber}个</Text>
      </View>
      <View style={styles.rightView}>
        <View style={styles.rightViewCon}>
          <Image style={styles.icon} source={require('@/images/icons/project/control_top.png')}/>
          <ScrollView style={styles.rightScroll}>
            {
              floorList?.map(item => {
                return <TouchableOpacity onPress={() => setFloor(item)} key={item.floor} style={styles.buildingItemView}>
                  <Text style={[item.active ? styles.activeBuildingNoText : styles.buildingNoText]}>{item.floor}</Text>
                </TouchableOpacity>
              })
            }
          </ScrollView>
          <Image style={styles.icon} source={require('@/images/icons/project/control_down.png')}/>
        </View>
        <TouchableOpacity onPress={share}>
          <Image style={styles.share} source={require('@/images/icons/share.png')}/>
        </TouchableOpacity>
      </View>
      <ImageViewer renderIndicator={() => <View></View>} imageUrls={images} index={0} saveToLocalByLongPress={false} />
    </Modal>
  )
};

export default SaleControlDetails
