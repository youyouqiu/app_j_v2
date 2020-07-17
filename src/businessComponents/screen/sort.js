
/**
 * 
 */
import React, { Component } from 'react'
import { View, Text, Image,TouchableOpacity, Platform, StatusBar} from 'react-native'
import { scaleSize } from '../../utils/screenUtil'
import {screenStyles} from './style'

export default class Sort extends Component {
    constructor(){
        super()
        let height = Platform.OS ==='android' ? StatusBar.currentHeight : 30
        this.state = {
            height
        }
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
        let {onChange,onClose,sortData = [],selectSort} = this.props
        sortData = sortData.map((item)=>{
            if(selectSort && item.value == selectSort){
                item.isSelect = true
            } else {
                item.isSelect = false
            }
            item.icon = this.initIcon(item)
            return item
        })

        let {height} = this.state
        
        return(
            <View style={{marginTop: height, flex: 1}}>
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
                <TouchableOpacity style={{flex: 1, backgroundColor: '#000000AA',opacity:0.7}} activeOpacity={0.8} onPress={onClose}/>
            </View>
        )
    }
}