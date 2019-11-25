import React, {useEffect, useState} from "react";
import {Image, Text, View} from "react-native";
import styles from "../styles";
import {scaleSize} from "../../../../utils/screenUtil";
import {mapSearch} from '../../../../utils/mapServerApi'
import {aroundType} from '../buildJson'

const Surround = ({onLayout, buildingDetail = {}}) => {
    let {basicInfo = {}} = buildingDetail
    let {latitude, longitude} = basicInfo
    let [aroundData, setAroundData] = useState([])

    useEffect(() => {
        if (!latitude || !longitude) return
        let list = []
        aroundType.map(item => {
            let a = new Promise((resolve) => {
                mapSearch(latitude, longitude, item.label).then(res => {
                    if (res.message === 'ok' && res.total > 0) {
                        resolve({key: item.key, value: res.results})
                    } else {
                        resolve({key: item.key, value: null})
                    }
                // eslint-disable-next-line no-unused-vars
                }).catch(e => {
                    resolve({key: item.key, value: null})
                })
            })
            list.push(a)
        })
        Promise.all(list).then(values => {
            setAroundData(values)
        })
    }, [buildingDetail])

    return (
        <View style={[styles.subContent, {paddingBottom: scaleSize(8)}]} onLayout={onLayout}>
            <Text style={styles.subHeader}>周边配套</Text>
            {aroundType.map(item => {
                let arroundDataItem = aroundData.find(v => v.key === item.key) || {}
                if (!arroundDataItem.value) return null
                let {value = []} = arroundDataItem
                let detail = value.map(val => {
                    return `${val.name}约${(val.detail_info || {}).distance}m`
                })
                return <View style={styles.SIItem} key={item.key}>
                    <Image style={styles.SIItemIcon} source={item.icon}/>
                    <View style={styles.SIItemRight}>
                        <Text style={styles.SIItemTitle} numberOfLines={1}>{item.label}</Text>
                        <Text style={styles.SIItemDesc} numberOfLines={1}>{detail.join(',')}</Text>
                    </View>
                </View>
            }
        )}
        </View>
    )
};

export default Surround;
