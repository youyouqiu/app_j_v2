import React from "react";
import {View} from "react-native";
import {scaleSize} from "@/utils/screenUtil";
import ViewSkeletonWrapper from "@/components/skeleton/ViewSkeletonWrapper";
import {ViewSkeleton} from "@/components/skeleton/ViewSkeleton";

const data = new Array(6).fill(Math.random());

const ArticleListSkeleton = () => {
    return (
        <View style={{paddingTop: scaleSize(20)}}>
            {data.map(() => (
                <ViewSkeletonWrapper>
                    <ViewSkeletonWrapper padding={[0, 32, 0, 32]} flexDirection='row' alignItems='center'>
                        <ViewSkeletonWrapper style={{flex: 1}} height='100%'>
                            <ViewSkeleton width='80%' height={32}/>
                            <ViewSkeleton width='70%' height={32}/>
                            <View style={{flex: 1}}/>
                            <ViewSkeleton width='50%' height={32}/>
                        </ViewSkeletonWrapper>
                        <ViewSkeleton width={250} height={186}/>
                    </ViewSkeletonWrapper>
                    <ViewSkeleton margin={[33, 0, 40, 0]} style={{backgroundColor: '#f5f5f5'}} height={16}/>
                </ViewSkeletonWrapper>
            ))}
        </View>
    )
};

export default ArticleListSkeleton
