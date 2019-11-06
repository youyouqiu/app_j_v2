/**
 * 签约列表
 * created by chenfengxia 2019-08-27
 *  */
import React,{Component} from 'react';
import {View,TouchableOpacity,Image} from 'react-native';
import BaseContainer from '../../../components/Page'
import {scaleSize} from '../../../utils/screenUtil'
import {XKJScrollTabView} from '../../../components/XKJScrollTabView/XKJScrollTabView';
import ListItem from './listItem'
import {connect} from 'react-redux'


const tabs = [
    {name:'认购',status:1},
    {name:'签约',status:2},
    {name:'退房',status:3}
]
class SingList extends Component{
    constructor(props){
        super(props)
        this.state = {
            dataSource:[],
            visible:false,
            pageIndex:0,
            pageSize:10,
            status:1, // 导航对应的状态
            keyword:'', // 搜索的值
            subCount:0,//认购数
            dealCount:0,//签约数
            returnCount:0,// 退房数
            condition:{
                pageIndex:0,
                pageSize:10,
                status:1
            }
        }
    }

    componentDidMount(){
        this.props.sendPoint.add({target:'页面',page:'工作台-签约管理',action:'view'})
    }
    // 跳转详情
    gotoDetail = (item) => {
        this.props.navigation.navigate('singDetail',item)
        this.props.sendPoint.add({target:'列表跳转详情_button',page:'工作台-签约管理'})
    }
    // 每一项的布局
    tabItemComponent = ({item}) =>{
        return (
            <View style={{marginTop:scaleSize(32)}}>
                <ListItem item={item} gotoDetail={()=>this.gotoDetail(item)}/>
            </View>
        )
    }
    // 搜索
    gotoSearch = () =>{
        this.props.navigation.navigate('singSearch')
    }
    render(){
        let {condition} = this.state
        return(
            <BaseContainer
                title='签约管理'
                bodyStyle={{padding:0,backgroundColor: '#F8F8F8'}}
                scroll={false}
                rightView={
                    <TouchableOpacity activeOpacity={0.8} onPress={this.gotoSearch}>
                        <Image style={{width:scaleSize(45),height:scaleSize(45),marginRight:scaleSize(32)}} source={require('../../../images/icons/search.png')}/>
                    </TouchableOpacity>
                }
            >

                <View style={{height: '100%'}}>
                    <XKJScrollTabView
                        tabs={tabs}
                        requestData={condition}
                        activeTab='0'
                        tabIdKey='status'
                        dataRequestUrl={this.props.config.requestUrl.api + '/v2.0/api/signing/list'}
                        markerRequestUrl={this.props.config.requestUrl.api + '/v2.0/api/signing/list/total'}
                        tabBarUnderlineStyle={{backgroundColor: '#1F3070', height: scaleSize(5), width: scaleSize(55)}}
                        style={{borderWidth: 0, backgroundColor: '#F8F8F8'}}
                        tabBarBackgroundColor='#fff'
                        tabItemComponent={[this.tabItemComponent]}
                    />
                </View>


            </BaseContainer>

        )
    }
}

const mapStateToProps = ({config, user,point})=> {
    return {
        config,
        user,
        sendPoint:point.buryingPoint
    }
}
export default connect(mapStateToProps)(SingList)
