import React, { FC, memo } from 'react'
import { ScrollView, TouchableOpacity, View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { TabBarProps } from '@new-space/react-native-scrollable-tab-view'
import styles from './styles'

interface TTabData {
  name: string
  count?: number
}

const TabBar: FC<TabBarProps> = ({ tabs, activeTab, goToPage }) => {

  const handlePress = (index: number) => () => {
    goToPage && goToPage(index)
  }

  return (
    <View>
      <ScrollView
        style={styles['tabs']}
        contentContainerStyle={styles['tabs-contenet']}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
      >
        {tabs?.map((tab, index) => {
          const { name, count } = tab as TTabData
          const cur = activeTab === index
          return (
            <TouchableOpacity
              style={styles['item']}
              key={index}
              activeOpacity={1}
              onPress={handlePress(index)}
            >
              <Text style={[styles['text'], cur ? styles['text-active'] : null]}>
                {name}{typeof count === 'number' ? `(${count})` : ''}
              </Text>
              <LinearGradient
                style={[styles['line'], { opacity: cur ? 1 : 0 }]}
                colors={['#1F3070', '#ffffff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default (TabBar)
