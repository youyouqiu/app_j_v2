import { ReactElement } from 'react'
import { ViewStyle } from 'react-native'
import { NavigationBackActionPayload } from 'react-navigation'
import { ErrorViewProps } from '../ErrorView/types'

export type PageError = ErrorViewProps & { isError?: boolean }

export interface TopBarProps {
  title?: string | ReactElement
  tintColor?: string
  leftView?: ReactElement
  rightView?: ReactElement
  topBarStyle?: ViewStyle
  statusBarStyle?: ViewStyle
  statusBarHidden?: boolean
  backButtonPress?: (routeName?: NavigationBackActionPayload) => void
}

export interface PageProps extends TopBarProps {
  scroll?: boolean
  loading?: boolean
  hiddenTopBar?: boolean
  error?: PageError
  bodyStyle?: ViewStyle
  footer?: ReactElement
  footerStyle?: ViewStyle
  navBar?: ReactElement

  // 兼容老的写法
  contentBgColor?: string,
}
