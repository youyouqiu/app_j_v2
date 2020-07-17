import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import {connect} from 'react-redux';
import {scaleSize} from '../../../utils/screenUtil';
import {visitDetailDataApi, buildingDetailDataApi, buildingImageDataApi, onsiteDataApi} from './../../../services/report';
import BaseContainer from '../../../components/Page';
import moment from "moment";
import styles from './visitDetailStyle'

const BULIDINGIMG = require('../../../images/pictures/building.png');

class VisitDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visitId: {}, // 报备 id / 楼盘 id
            visitData: {}, // 到访详情数据
            buildingData: {}, // 楼盘详情数据
            buildingImageData: [], // 楼盘封面数据
            onsiteData: {}, // 驻场信息
        }
    }

    componentDidMount() {
        let {navigation} = this.props;

        let visitId = ((navigation || {}).state || {}).params || {};

        if (visitId) {
            this.setState({
                visitId,
            }, () => {
                this.visitDetailData();
                this.buildingDetailData();
                this.buildingImageData();
                this.onsiteData();
            })
        }
    }

    // 到访详情接口
    visitDetailData = async () => {
        let {visitId} = this.state;
        let {api} = this.props.config.requestUrl;
        try {
            let res = await visitDetailDataApi(api, visitId.reportId || '');
            if (res && res.code === '0') {
                let data = res.extension || {};

                this.setState({
                    visitData: data,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    // 楼盘信息接口
    buildingDetailData = async () => {
        let {visitId} = this.state;
        let {api} = this.props.config.requestUrl;
        try {
            let res = await buildingDetailDataApi(api, visitId.buildingTreeId || '');
            if (res && res.code === '0') {
                let data = res.extension || {};

                this.setState({
                    buildingData: data,
                })
            }

        } catch (error) {
            console.log(error);
        }
    }

    // 楼盘封面图接口
    buildingImageData = async () => {
        let {visitId} = this.state;
        let {api} = this.props.config.requestUrl;

        try {
            let res = await buildingImageDataApi(api, visitId.buildingId || '');
            if (res && res.code === '0') {
                let data = res.extension || {};

                this.setState({
                    buildingImageData: data,
                })
            }

        } catch (error) {
            console.log(error);
        }
    }

    // 驻场信息接口
    onsiteData = async () => {
        let {visitId} = this.state;
        let {api} = this.props.config.requestUrl;

        let body = [
            {
                businessId: visitId.reportId || '',
                businessType: 103,
            }
        ];

        try {
            let res = await onsiteDataApi(api, body);
            if (res && res.code === '0') {
                let data = res.extension || {};

                this.setState({
                    onsiteData: data,
                })
            }

        } catch (error) {
            console.log(error);
        }
    }

    // 拨打电话
    callPhone = (phone) => {
        Linking.openURL(`tel:${phone}`);
    }

    itemContainer = ({title, time, children, beltLookValidityNumber}) => (
        <>
            {/* 为什么要用白底？？？ */}
            <View style={styles.line}/>
            <View style={styles.itemContainer}>
                {/* title */}
                <View style={styles.itemTitleWrap}>
                    <Text style={styles.titleText}>{title}</Text>
                    {
                        !!time &&
                        <>
                            <View style={styles.verticalLine}/>
                            <Text style={styles.titleTime}>{time}</Text>
                        </>
                    }
                    {beltLookValidityNumber ? (
                        <View style={styles.titleDayWrapper}>
                            <Text style={styles.titleDayLabel}>保护剩余</Text>
                            <Text style={styles.titleDay}>{beltLookValidityNumber}</Text>
                        </View>

                    ) : null}
                </View>
                {/* content */}
                <View style={{width: '100%'}}>
                    {children}
                </View>
            </View>
        </>
    )

    /**
     * @baseContent 基本文字内容
     * @children 自定义内容，与baseContent同时存在时覆盖baseContent
     * @titleStyle 标题style
     */
    item = ({title, baseContent, children, titleStyle}) => (
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: scaleSize(19), width: '100%'}}>
            <Text style={[{
                color: '#868686',
                fontSize: scaleSize(28),
                lineHeight: scaleSize(40),
                marginRight: scaleSize(16)
            }, titleStyle]}>{title}</Text>
            {
                children ? children : <Text style={{color: '#000', flex: 1, fontSize: scaleSize(28), lineHeight: scaleSize(40)}}>{baseContent}</Text>
            }
        </View>
    )

    render() {
        let {visitData, buildingData, onsiteData} = this.state;
        let saleStatus = (buildingData || {}).saleStatus;
        let newSaleStatus = '';
        // let startTime = new Date((((visitData || {}).beltLookDeails || {}).visitTime || '').replace(/T/g, ' ').replace(/-/g, '/'));
        // let endTime = new Date((((visitData || {}).beltLookDeails || {}).validityEndDate || '').replace(/T/g, ' ').replace(/-/g, '/'));
        // let day = Math.ceil((endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60 / 24);
        let day = ((visitData || {}).beltLookDeails || {}).beltLookValidityNumber || '';
        const Container = this.itemContainer
        const Item = this.item

        switch (saleStatus) {
            case 1:
                newSaleStatus = '在售';
                break;

            case 2:
                newSaleStatus = '待售';
                break;

            case 3:
                newSaleStatus = '售罄';
                break;

            case 4:
                newSaleStatus = '停售';
                break;

            default:
                console.log('没有default');
        }
        let coverImg = BULIDINGIMG;
        if (((buildingData || {}).basicInfo || {}).icon) {
            coverImg = {uri: ((buildingData || {}).basicInfo || {}).icon}
        }
        console.log('visitData', visitData);
        return (
            <BaseContainer
                title='到访详情'
                bodyStyle={{padding: 0, backgroundColor: '#fff'}}
            >
                <View style={styles.visitOk}>
                    <Image
                        source={require('../../../images/icons/visitOk.png')}
                        style={styles.okImg}
                        alt='图标'
                    />
                    <Text style={styles.textOk}>客户到访已确认！</Text>
                </View>

                <View>
                    <View style={styles.contentView}>
                        <Image
                            source={coverImg}
                            style={styles.buildingImg}
                            alt='封面'
                        />
                        <View style={styles.rightContent}>
                            <Text style={styles.treeName}>{buildingData.fullName || ''}</Text>
                            <Text style={styles.adressName}>
                                {((buildingData || {}).basicInfo || {}).cityName || ''}
                                -
                                {((buildingData || {}).basicInfo || {}).districtName || ''}
                                -
                                {((buildingData || {}).basicInfo || {}).areaName || ''}
                            </Text>
                            <View style={styles.statusView}>
                                <Text style={styles.statusText}>
                                    {newSaleStatus}
                                </Text>
                                <Text style={[styles.statusText, {backgroundColor: 'rgba(244,245,249,1)', color: 'rgba(102,115,155,1)'}]}
                                >
                                    {((buildingData || {}).basicInfo || {}).buildingType || ''}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.line}/>

                    <View style={styles.zcView}>
                        <Text style={styles.zcName}>
                            {((onsiteData || {})[103] || {}).trueName || ''}<Text style={{color: '#868686'}}> | {'新空间驻场'}</Text>
                        </Text>
                        <TouchableOpacity
                            style={styles.callView}
                            onPress={() => {
                                this.callPhone(((onsiteData || {})[103] || {}).phoneNumber || '')
                            }}
                            activeOpacity={0.8}
                        >
                            <Image
                                source={require('../../../images/icons/phone.png')}
                                style={styles.phoneImg}
                                alt='图标'
                            />
                            <Text style={styles.phoneText}>拨打电话</Text>
                        </TouchableOpacity>
                    </View>

                    <Container title='到访信息' beltLookValidityNumber={day}
                               time={moment((((visitData || {}).beltLookDeails || {}).markTime || '')).format('YYYY-MM-DD HH:mm:ss')}>
                        <Item title='项目经理：'>
                            <View style={styles.spaceBetween}>
                                <Text style={styles.titleText}>{((onsiteData || {})[103] || {}).trueName || ''}</Text>
                                <TouchableOpacity
                                    style={styles.callView}
                                    onPress={() => {
                                        this.callPhone(((onsiteData || {})[103] || {}).phoneNumber || '')
                                    }}
                                    activeOpacity={0.8}
                                >
                                    <Image
                                        source={require('../../../images/icons/phone.png')}
                                        style={styles.phoneImg}
                                        alt='图标'
                                    />
                                    <Text style={styles.phoneText}>拨打电话</Text>
                                </TouchableOpacity>
                            </View>
                        </Item>
                        {/*<Item title='保护期:' baseContent={day}/>*/}
                        <Item title='到访客户：' titleStyle={{alignSelf: 'flex-start'}}>
                            {(visitData && visitData.beltLookDeails && visitData.beltLookDeails.customerList &&
                                visitData.beltLookDeails.customerList.length > 0) ? (
                                <Text style={[styles.titleText]}>{visitData.beltLookDeails.customerList[0].customerName}</Text>
                            ) : null}
                        </Item>

                        <Item title='联系电话：' titleStyle={{alignSelf: 'flex-start'}}>
                            <View style={styles.vd_phone_content}>
                                {
                                    (((visitData || {}).beltLookDeails || {}).customerList || []).map((item, index) => (
                                        <View style={{flexDirection: 'row'}} key={index}>
                                            <Text style={styles.titleText}>{item.customerPhone || ''}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </Item>

                        <Item title='实际到访时间：'>
                            <Text style={styles.titleText}>
                                {moment(((visitData || {}).beltLookDeails || {}).visitTime || '').format('YYYY-MM-DD HH:mm')}
                            </Text>
                        </Item>

                        <View style={styles.picView}>
                            {
                                (((visitData || {}).beltLookDeails || {}).beltLookAttach || []).length > 0
                                    ? (((visitData || {}).beltLookDeails || {}).beltLookAttach || []).map((item, index) => {
                                        return (
                                            <Image
                                                style={styles.insteadPic}
                                                source={{uri: item.fileUrl}}
                                                alt='照片'
                                                key={index}
                                            />
                                        )
                                    })
                                    : null
                            }
                        </View>
                    </Container>

                    <Container title='报备信息' time={moment((((visitData || {}).reportDetails || {}).markTime || '')).format('YYYY-MM-DD HH:mm:ss')}>
                        <Item title='单号：' baseContent={((visitData || {}).reportDetails || {}).reportNumber || ''}/>
                        <Item title='报备客户：'>
                            <Image
                                style={styles.sexImg}
                                source={((visitData || {}).reportDetails || {}).customerSex === 0 ?
                                    require('./../../../images/icons/woman2.png') : require('./../../../images/icons/man2.png')}
                                alt='图标'
                            />
                            <Text style={[styles.titleText]}>&nbsp;&nbsp;{((visitData || {}).reportDetails || {}).customerName || ''}</Text>
                        </Item>

                        {visitData.reportDetails && visitData.reportDetails.expectedBeltTime && (
                            <Item title='预计到访时间：' baseContent={moment(visitData.reportDetails.expectedBeltTime).format('YYYY-MM-DD HH:mm')}/>
                        )}

                        <Item title='联系电话：' titleStyle={{alignSelf: 'flex-start'}}>
                            <View style={styles.vd_phone_content}>
                                {
                                    (((visitData || {}).reportDetails || {}).customerPhone || []).map((item, index) => {
                                        return (
                                            <View style={[{flexDirection: 'row'}, index !== 0 && {marginTop: scaleSize(16)}]} key={index}>
                                                <Text style={styles.titleText}>{item || ''}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </Item>

                        {visitData.reportDetails && visitData.reportDetails.templateItems && visitData.reportDetails.templateItems.length > 0 &&
                        visitData.reportDetails.templateItems.map((item) => (
                            <Item title={item.name + '：'} baseContent={item.value}/>
                        ))}

                    </Container>

                </View>
            </BaseContainer>
        )
    }
}

const mapStateToProps = ({config, user}) => {
    return {config, user}
}

export default connect(mapStateToProps)(VisitDetail);
