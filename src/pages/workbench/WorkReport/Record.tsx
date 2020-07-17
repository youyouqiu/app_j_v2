import React, { FC, ReactText } from 'react'
import { View, Text, Image, ImageSourcePropType } from 'react-native'
import styles from './record.styles'

type TContent = ReactText | Array<ReactText>
interface RecordProps {
  icon: ImageSourcePropType
  title: string
  content: TContent
}
const Record: FC<RecordProps> = ({
  icon,
  title,
  content,
}) => {
  const getContent = (content: TContent, index: number) => {
    if (Array.isArray(content)) return content[index]
    return index === 0 ? content : undefined
  }
  return (
    <View style={styles['container']}>
      <Image
        source={icon}
        style={styles['icon']}
      />
      <Text style={styles['title']}>{title}</Text>
      <View style={styles['content']}>
        <Text style={styles['left']} numberOfLines={1}>
          {getContent(content, 0)}
        </Text>
        <Text style={styles['right']}>
          {getContent(content, 1)}
        </Text>
      </View>
    </View>
  )
}

export default Record
