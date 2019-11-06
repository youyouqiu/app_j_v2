// 检测图片链接是否能访问
import { Image } from 'react-native';
import React from 'react';

// let imgData = {
//     styles: styles.avatar,
//     uri: userInfo.avatar,
//     sex: userInfo.sex,
// };

export const XKJImage = (props: any) => {
    console.log(props, 'props');
    let realAvatar = require('../../images/pictures/personal_man.png');
    Image.getSize(props.uri, (width: number, height: number) => {
        console.log(width, height, 'width - height');
        realAvatar = {uri: props.uri};
    }, (error: any) => {
        console.log(error, 'error');
        if (props.sex === 1) {
            realAvatar = require('../../images/pictures/personal_man.png');
        } else {
            realAvatar = require('../../images/pictures/personal_woman.png');
        }
    })
    
    return <Image style={props.styles} source={realAvatar} />
}
