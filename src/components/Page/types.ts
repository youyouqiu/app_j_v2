import { ReactNode, ReactElement } from 'react'
import { ViewStyle, ViewProps, View } from 'react-native'
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
  ref?: string | ((instance: View | null) => void) | React.RefObject<View> | null
  scroll?: boolean
  loading?: boolean
  hiddenTopBar?: boolean
  keyboardDismissMode?: 'none' | 'on-drag' | 'interactive'
  fixed?: ReactElement
  error?: PageError
  bodyStyle?: ViewStyle
  footer?: ReactElement | null
  footerStyle?: ViewStyle
  navBar?: ReactElement
  viewProps?: ViewProps
  showSkeleton?: boolean
  skeleton?: ReactElement
  alwaysBounceHorizontal?: boolean
  alwaysBounceVertical?: boolean
  // 兼容老的写法
  contentBgColor?: string,
}
