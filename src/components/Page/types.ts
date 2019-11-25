import { ReactNode, ReactElement } from 'react'
import { ViewStyle } from 'react-native'
import { NavigationBackActionPayload } from 'react-navigation'
import { ErrorViewProps } from '../ErrorView/types'

export type PageError = ErrorViewProps & { isError?: boolean }

export interface TopBarProps {
  title?: ReactNode
  tintColor?: string
  leftView?: ReactNode
  rightView?: ReactNode
  topBarStyle?: ViewStyle
  statusBarStyle?: 'dark-content' | 'light-content'
  statusBarHidden?: boolean
  backButtonPress?: (routeName?: NavigationBackActionPayload) => void
}

export interface PageProps extends TopBarProps {
  scroll?: boolean
  loading?: boolean
  hiddenTopBar?: boolean
  fixed?: ReactElement
  error?: PageError
  bodyStyle?: ViewStyle
  footer?: ReactElement
  footerStyle?: ViewStyle
  navBar?: ReactElement

  // 兼容老的写法
  contentBgColor?: string,
}
