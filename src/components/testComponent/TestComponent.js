import React, {Component} from 'react'
import {FlatList, Text, View} from 'react-native'
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';
import {XKJScrollTabView} from "../XKJScrollTabView/XKJScrollTabView";
import FunctionDesk from "../../pages/project/shopDetail/components/functionDesk";


class TestComponent extends Component {

    state = {
        refreshing: false
    };

    modalToggle = () => {
        this.setState(prev => ({
            visible: !prev.visible
        }))
    };

    onRefresh = ()=>{
        this.setState({
            refreshing:true
        });
        setTimeout(()=>{
            this.setState({
                refreshing:false
            });
        },3000)
    }

    render() {
        const {refreshing} = this.state;
        return (
            <View style={{paddingTop: 100, height: '100%'}}>

                <ScrollableTabView style={{height:200}}>
                    <View tabLabel='123'>
                        <FlatList data={[1,2,3]} onRefresh={this.onRefresh} refreshing={refreshing} renderItem={()=><Text>123</Text>}/>
                    </View>
                    <View tabLabel='123'>
                        <FlatList data={[1,2,3]} renderItem={()=><Text>123</Text>}/>
                    </View>
                    <View tabLabel='123'>
                        <FlatList data={[1,2,3]} renderItem={()=><Text>123</Text>}/>
                    </View>
                </ScrollableTabView>
            </View>
        )
    }
}

export default TestComponent

