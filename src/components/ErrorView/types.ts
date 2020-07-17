import {ViewStyle} from 'react-native'

export interface ErrorViewProps {
  errorStyle?: ViewStyle     // 错误页样式
  errorText?: string      // 错误文字
  errorTextStyle?: any    // 错误文字样式
  imageSource?: any    // 图片
  imageSourceStyle?: any  // 图片样式
  btnStyle?: string       // 按钮样式
  btnTitle?: string       // 按钮文字或者element
  btnTitleStyle?: any     // 按钮文字样式
  onErrorPress?: () => void
}
