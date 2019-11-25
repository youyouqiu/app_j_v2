import {Image, ImageProps} from "react-native";
import React, {useState} from "react";


export const XKJImage = (props: ImageProps) => {

    const {source} = props;
    const defaultImageData: any = {
        loading: true,
        source
    };

    const [imageData, setImageData] = useState(defaultImageData);

    const onError = () => {
        setImageData({...defaultImageData, source: require('../../images/defaultImage/default_1.png')})
    };

    return <Image {...props} source={imageData.source} onError={onError} loadingIndicatorSource={require('../../images/defaultImage/default_1.png')}/>
};
