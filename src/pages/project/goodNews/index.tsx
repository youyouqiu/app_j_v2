import {Image, Text, View, StyleSheet, ImageBackground} from "react-native";
import React, {useEffect, useState, FunctionComponent} from "react";
import {scaleSize} from "../../../utils/screenUtil";
import HorizontalSwiper from "../../../components/HorizontalSwiper";
import projectService from "../../../services/projectService";
import {Carousel} from '@new-space/teaset'

interface newsTypes {
    brokerCompanyName: string | null
    brokerTrueName: string | null
    buildingTreeName: string | null
    shopName: string | null
    brokerCompanyShortName: string | null
}

interface GoodNewsProps {
    goodNewsList: []
}

export const GoodNews : FunctionComponent<GoodNewsProps> = (props) => {
    const congratulateWords_pre = [
        ['恭喜', '祝贺成交多多，客户多多！'],
        ['', '恭喜开单，继续加油！'],
        ['恭喜', '祝贺！期待再接再厉！'],
        ['祝贺', '大吉大利今晚吃鸡！'],
        ['恭喜', '期待继续发力！'],
    ];


    if (props.goodNewsList.length === 0) return <View/>

    return (
        <View style={[styles.box]}>

            <View style={styles.imgView}>
                <Image source={require('../../../images/icons/news.png')} style={styles.img}/>
            </View>
            <View style={styles.swipeView}>
                <HorizontalSwiper
                    speed = {60}
                    direction = {'left'}
                >
                    {
                        props.goodNewsList.map((curr: newsTypes, i: number) => {
                            let pre = congratulateWords_pre[Math.floor(Math.random() * (congratulateWords_pre.length))]
                            return <Text key={i} style={{color: '#000', height: '100%', fontWeight: '400', fontSize: scaleSize(28)}}>
                                {pre[0]}
                                {`${curr.brokerCompanyShortName || ''}`}
                                成交
                                {curr.buildingTreeName || ''}
                                <Text style={{color: '#FE5139'}}>
                                {curr.shopName || ''}
                                </Text>
                                ，
                                {pre[1]}
                            </Text>
                        })
                    }
                </HorizontalSwiper>
            </View>

        </View>
    )
};
const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingTop:scaleSize(20)
    },
    imgView: {
        backgroundColor: '#fff',
        paddingHorizontal: scaleSize(20)
    },
    img: {
        width: scaleSize(88),
        height: scaleSize(50)
    },
    swipeView: {
        flex: 1,
        height: '100%',
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: scaleSize(20)
    }
});
