import { StyleSheet } from 'react-native'
import { Theme } from '@new-space/teaset'
import { scaleSize } from '@/utils/screenUtil'

export default StyleSheet.create({
  cardView: {
    marginBottom: scaleSize(32),
    marginHorizontal: scaleSize(32),
    borderRadius: scaleSize(8),
    backgroundColor: '#FFFFFF',
  },
  cardTitleLayer: {
    paddingTop: scaleSize(24),
    paddingHorizontal: scaleSize(24),
  },
  cardTitle: {
    color: '#000000',
    fontWeight: '600',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },

  line: {
    width: StyleSheet.hairlineWidth,
    height: scaleSize(64),
    backgroundColor: '#EAEAEA',
  },

  top: {
    height: scaleSize(358),
    paddingHorizontal: scaleSize(32),
  },
  topRow1: {
    marginTop: scaleSize(22),
    marginBottom: scaleSize(36),
    flexDirection: 'row',
  },
  topImg: {
    width: scaleSize(105),
    height: scaleSize(105),
    borderRadius: scaleSize(105),
  },
  topText: {
    marginLeft: scaleSize(16),
    justifyContent: 'space-between',
  },
  topTextRow1: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(45),
  },
  topTextRow2: {
    color: '#FFFFFF',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
  topBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: scaleSize(26),
    backgroundColor: '#FFFFFF',
  },
  topBtnText: {
    color: '#2F4392',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
    marginVertical: scaleSize(8),
    marginHorizontal: scaleSize(24),
  },

  log: {
    marginTop: scaleSize(-192),
    marginBottom: scaleSize(32),
    marginHorizontal: scaleSize(32),
    borderRadius: scaleSize(8),
    backgroundColor: '#FFFFFF',
  },
  logNum: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scaleSize(25),
    paddingBottom: scaleSize(34),
  },
  logNumItem: {
    flex: 1,
    alignItems: 'center',
  },
  logNumItemValue1: {
    color: '#728FE2',
    fontWeight: '500',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(45),
  },
  logNumItemValue2: {
    color: '#000000',
    fontWeight: '500',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(45),
  },
  logNumItemLabel: {
    marginTop: scaleSize(22),
    color: '#4D4D4D',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
  logNew: {
    marginHorizontal: scaleSize(20),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#EAEAEA',
    alignItems: 'center',
  },
  logNewList: {
    paddingTop: scaleSize(20),
    paddingBottom: scaleSize(12),
    paddingHorizontal: scaleSize(4),
  },
  logNewItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleSize(5),
  },
  logNewItemDot: {
    width: scaleSize(10),
    height: scaleSize(10),
    marginRight: scaleSize(8),
    borderRadius: scaleSize(5),
    backgroundColor: '#FE5139',
  },
  logNewItemTitle: {
    flex: 1,
    color: '#000000',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },
  logNewItemTime: {
    marginLeft: scaleSize(10),
    color: '#868686',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
  logNewGo: {
    padding: scaleSize(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logNewGoText: {
    color: '#868686',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
  logNewGoImg: {
    marginLeft: scaleSize(8),
    width: scaleSize(30),
    height: scaleSize(30),
  },

  yhhxLayer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scaleSize(28),
    paddingBottom: scaleSize(42),
  },
  yhhxItem: {
    flex: 1,
    alignItems: 'center',
  },
  yhhxValueText1: {

    color: '#000000',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(45),
  },
  yhhxValueText2: {
    color: '#FE5139',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(45),
  },
  yhhxLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleSize(25),
  },
  yhhxLabelImg: {
    width: scaleSize(30),
    height: scaleSize(30),
  },
  yhhxLabelText: {
    marginLeft: scaleSize(8),
    color: '#868686',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },

  fylxLayer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fylxChart: {
    width: scaleSize(264),
    height: scaleSize(264),
    marginTop: scaleSize(40),
    marginBottom: scaleSize(26),
    marginLeft: scaleSize(16),
    marginRight: scaleSize(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  fylxChartCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  fylxChartCenterValue: {
    color: '#000000',
    fontWeight: '500',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(45),
  },
  fylxChartCenterLabel: {
    marginTop: scaleSize(9),
    color: '#4D4D4D',
    fontSize: scaleSize(22),
    lineHeight: scaleSize(24),
  },
  fylxRight: {
    flex: 1,
  },

  chartRightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleSize(15),
  },
  chartRightItemColor: {
    width: scaleSize(17),
    height: scaleSize(17),
  },
  chartRightItemText1: {
    width: '37.5%',
    color: '#000000',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
    paddingLeft: scaleSize(30),
  },
  chartRightItemText2: {
    width: '25%',
    color: '#000000',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },
  chartRightItemText3: {
    flex: 1,
    color: '#868686',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },

  fyjl: {

  },
  fyjlLabel: {
    paddingLeft: scaleSize(54),
    paddingBottom: scaleSize(14),
  },
  fyjlLabelText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },

  bli: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaleSize(8),
    marginHorizontal: scaleSize(32),
    marginBottom: scaleSize(24),
    overflow: 'hidden',
  },
  bliTitle: {
    paddingTop: scaleSize(24),
    paddingHorizontal: scaleSize(24),
    paddingBottom: scaleSize(11),
    flexDirection: 'row',
    alignItems: 'center',
  },
  bliText: {
    color: '#000000',
    fontWeight: '500',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(45),
  },
  bliImg: {
    marginLeft: scaleSize(6),
    width: scaleSize(30),
    height: scaleSize(30),
  },
  bliMRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleSize(24),
    paddingBottom: scaleSize(14),
  },
  bliTags: {
    flexDirection: 'row',
  },
  bliMRowRight: {
    color: '#868686',
    fontSize: scaleSize(22),
    lineHeight: scaleSize(24),
  },
  bliItemList: {
    marginHorizontal: scaleSize(16),
    marginBottom: scaleSize(24),
    overflow: 'visible',
  },
  bliIitem: {
    marginHorizontal: scaleSize(8),
    width: scaleSize(286),
    borderColor: '#CBCBCB',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: scaleSize(8),
    overflow: 'hidden',
  },
  bliIcon: {
    width: scaleSize(286),
    height: scaleSize(154),
  },
  bliIitemTV: {
    alignItems: 'center',
    paddingVertical: scaleSize(6),
  },
  blit1: {
    flex: 1,
    color: '#000000',
    fontWeight: '600',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
    paddingBottom: scaleSize(6),
  },
  blit2: {
    flex: 1,
    color: '#000000',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },



  fixedBottom: {
    backgroundColor: '#FFFFFF',
    paddingTop: scaleSize(16),
    paddingBottom: Theme.isIPhoneX ? 34 : scaleSize(16),
    borderTopColor: '#EAEAEA',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
})

