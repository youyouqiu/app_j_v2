import * as WeChat from 'xkj-react-native-wechat'

const registerApp = (appId) => {
    WeChat.registerApp(appId)
}
const shareToTimeline = (data) => {
    WeChat.shareToTimeline(data)
}
const shareToSession = (data) => {
    WeChat.shareToSession(data)
}
const handleShareToSession = (data) => {
    return new Promise((resolve, reject) => {
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    return WeChat.shareToSession(data)
                } else {
                    reject({ message: '没有安装微信软件，请您安装微信之后再试！' })
                }
            })
            .then((res) => {
                resolve(res)
            })
            .catch((e) => {
                reject(e)
            })
    })

}
export const wxApi = {
    registerApp,
    shareToTimeline,
    shareToSession,
    handleShareToSession,
}
