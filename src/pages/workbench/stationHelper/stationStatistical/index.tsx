import React, {PureComponent} from 'react'
import { NavigationScreenProps } from 'react-navigation'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Page from '../../../../components/Page'
import ProjectInfo from './projectInfo'
import {Block, DatePicker} from '../../../../components/new-space'
import styles from '../css'
import ReportCustomerre from './reportCustomer'
import StationEchart from './stationEchart'
import StationConversion from './stationConversion'
import {scaleSize} from '../../../../utils/screenUtil'
import Api from '../../../../services/stationHelper'
import {Toast} from '@new-space/teaset'
import moment from 'moment'
import { connect, MapStateToProps } from 'react-redux'
import StoreState, { UserInfo } from '../../../../models/types'
// @ts-ignore
import * as WeChat from 'xkj-react-native-wechat'
import BuryingPoint from "@/utils/BuryPoint";
import {BuildingSaleStatusKeyType, TreeCategoryKeyType} from "@/components/new-space/components/Label";

const RangePickerWithText = DatePicker.RangePickerWithText
export interface ProjectInfoProps {
    buildingTreeId?: string
    buildingTreeName?: string
    buildingType?: string
    cover?: string
    rviewTime?: string
    areaFullName?: string
    saleAmount?: number
    saleShops?: number
    saleStatus?: BuildingSaleStatusKeyType
    shopStock?: number
    shops?: number
}

interface BusinessType {
    conversionPer: string
    dataType?: 1 | 2 | 3 | 4
    value: number
}

export interface customerInfoProps {
    companySaleAmount?: number
    companySignedSaleAmount?: number
    companySaleAmountIng?: number
    returnRoomCount?: number
    allReport?: number
    companyReportNumber?: number
    ptReportNumber?: number
    companyReportPercent?: string
    ladyPercent?: string
    ladyCount?: number
    gentlemanCount?: number
    companyReport?: number
    gentlemanPercent?: string,
    ptBusiness?: Array<BusinessType>
    companyBusiness?: Array<BusinessType>
}
interface StateProps  {
    buildingId: string
    projectInfo: ProjectInfoProps
    customerInfo: customerInfoProps
    endValue: string
    startValue: string
    buildingTreeId: string
    startTime: string
    loading: boolean
}
class StationStatistical extends PureComponent <NavigationScreenProps & {user: UserInfo}, StateProps > {

    constructor (props:any) {
        super(props)
        this.state = {
            buildingId: props.navigation.state.params.id as string,
            projectInfo: {},
            customerInfo: {},
            loading: false,
            startValue: '2018-10-01',
            endValue: moment().format('YYYY-MM-DD'),
            buildingTreeId: '',
            startTime: '2018-10-01'
        }
    }

    componentDidMount () {
        this.init()
    }

    init = () => {
        this.getProjectInfo()
    }

    getProjectInfo = async () => {
        let {buildingId} = this.state
        try {
            await this.setState({loading: true})
            let res = await Api.searchBuidingStation(buildingId)
            let projectInfo = res.extension as ProjectInfoProps
            if (!projectInfo.buildingTreeId) {
                throw new Error('楼盘信息有误')
            }
            let start = moment(projectInfo.rviewTime).format('YYYY-MM-DD')
            let body = {
                treeId: projectInfo.buildingTreeId,
                startTime: start,
                endTime: moment().format('YYYY-MM-DD')
            }
            await this.setState({startTime: start, startValue: start, buildingTreeId: projectInfo.buildingTreeId})
            let cusRes = await Api.searchCustomerReportStation(body)
            let customerInfo = cusRes.extension as customerInfoProps
            await this.setState({projectInfo, customerInfo})
        } catch (e) {
            Toast.message(`请求失败，请稍后重试:${e.message}`)
        } finally {
            await this.setState({loading: false})
        }
    }

