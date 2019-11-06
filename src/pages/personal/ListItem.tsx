import React, { FunctionComponent } from 'react'
import navigation from '../../utils/navigation'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { scaleSize } from '../../utils/screenUtil'

const FlexItem: FunctionComponent<{
    title?: string | object, 
    icon?: any, 
    rightIcon?: any, 
    hideIcon?: boolean, 
    right?: any, 
    path?: string,
    desc?: string,
    disabled?: boolean,
    rightTextStyle?: any,
    leftTextStyle?: any,
    contentStyle?: any,
    onPress?: Function,
}> = props => {

    const gotoSearchPage = (path?: string) => {
        if (props.onPress) {
            props.onPress()
        }
        if (!path) {
            return
        }
        navigation.navigate(path)
    }

    const renderRight = () => {
        if (props.right && typeof(props.right) === 'object') {
            return <View style={styles.flexItemCont}>
                {props.right}
            </View>
        }
        return <View style={styles.flexItemCont}>
            <Text style={[styles.rightText, props.rightTextStyle]} numberOfLines={1}>{props.right}</Text>
            {
                props.hideIcon
                ?
                null
                :
                <Image style={styles.rightIcon} source={require('../../images/icons/arrow_right.png')} />
            }
        </View>
    }

    const renderLeft = () => {
        if (props.title && typeof(props.title) === 'object') {
            return <View style={styles.flexItemCont}>
                {props.title}
            </View>
        }
        return <View style={styles.flexItemCont}>
            {
                props.icon
                ?
                <Image style={styles.leftIcon} source={props.icon} />
                :
                null
            }
            <Text style={[styles.leftText, props.leftTextStyle]}>{props.title}<Text style={styles.desc}>{props.desc}</Text></Text>
        </View>
    }

    return <TouchableOpacity activeOpacity={0.9} disabled={props.disabled} style={[styles.flexItem, props.contentStyle]} onPress={() => gotoSearchPage(props.path || '')}>
        {renderLeft()}
        {renderRight()}
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    desc: {
        fontSize: scaleSize(24)
    },
    rightIcon: {
        width: scaleSize(16),
        height: scaleSize(30),
        marginLeft: scaleSize(8)
    },
    rightText: {
        color: '#868686',
        fontSize: scaleSize(28),
        width: scaleSize(420),
        textAlign: 'right',
        fontWeight: '400',
        lineHeight: scaleSize(40)
    },
    leftIcon: {
        width: scaleSize(35),
        height: scaleSize(35),
        marginRight: scaleSize(16)
    },
    leftText: {
        color: '#000',
        fontSize: scaleSize(28),
        lineHeight: scaleSize(40),
        fontWeight: '400'
    },
    flexItemCont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    flexItem: {
        height: scaleSize(104),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32),
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: scaleSize(1)
    }
})

export default FlexItem