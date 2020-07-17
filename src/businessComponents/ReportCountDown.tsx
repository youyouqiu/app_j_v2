/**
 * @author: zxs
 * @date: 2020/5/25
 */
import {LayoutChangeEvent, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import moment from "moment";
import {scaleSize} from "@/utils/screenUtil";

interface IReportCountDownPropsType {
  startTime: string,
  onEnd: () => void
}

let interval: any;
const ReportCountDown = ({
                           startTime,
                           onEnd
                         }: IReportCountDownPropsType) => {

  const [time, setTime] = useState(-1);

  useEffect(() => {
    if (time === 0) {
      clearInterval(interval);
      onEnd()
    }
  }, [time]);

  useEffect(() => {
    if (!startTime) return;
    setTime(Math.floor(moment(startTime).unix() - new Date().getTime() / 1000));
    interval = setInterval(() => {
      setTime(prevState => prevState - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [startTime]);

  if (time <= 0) return null;

  const dayStamp = 86400;
  const hourStamp = 3600;
  const minuteStamp = 60;
  let days = Math.floor(time / dayStamp);
  let hours = Math.floor((time - days * dayStamp) / hourStamp);
  let minutes = Math.floor((time - hours * hourStamp) / minuteStamp);
  let seconds = Math.floor(time - hours * hourStamp - minutes * minuteStamp);
  const _hours = hours < 10 ? '0' + hours : hours;
  const _minutes = minutes < 10 ? '0' + minutes : minutes;
  const _seconds = seconds < 10 ? '0' + seconds : seconds;

  const content1 = _hours + ':' + _minutes + ':' + _seconds;
  const content2 = days + '天';


  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>倒计时: </Text>
      <Text style={[styles.value]}>
        {days > 0 ? content2 : content1}
      </Text>
    </View>
  )
};

export default ReportCountDown

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#000000',
    fontSize: scaleSize(24),
    fontWeight: '600'
  },
  value: {
    color: '#000000',
    fontSize: scaleSize(24),
    textAlign: 'center',
    // width: scaleSize(104)
  }
});
