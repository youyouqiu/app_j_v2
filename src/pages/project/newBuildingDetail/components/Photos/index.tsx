import React, { Component } from 'react'
import {
  View, Text, Image, ScrollView, TouchableOpacity, Modal,
  LayoutRectangle, LayoutChangeEvent, NativeSyntheticEvent, NativeScrollEvent,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import service, { BuildingTreePictures } from './service'
import ImageViewer from '@new-space/react-native-image-zoom-viewer'
import Page from '@/components/Page/index'
import NoData from '@/businessComponents/noData'
import styles from './styles'

const IMAGE_GROUP = {
  '1': '平面图',
  '2': '实景图',
  '3': '效果图',
  '4': '配套设施',
  '5': '其他',
}

type ImageGroup = keyof typeof IMAGE_GROUP

type LayoutList = {
  [key in ImageGroup]?: LayoutRectangle
}

type Maps = {
  [key in ImageGroup]?: {
    left?: ImageGroup
    right?: ImageGroup
  }
}

interface NavigationParams {
  buildingId?: string
  buildingName?: string
}
interface PhotosState {
  groups: BuildingTreePictures[][]
  current?: ImageGroup
  visible: boolean
  viewer: Array<{ url: string, id: string }>
  viewerIndex: number
  loading: boolean
}
class Photos extends Component<NavigationScreenProps<NavigationParams>, PhotosState> {
  navigationRef: ScrollView | null = null
  contentRef: ScrollView | null = null

  state = {
    groups: [] as BuildingTreePictures[][],
    current: undefined as ImageGroup | undefined,
    visible: false,
    viewer: [] as Array<{ url: string, id: string }>,
    viewerIndex: 0,
    loading: true,
  }

  componentDidMount() {
    const { buildingId = '' } = this.props.navigation.state.params || {}
    buildingId && this.fetchPictures(buildingId)
  }

  /**
   * 布局数据存储
   */
  navigation: LayoutList = {}
  content: LayoutList = {}
  maps: Maps = {}

  animated: boolean = false

  /**
   * 设置maps
   */
  setMaps = (groups: BuildingTreePictures[][]) => {
    groups.forEach((group, index, arr) => {
      const cur = group[0].group
      if (index === 0) {
        this.maps[cur] = {
          left: undefined,
          right: arr[index + 1][0].group,
        }
      }
      else if (index === arr.length - 1) {
        this.maps[cur] = {
          left: arr[index - 1][0].group,
          right: undefined,
        }
      }
      else {
        this.maps[cur] = {
          left: arr[index - 1][0].group,
          right: arr[index + 1][0].group,
        }
      }
    })
  }

  /**
   * 根据[content]偏移量获取当前项
   *
   */
  getCurrentByContentY = (offsetY: number) => {
    for (const key in this.content) {
      let tKey = key as ImageGroup
      const { y, height } = this.content[tKey]!
      if (
        offsetY >= y && offsetY < y + height
        || offsetY < 0 && !this.maps[tKey]!.left
        || offsetY > y + height && !this.maps[tKey]!.right
      ) {
        return tKey
      }
    }
  }

  /**
   * 获取图片
   */
  fetchPictures = (id: string) => {
    this.setState({ loading: true }, async () => {
      try {
        const { extension } = await service.queryBuildingTreePictures(id)
        const groups = this.groupingPictures(extension)
        const viewer = this.flatPictures(groups)
        this.setMaps(groups)
        this.setState({
          groups,
          viewer,
          current: groups[0] && groups[0][0].group
        })
      } catch (e) {
        // TODO
      }
      this.setState({ loading: false })
    })
  }

  /**
   * 分组图片，并建立链表联系
   */
  groupingPictures = (extension: BuildingTreePictures[]) => {
    const groups: BuildingTreePictures[][] = []
    extension.forEach(pic => {
      const index = parseInt(pic.group)
      if (!groups[index]) {
        groups[index] = []
      }
      groups[index].push(pic)
    })
    return groups.filter(i => i)
  }

  /**
   * 展开图片分组
   */
  flatPictures = (groups: BuildingTreePictures[][]) => {
    const flatPics: BuildingTreePictures[] = []
    groups.forEach(group => flatPics.push(...group))
    return flatPics.map(i => ({
      id: i.fileGuid,
      url: i.images.original
    }))
  }

  /**
   * 存储[navigation->item],[content->item]渲染信息
   */
  handleLayout = (type: 'navigation' | 'content', group: ImageGroup, { nativeEvent }: LayoutChangeEvent) => {
    this[type] = {
      ...this[type],
      [group]: nativeEvent.layout,
    }
  }

  /**
   * 滑动[图片列表]
   */
  handleScrollContent = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (this.animated) return
    const offsetY = e.nativeEvent.contentOffset.y
    const cur = this.getCurrentByContentY(offsetY) as ImageGroup
    this.scrollNavigationToItem(cur)
  }

  /**
   * 滚动[navigation]到对应[item]
   */
  scrollNavigationToItem = (cur: ImageGroup) => {
    const { current } = this.state
    if (current !== cur) {
      this.setState({ current: cur })
    }
    this.navigationRef && this.navigationRef.scrollTo({
      x: this.navigation[cur]!.x,
      animated: true,
    })
  }

  /**
   * 点击[navigation->item]
   */
  handlePressNavigation = (group: ImageGroup) => {
    this.animated = true
    this.setState({ current: group }, () => {
      this.scrollContentToItem(group)
    })
  }

  /**
   * 滚动[content]到对应[item]
   */
  scrollContentToItem = (cur: ImageGroup) => {
    this.contentRef && this.contentRef.scrollTo({
      y: this.content[cur]!.y,
      animated: true,
    })
  }

  /**
   * 点击图片
   */
  handlePressPic = (pic: BuildingTreePictures) => {
    this.setState(({ viewer }) => ({
      viewerIndex: viewer.findIndex(i => i.id === pic.fileGuid)
    }), () => {
      this.toggleVisible()
    })
  }

  /**
   * 图片浏览开关
   */
  toggleVisible = () => {
    this.setState(({ visible }) => ({ visible: !visible }))
  }

  render() {
    const {
      buildingName = '楼盘相册',
    } = this.props.navigation.state.params || {}
    const { groups, current, visible, viewer, viewerIndex, loading } = this.state

    return (
      <Page
        scroll={false}
        title={buildingName}
      >
        {/* 导航 */}
        <View style={styles['navigation']}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={ref => this.navigationRef = ref}
          >
            {groups.map((group, index) => {
              const curGroup = group[0].group
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  key={index}
                  onLayout={e => this.handleLayout('navigation', curGroup, e)}
                  onPress={() => this.handlePressNavigation(curGroup)}
                  style={styles['navigation-item'](groups.length, index)}
                >
                  <Text style={styles['navigation-item-text'](curGroup === current)}>
                    {`${IMAGE_GROUP[curGroup]}(${group.length})`}
                  </Text>
                  <View style={styles['navigation-item-underline'](curGroup === current)} />
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>

        {
          groups.length && !loading ? (
            // 图片列表
            <ScrollView
              onScroll={this.handleScrollContent}
              onMomentumScrollEnd={() => this.animated = false}
              scrollEventThrottle={1}
              showsVerticalScrollIndicator={false}
              style={styles['content']}
              ref={ref => this.contentRef = ref}
            >
              {groups.map(group => {
                const title = IMAGE_GROUP[group[0].group]
                return (
                  <View
                    key={group[0].fileGuid}
                    onLayout={e => this.handleLayout('content', group[0].group, e)}
                  >
                    <Text style={styles['content-title']}>{title}</Text>
                    <View style={styles['content-list']}>
                      {group.map(pic => {
                        return (
                          <TouchableOpacity
                            activeOpacity={1}
                            key={pic.fileGuid}
                            onPress={() => this.handlePressPic(pic)}
                            style={styles['pic']}
                          >
                            <Image
                              source={{ uri: pic.images.icon }}
                              style={styles['pic-img']}
                            />
                          </TouchableOpacity>
                        )
                      })}
                      {
                        group.length % 3 === 2 && <View style={styles['pic']} />
                      }
                    </View>
                  </View>
                )
              })}
            </ScrollView>
          ) : <NoData tips='暂无图片' />
        }

        {/* 照片浏览modal */}
        <Modal
          animationType='fade'
          visible={visible}
          transparent={true}
          onRequestClose={this.toggleVisible}
        >
          <ImageViewer
            imageUrls={viewer}
            index={viewerIndex}
            onClick={this.toggleVisible}
            saveToLocalByLongPress={false}
          />
        </Modal>
      </Page >
    )
  }
}

export default Photos
