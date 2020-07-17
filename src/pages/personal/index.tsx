import React, {FunctionComponent, useState, useEffect} from 'react'
import {
  Text,
  Linking,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  NativeModules,
  DeviceEventEmitter,
  Modal as CodeModal
} from 'react-native'
import {connect, useSelector} from 'react-redux'
import Shadow from '../../components/Shadow'
import {scaleSize} from '@/utils/screenUtil'
// @ts-ignore
import QuickEntry from '../../businessComponents/quickEntry'
import {getReportNum} from '@/services/auth'
import {Theme, Toast} from '@new-space/teaset'
import Modal from '../../components/Modal'
import navigation from "@/utils/navigation";
import API_getAdvertis, {GetAdvertisingsResponseExtensionListItem} from '@/services/advertising'
import CompanyQRCode from "@/businessComponents/companyQRCode/companyQRCode";
import StoreState from "@/models/types";
import {verifyUser} from '@/utils/utils'

const Feedback = NativeModules.Feedback;

const {height} = Dimensions.get("window")

const close_icon = require('../../images/icons/close.png');
const right_white = require('../../images/icons/right_white.png');
const personal_bg = require('../../images/pictures/personal_bg.png');


const Personal: FunctionComponent<any> = props => {

  const phone = '023-67344883';
  const [reportNumber, setReportNumber] = useState(0)
  const [takeLookNumber, setTakeLookNumber] = useState(0)
  const [signNumber, setSignNumber] = useState(0)
  const [myCode, setCode] = useState('')
  const [phoneVisible, setPhoneVisible] = useState(false)
  const [advertis, setAdvertis] = useState({} as GetAdvertisingsResponseExtensionListItem)
  const [codeVisible, setCodeVisible] = useState<boolean>(false);
  const {userInfo = {}} = useSelector((state: StoreState) => state.user);
  const {config,} = props;
  const realAvatar = userInfo.avatar ? {uri: userInfo.avatar} : (userInfo.sex === 1 ? require('../../images/pictures/personal_man.png') : require('../../images/pictures/personal_woman.png'))

  const gotoPersonalInfo = () => {
    props.navigation.navigate('personalInfo')
  };

  const gotoLogin = () => {
    props.navigation.navigate('AuthRouter')
  };

  const getUserReportData = async () => {
    StatusBar.setBarStyle('light-content')
    DeviceEventEmitter.emit('initMessage') // 进入页面的时候调用获取消息  因为静默消息的原因临时处理
    let url = config.requestUrl.api;
    try {
      let res = await getReportNum(url)
      let {extension = {}} = res
      setReportNumber(extension.reportCount || 0)
      setTakeLookNumber(extension.visitCount || 0)
      setSignNumber(extension.subCount || 0)
    } catch (e) {
      e.message && Toast.message(e.message)
    }
  }

  const getAdvertis = async () => {
    try {
      const {extension}: { extension: GetAdvertisingsResponseExtensionListItem[] } = await API_getAdvertis.getAdvertisings(props.config.requestUrl.public, {
        site: 'PERSONAL_BANNER',
        cityId: (props.location && props.location.conversionCode) || '500000',
        app: 1
      });
      (extension && extension.length) && setAdvertis(extension[0]);
    } catch (e) {
      console.log(e, '获取广告失败')
    } finally {

    }
  };

  useEffect(() => {
    if (props.guest) {
      setReportNumber(0)
      setTakeLookNumber(0)
      setSignNumber(0)
      return
    }
    getUserReportData()
    let focusListener = props.navigation.addListener('didFocus', getUserReportData) // 添加监听事件
    return function cleanup() {
      focusListener.remove()
    }
  }, [props.user]);

  useEffect(() => {
    getAdvertis()
  }, []);

  const feedback = () => {
    if (!Feedback) {
      return;
    }
    let name = '';
    if (userInfo.trueName) {
      name = userInfo.trueName
    }
    Feedback.setDefaultUserContactInfo(name)
    Feedback.show(() => {
      Feedback.getFeedbackUnreadCount((ok: any, count: any) => {
        if (count != null && count !== '') {
          // this.setState({feedbackCount: count})
        } else {
          // this.setState({feedbackCount: 0})
        }
      })
    });
  }

  const showCompanyQRCode = () => {
    setCodeVisible(true)
  };

  const handlePressOk = () => {
    Linking.openURL('tel:' + phone);
    setPhoneVisible(false)
  };

  const handlePressClose = () => {
    setPhoneVisible(false)
  };

  const gotoPage = async (name: string, path: string) => {
    if (path === 'feedback') {
      feedback();
      return
    }
    if (path === 'customerService') {
      setPhoneVisible(true);
      return;
    }
    if (path === 'businessCard') {
      let res = await verifyUser('stronge', '', (
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Text>请先加入公司，再使用此功能</Text>
        </View>
      ), false)
      if (!res) return
    }
    navigation.navigate(path);
  };

  let iconItems = [
    {text: '我的收藏', imageSource: require('../../images/icons/personal/sc.png'), path: 'collection'},
    {text: '个人名片', imageSource: require('../../images/icons/personal/grmp.png'), path: 'businessCard'},
    {text: '房贷计算器', imageSource: require('../../images/icons/personal/jsq.png'), path: 'calculate'},
    {text: '侦探寻铺', imageSource: require('../../images/icons/personal/ztxp.png'), path: 'searchBuilding'},
    {text: '联系客服', imageSource: require('../../images/icons/personal/kf.png'), path: 'customerService'},
    {text: '意见反馈', imageSource: require('../../images/icons/personal/yj.png'), path: 'feedback'},
    {text: '服务协议', imageSource: require('../../images/icons/personal/fwxy.png'), path: 'registration'},
    {text: '隐私政策', imageSource: require('../../images/icons/personal/yszc.png'), path: 'privacy'},
  ];

  if (!props.guest) {
    iconItems.push({text: '系统设置', imageSource: require('../../images/icons/personal/xtsz.png'), path: 'system'})
  }

  return <View>
    <ImageBackground source={personal_bg} style={[styles.header, {height: scaleSize(322) + Theme.statusBarHeight}]}>
      <StatusBar translucent={true} barStyle='dark-content' backgroundColor='rgba(255,255,255,0)'/>

      <TouchableOpacity onPress={() => {
        Object.keys(userInfo).length > 0 ? gotoPersonalInfo() : gotoLogin()
      }} style={styles.headerLeft} activeOpacity={0.8}>
        {Object.keys(userInfo).length > 0 ? (
          <View style={styles.user_wrapper}>
            <Image style={styles.avatar} source={realAvatar}/>
            <View>
              <Text style={styles.trueName}>{userInfo.trueName}</Text>
              <Text style={styles.company} numberOfLines={1}>{userInfo.filialeShortName || userInfo.filiale || '暂无公司'} | {userInfo.deptName || '暂无组别'}</Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity onPress={gotoLogin} activeOpacity={0.8} style={styles.no_user_wrapper}>
            <Image style={styles.avatar} source={realAvatar}/>
            <Text style={styles.no_user_login_text}>注册/登录</Text>
            <Image style={styles.no_user_right_icon} source={right_white}/>
          </TouchableOpacity>
        )}


      </TouchableOpacity>
      {userInfo.isResident ? (
        <TouchableOpacity onPress={showCompanyQRCode}>
          <Image style={styles.qrCode} source={require('../../images/icons/QRcode.png')}/>
        </TouchableOpacity>
      ) : null}
    </ImageBackground>

    <Shadow style={styles.shadow}>
      <TouchableOpacity onPress={() => props.navigation.navigate('reportList')} style={styles.numberItem}>
        <Text style={styles.labelText}>报备有效</Text>
        <Text style={styles.numText}>{reportNumber}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('reportList', {source: 'personal'})} style={styles.numberItem}>
        <Text style={styles.labelText}>带看保护</Text>
        <Text style={styles.numText}>{takeLookNumber}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('singList')} style={styles.numberItem}>
        <Text style={styles.labelText}>等待签约</Text>
        <Text style={styles.numText}>{signNumber}</Text>
      </TouchableOpacity>
    </Shadow>
    <ScrollView style={styles.content}>
      {
        (
          advertis.cover && <View style={styles.banner}>
            <Image style={styles.bannerImage} source={{uri: advertis.cover}}/>
          </View>
        )
      }
      <View style={styles.iconView}>
        {
          iconItems.map((item, i) => {
            return <TouchableOpacity
              key={i}
              style={[styles.iconItem]}
              activeOpacity={0.8}
              onPress={() => gotoPage(item.text, item.path)}
            >
              <Image source={item.imageSource} style={styles.iconItemImg}/>
              <Text style={[styles.iconItemText]}>
                {item.text}
              </Text>
            </TouchableOpacity>
          })
        }
      </View>
    </ScrollView>
    <Modal visible={phoneVisible} width={541} height={200} type='conform' transparent={true} onOk={handlePressOk} onClose={handlePressClose}>
      <Text style={{width: '100%', textAlign: 'center'}}>是否拨打 {phone}</Text>
    </Modal>

    {/**公司二维码*/}
    <CodeModal visible={codeVisible} transparent={true} animationType='fade'>
      <TouchableOpacity activeOpacity={1} onPress={() => setCodeVisible(false)} style={styles.code_container}>
        <View style={styles.code_content}>
          <View style={styles.code_close_icon_wrapper}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setCodeVisible(false)}>
              <Image style={styles.code_close_icon} source={close_icon}/>
            </TouchableOpacity>
          </View>
          <CompanyQRCode handleSaveCode={() => setCodeVisible(false)}
                         handleShareCode={() => setCodeVisible(false)}/>
        </View>
      </TouchableOpacity>
    </CodeModal>

    <QuickEntry visible={config.showQuickPage.routeName === 'Personal'}/>

  </View>
}

