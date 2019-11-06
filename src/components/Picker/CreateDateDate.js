export const createDateDate = (mode = 'DD hh:mm:ss', MinDate = [1970, 1, 1, 0, 0, 0], MaxDate = [2030, 12, 31, 23, 59, 59]) => {
    console.log('mode', mode);
    let endFlag = 0;
    let pickerDate = [];
    let pickerDateItem = {};
    let seconds = [];
    let minutes = [];
    let hours = [];
    let days = [];
    let months = [];
    let years = [];


    const hasYear = mode.includes('YYYY');
    const hasMonth = mode.includes('MM');
    const hasDay = mode.includes('DD');
    const hasHour = mode.includes('hh');
    const hasMinute = mode.includes('mm');
    const hasSecond = mode.includes('ss');


    if (hasSecond) {
        endFlag++;
        const minSecond = MinDate[MinDate.length - 1];
        const maxSecond = MaxDate[MaxDate.length - 1];
        for (let second = minSecond; second <= maxSecond; second++) {
            seconds.push(second)
        }
        pickerDate = seconds;
    }
    if (hasMinute) {
        const minMinute = MinDate[MinDate.length - 1 - endFlag];
        const maxMinute = MaxDate[MaxDate.length - 1 - endFlag];
        for (let minute = minMinute; minute <= maxMinute; minute++) {
            if (hasSecond) {
                minutes.push({
                    [minute]: seconds
                })
            } else {
                minutes.push(minute)
            }
        }
        pickerDate = minutes;
        endFlag++;
    }
    if (hasHour) {
        const minHour = MinDate[MinDate.length - 1 - endFlag];
        const maxHour = MaxDate[MaxDate.length - 1 - endFlag];
        for (let hour = minHour; hour <= maxHour; hour++) {
            if (hasMinute) {
                hours.push({
                    [hour]: minutes
                })
            } else {
                hours.push(hour)
            }
        }
        pickerDate = hours;
        endFlag++;
    }


    if (hasDay) {
        for (let day = 0; day <= 2; day++) {
            if (hasHour) {
                days.push({
                    [day]: hours
                })
            } else {
                days.push(day)
            }
        }
        pickerDate = days
    }

    if (false) {
        const minDay = MinDate[MinDate.length - 1 - endFlag];
        const maxDay = MaxDate[MaxDate.length - 1 - endFlag];

        if (hasMonth) {
            const minMonth = MinDate[1];
            const maxMonth = MaxDate[1];
            if (hasYear) {
                const minYear = MinDate[0];
                const maxYear = MaxDate[0];
                for (let year = minYear; year <= maxYear; year++) {
                    for (let month = minMonth; month <= maxMonth; month++) {
                        const {_minDay, _maxDay} = transform(year, month, minDay, maxDay);
                        for (let day = _minDay; day <= _maxDay; day++) {
                            if (hasHour) {
                                days.push({[day]: hours})
                            } else {
                                days.push(day)
                            }
                        }
                        months.push({
                            [month]: days
                        })
                    }
                    years.push({
                        [year]: months
                    })
                }
                pickerDate = years
            } else {
                //获取当天的年月
                let newDate = new Date();
                const nowYear = newDate.getFullYear();
                for (let month = minMonth; month <= maxMonth; month++) {
                    const {_minDay, _maxDay} = transform(nowYear, month, minDay, maxDay);
                    for (let day = _minDay; day <= _maxDay; day++) {
                        if (hasHour) {
                            days.push({[day]: hours})
                        } else {
                            days.push(day)
                        }
                    }
                    months.push({
                        [month]: days
                    })
                }
                pickerDate = months
            }
        } else {
            //获取当天的年月
            let newDate = new Date();
            const nowYear = newDate.getFullYear();
            const nowMonth = newDate.getMonth() + 1;
            const {_minDay, _maxDay} = transform(nowYear, nowMonth, minDay, maxDay);
            for (let day = 0; day <= 31; day++) {
                if (hasHour) {
                    days.push({[day]: hours})
                } else {
                    days.push(day)
                }
            }
            pickerDate = days
        }
    }
    console.log('pickerDate', pickerDate);
    return pickerDate;
};


const transform = (year, month, minDay, maxDay) => {
    let _minDay = minDay;
    let _maxDay = maxDay;
    if (year % 4 === 0 && month === 2) {
        _minDay = minDay > 29 ? 29 : minDay;
        _maxDay = maxDay > 29 ? 29 : maxDay
    } else if (year % 4 !== 0 && month === 2) {
        _minDay = minDay > 28 ? 28 : minDay;
        _maxDay = maxDay > 28 ? 28 : maxDay
    } else if (month in {1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1}) {
        _minDay = minDay > 31 ? 31 : minDay;
        _maxDay = maxDay > 31 ? 31 : maxDay
    } else {
        _minDay = minDay > 30 ? 30 : minDay;
        _maxDay = maxDay > 30 ? 30 : maxDay
    }
    return {_minDay, _maxDay}
};
