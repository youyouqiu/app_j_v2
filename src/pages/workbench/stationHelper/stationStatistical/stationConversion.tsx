import React, {FunctionComponent} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import styles from '../css'
import {scaleSize} from '../../../../utils/screenUtil'
import {Progress} from '../../../../components/new-space'
import {customerInfoProps} from './index'
import { UserInfo } from '../../../../models/types'

const StationConversion: FunctionComponent<{info: customerInfoProps, user: UserInfo}> = ({info, user}) => {
    const {companyBusiness = [], ptBusiness = [], companyReport = 0, allReport = 0} = info
    let progressList = [
        { text: '报备', dataType: 1, val: 0, colors: '#4B6AC5', pztVal: 0, progress: '0%', pztProgress: '0%'},
        { text: '来访', dataType: 2, val: 0, colors: '#3AD047', pztVal: 0, progress: '0%', pztProgress: '0%'},
        { text: '认购', dataType: 3, val: 0, colors: '#49A1FF', pztVal: 0, progress: '0%', pztProgress: '0%'},
        { text: '签约', dataType: 4, val: 0, colors: '#FE5139', pztVal: 0, progress: '0%', pztProgress: '0%'},
    ]
    progressList = progressList.map(item => {
        let companyItem = companyBusiness.find(company => {
            return company.dataType === item.dataType
        })
        companyItem && (item.val = companyItem.value) && (item.progress = companyItem.conversionPer)
        let pztItem = ptBusiness.find(pzt => {
            return pzt.dataType === item.dataType
        })
        pztItem && (item.pztVal = pztItem.value) && (item.pztProgress = pztItem.conversionPer)
        return item

    })
    return <View style={[styles.flex, styles.flexColumn, selfStyle.main]}>
        <View style={[selfStyle.header, styles.flex, styles.flexRow]}>
            <Text style={selfStyle.name}>{user.filialeShortName || user.filiale}</Text>
            <Text style={selfStyle.name}>优秀公司</Text>
        </View>
        {
            progressList.map((item, index) => {
                return <View style={selfStyle.content}>
                    {
                        index === 0
                        ?
                        null
                        :
                        <View style={[styles.flex, styles.flexRow, selfStyle.conversion]}>
                            <View style={[selfStyle.flexItem, styles.flexRow, styles.center]}>
                                <Image source={require('../../../../images/icons/arrow_top_right.png')} style={[selfStyle.conImg, {marginRight: scaleSize(10)}]}/>
                                <Text style={selfStyle.conversionPercent}>转换率：{item.progress}</Text>
                            </View>
                            <Image source={require('../../../../images/icons/arrow_down.png')} style={selfStyle.down}/>
                            <View style={[selfStyle.flexItem, styles.flexRow, styles.center]}>
                                <Text style={selfStyle.conversionPercent}>转换率：{item.pztProgress}</Text>
                                <Image source={require('../../../../images/icons/arrow_top_left.png')} style={[selfStyle.conImg, {marginLeft: scaleSize(10)}]}/>
                            </View>
                        </View>
                    }
                    <View style={[styles.flex, styles.flexRow]}>
                        <Progress style={selfStyle.flexItem} value={item.val} number={companyReport} color={item.colors} justifyContent='flex-end'/>
                        <Text style={selfStyle.text}>{item.text}</Text>
                        <Progress style={selfStyle.flexItem} value={item.pztVal} number={allReport} color={item.colors}/>
                    </View>
                </View>
            })
        }
    </View>
}

const selfStyle = StyleSheet.create({
    conversionPercent: {
        color: '#000',
        fontSize: scaleSize(22),
        fontWeight: '400',
    },
    conImg: {
        width: scaleSize(16),
        height: scaleSize(16)
    },
    conversion: {
        marginTop: scaleSize(24),
        marginBottom: scaleSize(24)
    },
    content: {
        flex: 1,
    },
    flexItem: {
        width: '50%',
        flex:1
    },
    down: {
        width: scaleSize(30),
        height: scaleSize(30)
    },
    main: {
        justifyContent: 'space-between',
        color: '#000',
        fontWeight: '500'
    },
    name: {
        width: '50%',
        textAlign: 'center',
        fontSize: scaleSize(28),
        color: '#000',
        fontWeight: '400'
    },
    header: {
        width: '100%',
        marginTop: scaleSize(24),
        marginBottom: scaleSize(24)
    },
    progressItemBg: {
        width: '50%',
        flex: 1,
        height: scaleSize(40),
        borderRadius: scaleSize(25),
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#F8F8F8'
    },
    progressItem: {
        height: '100%',
        borderRadius: scaleSize(25),
    },
    text: {
        width: scaleSize(88),
        textAlign: 'center',
        fontSize: scaleSize(24),
        color: '#000',
        lineHeight: scaleSize(40),
        fontWeight: '400'
    }
})


export default StationConversion
