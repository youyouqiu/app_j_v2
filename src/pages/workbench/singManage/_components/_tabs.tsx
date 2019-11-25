import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { scaleSize } from '../../../../utils/screenUtil';
import { NavigationScreenProps } from 'react-navigation';
import SingItem from './_tabsItem';

const tabsTitles: any = [
    {name: '认购', id: '001'},
    {name: '签约', id: '002'},
    {name: '退房', id: '003'},
];

interface propsTypes {
    singData: any
    totalCount: any
    initSingData: any
    initSingCount: any
    gotoDetail: any
    config: any
    user: any
    sendPoint: any
};

interface singDataTypes {
    [index: number]: any
};

interface totalCountTypes {
    subCount: number
    dealCount: number
    returnCount: number
};

class ReportList extends Component<propsTypes & NavigationScreenProps> {
    constructor(props: any) {
        super(props);
    }

    state = {
        page: 0, // ! 初始tab页
        singData: {} as singDataTypes, // ! 初始报备列表
        totalCount: {} as totalCountTypes, // ! 初始报备总数
    }

    componentDidMount() {
        // this.getReportList();
    }

    componentWillReceiveProps(newProps: any) {
        if (((newProps || {}).totalCount || {}).subCount >= 0) {
            this.setState({
                singData: newProps.singData,
                totalCount: newProps.totalCount,
            }, () => {
                this.dataProcessing();
            })
        }
    }

    // ? 数据处理
    dataProcessing = () => {
        console.log('dataProcessing');
        const {singData, totalCount} = this.state;
        let newSingData: any = {...singData};
        let newTotalCount: any = {...totalCount};
        this.setState({
            singData: newSingData,
            totalCount: newTotalCount,
        });
    }

    // ? tabs页面改变时
    onChangeTabs = (page: number) => {
        console.log('onChangeTabs', page);
        const {initSingData, initSingCount} = this.props;
        initSingData(page); // 切换tabsTitle时即时请求数据
        initSingCount(); // 切换tabsTitle时即时请求数量
        this.setState({
            page,
        })
    }

    render() {
        const {page, singData, totalCount} = this.state;
        return (
            <View style={styles['wrap']}>
                <View style={styles['title-wrap']}>
                    {
                        tabsTitles.map((item: any, index: number) => {
                            let newTotalCount: any = {};
                            if (index === 0) {
                                newTotalCount[0] = (totalCount || {}).subCount || 0;
                            } else if (index === 1) {
                                newTotalCount[1] = (totalCount || {}).dealCount || 0;
                            } else {
                                newTotalCount[2] = (totalCount || {}).returnCount || 0;
                            }
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    activeOpacity={0.8}
                                    style={styles['title-wrapList']}
                                    onPress={() => this.onChangeTabs(index)}
                                >
                                    <Text style={page === index ? styles['title-text'] : null}>
                                        {item.name + (newTotalCount[index] > 0 ?`（${newTotalCount[index]}）`: '')}
                                    </Text>
                                    <View style={page === index ? styles['title-textBottom'] : null}></View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <View style={{backgroundColor: '#F8F8F8', flex: 1}}>
                    <SingItem
                        tabsItem={((singData || {})[page] || [])}
                        page={page}
                        {...this.props}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    'wrap': {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
    },
    'title-wrap': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: scaleSize(24),
        backgroundColor: 'white',
    },
    'title-wrapList': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    'title-text': {
        color: '#1F3070',
        marginBottom: scaleSize(20),
        fontSize: scaleSize(28),
    },
    'title-textBottom': {
        width: scaleSize(55),
        height: scaleSize(5),
        backgroundColor: '#1F3070',
    },
});

export default ReportList;
