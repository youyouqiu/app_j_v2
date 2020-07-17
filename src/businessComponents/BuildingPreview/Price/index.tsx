import React, { FC, ReactText, memo } from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

interface IProps {
  min?: ReactText
}

const Price: FC<IProps> = ({ min }) => {
  return (
    <View style={styles['container']}>
      <Text style={styles['value']}>{min}</Text>
      <Text style={styles['unit']}>万/套起</Text>
    </View>
  )
}

export default memo(Price)
