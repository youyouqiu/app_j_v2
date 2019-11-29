import React, { Component } from 'react'
import { scaleSize } from '../../../../utils/screenUtil'
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native'
import Theme from "teaset/themes/Theme";

const SORT = require('../../../../images/icons/cusSort.png')

const styles = StyleSheet.create({
    modalBg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Theme.navBarContentHeight + Theme.statusBarHeight+scaleSize(152)
    },
    selectWrap: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: scaleSize(8)
    },
    selectOne: {
        width: '100%',
        height: scaleSize(109),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1
    },
    selectedOneText: {
        color: '#1F3070',
        fontSize: scaleSize(28),
    },
    sortImg: {
        width: scaleSize(30),
        height: scaleSize(30),
        marginLeft: scaleSize(32)
    },
    selectOneText: {
        color: '#868686',
        fontSize: scaleSize(28),
        marginLeft: scaleSize(17)
    },
})

class CusSearchItem extends Component {

    constructor(props) {
        super(props)
        this.baseHeight = Theme.navBarContentHeight + Theme.statusBarHeight + scaleSize(96);
        this.state = {}
    }

    componentDidMount() {
    }

    handleSelectOne = (item) => {
        let { onChange, onClose } = this.props
        if (onChange) {
            onChange(item)
        }
        onClose()
    }

    closeModal = () => {
        let { onClose } = this.props
        if (onClose) {
            onClose()
        }
    }

    selectContent = () => {
        let { data, selectCode } = this.props
        data = data.map((item) => {
            if (selectCode === item.value) {
                item.isSelet = true
            } else {
                item.isSelet = false
            }
            return item
        })
        return (
            <TouchableOpacity onPress={this.closeModal}>
                <View style={{ height: '100%', flexDirection: 'column' }}>
                    <View style={styles.modalBg}>
                        <View style={styles.selectWrap}>
                            {
                                data && data.map((item, key) => {
                                    return (
                                        <TouchableOpacity
                                            key={key}
                                            style={[styles.selectOne]}
                                            activeOpacity={0.8}
                                            onPress={() => this.handleSelectOne(item)}
                                        >
                                            <Image source={SORT} style={styles.sortImg} />
                                            <Text style={[ item.isSelet ? styles.selectedOneText : styles.selectOneText]}>{item.label}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>


                    </View>
                    <View style={{ flex: 1, backgroundColor: '#000000AA' }}></View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        let { onClose, visible, transparent } = this.props;
        let renderContent = this.selectContent()

        return (
            // visible ? {renderContent} : null
            <Modal
                visible={visible}
                transparent={transparent || true}
                onClose={onClose}
            >
                {renderContent}
            </Modal>
        )
    }
}


export default CusSearchItem
