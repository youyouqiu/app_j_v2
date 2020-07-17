import React, {PureComponent, Children, ReactElement, ReactText} from 'react'
import {View, ScrollView, ViewProps, ScrollViewProps} from 'react-native'

interface SwitchItemProps {
    type: number | string | string[] | number []
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
        const {current, children} = this.props
        let currentChild: ReactElement[] = []
        Children.forEach(children as ReactElement[], child => {
            let type = [];
            if (typeof child.props.type !== 'object' || child.props.type.constructor !== Array) {
                type = [child.props.type]
            } else {
                type = child.props.type
            }
            if (child.type === Item && type.includes(current)) {
                currentChild.push(child)
            }
        })
        return currentChild
    }
}

export default SwitchView
