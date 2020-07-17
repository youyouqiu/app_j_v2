import React from 'react'
import {Overlay} from '@new-space/teaset'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {scaleSize} from '../../utils/screenUtil'
export default function PopEle(title, content, actions = [{text: '取消', onPress: ()=>{}}, {text: '确定'}]) {
    const footer = () => {
        return actions.map((button, i) => {
            return <TouchableOpacity onPress={button.onPress?button.onPress:null} style={[styles.btnItem, button.style, {borderRightColor: '#EAEAEA', borderRightWidth: StyleSheet.hairlineWidth}]}>
                <Text style={[{color: i === 0 ? '#4D4D4D' : '#4B6AC5'}, button.textStyle]}>{button.text}</Text>
            </TouchableOpacity>
        })
    }
    let overlayView = (
        <Overlay.PopView
            style={{alignItems: 'center', justifyContent: 'center'}}
            type='zoomOut'
            modal={true}
            ref={v => this.overlayPopView = v}
        >
            <View style={styles.main}>
                {title?<Text style={styles.title}>{title}</Text>:null}
                {
                    typeof(content) === 'string'
                    ?
                    <View style={styles.contentView}><Text style={styles.content}>{content}</Text></View>
                    :
                    typeof(content) === 'object'
                    ?
                    <View style={styles.contentView}>{content}</View>
                    :
                    null
                }
                <View style={styles.footer}>
                    {footer()}
                </View>
            </View>
        </Overlay.PopView>
    );
    return overlayView
}

const styles = StyleSheet.create({
    contentView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: scaleSize(20),
        paddingRight: scaleSize(20)
    },
    footer: {
        width: '100%',
        height: scaleSize(90),
        display: 'flex',
        flexDirection: 'row',
        borderTopColor: '#CBCBCB',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7
    },
    btnItem: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        backgroundColor: '#fff',
        width: scaleSize(540),
        height: scaleSize(300),
        borderRadius: 7,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color: '#000',
        fontSize: scaleSize(32),
        minHeight: scaleSize(90),
        fontWeight: '600',
    },
    content: {
        color: '#868686',
        fontSize: scaleSize(28),
        fontWeight: '400',
        textAlign: 'center'
    }
})
