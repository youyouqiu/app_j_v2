import React, { FC, memo, useState, useRef } from 'react'
import {
  SafeAreaView, View, Image, Text, TouchableOpacity, StatusBar, UIManager,
  FlatList, ListRenderItem, ActivityIndicator, ScrollView, findNodeHandle
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Carousel } from '@new-space/teaset'
import Empty from '@/businessComponents/noData'
import BuildingPreviewWithShare from '@/businessComponents/BuildingPreviewWithShare'
import { BuildingListSearchConditions, IBuildingPreviewWithShare, BuildingTreePrice } from '@/services/building/buildingList'
import RegionChoiceModal from '@/businessComponents/choice/choiceRegion/regionChoiceModal'
import PriceChoiceModal from '@/businessComponents/choice/priceChoice/priceChoiceModal'
import AreaChoiceModal from '@/businessComponents/choice/areaChoice/areaChoiceModal'
import RegionChoice from '@/businessComponents/choice/choiceRegion/regionChoice'
import ChoicePrice from '@/businessComponents/choice/priceChoice/priceChoice'
import ChoiceArea from '@/businessComponents/choice/areaChoice/areaChoice'
import { IRegionType } from '@/businessComponents/choice/choiceRegion/types'
import { IModalPriceChoiceOnChangeType } from '@/businessComponents/choice/priceChoice/types'
import { IChoiceLabelDataPropsType } from '@/businessComponents/LabelGroup/types'
import Selector from '@/components/Selector'
import LabelSelector from '@/components/LabelSelector'
import LabelCheckBox from '@/components/LabelCheckBox'
import useAds from '@/hooks/useAds'
import useBuildingList from './useBuildingList'
import styles from './styles'
import { scaleSize } from '@/utils/screenUtil'
import BuryPoint from '@/utils/BuryPoint'

/**
 * 页面要点：
 * - 利用flatlist的item可以吸顶，将banner和filter写在了renderitem里
 */
