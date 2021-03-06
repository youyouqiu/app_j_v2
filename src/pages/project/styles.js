import {deviceWidth, scaleSize} from "../../utils/screenUtil";
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    fy_contentView: {
        height: scaleSize(268),
        marginTop: scaleSize(20),
        paddingBottom: scaleSize(24),
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1
    },
    fy_buildingItem: {
        borderBottomWidth: scaleSize(2),
        borderBottomColor: '#EAEAEA',
        paddingLeft: scaleSize(32),
        paddingTop: scaleSize(12),
        paddingRight: scaleSize(32),
        paddingBottom: scaleSize(11)
    },
    fy_buildingImage: {
        width: deviceWidth - scaleSize(64),
        height: (deviceWidth - scaleSize(64)) * 144 / 343,
        borderRadius: scaleSize(10)
    },
    fy_bannerContent: {
        flexDirection: 'row',
        paddingRight: scaleSize(20),
        paddingLeft: scaleSize(20),
        paddingTop: scaleSize(20),
        paddingBottom: scaleSize(12),
    },
    fy_bannerItem: {
        paddingRight: scaleSize(12),
        paddingLeft: scaleSize(12)
    },
    fy_recommend: {
        marginLeft: scaleSize(32),
        flexDirection: 'row',
        alignItems: 'center',
        // paddingTop: scaleSize(16),
        // paddingBottom: scaleSize(16),
        marginRight: scaleSize(32),
    },
    fy_recommendLeft: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: scaleSize(32),
        flex: 1
    }
});
export default styles
