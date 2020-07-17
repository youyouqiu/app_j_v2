import React from "react";
import {StyleSheet, View} from "react-native";
import {scaleSize} from "@/utils/screenUtil";
import ViewSkeletonWrapper from "@/components/skeleton/ViewSkeletonWrapper";
import {ViewSkeleton} from "@/components/skeleton/ViewSkeleton";

const data = new Array(10).fill(Math.random());

const ArticleDetailSkeleton = () => {

    return (
        <View style={style.wrapper}>

            <ViewSkeletonWrapper>
                <ViewSkeleton width='90%' height={40}/>
                <ViewSkeleton width='70%' height={40}/>
                <ViewSkeletonWrapper flexDirection='row' padding={[30, 0, 40, 0]}>
                    <ViewSkeleton width={76} height={76} borderRadius={38}/>
                    <ViewSkeletonWrapper padding={[6, 0, 6, 20]}>
                        <ViewSkeleton height={30} width={150} borderRadius={0}/>
                        <View style={{flex: 1}}/>
                        <ViewSkeleton width={120} borderRadius={0} height={16}/>
                    </ViewSkeletonWrapper>
                </ViewSkeletonWrapper>

                <ViewSkeletonWrapper>
                    {data.map(() => (
                        <ViewSkeleton height={35} margin={[0, 0, 20, 0]}/>
                    ))}
                </ViewSkeletonWrapper>
            </ViewSkeletonWrapper>
        </View>
    )
};

export default ArticleDetailSkeleton;

const style = StyleSheet.create({
    wrapper:{
        paddingTop: scaleSize(20),
        height: '100%',
        width: '100%',
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32),
        backgroundColor:'#fff'
    }
});
