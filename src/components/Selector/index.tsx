import React, { useState, useRef } from 'react'
import { TouchableOpacity, View, Text, Image, findNodeHandle, UIManager, ViewStyle } from 'react-native'
import { Overlay } from '@new-space/teaset'
import styles from './styles'

type TValue = string | number
type TSelection = {
  label: string
  value: TValue
}

interface Props {
  selection: TSelection[]
  name?: string
  onChange?: (params: { name?: string, value: TValue }) => void,
  defaultValue?: number
  children?: (params: { item: TSelection, index: number, selection: TSelection[], isOpen: boolean }) => React.ReactNode
  style?: ViewStyle
}

const Selector = ({
  selection,
  name,
  onChange,
  defaultValue,
  children,
  style,
}: Props) => {
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

  return (
    <TouchableOpacity ref={btnRef} activeOpacity={1} onPress={onToggle} style={style}>
      {children && children({ item: selection[cur], index: cur, selection, isOpen: open })}
    </TouchableOpacity>
  )
}

export default Selector
