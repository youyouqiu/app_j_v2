import React, { useState, useEffect } from 'react'
import {
    Image, View, Text, TouchableOpacity,
    Modal, StatusBar, Platform,
} from 'react-native'
import { Carousel } from 'teaset'
import ImageViewer from '@new-space/react-native-image-zoom-viewer'
import { Label } from '@/components/new-space'
import projectService from '@/services/projectService'
import { checkBlank } from '@/utils/utils'
import shopJson from '../shopJson'
import styles from '../styles'
import { scaleSize } from '@/utils/screenUtil'

const ShopSaleStatus = Label.ShopSaleStatus
const defaultSource = require('../../../../images/pictures/building_def.png')

export default ({
    shopId = '',
    baseInfo = {},
    shopInfo = {},
}) => {
    const [carousel, setCarousel] = useState([])
    const [imageViewerIdx, setImageViewerIdx] = useState(0)
    const [imageViewerVisible, setImageViewerVisible] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                let { extension } = await projectService.queryFilesReq(null, shopId)
                setCarousel(extension)
            } catch (e) {
                console.log(e)
            }
        })()
    }, [shopId])

    const imageViewerToggle = (idx) => {
        if (Platform.OS === 'android') {
            if (!imageViewerVisible) {
                StatusBar.setBarStyle('light-content', true)
                StatusBar.setBackgroundColor('#000', true)
            } else {
                StatusBar.setBarStyle('dark-content', true)
                StatusBar.setBackgroundColor('rgba(255,255,255,0)', true)
            }
        }
        setImageViewerVisible(!imageViewerVisible)
        setImageViewerIdx(typeof idx === 'number' ? idx : 0)
    }

    const { shopTreeExtdata = {} } = shopInfo
    baseInfo = { ...baseInfo, ...shopTreeExtdata }
    const shopJsonInfo = shopJson[shopInfo.shopCategoryType || 1] || {}
    const status = shopJsonInfo.status[baseInfo.status]
    const { row2Info } = shopJsonInfo
    const seatVisible = shopJsonInfo.seatNum && !!baseInfo.seatNum
    const images = []

    return <>
        {/* 顶部图片 */}
        {
            carousel.length ? (
                <Carousel control style={{ height: 275 }}>
                    {carousel.map((item, idx) => {
                        images.push({ url: item.original })
                        return (
                            <TouchableOpacity activeOpacity={1} onPress={() => imageViewerToggle(idx)} key={idx}>
                                <Image
                                    resizeMode='cover'
                                    source={{ uri: item.medium }}
                                    defaultSource={defaultSource}
                                    style={styles.bd_carouselImage}
                                />
                            </TouchableOpacity>
                        )
                    })}
                </Carousel>
            ) : <Image source={defaultSource} style={styles.bd_carouselImage} />
        }

        {/* 文字信息 */}
        <View style={styles.bd_headContainer}>
            {/* row 1 */}
            <View style={styles.bd_titleContent}>
                <View style={{ height: scaleSize(45), marginRight: scaleSize(5), justifyContent: 'center' }}>
                    <Label _key={shopJsonInfo.shopCategoryType} />
                </View>
                <Text style={styles.bd_title} numberOfLines={2}>{baseInfo.name}</Text>
                <View style={{ height: scaleSize(45), marginRight: scaleSize(-6), flexDirection: 'row', alignItems: 'center' }}>
                    <Label
                        _key={status}
                        style={{ backgroundColor: '#EAEAEA', marginRight: scaleSize(11) }}
                        textStyle={{ color: '#868686' }}
                    />
                    <ShopSaleStatus _key={baseInfo.saleStatus} />
                </View>
            </View>

            {/* row2 */}
            <View style={styles.bd_priceAndArea}>
                {seatVisible && (
                    <Field1
                        label='容纳工位'
                        value={baseInfo.seatNum || 0}
                        unit='个'
                        widthRatio={0.25}
                    />
                )}
                <Field1
                    separator={seatVisible}
                    label='套内/建面'
                    value={`${baseInfo.houseArea || 0}/${baseInfo.buildingArea || 0}`}
                    unit='㎡'
                    widthRatio={0.5}
                />
                <Field1
                    separator
                    label='参考总价'
                    value={baseInfo.totalPrice}
                    unit='万'
                    widthRatio={seatVisible ? 0.25 : 0.5}
                    color='#FE5139'
                />
            </View>

            {/* row3 */}
            <View style={styles.bd_otherInfo}>
                {row2Info.map((item, index) => {
                    const params = { value: baseInfo[item.key], ...item }
                    const Field2Component = index === 0 ? Field2Type : Field2
                    return <Field2Component
                        label={item.label}
                        value={checkBlank(params)}
                        length={row2Info.length}
                    />
                })}
            </View>
        </View>

        {/* 图片细览modal */}
        <Modal visible={imageViewerVisible} transparent={true} onRequestClose={imageViewerToggle} animationType='fade'>
            <ImageViewer imageUrls={images} index={imageViewerIdx} saveToLocalByLongPress={false} onClick={imageViewerToggle} />
        </Modal>
    </>
}

const Field1 = ({ label, value, widthRatio, unit = '', separator = false, color = '#000' }) => (
    <View style={styles['field-1'](widthRatio, separator)}>
        <Text style={styles['field-1-row-1'](separator, color)} numberOfLines={1}>
            {value}
            <Text style={styles['field-1-row-1-unit']}>{unit}</Text>
        </Text>
        <Text style={styles['field-1-row-2'](separator)} numberOfLines={1}>{label}</Text>
    </View>
)

const Field2 = ({ label, value }) => (
    <View style={styles['field-2']}>
        <Text style={styles['field-2-row-1']} numberOfLines={1}>{value}</Text>
        <Text style={styles['field-2-row-2']} numberOfLines={1}>{label}</Text>
    </View>
)

const Field2Type = ({ label, value, length }) => (
    <View style={styles['field-2-type'](length)}>
        <Text style={styles['field-2-row-1']} numberOfLines={1}>{value}</Text>
        <Text style={styles['field-2-row-2']} numberOfLines={1}>{label}</Text>
    </View>
)
