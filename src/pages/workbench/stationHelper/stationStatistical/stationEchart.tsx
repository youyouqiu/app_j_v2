import React, {FunctionComponent} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import styles from '../css'
import {scaleSize} from '../../../../utils/screenUtil'
// @ts-ignore
import Echarts from '@new-space/native-echarts'
import {customerInfoProps} from './index'
// import 


const StationEchart: FunctionComponent<{info: customerInfoProps}> = ({info}) => {
    const {gentlemanCount = 0, ladyCount = 0, gentlemanPercent = '', ladyPercent = ''} = info
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)",
            position: 'inside'
        },
        series: [
            {
                name:'报备性别',
                type:'pie',
                radius: ['65%', '85%'],
                hoverOffset: 2,
                selectedOffset: 1,
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '15',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {
                        value:gentlemanCount, 
                        name:'男', 
                        itemStyle: {normal:{color: '#49A1FF'}}
                    },{
                        value:ladyCount, 
                        name:'女', 
                        itemStyle: {normal: {color: '#FF5374'}}
                    },
                ]
            }
        ]
    }
    // console.log(JSON.stringify(option))
    return <View style={[styles.flex, styles.flexRow, selfStyle.main]}>
        <Echarts option={option} height={scaleSize(264)} width={scaleSize(364)} style={{flex: 0}}/>
        <View style={[styles.flex,styles.flexColumn,selfStyle.right]}>
            <View style={[styles.flex, styles.flexRow]}>
                <Image style={selfStyle.rightIcon} source={require('../../../../images/icons/stationGirl.png')}/>
                <View style={[styles.flex, styles.flexColumn, selfStyle.rightItem]}>
                    <Text style={selfStyle.percent}>{ladyPercent}</Text>
                    <Text style={selfStyle.sex}>女</Text>
                </View>
            </View>
            <View style={[styles.flex, styles.flexRow]}>
                <Image style={selfStyle.rightIcon} source={require('../../../../images/icons/stationBoy.png')}/>
                <View style={[styles.flex, styles.flexColumn, selfStyle.rightItem]}>
                    <Text style={selfStyle.percent}>{gentlemanPercent}</Text>
                    <Text style={selfStyle.sex}>男</Text>
                </View>
            </View>
        </View>
    </View>
}

const selfStyle = StyleSheet.create({
    main: {
        justifyContent: 'space-between',
        color: '#000',
        fontWeight: '500'
    },
    sex: {
        fontSize: scaleSize(24),
        color: '#CBCBCB'
    },
    percent: {
        fontSize: scaleSize(32)
    },
    right: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rightIcon: {
        width: scaleSize(82),
        height: scaleSize(82),
        marginRight: scaleSize(24)
    },
    rightItem: {
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    }
})


export default StationEchart
