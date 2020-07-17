import React, {FC, useState, useEffect, useRef, useMemo} from 'react'
import {View, Text, Image, TouchableOpacity, Clipboard, Platform} from 'react-native'
import {NavigationScreenProps} from 'react-navigation'
import {useSelector} from 'react-redux'
import CameraRoll from '@react-native-community/cameraroll'
import StoreState from '@/models/types'
import SafeAreaView from '@/components/SafeAreaView'
import {Toast, Carousel} from '@new-space/teaset'
import ViewShot from 'react-native-view-shot'
import * as WeChat from 'xkj-react-native-wechat'
import {checkPermission} from '@/utils/utils'
import request from '@/utils/request'
import BuryingPoint, {BehaviorLog} from '@/utils/BuryPoint'
import {stringify} from 'qs'
import styles from './styles'
import {PosterCommonType, PosterStateType} from "@/pages/project/poster/type";
import ViewShotImage from "@/pages/project/poster/viewShotImage";
import CarouselImage from "@/pages/project/poster/carouselImage";

// 微信客户、微信朋友圈、保存海报item
const BottomItem: FC<any> = ({icon, label, onPress}) => (
  <TouchableOpacity style={styles['bottom-row1-item']} onPress={onPress}>
    <Image style={styles['bottom-row1-icon']} source={icon}/>
    <Text style={styles['bottom-row1-text']}>{label}</Text>
  </TouchableOpacity>
)

export interface Params {
  buildingTreeId: string
  posterIds: string[]
  slogan: string
  from?: string
}

const defaultState: PosterStateType = {
  carouselIdx: 0
};

const defaultCommon: PosterCommonType = {
  buildingTreeId: '',
  posterIds: [],
  slogan: '',
  from: '未知来源'
};

