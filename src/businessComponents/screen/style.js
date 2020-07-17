import {scaleSize} from '../../utils/screenUtil'
import {StyleSheet} from 'react-native'

export const screenStyles = StyleSheet.create({
        ItemBox: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: '#EAEAEA'
        },
        topBox: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: '#EAEAEA',
            borderBottomWidth: StyleSheet.hairlineWidth,
            position: 'relative',
            height: scaleSize(100),
        },
        topContent: {
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: scaleSize(30),
            paddingBottom: scaleSize(30)
        },
        topIcon: {
            width: scaleSize(20),
            height: scaleSize(20),
            marginLeft: scaleSize(8)
        },
        titleText: {
            color: '#000000',
            fontSize: scaleSize(24),
            fontWeight: 'bold'
        },
        contentBox: {
            display: 'flex',
            flex: 1,
        },
        sortBox: {
            height: scaleSize(88),
            borderColor: '#EAEAEA',
            borderBottomWidth: 1,
            paddingLeft: scaleSize(32),
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row'
        },
        sortIcon: {
            width: scaleSize(30),
            height: scaleSize(30),
            marginRight: scaleSize(16)
        },
        selectItem: {
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: '#EAEAEA',
            paddingTop: scaleSize(30),
            paddingBottom: scaleSize(30),
            paddingLeft: scaleSize(30),
        },
        item: {
            borderRightWidth: 1,
            borderColor: '#EAEAEA',
            paddingTop: scaleSize(30),
            paddingBottom: scaleSize(30),
            paddingLeft: scaleSize(30),
        },

    }
);
