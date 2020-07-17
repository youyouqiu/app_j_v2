import React, { Component } from 'react'
import { View } from 'react-native'
import { scaleSize } from '../../../../../utils/screenUtil'


class StepItem extends Component {
    render() {
        const { children, isStart, isEnd, direction, icon, reportFollowLen, index } = this.props
        return (
            <View style={{ flexDirection: direction === 'horizontal' ? 'column' : 'row', width: '100%', flex: 1, alignItems: 'center', justifyContent: direction === 'horizontal' ? 'center' : 'space-between', backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : '#fff' }}>

                {
                    direction === 'horizontal'
                        ?
                        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '100%', flex: 1, marginRight: scaleSize(100), alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{ height: 2, width: '50%', backgroundColor: isStart ? 'transparent' : '#1F3070', flex: 1 }}></View>
                            <View style={{ height: scaleSize(12), width: scaleSize(12), backgroundColor: icon ? '#CBCBCB' : '#1F3070', borderRadius: scaleSize(50) }}></View>
                            <View style={{ height: 2, width: '50%', backgroundColor: isEnd ? 'transparent' : '#1F3070', flex: 1 }}></View>
                        </View>
                        :
                        <View style={{ flexDirection: 'column', flexWrap: 'nowrap', alignItems: 'center', width: scaleSize(70), marginLeft: scaleSize(30), justifyContent: 'center' }}>
                            <View style={{ width: 2, height: '50%', backgroundColor: '#D0DDE7', flex: 1 }}></View>
                            <View style={{ height: scaleSize(12), width: scaleSize(12), backgroundColor: icon ? '#CBCBCB' : '#1F3070', borderRadius: scaleSize(50) }}></View>
                            <View style={{ width: 2, height: '50%', backgroundColor: reportFollowLen - 1 == index ? '#FFF' : '#D0DDE7', flex: 1 }}></View>
                        </View>
                }

                <View style={{ flexDirection: 'row', width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {children}
                </View>
            </View>
        )
    }
}

export default StepItem;