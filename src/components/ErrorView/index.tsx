import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Button } from 'teaset'
import { scaleSize } from '../../utils/screenUtil'
import { ErrorViewProps } from './types'

const ErrorView: FunctionComponent<ErrorViewProps> = ({
    errorStyle,
    errorText = '出错啦，请稍后重试',
    errorTextStyle,
    imageSource,
    imageSourceStyle,
    btnStyle,
    btnTitle = '点击刷新',
    btnTitleStyle,
    onErrorPress,
}) => {
    return (
        <View style={[styles.container, errorStyle]}>
            <Image
                style={[styles.imageSourceStyle, imageSourceStyle]}
                source={imageSource}
            />
            <Text style={[styles.errorText, errorTextStyle]}>{errorText}</Text>
            <Button
                onPress={onErrorPress}
                style={[styles.btnStyle, btnStyle]}
                title={btnTitle}
                titleStyle={[styles.btnTitleStyle, btnTitleStyle]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: 200
    },
    imageSourceStyle: {
        width: scaleSize(302),
        height: scaleSize(302),
        marginTop: scaleSize(169),
        borderRadius: scaleSize(100)
    },
    errorText: {
        fontSize: scaleSize(24),
        color: '#aeaeae'
    },
    btnStyle: {
        width: scaleSize(153),
        height: scaleSize(48),
        borderWidth: 1,
        borderRadius: scaleSize(4),
        borderColor: '#10b0ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scaleSize(66)
    },
    btnTitleStyle: {
        color: '#10b0ff',
        fontSize: scaleSize(24),
    }
})

export default ErrorView
