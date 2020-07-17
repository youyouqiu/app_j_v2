import React from 'react';
import {Image, Linking, Modal, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Scan from '../../../components/scan';
import BaseContainer from '../../../components/Page';
import {ToastCallback} from '../../../components/ToastCallback/ToastCallback';
import LocalBarcodeRecognizer from 'react-native-local-barcode-recognizer';
import {Toast} from '@new-space/teaset';
import {connect} from 'react-redux';
import scanService from '../../../services/scanService';
import {scaleSize} from '../../../utils/screenUtil';
import projectService from '../../../services/projectService';
import ImagePicker from 'react-native-image-crop-picker';
import {checkPermission} from '../../../utils/utils';

class BusinessScanPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      joinSuccess: false,
      companyInfo: {},
      source: '',
      countDown: 5,
      joinLoading: false
    };
    this.common = {
      filialeId: ''
    }
  }

    onBarCodeRead = (data) => {
        this.stopScan();
        if (data === '') {
            this.startScan();
            ToastCallback.message('无法识别二维码', null, null);
            return
        }
        this.getCodeCurrentInfo(data)
    };

    getCodeCurrentInfo = async (id) => {
        const {requestUrl} = this.props.config;
        let responseData
        if (id.indexOf('https://') >= 0 || id.indexOf('http://') >= 0 || id.indexOf('HTTPS://') >= 0 || id.indexOf('HTTP://') >= 0) {
            if (id.indexOf('weixin.qq.com') >= 0) {
              responseData = await scanService.getQcoderContentByWexin(id).catch(e => {
                ToastCallback.message(e.message, null, this.startScan, false);
              });
            } else {
                Linking.openURL(id).catch(() => {
                    this.startScan();
                    ToastCallback.message('无法识别二维码', null, null);
                });
                return
            }
        } else {
          //二维码详情同时判断经纪公司二维码时效性
          responseData = await scanService.getQcoderContent(id).catch(e => {
            ToastCallback.message(e.message, null, this.startScan, false);
          });
        }
        if (!responseData) return;
        let {code, message = '', extension = {}} = responseData;
        if (code !== '0') {
            ToastCallback.message(message, null, this.startScan, false);
            return
        }
        if (extension.type === 4) {
        } else if (extension.type === 5) {
            this.common.filialeId = JSON.parse(extension.content).filialeId;
            //判断经纪公司状态
            let res = await scanService.scanqrcode(requestUrl.cqAuth, extension.id).catch(err => {
                ToastCallback.message(err.message, null, this.startScan, false);
            });
            if (!res) return;
            ToastCallback.message(res.message, null, this.startScan);
            let companyInfo = JSON.parse(res.extension.content);
            let source = res.extension.source;
            this.setState({companyInfo, source, visible: true}, () => {
                this.common.interval = setInterval(() => {
                    this.setState(prevState => ({
                        countDown: prevState.countDown - 1
                    }), () => {
                        this.state.countDown < 0 ? clearInterval(this.common.interval) : null
                    })
                }, 1000)
            });
        } else if (extension.type === 6) {
          const content = JSON.parse(extension.content)
          this.props.navigation.navigate('shopDetail', { shopId: content.shopId, buildingTreeId: content.buildingTreeId })
        } else {
          Toast.message('无法识别二维码', 'long')
          setTimeout(() => {
            this.startScan()
          }, 2000)
        }
    };

  showAgreement = () => {
    const {user} = this.props;
    if (user.userInfo.filialeId && user.userInfo.filialeId !== '10000') {
      this.modalClose('您已有归属公司');
      this.startScan();
      return
    }
    this.joinCompany();
  };

  joinCompany = async () => {
    const {filialeId} = this.common;
    const {user, config} = this.props;
    const {companyInfo = {}, source} = this.state;
    const requestData = {
      id: user.userInfo.id,
      phoneNumber: user.userInfo.phoneNumber,
      UserName: user.userInfo.userName,
      organizationId: filialeId,
      filialeId: filialeId,
      invitePeopleId: companyInfo.invitePeopleId,
      invitePeople: companyInfo.invitePeople,
      source: source
    };
    this.setState({joinLoading: true});
    const result = await projectService.oldUsersRegisterReq(config.requestUrl.cqAuth, requestData).catch((e) => {
      this.setState({joinSuccess: false, joinLoading: false, visible: false});
      Toast.message(`加入失败${e.message}`);
      this.startScan();
    });
    if (!result) return;
    this.setState({joinSuccess: true, joinLoading: false, countDown: 5});
    this.startScan();
  };

  logout = () => {
    this.setState({
      visible: false
    }, () => {
      this.props.navigation.navigate('login', '')
    })
  };

  modalClose = (toastInfo) => {
    this.setState({
      visible: false,
      showAgreement: false,
      countDown: 5
    }, () => {
      this.startScan();
      if (toastInfo) Toast.message(toastInfo, 'long');
    })
  };

  openPhoto = async () => {
    const res = await checkPermission('photo');
    if (!res) return;
    this.stopScan();
    let options = {
      cropping: false,
      compressImageQuality: 0.1,
      includeBase64: true
    };
    ImagePicker.openPicker(options).then(response => {
      this.recoginze(response.data);
    }).catch((e) => {
      console.log(e)
      setTimeout(this.startScan, 1000)
    });
  };

  recoginze = async (imageBase64) => {
    try {
      let result = await LocalBarcodeRecognizer.decode(imageBase64, {codeTypes: ['ean13', 'qr']});
      this.onBarCodeRead(result);
    } catch (e) {
      console.log('eeeee', e.toString())
    }
  };

  startScan = () => this.scanRef ? this.scanRef.startScan() : null;

  stopScan = () => this.scanRef ? this.scanRef.stopScan() : null;

  companyModalContent = () => {
    const {companyInfo, countDown, joinLoading} = this.state;
    let btnText = joinLoading ? '请稍后...' : (countDown >= 0 ? `加入(${countDown}s)` : '加入');
    let _style = countDown >= 0 ? ({backgroundColor: '#9B9B9B'}) : null;
    let _textStyle = countDown >= 0 ? ({color: '#4D4D4D'}) : null;
    return (
      <View style={styles.cs_modal_content}>
        <TouchableOpacity activeOpacity={1} onPress={() => this.modalClose()} style={styles.cs_modal_close_wrap}>
          <Image source={require('../../../images/icons/close.png')} style={styles.cs_modal_close}/>
        </TouchableOpacity>
        <Image source={require('../../../images/icons/scan_house.png')} style={styles.cs_modal_house}/>
        <Text style={styles.cs_modal_house_name}>{companyInfo.filialeName}</Text>
        <Text style={styles.cs_modal_invited}>邀请你加入</Text>
        <View style={styles.cs_modal_house_info}>
          <Text style={styles.cs_modal_house_id}>公司ID:{companyInfo.organizationNumber}</Text>
          <Text style={styles.cs_modal_house_addr}>地 址:{companyInfo.address}</Text>
          <TouchableOpacity style={{...styles.cs_modal_btn, ..._style}} onPress={countDown >= 0 ? null : this.showAgreement}>
            <Text style={{...styles.cs_modal_btn_text, ..._textStyle}}>{btnText}</Text>
          </TouchableOpacity>
          <View style={styles.cs_modal_warn}>
            <Image source={require('../../../images/icons/warn.png')} style={styles.cs_modal_warn_icon}/>
            <Text style={styles.cs_modal_warn_tips}>请确认加入经纪公司信息是否正确</Text>
          </View>
        </View>
      </View>
    )
  };

  joinSuccessContent = () => {
    return (
      <View style={styles.cs_join_wrapper}>
        <View style={styles.cs_join_content}>
          <Text style={styles.cs_join_content_tips1}>加入公司成功</Text>
          <Text style={styles.cs_join_content_tips2}>你的账号权限已升级，请重新登录</Text>
        </View>
        <View style={styles.cs_join_footer}>
          <TouchableOpacity style={styles.cs_join_footer_btn} onPress={this.logout}>
            <Text textStyle={styles.cs_join_footer_btn_text}>确定</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  };

  render() {
    const {visible, joinSuccess} = this.state;
    const companyModalContent = this.companyModalContent();
    const joinSuccessContent = this.joinSuccessContent();
    const renderRight = (
      <TouchableOpacity style={styles.cs_photo} onPress={this.openPhoto}>
        <Text>相册</Text>
      </TouchableOpacity>
    );
    return (
      <BaseContainer title='扫一扫' rightView={renderRight} statusBarColor='#fff' scroll={false} bodyStyle={{padding: 0}}>

        <Scan onBarCodeRead={e => this.onBarCodeRead(e.nativeEvent.data.code)} scanRef={ref => this.scanRef = ref}/>

        <Modal visible={visible} onRequestClose={() => this.modalClose()} transparent={true}>
          <View style={styles.cs_modal_container}>
            {joinSuccess ? joinSuccessContent : companyModalContent}
          </View>
        </Modal>

      </BaseContainer>
    )
  }
}

