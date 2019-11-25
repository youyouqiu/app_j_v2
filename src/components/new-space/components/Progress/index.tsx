import React, {FunctionComponent} from 'react'
import {View, StyleSheet, ViewStyle, Text} from 'react-native'
import {scaleSize} from '../../utils/screenUtil'
interface ProgressProps {
    style?: ViewStyle,
    value?: number,
    justifyContent?: 'flex-end' | 'flex-start',
    progressStyle?: ViewStyle,
    color?: string,
    number?: number
}

const Progress: FunctionComponent<ProgressProps> = ({
    style = {}, 
    progressStyle = {},
    color = '#4B6AC5',
    number = 0,
    value = 0,
    justifyContent = 'flex-start'
}) => {
    let percent : number = 0
    percent = number === 0 ? 0 : Number((value / number).toFixed(2))
    percent = percent > 1 ? 1 : percent
    return <View style={[styles.progressBg, style, {
        justifyContent
    }]}>
        <View style={[styles.progressItem, progressStyle, {
            width: percent * 100 + '%',
            backgroundColor: color,
        }]}>
            {
                <Text style={styles.text}>
                    {value}
                </Text>
            }
        </View>
    </View>
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontSize: scaleSize(22)
    },
    progressBg: {
        backgroundColor: '#F8F8F8',
        width: '100%',
        height: scaleSize(40),
        display: 'flex',
        flexDirection: 'row',
        borderRadius: scaleSize(25),
        justifyContent: 'flex-start'
    },
    progressItem: {
        width: '100%',
        borderRadius: scaleSize(25),
        height: '100%',
        display: 'flex',
        minWidth: scaleSize(40),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default Progress
