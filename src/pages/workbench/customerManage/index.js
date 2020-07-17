/**
 * 客户管理列表
 * created by join_lu 2019-08-27
 *  */
import React, {Component} from 'react';
import BaseContainer from '../../../components/Page'
import {scaleSize, deviceHeight, deviceWidth} from '../../../utils/screenUtil'
import ScrollableTabView from '@new-space/react-native-scrollable-tab-view'
import CusList from './cusList/index'
import WechatList from './wechatList/index'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    Modal,
    TouchableWithoutFeedback,
    DeviceEventEmitter,
    ImageBackground,
} from 'react-native'
import {connect} from 'react-redux'
import ApiCustom from '../../../services/customManager';
import {Toast} from '@new-space/teaset'
import SearchModal from './cusSearchItem/index'
import storage from '../../../utils/storage'
import {STORAGE_KEY} from '@/constants'


const sortList = [
    {value: 1, label: '购买意向降序'},
    {value: 2, label: '创建时间降序'},
    {value: 3, label: '真实用户降序'},
]

const SEARCH = require('../../../images/icons/searchCus.png')
const ADDCUS = require('../../../images/icons/addCus.png')
const SORT = require('../../../images/icons/sort.png')
const SORTACT = require('../../../images/icons/sortAct.png')
const GUIDE_MAX = require('../../../images/pictures/customer_guide_max.png')
const GUIDE = require('../../../images/pictures/customer_guide.png')


