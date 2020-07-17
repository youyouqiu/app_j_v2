/**
 * 签约详情
 * created by chenfengxia 2019-08-27
 *  */
import React, {Component} from 'react';
import {View} from 'react-native';
import BaseContainer from '../../../components/Page'
import {scaleSize} from '@/utils/screenUtil'
import _SubscriptionInfo from '../../../businessComponents/singDetail/subscriptionInfo/_index'
import BuildInfo from '../../../businessComponents/singDetail/baseInfo/index'
import ReportInfo from '../../../businessComponents/singDetail/reportInfo/index'
import VisitInfo from '../../../businessComponents/singDetail/visitInfo/_index'
import {setStatus} from './status'
import {connect} from 'react-redux'
import ApiSing from '../../../services/sing'
import {Toast} from '@new-space/teaset'
import {baseDetailMap, singDetailMap} from "@/helpers/singDetailMap";
import {SignDetailStateType} from "@/pages/workbench/singManage/types/signDetailtypes";
import PhotosPreView from "@/businessComponents/photosPreView";
import {object} from "prop-types";


class SingDetail extends Component<any, any> {

    photoProps: any = {};

    state = {
        visible: false,
        baseInfo: {},
        zcInfo: {},
        loading: {},
        signInfo: {},
        subscriptionInfo: {},
        visitInfo: {},
        reportInfo: {}
    } as SignDetailStateType;

    componentDidMount() {
        this.getBaseDetail();
        this.getDetail()
    }

    getDetail = async () => {
        this.setState({loading: true});
        try {
            let {api} = this.props.config.requestUrl;
            let params = this.props.navigation.state.params.subscriptionId || '';

            let res = await ApiSing.detail(api, params);
            if (res.code === '0') {
                const {subscriptionInfo, signInfo, visitInfo, reportInfo} = singDetailMap(res.extension);
                this.setState({
                    subscriptionInfo,
                    signInfo,
                    visitInfo,
                    reportInfo,
                    loading: false
                }, this.getZCInfo)
            }
        } catch (e) {
            Toast.message('获取详情失败！');
            this.setState({loading: false});
            console.log(e, 99999)
        }
    };

    getBaseDetail = async () => {
        this.setState({loading: true});
        try {
            let {api} = this.props.config.requestUrl;
            let params = this.props.navigation.state.params.buildingTreeId || '';
            let res = await ApiSing.baseDetail(api, params);
            if (res.code === '0') {
                this.setState({
                    baseInfo: baseDetailMap(res.extension),
                    loading: false
                })
            }
        } catch (e) {
            Toast.message('获取基本信息失败！');
            this.setState({loading: false});
            console.log(e)
        }
    };

    getZCInfo = async () => {
        this.setState({loading: true});
        try {
            let {api} = this.props.config.requestUrl;
            let {visitInfo, subscriptionInfo} = this.state;
            let params = [
                {businessId: visitInfo.reportId, businessType: 103},
                {businessId: subscriptionInfo.subscriptionId, businessType: 201},
                {businessId: subscriptionInfo.subscriptionId, businessType: 202}
            ];
            let res = await ApiSing.zcDetail(api, params);

            if (res.code === '0') {
                this.setState({
                    zcInfo: res.extension || {},
                    loading: false
                })
            }
        } catch (e) {
            this.setState({loading: false});
            Toast.message('获取驻场信息失败！');
        }
    };

    gotoProjectDetail = () => {
        const {params} = this.props.navigation.state.params;
        this.props.navigation.navigate('buildingDetail', params)
    };

    gotoHistory = () => {
        const {hasHistory, status} = this.state.subscriptionInfo;
        const {navigation, sendPoint} = this.props;
        const isHistory = hasHistory && status === 5;
        let params = navigation.state.params;
        params.status = status;
        navigation.navigate('singHistory', params);
        isHistory && sendPoint.add({target: '退房原因_button', page: '工作台-签约管理'})
    };

    gotoPreview = (key: any, files: any) => {
        this.photoProps = {
            index: key
        };
        files.length && this.setState({visible: true})
    };
    onClose = () => {
        this.setState({visible: false})
    };

    titleObj: any = {
        1: '已认购',
        2: '已签约',
        3: '已认购(换房)',
        4: '已认购(换客)',
        5: '已退房'
    };

    render() {
        let {visible, baseInfo, signInfo, subscriptionInfo, visitInfo, zcInfo, loading, reportInfo} = this.state;
        let files = visitInfo.files || [];
        let stateItem: any = setStatus(baseInfo.saleStatus);
        return (
            <BaseContainer title='签约单详情' bodyStyle={{padding: 0, backgroundColor: '#F8F8F8'}} loading={loading}>

                <BuildInfo title={subscriptionInfo.status ? `商铺状态${this.titleObj[subscriptionInfo.status]}` : ''}
                           data={baseInfo}
                           stateBg={stateItem.stateBg}
                           stateColor={stateItem.stateColor}
                           stateText={stateItem.stateText}
                           gotoProjectDetail={this.gotoProjectDetail}/>

                <View style={{height: scaleSize(25)}}/>
                {Object.keys(signInfo).length > 0 && <_SubscriptionInfo title={`签约信息`} data={signInfo} zcInfo={zcInfo[202]}/>}

                <View style={{height: scaleSize(25)}}/>
                <_SubscriptionInfo title='认购信息' data={subscriptionInfo} gotoHistory={this.gotoHistory} zcInfo={zcInfo[201]}/>

                <View style={{height: scaleSize(25)}}/>
                <VisitInfo title='到访信息' data={visitInfo} gotoPreview={this.gotoPreview} zcInfo={zcInfo[103]}/>

                <View style={{height: scaleSize(25)}}/>
                <ReportInfo title='报备信息' data={reportInfo}/>

                {/* 到访信息的图片 */}
                <PhotosPreView onClose={this.onClose} visible={visible} fileList={files} {...this.photoProps}/>

            </BaseContainer>
        )
    }
}

const mapStateToProps = ({config, user, point}: any) => {
    return {
        config,
        user,
        sendPoint: point.buryingPoint
    }
}
export default connect(mapStateToProps)(SingDetail)
