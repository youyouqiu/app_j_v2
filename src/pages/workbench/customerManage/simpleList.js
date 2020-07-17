import React, {Component} from 'react';
import {FlatList, TouchableOpacity, View, Image, Text, RefreshControl, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {Toast} from '@new-space/teaset';
import ApiCustom from '../../../services/customManager';
import BaseContainer from '../../../components/Page';
import NoData from '../../../businessComponents/noData'
import {clStyle as styles} from './style/clStyle'
import {debounce} from "@/utils/utils";

const MAN = require('../../../images/icons/man2.png');
const WOMAN = require('../../../images/icons/woman2.png');

const gradeTextObj = {
    1: {text: 'A'},
    2: {text: 'B+'},
    3: {text: 'B'},
    4: {text: 'C'},
    5: {text: 'D'}
};

class ReCusList extends Component {

    pageData = {
        pageSize: 30,
        pageIndex: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            orderType: 0,
            searchCriteria: '',
            customerList: [],
            refreshing: false,
            hasMore: true,
            showEmptyComponent: false
        }
    }

    componentDidMount() {
        this.getCusList();
    }

    getCusList = async () => {
        let {api} = this.props.config.requestUrl;
        let {searchCriteria, orderType} = this.state;
        const {pageIndex, pageSize} = this.pageData;
        let params = {
            pageIndex,
            pageSize,
            searchCriteria,
            orderType,
            customerType: 0
        };
        try {
            let res = await ApiCustom.cusList(api, params);
            if (res && res.code === '0') {
                const {pageSize, extension = [], totalCount, pageIndex} = res;
                this.setState(prev => ({
                    customerList: [...prev.customerList, ...extension],
                    totalCount: res.totalCount,
                    refreshing: false,
                    showEmptyComponent: [...prev.customerList, ...extension].length === 0,
                    hasMore: pageSize * (pageIndex + 1) < totalCount
                }))
            } else {
                Toast.message('获取客户列表失败' + res.message || '');
                this.setState({refreshing: false})
            }
        } catch (e) {
            this.setState({refreshing: false});
            Toast.message('获取客户列表失败');
        }
    };

    _onEndReached = async () => {
        let {pageIndex, refreshing, hasMore} = this.state;
        if (refreshing || !hasMore) return;
        this.pageData.pageIndex++;
        debounce(() => {
            this.getCusList(pageIndex)
        }, 500)()
    };

    _onRefresh = () => {
        this.pageData.pageIndex = 0;
        this.setState({
            refreshing: true,
            customerList: []
        }, () => {
            this.getCusList()
        })
    };

    onCustomerData = (item) => {
        let phones = [];
        (item.phones || []).forEach((item, index) => {
            phones.push({
                phoneId: item.id,
                phoneNumber: item.phone,
                isMain: index === 0
            })
        });
        let selectCustomerInfo = {
            customerName: item.customerName,
            customerId: item.id,
            sex: item.sex ? 1 : 0,
            isChooseCus: true,
            phones: phones
        };
        let {navigation} = this.props;
        setTimeout(() => {
            ((navigation || {}).state || {}).params(selectCustomerInfo);
            navigation.navigate('addReport');
        }, 380)
    };

    _renderItems = ({item}) => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.onCustomerData(item)}>
                <View style={styles.cusDetail}>
                    <View style={styles.leftView}>
                        <View style={styles.nameView}>
                            <Image source={item.sex ? MAN : WOMAN} style={styles.img} alt='图标'/>
                            <Text style={styles.nameText}>{item.customerName || ''}</Text>
                            <Text>{(gradeTextObj[item.grade] || {}).text || ''}</Text>
                        </View>
                        <View style={styles.phoneView}>
                            <Text style={styles.phone}>{item.mainPhone || ''}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    _listFooterComponent = () => {
        const {hasMore, showEmptyComponent, refreshing} = this.state;
        if (showEmptyComponent || refreshing) return null;
        if (hasMore) {
            return <ActivityIndicator style={styles.moreLoading}/>
        } else {
            return <Text style={styles.more}>~没有更多了</Text>
        }
    };

    render() {
        let {customerList, refreshing, showEmptyComponent} = this.state;
        return (
            <BaseContainer title='客户列表'
                           scroll={false}
                           bodyStyle={{padding: 0}}>
                <FlatList extraData={this.state}
                          keyExtractor={item => item.id}
                          renderItem={this._renderItems}
                          data={customerList}
                          onEndReached={this._onEndReached}
                          onEndReachedThreshold={0.1}
                          refreshing={refreshing}
                          onRefresh={this._onRefresh}
                          ListEmptyComponent={showEmptyComponent ? <NoData tips='抱歉，暂时没有客户'/> : null}
                          ListFooterComponent={this._listFooterComponent}/>
            </BaseContainer>
        )
    }
}

const mapStateToProps = ({config, user}) => {
    return {config, user}
};

export default connect(mapStateToProps)(ReCusList);