const styles = StyleSheet.create({
    searchView: {
        width: scaleSize(686),
        height: scaleSize(64),
        backgroundColor: '#EFEFEF',
        borderRadius: scaleSize(32),
        marginLeft: scaleSize(32),
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    searchImg: {
        width: scaleSize(30),
        height: scaleSize(30)
    },
    text: {
        fontSize: scaleSize(28),
        color: '#CBCBCB'
    },
    addImg: {
        width: scaleSize(39),
        height: scaleSize(39),
        marginRight: scaleSize(20)
    },
    searchRight: {
        height: scaleSize(88),
        width: scaleSize(250),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        top: scaleSize(82),
        right: scaleSize(0)
    },
    sortText: {
        color: '#868686',
        fontSize: scaleSize(28),
        // marginLeft: scaleSize(44)
    }
})

class CustomerList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            choose: false,
            modalVisible: false,     //遮罩层显示设置
            loading: true,
            customerList: [],
            wechatList: [],
            // cusTotalcount: 0,
            wechatCount: 0,
            pageIndex: 0,
            pageSize: 30,
            searchGUIDECriteria: '',   //搜索条件
            orderType: 0,   // 排序选择
            selectCode: 0,
            selectText: '',
            activeSelect: true,
            customerType: 0,
            initError: false,
            cusCount: 0,
            fromwe: false,
        }
    }

    componentDidMount() {
        this.isFirstIn()
        setTimeout(() => {
            this.getWechatCount()
            // this.getCusList()
        })
    }

    // componentWillUnmount() {
    //     this.addCustomer.remove()
    // }

    // 获取微信数量
    getWechatCount = async () => {
        let {api} = this.props.config.requestUrl
        let params = {
            pageIndex: 0,
            pageSize: 30,
            customerType: 1
        }
        try {
            let res = await ApiCustom.cusList(api, params)
            if (res) {
                this.setState({
                    wechatCount: res.totalCount
                })
            } else {
                Toast.message('获取微信数量失败')
            }
        } catch (e) {
            Toast.message('获取微信数量失败')
        }
    }


    // 获取客户列表
    getCusList = async (index) => {
        let {api} = this.props.config.requestUrl
        let {pageIndex, pageSize, searchCriteria, orderType, customerType, buildingTreeId} = this.state
        if (index === 0) {
            pageIndex = index
        }
        let params = {
            pageIndex,
            pageSize,
            searchCriteria,
            orderType,
            customerType,
            buildingTreeId: buildingTreeId || this.props.global.buildingTreeId
        }
        try {
            let res = await ApiCustom.cusList(api, params);
            if (res.code === '0') {
                let data = (res.extension || [])
                let list = []
                let wechatList = []
                data.map((item) => {
                    if (item.customerType === 0) {
                        list.push(item)
                    } else {
                        wechatList.push(item)
                    }
                })
                this.setState({
                    CustomerList: list,
                    wechatList,
                    loading: false,
                    cusCount: list.length,
                    wechatCount: wechatList.length,
                    initError: false
                })
            } else {
                Toast.message('获取客户列表失败')
                this.setState({initError: true})
            }
        } catch (e) {
            this.setState({initError: true})
            Toast.message('获取客户列表失败')
        }
    }

    isFirstIn = async () => {
        const {userInfo = {}} = this.props.user;
        const result = await storage.get(STORAGE_KEY.FIRST_IN_CUSTOMERMANAGER).catch(() => {
            this.setState({
                modalVisible: true
            })
            storage.set(STORAGE_KEY.FIRST_IN_CUSTOMERMANAGER, {[userInfo.id]: '0'})
        });
        if (result && result[userInfo.id] !== '0') {
            this.setState({
                modalVisible: true
            })
            await storage.set(STORAGE_KEY.FIRST_IN_CUSTOMERMANAGER, {
                ...result,
                [userInfo.id]: '0'
            })
        }
    }


    setModalVisble = () => {
        this.setState({
            modalVisible: false
        })
    }

    chooseSort = () => {
        this.props.sendPoint.add({target: '排序方式选择_button', page: '工作台-客户管理'})
        this.setState({
            choose: !this.state.choose
        })
    }

    gotoAddCustom = () => {
        this.props.sendPoint.add({target: '新增客户_button', page: '工作台-客户管理'})
        this.props.navigation.navigate('addCustom')
    }

    gotoCusSearch = () => {
        let {orderType, customerType} = this.state
        this.props.navigation.navigate('cusSearch', {orderType: orderType, customerType: customerType})
    }

    getLabelVa = ({name}, count) => {
        if (name.includes('客户列表')) {
            this.setState({
                customerType: 0,
                // activeSelect: true,
                selectCode: 0,
                cusCount: count
            })
        } else {
            this.setState({
                customerType: 1,
                // activeSelect: true,
                selectCode: 0,
                wechatCount: count
            })
        }
    }

    // 上拉加载
    // getMoreData = async () => {
    //     let { cusTotalcount, pageIndex, pageSize } = this.state
    //     if (cusTotalcount)
    // }

    selectSort = (item) => {
        this.setState({
            selectCode: item.value,
            selectText: item.label,
            activeSelect: item.isSelet,
            orderType: item.value,
            buildingTreeId: ((this.props || {}).global || {}).buildingTreeId,
        }, () => {
            // this.getCusList(0)
            let params = {
                buildingTreeId: this.state.buildingTreeId,
                orderType: this.state.orderType
            }
            if (this.state.customerType === 0) {
                DeviceEventEmitter.emit('selectSore', params)
            } else {
                DeviceEventEmitter.emit('selectWechatSore', params)
            }

        })
    }

    onChangeTab = (obj) => {
        if (obj) {
            if (this.state.customerType === 0) {
                this.setState({
                    customerType: 1,
                    activeSelect: true
                })
            } else {
                this.setState({
                    customerType: 0,
                    activeSelect: true
                })
            }

        }
    }

    render() {
        let {choose, orderType, customerList, wechatList, selectCode, selectText, activeSelect, initError} = this.state;
        return (
            <BaseContainer
                title='客户管理'
                scroll={false}
                contentBgColor={'#F8F8F8'}
                bodyStyle={{padding: 0}}
                error={{
                    isError: initError,
                    onErrorPress: () => this.getCusList(0)
                }}
                rightView={
                    <TouchableOpacity onPress={() => this.gotoAddCustom()}>
                        <Image source={ADDCUS} style={styles.addImg}/>
                    </TouchableOpacity>
                }
            >
                <View style={{paddingBottom: scaleSize(20)}}>
                    <TouchableOpacity style={styles.searchView} onPress={this.gotoCusSearch}>
                        <Image source={SEARCH} style={[styles.searchImg, {marginLeft: scaleSize(24)}]}/>
                        <Text style={styles.text}>输入客户手机号/ 姓名</Text>
                    </TouchableOpacity>
                </View>
                <ScrollableTabView
                    locked={true}
                    // initialPage={0}
                    tabBarTextStyle={{fontSize: scaleSize(28), fontWeight: '400', marginTop: scaleSize(15)}}
                    tabBarUnderlineStyle={{backgroundColor: '#1F3070', height: scaleSize(5), width: scaleSize(55)}}
                    tabBarActiveTextColor='#1F3070'
                    tabBarInactiveTextColor='#868686'
                    tabBarBackgroundColor='#FFFFFF'
                    tabBarStyle={{height: scaleSize(88), width: scaleSize(500), backgroundColor: '#FFFFFF'}}
                    onChangeTab={(obj) => this.onChangeTab(obj)}
                >
                    <CusList data-value={{name: `客户列表(${this.state.cusCount})`}} navigation={this.props.navigation} orderType={orderType} getLabel={this.getLabelVa}
                             customerList={customerList}/>
                    <WechatList data-value={{name: `微信获客表(${this.state.wechatCount})`}} wechatList={wechatList} navigation={this.props.navigation}
                                getLabel={this.getLabelVa}/>

                </ScrollableTabView>


                <TouchableOpacity style={styles.searchRight} onPress={this.chooseSort}>
                    <View style={{height: scaleSize(33), width: scaleSize(2), backgroundColor: '#CBCBCB'}}></View>
                    <View style={{width: scaleSize(200), display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={[styles.sortText, {color: !activeSelect ? '#1F3070' : '#868686'}]}>{!activeSelect ? selectText : '选择排序'}</Text>
                    </View>
                    <Image source={!activeSelect ? SORTACT : SORT} style={[styles.searchImg]}/>
                </TouchableOpacity>
                <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <TouchableWithoutFeedback onPress={this.setModalVisble}>
                        <ImageBackground source={deviceHeight / deviceWidth >= 2 ? GUIDE_MAX : GUIDE}
                                         style={{width: deviceWidth, height: deviceHeight}}/>
                    </TouchableWithoutFeedback>
                </Modal>

                <SearchModal
                    visible={choose}
                    onClose={this.chooseSort}
                    data={sortList}
                    onChange={this.selectSort}
                    selectCode={selectCode}
                />

            </BaseContainer>

        )
    }
}

const mapStateToProps = ({config, user, point, global}) => {
    return {config, user, sendPoint: point.buryingPoint, global}
}

export default connect(mapStateToProps)(CustomerList)

