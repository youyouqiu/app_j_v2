import request from '../utils/request'

// 更新，检查
export default {
    // 重要提醒 && 业务信息
    mainVersion: () => {
      return request.get(`${request.getUrl().public}/api/appversions/newest/jjr`,false)
    },
}