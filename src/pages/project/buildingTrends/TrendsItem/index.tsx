import React, { FC, memo, useRef, useState, useEffect } from 'react'
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native'
import { Overlay, AlbumView } from '@new-space/teaset'
import { Trends } from '@/services/building/buildingTrends'
import moment from 'moment'
import styles from './styles'

interface TProps {
  data: Trends
}

const TrendsItem: FC<TProps> = ({ data }) => {
  const _textMeasure = useRef<Text>(null)
  const _text = useRef<Text>(null)
  const overlayId = useRef<number>()
  const [ellipsis, setEllipsis] = useState(true)
  const [showEllipsis, setShowEllipsis] = useState(false)

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    await nextFrameAsync()
    const tmHeight = await measureHeight(_textMeasure.current!)
    const tHeight = await measureHeight(_text.current!)
    if (Math.abs(tmHeight - tHeight) > 2) {
      setShowEllipsis(true)
    }
  }

  // 计算text高度
  const measureHeight = (component: Text): Promise<number> => {
    return new Promise(resolve => {
      component.measure((x, y, w, h) => {
        resolve(h)
      })
    })
  }

  // 下一帧
  const nextFrameAsync = () => {
    return new Promise(resolve => requestAnimationFrame(() => resolve()))
  }

  // 放大看图片
  const albumOverlayView = (index: number) => {
    return (
      <Overlay.PopView>
        <AlbumView
          style={styles['album-view']}
          control
          defaultIndex={index}
          images={data.imageFiles.map(uri => ({ uri }))}
          onPress={() => Overlay.hide(overlayId.current!)}
        />
      </Overlay.PopView>
    )
  }

  return (
    <View style={styles['container']}>
      {/* 日期和分类标签 */}
      <View style={styles['left']}>
        <Text style={styles['left-text-1']}>{moment(data.createTime).format('HH:mm')}</Text>
        <Text style={styles['left-text-2']}>{moment(data.createTime).format('YYYY.MM.DD')}</Text>
      </View>

      {/* 中间的[小圆点]和[线] */}
      <View style={styles['middle']}>
        <View style={styles['middle-dot']} />
        <View style={styles['middle-line']} />
      </View>
      <View style={styles['right']}>
        {/* 标题 */}
        <Text style={styles['right-title']}>{data.title}</Text>

        {/* 不显示的完整正文（用来计算高度决定展开按钮显示与否） */}
        <Text ref={_textMeasure} style={styles['right-content-measure']}>
          {data.content}
        </Text>

        {/* 正文 */}
        <Text ref={_text} style={styles['right-content']} numberOfLines={ellipsis ? 3 : 0}>
          {data.content}
        </Text>

        {/* 展开收起按钮 */}
        {showEllipsis && (
          <TouchableOpacity activeOpacity={1} onPress={() => setEllipsis(!ellipsis)}>
            <Text style={styles['ellipsis']}>{ellipsis ? '展开' : '收起'}</Text>
          </TouchableOpacity>
        )}

        {/* 图片们 */}
        {!!data.imageFiles.length && (
          <FlatList
            style={styles['image-list']}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data.imageFiles}
            ItemSeparatorComponent={() => <View style={styles['image-separator']} />}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => overlayId.current = Overlay.show(albumOverlayView(index))}
              >
                <Image style={styles['image']} source={{ uri: item }} />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  )
}

export default memo(TrendsItem)
