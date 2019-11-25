/**
 * 签约详情-历史变更
 * created by chenfengxia 2019-08-27
 *  */
import React,{Component} from 'react';
import {View} from 'react-native';
import BaseContainer from '../../../components/Page'
import {scaleSize} from '../../../utils/screenUtil'
import SubscriptionInfo from '../../../businessComponents/singDetail/subscriptionInfo/index'
import CheckOut from '../../../businessComponents/singDetail/checkOut/index'
import ReportInfo from '../../../businessComponents/singDetail/reportInfo/index'
import VisitInfo from '../../../businessComponents/singDetail/visitInfo/index'
import PhotosPreView from '../../../businessComponents/photosPreView/index'
import {connect} from 'react-redux'
import ApiSing from '../../../services/sing'
import {Toast} from 'teaset'
class SingHistory extends Component{
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            historyInfo:{},
            loading:false
        }
    }
    componentDidMount(){
        this.getHisory()
    }
    // 获取历史信息
    getHisory = async() =>{
        this.setState({loading:true})
        try{
            let {api} = this.props.config.requestUrl
            let subscriptionId = (this.props.navigation.state.params || {}).subscriptionId ||''

            let res = await ApiSing.hisory(api,subscriptionId)
            console.log(res,'hisory111')

            if(res.code === '0'){
                this.setState({
                    historyInfo:res.extension || {},
                    loading:false
                })
            }
        } catch(e){
            Toast.message('获取历史信息失败！')
            this.setState({loading:false})
            console.log(e,777777777)
        }

    }
    gotoPreview = (key,fileList) =>{
        this.photoProps = {
            index:key
        }
        fileList.length && this.setState({visible:true})

    }
    onClose = () =>{
        this.setState({visible:false})
    }
    render(){
        let {visible,historyInfo = {},loading} = this.state

        let params = this.props.navigation.state.params || {}
        let status = params.status || 5

        let fileList = []
        if(status == 5){
            fileList = (historyInfo.roomReturnInfo || {}).files || []
        } else {
            fileList = (historyInfo.takeLookInfo || {}).files || []
        }
        let statusList = historyInfo.statusList || []
        console.log(statusList)
        let isRoomFirst = null
        let isRoom = null
        let isCus = null
        if(statusList.length == 2){
            if(statusList[0] == 3){
                isRoomFirst = true
            } else {
                isRoomFirst = false
            }
        }
        if(statusList.length == 1){
            if(statusList[0] == 3){
                isRoom = true
            } else if(statusList[0] == 4) {
                isCus = true
            }
        }
        return(
            <BaseContainer title='历史变更' bodyStyle={{padding:0,backgroundColor: '#F8F8F8'}} loading={loading}>
                {
                    status == 5?
                        <CheckOut
                            title='退房'
                            data={historyInfo.roomReturnInfo}
                            gotoPreview={this.gotoPreview}
                        />
                        :
                        <View>

                            {
                                isRoomFirst == true?
                                    <View>
                                        <SubscriptionInfo
                                            title='换房'
                                            isHistory={true}
                                            titleBg='#FE5139'
                                            data={historyInfo.changeRoomInfo}
                                        />

                                        <View style={{height:scaleSize(25)}}/>
                                        <SubscriptionInfo
                                            title='换客'
                                            isHistory={true}
                                            titleBg='#49A1FF'
                                            data={historyInfo.changeCustomerInfo}
                                        />
                                    </View>
                                    :isRoomFirst == false?
                                        <View>
                                            <SubscriptionInfo
                                                title='换客'
                                                isHistory={true}
                                                titleBg='#49A1FF'
                                                data={historyInfo.changeCustomerInfo}
                                            />
                                            <View style={{height:scaleSize(25)}}/>
                                            <SubscriptionInfo
                                                title='换房'
                                                isHistory={true}
                                                titleBg='#FE5139'
                                                data={historyInfo.changeRoomInfo}
                                            />
                                        </View>
                                        :null
                            }

                            {
                                isRoom?
                                    <SubscriptionInfo
                                        title='换房'
                                        isHistory={true}
                                        titleBg='#FE5139'
                                        data={historyInfo.changeRoomInfo}
                                    />
                                    :isCus?
                                        <SubscriptionInfo
                                            title='换客'
                                            isHistory={true}
                                            titleBg='#49A1FF'
                                            data={historyInfo.changeCustomerInfo}
                                        />
                                        :null

                            }

                            <View style={{height:scaleSize(25)}}/>
                            <VisitInfo
                                title='到访历史'
                                isHistory={true}
                                data={historyInfo.takeLookInfo}
                                gotoPreview={this.gotoPreview}
                            />

                            <View style={{height:scaleSize(25)}}/>
                            <ReportInfo title='报备历史'  data={historyInfo.reportInfo}/>

                        </View>
                }

                <PhotosPreView onClose={this.onClose} visible={visible} fileList={fileList} {...this.photoProps}/>

            </BaseContainer>
        )
    }
}

const mapStateToProps = ({config, user})=> {
    return {config, user}
}
export default connect(mapStateToProps)(SingHistory)
