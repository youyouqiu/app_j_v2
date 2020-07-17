import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient'; // 渐变
import {scaleSize} from '../../../../utils/screenUtil';
import {STYLE} from '../style';

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

class TabsReportItem extends Component<propsTypes & NavigationScreenProps> {
    constructor(props: any) {
        super(props);
    };

    // 报备数据处理
    tabItemComponent = (contentList: any) => {
        let reportYear = moment(contentList.reportTime).format('YYYY');
        let expectedBeltTime = contentList.expectedBeltTime ? moment(contentList.expectedBeltTime).format('YYYY-MM-DD HH:mm:ss') : null;
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
        return {
            validEndDay,
            reportTime,
            validDay,
            validHour,
            expectedBeltTime
        }
    }

    render() {
        const {gotoSelectInfo, callPhone, user, contentList} = this.props;
        let content = this.tabItemComponent(contentList);
        let userType = ((user || {}).userInfo || {}).isResident;
        let userId = ((user || {}).userInfo || {}).id;
        let type = 1;
        let reportId = contentList.id;
        let nowValidDay = moment().format('DD');
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={STYLE.click}
                onPress={() => {
                    gotoSelectInfo(type, reportId, contentList)
                }}>
                <View style={STYLE.warp}>
                    <View style={STYLE.top}>
                        <Text style={STYLE.topRightFont}>
                            单号：<Text>{contentList.reportNumber || ''}</Text>
                        </Text>
                        <View style={STYLE.topRight}>
                            <Image style={STYLE.topImg} source={require('../../../../images/icons/time2.png')}/>
                            <Text style={STYLE.topRightFont}>{content.reportTime}</Text>
                        </View>
                    </View>
                    <View style={STYLE.line}/>
                    <View>
                        <View style={[STYLE.top, {alignItems: 'flex-start'}]}>
                            <View style={STYLE.topRight}>

                                <View style={STYLE.topRight_name_wrap}>
                                    <View style={STYLE.topRight_name}>
                                        {contentList.customerSex === 0 ? (
                                            <Image style={STYLE.topImg} source={require('../../../../images/icons/woman2.png')}/>
                                        ) : (
                                            <Image style={STYLE.topImg} source={require('../../../../images/icons/man2.png')}/>
                                        )}

                                        <Text style={STYLE.contentFont}>{contentList.customerName || ''}</Text>

                                        {contentList.interiorRepetition ? (
                                            <LinearGradient colors={['rgba(255,138,107,1)', 'rgba(254,81,57,1)']} style={STYLE.LinearGradient}>
                                                <Text style={{color: '#FFFFFF', textAlign: 'center'}}>! 重</Text>
                                            </LinearGradient>
                                        ) : null}
                                    </View>

                                    {content.expectedBeltTime && (
                                        <Text style={STYLE.topRight_time}>
                                            预计到访时间：<Text style={STYLE.topRight_timeValue}>{moment(content.expectedBeltTime).format('YYYY-MM-DD HH:mm')}</Text>
                                        </Text>
                                    )}
                                </View>
                            </View>

                            <View style={STYLE.contentPhones}>
                                {((contentList || {}).customerPhoneList || []).map((item: any, index: number) => (
                                    <Text style={index === 0 ? STYLE.contentFont : STYLE.contentPhonesFont} key={index}>{item.customerPhone || ''}</Text>
                                ))}
                            </View>

                        </View>

                        <View style={[STYLE.top, {marginTop: scaleSize(16)}]}>
                            <View style={STYLE.buildingInfo}>
                                <Text style={STYLE.buildingTypeText}>{contentList.buildingType || ''}</Text>
                                <Text style={STYLE.fontMiddle} numberOfLines={1} ellipsizeMode={'middle'}>{contentList.buildingFullName || ''}</Text>
                            </View>

                            {contentList.reportValidityTime === '永久' ? (
                                <Text style={STYLE.topRightFont}>
                                    <Text>{content.validDay}</Text>有效
                                </Text>
                            ) : (<Text style={STYLE.topRightFont}>
                                    {content.validEndDay === nowValidDay ? '今日' : content.validDay + ' '}
                                    <Text style={{color: 'rgba(0,0,0,1)'}}>{content.validHour}</Text>前有效
                                </Text>
                            )}
                        </View>

                    </View>
                    {
                        userType && userId !== contentList.userId
                            ? <View>
                                <View style={STYLE.line}/>

                                <View style={[STYLE.top, {alignItems: 'center'}]}>
                                    <Text style={[STYLE.fontMiddle, {width: scaleSize(420)}]} numberOfLines={1}>
                                        {contentList.userTrueName}  {contentList.userDeptName && ('|' + contentList.userDeptName)}
                                    </Text>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={[STYLE.phoneWarp]}
                                        onPress={() => callPhone(contentList.userPhoneNumber || '')}>
                                        <Image style={STYLE.topImg} source={require('../../../../images/icons/phone2.png')}/>
                                        <Text style={{fontSize: scaleSize(24), color: '#4B6AC5'}}>拨打电话</Text>
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
