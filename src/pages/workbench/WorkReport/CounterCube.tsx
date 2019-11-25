import React, { FC } from 'react'
import { View, Text, Image, ImageSourcePropType } from 'react-native'
//@ts-ignore
import Shadow from '../../../components/Shadow'
import styles from './counterCube.styles'

interface CounterCubeProps {
  title: string
  icon: ImageSourcePropType
  value: string | number
  unit: string
  valueColor?: string
}
const CounterCube: FC<CounterCubeProps> = ({
  title,
  icon,
  value,
  unit,
  valueColor,
}) => {
  return (
    <Shadow style={styles['container']}>
      <Image style={styles['icon']} source={icon} />
      <Text style={styles['title']}>{title}</Text>
      <View style={styles['data']}>
        <Text style={[styles['value'], valueColor ? { color: valueColor } : null]}>{value}</Text>
        <Text style={styles['unit']}>{unit}</Text>
      </View>
    </Shadow>
  )
}

export default CounterCube
