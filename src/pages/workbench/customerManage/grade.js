import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { scaleSize } from '../../../utils/screenUtil'

const styles = StyleSheet.create({
    start: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: scaleSize(40)
    },
    starImg: {
        width: scaleSize(30),
        height: scaleSize(30),
        marginRight: scaleSize(5)
    }
})

const START = require('../../../images/icons/start.png')
const ACTIVESTART = require('../../../images/icons/activeStart.png')


class BuyGrade extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arr: [0, 1, 2, 3, 4],
            gradeText: ['D', 'C', 'B-', 'B+', 'A'],
            // activeIndex: -1
        }
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.range !== prevState.range) {
    //         return {...prevState, activeIndex: nextProps.range}
    //     }
    // }

    startRange = async (item, index) => {
        if (this.props.aaa) {
            this.props.aaa(index)
        }
        // await this.setState({
        //     activeIndex: index
        // }, () => {
        //     if (this.props.aaa) {
        //         this.props.aaa(index)
        //     }
        // })
    }

    render() {
        let { arr, gradeText } = this.state
        let { activeIndex } = this.props
        return (
            <View style={styles.start}>
                {
                    arr.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => this.startRange(item, index)}>
                                {activeIndex >= index ? <Image source={ACTIVESTART} style={styles.starImg} /> : <Image source={START} style={styles.starImg} />}
                            </TouchableOpacity>
                        )
                    })
                }
                <Text>{gradeText[activeIndex]}</Text>
            </View>
        )
    }
}

export default (BuyGrade)