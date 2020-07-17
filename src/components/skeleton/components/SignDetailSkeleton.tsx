import React from "react";
import {View} from "react-native";
import {baseStyles_paddingMerge} from "@/utils/baseStyle";
import ViewSkeletonWrapper from "@/components/skeleton/ViewSkeletonWrapper";
import {ViewSkeleton} from "@/components/skeleton/ViewSkeleton";
import {scaleSize} from "@/utils/screenUtil";
import ImageSkeleton from "@/components/skeleton/ImageSkeleton";

const SignDetailSkeleton = () => {
    return (
        <ViewSkeletonWrapper height='100%' style={{width: '100%'}} padding={[100, 0, 0, 0]}>
            <ViewSkeletonWrapper style={{backgroundColor: '#F8F8F8'}} padding={[50, 50, 50, 34]} flexDirection='row'>
                <ImageSkeleton width={240} margin={[0, 20, 0, 0]}/>
                <ViewSkeletonWrapper>
                    <ViewSkeleton width='50%' height={40}/>
                    <ViewSkeleton width='50%' height={40}/>
                    <ViewSkeletonWrapper flexDirection='row'>
                        <ViewSkeleton width={64} height={40} margin={[0, 20, 0, 0]}/>
                        <ViewSkeleton width={64} height={40} margin={[0, 0, 0, 0]}/>
                    </ViewSkeletonWrapper>
                </ViewSkeletonWrapper>
            </ViewSkeletonWrapper>

            <ViewSkeletonWrapper padding={[20, 32, 20, 32]} flexDirection='row' justifyContent="space-between">
                <ViewSkeleton width={140} height={40}/>
                <ViewSkeleton width={120} height={40}/>
            </ViewSkeletonWrapper>

            {new Array(3).fill(Math.random()).map(() => (
                <ViewSkeletonWrapper style={{marginBottom: scaleSize(30)}} padding={[0, 32, 0, 32]}>
                    <ViewSkeleton height={50}/>

                    <ViewSkeleton width={200} height={34} margin={[10, 0, 32, 0]}/>

                    {new Array(2).fill(Math.random()).map(() => (
                        <ViewSkeletonWrapper flexDirection='row'>
                            <ViewSkeleton width={150} height={30}
                                          margin={[0, 40, 32, 0]}/>
                            <ViewSkeleton width={180} height={30}/>
                        </ViewSkeletonWrapper>
                    ))}

                    {new Array(2).fill(Math.random()).map((item, idx) => (
                        <ViewSkeletonWrapper flexDirection='row'>
                            <ViewSkeleton width={150} height={30}
                                          margin={[0, 40, 32, 0]}
                                          style={idx > 0 ? {backgroundColor: '#fff'} : null}
                            />
                            <ViewSkeleton width={180} height={30}/>
                        </ViewSkeletonWrapper>
                    ))}


                </ViewSkeletonWrapper>
            ))}
        </ViewSkeletonWrapper>
    )
};

export default SignDetailSkeleton
