import React, { FunctionComponent } from 'react'
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'
import navigation from '../../utils/navigation'
import styles from './styles'
import BuryingPoint from '../../utils/BuryPoint'

interface EntryIconProps {
  title: string
  path: string
  icon: ImageSourcePropType
  auth?: boolean
  visible?: boolean
  disabled?: boolean
}
const EntryIcon: FunctionComponent<EntryIconProps> = ({
  title,
  path,
  disabled = false,
  icon,
  auth = true,
  visible = true,
}) => {
  const handlePress = () => {
    BuryingPoint.add({
      page: '工作台',
      target: `${title}_button`,
    })
    navigation.navigate(auth ? path : 'AuthRouter')
  }
  return visible ? (
    <TouchableOpacity
      activeOpacity={1}
      style={styles['wrapper']}
      disabled={disabled}
      onPress={handlePress}
    >
      <Image style={styles['img']} source={icon} />
      <Text style={styles['text']}>{title}</Text>
    </TouchableOpacity>
  ) : <View />
}

export default EntryIcon
