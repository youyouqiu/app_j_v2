import ViewSkeletonWrapper from "@/components/skeleton/ViewSkeletonWrapper";
import React from "react";
import {ViewSkeleton} from "@/components/skeleton/ViewSkeleton";
import ImageSkeleton from "@/components/skeleton/ImageSkeleton";
import {scaleSize} from "@/utils/screenUtil";

const StationHelperSkeleton = () => {

    return (
        <ViewSkeletonWrapper padding={[180, 32, 32, 32]} style={{backgroundColor: '#F8F8F8'}}>

            <ViewSkeletonWrapper alignItems='center' padding={[0, 0, 64, 0]}>
                <ViewSkeleton height={30} width={240} margin={[0, 0, 0, 0]}/>
            </ViewSkeletonWrapper>

            <ViewSkeletonWrapper padding={[0, 0, 40, 0]} flexDirection='row'>
                {new Array(5).fill(Math.random()).map((v) => (
                    <ViewSkeletonWrapper key={v} style={{flex: 1}} alignItems='center' justifyContent='center'>
                        <ViewSkeleton height={80} width={80} borderRadius={8} margin={[0, 0, 0, 0]}/>
                    </ViewSkeletonWrapper>
                ))}
            </ViewSkeletonWrapper>

            {new Array(2).fill(Math.random()).map((v) => (


                <ViewSkeletonWrapper style={{backgroundColor: '#fff', marginBottom: scaleSize(40)}} padding={[24, 24, 24, 24]} key={v}>

                    <ViewSkeletonWrapper flexDirection='row' padding={[0, 0, 60, 0]}>
                        <ImageSkeleton width={236}/>
                        <ViewSkeletonWrapper padding={[0, 0, 0, 26]} style={{flex: 1}}>
                            <ViewSkeleton height={40}/>
                            <ViewSkeletonWrapper flexDirection='row' style={{width: '100%', flex: 1}} alignItems='flex-end' justifyContent='flex-end'>
                                <ViewSkeleton height={90} margin={[0, 0, 0, 0]} style={{flex: 1}}/>
                                <ViewSkeleton width={10} margin={[0, 0, 0, 0]} style={{backgroundColor: '#fff'}}/>
                                <ViewSkeleton height={90} margin={[0, 0, 0, 0]} style={{flex: 1}}/>
                                <ViewSkeleton width={10} margin={[0, 0, 0, 0]} style={{backgroundColor: '#fff'}}/>
                                <ViewSkeleton height={90} margin={[0, 0, 0, 0]} style={{flex: 1}}/>
                            </ViewSkeletonWrapper>
                        </ViewSkeletonWrapper>
                    </ViewSkeletonWrapper>

                    <ViewSkeletonWrapper>
                        {new Array(4).fill(Math.random()).map((v) => (
                            <ViewSkeletonWrapper padding={[0, 0, 48, 0]} flexDirection='row'>
                                <ViewSkeleton style={{flex: 1}} height={28} margin={[0, 0, 0, 0]}/>
                                <ViewSkeleton width={130} margin={[0, 0, 0, 15]} height={28}/>
                            </ViewSkeletonWrapper>
                        ))}
                    </ViewSkeletonWrapper>

                    <ViewSkeletonWrapper flexDirection='row'>
                        <ViewSkeleton style={{flex: 1}} height={80}/>
                        <ViewSkeleton width={60} style={{backgroundColor: '#fff'}} margin={[0, 0, 0, 0]}/>
                        <ViewSkeleton style={{flex: 1}} height={80}/>
                    </ViewSkeletonWrapper>

                </ViewSkeletonWrapper>
            ))}


        </ViewSkeletonWrapper>
    )

};

export default StationHelperSkeleton
