import React,{Component} from 'react';
import { View } from 'react-native';
import {Modal, StyleSheet} from 'react-native'
import {scaleSize} from '../../utils/screenUtil'
import {connect} from 'react-redux'
import Content from './content'
import Theme from '@new-space/teaset/themes/Theme';


class QuickEntry  extends Component {

    constructor (props) {
        super(props)
    }

    closeQuickModal = () => {
        store.dispatch({type: 'config/updateQuickPage',
            payload: {}
        })
    }

    render () {
        const {visible = false} = this.props
        return <Modal
            animationType="slide"
            visible={visible}
            transparent={true}
        >
            <View
                style={[styles.main, {position: 'relative', backgroundColor: '#fff', zIndex: 10 , paddingTop: scaleSize(190) + Theme.statusBarHeight}]}//
            >
                <Content />
            </View>
        </Modal>
    }
}

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%'
    }
})

const mapStateToProps = ({config})=> {
    return {config}
}
export default connect(mapStateToProps)(QuickEntry)
