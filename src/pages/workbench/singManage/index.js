/**
 * 签约列表
 * created by chenfengxia 2019-08-27
 *  */
import React,{Component} from 'react';
import {View,TouchableOpacity,Image} from 'react-native';
import BaseContainer from '../../../components/Page';
import {scaleSize} from '../../../utils/screenUtil';
import MyselfTabs from './_components/_tabs';
// import ListItem from './listItem';
import {connect} from 'react-redux';
import singApi from '../../../services/sing';

class SingList extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource:[],
            visible:false,
            pageIndex:0,
            pageSize:30,
            status:1, // 导航对应的状态
            keyword:'', // 搜索的值
            subCount:0,//认购数
            dealCount:0,//签约数
            returnCount:0,// 退房数
            singData: {}, // 签约列表数据
            totalCount: {}, // 签约列表数量
        }
    }

    componentDidMount() {
        this.initSingData(0); // 默认列表
        this.initSingCount(); // 列表数量
        this.props.sendPoint.add({target:'页面', page:'工作台-签约管理', action:'view'});
    }
    // 签约接口
    initSingData = async(type) => {
        const {pageSize, singData} = this.state;
        let oneData = []; // 认购
        let twoData = []; // 签约
        let threeData = []; // 退房
        let newSingData = {...singData}; // 数据阵列
        let {api} = this.props.config.requestUrl;
        let body = {
            status: type + 1,
            filterContent: '',
            pageIndex: 0,
            pageSize,
        }
        try {
            let res = await singApi.list(api, body);
            console.log(res, 'res');
            if (res && res.code === '0') {
                let data = res.extension || {};
                let newPageSize = pageSize;
                if (newPageSize < res.totalCount) {
                    newPageSize += 30;
                }
                if (type === 0) {
                    oneData = [...data];
                    newSingData[0] = oneData;
                }
                if (type === 1) {
                    twoData = [...data];
                    newSingData[1] = twoData;
                }
                if (type === 2) {
                    threeData = [...data];
                    newSingData[2] = threeData;
                }
                this.setState({
                    pageSize: newPageSize,
                    singData: newSingData,
                })
            }
        } catch(error) {
            console.log(error, 'error');
        }
    }
    // 签约数量
    initSingCount = async() => {
        let {api} = this.props.config.requestUrl;
        try {
            let res = await singApi.total(api);
            console.log(res, 'res');
            if (res && res.code === '0') {
                let data = res.extension || {};
                this.setState({
                    totalCount: data,
                })
            }
        } catch(error) {
            console.log(error, 'error');
        }
    }
    
    // 跳转详情
    gotoDetail = (item) => {
        this.props.navigation.navigate('singDetail', item);
        this.props.sendPoint.add({target:'列表跳转详情_button', page:'工作台-签约管理'});
    }
    // 搜索
    gotoSearch = () =>{
        this.props.navigation.navigate('singSearch');
    }

    render() {
        const {singData, totalCount} = this.state;
        return (
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
                    <MyselfTabs
                        {...this.props}
                        singData={singData}
                        totalCount={totalCount}
                        initSingData={this.initSingData}
                        initSingCount={this.initSingCount}
                        gotoDetail={(item) => this.gotoDetail(item)}
                    />
                </View>
            </BaseContainer>
        )
    }
}

const mapStateToProps = ({config, user, point}) => {
    return {
        config,
        user,
        sendPoint:point.buryingPoint
    }
}
export default connect(mapStateToProps)(SingList);
