/**
 * Created by Kary on 2019/10/18 14:42.
 */
import React, {PureComponent} from 'react';
import {NavigationScreenProps} from 'react-navigation';
import {connect, MapStateToProps} from 'react-redux';
import {ActivityIndicator, DeviceEventEmitter, Image, Text, TouchableOpacity, View} from 'react-native';
import Page from '../../../components/Page';
import styles from './css';
import {Picker} from '@new-space/date-picker'
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {
    accumulationFund_types,
    count_types,
    currColumnType, handleCount,
    keyLabelParam,
    loan_types,
    percent_types,
    year_types
} from "../../../utils/calculate";
import SwitchView from './../../../components/SwitchView';
import Input from "../../../components/Form/Input";
import {detail_Type, formatFloat} from "../../../utils/calculate/calculate";
import {scaleSize} from "../../../utils/screenUtil";

// const CFHL = require("../../../utils/calculate/calculate.js");
const SwitchViewItem = SwitchView.Item;


class Calculate extends PureComponent <propsTypes & NavigationScreenProps> {
    constructor(props: any) {
        super(props)
    }
    DEFAULT_LPR = 4.85;
    state = {
        show: false,
        currColumn: null as currColumnType,
        columns: [] as string[],
        loan_key: 0,
        count_key: 1,
        year_key: 0,
        percent_key: 0,
        LPR: (this.DEFAULT_LPR + '') as string,
        basicPoint: '' as string,
        accumulationFund_key: 0,
        commercialTotal: '' as string,
        accumulationFundTotal: '' as string,

        interestRate: (this.DEFAULT_LPR + '') as string|null,
        disabled: true
    };
    _onChangeTab = (e: {form: number, i: number, ref: any}) => {
        this.setState({loan_key: e.i})
    };
    _show = () => {
        this.setState((prevState) => {
            return {show: !prevState}
        })
    };
    _setPickerData = (data: keyLabelParam[] = []) => {
        return data.reduce((res, curr) => {
            res.push({
                key: curr.key,
                value: curr.key,
                label: curr.label
            });
            return res;
        }, [] as {key: number, label: string, value: number}[])
    };
    _pickerOk = (v: number, type: string) => {
        this.setState({
            [type]: v
        })
    };
    _getValueIndex = (key: number, types: keyLabelParam[]): number => {
        if (!key) return 0;
        for (let i: number = 0; i < types.length; i ++) {
            if ((types as any)[i].key === key) return i;
        }
        return 0
    };
    _getInputVal = (str: string|null) => {
        return (((str || '').match(/^\d*(\.?\d{0,2})/g) || [''])[0] || '').replace(/\.$/, '');
    };
    _handleBlur = (v: any, type: string) => {
        // @ts-ignore
        let value = this._getInputVal(this.state[type]);
        this.setState({
            [type]: value
        });
    };
    _setDisabled = () => {
        let {loan_key, commercialTotal, accumulationFundTotal, LPR} = this.state;
        commercialTotal = this._getInputVal(commercialTotal);
        accumulationFundTotal = this._getInputVal(accumulationFundTotal);
        LPR = this._getInputVal(LPR);
        return loan_key == 2 ? !(commercialTotal && accumulationFundTotal && LPR) : (loan_key == 1 ? !accumulationFundTotal : !(commercialTotal && LPR));
    };
    _setInterestRate = () => {
        let {LPR, basicPoint} = this.state;
        return formatFloat((Number(LPR) || 0) + (Number(basicPoint) || 0) / 100, 2)
    };
    _handleChange = (v: any, type: string) => {
        this.setState({
            [type]: v
        });
    };
    _handleCount = () => {
        try {
            const {loan_key, commercialTotal, accumulationFundTotal, percent_key, LPR, basicPoint, accumulationFund_key, year_key, count_key} = this.state;
            const detail: detail_Type|null = handleCount({
                commercialTotal: +(commercialTotal || ''),
                accumulationFundTotal: +(accumulationFundTotal || ''),
                loan_key,
                percent_key,
                basicPoint: +(this._getInputVal(basicPoint) || ''),
                LPR: +(LPR || ''),
                accumulationFund_key,
                year_key,
                count_key
            });
            if (!detail) return;
            this.props.navigation.navigate('calculateDetail', {
                detail: detail!,
                loan_type: loan_types[loan_key].label
            });
        } catch (e) {
            console.log(e)
        }
    };
    _getFormItem = (curr: keyLabelParam, loan_key: number) => {
        const {count_key, year_key, percent_key, accumulationFund_key, LPR, basicPoint, commercialTotal, accumulationFundTotal} = this.state;
        const disabled = this._setDisabled();
        // @ts-ignore
        return <View key={loan_key} tabLabel={curr.label} style={{flex: 1}}>
            <SwitchView current={loan_key}>
                <SwitchViewItem type={[0, 1]}>
                    <View style={[styles.flexColumn, styles.alignCenter]}>
                        <View style={[styles.formItem]}>
                            <Text style={[styles.formItemLabel]}>计算方式</Text>
                            <View style={[styles.flex_1]}>
                                <Picker
                                    data={this._setPickerData(count_types)}
                                    value={[count_types[count_key].key]}
                                    onOk={v => this._pickerOk(this._getValueIndex(v[0], count_types), 'count_key')}
                                    cols={1}
                                >
                                    <TouchableOpacity activeOpacity={0.9} style={[styles.flexRow, styles.alignCenter, styles.justifyBetween, styles.picker]}>
                                        <Text style={[styles.value]}>{count_types[count_key].label}</Text>
                                        <Image style={[styles.arrow]} source={require("./../../../images/icons/right.png")}/>
                                    </TouchableOpacity>
                                </Picker>
                            </View>
                        </View>
                    </View>
                </SwitchViewItem>
                <SwitchViewItem type={[0, 2]}>
                    <View style={[styles.flexColumn, styles.alignCenter]}>
                        <View style={[styles.formItem]}>
                            <Input
                                onBlur={(v) => this._handleBlur(v, 'commercialTotal')}
                                onChange={(v) => this._handleChange(v, 'commercialTotal')}
                                keyboardType='numeric'
                                maxLength={7}
                                value={commercialTotal+''}
                                placeholder={'请输入'}
                                viewStyle={styles.inputView}
                                label={
                                    <Text style={[styles.formItemLabel]}>商业总额</Text>
                                }
                                rightContent={
                                    <Text style={[styles.formItemUnit]}>万</Text>
                                }
                            />
                        </View>
                    </View>
                </SwitchViewItem>
                <SwitchViewItem type={[1, 2]}>
                    <View style={[styles.flexColumn, styles.alignCenter]}>
                        <View style={[styles.formItem]}>
                            <Input
                                onBlur={(v) => this._handleBlur(v, 'accumulationFundTotal')}
                                onChange={(v) => this._handleChange(v, 'accumulationFundTotal')}
                                keyboardType='numeric'
                                maxLength={7}
                                value={accumulationFundTotal+''}
                                placeholder={'请输入'}
                                viewStyle={styles.inputView}
                                label={
                                    <Text style={[styles.formItemLabel]}>公积金总额</Text>
                                }
                                rightContent={
                                    <Text style={[styles.formItemUnit]}>万</Text>
                                }
                            />
                        </View>
                    </View>
                </SwitchViewItem>
                <SwitchViewItem type={[0, 1, 2]}>
                    <View style={[styles.split, styles.alignCenter]}/>
                </SwitchViewItem>
                <SwitchViewItem type={[0, 1, 2]}>
                    <View style={[styles.flexColumn, styles.alignCenter]}>
                        <View style={[styles.formItem]}>
                            <Text style={[styles.formItemLabel]}>贷款年限</Text>
                            <View style={[styles.flex_1]}>
                                <Picker
                                    data={this._setPickerData(year_types)}
                                    value={[year_types[year_key].key]}
                                    onOk={v => this._pickerOk(this._getValueIndex(v[0], year_types), 'year_key')}
                                    cols={1}
                                >
                                    <TouchableOpacity activeOpacity={0.9} style={[styles.flexRow, styles.alignCenter, styles.justifyBetween, styles.picker]}>
                                        <Text style={[styles.value]}>{year_types[year_key].label}</Text>
                                        <Image style={[styles.arrow]} source={require("./../../../images/icons/right.png")}/>
                                    </TouchableOpacity>
                                </Picker>
                            </View>
                        </View>
                    </View>
                </SwitchViewItem>
                <SwitchViewItem type={[0, 1]}>
                    <SwitchView current={count_key}>
                        <SwitchViewItem type={0}>
                            <View style={[styles.flexColumn, styles.alignCenter]}>
                                <View style={[styles.formItem]}>
                                    <Text style={[styles.formItemLabel]}>贷款比例</Text>
                                    <View style={[styles.flex_1]}>
                                        <Picker
                                            data={this._setPickerData(percent_types)}
                                            value={[percent_types[percent_key].key]}
                                            onOk={v => this._pickerOk(this._getValueIndex(v[0], percent_types), 'percent_key')}
                                            cols={1}
                                        >
                                            <TouchableOpacity activeOpacity={0.9} style={[styles.flexRow, styles.alignCenter, styles.justifyBetween, styles.picker]}>
                                                <Text style={[styles.value]}>{percent_types[percent_key].label}</Text>
                                                <Image style={[styles.arrow]} source={require("./../../../images/icons/right.png")}/>
                                            </TouchableOpacity>
                                        </Picker>
                                    </View>
                                </View>
                            </View>
                        </SwitchViewItem>
                    </SwitchView>
                </SwitchViewItem>
                <SwitchViewItem type={[1, 2]}>
                    <View style={[styles.flexColumn, styles.alignCenter]}>
                        <View style={[styles.formItem]}>
                            <Text style={[styles.formItemLabel]}>公积金利率</Text>
                            <View style={[styles.flex_1]}>
                                <Picker
                                    data={this._setPickerData(accumulationFund_types)}
                                    value={[accumulationFund_types[accumulationFund_key].key]}
                                    onOk={v => this._pickerOk(this._getValueIndex(v[0], accumulationFund_types), 'accumulationFund_key')}
                                    cols={1}
                                >
                                    <TouchableOpacity activeOpacity={0.9} style={[styles.flexRow, styles.alignCenter, styles.justifyBetween, styles.picker]}>
                                        <Text style={[styles.value]}>{accumulationFund_types[accumulationFund_key].label}</Text>
                                        <Image style={[styles.arrow]} source={require("./../../../images/icons/right.png")}/>
                                    </TouchableOpacity>
                                </Picker>
                            </View>
                        </View>
                    </View>
                </SwitchViewItem>
                <SwitchViewItem type={[0, 2]}>
                    <View style={[styles.flexColumn, styles.alignCenter]}>
                        <View style={[styles.formItem]}>
                            <Input
                                onBlur={(v) => this._handleBlur(v, 'LPR')}
                                onChange={(v) => this._handleChange(v, 'LPR')}
                                keyboardType='numeric'
                                maxLength={7}
                                value={LPR+''}
                                placeholder={'请输入'}
                                viewStyle={styles.inputView}
                                label={
                                    <Text style={[styles.formItemLabel]}>LPR</Text>
                                }
                                rightContent={
                                    <Text style={[styles.formItemUnit]}>万</Text>
                                }
                            />
                        </View>
                    </View>
                </SwitchViewItem>
                <SwitchViewItem type={[0, 2]}>
                    <View style={[styles.flexColumn, styles.alignCenter]}>
                        <View style={[styles.formItem]}>
                            <Input
                                onBlur={(v) => this._handleBlur(v, 'basicPoint')}
                                onChange={(v) => this._handleChange(v, 'basicPoint')}
                                keyboardType='numeric'
                                maxLength={7}
                                value={basicPoint+''}
                                placeholder={'请输入'}
                                viewStyle={styles.inputView}
                                label={
                                    <Text style={[styles.formItemLabel]}>基点</Text>
                                }
                                rightContent={
                                    <Text style={[styles.formItemUnit]}>BP(‱)</Text>
                                }
                            />
                        </View>
                    </View>
                </SwitchViewItem>
                <SwitchViewItem type={[0, 2]}>
                    <View style={[styles.flexColumn, styles.alignCenter]}>
                        <View style={[styles.formItem]}>
                            <Text style={[styles.formItemLabel]}>商贷利率</Text>
                            <View style={[styles.flex_1, styles.flexRow, styles.alignCenter, styles.justifyBetween, {paddingVertical: scaleSize(30)}]}>
                                <Text style={[styles.formItemUnit]}>{LPR || 0}%</Text>
                                <Text style={[styles.formItemUnit]}>+</Text>
                                <Text style={[styles.formItemUnit]}>{basicPoint || 0}‱</Text>
                                <Text style={[styles.formItemUnit]}>=</Text>
                                <Text style={[styles.value]}>{this._setInterestRate()}</Text>
                                <Text style={[styles.formItemUnit]}>%</Text>
                            </View>
                        </View>
                    </View>
                </SwitchViewItem>
                <SwitchViewItem type={[0, 1, 2]}>
                    <View style={[styles.flexColumn, styles.alignCenter, disabled ? styles.btnDisabled : {}]}>
                        <TouchableOpacity onPress={this._handleCount} disabled={disabled} style={[styles.btn]}>
                            <Text style={[styles.btnText]}>开始计算</Text>
                        </TouchableOpacity>
                        <Text style={[styles.text]}>
                            *计算结果仅供参考，具体贷款金额以银行数据为准
                        </Text>
                    </View>
                </SwitchViewItem>
            </SwitchView>
        </View>
    };
    render() {
        return <Page
            title='房贷计算器'
            scroll={false}>
            <ScrollableTabView
                locked={true}
                renderTabBar={() => <DefaultTabBar/>}
                tabBarBackgroundColor='white'
                tabBarInactiveTextColor={'#4D4D4D'}
                tabBarActiveTextColor={'#1F3070'}
                tabBarUnderlineStyle={styles.lineStyle}
                tabBarTextStyle={styles.textStyle}
                onChangeTab={this._onChangeTab}
            >
                {
                    loan_types.map((curr, index) => this._getFormItem(curr, index))
                }
            </ScrollableTabView>
        </Page>

    }
}

interface propsTypes {}
const mapStateToProps: MapStateToProps<propsTypes, any, any> = ({config}) => ({config});
export default connect(mapStateToProps)(Calculate)