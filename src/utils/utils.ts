// @ts-ignore
import Permissions from 'react-native-permissions'
import {Alert, Linking, Platform} from 'react-native'
// @ts-ignore
import OpenSettings from 'react-native-open-settings'
import storage from './storage'
import navigation from './navigation'
import {Overlay, Toast} from '@new-space/teaset'
import PopEle from '../components/PopEle'
import moment from 'moment'
import {useEffect, useMemo, useState} from "react";

/**
 * checkPermission
 */
type Statuses = 'authorized' | 'denied' | 'restricted' | 'undetermined'
type PermissionsBasic = 'camera' | 'contacts' | 'event' | 'location' | 'microphone' | 'photo'
type PermissionsIOS = 'backgroundRefresh' | 'bluetooth' | 'mediaLibrary' | 'motion' | 'notification' | 'reminder' | 'speechRecognition'
type PermissionsAndroid = 'coarseLocation' | 'callPhone' | 'readSms' | 'receiveSms' | 'sendSms' | 'storage'

interface CheckPermission {
  (permission: PermissionsBasic | PermissionsIOS | PermissionsAndroid, timeout?: number, b?: boolean): Promise<boolean>
}

export const checkPermission: CheckPermission = (permission: string, timeout?: number, isAsk?: boolean) => {
  if (permission === 'location' && Platform.OS === 'android') {
    permission = 'coarseLocation'
  }
  return Permissions.request(permission).then((response: Statuses) => {
    console.log(response)
    if (response === 'authorized') return true;
    if (isAsk && (response === 'denied' || response === 'undetermined' || response === 'restricted')) {// 用户已拒绝过一次授权
      setTimeout(() => {
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
      }, timeout || 0)
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

/*防抖函数 func：需要执行得方法；wait：多少秒内只执行一次，默认1000；args：需要传得参数  执行第一次
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

/*防抖函数 func：需要执行得方法；wait：多少秒内只执行一次，默认1000；args：需要传得参数  只执行最后一次
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

/**
 * 检测是否为文章链接，是则返回文章ID
 * @param url
 */
export const checkArticleUrl = (url: string): string => {
  const local = 'http://192.168.100.159:5100';
  const localTest = 'http://192.168.100.159:5100';
  const test = 'https://stagging-file.puzhentan.com';
  const production1 = 'https://file.puzhentan.com';
  const production2 = 'https://file-v2.puzhentan.com';
  const domainNames = [local, localTest, test, production1, production2];
  let articleId = '';
  //判断是否为本公司url
  const isOwnUrl = domainNames.some((name: any) => {
    return url.includes(name)
  });
  if (isOwnUrl && url.includes('/html/') && url.includes('.html')) {
    articleId = extractIdFromUrl(url)
  }
  return articleId
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

type VerifyUserTypes = 'weak' | 'stronge' | 'noVerifyFree'

export const verifyUser = (type: VerifyUserTypes = 'weak', message?: string, content?: Element, verifyName?: boolean) => {
  return new Promise((resolve, reject) => {
    let {user = {}} = global.store.getState()
    let {userInfo = {}} = user
    console.log(user)
    if (user.status === 200) {
      if (verifyName && !userInfo.trueName) {
        overlayId = Overlay.show(PopEle(null, content || '请完善个人真实姓名', [{
          text: '取消',
          onPress: closeOverlay
        }, {
          text: '去完善',
          onPress: () => {
            closeOverlay()
            navigation.navigate('personalInfo')
          }
        }]))
        reject(new Error('用户没有真实姓名'))
      }
      // resolve()
      resolve(true)
    } else if (user.status === 404) {
      reject(new Error('用户未登录'))
      navigation.navigate('login')
    } else if (user.status === 202) {
      if (type === 'weak') {
        Toast.message(message || '请在完善公司信息之后使用此功能')
      } else if (type === 'stronge') {
        // @ts-ignore
        overlayId = Overlay.show(PopEle(null, content || '目前该功能仅向合作公司经纪人开放，请谅解', [{
          text: '取消',
          onPress: closeOverlay
        }, {
          text: '去完善',
          onPress: () => {
            closeOverlay()
            navigation.navigate('personalInfo')
          }
        }]))
      } else if (type === 'noVerifyFree') {
        // ... 不处理
        resolve()
      }
      reject(new Error('用户未加入经济公司'))
    }
  })
}

/**
 * 去除对象中所有符合条件的对象
 * @param {Object} obj 来源对象
 * @param {Function} fn 函数验证每个字段
 */
export function compactObj(obj: { [key: string]: any }, fn: (foo: any) => boolean) {
  for (let i in obj) {
    if (typeof obj[i] === 'object') {
      compactObj(obj[i], fn)
    }
    if (fn(obj[i])) {
      delete obj[i]
    }
  }
}

// 判断对象是否为空（浅判断）
export function isEmpty(foo: any): boolean {
  if (typeof foo === 'object') {
    for (let i in foo) {
      return false
    }
    return true
  } else {
    return foo === '' || foo === undefined || foo === null
  }
}

// 判断对象是否为空（内部也全为'',undefind,null）
export function isEmptyDeep(foo: any): boolean {
  if (typeof foo === 'object') {
    if (foo === null) return true
    if (Array.isArray(foo)) return false
    return Object.keys(foo).every(k => isEmptyDeep(foo[k]))
  } else {
    return foo === '' || foo === undefined || foo === null
  }
}

export interface CheckBlankParams {
  value: any
  unit?: string
  boolLabel?: string[]
  func?: (...a: any[]) => void
  isMoment?: boolean
  basicInfo?: any
  key?: string
  dictionary?: any
}

export const checkBlank = ({value, unit = '', boolLabel, func, isMoment, basicInfo, key, dictionary}: CheckBlankParams) => {
  if (func && key) {
    if (key.includes(',')) {
      let keys = key.split(',')
      keys = keys.map(v => basicInfo[v] || '')
      return func(...keys)
    } else {
      return func(basicInfo[key])
    }
  }
  if (dictionary) {
    let {dictionaries = {}} = global.store.getState()
    return (dictionaries[`${dictionary.toLowerCase()}_obj`] || {})[value]
  }
  if (isMoment) {
    return value ? moment(value).format('YYYY-MM-DD') : ''
  }
  if (boolLabel) {
    return value ? boolLabel[0] : boolLabel[1]
  }
  if (typeof (value) === 'number') {
    return value + unit
  }
  return value ? value + unit : ''
};

export const returnFloatStr = (value: string | number, decimal: number): string => {
  if (typeof value === 'string') {
    value = parseFloat(value)
  }
  if (value === 0) return `0.${new Array(decimal + 1).join('0')}`
  if (value.toString() === 'NaN') return 'NaN'
  value = value * 10 ** decimal
  value = parseInt(value.toString()).toString()
  return `${value.slice(0, value.length - decimal)}.${value.slice(value.length - decimal)}`
};

/**
 * 复制报备缓存的时间文案
 */
export const timeToString = (timeStamp: any): string => {
  const currentTimeStamp = new Date().getTime();

  //当天天0点的时间戳
  const todayStartStamp = moment().startOf('day').valueOf();

  //当天24点的时间戳
  const todayEndStamp = moment().endOf('day').valueOf();

  //昨天天0点的时间戳
  const yesterdayStartStamp = todayStartStamp - 24 * 60 * 60 * 1000;

  //昨天24点的时间戳
  const yesterdayEndStamp = todayEndStamp - 24 * 60 * 60 * 1000;

  /*当天则显示为 HH:mm*/
  if (timeStamp > todayStartStamp) {
    return moment(timeStamp).format('HH:mm')
  }

  /*昨天则显示为 昨天HH:mm*/
  if (moment(timeStamp).isBetween(yesterdayStartStamp, yesterdayEndStamp)) {
    return '昨天' + moment(timeStamp).format('HH:mm')
  }

  /*昨天之前，今年之内 MM-DD HH:mm*/
  if (moment(timeStamp).isBefore(yesterdayStartStamp) && moment(timeStamp).year() === moment().year()) {
    return moment(timeStamp).format('MM-DD HH:mm')
  }

  /*今年之前*/
  if (moment(timeStamp).year() < moment().year()) {
    return moment(timeStamp).format('YYYY-MM-DD HH:mm')
  }

  return ''

};

/**
 * 获取url参数
 * @param url
 */
export const getUrlParams = (url: string) => {
  let paramsArray: Array<{ key: any, value: any }> = [];
  let paramsObj: any = {};
  try {
    if (!url.includes('?')) return [paramsArray, paramsObj];
    const paramsStr: string = url.split('?')[1];
    const paramsArr: Array<string> = paramsStr.split('&');
    paramsArr.forEach(item => {
      const paramsItem = item.split('=');
      const obj = {key: paramsItem[0], value: paramsItem[1]};
      paramsArray.push(obj);
      paramsObj[paramsItem[0]] = paramsItem[1]
    });
    return [paramsArray, paramsObj]
  } catch (e) {
    return [paramsArray, paramsObj];
  }
};

/**
 * 给url添加或修改参数
 * @param url
 * @param params  需要添加的参数[{key:'', value:''},{key:'',value:''}]
 * @param replace 是否覆盖参数
 */
export const updateUrlParams = (url: string = '', params: Array<{ key: any, value: any }> = [], replace?: boolean) => {
  const urlParamsArray = getUrlParams(url)[0];
  const urlParamsObj = getUrlParams(url)[1];
  if (urlParamsArray.length === 0) {
    params.forEach((item, idx) => {
      url = `${url}?${idx > 0 ? '&' : ''}${item.key}=${item.value}`
    });
    return url
  } else {
    let urlNoParams = url.split('?')[0];
    let _urlParams = '?';
    params.forEach((item, idx) => {
      if (urlParamsObj.hasOwnProperty(item.key)) {
        if (replace) urlParamsObj[item.key] = item.value
      } else {
        urlParamsObj[item.key] = item.value
      }
    });
    for (let urlParamsObjKey in urlParamsObj) {
      if (urlParamsObj.hasOwnProperty(urlParamsObjKey)) _urlParams = _urlParams + `${urlParamsObjKey}=${urlParamsObj[urlParamsObjKey]}&`
    }
    let _url = urlNoParams + _urlParams;
    return _url.substr(0, _url.length - 1)
  }
};


/**
 * 根据管理端“确认认购”之后的流程客户姓名可以<=25位的调整需求
 * @param customerName 客户姓名
 * @param num 需展示的客户姓名字数
 */
export const customerNameSubstring = (customerName: string = '', num: number = 3) => {
  customerName = customerName.replace(/\s*'/g, '');
  if (customerName.length <= num) return customerName;
  //用数组的形式为了防止customerName包含表情
  const arr = Array.from(customerName);
  return arr.slice(0, num).join('') + '...'
};

/**
 * 数字星期转汉字星期
 * @param week
 */
export const weekNumTransToCN = (week: string | number) => {
  let weekCN = '';
  switch (week) {
    case 1 || '1':
      weekCN = '一';
      break;
    case 2 || '2':
      weekCN = '二';
      break;
    case 3 || '3':
      weekCN = '三';
      break;
    case 4 || '4':
      weekCN = '四';
      break;
    case 5 || '5':
      weekCN = '五';
      break;
    case 6 || '6':
      weekCN = '六';
      break;
    case 7 || '7':
      weekCN = '日';
      break;
    default:
      weekCN = '一'
  }
  return weekCN
};

export interface stateType<T> {
  value: T,
  resolve: (params: T) => void
}

export function useStateWithPromise<T>(initValue: T) {

  const [state, setState] = useState<stateType<T>>({
    value: initValue,
    resolve: (params: T) => null
  });

  useEffect(() => {
    state.resolve(state.value)
  }, [state]);

  const updateState = (updater: T) => {
    return new Promise(resolve => {
      setState((prevState) => {
        let nextValue = updater;
        if (typeof updater === "function") {
          nextValue = updater(prevState.value);
        }
        return {
          value: nextValue,
          resolve
        }
      });
    })
  };
  return [state.value, updateState]
}


export interface stateType1<T> {
  value: T,
}


let _callback = (params: any) => null;

export function useStateWithCallback<T>(initValue: T): [T, any] {

  const [state, setState] = useState<T>(initValue);

  useEffect(() => {
    _callback && _callback(state)
  }, [state]);

  const updateState = (updater: T, callBack?: any) => {
    let nextValue = updater;
    _callback = callBack;
    setState((prevState) => {
      if (typeof updater === "function") {
        nextValue = updater(prevState);
      }
      return nextValue
    });
  };

  return [state, updateState]
}

export function storageSetWithCityCode<T>(key: string, cityCode: string, data: T) {
  const cache = storage.get(key).catch();
  if (cache) {
    const _cache = {
      ...cache,
      [cityCode]: data
    };
    storage.set(key, _cache)
  } else {
    storage.set(key, {
      [cityCode]: data
    })
  }
}
