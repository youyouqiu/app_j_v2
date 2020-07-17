import React, { FC, ReactElement } from 'react'
import { View, Text } from 'react-native'
import Item, { ItemProps } from './Item'
import styles from './Group.styles'

const NUM_OF_EACH_ROW = 4

interface GroupProps {
  title: string
}
const Group: FC<GroupProps> = ({
  title,
  children,
}) => {
  const gChildren = React.Children.map(children as ReactElement<ItemProps>[], child => {
    if (child.type === Item && child.props.visible === false) {
      return null
    }
    return child
  })
  if (!gChildren.length) return null
  const rowNum = Math.ceil(gChildren.length / NUM_OF_EACH_ROW)
  const placeholderNum = rowNum * NUM_OF_EACH_ROW - gChildren.length
  const entries = []
  for (let row = 0; row < rowNum; row++) {
    let rowElms = gChildren.splice(0, NUM_OF_EACH_ROW)
    if (placeholderNum && row === rowNum - 1) {
      const placeholders = []
      for (let i = 0; i < placeholderNum; i++) {
        placeholders.push(<View key={i} style={styles['placeholder']} />)
      }
      rowElms.push(...placeholders)
    }
    entries.push(<View key={row} style={styles['row']}>{rowElms}</View>)
  }

  return <>
    <Text style={styles['title']}>{title}</Text>
    {entries}
  </>
}

export default Group
