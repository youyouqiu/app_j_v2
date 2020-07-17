import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, ImageBackground, ScrollView, Linking, TouchableOpacity} from 'react-native'
import {deviceWidth, scaleSize} from '../../../../../utils/screenUtil';
import {connect} from 'react-redux'
import ApiCustom from '../../../../../services/customManager'
import {Toast} from '@new-space/teaset'
import Progress from './progress'
import LinearGradient from 'react-native-linear-gradient'
import {currCustomerInfoParam} from '../../../report/types/addReport';
import {customerNameSubstring, verifyUser} from '@/utils/utils';
import CustomerDetailSkeleton from '@/components/skeleton/components/CustomerDetailSkeleton';

const HEADIMG = require('../../../../../images/pictures/head.png')
const WHITE = require('../../../../../images/icons/write.png')
const AREA = require('../../../../../images/pictures/area.png')
const BUDGET = require('../../../../../images/pictures/budget.png')
const REGION = require('../../../../../images/pictures/region.png')
const otherManImage = require('../../../../../images/pictures/manInfo.png')
const otherWomenImage = require('../../../../../images/pictures/womenInfo.png')
const NOINFO = require('../../../../../images/pictures/noInfo.png')


const styles = StyleSheet.create({
    Detail: {
        width: '100%',
        height: scaleSize(188),
        marginTop: scaleSize(24),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    leftDetail: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: scaleSize(32)
    },
    headImg: {
        width: scaleSize(100),
        height: scaleSize(100),
        borderRadius: scaleSize(50),
        marginRight: scaleSize(15),
    },
    infoView: {
        display: 'flex',
        flexDirection: 'column',
        // marginLeft: scaleSize(16)
    },
    blodTextBase: {
        color: '#000000',
        fontWeight: '500',
        fontSize: scaleSize(32)
    },
    rightDetail: {
        width: scaleSize(175),
        height: scaleSize(72),
        backgroundColor: '#1F3070',
        borderRadius: scaleSize(8),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: scaleSize(32)
    },
    allInfo: {
        color: '#FFFFFF',
        fontSize: scaleSize(24)
    },
    whiteImg: {
        width: scaleSize(30),
        height: scaleSize(30)
    },
    basicInfo: {
        marginTop: scaleSize(24),
        width: '100%',
        height: scaleSize(232),
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column'
    },
    basicTitle: {
        color: '#000000',
        fontSize: scaleSize(28),
        fontWeight: '600',
        marginTop: scaleSize(32),
        marginLeft: scaleSize(32)
    },
    strengthImg: {
        width: scaleSize(35),
        height: scaleSize(40),
        marginLeft: scaleSize(32)
    },
    strengthView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: scaleSize(40),
        marginLeft: scaleSize(32),
        marginTop: scaleSize(24)
    },
    cusText: {
        color: '#868686',
        fontSize: scaleSize(28)
    },
    buyExpect: {
        height: scaleSize(264),
        width: '100%',
        backgroundColor: '#FFFFFF',
        marginTop: scaleSize(24),
        display: 'flex',
        flexDirection: 'column',
    },
    buyTitle: {
        color: '#000000',
        fontSize: scaleSize(28),
        fontWeight: '600',
        marginTop: scaleSize(32),
        marginLeft: scaleSize(32)
    },
    content: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: scaleSize(132),
        paddingHorizontal: scaleSize(10),
        marginTop: scaleSize(28),
    },
    recImg: {
        width: scaleSize(218),
        height: scaleSize(132)
    },
    areaText: {
        marginLeft: scaleSize(24),
        marginTop: scaleSize(19),
        color: '#FFFFFF',
        fontSize: scaleSize(24)
    },
    bottomText: {
        marginLeft: scaleSize(24),
        marginTop: scaleSize(15),
        color: '#FFFFFF',
        fontSize: scaleSize(32),
        fontWeight: '600'
    },
    timeAxis: {
        width: '100%',
        height: scaleSize(118),
        backgroundColor: '#FFFFFF',
        marginTop: scaleSize(16),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    otherInfo: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        marginTop: scaleSize(24),
        paddingBottom: scaleSize(108 + 2 * 40),
    },
    titleView: {
        height: scaleSize(116)
    },
    otherText: {
        marginLeft: scaleSize(32),
        marginTop: scaleSize(32),
        color: '#000000',
        fontSize: scaleSize(28),
        fontWeight: '600',
    },
    otherImg: {
        height: scaleSize(390),
        width: scaleSize(750),
    },
    infoText: {
        color: '#868686',
        fontSize: scaleSize(28),
        fontWeight: '400'
    },
    otherInfoView: {
        display: 'flex',
        flexDirection: 'row',
        width: deviceWidth,
        position: 'relative',
    },
    markView: {
        marginTop: scaleSize(55),
        marginHorizontal: scaleSize(30),
        width: scaleSize(686),
        paddingVertical: scaleSize(24),
        paddingLeft: scaleSize(16),
        paddingRight: scaleSize(32),
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    reportCus: {
        width: scaleSize(686),
        height: scaleSize(108),
        marginLeft: scaleSize(30),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1F3070',
        borderRadius: scaleSize(8),
    },
    footer: {
        position: 'absolute',
        bottom: scaleSize(0),
        height: scaleSize(140),
        backgroundColor: '#fff',
        justifyContent: 'flex-end'
    },
    reportCusText: {
        color: '#FFFFFF',
        fontSize: scaleSize(32)
    },
    gradeText: {
        color: '#000000',
        fontSize: scaleSize(28),
        fontWeight: '500',
        marginLeft: scaleSize(32)
    },
    noInfoView: {
        width: '100%',
        height: scaleSize(350),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noInfoImg: {
        width: deviceWidth,
        height: deviceWidth * 247 / 750
    },
    phoneView: {
        width: '100%',
        height: scaleSize(110),
        borderTopWidth: 1,
        borderTopColor: '#EAEAEA',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF'
    },
    phoneWarp: {
        width: scaleSize(175),
        height: scaleSize(55),
        borderWidth: scaleSize(2),
        borderColor: 'rgba(75,106,197,1)',
        borderRadius: scaleSize(8),
    },
    topRight: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topImg: {
        width: scaleSize(30),
        height: scaleSize(30),
        marginRight: scaleSize(8),
    },
    linearGradient: {
        width: scaleSize(78),
        height: scaleSize(36),
        borderRadius: scaleSize(18),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scaleSize(11)
    },
})

