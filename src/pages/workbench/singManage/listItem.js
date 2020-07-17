/**
 * 签约列表 - 每一项
 * created by chenfengxia 2019-08-27
 *  */
import React,{Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {scaleSize} from '../../../utils/screenUtil'
import {styles} from './styles'
import moment from 'moment'
import {customerNameSubstring} from "@/utils/utils";

export default class SingList extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        let {item,gotoDetail} = this.props
        return (
            <TouchableOpacity
                key={item.subscriptionId}
                style={styles.singListWrap}
                activeOpacity={0.9}
                onPress={()=>gotoDetail(item)}
            >
                <View style={[styles.row,styles.listTop]}>
                    <View style={styles.row}>
                        <Text style={styles.codeText}>单号：</Text>
                        <Text style={styles.codeText}>{item.subscriptionNo}</Text>
                    </View>
                    <View style={styles.row}>
                        <Image style={styles.timeIcon} source={require('../../../images/icons/time.png')}/>
                        <Text style={styles.codeText}>{item.markTime && moment(item.markTime).format('MM-DD HH:mm:ss')}</Text>
                    </View>
                </View>

                <View style={[styles.row,styles.listBottom]}>
                    <View style={{flex:1}}>
                        <View style={[styles.row,{justifyContent:'space-between',paddingBottom:scaleSize(7)}]}>
                            <Text style={[styles.buildName]} numberOfLines={1} ellipsizeMode={'middle'}>{item.buildingTreeName}</Text>
                            {
                                item.status !== 2 && item.status !== 5?
                                    <Text style={{
                                        color:item.status ==3?'#49A1FD':item.status ==4?'#1F3070':'#fff',
                                        fontSize:scaleSize(28),
                                        marginRight:scaleSize(54)}}
                                    >
                                        {item.status ==3?'已换房': item.status ==4?'已换客': '已换房'}
                                    </Text>
                                    :null
                            }
                        </View>
                        <View style={[styles.row,{paddingBottom:scaleSize(24),paddingTop:scaleSize(8)}]}>
                            <View style={[styles.row,styles.buildType]}>
                                <Text style={styles.typeText}>{item.buildingType}</Text>
                            </View>
                            <Text style={styles.buildCode} numberOfLines={1}>{item.shopName}</Text>
                        </View>
                        <View style={[styles.row,{justifyContent:'space-between'}]}>
                            <View style={[styles.row,{flex:1}]}>
                                <Text style={[styles.name,{paddingRight:scaleSize(24)}]} numberOfLines={1}>
                                    {customerNameSubstring(item.customerName,3)}
                                </Text>
                                <Text style={styles.name}>{item.customerPhone}</Text>
                            </View>
                            {
                                item.status !== 2 && item.status !== 5?
                                    <View style={[styles.row,{marginRight:scaleSize(34)}]}>
                                        <Text style={styles.subscriptTime}>已认购时间:</Text>
                                        <Text style={styles.level}>{`${item.subscribedDays}天`}</Text>
                                    </View>
                                    :null
                            }
                        </View>
                    </View>

                    <View style={{marginLeft:scaleSize(-50)}}>
                        {
                            item.status === 2?
                                <Image style={styles.resultIcon} source={require('../../../images/icons/sing_success.png')}/>
                                :item.status === 5?
                                    <Image style={styles.resultIcon} source={require('../../../images/icons/sing_back.png')}/>
                                    :null
                        }
                    </View>
                </View>

            </TouchableOpacity>
        )
    }
}
