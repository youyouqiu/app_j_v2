/**
 * @author: zxs
 * @date: 2020/4/29
 */
import styles from "@/pages/main/style";
import {Image, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {IBannerAdPropsTypes, IBannerAdStateTypes} from "@/pages/main/types/bannerAdTypes";
import {Carousel} from "@new-space/teaset";
import {CONSTANT, STORAGE_KEY} from "@/constants";
import {connect} from "react-redux";
import {IAdvertisementDetailType, IAdvertisementType} from "@/pages/main/types/mainTypes";
import {useEffect, useMemo, useState} from "react";
import storage from "@/utils/storage";
import {storageSetWithCityCode} from "@/utils/utils";


const BannerAd = ({
                    bannerList = [],
                    advertisementDetail,
                    projectLocation
                  }: IBannerAdPropsTypes) => {

  const cityCode = useMemo<string>(() => projectLocation.cityCode || projectLocation.defaultCityCode, [projectLocation.cityCode]);

  const [state, setState] = useState<IBannerAdStateTypes>({
    bannerList,
    showSkeleton: true
  });

  useEffect(() => {
    storageGetCache();
  }, []);

  useEffect(() => {
    if (bannerList.length > 0) {
      storageSetCache(bannerList);
      setState(prevState => ({
        ...prevState,
        bannerList,
        showSkeleton: false
      }));
    }
  }, [bannerList]);

  /**写入缓存数据*/
  const storageSetCache = (params: Array<IAdvertisementDetailType>) => {
    storageSetWithCityCode(STORAGE_KEY.BANNER_AD, cityCode, params);
  };

  /**读取缓存数据*/
  const storageGetCache = async () => {
    const cacheData: IAdvertisementType = await storage.get(STORAGE_KEY.BANNER_AD).catch(err => {
      setState(prevState => ({
        ...prevState,
        showSkeleton: false
      }))
    });
    if (cacheData && cacheData[cityCode]) {
      setState(prevState => ({
        ...prevState,
        bannerList: cacheData[cityCode],
        showSkeleton: false
      }))
    }
  };

  const carouselControl = (
    <Carousel.Control dot={<Text style={styles.m_carouselControl_dot}/>} activeDot={<Text style={styles.m_carouselControl_activeDot}/>}/>
  );

  const _advertisementDetail = (data: IAdvertisementDetailType) => {
    advertisementDetail && advertisementDetail(data, CONSTANT.SOURCE.CAROUSEL, '首页banner')
  };

  let renderContent;
  if (state.showSkeleton) {
    renderContent = <View style={styles.m_ad_skeleton}/>
  } else {
    renderContent = state.bannerList.length > 0 ? (
      <Carousel style={styles.m_ad_carousel} control={carouselControl}>
        {state.bannerList.map((v) => (
          <TouchableOpacity activeOpacity={0.8} key={v.id} onPress={() => _advertisementDetail(v)}>
            <Image source={{uri: v.cover}} style={styles.m_ad_icon}/>
          </TouchableOpacity>
        ))}
      </Carousel>
    ) : null
  }

  if (!state.showSkeleton && state.bannerList.length === 0) return null;

  return (
    <View style={styles.m_ad_wrapper}>
      {renderContent}
    </View>
  )
};
const mapStateToProps = ({config, point, projectLocation, user}: any) => {
  return {
    user,
    config,
    projectLocation,
    sendPoint: point.buryingPoint
  }
};
export default connect(mapStateToProps)(BannerAd)
