import DeviceInfo from 'react-native-device-info'
import request from './request'
import storage from './storage'

type Actions = 'click' | 'view'
type Channel = 'pzt_brokers'

export interface BehaviorLog {
  trigger_time?: number
  page: string
  parent_page?: string
  target: string
  action?: Actions
  page_param?: any
  action_param?: any
}
export interface LogBodyData {
  userid?: string
  channel?: Channel
  deviceid?: string
  device_type?: string
  platform?: string
  sys_version?: string
  app_version?: string
  network?: string
  ip?: string
  longitude?: number
  latitude?: number
  logs?: BehaviorLog[]
}

export class BuryingPoint {
  public static readonly STORAGE_KEY = 'behaviorLogs'
  public static readonly getInstance = () => {
    if (!BuryingPoint.instance) {
      BuryingPoint.instance = new BuryingPoint()
    }
    return BuryingPoint.instance
  }
  private static instance?: BuryingPoint
  private constructor() {
    this.setTimer()
  }

  private timer?: NodeJS.Timer
  private locked: boolean = false
  private queue: Queue = new Queue()
  private logBodyData: LogBodyData = {
    userid: DeviceInfo.getUniqueID(),
    channel: 'pzt_brokers',
    deviceid: DeviceInfo.getUniqueID(),
    device_type: DeviceInfo.getBrand(),
    platform: DeviceInfo.getSystemName(),
    sys_version: DeviceInfo.getSystemVersion(),
    app_version: DeviceInfo.getVersion(),
  }

  setLogBodyData = (logBodyData: LogBodyData) => {
    this.logBodyData = {
      ...this.logBodyData,
      ...logBodyData,
    }
  }

  /**
   * 新增埋点log
   * @param behaviorLog 埋点信息
   */
  add = (behaviorLog: BehaviorLog) => {
    behaviorLog = {
      action: 'click',
      ...behaviorLog,
      trigger_time: new Date().getTime(),
    }
    this.queue.enqueue(async () => {
      await this.saveOrSend(behaviorLog)
    })
    if (this.locked === false) {
      this.checkQueue()
    }
  }

  /**
   * 队列不为空则执行队列事件
   */
  private checkQueue = async () => {
    this.locked = true
    while (!this.queue.empty()) {
      try {
        await this.queue.dequeue()()
      } catch (e) {
        console.log('埋点错误: ', e)
      }
    }
    this.locked = false
  }

  /**
   * 每五分钟上传一次
   */
  private setTimer = () => {
    this.timer = setInterval(async () => {
      if (this.locked === false) {
        this.locked = true
        const logs = await this.getLocalLogs()
        if (logs.length) {
          await this.sendLogs(logs)
        }
        this.locked = false
      }
    }, 1000 * 60 * 5)
  }

  /**
   * 如果logs数量小于5则存储，否则发送
   */
  private saveOrSend = async (behaviorLog: BehaviorLog) => {
    const logs = await this.getLocalLogs()
    logs.push(behaviorLog)
    if (logs.length < 5) {
      await this.setLocalLogs(logs)
    } else {
      clearInterval(this.timer!)
      await this.sendLogs(logs)
      this.setTimer()
    }
  }

  /**
   * 读取logs
   */
  private getLocalLogs = async () => {
    try {
      return await storage.get(BuryingPoint.STORAGE_KEY) as BehaviorLog[]
    } catch {
      return []
    }
  }

  /**
   * 存储logs
   */
  private setLocalLogs = async (logs: BehaviorLog[]) => {
    try {
      await storage.set(BuryingPoint.STORAGE_KEY, logs)
    } catch (e) {
      /** nothing todo */
    }
  }

  /**
   * 发送埋点信息
   * @param logs 记录的埋点信息
   */
  private sendLogs = async (logs: BehaviorLog[]) => {
    try {
      const url = request.getUrl().buryPoint
      const body = { ...this.logBodyData, logs }
      console.log(JSON.stringify(body), 'body')
      await request.post(url, { body })
      await this.setLocalLogs([])
    } catch (e) {
      console.log('BehaviorLogs Send Error:', e)
    }
  }
}

type LogSaveEvent = () => Promise<void>
class Queue {
  private queue: LogSaveEvent[] = []

  enqueue(e: LogSaveEvent) {
    this.queue.push(e)
  }

  dequeue() {
    return this.queue.shift()!
  }

  empty() {
    if (this.queue.length === 0) return true
    else return false
  }
}

export class PageTimer {
  private begin?: number
  private end?: number

  get duration() {
    if (!this.begin || !this.end) return 0
    const duration = (this.end - this.begin) / 1000
    this.begin = this.end = undefined
    return Math.round(duration)
  }

  start = () => {
    this.begin = new Date().getTime()
  }

  stop = () => {
    this.end = new Date().getTime()
  }
}

export default BuryingPoint.getInstance()
