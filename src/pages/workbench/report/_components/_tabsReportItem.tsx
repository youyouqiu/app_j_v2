import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient'; // 渐变
import { scaleSize } from '../../../../utils/screenUtil';
import { STYLE } from '../style';

interface propsTypes {
    reportData: any
    totalCount: any
    gotoSelectInfo: any
    callPhone: any
    tabsItem: any
    contentList: any
    config: any
    user: any
    sendPoint: any
};

interface contentListTypes {
    id: string
    buildingId: string
    buildingTreeId: string
    reportNumber: string
    visitStatus: number
    reportTime: string
    beltLookTime: string
    visitTime: string
    buildingFullName: string
    buildingType: string
    customerName: string
    customerPhoneList: any
    customerSex: number
    grade: number
    reportValidityTime: string
    beltLookValidityNumber: string
    userId: string
    userTrueName: string
    userDeptName: string
    userPhoneNumber: string
    userCompanyId: string
    userCompanyName: string
    userCompanyShortName: string
    interiorRepetition: boolean
    type: number
};

class TabsReportItem extends Component<propsTypes & NavigationScreenProps> {
    constructor(props: any) {
        super(props);
    };
    
    state = {
        contentList: {} as contentListTypes,
        validEndDay: '',
        reportTime: '',
        validDay: '',
        validHour: '',
    }

    componentDidMount() {}

    componentWillReceiveProps(newProps: any) {
        if (((newProps || {}).contentList || {}).id) {
            this.setState({
                contentList: newProps.contentList,
            }, () => {
                this.tabItemComponent();
            })
        }
    }

    // 报备数据处理
    tabItemComponent = () => {
        const { contentList } = this.state;
        let reportYear = moment(contentList.reportTime).format('YYYY');
        let nowReportYear = moment().format('YYYY');
        let validEndDay = '';
        let reportTime = '';
        let validDay = '';
        let validHour = '';
        if (contentList.reportValidityTime === '永久') {
            validDay = '永久';
        } else {
            validEndDay = moment(contentList.reportValidityTime).format('DD');
            validDay = moment(contentList.reportValidityTime).format('MM-DD');
            validHour = moment(contentList.reportValidityTime).format('HH:mm');
        }
        if (reportYear === nowReportYear) {
            reportTime = moment(contentList.reportTime).format('MM-DD HH:mm:ss')
        } else {
            reportTime = moment(contentList.reportTime).format('YYYY-MM-DD HH:mm:ss');
        }
        this.setState({
            validEndDay,
            reportTime,
            validDay,
            validHour,
        })
    }

    render() {
        const { contentList, validEndDay, reportTime, validDay, validHour } = this.state;
        const {gotoSelectInfo, callPhone, user} = this.props;
        let userType = ((user || {}).userInfo || {}).isResident;
        let userId = ((user || {}).userInfo || {}).id;
        let type = 1;
        let reportId = contentList.id;
        let nowValidDay = moment().format('DD');
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={STYLE.click}
                onPress={() => {gotoSelectInfo(type, reportId, contentList)}}
            >
                <View style={STYLE.warp}>
                    <View style={STYLE.top}>
                        <Text style={STYLE.topRightFont}>
                            单号：<Text>{contentList.reportNumber || ''}</Text>
                        </Text>
                        <View style={STYLE.topRight}>
                            <Image
                                style={STYLE.topImg}
                                source={require('../../../../images/icons/time2.png')}
                            />
                            <Text style={STYLE.topRightFont}>{reportTime}</Text>
                        </View>
                    </View>

                    <View style={STYLE.line}></View>

                    <View>
                        <View style={[STYLE.top, { alignItems: 'flex-start' }]}>
                            <View style={STYLE.topRight}>
                                {
                                    contentList.customerSex === 0
                                        ? <Image
                                            style={STYLE.topImg}
                                            source={require('../../../../images/icons/woman2.png')}
                                        />
                                        : <Image
                                            style={STYLE.topImg}
                                            source={require('../../../../images/icons/man2.png')}
                                        />
                                }
                                <Text style={STYLE.contentFont}>{contentList.customerName || ''}</Text>
                                {
                                    contentList.interiorRepetition
                                        ? <LinearGradient
                                            colors={['rgba(255,138,107,1)', 'rgba(254,81,57,1)']}
                                            style={STYLE.LinearGradient}
                                        >
                                            <Text style={{ color: 'rgba(255,255,255,1)', textAlign: 'center' }}>! 重</Text>
                                        </LinearGradient>
                                        : null
                                }
                            </View>
                            <View style={STYLE.contentPhones}>
                                {
                                    ((contentList || {}).customerPhoneList || []).map((item: any, index: number) => {
                                        if (index === 0) {
                                            return (
                                                <Text style={STYLE.contentFont} key={index}>{item.customerPhone || ''}</Text>
                                            )
                                        }

                                        return (
                                            <Text style={STYLE.contentPhonesFont} key={index}>{item.customerPhone || ''}</Text>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View style={[STYLE.top, { marginTop: scaleSize(16) }]}>
                            <View style={STYLE.topRight}>
                                <Text style={STYLE.buildingTypeText}>{contentList.buildingType || ''}</Text>
                                <Text
                                    style={STYLE.fontMiddle}
                                    numberOfLines={1}
                                    ellipsizeMode={'middle'}
                                >
                                    {contentList.buildingFullName || ''}
                                </Text>
                            </View>
                            {
                                contentList.reportValidityTime === '永久'
                                    ? <Text style={STYLE.topRightFont}>
                                        <Text>{validDay}</Text>有效
                                    </Text>
                                    : <Text style={STYLE.topRightFont}>
                                        {
                                            validEndDay === nowValidDay
                                                ? '今日'
                                                : validDay + ' '
                                        }
                                        <Text style={{ color: 'rgba(0,0,0,1)' }}>{validHour}</Text>前有效
                                    </Text>
                            }

                        </View>
                    </View>

                    {
                        userType && userId !== contentList.userId
                            ? <View>
                                <View style={STYLE.line}></View>

                                <View style={[STYLE.top, { alignItems: 'center' }]}>
                                    <Text
                                        style={[STYLE.fontMiddle, { width: scaleSize(420) }]}
                                        numberOfLines={1}
                                        ellipsizeMode={'middle'}
                                    >
                                        {contentList.userTrueName || '暂无数据'}<Text> | </Text>{contentList.userDeptName || '暂无数据'}
                                    </Text>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={[STYLE.phoneWarp, STYLE.topRight]}
                                        onPress={() => {
                                            callPhone(contentList.userPhoneNumber || '')
                                        }}
                                    >
                                        <Image
                                            style={STYLE.topImg}
                                            source={require('../../../../images/icons/phone2.png')}
                                        />
                                        <Text style={{ fontSize: scaleSize(24), color: 'rgba(75,106,197,1)' }}>拨打电话</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            : null
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

export default TabsReportItem;
