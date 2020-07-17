import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ViewStyle, LayoutChangeEvent } from 'react-native'
import style from '../../style'
import ScrollableTabView, { IRenderTabItem, ChangeTabProperties } from '@new-space/react-native-scrollable-tab-view'
import { scaleSize } from '@/utils/screenUtil'
import { IProjectDetail, IFollowState, IProjectDetailBasicInfo } from '@/services/typings/project'
import buildJson, { BasicInfoItem } from '../../buildJson'
import { checkBlank } from '@/utils/utils'
import NoData from '../noData'
import { DispatchProp } from 'react-redux'
import BuryPoint from '@/utils/BuryPoint'

interface IProjectInfoProps {
  buildingDetail?: IProjectDetail
  followStatus?: IFollowState
  onPressDy: (isNotify: boolean, isShow?: boolean) => Promise<void>
  gotoMap?: () => void
  onLayout: (e: LayoutChangeEvent) => void
}

const ProjectInfo = ({ dispatch, buildingDetail, onLayout, followStatus, gotoMap, onPressDy }: IProjectInfoProps & DispatchProp) => {
  const [tabViews, setTabViews] = useState<number[]>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [scrollableHeight, setScrollableHeight] = useState<number>(500);

  useEffect(() => {
    dispatch({
      type: 'dictionaries/getDictionaryDefines',
      payload: { requestData: ['LEVEL_DECORATION_SITUATION'] }
    })
  }, []);

  const onTabViewLayout = (event: LayoutChangeEvent, i: number) => {
   
    let _tabViews = tabViews.concat([]);
    _tabViews[i] = event.nativeEvent.layout.height;
    const newTabView = tabViews.concat([]).filter(i => i)
    if (newTabView.length >= 4) {
      return
    }
    console.log(_tabViews)
    setTabViews(_tabViews);
    (i === 0) && setScrollableHeight(_tabViews[tabIndex]);
  }

  const handleTabHeight = (obj: ChangeTabProperties) => {
    BuryPoint.add({
      page: '楼盘详情页',
      target: '项目信息tab_button',
      action_param: {
        buildingTreeId: buildingDetail?.buildingTreeId,
        tabName: obj.ref.props['data-value'].name,
      }
    })
    setTabIndex(obj.i)
    console.log(tabViews[obj.i])
    setScrollableHeight(tabViews[obj.i])
  }
  const renderTabItem = (value: IRenderTabItem, isTabActive: boolean) => {
    const source = isTabActive ? value.icon.activeIcon : value.icon.unActiveIcon
    const textColor = isTabActive ? '#1F3070' : '#868686';
    const fontWeight = isTabActive ? 'bold' : 'normal';
    return <View style={[style['flexCloum'], style['alignCenter']]}>
      <Image style={[style['tabItemImg']]} source={source} />
      <Text style={[{ color: textColor, fontWeight: fontWeight }, style['font-28']]}>
        {value.name}
      </Text>
    </View>
  }

  const renderBasicInfoElem = (basicInfoList: BasicInfoItem[], basicInfo: IProjectDetailBasicInfo) => {
    return basicInfoList.reduce((res, item) => {
      // @ts-ignore
      if (basicInfo[item.key]) {
        res.push(item)
      } else {
        let key = item.key;
        let keys = key.split(',');
        // @ts-ignore
        keys = keys.map(v => basicInfo[v] || '').filter(item => item);
        if (keys.length) {
          res.push(item)
        }
      }
      return res
    }, [] as any[]);
  };

  const { treeCategory = 1, basicInfo = {} } = buildingDetail || {}
  let buildJsonInfo = buildJson[treeCategory] || {}
  let { basicInfo: basicInfoList = [] as BasicInfoItem[] } = buildJsonInfo

  return (
    <View onLayout={onLayout}>
      <View style={style['itemContent']}>
        {/* <Text style={style['buildName']}>北大资源博雅-1期1组</Text> */}
        <View style={[style['flexRow'], style['alignCenter'], style['itemTitle'], style['projectInfoHeader']]}>
          <View style={style['headerLeftLine']} />
          <Text style={style['font-32']}>项目信息</Text>
        </View>
        <ScrollableTabView
          locked={true}
          prerenderingSiblingsNumber={Infinity}
          style={{ height: scrollableHeight + scaleSize(200) }}
          tabBarBackgroundColor='white'
          tabBarInactiveTextColor={'#868686'}
          tabBarActiveTextColor={'#1F3070'}
          tabBarUnderlineStyle={style['lineStyle']}
          // tabBarTextStyle={{color: '#1F3070'}}
          renderTabItem={renderTabItem}
          tabBarStyle={{ marginBottom: scaleSize(30) }}
          onChangeTab={(obj: ChangeTabProperties) => handleTabHeight(obj)}
        >
          <View
            style={{ paddingHorizontal: scaleSize(20) }}
            onLayout={(event) => onTabViewLayout(event, 0)}
            data-value={{
              name: '卖点分析', icon: {
                activeIcon: require('@/images/icons/project/mdfx_blue.png'),
                unActiveIcon: require('@/images/icons/project/mdfx_gray.png')
              }
            }}
          >
            {
              buildingDetail?.sellingPointAnalysis
                ?
                <Text style={[style['font-24'], style['projectInfoItemText']]}>
                  {buildingDetail?.sellingPointAnalysis}
                </Text>
                :
                <NoData />
            }
          </View>
          <View
            style={{ paddingHorizontal: scaleSize(20) }}
            onLayout={(event) => onTabViewLayout(event, 1)}
            data-value={{
              name: '目标客群', icon: {
                activeIcon: require('@/images/icons/project/mbkq_blue.png'),
                unActiveIcon: require('@/images/icons/project/mbkq_gray.png')
              }
            }}
          >
            {
              buildingDetail?.targetCustomers
                ?
                <Text style={[style['font-24'], style['projectInfoItemText']]}>
                  {buildingDetail?.targetCustomers}
                </Text>
                :
                <NoData />
            }
          </View>
          <View
            style={{ paddingHorizontal: scaleSize(20) }}
            onLayout={(event) => onTabViewLayout(event, 2)}
            data-value={{
              name: '抗性说辞', icon: {
                activeIcon: require('@/images/icons/project/kxsc_blue.png'),
                unActiveIcon: require('@/images/icons/project/kxsc_gray.png')
              }
            }}
          >
            {
              buildingDetail?.resistanceRhetoric
                ?
                <Text style={[style['font-24'], style['projectInfoItemText']]}>
                  {buildingDetail?.resistanceRhetoric}
                </Text>
                :
                <NoData />
            }
          </View>
          <View
            onLayout={(event) => onTabViewLayout(event, 3)}
            data-value={{
              name: '基本信息', icon: {
                activeIcon: require('@/images/icons/project/jbxx_blue.png'),
                unActiveIcon: require('@/images/icons/project/jbxx_gray.png')
              }
            }}
            style={[style['flexRow'], style['wrap'], { paddingHorizontal: scaleSize(20) }]}
          >
            {
              renderBasicInfoElem(basicInfoList, basicInfo).map((item) => {
                // @ts-ignore 所有的key 需要去定义。暂时不定义。
                return <Descriptions style={{ width: item.flex ? '100%' : '50%' }} label={item.label}>{checkBlank({
                  // @ts-ignore
                  value: basicInfo[item.key],
                  key: item.key,
                  basicInfo,
                  unit: item.unit,
                  boolLabel: item.boolLabel,
                  isMoment: item.moment,
                  func: item.func,
                  dictionary: item.dictionary
                })}</Descriptions>
              })
            }
            {/*{
              basicInfoList.map(item => {
                // 没有取到值得时候不展示。 但是有自定义项除外 因为自定义项的key拿不到值
                // @ts-ignore
                if ((basicInfo[item.key] === undefined || basicInfo[item.key] === null) && !item.func) return null
                if (item.func && item.key) {
                    let key = item.key
                    let keys = key.split(',')
                    // @ts-ignore
                    keys = keys.map(v => basicInfo[v] || '').filter(item => item)
                    if (keys.length === 0) return null
                }

                // @ts-ignore 所有的key 需要去定义。暂时不定义。
                return <Descriptions style={{ width: item.flex ? '100%' : '50%' }} label={item.label}>{checkBlank({
                    // @ts-ignore
                    value: item.key === 'developerName' ? basicInfo[item.key].replace(/,/g, '\n') : basicInfo[item.key],
                    key: item.key,
                    basicInfo,
                    unit: item.unit,
                    boolLabel: item.boolLabel,
                    isMoment: item.moment,
                    func: item.func,
                    dictionary: item.dictionary
                })}</Descriptions>
              })
            }*/}
          </View>
        </ScrollableTabView>
        <TouchableOpacity activeOpacity={0.8} onPress={gotoMap}
          style={[style['flexRow'], style['projectInfoHeader'], style['justifyBetween'], style['alignCenter'], style['address']]}>
          <View style={[style['flexRow'], style['alignCenter']]}>
            <Image style={[style['address_icon']]} source={require('@/images/icons/project/map.png')} />
            <Text style={[style['font-24']]}>{basicInfo.areaFullName}</Text>
          </View>
          <View style={[style['flexRow'], style['alignCenter']]}>
            <Text style={[style['font-24'], style['blueText']]}>点击查看</Text>
            <Image style={[style['address_right']]} source={require('@/images/icons/project/arrow_right.png')} />
          </View>
        </TouchableOpacity>
        <View style={{paddingHorizontal: scaleSize(32)}}>
          {
            followStatus?.isNotify
              ?
              <TouchableOpacity activeOpacity={0.8} onPress={() => { onPressDy(!followStatus?.isNotify, true) }} style={[style['flexRow'], style['alignCenter'], style['justifyCenter'], style['unActiveBtn']]}>
                <Image style={[style['kpIcon']]} source={require('@/images/icons/project/dy.png')} />
                <Text style={[style['font-28'], style['grayText'], style['txImage']]}>已设置报备通知</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity activeOpacity={0.8} onPress={() => { onPressDy(!followStatus?.isNotify, true) }} style={[style['flexRow'], style['alignCenter'], style['justifyCenter'], style['activeBtn']]}>
                <Image style={[style['kpIcon']]} source={require('@/images/icons/project/tixing.png')} />
                <Text style={[style['font-28'], style['blueText'], style['txImage']]}>可以报备时通知我</Text>
              </TouchableOpacity>
          }
        </View>
      </View>
    </View>
  )
}

export default ProjectInfo

export const Descriptions = ({ children = '', label, style: itemStyle }: { children: string | number | Element, label: string, style: ViewStyle }) => {
  let childrenDom = typeof children === 'string' || typeof children === 'number' ? <Text style={style['BIDescText']} numberOfLines={9}>{children}</Text> : children;
  return (
    <View style={[style['BIDescContent'], itemStyle]}>
      <Text style={style['BIDescLabel']}>{label}:&emsp;</Text>
      {childrenDom}
    </View>
  )
};
