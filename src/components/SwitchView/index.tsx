import React, { PureComponent, Children, ReactElement } from 'react'
import { View, ScrollView, ViewProps, ScrollViewProps } from 'react-native'

interface SwitchItemProps {
  type: number | string
  scroll?: boolean
}

interface SwitchViewProps {
  current: number | string
}

class Item extends PureComponent<SwitchItemProps & (ViewProps | ScrollViewProps)> {
  render() {
    const {
      type,
      scroll = false,
      children,
      ...props
    } = this.props
    const ViewType = scroll ? ScrollView : View
    return <ViewType {...props}>{children}</ViewType>
  }
}

class SwitchView extends PureComponent<SwitchViewProps> {
  static Item = Item
  render() {
    const { current, children } = this.props
    let currentChild = null
    Children.forEach(children as ReactElement[], child => {
      if (child.type === Item && child.props.type === current) {
        currentChild = child
      }
    })
    return currentChild
  }
}

export default SwitchView
