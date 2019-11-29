import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import moment from 'moment';
import { scaleSize } from '../../../../utils/screenUtil';
import { STYLE } from '../style';

interface propsTypes {
    reportData: any
    totalCount: any
    gotoSelectInfo: any
    callPhone: any
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

class TabsLapseItem extends Component<propsTypes & NavigationScreenProps> {
    constructor(props: any) {
        super(props);
    };

    // 报备数据处理
    tabItemComponent = (contentList: any) => {
        let reportYear = moment(contentList.reportTime).format('YYYY');
        let nowReportYear = moment().format('YYYY');
        let visitTime = moment(contentList.visitTime).format('YYYY-MM-DD HH:mm:ss');
        let reportTime = '';
        let grade = '';
        if (reportYear === nowReportYear) {
            reportTime = moment(contentList.reportTime).format('MM-DD HH:mm:ss')
        } else {
            reportTime = moment(contentList.reportTime).format('YYYY-MM-DD HH:mm:ss')
        }
        switch (contentList.grade) {
            case 1:
                grade = 'A';
                break;

            case 2:
                grade = 'B+';
                break;

            case 3:
                grade = 'B';
                break;

            case 4:
                grade = 'C';
                break;

            case 5:
                grade = 'D';
                break;

            default:
                console.log('没有default')
        }
        return {
            visitTime,
            reportTime,
            grade,
        }
    }

    render() {
        const { gotoSelectInfo, user, contentList } = this.props;
        let content = this.tabItemComponent(contentList);
        let userType = ((user || {}).userInfo || {}).isResident;
        let userId = ((user || {}).userInfo || {}).id;
        let type = 3;
        let invalidId = contentList.id;
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={STYLE.click}
                onPress={() => { gotoSelectInfo(type, invalidId) }}
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
                            <Text style={STYLE.topRightFont}>{content.reportTime}</Text>
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
                                <Text style={[STYLE.contentFont, { marginLeft: scaleSize(8), fontSize: scaleSize(24) }]}>{content.grade}</Text>
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
                        <View style={[STYLE.top, { marginTop: scaleSize(16), alignItems: 'center' }]}>
                            <View>
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
                                <Text style={STYLE.contentTime}>
                                    到访时间：
                                    <Text style={{ color: '#000000' }}>{content.visitTime}</Text>
                                </Text>
                            </View>
                            <View style={{}}>
                                <Image
                                    style={{ width: scaleSize(140), height: scaleSize(141) }}
                                    source={require('../../../../images/icons/shixiao2.png')}
                                />
                            </View>
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
                                    <View style={[STYLE.noPhoneWarp, STYLE.topRight]}>
                                        <Image
                                            style={STYLE.topImg}
                                            source={require('../../../../images/icons/nophone2.png')}
                                        />
                                        <Text style={{ fontSize: scaleSize(24), color: '#868686' }}>拨打电话</Text>
                                    </View>
                                </View>
                            </View>
                            : null
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

export default TabsLapseItem;
