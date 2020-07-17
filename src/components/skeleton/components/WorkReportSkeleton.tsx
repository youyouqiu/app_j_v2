import ViewSkeletonWrapper from "@/components/skeleton/ViewSkeletonWrapper";
import React from "react";
import {ViewSkeleton} from "@/components/skeleton/ViewSkeleton";

const WorkReportSkeleton = () => {

    return (
        <ViewSkeletonWrapper padding={[32, 32, 32, 32]}>

            <ViewSkeleton height={192} margin={[0, 0, 20, 0]}/>

            <ViewSkeletonWrapper padding={[0, 0, 20, 0]} flexDirection='row'>
                <ViewSkeleton height={240} style={{flex: 1}} margin={[0, 0, 0, 0]}/>
                <ViewSkeleton width={10} style={{backgroundColor: '#fff'}}/>
                <ViewSkeleton height={240} style={{flex: 1}} margin={[0, 0, 0, 0]}/>
                <ViewSkeleton width={10} style={{backgroundColor: '#fff'}}/>
                <ViewSkeleton height={240} style={{flex: 1}} margin={[0, 0, 0, 0]}/>
            </ViewSkeletonWrapper>

            <ViewSkeleton height={264} margin={[0, 0, 20, 0]}/>

            <ViewSkeletonWrapper flexDirection='row' padding={[0, 0, 20, 0]}>
                <ViewSkeleton height={300} style={{flex: 1}}/>
                <ViewSkeleton width={10} style={{backgroundColor: '#fff'}}/>
                <ViewSkeleton height={300} style={{flex: 1}}/>
            </ViewSkeletonWrapper>

            <ViewSkeleton height={300}/>
        </ViewSkeletonWrapper>
    )

};

export default WorkReportSkeleton
