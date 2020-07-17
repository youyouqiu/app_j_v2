import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

// 工具
import {scaleSize} from '../../../utils/screenUtil';

// 组件
import BaseContainer from '../../../components/Page';
import Input from '../../../components/Form/Input';

// 样式
import {STYLE} from './reportTextStyle';

// 测试组件
class ReportTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fromData: {}, // from 数据
        }
    }

    componentDidMount() {

    }

    setValue = (key, value) => {
        let {fromData} = this.state;

        Object.assign(fromData, {[key]: value})

        this.setState({
            fromData,
        })
    }

    // 假装获取焦点
    onFocusColor = (type) => {
        console.log('假装获取焦点', type)

        if (this[`inputTest${type}`]) {
            this[`inputTest${type}`].focus();
        }

        // switch () {
        // case 1:
        //     1111
        //     break;

        // case 2:
        //     2222
        //     break;

        // case 3:
        //     3333
        //     break;

        // case 4:
        //     4444
        //     break

        // default: console.log('没有default');
        // }
    }

    // 表单右侧自定义组件
    _rightContent = (num, values) => {
        console.log(values, 'values')
        let valueList = (values || '').split('');
        console.log(valueList, 'values')

        return (
            <View style={[STYLE.inputWarp]}>
                <Text style={{fontSize: scaleSize(28), color: 'rgba(0,0,0,1)', marginRight: scaleSize(9)}}>{'131'}</Text>
                <TouchableOpacity
                    style={{marginRight: scaleSize(8)}}
                    activeOpacity={0.8}
                    onPress={() => {this.onFocusColor(num)}}
                >
                    <Text style={[STYLE.textWarp, valueList.length === 1 ? STYLE.inputYesBorder : null]}>{valueList[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{marginRight: scaleSize(8)}}
                    activeOpacity={0.8}
                    onPress={() => {this.onFocusColor(num)}}
                >
                    <Text style={[STYLE.textWarp, valueList.length === 2 ? STYLE.inputYesBorder : null]}>{valueList[1]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{marginRight: scaleSize(8)}}
                    activeOpacity={0.8}
                    onPress={() => {this.onFocusColor(num)}}
                >
                    <Text style={[STYLE.textWarp, valueList.length === 3 ? STYLE.inputYesBorder : null]}>{valueList[2]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{}}
                    activeOpacity={0.8}
                    onPress={() => {this.onFocusColor(num)}}
                >
                    <Text style={[STYLE.textWarp, valueList.length === 4 ? STYLE.inputYesBorder : null]}>{valueList[3]}</Text>
                </TouchableOpacity>
                <Text style={{fontSize: scaleSize(28), color: 'rgba(0,0,0,1)', marginLeft: scaleSize(9)}}>{'3838'}</Text>
            </View>
        )
    }

    render() {
        let {fromData} = this.state;

        return (
            <BaseContainer
                title='测试组件'
                contentViewStyle={{padding: 0, backgroundColor: '#fff'}}
            >
                <View style={{}}>
                    <Text>测试组件</Text>
                </View>

                <View style={{borderTopWidth: scaleSize(2), borderTopColor: 'rgba(234,234,234,1)'}}>
                    <Input
                        onChange={(e) => this.setValue('Building', e)}
                        value={fromData.Building}
                        label={
                            <View style={{width: 100, marginLeft: scaleSize(32)}}>
                                <Text style={{fontSize: scaleSize(28), color: 'rgba(134,134,134,1)'}}>测试</Text>
                            </View>
                        }
                        placeholder=''
                        maxLength={4}
                        keyboardType='numeric'
                        elem={ref => this.inputTest0 = ref}
                        style={{width: 0, height: 0}}
                        rightContent={this._rightContent(0, fromData.Building)}
                    />
                </View>
            </BaseContainer>
        )
    }
}

export default ReportTest;
