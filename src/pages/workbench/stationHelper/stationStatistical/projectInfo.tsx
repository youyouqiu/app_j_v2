import React, {FunctionComponent} from 'react'
import {View, Text, Image} from 'react-native'
import styles from '../css'
import {Label, Line} from '../../../../components/new-space'
import {ProjectInfoProps} from './index'
// import 
const SaleStatus = Label.SaleStatus
const ProjectType = Label.ProjectType

const Project: FunctionComponent<{info: ProjectInfoProps}> = ({info}) => {
    const source = info.cover ? {uri: info.cover} : require('../../../../images/pictures/building_def.png')
    return <View style={[styles.projectMain, styles.flex, styles.flexColumn]}>
        <View style={[styles.flex, styles.flexRow, {flex: 1}]}>
            <Image style={styles.projectMainImage} source={source}/>
            <View style={[styles.projectRight, {flex: 1}, styles.flex, styles.flexColumn]}>
                <Text numberOfLines={2} style={[styles.projectName]}>{info.buildingTreeName}</Text>
                <Text style={[styles.projectAddress]}>{info.areaFullName}</Text>
                <View style={[styles.flex, styles.flexRow]}>
                    <SaleStatus _key={info.saleStatus}/>
                    <ProjectType _key={info.buildingType}/>
                </View>
            </View>
        </View>
        <View style={[styles.flex, styles.flexRow, styles.projectFooter]}>
            <View style={[styles.flex, styles.flexColumn, styles.projectFooterItem]}>
                <Text style={[{color: '#000000'}, styles.bold]}>{info.shopStock}/<Text style={{color: '#868686'}}>{info.shops}</Text></Text>
                <Text style={styles.projectLabel}>在售/总套数</Text>
            </View>
            <Line height={20}/>
            <View style={[styles.flex, styles.flexColumn, styles.projectFooterItem]}>
                <Text style={[{color: '#000000'}, styles.bold]}>{info.saleShops}</Text>
                <Text style={styles.projectLabel}>自售</Text>
            </View>
            <Line height={20}/>
            <View style={[styles.flex, styles.flexColumn, styles.projectFooterItem]}>
                <Text style={[{color: '#FE5139'}, styles.bold]}>{info.saleAmount}万</Text>
                <Text style={styles.projectLabel}>销售货值</Text>
            </View>
        </View>
    </View>
}


export default Project
