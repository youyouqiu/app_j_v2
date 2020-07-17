import React, {FunctionComponent} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import styles from '../css'
import {scaleSize} from '../../../../utils/screenUtil'
import {customerInfoProps} from './index'
import { UserInfo } from '../../../../models/types'

const ReportCustomer: FunctionComponent<{info: customerInfoProps, user: UserInfo}> = ({info, user}) => {
    const {ptReportNumber = 0, companyReportNumber = 0} = info
    const percent = ptReportNumber ? (companyReportNumber / ptReportNumber) * 100 : 0
    return <View style={[styles.flex, styles.flexColumn]}>
        <View style={[styles.flex, styles.flexRow, selfStyle.main]}>
            <View style={[styles.flex, styles.flexColumn, selfStyle.item]}>
                <Text style={[{color: '#000000'}, styles.bold]}>{companyReportNumber}</Text>
                <Text style={styles.projectLabel} numberOfLines={1}>{user.filialeShortName || ''}</Text>
            </View>
            <View style={[styles.flex, styles.flexColumn, selfStyle.item]}>
                <Text style={[{color: '#000000'}, styles.bold]}>{ptReportNumber}</Text>
                <Text style={styles.projectLabel}>铺侦探平台</Text>
            </View>
            <View style={[styles.flex, styles.flexColumn, selfStyle.item]}>
                <Text style={[{color: '#000000'}, styles.bold]}>{percent.toFixed(2)}%</Text>
                <Text style={styles.projectLabel}>占比</Text>
            </View>
        </View>
    </View>
}

const selfStyle = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'space-between'
    },
    item: {
        height: scaleSize(98),
        width: '33%',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})


export default ReportCustomer
