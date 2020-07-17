import React from "react";
import {ViewSkeleton} from "@/components/skeleton/ViewSkeleton";
import {ScrollView, View} from "react-native";
import {scaleSize} from "@/utils/screenUtil";
import ViewSkeletonWrapper from "@/components/skeleton/ViewSkeletonWrapper";

const BuildingDetailSkeleton = () => {

    return (
        <ScrollView style={{width: '100%', height: '100%', paddingTop: scaleSize(550), paddingRight: scaleSize(32), paddingLeft: scaleSize(32)}}>
            <ViewSkeletonWrapper>
                <ViewSkeleton height={55}/>
                <ViewSkeleton height={26} width='40%'/>
            </ViewSkeletonWrapper>

            <ViewSkeletonWrapper flexDirection='row' justifyContent='center' padding={[56, 0, 0, 0]}>
                <ViewSkeletonWrapper justifyContent='flex-end' height='100%' alignItems='center'>
                    <ViewSkeleton height={26} width={140}/>
                </ViewSkeletonWrapper>

                <ViewSkeletonWrapper justifyContent='center' alignItems='center'>
                    <ViewSkeleton height={26} width={140}/>
                    <ViewSkeleton height={26} width={140}/>
                </ViewSkeletonWrapper>
            </ViewSkeletonWrapper>

            <ViewSkeleton margin={[23, 0, 0, 0]}/>

            <ViewSkeletonWrapper padding={[38, 0, 0, 0]}>
                <ViewSkeleton height={50} width={180}/>
                <ViewSkeletonWrapper padding={[20, 0, 0, 0]} flexDirection='row'>
                    <ViewSkeleton margin={[0, 10, 0, 0]} height={27} width={140}/>
                    <ViewSkeleton margin={[0, 0, 0, 0]} height={27} width={230}/>
                </ViewSkeletonWrapper>
                <ViewSkeletonWrapper padding={[20, 0, 0, 0]} flexDirection='row'>
                    <ViewSkeleton margin={[0, 10, 0, 0]} height={27} width={140}/>
                    <ViewSkeleton margin={[0, 0, 0, 0]} height={27} width={230}/>
                </ViewSkeletonWrapper>
                <ViewSkeletonWrapper padding={[20, 0, 0, 0]} flexDirection='row'>
                    <ViewSkeleton margin={[0, 10, 0, 0]} height={27} width={140}/>
                    <ViewSkeleton margin={[0, 0, 0, 0]} height={27} width={230}/>
                </ViewSkeletonWrapper>
            </ViewSkeletonWrapper>
        </ScrollView>
    )
};

export default BuildingDetailSkeleton