const Poster: FC<NavigationScreenProps<Params>> = ({
                                                     navigation
                                                   }) => {
  const {userInfo} = useSelector((state: StoreState) => state.user);
  const carouselEl = useRef<any>(null);
  const ImageEl = useRef<ViewShot>(null);
  const [state, setState] = useState<PosterStateType>(defaultState);
  const common = useMemo<PosterCommonType>(() => {
    return {
      ...defaultCommon,
      buildingTreeId: navigation?.state?.params?.buildingTreeId || '',
      posterIds: navigation?.state?.params?.posterIds || [],
      slogan: navigation?.state?.params?.slogan || '',
      from: navigation?.state?.params?.from || '未知来源',
    }
  }, []);

  useEffect(() => {
    const params: BehaviorLog = {
      page: '推广页面',
      parent_page: common.from,
      target: '页面',
      action: 'view',
      action_param: {buildingTreeId: common.buildingTreeId},
    };
    BuryingPoint.add(params)
  }, []);

  const getPosterUrl = (posterId: string) => {
    const uid = userInfo.id;
    const cname = userInfo.filiale;
    const requestData = {
      Id: posterId,
      UserId: uid,
      BrokerId: uid,
      CompanyName: cname,
      Path: 'pages/share/index',
      Source: 1,
      Type: 1, // 1 楼盘，2商铺
      ObjectId: common.buildingTreeId
    };
    return `${request.getUrl().public}/v1.7/api/buildingtree/shareposter?${stringify(requestData)}`
  };

  const switchPoster = (index: number) => {
    setState(prevState => ({
      ...prevState,
      carouselIdx: index
    }))
  };

  const scrollToPoster = (index: number) => () => {
    carouselEl.current.scrollToPage(index);
    setState(prevState => ({
      ...prevState,
      carouselIdx: index
    }))
  };

  /**判断是否安装微信*/
  const isInstalled = (callback: Function) => async () => {
    const installed = await WeChat.isWXAppInstalled();
    if (!installed) {
      Toast.message('请您安装微信之后再试');
      return
    }
    callback()
  };

  /**分享到客户*/
  const shareToFriend = async () => {
    try {
      const {posterIds} = common;
      const {carouselIdx} = state;
      WeChat.shareToSession({
        type: 'imageUrl',
        imageUrl: `${getPosterUrl(posterIds[carouselIdx])}`,
      });
      bpCommon('微信客户')
    } catch (e) {
      Toast.message('分享失败')
    }
  };

  /**分享到朋友圈*/
  const shareToTimeline = async () => {
    const {posterIds} = common;
    const {carouselIdx} = state;
    if (common.slogan) {
      const str = `【咨询电话】：${userInfo.phoneNumber}\r\n买铺看房咨询就找${userInfo.trueName}，还有更多优惠政策`;
      Clipboard.setString(common.slogan + '\r\n' + str);
      Toast.message('营销文案已复制，可在朋友圈粘贴');
      const st = setTimeout(() => {
        shareToTimeLineCommon(encodeURI(getPosterUrl(posterIds[carouselIdx])));
        clearTimeout(st)
      }, 300);
      return
    } else {
      shareToTimeLineCommon(encodeURI(getPosterUrl(posterIds[carouselIdx])))
    }
  };

  /**分享到朋友圈*/
  const shareToTimeLineCommon = (url: string) => {
    try {
      WeChat.shareToTimeline({
        type: 'imageUrl',
        thumbImage: url,
        imageUrl: url,
      });
      bpCommon('微信朋友圈')
    } catch (e) {
      Toast.message('分享失败')
    }
  };

  // 保存图片
  const savePicture = async () => {
    try {
      const hasPermission = await checkPermission('photo');
      if (!hasPermission) throw new Error('没有权限');
      let url: any = getPosterUrl(common.posterIds[state.carouselIdx]);
      if (Platform.OS === 'android') {
        url = await ImageEl.current?.capture!()
      }
      await CameraRoll.saveToCameraRoll(url);
      Toast.message('保存成功');
      bpCommon('保存图片')
    } catch (e) {
      Toast.message('保存失败')
    }
  };

  // 取消按钮
  const cancel = () => {
    navigation.goBack();
    BuryingPoint.add({
      page: '推广页面',
      target: '取消_button',
      action: 'click',
      action_param: {buildingTreeId: common.buildingTreeId},
    })
  };

  /**分享按钮埋点*/
  const bpCommon = (button: string) => {
    const params: BehaviorLog = {
      page: '推广页面',
      target: `${button}_button`,
      action: 'click',
      action_param: {
        from: common.from,
        buildingTreeId: common.buildingTreeId,
        type: '海报',
      },
    };
    params.action_param.posterId = common.posterIds[state.carouselIdx];
    BuryingPoint.add(params)
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <View style={styles.viewShot_wrapper}>
          <ViewShot ref={ImageEl}>
            <ViewShotImage uri={getPosterUrl(common.posterIds[state.carouselIdx])}/>
          </ViewShot>
        </View>

        <View style={styles['tab-posters']}>
          <Carousel style={styles.carousel} carousel={false} onChange={switchPoster} ref={carouselEl}>
            {common.posterIds.map((v, i) => (
              <View style={styles.poster}>
                <CarouselImage uri={getPosterUrl(v)}/>
              </View>
            ))}
          </Carousel>

          <View style={styles['posters-index']}>
            {common.posterIds.map((_, i) => (
              <View key={i} style={[styles['posters-index-item'], state.carouselIdx === i ? {backgroundColor: '#FE5139'} : null]}>
                <TouchableOpacity activeOpacity={1} onPress={scrollToPoster(i)}>
                  <Text style={styles['posters-index-text']}>{i + 1}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.bottom}>
        <View style={styles['bottom-row1']}>
          <BottomItem
            label='微信客户'
            icon={require('@/images/icons/sharingFriends.png')}
            onPress={isInstalled(shareToFriend)}
          />
          <BottomItem
            label='微信朋友圈'
            icon={require('@/images/icons/shareToTimeline.png')}
            onPress={isInstalled(shareToTimeline)}
          />
          <BottomItem
            label='保存图片'
            icon={require('@/images/icons/savePicture.png')}
            onPress={savePicture}
          />
        </View>
        <View style={styles['bottom-row2']}>
          <TouchableOpacity style={styles['bottom-row2-cancel']} onPress={cancel}>
            <Text style={styles['bottom-row2-cancel-text']}>取消</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Poster
