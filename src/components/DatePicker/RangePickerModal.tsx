import React, { PureComponent } from 'react'
import { Modal, SectionList, View, Text, TouchableOpacity, Image, SectionListData, SectionListRenderItem } from 'react-native'
import { DefaultValue, EnableDate, DateMoment, DateString } from './types'
import Calendar, { Code, Chose } from './Calendar'
import moment from 'moment'
import styles from './RangePickerModal.styles'

interface RangePickerModalProps {
  defaultValue?: DefaultValue
  enableDate: EnableDate
  onOk: (dateMoment: DateMoment, dateString: DateString) => void
  onCancel: () => void
}
interface RangePickerModalState {
  code: Code
  chose: Chose
}
class RangePickerModal extends PureComponent<RangePickerModalProps, RangePickerModalState>{
  constructor(props: RangePickerModalProps) {
    super(props)
    // 初始化chose
    const chose = [] as Chose
    if (props.defaultValue) {
      chose[0] = moment(props.defaultValue[0])
      chose[1] = moment(props.defaultValue[1])
    }
    // 初始化state
    this.state = {
      chose,
      code: 2,
    }
  }

  // 点击确定
  handlePressOk = (chose: DateMoment) => {
    const { onOk } = this.props
    onOk(chose, [chose[0].toISOString(), chose[1].toISOString()])
  }

  // 关闭modal
  handleClose = () => {
    this.props.onCancel()
  }

  // 点击时间设置chose
  setChose = (date: moment.Moment) => {
    this.setState(({ chose, code }) => {
      let newChose: Chose
      let newCode: Code
      if (code === 1 && !date.isBefore(chose[0])) {
        newChose = [chose[0], date]
        newCode = 2
      }
      else {
        newChose = [date]
        newCode = 1
      }
      return {
        chose: newChose,
        code: newCode,
      }
    })
  }

  // 获取日历信息
  getSections = () => {
    const { enableDate } = this.props
    const start = moment(enableDate[0]).startOf('month')
    const end = moment(enableDate[1]).endOf('month')
    const amount = end.diff(start, 'month') + 1
    const sections = []
    for (let i = 0; i < amount; i++) {
      sections.push({
        data: [moment(start).add(i, 'month').format('YYYY年MM月')]
      })
    }
    return sections
  }

  // 月份标题
  renderCalendarTitle = (info: { section: SectionListData<string> }) => {
    const date = info.section.data[0]
    return (
      <View style={styles['calendar-title']}>
        <Text style={styles['calendar-title-text']}>
          {date}
        </Text>
      </View>
    )
  }

  // 月份内容
  renderCalendar: SectionListRenderItem<string> = ({ item }) => {
    const month = moment(item, 'YYYY年MM月')
    return (
      <Calendar
        date={month}
        chose={this.state.chose}
        onChose={this.setChose}
        enableDate={this.props.enableDate}
      />
    )
  }

  // 分割线
  renderSeparatorComponent = (separators: any) => {
    if (separators.leadingItem && separators.trailingSection) {
      return <View style={styles['separator']} />
    }
    return null
  }

  render() {
    return (
      <Modal
        transparent
        onRequestClose={this.handleClose}
      >
        {/* 遮罩层 */}
        <TouchableOpacity
          style={styles['shade']}
          activeOpacity={1}
          onPress={this.handleClose}
        />

        {/* 本体 */}
        <View style={styles['container']}>

          {/* 标题 */}
          <View style={styles['title']}>
            <TouchableOpacity activeOpacity={1} onPress={this.handleClose} style={styles['close']}>
              <Image source={require('../../images/icons/close_xxl.png')} style={styles['close-img']} />
            </TouchableOpacity>
            <Text style={styles['title-text']}>选择日期</Text>
          </View>

          {/* 星期 */}
          <View style={styles['week']}>
            <Text style={styles['weekend']}>日</Text>
            <Text style={styles['weekday']}>一</Text>
            <Text style={styles['weekday']}>二</Text>
            <Text style={styles['weekday']}>三</Text>
            <Text style={styles['weekday']}>四</Text>
            <Text style={styles['weekday']}>五</Text>
            <Text style={styles['weekend']}>六</Text>
          </View>

          {/* 年月日 */}
          <SectionList
            stickySectionHeadersEnabled
            scrollsToTop={false}
            showsVerticalScrollIndicator={false}
            sections={this.getSections()}
            keyExtractor={i => i}
            renderSectionHeader={this.renderCalendarTitle}
            renderItem={this.renderCalendar}
            SectionSeparatorComponent={this.renderSeparatorComponent}
          />

          {/* 确定 */}
          {
            this.state.code === 2 && (
              <View style={styles['ok-container']}>
                <TouchableOpacity
                  style={styles['ok']}
                  activeOpacity={1}
                  onPress={() => this.handlePressOk(this.state.chose as DateMoment)}
                >
                  <Text style={styles['ok-text']}>确 定</Text>
                </TouchableOpacity>
              </View>
            )
          }
        </View>
      </Modal>
    )
  }
}

export default RangePickerModal
