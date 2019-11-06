/**
 * 签约详情
 * created by chenfengxia 2019-08-27
 *  */
import React,{Component} from 'react';
import {View} from 'react-native';
import BaseContainer from '../../../components/Page'
import {scaleSize} from '../../../utils/screenUtil'
import SubscriptionInfo from '../../../businessComponents/singDetail/subscriptionInfo/index'
import BuildInfo from '../../../businessComponents/singDetail/baseInfo/index'
import ReportInfo from '../../../businessComponents/singDetail/reportInfo/index'
import VisitInfo from '../../../businessComponents/singDetail/visitInfo/index'
import PhotosPreView from '../../../businessComponents/photosPreView/index'
import {setStatus} from './status'
import {connect} from 'react-redux'
import ApiSing from '../../../services/sing'
import {Toast} from 'teaset'


class SingDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            detailInfo:{},
            baseInfo:{},
            zhuData:{},
            loading:false
        }
    }

    componentDidMount(){
        this.getBaseDetail()
        this.getDetail()
    }
    // 获取详情信息
    getDetail = async() =>{
        console.log(this.props,'this.props')
        this.setState({loading:true})
        try{
            let {api} = this.props.config.requestUrl
            let params = this.props.navigation.state.params.subscriptionId || ''

            let res = await ApiSing.detail(api,params)
            console.log(res,'res222')
            if(res.code === '0'){
                this.setState({
                    detailInfo:res.extension || {},
                    loading:false
                },this.getZhuchang)
            }
        } catch(e){
            Toast.message('获取详情失败！')
            this.setState({loading:false})
            console.log(e,99999)
        }
        
    }

    // 获取详情基本信息
    getBaseDetail = async() =>{
        this.setState({loading:true})
        try{
            let {api} = this.props.config.requestUrl
            let params = this.props.navigation.state.params.buildingTreeId || ''
            let res = await ApiSing.baseDetail(api,params)
            console.log(res,'res11111111')
            if(res.code === '0'){
                this.setState({
                    baseInfo:res.extension || {},
                    loading:false
                })
            }
        } catch(e){
            Toast.message('获取基本信息失败！')
            this.setState({loading:false})
            console.log(e)
        }
        
    }

    getZhuchang = async() =>{
        this.setState({loading:true})
        try{
            let {api} = this.props.config.requestUrl
            let {detailInfo} = this.state
            let params = [
                {
                    businessId:(detailInfo.takeLookInfo || {}).reportId,
                    businessType:103
                },
                {
                    businessId:(detailInfo.subscriptionInfo || {}).subScriptionId,
                    businessType:201
                },
                {
                    businessId:(detailInfo.subscriptionInfo || {}).subScriptionId,
                    businessType:202
                }
            ]
            
            let res = await ApiSing.zcDetail(api,params)
            if(res.code === '0'){
                this.setState({
                    zhuData:res.extension || {},
                    loading:false
                })
            } 
            console.log(res,'zhuchang9999')

        } catch(e){
            this.setState({loading:false})
            Toast.message('获取驻场信息失败！')
            console.log(e,'999')
        }
    }

    gotoProjectDetail = (params) => {
        this.props.navigation.navigate('buildingDetail',params)
    }
    gotoHistory = (params,isHistory) =>{
        this.props.navigation.navigate('singHistory',params)
        isHistory && this.props.sendPoint.add({target:'退房原因_button',page:'工作台-签约管理'})
        
    }
    gotoPreview = (key,files) =>{
        this.photoProps = {
            index:key
        }
        files.length && this.setState({visible:true})
    }
    onClose = () =>{
        this.setState({visible:false})
    }
    setTitle = (status) =>{
        const titles = [
            {status:1,title:'已认购'},
            {status:2,title:'已签约'},
            {status:3,title:'已认购(换房)'},
            {status:4,title:'已认购(换客)'},
            {status:5,title:'已退房'}
        ]

        return titles.find(item => item.status === Number(status)) || {}
    }
    render(){
        let {visible,baseInfo,detailInfo,zhuData = {},loading} = this.state
        let params = this.props.navigation.state.params
        let status = params.status || ((detailInfo || {}).subscriptionInfo || {}).status
        let files = (detailInfo.takeLookInfo || {}).files || []
        let stateItem = setStatus(baseInfo.saleStatus)
        let titleStatus = this.setTitle(status).title
        
        let hasHistory = status == 3 || status == 4 || status == 5 ? true : false
        
        return(
            <BaseContainer title='签约单详情' bodyStyle={{padding:0,backgroundColor: '#F8F8F8'}} loading={loading}> 

                <BuildInfo 
                    title={`商铺状态${titleStatus}`} 
                    data={baseInfo} 
                    stateBg={stateItem.stateBg} 
                    stateColor={stateItem.stateColor}
                    stateText={stateItem.stateText}
                    gotoProjectDetail={()=>this.gotoProjectDetail(params)}
                />

                {
                    status == 2?
                        <View>
                            <View style={{height:scaleSize(25)}}/>
                            <SubscriptionInfo 
                                title='签约信息' 
                                isHistory={false} 
                                data={detailInfo.dealInfo} 
                                zhuData={zhuData[202]}
                            />
                        </View>
                        :null
                }
                

                <View style={{height:scaleSize(25)}}/>
                <SubscriptionInfo 
                    title='认购信息' 
                    hasHistory={hasHistory} 
                    isHistory={false} 
                    data={detailInfo.subscriptionInfo} 
                    gotoHistory={()=>this.gotoHistory(params,hasHistory && status == 5)}
                    zhuData={zhuData[201]}
                    historyText={hasHistory && status == 5?'退房原因':hasHistory && status !== 5?'变更历史':''}
                />

                <View style={{height:scaleSize(25)}}/>
                <VisitInfo 
                    title='到访信息' 
                    isHistory={false} 
                    data={detailInfo.takeLookInfo} 
                    gotoPreview={this.gotoPreview}
                    zhuData={zhuData[103]}
                />

                <View style={{height:scaleSize(25)}}/>
                <ReportInfo 
                    title='报备信息'  
                    data={detailInfo.reportInfo}
                />

                {/* 到访信息的图片 */}
                <PhotosPreView onClose={this.onClose} visible={visible} fileList={files} {...this.photoProps}/>

            </BaseContainer>
        )
    }
}

const mapStateToProps = ({config, user, point})=> {
    return {
        config, 
        user,
        sendPoint:point.buryingPoint
    }
}
export default connect(mapStateToProps)(SingDetail)