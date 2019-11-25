import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextProps, Image, Linking } from 'react-native'
import styles from '../styles'
import { checkBlank } from '../../../../utils/utils'
import shopJson, { ShopInfo, ShopCategoryType } from '../shopJson'
import Modal from '../../../../components/Modal/index'

const RelevantInfo = ({ shopInfo = {}, onLayout }: { shopInfo: any, onLayout: any }) => {
    const [visible, setVisible] = useState(false)
    const [phone, setPhone] = useState('')

    let { basicInfo, shopTreeExtdata, residentUserInfo = [] } = shopInfo
    basicInfo = Object.assign({}, basicInfo, shopTreeExtdata)
    let shopCategoryType: ShopCategoryType = shopInfo.shopCategoryType
    const shopJsonInfo: ShopInfo = shopJson[shopCategoryType] || {}
    const { basicInfo: basicInfoList = [], shopUnique = [] } = shopJsonInfo

    const handlePressCallBtn = (phone: string) => {
        setPhone(phone)
        setVisible(true)
    }

    const handlePressOk = () => {
        Linking.openURL('tel:' + phone)
        setVisible(false)
    }

    const handlePressClose = () => {
        setPhone('')
        setVisible(false)
    }

    return (
        <View style={styles.bd_subWrapper} onLayout={onLayout}>
            <View style={styles.bd_subContainer}>
                {/* 基本信息title */}
                <Text style={styles.bd_subHeader}>基本信息</Text>

                {/* 基本信息字段 */}
                <View style={styles.bd_descItemContent}>
                    {basicInfoList.map(item => {
                        const value = basicInfo[item.key]
                        return value ? (
                            <DescItem label={item.label} value={checkBlank({ value, ...item })} single={item.single} />
                        ) : null
                    })}
                </View>

                {/* 赠面、临街、双边、拐角 */}
                {!!shopUnique.length && (
                    <View style={[styles.bd_shopUniqueContent]}>
                        {shopUnique.map(item => {
                            const params = { value: basicInfo[item.key], ...item }
                            return <ShopUniqueItem label={item.label} value={checkBlank(params) || '无'} />
                        })}
                    </View>
                )}

                {/* 电话 */}
                {!!residentUserInfo.length && (
                    <View style={styles.callContainer}>
                        {residentUserInfo.map((resident: any) => (
                            <View key={resident.id} style={styles.call}>
                                <View style={styles.residentUserInfo}>
                                    <Image style={styles.userIcon} source={require('@/images/icons/user.png')} />
                                    <Text numberOfLines={1} style={styles.residentUserText}>
                                        {`项目经理-${resident.trueName}`}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={styles.callBtn}
                                    onPress={() => handlePressCallBtn(resident.phone)}
                                >
                                    <Image style={styles.callIcon} source={require('@/images/icons/phone.png')} />
                                    <Text style={styles.callText}>电话咨询</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}
            </View>

            {/* 确认拨打电话弹窗 */}
            <Modal visible={visible} width={541} height={200} type='conform' transparent={true} onOk={handlePressOk} onClose={handlePressClose}>
                <Text style={{ width: '100%', textAlign: 'center' }}>是否拨打{phone}</Text>
            </Modal>
        </View>
    )
}

export const DescItem = ({ label, value, single = false }: { label: string, value: any, single?: boolean }) => {
    const valueLines: TextProps = {}
    if (!single) valueLines.numberOfLines = 1
    return (
        <View style={styles.bd_descItem(single)}>
            <Text numberOfLines={1} style={styles.bd_descLabel}>{label}:</Text>
            <Text {...valueLines} style={styles.bd_descValue}>{value}</Text>
        </View>
    )
}

export const ShopUniqueItem = ({ label, value }: { label: string, value: any }) => {
    return (
        <View style={styles.bd_ShopUniqueItem}>
            <View style={[styles.bd_bd_ShopUniqueItem_flex, styles.bd_bd_ShopUniqueItem_flex_left]}>
                <Text numberOfLines={1} style={styles.bd_bd_ShopUniqueItem_flex_left_text}>{label}</Text>
            </View>
            <View style={[styles.bd_bd_ShopUniqueItem_flex, styles.bd_bd_ShopUniqueItem_flex_right]}>
                <Text numberOfLines={1} style={styles.bd_bd_ShopUniqueItem_flex_right_text}>{value}</Text>
            </View>
        </View>
    )
}

export default RelevantInfo
