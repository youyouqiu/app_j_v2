/**
 * Created by Kary on 2019/10/18 14:42.
 */

import { View, ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import {scaleSize} from "../../../utils/screenUtil";
import Theme from '../../../utils/theme'
export default StyleSheet.create({
    flex_1: {
        flex: 1
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column'
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    alignCenter: {
        alignItems: 'center'
    },
    justifyBetween: {
        justifyContent: 'space-between'
    },
    text: {
        color: '#868686',
        marginTop: scaleSize(24)
    },
    container: {
        flex: 1,
        marginTop: scaleSize(20),
        backgroundColor: '#F5FCFF',
    },
    lineStyle: {
        width: scaleSize(32),
        height: scaleSize(2),
        backgroundColor: '#1F3070'
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: scaleSize(28)
    },
    tabView: {
        // borderBottomWidth: scaleSize(10),
        // borderBottomColor: 'red'
    },
    formList: {
        width: '100%',
    },
    formItem: {
        width: '96%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scaleSize(40),
        paddingVertical: scaleSize(8),
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: 1
    },
    formItemInput: {
        paddingVertical: scaleSize(8),
    },
    formItemLabel: {
        fontSize: scaleSize(28),
        fontWeight: 'bold',
        color: '#4D4D4D',
        width: scaleSize(160),
        lineHeight: scaleSize(56)
    },
    formItemUnit: {
        color: '#d3d3d3',
        fontSize: scaleSize(28)
    },
    value: {
        fontSize: scaleSize(28),
        color: '#4D4D4D',
    },
    arrow: {
        marginLeft: 'auto',
        width: scaleSize(25),
        height: scaleSize(25)
    },
    split: {
        height: scaleSize(20),
        width: '100%',
        backgroundColor: '#f3f3f3'
    },
    inputView: {
        borderBottomWidth: scaleSize(0),
        marginRight: scaleSize(5)
        // height: scaleSize(55)
    },
    picker: {
        width: '100%',
        height: Theme.Input.defaultHeight
    },
    btn: {
        height: scaleSize(108),
        width: '92%',
        marginTop: scaleSize(50),
        // marginLeft: scaleSize(32),
        // marginRight: scaleSize(32),
        backgroundColor: 'rgba(31,48,112,1)',
        borderRadius: scaleSize(8),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        letterSpacing: scaleSize(3),
        color: '#FFF',
        fontSize: scaleSize(32)
    },
    btnDisabled: {
        opacity: 0.7
    },

    counterResultPage: {
        paddingHorizontal: scaleSize(40),
        alignItems: 'center',
        flex: 1
    },
    cardView: {
        width: scaleSize(670),
        borderRadius: scaleSize(16),
        marginTop: scaleSize(40),
        paddingVertical: scaleSize(30),
        paddingHorizontal: scaleSize(10),
        justifyContent: 'space-between',
        backgroundColor: 'rgb(7, 56, 123)'
    },
    monthStillTitle: {
        color: '#fff',
        fontSize: scaleSize(20),
        textAlign: 'center',
        display: 'flex'
    },
    monthStillView: {
        width: '100%',
        justifyContent: 'center',
        marginTop: scaleSize(5),
        marginBottom: scaleSize(5),
        alignItems: 'flex-end',
        display: 'flex',
        flexDirection: 'row'
    },
    monthStill: {
        marginRight: scaleSize(10),
        fontSize: scaleSize(38),
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
    },
    monthStillUnit: {
        fontSize: scaleSize(20),
        color: '#fff',
        marginBottom: scaleSize(5)
    },
    bottom_6: {
        position: 'relative',
        bottom: scaleSize(6),
    },
    cardItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: scaleSize(20)
    },
    cardItem: {
        // width: scaleSize(102),
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardItemTitle: {
        color: '#d3d3d3',
        fontSize: scaleSize(20),
        marginBottom: scaleSize(10)
    },
    cardItemValue: {
        color: '#fff',
        fontSize: scaleSize(28)
    },
    line: {
        width: 1,
        height: scaleSize(60),
        backgroundColor: '#d3d3d3',
        marginHorizontal: scaleSize(10)
    },
    tipsView: {
        marginVertical: scaleSize(40),
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    tipsTheme: {
        color: '#324887',
        fontSize: scaleSize(28),
        fontWeight: 'bold'
    },
    tipsText: {
        color: '#4D4D4D',
        fontSize: scaleSize(28)
    },
    tableThText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: scaleSize(26),
    },
    tableTrText: {
        color: '#4D4D4D',
        fontSize: scaleSize(24),
        display: 'flex',
        width: scaleSize(140)
    },
    tableTr: {
        width: '100%',
        paddingVertical: scaleSize(25),
        paddingHorizontal: scaleSize(10)
    },
    tableTrSingle: {
        backgroundColor: '#f3f3f3',
    }

})
