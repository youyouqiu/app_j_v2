import ViewSkeletonWrapper from "@/components/skeleton/ViewSkeletonWrapper";
import React from "react";
import {ViewSkeleton} from "@/components/skeleton/ViewSkeleton";

const CustomerDetailSkeleton = () => {

    return (
        <ViewSkeletonWrapper padding={[100, 32, 32, 32]}>

            <ViewSkeletonWrapper flexDirection='row' alignItems='center' padding={[50, 0, 50, 0]}>
                <ViewSkeleton height={100} width={100} borderRadius={50} margin={[0, 0, 0, 0]}/>
                <ViewSkeletonWrapper justifyContent='center' padding={[0, 0, 0, 30]}>
                    <ViewSkeleton height={26} width='70%'/>
                    <ViewSkeleton height={26} width='70%'/>
                </ViewSkeletonWrapper>
            </ViewSkeletonWrapper>

            <ViewSkeletonWrapper flexDirection='row' alignItems='center' padding={[0, 0, 50, 0]}>
                <ViewSkeleton height={100} width={100} borderRadius={50} margin={[0, 0, 0, 0]}/>
                <ViewSkeletonWrapper justifyContent='center' padding={[0, 0, 0, 30]} style={{flex: 1}}>
                    <ViewSkeleton height={26} width='70%' margin={[0, 0, 10, 0]}/>
                    <ViewSkeleton height={26} width='70%' margin={[0, 0, 0, 0]}/>
                </ViewSkeletonWrapper>
                <ViewSkeleton width={100} height={50}/>
            </ViewSkeletonWrapper>

            <ViewSkeletonWrapper alignItems='center'>
                <ViewSkeleton width='60%' height={40}/>
            </ViewSkeletonWrapper>

            <ViewSkeletonWrapper padding={[40, 0, 0, 0]}>
                <ViewSkeleton height={50} width={200} margin={[0, 0, 30, 0]}/>
                <ViewSkeleton height={30} width={150} margin={[0, 0, 0, 20, 0]}/>
                <ViewSkeleton height={30} width={150} margin={[0, 0, 0, 20, 0]}/>
            </ViewSkeletonWrapper>

            <ViewSkeletonWrapper padding={[40, 0, 0, 0]}>
                <ViewSkeleton height={50} width={200} margin={[0, 0, 30, 0]}/>
                <ViewSkeletonWrapper flexDirection='row'>
                    <ViewSkeleton width={150} height={80}/>
                    <ViewSkeletonWrapper style={{flex: 1}} alignItems='center'>
                        <ViewSkeleton width={150} height={80}/>
                    </ViewSkeletonWrapper>
                    <ViewSkeleton width={150} height={80}/>
                </ViewSkeletonWrapper>
            </ViewSkeletonWrapper>

            <ViewSkeletonWrapper padding={[40, 0, 0, 0]}>
                <ViewSkeleton height={50} width={200} margin={[0, 0, 30, 0]}/>
                <ViewSkeleton height={400}/>
            </ViewSkeletonWrapper>

        </ViewSkeletonWrapper>
    )

};

export default CustomerDetailSkeleton;