const gradeTextObj = {
    1: {text: 'A'},
    2: {text: 'B+'},
    3: {text: 'B'},
    4: {text: 'C'},
    5: {text: 'D'}
}

class CustomInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataInfo: {},
            showDel: true
        }
    }

    componentDidMount() {
        this.getCusInfo()
    }

    // 获取详情
    getCusInfo = async () => {
        let paramsObj = (((this.props.navigation || {}).state || {}).params || {})

        // id是交叉的
        let id = ''
        if (paramsObj.fromWechat) {
            id = paramsObj.relationCustomerId || ''
        } else {
            id = paramsObj.id || ''
        }
        let {api} = this.props.config.requestUrl
        let params = {
            customerId: id,
            buildingTreeId: ''
        }
        try {
            let res = await ApiCustom.cusDetail(api, params);
            if (res.code === '0') {
                let dataInfo = res.extension || {};
                this.setState({
                    dataInfo
                })
            } else {
                Toast.message('获取客户详情失败')
            }
        } catch (e) {
            Toast.message('获取客户详情失败')
        }
    }

    //报备
    gotoAddReport = async () => {
        try {
            await verifyUser('stronge', '', <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Text>您还未完善报备需要的个人信息</Text>
                <Text>(姓名、经纪公司)</Text>
            </View>, true)
            const dataInfo = this.state.dataInfo;
            let customerPhones = dataInfo.customerPhones || []
            let phones = [];
            customerPhones.map((item, index) => {
                phones.push({
                    phoneId: item.id,
                    phoneNumber: item.phone,
                    isMain: index === 0
                })
            });

            /*let _q = new selectCustomerInfoParam();
            _q.phones = dataArr;
            _q.customerName = dataInfo.customerName;
            _q.customerId = dataInfo.id;
            _q.sex = dataInfo.sex;*/
            let _q = new currCustomerInfoParam();
            _q.customerId = dataInfo.id;
            _q.isChooseCus = true;
            _q.phones = phones;
            _q.customerName = dataInfo.customerName;
            _q.sex = dataInfo.sex ? 1 : 0;
            this.props.navigation.navigate('addReport', {customerInfo: _q})
        } catch (e) {

        }

    }

    // 完善资料
    improveData = async () => {
        let {dataInfo} = this.state
        this.props.navigation.navigate('addCustom', {id: dataInfo.id, isEdit: true})
    }

    // 拨打电话
    callPhone = async (phone) => {
        Linking.openURL(`tel: ${phone}`)
    };


    render() {
        let {dataInfo} = this.state
        let customerPhones = dataInfo.customerPhones || []
        let fullName = dataInfo.areaFullName || ''
        let areaFullName = ''
        //范围显示 相等时只显示一个
        const {sumArea, maxSumArea, sumBudget, maxSumBudget} = dataInfo
        let area = sumArea === maxSumArea ? sumArea : sumArea + (sumArea && maxSumArea && '~') + maxSumArea
        let budget = sumBudget === maxSumBudget ? sumBudget : sumBudget + (sumBudget && maxSumBudget && '~') + maxSumBudget

        if (fullName) {
            areaFullName = fullName.substring(fullName.lastIndexOf('-') + 1)
        } else {
            areaFullName = '暂无数据'
        }

        let portrait = dataInfo.portrait || {}
        let regPhone = /^1[3-9]{1}[\d]{9}$/;
        return (
            <>
                {Object.keys(this.state.dataInfo).length > 0 ?(
                    <View>
                        <ScrollView loading={false}>
                            {/* 跟进进程 */}
                            <Progress id={dataInfo.id} navigation={this.props.navigation}/>

                            <View style={styles.Detail}>
                                <View style={styles.leftDetail}>
                                    {
                                        dataInfo.isRelationCustomerId ?
                                            <Image source={dataInfo.headImg ? {uri: dataInfo.headImg} : HEADIMG} style={styles.headImg}/> : null
                                    }

                                    <View style={styles.infoView}>
                                        <Text style={styles.blodTextBase}>{customerNameSubstring(dataInfo.customerName, 7) || '暂无数据'}</Text>
                                    </View>
                                </View>
                                <View>
                                    <TouchableOpacity style={styles.rightDetail} onPress={() => this.improveData()}>
                                        <Image source={WHITE} style={styles.whiteImg}/>
                                        <Text style={styles.allInfo}>完善资料</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {
                                customerPhones.length > 0 ?
                                    customerPhones.slice(0, 3).map((item, index) => {
                                        return (
                                            <View key={index} style={styles.phoneView}>
                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <Text style={[styles.blodTextBase, {marginLeft: scaleSize(32)}]}>
                                                        {index === 0 ? '主 ：' + item.phone : item.phone}
                                                    </Text>
                                                    {
                                                        item.hasRepeatPhone &&
                                                        <LinearGradient colors={['#FF8A6B', '#FE5139']} style={styles.linearGradient}>
                                                            <Text style={{color: '#fff', fontSize: scaleSize(24)}}>重复</Text>
                                                        </LinearGradient>
                                                    }
                                                </View>
                                                {
                                                    regPhone.test(item.phone) ?
                                                        <TouchableOpacity
                                                            activeOpacity={0.8}
                                                            style={[styles.phoneWarp, styles.topRight, {marginRight: scaleSize(32)}]}
                                                            onPress={() => {
                                                                this.callPhone(item.phone || '')
                                                            }}
                                                        >
                                                            <Image
                                                                style={styles.topImg}
                                                                source={require('../../../../../images/icons/phone2.png')}
                                                                alt='图标'
                                                            />
                                                            <Text style={{fontSize: scaleSize(24), color: 'rgba(75,106,197,1)'}}>拨打电话</Text>
                                                        </TouchableOpacity> : null
                                                }

                                            </View>
                                        )
                                    }) : null
                            }
                            <View style={styles.basicInfo}>
                                <Text style={styles.basicTitle}>基本信息</Text>
                                <View style={styles.strengthView}>
                                    <Text style={styles.cusText}>客户强度</Text>
                                    <Text style={styles.gradeText}>{(gradeTextObj[dataInfo.grade] || {}).text || '暂无数据'}</Text>
                                </View>
                                <View style={[styles.strengthView, {marginTop: scaleSize(16)}]}>
                                    <Text style={styles.cusText}>现居地址</Text>
                                    <Text style={[styles.cusText, {color: '#000000', marginLeft: scaleSize(32)}]}>{(dataInfo.portrait || {}).address || '暂无数据'}</Text>
                                </View>
                            </View>
                            <View style={styles.buyExpect}>
                                <Text style={styles.buyTitle}>购买期望</Text>
                                <View style={styles.content}>
                                    <ImageBackground source={REGION} style={styles.recImg}>
                                        <Text style={styles.areaText}>区域</Text>
                                        <Text style={styles.bottomText}>{areaFullName || '暂无数据'}</Text>
                                    </ImageBackground>
                                    <ImageBackground source={AREA} style={styles.recImg}>
                                        <Text style={styles.areaText}>面积</Text>
                                        <Text style={styles.bottomText} ref={ref => this.area = ref} onPress={this.AA}>{area ? area + '㎡' : '暂无数据'}</Text>
                                    </ImageBackground>
                                    <ImageBackground source={BUDGET} style={styles.recImg}>
                                        <Text style={styles.areaText}>预算</Text>
                                        <Text style={styles.bottomText}>{budget ? budget + '万' : '暂无数据'}</Text>
                                    </ImageBackground>
                                </View>
                            </View>
                            <View style={styles.otherInfo}>
                                <View style={styles.titleView}>
                                    <Text style={styles.otherText}>其他信息</Text>
                                </View>
                                {
                                    portrait.age || portrait.address || portrait.buildingCategory || portrait.matching || portrait.direction || portrait.homePurchaseTarget ?
                                        <>
                                            <ImageBackground source={dataInfo.sex ? otherManImage : otherWomenImage} style={styles.otherImg}>
                                            </ImageBackground>
                                            <Text style={[styles.infoText, {
                                                position: 'absolute',
                                                left: scaleSize(374),
                                                top: scaleSize(110)
                                            }]}>{portrait.address || '暂无数据'}</Text>
                                            <Text style={[styles.infoText, {position: 'absolute', left: scaleSize(124), top: scaleSize(178)}]}>
                                                {portrait.matching ?
                                                    portrait.matching.split(',').length > 2 ?
                                                        portrait.matching.split(',').slice(0, 2).join(',') + '...'
                                                        : portrait.matching
                                                    : '暂无数据'}
                                            </Text>
                                            <Text style={[styles.infoText, {
                                                position: 'absolute',
                                                left: scaleSize(533),
                                                top: scaleSize(178)
                                            }]}>{portrait.age || '暂无数据'}</Text>
                                            <Text style={[styles.infoText, {
                                                position: 'absolute',
                                                left: scaleSize(76),
                                                top: scaleSize(359)
                                            }]}>{portrait.direction || '暂无数据'}</Text>
                                            <Text style={[styles.infoText, {
                                                position: 'absolute',
                                                left: scaleSize(555),
                                                top: scaleSize(359)
                                            }]}>{portrait.homePurchaseTarget || '暂无数据'}</Text>
                                            <Text style={[styles.infoText, {
                                                position: 'absolute',
                                                left: scaleSize(411),
                                                top: scaleSize(449)
                                            }]}>{portrait.buildingCategory || '暂无数据'}</Text>
                                        </>
                                        :
                                        <View style={styles.noInfoView}>
                                            <Image source={NOINFO} style={styles.noInfoImg}/>
                                            <Text style={{color: '#868686', fontSize: scaleSize(28), marginTop: scaleSize(24)}}>抱歉，您未录入用户数据</Text>
                                        </View>

                                }
                                <View style={styles.markView}>
                                    <Text style={styles.infoText}>备注：</Text>
                                    <Text style={[styles.infoText, {color: '#000000', width: '90%'}]}>{dataInfo.mark || '暂无备注'}</Text>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.reportCus} onPress={() => this.gotoAddReport()}>
                                <Text style={styles.reportCusText}>报备客户</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ):<CustomerDetailSkeleton/>}
            </>
        )
    }
}

const mapStateToProps = ({config, user}) => {
    return {config, user}
}

export default connect(mapStateToProps)(CustomInfo)
