
/**
 * 
 */
import React, { Component } from 'react'
import { View, Text, Image,TouchableOpacity} from 'react-native'
import { scaleSize } from '../../utils/screenUtil'
import {screenStyles} from './style'

export default class Sort extends Component {
    constructor(){
        super()
        this.state = {}
    }

    initIcon = (item = {}) =>{
        let img = ''
        if(item.label.indexOf('升') !==-1){
            img = require('../../images/icons/sort_up.png')
        } 
        if(item.label.indexOf('降') !==-1){
            img = require('../../images/icons/jiangxu.png')
        }
        if(item.label.indexOf('升') !==-1 && item.isSelect){
            img = require('../../images/icons/sort_up_now.png')
        }
        if(item.label.indexOf('降') !==-1 && item.isSelect){
            img = require('../../images/icons/sort_down_now.png')
        }
        return img
    }


    render(){
        let {onChange,sortData = [],selectSort ,marginTop} = this.props
        sortData = sortData.map((item)=>{
            if(selectSort && item.value == selectSort){
                item.isSelect = true
            } else {
                item.isSelect = false
            }
            item.icon = this.initIcon(item)
            return item
        })

        
        return(
            <View style={{marginTop: marginTop, flex: 1}}>
                <View style={{backgroundColor: '#FFF'}}>
                    <Text style={[screenStyles.titleText,{paddingBottom:scaleSize(32),paddingTop:scaleSize(24),paddingLeft:scaleSize(32)}]}>排序方式</Text>
                    {
                        sortData.map((item,key)=>{
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={screenStyles.sortBox}
                                    key={key}
                                    onPress={()=>onChange(item)}
                                >
                                    <Image style={screenStyles.sortIcon} source={item.icon}/>
                                    <Text style={{fontSize:scaleSize(28),color:item.isSelect?'#1F3070':'#868686'}}>{item.label}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <TouchableOpacity style={{flex: 1, backgroundColor: '#000000AA',opacity:0.7}} activeOpacity={0.8} onPress={onChange}/>
            </View>
        )
    }
}