// CancerRojer遗产 
export const styles = StyleSheet.create({
  headImg: {
    width: scaleSize(100),
    height: scaleSize(100),
    marginLeft: scaleSize(50),
    borderRadius: scaleSize(50)
  },
  blueText: {
    color: '#1F3070',
    fontSize: scaleSize(28)
  },
  reportCus: {
    width: scaleSize(686),
    height: scaleSize(108),
    marginLeft: scaleSize(30),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F3070',
    borderRadius: scaleSize(8)
  },
  reportCusText: {
    color: '#FFFFFF',
    fontSize: scaleSize(32)
  },
  reView: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: scaleSize(20)
  },
  selectImg: {
    height: scaleSize(30),
    width: scaleSize(30),
    marginTop: scaleSize(5)
  },
  allPhone: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: scaleSize(65)
  },
  phoneText: {
    color: '#000000',
    fontSize: scaleSize(28),
    fontWeight: '400',
    marginLeft: scaleSize(15)
  },
  relaModalText: {
    color: '#1F3070',
    fontSize: scaleSize(28),
    fontWeight: '400',
    marginLeft: scaleSize(60),
    marginTop: scaleSize(50)
  },
  relaDataView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: scaleSize(78),
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  relaDataText: {
    color: '#000000',
    fontSize: scaleSize(28)
  },
  addModalView: {
    display: 'flex',
    flexDirection: 'column'
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'row',
    height: scaleSize(45),
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: scaleSize(100)
  },
  textWarpSmall: {
    width: scaleSize(52),
    height: scaleSize(60),
    borderBottomColor: 'rgba(203,203,203,1)',
    borderBottomWidth: scaleSize(2),
    backgroundColor: 'rgba(255,255,255,1)',
    textAlign: 'center',
    lineHeight: scaleSize(70),
  },
  inputYesBorder: {
    borderColor: 'rgba(31,48,112,1)',
  },
  inputRightWarp: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleSize(32),
  },
})
