import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

const u = global.unitPixel
const styles = StyleSheet.create({
    main: {
        height: 8
    }
})

class WhiteSpaceComponent extends Component {
    render() {
        return (
            <View style={[styles.main,
                {
                    backgroundColor: this.props.bgColor ? this.props.bgColor : '#F2F3F7',
                    height: this.props.height ? this.props.height * 1 : 8,
                    width: this.props.width ? this.props.width : '100%'
                }, {...this.props.style}
            ]}>
            </View>
        )
    }
}

export default WhiteSpaceComponent;