import React, {Component} from 'react'
import {Text, View} from 'react-native'
import Barcode from "react-native-smart-barcode";
import {scanStyle} from "../../pages/publicPages/scan/styles";
import {scaleSize} from "../../utils/screenUtil";

/**
 * fix bug: react-native-smart-barcode #46
 * undefined is not an object (evaluating 'BarcodeManager.barCodeTypes')
 * barCodeTypes = oneOf([
 *   0: "org.gs1.EAN-8"
 *   1: "org.gs1.EAN-13"
 *   2: "org.iso.Aztec"
 *   3: "org.iso.QRCode"
 *   4: "org.iso.PDF417"
 *   5: "org.iso.Code128"
 *   6: "org.iso.Code39"
 *   7: "com.intermec.Code93"
 *   8: "org.gs1.UPC-E"
 *   9: "org.iso.Code39Mod43"
 * ])
 */

const barcodeSize = scaleSize(420);

class Scan extends Component {

    barcodeRef = null;

    onBarCodeRead = (e) => {
        const {onBarCodeRead} = this.props;
        onBarCodeRead ? onBarCodeRead(e) : null;
    };

    componentDidMount() {
        const {scanRef} = this.props;
        scanRef ? scanRef(this.barcodeRef) : null
    }

    startScan = () => {
        this.barcodeRef && this.barcodeRef.startScan()
    };

    stopScan = () => {
        this.barcodeRef && this.barcodeRef.stopScan()
    };

    render() {
        return (
            <View style={scanStyle.wrapper}>
                <Barcode style={scanStyle.content} scannerRectWidth={barcodeSize}
                         scannerRectHeight={barcodeSize} ref={ref => this.barcodeRef = ref}
                         onBarCodeRead={(e) => this.onBarCodeRead(e)}
                         barCodeTypes={['org.iso.QRCode']}/>
                <View style={scanStyle.coverContent}>
                    <Text style={scanStyle.tips}>将二维码放入框内，即可自动扫描</Text>
                </View>
            </View>
        )
    }
}

export default Scan
