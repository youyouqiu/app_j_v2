import React, {Component} from 'react'
import {Linking, StyleSheet, TouchableOpacity, Text} from 'react-native'
import {connect} from 'react-redux'
import Scan from "../../../components/scan";
import BaseContainer from "../../../components/Page";
import {Toast} from '@new-space/teaset'
import {ToastCallback} from "../../../components/ToastCallback/ToastCallback";
import scanService from '../../../services/scanService'
import ImagePicker from "react-native-image-crop-picker";
import {debounce} from '../../../utils/utils'
import LocalBarcodeRecognizer from 'react-native-local-barcode-recognizer';
import {checkPermission} from "../../../utils/utils";
import {scaleSize} from '../../../utils/screenUtil'

// import LocalBarcodeRecognizer from 'react-native-local-barcode-recognizer';

/**
 * getCodeCurrentInfo(data) 在进入个页面的时候需要传入的参数{getInfo: getCodeCurrentInfo, noBack?:Boolean}
 */
class ScanPage extends Component {

    scanRef = null;

    constructor() {
        super();
        this.state = {
            visible: false,
            companyInfo: {},
            registerInfo: null,
            countDown: 5,
            openTorach: false,
            joinSuccess: false
        };
        this.common = {
            filialeId: '',
            interval: null
        };
    }

    analysisCode = (data) => {
        let getCodeCurrentInfo = (this.props.navigation.state.params || {}).getInfo;
        let noBack = (this.props.navigation.state.params || {}).noBack;
        if (data === '') {
            this.startScan();
            ToastCallback.message('无法识别二维码', null, null);
            return
        }
        if (data.indexOf('https://') >= 0 || data.indexOf('http://') >= 0 || data.indexOf('HTTPS://') >= 0 || data.indexOf('HTTP://') >= 0) {
            if (data.indexOf('registered.html?id=') >= 0) {
                const strIndex = data.indexOf('id=');
                data = data.substring(strIndex + 3);
            } else {
                Linking.openURL(data).catch(err => {
                    this.startScan();
                    ToastCallback.message(`无法识别二维码${err.message}`, 2, null, false)
                });
                return
            }
        }
        if (getCodeCurrentInfo) { // 业务逻辑放到外面页面去
            debounce(getCodeCurrentInfo, 500)(data)
            if (!noBack) {
                this.props.navigation.goBack()
            }
        }
    };

    onBarCodeRead = (e) => {
        let data = e.nativeEvent.data.code;
        this.stopScan();
        this.analysisCode(data)
    };

    recoginze = async (imageBase64) => {
        try {
            let result = await LocalBarcodeRecognizer.decode(imageBase64, {codeTypes: ['ean13', 'qr']});
            this.analysisCode(result)
        } catch (e) {
            console.log(e)
        }
    };

    showAgreement = () => {
        const {user, userInfo} = this.props;
        if (user.loginStatue === 401) {
            this.modalClose('请先登录，再加入公司');
            return
        } else if (userInfo.FilialeId && userInfo.FilialeId !== 10000) {
            this.modalClose('您已有归属公司');
            return
        }
        this.joinCompany();
    };

    joinCompany = async () => {
        const {filialeId} = this.common;
        const {userInfo} = this.props;
        const {companyInfo = {}} = this.state;
        const requestData = {
            id: userInfo.sub,
            phoneNumber: userInfo.Phone,
            UserName: userInfo.name,
            organizationId: filialeId,
            filialeId: filialeId,
            invitePeopleId: companyInfo.invitePeopleId,
            invitePeople: companyInfo.invitePeople
        };
        const responseData = scanService.scanRegister(requestData).catch(err=>{
            console.log('1111',err)
        });
        if (responseData.data.code === 0) {
            this.setState({joinSuccess: true});
        } else {
            this.modalClose(responseData.data.message)
        }
        this.startScan();
    };

    modalClose = (toastInfo) => {
        this.setState({visible: false, showAgreement: false, countDown: 5}, () => {
            this.startScan();
            toastInfo ? ToastCallback.message(toastInfo, null, this.startScan()) : null

        })
    };

    startScan = () => this.scanRef ? this.scanRef.startScan() : null;

    stopScan = () => this.scanRef ? this.scanRef.stopScan() : null;

    openPhoto = async () => {
        const res = await checkPermission('photo');
        if (!res) return;
        this.stopScan();
        let options = {
            width: 300,
            height: 400,
            cropping: false,
            compressImageQuality: 0.3,
            includeBase64: true
        };
        ImagePicker.openPicker(options).then(response => {
            this.recoginze(response.data);
        }).catch((e) => {
            console.log(e)
            setTimeout(this.startScan, 1000)
        });
    };

    render() {
        const renderRight = (
            <TouchableOpacity style={styles.cs_photo} onPress={this.openPhoto}>
                <Text>相册</Text>
            </TouchableOpacity>
        );
        return (
            <BaseContainer rightView={renderRight} title='扫一扫' statusBarColor='#fff' scroll={false} bodyStyle={{padding: 0}}>
                <Scan onBarCodeRead={this.onBarCodeRead} scanRef={ref => this.scanRef = ref}/>
            </BaseContainer>

        )
    }
}

const styles = StyleSheet.create({
    cs_photo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: scaleSize(32),
        paddingLeft: scaleSize(32)
    },
})

const mapStateToProps = ({config}) => {

    return {config}
};

export default connect(mapStateToProps)(ScanPage)
