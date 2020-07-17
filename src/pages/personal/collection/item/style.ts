/**
 * Created by Kary on 2020/05/06 17:05.
 */

import {StyleSheet} from 'react-native'
import {scaleSize} from "@/utils/screenUtil";


export default StyleSheet.create({
    'flex-row': {
        display: 'flex',
        flexDirection: 'row'
    },
    'align-items-center': {
        alignItems: 'center'
    },
    'content': {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        // paddingHorizontal: scaleSize(32),
        // paddingVertical: scaleSize(24),
        // borderBottomWidth: StyleSheet.hairlineWidth,
        // borderBottomColor: '#EAEAEA'
    },
    'content-left': {
        width: scaleSize(240),
        height: scaleSize(186),
        marginRight: scaleSize(24),
        backgroundColor: '#f3f3f3'
    },
    'content-right': {
        flex: 1,
        // backgroundColor: '#f3f3f3',
    },
    'build-state': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: scaleSize(16),
        width: '100%',
    },
    'build-name': {
        fontSize: scaleSize(32),
        color: '#000',
        flex: 1
    },
    'build-tag': {
        // justifyContent: 'center',
        // alignItems: 'center',
        // display: 'flex',
        textAlign: 'center',
        lineHeight: scaleSize(33),
        // paddingVertical: scaleSize(4),
        // paddingHorizontal: scaleSize(8),
        backgroundColor: '#F4F5F9',
        color: '#1F3070',
        marginLeft: scaleSize(20),
        width: scaleSize(64),
        height: scaleSize(33),
    },
    'price-cont': {
        marginBottom: scaleSize(8)
    },
    'price': {
        color: '#FE5139',
        fontSize: scaleSize(32),
        marginRight: scaleSize(10)
    },
    'quantity': {
        color: '#868686',
        fontSize: scaleSize(24),
    },
    'tags': {
        width: '100%',
        alignSelf: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaleSize(12),
        marginBottom: scaleSize(12)
    },
    'tag-1': {
        width: scaleSize(76),
        height: scaleSize(33),
        marginRight: scaleSize(8)
    },
    'tag-2': {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scaleSize(8),
        paddingVertical: scaleSize(4),
        backgroundColor: '#CDD8FF',
        color: '#1F3070',
        marginRight: scaleSize(8)
    },
    'tag-3': {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: scaleSize(4),
        paddingHorizontal: scaleSize(8),
        backgroundColor: '#F4F5F9',
        color: '#1F3070'
    },
    'discount-1': {
        color: '#FE5139',
        backgroundColor: '#FFE8E4',
        width: 'auto',
        paddingHorizontal: scaleSize(8),
        paddingVertical: scaleSize(8)
    },
    'text-86': {
        fontSize: scaleSize(24),
        color: '#868686'
    },
    'discount-cont': {
        alignSelf: 'flex-start',
    },
    'select': {
        display: 'flex',
        width: scaleSize(40),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:scaleSize(20)
    },
    'checked-img': {
        width: scaleSize(30),
        height: scaleSize(30),
    },
});
