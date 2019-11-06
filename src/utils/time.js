import moment from 'moment'

/**
 * 过去或者未来距离现在，相差天数
 * n 传入参数 ，距离现在的时间
 */ 

export const getBeforeDate = (n) =>{
    return moment(n).diff(moment().day(moment().day()).startOf('day'), 'days')
}


/**
 * 时间显示格式不同
 * 今天之内：12：00，时：分
 * 昨天：昨天 12：00， 昨天 时：分
 * 昨天00:00之前到今年之内：08-17  12:00
 * 今年之前：2018-08-17  12:00
 */

export const setTimeFormat = (time) =>{
    let isToday = moment(time).isBetween(moment().day(moment().day()).startOf('day'),moment().day(moment().day()).endOf('day'))
    let isYestoday = moment(time).isBetween(moment().subtract(1, 'days').startOf('day'),moment().subtract(1, 'days').endOf('day'))

    let isYear = moment(time).isBetween(moment().year(moment().year()).startOf('year'),moment().subtract(1, 'days').startOf('day'))
    let isBeforeYear = moment(time).isBefore(moment().year(moment().year()).startOf('year'))

    let res = null

    if(isToday){
        res = moment(time).format('HH:mm')
    }
    if(isYestoday){
        res = `昨天 ${moment(time).format('HH:mm')}` 
    }
    if(isYear){
        res =  moment(time).format('MM-DD HH:mm')
    }
    if(isBeforeYear){
        res =  moment(time).format('YYYY-MM-DD HH:mm')
    }

    return res
}