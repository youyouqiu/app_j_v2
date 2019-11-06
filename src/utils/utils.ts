// @ts-ignore
import Permissions from 'react-native-permissions'
import React, {Component} from 'react';
import {Alert, Platform, Linking} from 'react-native'
// @ts-ignore
import OpenSettings from 'react-native-open-settings'
import storage from './storage'
import navigation from './navigation'
import {Toast, Overlay} from 'teaset'
import PopEle from '../components/PopEle'
/**
 * checkPermission
 */
type Statuses = 'authorized' | 'denied' | 'restricted' | 'undetermined'
type PermissionsBasic = 'camera' | 'contacts' | 'event' | 'location' | 'microphone' | 'photo'
type PermissionsIOS = 'backgroundRefresh' | 'bluetooth' | 'mediaLibrary' | 'motion' | 'notification' | 'reminder' | 'speechRecognition'
type PermissionsAndroid = 'coarseLocation' | 'callPhone' | 'readSms' | 'receiveSms' | 'sendSms' | 'storage'

interface CheckPermission {
    (permission: PermissionsBasic | PermissionsIOS | PermissionsAndroid): Promise<boolean>
}

export const checkPermission: CheckPermission = (permission: string) => {
    if (permission === 'location' && Platform.OS === 'android') {
        permission = 'coarseLocation'
    }
    return Permissions.request(permission).then((response: Statuses) => {
        console.log(response)
        if (response === 'authorized') return true
        if (response === 'denied' || response === 'undetermined' || response === 'restricted') { // 用户已拒绝过一次授权
            Alert.alert('提示', '请到设置-应用-铺侦探中开启对应权限', [
                {text: '取消', onPress: () => console.log('Ask me later pressed')},
                {
                    text: '去设置', onPress: () => {
                        if (Platform.OS === 'ios') {
                            Linking.openURL('app-settings:').catch(e => console.log('Open settings error: ', e))
                        } else {
                            OpenSettings.openSettings()
                        }
                    }
                }
            ])
        }
        return false
    }).catch((e: Error) => {
        console.log('Request permissions error: ', e)
        return false
    })
}

/*资讯时间转换*/
export const timeTransform = (publishStampStr: any) => {
    const publishStamp = parseInt(publishStampStr);
    const nowTimeStamp = new Date().getTime();
    const timeDifference = nowTimeStamp - publishStamp;
    //发布时间不超过1分钟：刚刚
    const judge_1 = timeDifference < 60000;
    //发布时间1分钟-1小时（不含）：X分钟前
    const judge_2 = timeDifference >= 60000 && timeDifference < 3600000;
    //今天发布且时间大于1小时（不含）：X小时前
    let judge_3 = false;
    const todayStart = new Date(new Date().toLocaleDateString()).getTime();
    const todayEnd = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1000;
    if (publishStamp >= todayStart && publishStamp <= todayEnd) {
        judge_3 = true
    }
    //昨天发布的：昨天
    let judge_4 = false;
    const yesterdayStart = new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000;
    const yesterdayEnd = new Date(new Date().toLocaleDateString()).getTime() - 1000;
    if (publishStamp >= yesterdayStart && publishStamp <= yesterdayEnd) {
        judge_4 = true
    }

    //昨天以前，格式：年-月-日
    let judge_5 = false;
    const yesterdaybefore = new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000 - 1000;
    if (publishStamp <= yesterdaybefore) {
        judge_5 = true
    }

    if (judge_1) {
        return '刚刚'
    } else if (judge_2) {
        return Math.floor(timeDifference / 60000) + '分钟前'
    } else if (judge_3) {
        return Math.floor(timeDifference / 3600000) + '小时前'
    } else if (judge_4) {
        return '昨天'
    } else if (judge_5) {
        const time = new Date(publishStamp);
        return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
    }
};

