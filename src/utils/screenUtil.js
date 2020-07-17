import { Dimensions } from 'react-native'

export const deviceWidth = Dimensions.get('window').width
export const deviceHeight = Dimensions.get('window').height

// rate
const widthRate = deviceWidth / 750
const heightRate = deviceHeight / 1334

/**
 * 判断是否为全面屏
 * @returns {boolean}
 */
export function isFullScreen() {
    // TODO
    return false
}

export function scaleSize(size) {
    return Math.round(widthRate * size)
}

export function scaleHeightSize(size) {
    return Math.round(heightRate * size)
}
