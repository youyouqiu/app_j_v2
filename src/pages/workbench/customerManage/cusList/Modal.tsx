import React, { ReactElement, FC } from 'react'
import { Modal, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import styles from './index.style'
import { scaleSize } from '@/utils/screenUtil'

interface props {
    //默认为true
    visible: boolean
    //标题
    title?: string | string[],
    //内容
    children?: ReactElement,
    //取消按钮文本
    cancelText?: string
    //确认按钮文本
    submitText?: string
    //需要关闭和确认footer,默认为true
    footer?: boolean
    //取消时回调
    onCancel?: () => void
    //确认时回调
    onSubmit?: () => void
    //toast框提示
    toast?: string,
    contentStyle?: null
}


const modal: FC<props> = ({ title, children, cancelText, submitText, footer = true, visible = true, onCancel, onSubmit, toast, contentStyle }) => {
    return (
        <Modal visible={visible} transparent={true}>
            {/* Background mask */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.backdrop}>
                {/* toast弹框 (原本teaset的toast层级低于modal)*/}
                {
                    !!toast &&
                    <View style={styles.toastView}>
                        <Text style={[{ color: '#EAEAEA', fontSize: scaleSize(28) }]}>{toast}</Text>
                    </View>
                }
                {/* modal */}
                <View style={[styles.layout, contentStyle]}>
                    {/* title */}
                    {
                        title && (typeof title === 'string' ?
                            <View style={styles.titleWrap}>
                                <Text style={styles.title} >{title}</Text>
                            </View>
                            :
                            <View style={styles.titleWrap}>
                                {
                                    // @ts-ignore
                                    title.map(a => <Text style={styles.title} >{a}</Text>)
                                }
                            </View>
                        )
                    }
                    {/* body */}
                    {children}
                    {/* footer */}
                    {
                        footer &&
                        <View style={styles.footerWrap}>
                            {/* left */}
                            <TouchableOpacity onPress={onCancel} style={[styles.footerItem, { borderRightWidth: scaleSize(2), borderColor: '#EAEAEA' }]}>
                                <Text style={styles.footerTextBase}>{cancelText || '关闭'}</Text>
                            </TouchableOpacity>
                            {/* right */}
                            <TouchableOpacity onPress={onSubmit} style={styles.footerItem}>
                                <Text style={[styles.footerTextBase, { color: '#4B6AC5' }]}>{submitText || '确认'}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </KeyboardAvoidingView>

        </Modal>)
}

export default modal
