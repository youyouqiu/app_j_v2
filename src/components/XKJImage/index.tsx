// 检测图片链接是否能访问
import React, { Component } from 'react';
import { Image, View } from 'react-native';

class XKJImage extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            imgUrl: require('../../images/pictures/personal_man.png'),
        }
    }

    // examineImage = (ImgData: any) => {
    //     let realAvatar = require('../../images/pictures/personal_man.png');
    //     Image.getSize(props.uri, () => {
    //         setSrc({uri: props.uri});
    //     }, () => {
    //         if (props.sex === 1) {
    //             realAvatar = require('../../images/pictures/personal_man.png');
    //         } else {
    //             realAvatar = require('../../images/pictures/personal_woman.png');
    //         }
    //         setSrc(realAvatar)
    //     })
        
    //     return src;
    // }

    onError = (error: any) => {
        console.log(error, 'error');
        if (error) {
            this.setState({
                imgUrl: {uri: this.props.uri},
            })
        }
    }

    render() {
        // let {imgUrl} = this.state;
        console.log(this.props, 'View')
        return (
            // <Image alt='icon' source={imgUrl} onError={this.onError} style={this.props.styles} />
            <View>

            </View>
        )
    }
}

export default XKJImage;
