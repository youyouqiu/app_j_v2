import ViewSkeletonWrapper from "@/components/skeleton/ViewSkeletonWrapper";
import React from "react";
import {ViewSkeleton} from "@/components/skeleton/ViewSkeleton";
import {scaleSize} from "@/utils/screenUtil";

const WechatCustomerDetailSkeleton = () => {
    return (
        <ViewSkeletonWrapper style={{backgroundColor: '#F8F8F8'}} padding={[100, 32, 32, 32]}>
            <ViewSkeleton height={280}/>
            <ViewSkeletonWrapper flexDirection='row' justifyContent='space-between' padding={[20, 0, 30, 0]}>
                <ViewSkeleton height={50} width={132}/>
                <ViewSkeleton height={50} width={132}/>
            </ViewSkeletonWrapper>

            <ViewSkeletonWrapper style={{backgroundColor: '#F8F8F8'}} padding={[0, 0, 10, 0]}>
                {new Array(3).fill(Math.random()).map(() => (
                    <ViewSkeletonWrapper flexDirection='row' style={{borderRadius: scaleSize(16)}}>
                        <ViewSkeletonWrapper alignItems='center' style={{width: scaleSize(48)}}>
                            <ViewSkeleton height={48} width={48} borderRadius={24} margin={[0, 0, 0, 0]}/>
                            <ViewSkeleton width={4} style={{flex: 1}} margin={[0, 0, 0, 0]}/>
                        </ViewSkeletonWrapper>
                        <ViewSkeletonWrapper
                            style={{backgroundColor: '#fff', flex: 1, marginBottom: scaleSize(40), marginLeft: scaleSize(32)}}
                            height={176}
                            flexDirection='column'
                            justifyContent='center'
                            padding={[32, 32, 32, 32]}>
                            <ViewSkeleton width='70%' height={30} margin={[0, 0, 0, 0]}/>
                            <ViewSkeletonWrapper style={{flex: 1}} justifyContent='center'>
                                <ViewSkeleton width='90%' height={30} margin={[0, 0, 0, 0]}/>
                            </ViewSkeletonWrapper>
                            <ViewSkeleton width='50%' height={30} margin={[0, 0, 0, 0]}/>
                        </ViewSkeletonWrapper>
                    </ViewSkeletonWrapper>
                ))}
            </ViewSkeletonWrapper>

            <ViewSkeletonWrapper padding={[30, 0, 0, 0]}>
                <ViewSkeleton height={50} width={150} margin={[0, 0, 20, 0]}/>
                <ViewSkeleton width='60%' height={30} margin={[0, 0, 16, 0]}/>
                <ViewSkeleton width='80%' height={30} margin={[0, 0, 16, 0]}/>
                <ViewSkeleton width='60%' height={30} margin={[0, 0, 16, 0]}/>
                <ViewSkeleton width='80%' height={30} margin={[0, 0, 16, 0]}/>
            </ViewSkeletonWrapper>

        </ViewSkeletonWrapper>
    )
};

export default WechatCustomerDetailSkeleton
