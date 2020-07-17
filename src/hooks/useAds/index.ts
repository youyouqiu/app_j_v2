import { useState, useEffect, useCallback } from 'react'
import { Platform } from 'react-native'
import { useSelector } from 'react-redux'
import api, { AdSiteCodes, AdType, Ads, Ad } from '@/services/ads'
import navigation from '@/utils/navigation'
import projectService from '@/services/projectService'
import BuryPoint from '@/utils/BuryPoint'
import Store from '@/models/types'
import request from '@/utils/request'

export type BehaviorTrigger<T extends AdType> = {
  [key in T]: {
    page: string
    target: string
  }
}
export interface UseAdsConfig<T extends AdType> {
  behaviorTrigger?: BehaviorTrigger<T>
}
export interface AdsState<T extends AdType> {
  data: Ads<T>
  loading: boolean
}

const useAds = <T extends AdSiteCodes, K extends keyof T & AdType>(adSiteCodes: T, config?: UseAdsConfig<K>) => {
  const { userInfo } = useSelector((store: Store) => store.user)
  const { cityCode, defaultCityCode } = useSelector((store: Store) => store.projectLocation)
  const [ads, setAds] = useState<AdsState<K>>({ data: {}, loading: true })

  useEffect(() => {
    api.queryAdvertisings({ adSiteCodes, app: 1, cityId: cityCode || defaultCityCode })
      .then(res => setAds({
        data: res.extension,
        loading: false
      })).catch(() => { /* nothing todo */ })
  }, [])

  const handlePressAd = useCallback((ad: Ad, adSite?: K) => () => {
    if (!ad.link) return

    // 埋点相关
    projectService.addVisitReq(request.getUrl().public, {
      adId: ad.id,
      app: 1,
      source: Platform.OS === 'ios' ? 1 : 2,
      userId: userInfo.id,
      cityId: cityCode
    })
    if (config?.behaviorTrigger && adSite) {
      BuryPoint.add({
        ...config.behaviorTrigger[adSite],
        action_param: {
          adId: ad.id,
          title: ad.adName,
        },
      })
    }

    // 路由相关
    switch (ad.jumpType) {
      case 3: {
        navigation.navigate('buildingDetail', { buildingTreeId: ad.link })
        break
      }
      default: {
        navigation.navigate('xkjWebView', { url: ad.link, title: ad.adName, id: ad.id })
        break
      }
    }
  }, [ads])

  return { ads, handlePressAd }
}

export default useAds