const styles = StyleSheet.create({
  labelText: {
    color: '#CBCBCB',
    fontSize: scaleSize(24),
    paddingBottom: scaleSize(26)
  },
  numText: {
    color: '#000',
    fontSize: scaleSize(32)
  },
  hideImgHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: scaleSize(70),
    backgroundColor: '#fff'
  },
  hideImg: {
    position: 'absolute',
    top: height,
    left: 0,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: scaleSize(390),
    paddingBottom: scaleSize(20)
  },
  refresh: {
    width: scaleSize(30),
    height: scaleSize(30),
    marginRight: scaleSize(16)
  },
  resetText: {
    color: '#868686',
    fontSize: scaleSize(24)
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: scaleSize(30)
  },
  errorText: {
    color: '#868686',
    textAlign: 'center',
    marginBottom: scaleSize(12)
  },
  qrCodeContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: scaleSize(300),
    height: scaleSize(300)
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: scaleSize(300),
    height: scaleSize(300)
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: scaleSize(32),
    paddingRight: scaleSize(32)
  },
  content: {
    height: '100%',
    width: '100%'
  },
  iconView: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: scaleSize(34),
    paddingBottom: scaleSize(34),
  },
  iconItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '33.3%',
    height: scaleSize(116),
    marginBottom: scaleSize(56),
    // backgroundColor: '#f3f3f3'
  },
  iconItemImg: {
    width: scaleSize(60),
    height: scaleSize(60),
    marginBottom: scaleSize(16)
  },
  iconItemText: {
    fontSize: scaleSize(28),
    color: '#000'
  },
  numberItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  shadow: {
    width: scaleSize(702),
    height: scaleSize(170),
    marginLeft: scaleSize(24),
    marginRight: scaleSize(24),
    marginTop: scaleSize(-90),
    shadowOffset: {
      width: scaleSize(0),
      height: scaleSize(10),
    },
    borderRadius: scaleSize(8),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: scaleSize(44),
    paddingRight: scaleSize(44)
  },
  qrCode: {
    width: scaleSize(55),
    height: scaleSize(55)
  },
  avatar: {
    width: scaleSize(104),
    height: scaleSize(104),
    borderRadius: scaleSize(52),
    marginRight: scaleSize(24)
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  trueName: {
    color: '#fff',
    fontSize: scaleSize(36),
    lineHeight: scaleSize(50),
    fontWeight: '500'
  },
  company: {
    color: 'rgba(134,148,200,1)',
    fontWeight: '400',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
    marginTop: scaleSize(12),
    width: scaleSize(480)
  },
  banner: {
    marginTop: scaleSize(34),
    paddingHorizontal: scaleSize(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: scaleSize(686),
    height: scaleSize(170)
  },
  code_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: '100%'
  },
  code_content: {
    padding: scaleSize(32),
    borderRadius: scaleSize(10),
    backgroundColor: '#fff'
  },
  code_close_icon_wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  code_close_icon: {
    width: scaleSize(30),
    height: scaleSize(30)
  },
  user_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  no_user_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  no_user_login_text: {
    fontSize: scaleSize(40),
    color: '#fff'
  },
  no_user_right_icon: {
    width: scaleSize(30),
    height: scaleSize(30),
    marginLeft: scaleSize(10)
  }
});

const mapStateToProps = ({config, user}: { config: any, user: any }) => {
  return {config, user, guest: user.status === 404}
}
export default connect(mapStateToProps)(Personal)