/*防抖函数 func：需要执行得方法；wait：多少秒内只执行一次，默认1000000；args：需要传得参数  执行第一次
// * eg： debounce(func,wait)(args)*/
export const debounce = (() => {
    let timeout: any;
    let defaultWait = 1000;
    return function (func: Function, wait = defaultWait) {
        return function (this: any) {
            let context = this;
            let args = arguments;
            if (timeout) clearTimeout(timeout);
            let callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait);
            if (callNow) func.apply(context, args)
        }
    }
})();

/*防抖函数 func：需要执行得方法；wait：多少秒内只执行一次，默认1000000；args：需要传得参数  只执行最后一次
// * eg： debounce(func,wait)(args)*/
export const debounceLast = (() => {
    let timeout: any;
    let defaultWait = 1000;
    return function (func: Function, wait = defaultWait) {
        return function (this: any) {
            let context = this;
            let args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args)
            }, wait);
        }
    }
})();

export const logout = () => {
    storage.set('user', {status: 404, userInfo: {}}) // 设置用户信息的初始化
    navigation.navigate('login') // 退出到登录页面
}

export const shopStatusObj = {
    '1': {text: '期铺'},
    '2': {text: '现铺'}
};
//1:待售,2:在售,3:锁定,4:已认购,10;已售
export const shopSaleStatusObj = {
    '1': {text: '待售', style: {backgroundColor: '#CBCBCB', color: '#868686'}, priceBackgroundColor: '#fff'},
    '2': {text: '在售', style: {backgroundColor: '#56A1F0', color: '#FFFFFF'}, priceBackgroundColor: '#fff'},
    '3': {text: '锁定', style: {backgroundColor: '#56A1F0', color: '#FFFFFF'}, priceBackgroundColor: '#fff'},
    '4': {text: '已认购', style: {backgroundColor: '#56A1F0', color: '#FFFFFF'}, priceBackgroundColor: '#fff'},
    '10': {text: '已售', style: {backgroundColor: '#FF7F6D', color: '#FFFFFF'}, priceBackgroundColor: '#FF7F6D'},
};

export const buildingSaleStatusObj = {
    '1': {text: '在售', style: {color: '#49A1FF', backgroundColor: '#E4F1FF'}},
    '2': {text: '待售', style: {color: '#FE5139', backgroundColor: '#FFDDD8'}},
    '3': {text: '售罄', style: {color: '#CBCBCB', backgroundColor: '#F8F8F8'}},
    '4': {text: '停售', style: {color: '#E58400', backgroundColor: '#FFE3BD'}},
};

/*销讲资料单位转换*/
export const transFormSize = (size: number) => (size > 1024 ? (size / 1024).toFixed(1) + 'M' : size.toFixed(1) + 'kb');

/*资讯浏览量转换*/
export const transFormViewCount = (count: number) => {
    if (count < 10000) {
        return count
    } else if (count > 10000) {
        return (count / 10000).toFixed(0) + '万+'
    }
};

/*提取资讯ID*/
export const extractIdFromUrl = (url: string) => {
    const strArr = url.split('.html')[0].split('/');
    return strArr[strArr.length - 1].split('_')[0];
};

let overlayId: any // 定义
export const closeOverlay = () => {
    Overlay.hide(overlayId)
}

export const verifyUser = (type: string = 'weak', message?: string) => {
    return new Promise((resolve, reject) => {
        let {user = {}} = global.store.getState()
        if (user.status === 200) {
            resolve()
        } else if (user.status === 404) {
            reject(new Error('用户未登录'))
            navigation.navigate('login')
        } else if (user.status === 202) {
            if (type === 'weak') {
                Toast.message(message || '请在完善公司信息之后使用此功能')
            } else if (type === 'stronge') {
                // @ts-ignore
                overlayId = Overlay.show(PopEle(null, '目前该功能仅向合作公司经纪人开放，请谅解', [{
                    text: '取消',
                    onPress: closeOverlay
                }, {
                    text: '去完善',
                    onPress: () => {
                        closeOverlay()
                        navigation.navigate('personalInfo')
                    }
                }]))
            }
            reject(new Error('用户未加入经济公司'))
        }
    })
}
