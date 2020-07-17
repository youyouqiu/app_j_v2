import React, {Component} from 'react';
import ImageViewer from '@new-space/react-native-image-zoom-viewer';
import {Image,TouchableOpacity,Modal} from 'react-native'
import {scaleSize} from '../../utils/screenUtil';

export default class PhotosPreView  extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {fileList, visible, onClose, index = 0} = this.props;
        let imgs = [];

        fileList.map((item) => {
            imgs.push({url: item.uri || item.fileUrl})
        })

        return (
            <Modal 
                visible={visible} 
                transparent={false}
                onClose={onClose}
                type={'fullScreen'}
                onRequestClose={()=>{
                    onClose && onClose()
                }}
                presentationStyle={'fullScreen'}

            >
                <TouchableOpacity
                    style={{display:'flex',justifyContent:'flex-end',alignItems:'flex-start',backgroundColor:'#000',marginBottom:scaleSize(-2)}}
                    onPress={() => {
                        onClose && onClose()
                    }}
                >
                    <Image
                        style={{width:scaleSize(40),height:scaleSize(40),marginTop:scaleSize(50),marginLeft:scaleSize(32)}}
                        source={require('../../images/icons/back_white.png')}
                    />
                </TouchableOpacity>
                <ImageViewer
                    imageUrls={imgs}
                    index={index}
                    // onClick={onClose}
                />
            </Modal>
        )
    }
}
