import React, {FunctionComponent} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {scaleSize} from '../../utils/screenUtil'
interface LineProps {
    width?: number,
    height?: number,
    backgroundColor?: string,
}

const Line: FunctionComponent<LineProps> = ({width = 1, height = 1, backgroundColor = '#EAEAEA'}) => {
    let lineStyle = {width, height, backgroundColor}
    return <View style={[styles.line, lineStyle]}>
    </View>
}

const styles = StyleSheet.create({
    line: {
        backgroundColor: '#EAEAEA',
    },
})


export default Line
