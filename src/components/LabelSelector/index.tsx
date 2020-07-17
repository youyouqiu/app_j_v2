import React, { FC, useState, useRef } from 'react'
import { TouchableOpacity, View, Text, Image, findNodeHandle, UIManager } from 'react-native'
import { Overlay } from '@new-space/teaset'
import styles from './styles'

type TValue = string | number | undefined
type TSelection = {
  label: string
  value: TValue
  defaultLabel?: string
}

interface Props {
  selection: TSelection[]
  separator?: boolean
  name?: string
  onChange?: (params: { name?: string, value: TValue }) => void,
  defaultValue?: number
}

const bOpenImg = require('@/images/icons/blue_arrow_open.png')
const bCloseImg = require('@/images/icons/blue_arrow_close.png')
const gOpenImg = require('@/images/icons/gray_arrow_open.png')
const gCloseImg = require('@/images/icons/gray_arrow_close.png')

const LabelSelector: FC<Props> = ({
  selection,
  name,
  separator = false,
  onChange,
  defaultValue
}) => {
  const [open, setOpen] = useState(false)
  const [cur, setCur] = useState(() => {
    let defaultIdx = 0;
    selection.filter((v, i) => {
      if (v.value === defaultValue) defaultIdx = i
    });
    return defaultIdx
  });
  const oid = useRef<number>()
  const btnRef = useRef<TouchableOpacity>(null)

  const onSelect = (item: TSelection, index: number) => () => {
    setCur(index)
    onChange && onChange({ name, value: item.value })
    onClose()
  }

  const onToggle = async () => {
    open ? onClose() : onOpen()
  }

  const onOpen = () => {
    setOpen(true)
    const handle = findNodeHandle(btnRef.current)
    UIManager.measure(handle!, (x, y, width, height, pageX, pageY) => {
      oid.current = Overlay.show(OverlayContent(pageY + height))
    })
  }

  const onClose = () => {
    setOpen(false)
    Overlay.hide(oid.current!)
  }

  const OverlayContent = (marginTop: number) => (
    <Overlay.View modal overlayOpacity={0} onCloseRequest={onClose}>
      <View style={[styles['overlay-content-wrapper'], { marginTop }]}>
        <View style={styles['overlay-content']}>
          {selection.map((item, index) => {
            const isCur = item.value === selection[cur].value
            return (
              <TouchableOpacity key={index} style={styles['selection-item']} activeOpacity={1} onPress={onSelect(item, index)}>
                <Text style={[styles['selection-item-text'], isCur ? { color: '#1F3070' } : null]}>{item.label}</Text>
                <Image style={[styles['selection-item-img'], { opacity: isCur ? 1 : 0 }]} source={require('@/images/icons/checked233.png')} />
              </TouchableOpacity>
            )
          })}
        </View>
        <TouchableOpacity style={styles['overlay-mask']} activeOpacity={1} onPress={onClose} />
      </View>
    </Overlay.View>
  )

  const useDefault = !!selection[cur].defaultLabel
  const openImg = useDefault ? gOpenImg : bOpenImg
  const closeImg = useDefault ? gCloseImg : bCloseImg
  return (
    <View style={separator ? styles['separator'] : null}>
      <TouchableOpacity
        ref={btnRef}
        style={[styles['container'], useDefault ? { backgroundColor: '#F2F2F2' } : null]}
        activeOpacity={1}
        onPress={onToggle}
      >
        <Text style={[styles['text'], useDefault ? { color: '#535353' } : null]}>
          {selection[cur].defaultLabel || selection[cur].label}
        </Text>
        <Image
          style={styles['img']}
          source={open ? openImg : closeImg}
        />
      </TouchableOpacity>
    </View>
  )
}

export default LabelSelector
