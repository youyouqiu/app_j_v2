import React, { FunctionComponent, useState } from 'react'
import { Modal, View, ImageBackground, Text, ScrollView, StyleSheet } from 'react-native'
import { scaleSize } from '../../../utils/screenUtil'
import * as Progress from 'react-native-progress';
import Button from '../../../components/Button'
import codePush from "react-native-code-push";
import storage from '../../../utils/storage'


interface updateType {
    updateInfo: any
    setUpdateModa: any
    visible: boolean
}

const updateModal: FunctionComponent<updateType> = ({ updateInfo, setUpdateModa, visible }) => {
    const [immediateUpdate, setImmediateUpdate] = useState(false)
    const [downloadingPercent, setDownloadingPercent] = useState(0)
    let updating = false

    const codePushStatusDidChange = (status: any) => {
        switch (status) {
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                setImmediateUpdate(true)
                setDownloadingPercent(0)
                break;
            case codePush.SyncStatus.INSTALLING_UPDATE:
                setImmediateUpdate(false)
                break;
        }
    }

    const codePushDownloadDidProgress = (progress: any) => {
        let p: any = progress.receivedBytes / progress.totalBytes;
        let pv = p;
        p = (p * 100).toFixed(0);
        if (pv == 1 || pv > 1) {
            setUpdateModa(false)
            updating = false
            storage.remove('initFirst')
        }
        setDownloadingPercent(pv)
    }

    const _immediateUpdate = () => {
        if (updating) {
            return
        }
        if (updateInfo.isPending) {
            codePush.restartApp()
        }
        try {
            updating = true;
            codePush.sync(
                { installMode: codePush.InstallMode.IMMEDIATE },
                codePushStatusDidChange,
                codePushDownloadDidProgress
            )
        } catch (e) {
            console.log(e)
        }
    }
    return <Modal
        visible={visible}
        transparent={true}
    >
        <View style={styles.modal}>
            <View style={styles.realModal}>
                <ImageBackground style={styles.modalBg} source={require('../../../images/pictures/updateTop.png')} >
                </ImageBackground>
                <View style={styles.realModalContent}>
                    <View style={{ display: "flex", flexDirection: 'column' }}>
                        <View style={styles.content}>
                            <View style={styles.contentHeader}>
                                <Text style={styles.contentHeaderText}>新版本特性</Text>
                            </View>
                            <ScrollView>
                                <Text style={styles.contentText}>{updateInfo.isPending ? '已下载更新，立即重启' : updateInfo.description || '暂无说明'}</Text>
                            </ScrollView>
                        </View>
                    </View>
                    {
                        immediateUpdate
                            ?
                            <View style={styles.modalFooter}>
                                <Progress.Circle
                                    size={scaleSize(80)}
                                    progress={downloadingPercent}
                                    showsText={true}
                                    textStyle={{ fontSize: 14 }}
                                    color='#4B6AC5'
                                    indeterminate={false}
                                />
                            </View>
                            :
                            <View style={styles.modalFooter}>
                                <Button onPress={() => setUpdateModa ? setUpdateModa(false) : null} style={styles.btnStyle} type='normal' title='稍后再说' />
                                <Button onPress={_immediateUpdate} style={styles.btnStyle} title={updateInfo.isPending ? '立即重启' : '立即下载'} />
                            </View>
                    }
                </View>
            </View>
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    contentText: {
        lineHeight: 20,
        color: "#92979E"
    },
    realModalContent: {
        width: '100%',
        // height: scaleSize(500),
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: scaleSize(24),
        borderBottomLeftRadius: scaleSize(24),
        borderBottomRightRadius: scaleSize(24)
    },
    contentHeaderText: {
        color: '#1F3070',
        fontSize: scaleSize(26)
    },
    contentHeader: {
        width: '100%',
        // padding: scaleSize()
        marginBottom: scaleSize(32)
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxHeight: scaleSize(450),
        minHeight: scaleSize(300),
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32),
        paddingTop: scaleSize(32),
        // flex: 1,
        alignItems: 'center',
    },
    modalFooter: {
        display: 'flex',
        flex: 0,
        flexDirection: 'row',
        marginTop: scaleSize(32),
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    btnStyle: {
        borderRadius: scaleSize(44),
        width: scaleSize(244),
        height: scaleSize(72)
    },
    modalBg: {
        width: scaleSize(540),
        height: scaleSize(204),
    },
    modal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#000000AA'
    },
    realModal: {
        width: scaleSize(540),
        // flex: 1,
        borderRadius: scaleSize(24),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btn: {
        width: scaleSize(566),
        height: scaleSize(104),
        backgroundColor: '#3AD047'
    },
    footer: {
        marginTop: scaleSize(64),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default updateModal