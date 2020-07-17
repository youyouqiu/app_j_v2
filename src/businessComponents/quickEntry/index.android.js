import React,{Component} from 'react';
import {Modal, StyleSheet, findNodeHandle, View} from 'react-native'
import {scaleSize} from '../../utils/screenUtil'
import {connect} from 'react-redux'
import Content from './content'
import Theme from '@new-space/teaset/themes/Theme';


class QuickEntry  extends Component {

    constructor (props) {
        super(props)
        this.content = null
        this.state = {
            viewRef: null
        }
    }

    closeQuickModal = () => {
        store.dispatch({type: 'config/updateQuickPage',
            payload: {}
        })
    }

    onLoadEnd = () => {
        this.setState({ viewRef: findNodeHandle(this.content) })
    }

    render () {
        const {visible = false} = this.props
        // const {viewRef} = this.state;
        // if (!visible) return null;
        return <Modal
            animationType="slide"
            visible={visible}
            transparent={true}
            style={[styles.main]}
        >
            <View
                style={[styles.main, {position: 'relative', backgroundColor: 'rgba(255,255,255,0.98)', zIndex: 10 , paddingTop: scaleSize(162) + Theme.statusBarHeight}]}//
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
    },
    absolute: {
        position: "absolute",
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
})

const mapStateToProps = ({config})=> {
    return {config}
}
export default connect(mapStateToProps)(QuickEntry)