/**
 * Created by Kary on 2019/10/22 10:22.
 */
import React, {PureComponent, ReactElement} from 'react';
import {NavigationScreenProps} from 'react-navigation';
import {connect, MapStateToProps} from 'react-redux';
import {ActivityIndicator, DeviceEventEmitter, Image, Text, TouchableOpacity, View, FlatList} from 'react-native';
import Page from '../../../components/Page';
import styles from './css';
import ScrollableTabView, {DefaultTabBar} from '@new-space/react-native-scrollable-tab-view';
import {equal_types, keyLabelParam} from "../../../utils/calculate";
import SwitchView from "../../../components/SwitchView";
import {scaleSize} from "../../../utils/screenUtil";
import {detail_Type} from "../../../utils/calculate/calculate";
const SwitchViewItem = SwitchView.Item;

interface routeParam {
    detail: detail_Type;
    loan_type: string;
}

class CalculateDetail extends PureComponent <propsTypes & NavigationScreenProps>{
    constructor(props: any) {
        super(props)
    }
    state = {
        table: [[],[]]
    };
    routeParameter: routeParam = (this.props.navigation.state.params as routeParam); // 路由参数
    componentDidMount () {
        this._getTableVal()
    };
    _onChangeTab = () => {

    };
    _getTableVal = () => {
        const {repayPerMouAi: xi_month, repayPrincipalPerMouAp: jin_month} = this.routeParameter.detail;
        const {repayPerMouObjAi: xi_detail, repayPerMouObjAp: jin_detail} = this.routeParameter.detail.repaymentTable;
        let table = [];
        table[0] = xi_detail.balanceArrAi.reduce((res: any[], _curr: number, index: number) => {
            res.push([
                index + 1,
                xi_month,
                xi_detail.repayPrincipalPerMouArrAi[index],
                xi_detail.repayInterestPerMouArrAi[index],
                xi_detail.balanceArrAi[index]
            ]);
            return res;
        }, []);
        table[1] = jin_detail.balanceArrAp.reduce((res: any[], _curr: number, index: number) => {
            res.push([
                index + 1,
                jin_detail.repayPerMouPriceArrAp[index],
                jin_month,
                jin_detail.repayInterestPerMouArrAp[index],
                jin_detail.balanceArrAp[index]
            ]);
            return res;
        }, []);
        this.setState({
            table: table
        })
    };
    _renderItems = (items: any): ReactElement => {
        const {item, index} = items;
        return <View key={index} style={[styles.flexRow, styles.alignCenter, styles.justifyBetween, styles.tableTr, index % 2 === 0 ? {} : styles.tableTrSingle]}>
            {
                item.map((curr: string|number, i: number) => {
                    return <Text key={i} style={[styles.tableTrText, i === 0 ? {width: scaleSize(74)} : {}]}>{curr}</Text>
                })
            }
        </View>
    };
    _getListItem = (curr: keyLabelParam, equal_key: number) => {
        const {detail} = this.routeParameter;
        const {table} = this.state;
        // @ts-ignore
        return <View key={equal_key} data-value={{name: curr.label}} style={[styles.counterResultPage]}>
            <SwitchView current={equal_key}>
                <SwitchViewItem type={[0,1]}>
                    <View style={styles.cardView}>
                        <View style={[styles.flexColumn, styles.alignCenter]}>
                            <Text style={styles.monthStillTitle}>{equal_key === 1 ? '首月应还' : '每月应还'}</Text>
                            <View style={[styles.monthStillView]}>
                                <Text style={[styles.monthStill]}>{equal_key === 1 ? detail.repayPerMouthAp : detail.repayPerMouAi}</Text>
                                <Text style={[styles.monthStillUnit, styles.bottom_6]}>元</Text>
                            </View>
                            <Text style={[styles.monthStillUnit]}>{equal_key === 1 ? `每月递减${detail.decreasePerMouAp}元` : ''}</Text>
                        </View>
                        <View style={[styles.cardItemView]}>
                            <View style={[styles.cardItem]}>
                                <Text style={[styles.cardItemTitle]}>贷款总额</Text>
                                <Text style={[styles.cardItemValue]}>{detail.loanTotal}万</Text>
                            </View>
                            <View style={styles.line}/>
                            <View style={[styles.cardItem]}>
                                <Text style={[styles.cardItemTitle]}>利息总额</Text>
                                <Text style={[styles.cardItemValue]}>{equal_key === 1 ? detail.totalInterestAp : detail.totalInterestAi}万</Text>
                            </View>
                            <View style={styles.line}/>
                            <View style={[styles.cardItem]}>
                                <Text style={[styles.cardItemTitle]}>贷款年限</Text>
                                <Text style={[styles.cardItemValue]}>{detail.totalYears}年</Text>
                            </View>
                        </View>
                    </View>
                </SwitchViewItem>
                <SwitchViewItem type={[1]}>
                    <Text style={[styles.tipsView]}>
                        <Text style={[styles.tipsTheme]}>每月还款金额递减{detail.decreasePerMouAp}元</Text>
                        <Text style={[styles.tipsText]}>，其中每月还款的本金不变，利息逐月减少。计算结果仅供参考。</Text>
                    </Text>
                </SwitchViewItem>
                <SwitchViewItem type={[0]}>
                    <Text style={[styles.tipsView]}>
                        <Text style={[styles.tipsTheme]}>每月还款金额不变</Text>
                        <Text style={[styles.tipsText]}>，其中还款的本金逐月递增，利息逐月递减。计算结果仅供参考。</Text>
                    </Text>
                </SwitchViewItem>
                <SwitchViewItem type={[0, 1]}>
                    <View style={[styles.flexRow, styles.alignCenter, styles.justifyBetween, styles.tableTr, styles.tableTrSingle]}>
                        {
                            ['期数', '月供总额',  '月供本金', '月供利息', '剩余本金'].map((curr: string, i) => {
                                return <Text key={i} style={[styles.tableTrText, styles.tableThText, i === 0 ? {width: scaleSize(74)} : {}]}>{curr}</Text>
                            })
                        }
                    </View>
                </SwitchViewItem>
                <SwitchViewItem type={[0]} style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <FlatList
                            data={table[0]}
                            style={{flex: 1}}
                            renderItem={(item: any) => this._renderItems(item)}
                        >
                        </FlatList>
                    </View>
                </SwitchViewItem>
                <SwitchViewItem type={[1]} style={{flex: 1}}>
                    <View style={{flex: 1, marginBottom: scaleSize(10)}}>
                        <FlatList
                            data={table[1]}
                            renderItem={(item: any) => this._renderItems(item)}
                        >
                        </FlatList>
                    </View>
                </SwitchViewItem>
            </SwitchView>

        </View>
    };
    render () {
        return <Page
            title={this.routeParameter.loan_type}
            scroll={false}
        >
            <ScrollableTabView
                renderTabBar={DefaultTabBar}
                tabBarBackgroundColor='white'
                tabBarInactiveTextColor={'#4D4D4D'}
                tabBarActiveTextColor={'#1F3070'}
                tabBarUnderlineStyle={styles.lineStyle}
                tabBarTextStyle={styles.textStyle}
                onChangeTab={this._onChangeTab}
                style={{paddingBottom: scaleSize(20)}}
            >
                {
                    equal_types.map((curr, index) => this._getListItem(curr, index))
                }
            </ScrollableTabView>
        </Page>
    };
}
interface propsTypes {}
const mapStateToProps: MapStateToProps<propsTypes, any, any> = ({config}) => ({config});
export default connect(mapStateToProps)(CalculateDetail)