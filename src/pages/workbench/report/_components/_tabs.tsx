import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { scaleSize } from '../../../../utils/screenUtil';
import { NavigationScreenProps } from 'react-navigation';
import ReportItem from './_tabsItem';

const tabsTitles: any = [
    {name: '报备', id: '001'},
    {name: '到访', id: '002'},
    {name: '失效', id: '003'},
];

interface propsTypes {
    reportData: any
    totalCount: any
    initReportData: any
    initReportCount: any
    gotoSelectInfo: any
    callPhone: any
    config: any
    user: any
    sendPoint: any
};

interface reportDataTypes {
    [index: number]: any
};

interface totalCountTypes {
    reportTotal: number
    beltLookTotal: number
    lapseTotal: number
};

class ReportList extends Component<propsTypes & NavigationScreenProps> {
    constructor(props: any) {
        super(props);
    }

    state = {
        page: 0, // ! 初始tab页
        reportData: {} as reportDataTypes, // ! 初始报备列表
        totalCount: {} as totalCountTypes, // ! 初始报备总数
    }

    componentDidMount() {
        // this.getReportList();
    }

    componentWillReceiveProps(newProps: any) {
        if (((newProps || {}).totalCount || {}).reportTotal >= 0) {
            this.setState({
                reportData: newProps.reportData,
                totalCount: newProps.totalCount,
            }, () => {
                this.getReportList();
            })
        }
    }

    // ? 报备列表数据请求
    getReportList = () => {
        console.log('getReportList');
        const {reportData, totalCount} = this.props;
        // if (!reportData[0]) {
        //     Toast.message('网络连接失败！');
        //     return;
        // }
        this.setState({
            reportData,
            totalCount,
        }, () => {
            this.dataProcessing();
        })
    }

    // ? 数据处理
    dataProcessing = () => {
        console.log('dataProcessing');
        const {reportData, totalCount} = this.state;
        let newReportData: any = {...reportData};
        let newTotalCount: any = {...totalCount};
        // ?
        this.setState({
            reportData: newReportData,
            totalCount: newTotalCount,
        });
    }

    // ? tabs页面改变时
    onChangeTabs = (page: number) => {
        console.log('onChangeTabs', page);
        const {initReportData, initReportCount} = this.props;
        initReportData(page); // 切换tabsTitle时即时请求数据
        initReportCount(); // 切换tabsTitle时即时请求数量
        this.setState({
            page,
        })
    }

    render() {
        const {page, reportData, totalCount} = this.state;
        return (
            <View style={styles['wrap']}>
                <View style={styles['title-wrap']}>
                    {
                        tabsTitles.map((item: any, index: number) => {
                            let newTotalCount: any = {};
                            if (index === 0) {
                                newTotalCount[0] = (totalCount || {}).reportTotal || 0;
                            } else if (index === 1) {
                                newTotalCount[1] = (totalCount || {}).beltLookTotal || 0;
                            } else {
                                newTotalCount[2] = (totalCount || {}).lapseTotal || 0;
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
                    <ReportItem
                        tabsItem={((reportData || {})[page] || [])}
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
