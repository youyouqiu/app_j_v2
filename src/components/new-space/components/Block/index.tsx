import React, {FunctionComponent} from 'react'
import {View, ViewStyle, Text} from 'react-native'
import Line from '../Line'
import styles from './style'
//@ts-ignore
import Shadow from '../../../Shadow'
interface BlockProps {
    title?: string,
    style?: ViewStyle,
    type?: 'view' | 'shadow'
}

const Block: FunctionComponent<BlockProps> = (props) => {
    if (props.type === 'view') {
        return <View style={[styles.content, props.style]}>
            <View style={styles.header}>
                <Line backgroundColor='#4B6AC5' width={2} height={11}/>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            {props.children}
        </View>
    }
    return <Shadow style={[styles.content, props.style]}>
        <View style={styles.header}>
            <Line backgroundColor='#4B6AC5' width={2} height={11}/>
            <Text style={styles.title}>{props.title}</Text>
        </View>
        {props.children}
    </Shadow>
}

export default Block
