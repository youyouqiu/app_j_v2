import React from 'react'
import { View } from 'react-native'
import Group from './Group'
import Item from './Item'
import styles from './index.styles'
import { scaleSize } from '../../utils/screenUtil'

const EntryIcons: React.FC & {
  Group: typeof Group
  Item: typeof Item
} = ({ children }) => {
  const groups = React.Children.map(children, (child, index) => {
    const border = {
      borderBottomWidth: scaleSize(1),
      borderBottomColor: React.Children.count(children) - 1 === index ? '#FFFFFF' : '#EAEAEA',
    }
    return <View key={index} style={[styles['group'], border]}>{child}</View>
  })
  return (
    <View style={styles['container']}>{groups}</View>
  )
}

EntryIcons.Group = Group
EntryIcons.Item = Item

export default EntryIcons
