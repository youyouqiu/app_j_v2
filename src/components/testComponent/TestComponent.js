import React, {Component} from 'react'
import {FlatList, Text, View} from 'react-native'
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';
import {XKJScrollTabView} from "../XKJScrollTabView/XKJScrollTabView";
import FunctionDesk from "../../pages/project/shopDetail/components/functionDesk";
import {scaleSize} from "../../utils/screenUtil";


class TestComponent extends Component {

    onEndReached = () => {
        console.log('onEndReached');
        // @ts-ignore
        // debounce(_setData)({..._data, pageIndex: _data.pageIndex + 1});
    };

    render() {
        return (
            <View style={{paddingTop: 100, height: '100%'}}>
                <FlatList data={[1, 2]}
                          onEndReachedThreshold={0.1}
                          onEndReached={this.onEndReached}
                          renderItem={({item}) => <Text style={{height: scaleSize(50)}}>{item}</Text>}/>
            </View>
        )
    }
}

export default TestComponent

