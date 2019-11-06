import React, { Component } from 'react'
import BaseContainer from '../../../../components/Page'
import { TouchableOpacity, Text, StyleSheet, DeviceEventEmitter } from 'react-native'
import { scaleSize } from '../../../../utils/screenUtil';
import ScrollableTabView from 'react-native-scrollable-tab-view'
import CustomInfo from './customInfo/index'
import WechatInfo from './weChatInfo/index'
import { connect } from 'react-redux'
import { Toast } from 'teaset'
import Modal from '../../../../components/Modal'
import ApiCustom from '../../../../services/customManager'

const styles = StyleSheet.create({
    deleteText: {
        color: '#000000',
        fontSize: scaleSize(28),
        marginRight: scaleSize(32)
    },
    modalText: {
        color: '#868686',
        fontSize: scaleSize(28)
    }
})

class CustomDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info: {},
            cusData: {},
            visible: false,
            showDel: true
        }
    }

    componentDidMount() {
        console.log(this.props, '456785656')
        let info = ((this.props.navigation || {}).state || {}).params || {}
        this.setState({
            info
        }, () => {
            if (this.state.info.customerType === 0) {
                if (this.state.info.isRelationCustomerId) {
                    // 单纯客户已关联微信
                    this.setState({
                        isListCus: true
                    })
                } else {
                    this.setState({
                        pureCus: true
                    })
                }
            } else {
                if (this.state.info.isRelationCustomerId) {
                    this.setState({
                        isListCus: true
                    })
                } else {
                    this.setState({
                        pureWechat: true
                    })
                }
            }
        })

    }

    onChangeTab = (obj) => {
        if (obj.i === 0) {
            this.setState({
                showDel: true
            })
        } else {
            this.setState({
                showDel: false
            })
        }
    }

    deleteCus = async () => {
        console.log(this.state, 'this.statestate')
        this.setState({
            visible: true
        })
    }

    delete = async () => {
        let { api } = this.props.config.requestUrl
        let { info } = this.state
        // let info = ((this.props.navigation || {}).state || {}).params
        // if (info.customerType === 1) {
        //     this.setState({
        //         visible: false
        //     }, () => {
        //         Toast.message('该客户为微信客户，不能删除')
        //     })
        //     return
        // }
        let params = []
        if (info.fromCusList) {
            params = [info.id]
        } else {
            params = [info.relationCustomerId]
        }
        try {
            let res = await ApiCustom.deleteCus(api, params)
            if (res.code === '0') {
                Toast.message('删除客户成功')
                this.setState({
                    visible: false
                }, () => {
                    this.props.navigation.navigate('customerList');
                    DeviceEventEmitter.emit('AddCustomer')
                })
            }
        } catch (e) {
            Toast.message('删除客户失败')
        }
    }

    onClose = async () => {
        this.setState({
            visible: false
        })
    }

    render() {
        let { isListCus, pureCus, pureWechat, showDel } = this.state
        return (
            <BaseContainer
                title='客户详情'
                scroll={false}
                contentBgColor={'#F8F8F8'}
                bodyStyle={{ padding: 0 }}
                rightView={
                        showDel && !pureWechat ?
                        <TouchableOpacity onPress={() => this.deleteCus()}>
                            <Text style={styles.deleteText}>删除</Text>
                        </TouchableOpacity> : null
                }
            >
                {
                    isListCus ?
                        <ScrollableTabView
                            locked={true}
                            initialPage={0}
                            tabBarTextStyle={{ color: '#868686', fontSize: scaleSize(28), fontWeight: '500' }}
                            tabBarUnderlineStyle={{ backgroundColor: '#1F3070', height: scaleSize(5), width: scaleSize(55) }}
                            tabBarActiveTextColor='#1F3070'
                            tabBarInactiveTextColor='#868686'
                            tabBarBackgroundColor='#FFFFFF'
                            tabBarStyle={{ height: scaleSize(60), width: scaleSize(750), backgroundColor: '#FFFFFF' }}
                            onChangeTab={(obj) => this.onChangeTab(obj)}
                        >
                            <CustomInfo tabLabel='客户信息' navigation={this.props.navigation} />
                            <WechatInfo tabLabel='微信动态' navigation={this.props.navigation} />
                        </ScrollableTabView> : null
                }
                {
                    pureCus ? <CustomInfo navigation={this.props.navigation} /> : null
                }
                {
                    pureWechat ? <WechatInfo navigation={this.props.navigation} /> : null
                }

                <Modal
                    visible={this.state.visible}
                    onClose={this.onClose}
                    onOk={this.delete}
                    type='conform'
                    width={541}
                    height={200}
                    title=''
                >
                    <Text style={styles.modalText}>确定删除该用户？ 请谨慎操作</Text>
                </Modal>
            </BaseContainer>



        )
    }
}

const mapStateToProps = ({ config, user }) => {
    return { config, user }
}

export default connect(mapStateToProps)(CustomDetail)