    /**
     * 获取除开楼盘信息之外的其他报备数据统计
     */
    getReportStation = async () => {
        let {endValue, startValue, buildingTreeId} = this.state
        let body = {
            treeId: buildingTreeId,
            startTime: startValue,
            endTime: endValue
        }
        let cusRes = await Api.searchCustomerReportStation(body)
        let customerInfo = cusRes.extension as customerInfoProps
        await this.setState({customerInfo})
    }

    onChoose = async (start: any, end: any) => {
        await this.setState({
            startValue: moment(start).format('YYYY-MM-DD'),
            endValue: moment(end).format('YYYY-MM-DD')
        })
        this.getReportStation()
    }

    shareFirends = async () => {
        BuryingPoint.add({
            page: '工作台-驻场助手',
            target: '我要汇报_button',
        });
        let {projectInfo, startValue, endValue, customerInfo = {}} = this.state
        let {companyBusiness = []} = customerInfo
        let reportInfo = companyBusiness.find(v => v.dataType === 1)
        let takeLookInfo = companyBusiness.find(v => v.dataType === 2)
        let buyInfo = companyBusiness.find(v => v.dataType === 3)
        let signInfo = companyBusiness.find(v => v.dataType === 4)
        let startTime = moment(startValue).format('YYYY-MM-DD')
        let endTime = moment(endValue).format('YYYY-MM-DD')
        let shareData = {
            type: 'text',
            description: `我司对${projectInfo.buildingTreeName}从${startTime}至${endTime}：\n报备[${customerInfo.companyReportNumber}]次\n客户到访[${takeLookInfo && takeLookInfo.value}]次\n认购[${buyInfo && buyInfo.value}]套\n签约[${signInfo && signInfo.value}]套\n总退房[${customerInfo.returnRoomCount}]套\n\n总销售货值 [${customerInfo.companySaleAmount}]万\n已签约[${customerInfo.companySignedSaleAmount}]万，还有[${customerInfo.companySaleAmountIng}]万未签约`,
            userName: 'gh_6790b5afe67c', //小程序ID
        };
        await WeChat.shareToSession(shareData);
    }

    render () {
        let {projectInfo, customerInfo,startTime, startValue, endValue, loading} = this.state
        let {user} = this.props
        const fixed = () => {
            return <TouchableOpacity style={selfStyle.fixed} onPress={this.shareFirends}>
                <Text style={selfStyle.fixedText}>我要汇报</Text>
                <Image style={selfStyle.fixedImg} source={require('../../../../images/icons/arrow_right_white.png')}/>
            </TouchableOpacity>
        }
        return <Page fixed={fixed()} loading={loading} contentBgColor='#f8f8f8' title='统计分析' topBarStyle={styles.stationPage}>
            <ProjectInfo info={projectInfo}/>
            <RangePickerWithText onChose={this.onChoose} startTime={startTime} value={[startValue, endValue]}/>
            <View style={styles.stationContent}>
                <Block type='shadow' title='报备客户数对比'>
                    <ReportCustomerre info={customerInfo} user={user}/>
                </Block>
                <Block type='shadow' title='客户比例' style={styles.block}>
                    <StationEchart info={customerInfo}/>
                </Block>
                <Block type='shadow' title='与优秀公司对比' style={styles.block}>
                    <StationConversion info={customerInfo} user={user}/>
                </Block>
            </View>
        </Page>
    }
}

const selfStyle = StyleSheet.create({
    fixedImg: {
        width: scaleSize(36),
        height: scaleSize(36),
        marginLeft: scaleSize(14)
    },
    fixed: {
        position: 'absolute',
        right: 0,
        top: '50%',
        width: scaleSize(234),
        height: scaleSize(88),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1F3070',
        borderRadius: scaleSize(56)
    },
    fixedText: {
        fontSize: scaleSize(32),
        color: '#fff',
        fontWeight: '400'
    }
})

const mapStateToProps: MapStateToProps<{user: UserInfo}, any, StoreState> = ({user
}) => ({
    user: user.userInfo,
})

export default connect(mapStateToProps)(StationStatistical)

