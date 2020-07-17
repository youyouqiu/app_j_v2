import React, { Component } from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import { scaleSize } from '../../../../../utils/screenUtil'
import moment from 'moment'

const styles = StyleSheet.create({
    loggerView: {
        width: '100%',
        height: scaleSize(140),
        display: 'flex',
        flexDirection: 'row',
        marginLeft: scaleSize(32)
    },
    leftView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: scaleSize(111),
        width: scaleSize(10),
        marginTop: scaleSize(20)
    },
    shadow: {
        height: scaleSize(10),
        width: scaleSize(10),
        backgroundColor: '#3AD047',
        borderRadius: scaleSize(50)
    },
    line: {
        width: scaleSize(2),
        height: scaleSize(130),
        backgroundColor: '#EAEAEA'
    },
    rightView: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: scaleSize(44),
    },
    timeText: {
        color: '#CBCBCB',
        fontSize: scaleSize(24),
    },
    text: {
        color: '#4B6AC5',
        fontSize: scaleSize(28)
    },
    moren: {
        color: '#868686',
        fontSize: scaleSize(28),
        marginTop: scaleSize(22),
        width: scaleSize(600)
    },
    morenView: {
        display: 'flex',
        flexDirection: 'column'
    },
    middle: {
        height: scaleSize(33),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: scaleSize(700),
        justifyContent: 'space-between',
        flex: 1,
        marginBottom: scaleSize(20),
        marginTop: scaleSize(20),
        marginLeft: scaleSize(32)
    },
    middleLine: {
        width: scaleSize(228),
        height: scaleSize(2),
        backgroundColor: '#EAEAEA'
    }
})

class LoggerStep extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        let loggerData = this.props.data || []
        this.setState({
            data: loggerData
        })
    }

    _onEndReached = () => {
        console.log(this.props, '1233333')
        if (this.props.getCusDevelop) {
            console.log('123333345666')
            this.props.getCusDevelop()
        }
    }

    _keyExtractor = (item) => item + ''

    aaa = ({ item, index }) => {
        let renderContent = null
        if (item.trackType === 1) {
            renderContent = (
                <View style={styles.morenView}>
                    <Text style={styles.timeText}>{moment(item.createTime).format('YYYY-MM-DD')}</Text>
                    <Text style={styles.moren}><Text style={styles.text}>{item.customName}</Text>第<Text style={styles.text}>{item.viewCount}</Text>次浏览楼盘<Text style={styles.text}>{item.buildingName}</Text>
                        {item.shopNumber ? <Text>的商铺<Text style={styles.text}>{item.shopNumber}</Text></Text> : null}
                    </Text>
                </View>
            )
        } else if (item.trackType === 2) {
            renderContent = (
                <View style={styles.morenView}>
                    <Text style={styles.timeText}>{moment(item.createTime).format('YYYY-MM-DD')}</Text>
                    <Text style={styles.moren}><Text style={styles.text}>{item.customName}</Text>关注了楼盘<Text style={styles.text}>{item.buildingName}</Text>
                        {item.shopNumber ? <Text>的商铺<Text style={styles.text}>{item.shopNumber}</Text></Text> : null}
                    </Text>
                </View>

            )
        } else if (item.trackType === 3) {
            renderContent = (
                <View style={styles.morenView}>
                    <Text style={styles.timeText}>{moment(item.createTime).format('YYYY-MM-DD')}</Text>
                    <Text style={styles.moren}><Text style={styles.text}>{item.customName}</Text>取消关注了楼盘<Text style={styles.text}>{item.buildingName}</Text>
                        {item.shopNumber ? <Text>的商铺<Text style={styles.text}>{item.shopNumber}</Text></Text> : null}
                    </Text>
                </View>
            )
        } else if (item.trackType === 4) {
            renderContent = (
                <View style={styles.morenView}>
                    <Text style={styles.timeText}>{moment(item.createTime).format('YYYY-MM-DD')}</Text>
                    <Text style={styles.moren}><Text style={styles.text}>{item.customName}</Text> 搜索了<Text style={styles.text}> &quot;{item.word}&quot;</Text></Text>
                </View>
            )
        } else {
            renderContent = (
                <View style={styles.morenView}>
                    <Text style={styles.timeText}>{moment(item.createTime).format('YYYY-MM-DD')}</Text>
                    <Text style={styles.moren}>{item.dataType == 1 ? (
                        <Text>筛选了{item.wordType === 1 ? '总价' : '面积'}
                            <Text style={styles.text}>{item.word}</Text>的楼盘</Text>
                    ) : (<Text>在楼盘<Text style={styles.text}>{item.buildingName}</Text>中筛选了{item.wordType == 1 ? '总价' : '面积'}
                        <Text style={styles.text}>{item.word}</Text>的商铺</Text>)
                    }
                    </Text>
                </View>
            )
        }
        return (
            <View key={index}>
                {
                    item.isShowNew ?
                        <View style={styles.middle}>
                            <View style={styles.middleLine}></View>
                            <Text style={{ color: '#CBCBCB', fontSize: scaleSize(24) }}>以上为新动态</Text>
                            <View style={styles.middleLine}></View>
                        </View> :
                        <View style={styles.loggerView}>
                            <View style={styles.leftView}>
                                <View style={styles.shadow}></View>
                                <View style={styles.line}></View>
                            </View>
                            <View style={styles.rightView}>
                                {renderContent}
                            </View>
                        </View>
                }
            </View>
        )
    }

    render() {
        let { data } = this.state
        return (
            <FlatList
                style={{ flex: 1 }}
                keyExtractor={this._keyExtractor}
                renderItem={this.aaa}
                data={data}
                onEndReached={this._onEndReached}
                onEndReachedThreshold={0.2}
            />
        )
    }
}

export default (LoggerStep)