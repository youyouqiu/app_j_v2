import React, {Component} from 'react'
import {Text, TextProps, TextStyle} from 'react-native'
import {scaleSize} from '../../utils/screenUtil'

export default class NewText extends Component <TextProps & TextStyle & any> {
    static defaultProps = {
        fontSize: scaleSize(24),
        color: '#000',
        onPress: (_?: any) => {},
    }

    render () {
        const {children} = this.props
        return <Text>{children}</Text>
    }
} 