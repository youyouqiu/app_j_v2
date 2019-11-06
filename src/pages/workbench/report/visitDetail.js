import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import {connect} from 'react-redux';

// 工具
import {scaleSize} from '../../../utils/screenUtil';
import {visitDetailDataApi, buildingDetailDataApi, buildingImageDataApi, onsiteDataApi} from './../../../services/report';

// 组件
import BaseContainer from '../../../components/Page';

const BULIDINGIMG = require('../../../images/pictures/building.png');

const STYLE = StyleSheet.create({
    line: {
        width: '100%',
        height: scaleSize(24),
        backgroundColor: 'rgba(248,248,248,1)',
    },
    visitOk: {
        height: scaleSize(90),
        width: scaleSize(750),
        backgroundColor: '#3AD047',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textOk: {
        color: '#FFFFFF',
        fontSize: scaleSize(24),
        marginLeft: scaleSize(15),
    },
    okImg: {
        height: scaleSize(28),
        width: scaleSize(28),
    },
    contentView: {
        width: scaleSize(750),
        display: 'flex',
        flexDirection: 'row',
        padding: scaleSize(32),
    },
    buildingImg: {
        width: scaleSize(240),
        height: scaleSize(186),
        borderRadius: scaleSize(8),
    },
    rightContent: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: scaleSize(39),
    },
    treeName: {
        color: '#000000',
        fontSize: scaleSize(32),
        width: scaleSize(420),
    },
    adressName: {
        color: '#868686',
        fontSize: scaleSize(24),
        marginTop: scaleSize(8),
    },
    statusView: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: scaleSize(20),
    },
    statusImg: {
        height: scaleSize(30),
        width: scaleSize(30),
    },
    statusText: {
        width: scaleSize(64),
        height: scaleSize(33),
        backgroundColor: 'rgba(255,221,216,1)',
        fontSize: scaleSize(22),
        color: 'rgba(254,81,57,1)',
        lineHeight: scaleSize(33),
        borderRadius: scaleSize(2),
        textAlign: 'center',
        marginRight: scaleSize(11),
    },
    zcView: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: scaleSize(32),
        marginRight: scaleSize(32),
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: scaleSize(32),
        paddingBottom: scaleSize(29)
    },
    zcName: {
        color: '#000000',
        fontSize: scaleSize(28),
    },
    callView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: scaleSize(175),
        height: scaleSize(55),
        borderWidth: scaleSize(2),
        borderColor: 'rgba(75,106,197,1)',
        borderRadius: scaleSize(8),
    },
    phoneImg: {
        height: scaleSize(30),
        width: scaleSize(30),
    },
    phoneText: {
        color: '#4B6AC5',
        fontSize: scaleSize(24),
        marginLeft: scaleSize(8),
    },
    visitInfo: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: scaleSize(32),
        marginRight: scaleSize(32),
    },
    titleView: {
        borderBottomColor: '#EAEAEA',
        height: scaleSize(88),
        display: 'flex',
        justifyContent: 'center',
        borderBottomWidth: 1,
    },
    titleText: {
        color: '#000000',
        fontSize: scaleSize(28),
    },
    timeView: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    firstView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: '#868686',
        fontSize: scaleSize(28),
    },
    anotherText: {
        color: '#000000',
        fontSize: scaleSize(28),
        marginLeft: scaleSize(16),
    },
    sexImg: {
        height: scaleSize(30),
        width: scaleSize(30),
        marginLeft: scaleSize(16),
    },
    picView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: scaleSize(24),
    },
    insteadPic: {
        height: scaleSize(218),
        width: scaleSize(218),
        borderWidth: scaleSize(2),
        borderColor: 'rgba(234,234,234,1)',
        borderRadius: scaleSize(8),
        marginTop: scaleSize(16),
        marginRight: scaleSize(16),
    },
    reportInfo: {
        display: 'flex', 
        flexDirection: 'column',
        marginBottom: scaleSize(20),
    },
    phones: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: scaleSize(16),
    }
});

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
        console.log('到访详情接口')

        let {visitId} = this.state;
        let {api} = this.props.config.requestUrl;

        try {
            let res = await visitDetailDataApi(api, visitId.reportId || '');

            console.log(res, 'res');

            if (res && res.code === '0') {
                let data = res.extension || {};

                this.setState({
                    visitData: data,
                })
            }

        } catch(error) {
            console.log(error);
        }
    }

    // 楼盘信息接口
    buildingDetailData = async () => {
        console.log('楼盘信息接口')

        let {visitId} = this.state;
        let {api} = this.props.config.requestUrl;

        try {
            let res = await buildingDetailDataApi(api, visitId.buildingTreeId || '');

            console.log(res, 'res');

            if (res && res.code === '0') {
                let data = res.extension || {};

                this.setState({
                    buildingData: data,
                })
            }

        } catch(error) {
            console.log(error);
        }
    }

    // 楼盘封面图接口
    buildingImageData = async () => {
        console.log('楼盘封面图接口')

        let {visitId} = this.state;
        let {api} = this.props.config.requestUrl;

        try {
            let res = await buildingImageDataApi(api, visitId.buildingId || '');

            console.log(res, 'res');

            if (res && res.code === '0') {
                let data = res.extension || {};

                this.setState({
                    buildingImageData: data,
                })
            }

        } catch(error) {
            console.log(error);
        }
    }

    // 驻场信息接口
    onsiteData = async () => {
        console.log('驻场信息接口')

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

            console.log(res, 'res');

            if (res && res.code === '0') {
                let data = res.extension || {};

                this.setState({
                    onsiteData: data,
                })
            }

        } catch(error) {
            console.log(error);
        }
    }

    // 拨打电话
    callPhone = (phone) => {
        console.log('拨打电话')

        Linking.openURL(`tel:${phone}`);
    }

    render() {
        let {visitData, buildingData, buildingImageData, onsiteData} = this.state;
        let saleStatus = (buildingData || {}).saleStatus;
        let newSaleStatus = '';
        // let startTime = new Date((((visitData || {}).beltLookDeails || {}).visitTime || '').replace(/T/g, ' ').replace(/-/g, '/'));
        // let endTime = new Date((((visitData || {}).beltLookDeails || {}).validityEndDate || '').replace(/T/g, ' ').replace(/-/g, '/'));
        // let day = Math.ceil((endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60 / 24);
        let day = ((visitData || {}).beltLookDeails || {}).beltLookValidityNumber || '';

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

        default: console.log('没有default');
        }

        return (
            <BaseContainer
                title='到访详情'
                bodyStyle={{padding: 0, backgroundColor: '#fff'}}
            >
                <View style={STYLE.visitOk}>
                    <Image
                        source={require('../../../images/icons/visitOk.png')}
                        style={STYLE.okImg}
                        alt='图标'
                    />
                    <Text style={STYLE.textOk}>客户到访已确认！</Text>
                </View>

                <View>
                    <View style={STYLE.contentView}>
                        <Image
                            source={(buildingImageData || []).length > 0 ? {uri: (buildingImageData || [])[0].original} : BULIDINGIMG}
                            style={STYLE.buildingImg}
                            alt='封面'
                        />
                        <View style={STYLE.rightContent}>
                            <Text style={STYLE.treeName}>{buildingData.fullName || ''}</Text>
                            <Text style={STYLE.adressName}>
                                {((buildingData || {}).basicInfo || {}).cityName || ''}
                                -
                                {((buildingData || {}).basicInfo || {}).districtName || ''}
                                -
                                {((buildingData || {}).basicInfo || {}).areaName || ''}
                            </Text>
                            <View style={STYLE.statusView}>
                                <Text style={STYLE.statusText}>
                                    {newSaleStatus}
                                </Text>
                                <Text style={[STYLE.statusText, {backgroundColor: 'rgba(244,245,249,1)', color: 'rgba(102,115,155,1)'}]}
                                >
                                    {((buildingData || {}).basicInfo || {}).buildingType || ''}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={STYLE.line}></View>

                    <View style={STYLE.zcView}>
                        <Text style={STYLE.zcName}>
                            {((onsiteData || {})[103] || {}).trueName || ''}<Text style={{color: '#868686'}}> | {'新空间驻场'}</Text>
                        </Text>
                        <TouchableOpacity
                            style={STYLE.callView}
                            onPress={() => {this.callPhone(((onsiteData || {})[103] || {}).phoneNumber || '')}}
                            activeOpacity={0.8}
                        >
                            <Image
                                source={require('../../../images/icons/phone.png')}
                                style={STYLE.phoneImg}
                                alt='图标'
                            />
                            <Text style={STYLE.phoneText}>拨打电话</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={STYLE.line}></View>

                    <View style={STYLE.visitInfo}>
                        <View style={STYLE.titleView}>
                            <Text style={STYLE.titleText}>到访信息</Text>
                        </View>
                        <View style={STYLE.timeView}>
                            <View style={[STYLE.firstView, {justifyContent: 'space-between', marginTop: scaleSize(20)}]}>
                                <View style={STYLE.firstView}>
                                    <Text style={STYLE.text}>责任驻场：</Text>
                                    <Text style={STYLE.anotherText}>{((onsiteData || {})[103] || {}).trueName || ''}</Text>
                                </View>
                                <TouchableOpacity
                                    style={STYLE.callView}
                                    onPress={() => {this.callPhone(((onsiteData || {})[103] || {}).phoneNumber || '')}}
                                    activeOpacity={0.8}
                                >
                                    <Image
                                        source={require('../../../images/icons/phone.png')}
                                        style={STYLE.phoneImg}
                                        alt='图标'
                                    />
                                    <Text style={STYLE.phoneText}>拨打电话</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[STYLE.firstView, {marginTop: scaleSize(20)}]}>
                                <Text style={STYLE.text}>到访时间：</Text>
                                <Text style={STYLE.anotherText}>
                                    {(((visitData || {}).beltLookDeails || {}).visitTime || '').replace(/T/g, ' ')}
                                </Text>
                            </View>
                            <View style={[STYLE.firstView, {marginTop: scaleSize(20)}]}>
                                <Text style={STYLE.text}>保护期：</Text>
                                <Text style={[STYLE.anotherText, {marginLeft: scaleSize(46)}]}>{day}</Text>
                            </View>
                            <View style={[STYLE.firstView, {marginTop: scaleSize(20), alignItems: 'flex-start'}]}>
                                <Text style={STYLE.text}>客户信息：</Text>
                                <View style={{display: 'flex', flexDirection: 'column'}}>
                                    {
                                        (((visitData || {}).beltLookDeails || {}).customerList || []).map((item, index) => {
                                            return (
                                                <View style={{display: 'flex', flexDirection: 'row', marginBottom: scaleSize(16)}} key={index}>
                                                    <Text style={STYLE.anotherText}>{item.customerName || ''}</Text>
                                                    <Text style={{marginLeft: scaleSize(8)}}>{item.customerPhone || ''}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={STYLE.picView}>
                            {
                                (((visitData || {}).beltLookDeails || {}).beltLookAttach || []).length > 0
                                    ? (((visitData || {}).beltLookDeails || {}).beltLookAttach || []).map((item, index) => {
                                        return (
                                            <Image
                                                style={STYLE.insteadPic}
                                                source={{uri: item.fileUrl}}
                                                alt='照片'
                                                key={index}
                                            />
                                        )
                                    })
                                    : null
                            }
                        </View>
                    </View>

                    <View style={STYLE.line}></View>

                    <View style={STYLE.visitInfo}>
                        <View style={STYLE.titleView}>
                            <Text style={STYLE.titleText}>报备信息</Text>
                        </View>
                        <View style={STYLE.reportInfo}>
                            <View style={STYLE.phones}>
                                <Text style={STYLE.text}>单号：</Text>
                                <Text style={[STYLE.anotherText, {marginLeft: scaleSize(75)}]}>
                                    {((visitData || {}).reportDetails || {}).reportNumber || ''}
                                </Text>
                            </View>
                            <View style={STYLE.phones}>
                                <Text style={STYLE.text}>报备客户：</Text>
                                {
                                    ((visitData || {}).reportDetails || {}).customerSex === 0
                                        ? <Image
                                            style={STYLE.sexImg}
                                            source={require('./../../../images/icons/woman2.png')}
                                            alt='图标'
                                        />
                                        : <Image
                                            style={STYLE.sexImg}
                                            source={require('./../../../images/icons/man2.png')}
                                            alt='图标'
                                        />
                                }
                                <Text style={[STYLE.anotherText]}>{((visitData || {}).reportDetails || {}).customerName || ''}</Text>
                            </View>
                            <View style={STYLE.phones}>
                                <Text style={STYLE.text}>报备时间：</Text>                            
                                <Text style={[STYLE.anotherText]}>
                                    {(((visitData || {}).reportDetails || {}).reportTime || '').replace(/T/g, ' ').replace(/\.[\d]{1,6}/, '')}
                                </Text>
                            </View>
                            <View style={STYLE.phones}>
                                <Text style={STYLE.text}>联系电话：</Text>
                                <View style={{display: 'flex', flexDirection: 'column'}}>
                                    {
                                        (((visitData || {}).reportDetails || {}).customerPhone || []).map((item, index) => {
                                            return (
                                                <Text style={STYLE.anotherText} key={index}>{item || ''}</Text>
                                            )
                                        })
                                    }
                                </View>                          
                            </View>
                        </View>
                    </View>
                </View>
            </BaseContainer>
        )
    }
}

const mapStateToProps = ({config, user})=> {
    return {config, user}
}

export default connect(mapStateToProps)(VisitDetail);
