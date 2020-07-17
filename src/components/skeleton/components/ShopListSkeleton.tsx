import React from "react";
import {View} from "react-native";
import ViewSkeletonWrapper from "@/components/skeleton/ViewSkeletonWrapper";
import {ViewSkeleton} from "@/components/skeleton/ViewSkeleton";
import {scaleSize} from "@/utils/screenUtil";

const data1: Array<number> = new Array(3).fill(Math.random());

const ShopListSkeleton = () => {
    return (
        <View style={{paddingTop: scaleSize(20), height: '100%', width: '100%'}}>
            <ViewSkeletonWrapper padding={[0, 32, 0, 32]}>
                <ViewSkeletonWrapper>
                    <ViewSkeleton margin={[0, 0, 26, 0]}/>
                    <ViewSkeleton width='50%'/>
                </ViewSkeletonWrapper>

                {data1.map(() => (
                    <ViewSkeletonWrapper>
                        <ViewSkeletonWrapper padding={[26, 0, 26, 0]} flexDirection='row' justifyContent='space-between'>
                            <ViewSkeleton width={60} height={48}/>
                            <ViewSkeleton width={60} height={48}/>
                        </ViewSkeletonWrapper>

                        <ViewSkeletonWrapper flexDirection='row'>
                            <ViewSkeleton height={140} style={{flex: 1}}/>
                            <View style={{width: scaleSize(4)}}/>
                            <ViewSkeleton height={140} style={{flex: 1}}/>
                            <View style={{width: scaleSize(4)}}/>
                            <ViewSkeleton height={140} style={{flex: 1}}/>
                            <View style={{width: scaleSize(4)}}/>
                            <ViewSkeleton height={140} style={{flex: 1}}/>
                        </ViewSkeletonWrapper>

                        <ViewSkeletonWrapper flexDirection='row'>
                            <ViewSkeleton height={140} style={{flex: 1}}/>
                            <View style={{width: scaleSize(4)}}/>
                            <ViewSkeleton height={140} style={{flex: 1}}/>
                            <View style={{width: scaleSize(4)}}/>
                            <ViewSkeleton height={140} style={{flex: 1}}/>
                            <View style={{width: scaleSize(4)}}/>
                            <ViewSkeleton height={140} style={{flex: 1}}/>
                        </ViewSkeletonWrapper>
                    </ViewSkeletonWrapper>
                ))}


            </ViewSkeletonWrapper>
        </View>
    )
};

export default ShopListSkeleton

