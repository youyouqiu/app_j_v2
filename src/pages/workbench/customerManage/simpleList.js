import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, Image, Text, StyleSheet, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Toast } from 'teaset';

// 工具
import { scaleSize } from '../../../utils/screenUtil';
import ApiCustom from '../../../services/customManager';

// 组件
import BaseContainer from '../../../components/Page';
import NoData from '../../../businessComponents/noData'

const styles = StyleSheet.create({
    cusDetail: {
        height: scaleSize(165),
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,
        borderTopColor: '#EAEAEA',
        borderTopWidth: 1,
        backgroundColor: '#FFFFFF',
    },
    leftView: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: scaleSize(32)
    },
    nameView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    img: {
        width: scaleSize(30),
        height: scaleSize(30)
    },
    nameText: {
        color: '#000000',
        fontSize: scaleSize(32),
    },
    manView: {
        height: scaleSize(45),
        borderRadius: scaleSize(8),
        borderWidth: 1,
        borderColor: '#CBCBCB',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    grade: {
        width: scaleSize(35),
        height: scaleSize(30),
        marginLeft: scaleSize(8)
    },
    phoneView: {
        marginTop: scaleSize(16)
    },
    phone: {
        color: '#868686',
        fontSize: scaleSize(32)
    },
    more: {
        color: '#868686',
        fontSize: scaleSize(24),
        textAlign: 'center',
        marginTop: scaleSize(30),
        marginBottom: scaleSize(30)
    }
})

const MAN = require('../../../images/icons/man2.png');
const WOMAN = require('../../../images/icons/woman2.png');

const gradeTextObj = {
    1: { text: 'A' },
    2: { text: 'B+' },
    3: { text: 'B' },
    4: { text: 'C' },
    5: { text: 'D' }
}

class ReCusList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageIndex: 0,
            pageSize: 30,
            orderType: 0,
            searchCriteria: '',
            customerList: [],
            totalCount: 0,
            refreshing: false,
            listData: []
        }
    }

    componentDidMount() {
        this.getCusList();
    }

    componentWillUnmount() {}

    getCusList = async (index) => {
        let { api } = this.props.config.requestUrl
        let { pageIndex, pageSize, searchCriteria, orderType, listData } = this.state
        if (index === 0) {
            pageIndex = index
        }
        let params = {
            pageIndex,
            pageSize,
            searchCriteria,
            orderType,
            customerType: 0
        }
        try {
            let res = await ApiCustom.cusList(api, params);

            if (res && res.code === '0') {
                let data = (res.extension || [])
                if (index) {
                    listData = listData.concat(data)
                } else {
                    listData = data
                }
                this.setState({
                    listData,
                    customerList: listData,
                    totalCount: res.totalCount,
                    refreshing: false
                })
            } else {
                Toast.message('获取客户列表失败' + res.message || '')
                this.setState({ refreshing: false })
            }
        } catch (e) {
            this.setState({ refreshing: false })
            Toast.message('获取客户列表失败');
        }
    }

    _onEndReached = async () => {
        if (this.state.refreshing) {
            return
        }
        let { totalCount, pageIndex, pageSize } = this.state
        pageIndex++
        if (totalCount / pageSize < pageIndex) {
            return
        } 
        await this.setState({ refreshing: true })
        await this.setState({ pageIndex })
        this.getCusList(pageIndex)
    }

    // 下拉刷新
    _refresh = () => {
        this.setState({
            pageIndex: 0
        }, () => {
            this.getCusList()
        })

    }

    _keyExtractor = (item) => item.id

    // 客户选择
    onCustomerData = (customerId, customerName, sex, customerPhone, phones) => {
        console.log('客户选择', customerId)

        let { navigation } = this.props;
        let selectCustomerInfo = {
            customerId,
            customerName,
            sex,
            customerPhone,
            phones
        };

        setTimeout(() => {
            ((navigation || {}).state || {}).params(selectCustomerInfo);

            this.props.navigation.navigate('addReport');
        }, 380)
    }

    _renderItems = ({ item }) => {
        return (
            <TouchableOpacity
                style={{}}
                activeOpacity={0.8}
                onPress={() => { this.onCustomerData(item.id, item.customerName, item.sex, item.mainPhone, item.phones) }}
            >
                <View style={styles.cusDetail}>
                    <View style={styles.leftView}>
                        <View style={styles.nameView}>
                            <Image
                                source={item.sex ? MAN : WOMAN}
                                style={styles.img}
                                alt='图标'
                            />
                            {/* {
                                item.isTrueCustomer
                                    ? <Text
                                        style={[styles.nameText, { color: '#000000', marginLeft: scaleSize(7), fontWeight: '500' }]}
                                    >
                                        {item.customerName || ''}
                                    </Text>
                                    : <View style={[styles.manView, {marginLeft: scaleSize(15)}]}>
                                        <Text style={[styles.nameText, {color: '#868686'}]}>{item.customerName || ''}</Text>
                                    </View>
                            } */}
                            <Text
                                style={[styles.nameText, { color: '#000000', marginLeft: scaleSize(7), fontWeight: '500' }]}
                            >
                                {item.customerName || ''}
                            </Text>
                            <Text>{(gradeTextObj[item.grade] || {}).text || ''}</Text>
                            {/* <Image
                                source={AGRADE}
                                style={styles.grade}
                                alt='图标'
                            /> */}
                        </View>
                        <View style={styles.phoneView}>
                            <Text style={styles.phone}>{item.mainPhone || ''}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        let { customerList, totalCount, pageSize, pageIndex, refreshing } = this.state;
        return (
            <BaseContainer
                title='客户列表'
                scroll={false}
                bodyStyle={{ padding: 0}}
            >
                <FlatList
                    extraData={this.state}
                    // style={{ flex: 1,backgroundColor:'red' }}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItems}
                    data={customerList}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={0.1}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={this._refresh}
                        title="Loading..."
                        />}
                    ListEmptyComponent={<NoData tips='抱歉，暂时没有客户' />}
                    ListFooterComponent={
                        (customerList.length) > 0 ? <Text style={styles.more}>{totalCount / pageSize <= pageIndex + 1 ? '~没有更多了' : '加载中'}</Text> : null
                    }
                />
            </BaseContainer>
        )
    }
}

const mapStateToProps = ({ config, user }) => {
    return { config, user }
}

export default connect(mapStateToProps)(ReCusList);