const mapStateToProps = ({config, user}) => {
  return {config, user, requestUrl: config.requestUrl}
};

export default connect(mapStateToProps)(BusinessScanPage)

const styles = StyleSheet.create({
  cs_code: {
    flex: 1
  },
  cs_photo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: scaleSize(32),
    paddingLeft: scaleSize(32)
  },
  cs_code_icon_content: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(20),
  },
  cs_code_icon: {
    width: scaleSize(40),
    height: scaleSize(40)
  },
  cs_code_icon_text: {
    color: '#fff',
  },
  cs_code_tips: {
    paddingTop: scaleSize(30),
    width: '100%',
    color: '#fff',
    textAlign: 'center'
  },
  cs_modal_container: {
    backgroundColor: 'rgba(0,0,0,0)',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cs_modal_content: {
    backgroundColor: '#fff',
    width: scaleSize(560),
    // height: scaleSize(700),
    borderTopLeftRadius: scaleSize(20),
    borderTopRightRadius: scaleSize(20),
    paddingTop: scaleSize(28),
    flexDirection: 'column',
    alignItems: 'center'
  },
  cs_modal_close_wrap: {
    position: 'absolute',
    top: scaleSize(30),
    right: scaleSize(30)
  },
  cs_modal_close: {
    width: scaleSize(30),
    height: scaleSize(30),
  },
  cs_modal_house: {
    width: scaleSize(200),
    height: scaleSize(200)
  },
  cs_modal_house_name: {
    paddingTop: scaleSize(20),
    paddingLeft: scaleSize(50),
    paddingRight: scaleSize(50),
    fontSize: scaleSize(32),
    color: '#5f5f5f'
  },
  cs_modal_invited: {
    paddingTop: scaleSize(16),
    paddingLeft: scaleSize(50),
    paddingRight: scaleSize(50),
    fontSize: scaleSize(28),
    color: '#4D4D4D'
  },
  cs_modal_house_info: {
    paddingLeft: scaleSize(50),
    paddingRight: scaleSize(50),
    width: '100%',
    paddingTop: scaleSize(30),
  },
  cs_modal_house_id: {
    width: '100%',
    textAlign: 'left',
    color: '#9f9f9f',
    fontSize: scaleSize(28)
  },
  cs_modal_house_addr: {
    paddingTop: scaleSize(30),
    color: '#9f9f9f',
    width: '100%',
    textAlign: 'left',
    fontSize: scaleSize(28)
  },
  cs_modal_btn: {
    width: '100%',
    backgroundColor: '#FDA20C',
    height: scaleSize(88),
    borderRadius: scaleSize(44),
    marginTop: scaleSize(50),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cs_modal_btn_text: {
    color: '#fff',
    fontSize: scaleSize(30)
  },
  cs_modal_warn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: scaleSize(30),
    paddingBottom: scaleSize(40)
  },
  cs_modal_warn_icon: {
    width: scaleSize(32),
    height: scaleSize(32)
  },
  cs_modal_warn_tips: {
    color: '#CBCBCB',
    fontSize: scaleSize(24)
  },
  cs_modal_content_1: {
    backgroundColor: '#fff',
    width: scaleSize(560),
    height: scaleSize(700),
    flexDirection: 'column',
    alignItems: 'center',
    borderTopLeftRadius: scaleSize(20),
    borderTopRightRadius: scaleSize(20),
  },
  cs_modal_title_wrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDA20C',
    height: scaleSize(80),
    width: '100%',
    borderTopLeftRadius: scaleSize(20),
    borderTopRightRadius: scaleSize(20),
  },
  cs_modal_title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: scaleSize(30)
  },
  cs_modal_content_container: {
    paddingLeft: scaleSize(20),
    paddingRight: scaleSize(20),
    paddingTop: scaleSize(30),
    flex: 1
  },
  cs_modal_agreement_1: {},
  cs_modal_footer: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#aaa'
  },
  cs_modal_btn_1: {
    height: scaleSize(80),
    flex: 1,
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: '#aaa'
  },
  cs_modal_btn_text_1: {
    color: '#aaa'
  },
  cs_modal_btn_2: {
    height: scaleSize(80),
    flex: 1,
    backgroundColor: '#fff'
  },
  cs_modal_btn_text_2: {
    color: '#FDA20C'
  },
  cs_join_wrapper: {
    width: '65%',
    backgroundColor: '#fff',
    borderRadius: scaleSize(6)
  },
  cs_join_content: {
    paddingRight: scaleSize(42),
    paddingLeft: scaleSize(42),
    paddingTop: scaleSize(30),
    paddingBottom: scaleSize(40)
  },
  cs_join_content_tips1: {
    color: '#4D4D4D',
    width: '100%',
    textAlign: 'center',
    fontSize: scaleSize(32)
  },
  cs_join_content_tips2: {
    color: '#868686',
    width: '100%',
    paddingTop: scaleSize(30)
  },
  cs_join_footer: {
    width: '100%',
    flexDirection: 'row'
  },
  cs_join_footer_btn: {
    flex: 1,
    width: '100%',
    height: scaleSize(88),
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EAEAEA',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cs_join_footer_btn_text: {
    color: '#FDA20C',
    fontSize: scaleSize(28)
  }
});