const BuildingList: FC<NavigationScreenProps<BuildingListSearchConditions>> = memo(({ navigation }) => {
  const { ads, handlePressAd } = useAds({ BUILDING_BANNER: 5 }, {
    behaviorTrigger: {
      BUILDING_BANNER: {
        target: 'banner_button',
        page: '房源首页_全部楼盘',
      },
    }
  })
  const [conditions, setConditions] = useState<BuildingListSearchConditions>({
    city: navigation.state.params?.city,
  })
  const { buildings, inited, fetchNextPageOfBuildings, fetchBuildingsByConditions } = useBuildingList({
    ...conditions,
    ...navigation.state.params
  })
  const listRef = useRef<FlatList<IBuildingPreviewWithShare>>(null)
  const carouselRef = useRef<Carousel>(null)

  // 第一行筛选状态保存
  const [region, setRegion] = useState<IRegionType>()
  const [price, setPrice] = useState<IModalPriceChoiceOnChangeType>()
  const [area, setArea] = useState<IChoiceLabelDataPropsType[]>()

  // 处理选择地区
  const handleRegionChange = (params: IRegionType = {} as IRegionType) => {
    setRegion(params)
    scrollToTop()
    const _conditions: BuildingListSearchConditions = {
      ...conditions,
      city: navigation.state.params?.city,
      district: params?.district?.includes('_0') ? '' : params?.district,
      areas: params?.area?.[0]?.includes('_0') ? [] : params?.area,
    }
    setConditions(_conditions)
    fetchBuildingsByConditions(_conditions)
  }

  // 价格请求体格式化
  const _formatPrice = (value: string, rate: number, arr: BuildingTreePrice[]) => {
    const price = value.split('-')
    arr.push({
      minPrice: parseInt(price[0]) * rate || 0,
      maxPrice: parseInt(price[1]) * rate || 0x7fffffff,
    })
  }

  // 处理选择价格
  const handlePriceChange = (params: IModalPriceChoiceOnChangeType) => {
    setPrice(params)
    scrollToTop()
    const buildingTreeTotalPrices: BuildingTreePrice[] = []
    const buildingTreeUnitPrices: BuildingTreePrice[] = []
    params.total.forEach(i => _formatPrice(i.value as string, 1, buildingTreeTotalPrices))
    params.unit.forEach(i => _formatPrice(i.value as string, 10000, buildingTreeUnitPrices))
    const _conditions: BuildingListSearchConditions = { ...conditions, buildingTreeTotalPrices, buildingTreeUnitPrices }
    setConditions(_conditions)
    fetchBuildingsByConditions(_conditions)
  }

  // 处理选择面积
  const handleAreaChange = (params: IChoiceLabelDataPropsType[]) => {
    setArea(params)
    scrollToTop()
    const buildingTreeAreas = params.map(i => {
      const area = (i.value as string).split('-')
      return {
        minArea: parseInt(area[0]) || 0,
        maxArea: parseInt(area[1]) || 0x7fffffff,
      }
    })
    const _conditions: BuildingListSearchConditions = { ...conditions, buildingTreeAreas }
    setConditions(_conditions)
    fetchBuildingsByConditions(_conditions)
  }

  // 第二行筛选埋点
  const handleFilterBuryPoint = (name: string, value: number | boolean) => {
    const typeMap = {
      1: '商铺',
      2: '车库',
      3: '写字楼',
      4: '公寓',
    }
    const labelMap = {
      treeCategory: typeMap[value as keyof typeof typeMap],
      projectType: '独家',
      maxCommission: '高佣金',
      cashPrize: '现金奖',
      batelyBegin: '近期开盘',
      discounts: '有优惠',
    }
    BuryPoint.add({
      page: '房源首页_全部楼盘',
      target: '第二层标签_button',
      page_param: {
        tabName: labelMap[name as keyof typeof labelMap],
      },
    })
  }

  // 处理第二行筛选
  const handleFilter2Change = ({ name, value }: { name?: string, value: boolean | number | string | undefined }) => {
    if (name !== 'buildingTreeOderBy' && value) {
      handleFilterBuryPoint(name!, value as number | boolean)
    }
    scrollToTop()
    const _conditions = { ...conditions, [name!]: value }
    setConditions(_conditions)
    fetchBuildingsByConditions(_conditions)
  }

  // 跳转到头部
  const scrollToTop = (): Promise<void> => {
    return new Promise(resolve => {
      const handle = findNodeHandle(carouselRef.current)
      handle && UIManager.measure(handle!, (x, y, width, height) => {
        listRef.current?.scrollToOffset({
          animated: false,
          offset: height + scaleSize(32),
        })
        resolve()
      })
    })
  }

  // 广告render
  const renderBanner = () => {
    const control = (
      <Carousel.Control
        dot={<View style={styles['banner-dot']} />}
        activeDot={<View style={styles['banner-dot-active']} />}
      />
    )
    if (ads.data.BUILDING_BANNER?.length === 0) {
      return null
    }
    return (
      <Carousel ref={carouselRef} style={styles['banner']} control={control}>
        {ads.data.BUILDING_BANNER?.map(ad => (
          <TouchableOpacity key={ad.id} style={styles['banner-touch']} activeOpacity={1} onPress={handlePressAd(ad, 'BUILDING_BANNER')}>
            <Image style={styles['banner-img']} source={{ uri: ad.cover }} />
          </TouchableOpacity>
        ))}
      </Carousel>
    )
  }

  // 筛选render
  const renderFilter = () => {
    return (
      <View style={styles['filters']}>
        <View style={styles['filters-row1']}>
          <RegionChoiceModal
            label='区域'
            onConfirm={handleRegionChange}
            content={<RegionChoice />}
            regionSelectedValues={region}
          />
          <PriceChoiceModal
            label='价格'
            onConfirm={handlePriceChange}
            content={<ChoicePrice />}
            totalPriceSelectValues={price?.total}
            unitPriceSelectValues={price?.unit}
          />
          <AreaChoiceModal
            label='建面'
            onConfirm={handleAreaChange}
            content={<ChoiceArea />}
            areaSelectValues={area}
          />
          <Selector
            style={styles['filters-rank']}
            name='buildingTreeOderBy'
            onChange={handleFilter2Change}
            selection={[
              { label: '默认', value: 0 },
              { label: '销量优先', value: 1 },
              { label: '在售优先', value: 2 },
              { label: '在售商铺数降序', value: 3 },
              { label: '在售商铺数升序', value: 4 },
              { label: '价格降序排序', value: 5 },
              { label: '价格升序排序', value: 6 },
            ]}
          >
            {({ item, isOpen }) => <>
              <Text style={[styles['filters-rank-text'], isOpen ? { color: '#1F3070' } : null]} numberOfLines={1}>{item.value === 0 ? '排序' : item.label}</Text>
              <Image style={styles['filters-rank-img']} source={isOpen ? require('@/images/icons/more_open.png') : require('@/images/icons/more_close.png')} />
            </>}
          </Selector>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles['filters-row2']}
          contentContainerStyle={styles['filters-row2-scroll']}
        >
          <LabelSelector
            separator
            name='treeCategory'
            onChange={handleFilter2Change}
            selection={[
              { label: '不限', value: undefined, defaultLabel: '类型' },
              { label: '商铺', value: 1 },
              { label: '车库', value: 2 },
              { label: '写字楼', value: 3 },
              { label: '公寓', value: 4 },
            ]}
          />
          <LabelCheckBox label='独家' name='projectType' onChange={handleFilter2Change} separator />
          <LabelCheckBox label='高佣金' name='maxCommission' onChange={handleFilter2Change} separator />
          <LabelCheckBox label='现金奖' name='cashPrize' onChange={handleFilter2Change} separator />
          <LabelCheckBox label='近期开盘' name='batelyBegin' onChange={handleFilter2Change} separator />
          <LabelCheckBox label='有优惠' name='discounts' onChange={handleFilter2Change} />
        </ScrollView>
      </View>
    )
  }

  // flatlist render item
  const listRenderItem: ListRenderItem<IBuildingPreviewWithShare> = ({ item, index }) => {
    if (index === 0) return renderBanner()
    if (index === 1) return renderFilter()
    return (
      <TouchableOpacity style={{ paddingHorizontal: scaleSize(24) }} activeOpacity={1} onPress={gotoDetail(item.buildingTreeId!)}>
        <BuildingPreviewWithShare separator pageFrom='楼盘列表' data={item} />
      </TouchableOpacity>
    )
  }

  // 跳转搜索页
  const gotoSearch = () => {
    navigation.navigate('buildingSearch')
  }

  // 跳转楼盘详情
  const gotoDetail = (buildingTreeId: string) => () => {
    navigation.navigate('buildingDetail', { buildingTreeId })
  }

  // 返回上一页
  const goBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles['page-container']}>
      <StatusBar barStyle='dark-content' />

      {/* page top */}
      <View style={styles['top']}>
        <TouchableOpacity style={styles['back']} activeOpacity={1} onPress={goBack}>
          <Image style={styles['back-icon']} source={require('@/images/icons/back.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles['search']} activeOpacity={1} onPress={gotoSearch}>
          <Image style={styles['search-icon']} source={require('@/images/icons/searchCus.png')} />
          <Text style={styles['search-text']}>全部楼盘</Text>
        </TouchableOpacity>
      </View>

      {/* content */}
      {!ads.loading && inited ? (
        <FlatList
          ref={listRef}
          data={buildings.data}
          keyExtractor={(_, i) => i.toString()}
          renderItem={listRenderItem}
          onEndReached={fetchNextPageOfBuildings}
          onEndReachedThreshold={0.5}
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={!buildings.totalCount ? <Empty /> : (
            <View style={styles['allData']}>
              <Text style={styles['allDataText']}>
                {(buildings.data.length - 2) >= buildings.totalCount ? '已加载全部数据' : '加载中...'}
              </Text>
            </View>
          )}
        />
      ) : <ActivityIndicator style={{ flex: 1 }} size='large' />}
    </SafeAreaView>
  )
})

export default BuildingList
