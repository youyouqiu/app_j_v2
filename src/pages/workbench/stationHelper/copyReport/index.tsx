import React from "react";
import Page from "@/components/Page";
import {Image, View, Text, FlatList, TouchableOpacity, ActivityIndicator, Modal, Clipboard, Switch} from "react-native";
import styles from "./styles";
import CopyReportItem from "@/pages/workbench/stationHelper/components/CopyReportItem";
import TemplateModal from "@/pages/workbench/stationHelper/components/TemplateModal";
import API from "@/services/stationHelper";
import storage from "@/utils/storage";
import {connect} from "react-redux";
import {STORAGE_KEY} from "@/constants";
import {Toast} from '@new-space/teaset'
import {copyMult, reportDataApi, copyStatistic, copyReset} from "@/services/report";
// @ts-ignore
import * as WeChat from 'xkj-react-native-wechat'
import NoData from "@/businessComponents/noData";
import {timeToString} from "@/utils/utils";

class CopyReport extends React.Component<any> {


    state: any = {
        visible: false,
        reportList: [],
        refreshing: false,
        buildingTreeId: '',
        reportTemplate: {},
        checkboxSelectArr: [],
        cleanVisible: false,
        disabledCheckBox: false,
        hasMore: true,
        showFooter: true,
        newReportTemplate: false,
        showEmptyComponent: false,
        copiedCount: 0,
        allTotal: 0,
        switchStatus: false,
        prevCopyTime: null,
        prevCopyNum: 0,
        reportTemplateText: '',
        userId: ''
    };

    commonData = {
        prevAction: ''
    };

    pageParams = {
        pageIndex: 0,
        pageSize: 30,
        type: 4,//报备和到访未确认
        totalCount: 0
    };

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            ...prevState,
            userId: nextProps.user.userInfo.id,
            buildingTreeId: nextProps.navigation.state.params.buildingTreeId || ''
        }
    }

    componentDidMount(): void {
        this.getReport();
        this.reportTemplate();
        this.copyStatistic();
        this.getPrevCopyInfo()
    }

    getPrevCopyInfo = async () => {
        const {userId, buildingTreeId} = this.state;
        const result: any = await storage.get(STORAGE_KEY.COPY_REPORT_TIME_AND_NUM).catch(err => null);
        if (result && result[userId] && result[userId][buildingTreeId]) {
            const {time, num} = result[userId][buildingTreeId];
            this.setState({
                prevCopyTime: time,
                prevCopyNum: num
            })
        }
    };

    copyStatistic = async () => {
        const result = await copyStatistic(this.state.buildingTreeId).catch(err => {
            console.error(err.messages)
        });
        if (!result) return;
        this.setState({
            copiedCount: result.extension.copiedCount,
            allTotal: result.extension.total
        })
    };

    getReport = async () => {
        const {api} = this.props.config.requestUrl;
        const {switchStatus} = this.state;
        const requestData = {
            ...this.pageParams,
            buildingTreeIds: [this.state.buildingTreeId]
        };
        const result = await reportDataApi(api, requestData);
        if (!result) return;
        const {totalCount, extension, pageIndex, pageSize} = result;
        this.pageParams.totalCount = totalCount;

        let checkboxSelectArr: any = this.state.checkboxSelectArr;
        if (switchStatus && pageIndex === 0) {
            checkboxSelectArr = extension.map((item: any) => item.id)
        }

        this.setState((prev: any) => ({
            reportList: [...prev.reportList, ...extension],
            refreshing: false,
            showFooter: true,
            checkboxSelectArr,
            showEmptyComponent: [...prev.reportList, ...extension].length === 0,
            hasMore: (pageIndex + 1) * pageSize < totalCount
        }));
    };

    reportTemplate = async () => {
        const {buildingTreeId, userId} = this.state;
        const result = await API.reportTemplate(buildingTreeId);
        if (!result || result.code !== '0') return;
        const reportTemplateText = result.extension.reportTemplateText.replace(/\n/g, '');
        // const reportTemplateText = '777';
        let result2 = await storage.get(STORAGE_KEY.REPORT_TEMPLATE_TEXT).catch(err => {
            storage.set(STORAGE_KEY.REPORT_TEMPLATE_TEXT, {
                [userId]: {
                    [buildingTreeId]: reportTemplateText
                }
            })
        });
        console.log('result2', result2);
        let newReportTemplate = false;
        if (!result2 || (result2 && !result2[userId]) || (result2 && result2[userId] && !result2[userId][buildingTreeId])) {
            if (!result2) result2 = {};
            await storage.set(STORAGE_KEY.REPORT_TEMPLATE_TEXT, {
                ...result2,
                [userId]: {
                    ...result2[userId],
                    [buildingTreeId]: reportTemplateText
                }
            })
        }
        if (result2 && result2[userId] && result2[userId][buildingTreeId]) {
            newReportTemplate = result2[userId][buildingTreeId] !== reportTemplateText
        }
        this.setState({
            reportTemplate: result.extension,
            reportTemplateText,
            newReportTemplate: newReportTemplate
        })
    };

    cleanModalToggle = (type: any) => {
        this.setState((prev: any) => ({
            cleanVisible: !prev.cleanVisible
        }), () => {
            if (type === 'confirm') this.cleanCopyReport()
        });
    };

    cleanCopyReport = async () => {
        // await storage.remove(STORAGE_KEY.REPORT_TEMPLATE_TEXT);
        const {buildingTreeId} = this.state;
        const result = await copyReset(buildingTreeId).catch(err => {
            console.error(err.message)
        });
        if (!result) return;
        this.pageParams.pageIndex = 0;
        this.setState({
            refreshing: true,
            reportList: [],
            checkboxSelectArr: [],
            disabledCheckBox: false,
            showFooter: false
        }, () => this.getReport());
        this.copyStatistic();
    };

    /**
     * 当prevAction为doBatchCopy时，说明是第一次打开报备模板，且带有复制操作
     * @param type
     */
    modalToggle = async (type?: string) => {
        const {reportTemplateText, userId, buildingTreeId} = this.state;
        const {prevAction} = this.commonData;
        try {
            await storage.set(STORAGE_KEY.HAVE_SHOW_REPORT_TEMPLATE, {[userId]: true});

            const result = await storage.get(STORAGE_KEY.REPORT_TEMPLATE_TEXT).catch((err)=>{
                console.log('err',err)
            });

            if (this.state.newReportTemplate) {
                await storage.set(STORAGE_KEY.REPORT_TEMPLATE_TEXT, {
                    ...result,
                    [userId]: {
                        ...result[userId],
                        [buildingTreeId]: reportTemplateText
                    }
                })
            }
            this.setState((prev: any) => ({
                visible: !prev.visible,
                newReportTemplate: false
            }));
        }catch (e) {
            console.log('------',e)
        }

        if (prevAction === 'doBatchCopy' && type === 'btnClick') this.doBatchCopy()
    };

    copyFromMemory = async () => {
        const {userId, buildingTreeId} = this.state;
        const result = await storage.get(STORAGE_KEY.COPY_REPORT_TIME_AND_NUM).catch(err => {

        });
        const response = await copyMult({reportIds: result[userId][buildingTreeId].data, status: '1'}).catch(err => {
            console.log(err.message)
        });
        if (!response) return;
        const copyText = response.extension.copyText;
        Clipboard.setString(copyText);
        Toast.success('复制成功!')
    };

    doBatchCopy = async () => {
        const {checkboxSelectArr, switchStatus, userId, buildingTreeId} = this.state;
        if (checkboxSelectArr.length === 0) {
            Toast.info('您未选择任何信息');
            return
        }

        //如果未看过模板，则展示模板
        const haveShowReportTemplate = await storage.get(STORAGE_KEY.HAVE_SHOW_REPORT_TEMPLATE).catch(err => {
            this.commonData.prevAction = 'doBatchCopy';
            this.modalToggle();
        });
        if (!haveShowReportTemplate) return;
        if (!haveShowReportTemplate[userId]) {
            this.commonData.prevAction = 'doBatchCopy';
            this.modalToggle();
        }

        const response = await copyMult({reportIds: checkboxSelectArr, status: '1'}).catch(err => {
            console.error(err)
        });
        if (!response) return;
        const copyText = response.extension.copyText;
        Clipboard.setString(copyText);

        const toastText = switchStatus ? '复制成功，已自动勾选后续报备!' : '复制成功!';
        this.commonData.prevAction = '';
        Toast.success(toastText);

        this.getPrevCopyInfo();
        this.copyStatistic();

        //刷新列表
        this.pageParams.pageIndex = 0;
        this.setState({
            refreshing: true,
            reportList: [],
            checkboxSelectArr: [],
            showFooter: false
        }, () => {
            this.getReport();
            this.copyStatistic();
        });

        //将复制时的时间和条数保存在缓存中
        let result = await storage.get(STORAGE_KEY.COPY_REPORT_TIME_AND_NUM).catch(err => null);
        if (!result) result = {};
        await storage.set(STORAGE_KEY.COPY_REPORT_TIME_AND_NUM, {
            ...result,
            [userId]: {
                ...result[userId],
                [buildingTreeId]: {
                    time: new Date().getTime(),
                    num: checkboxSelectArr.length,
                    data: checkboxSelectArr
                }
            }
        });
        //保存后更新此次复制信息
        this.getPrevCopyInfo();
    };


    checkBoxOnChange = (e: any, item: any) => {
        let {checkboxSelectArr}: any = this.state;
        let disabledCheckBox = false;
        if (checkboxSelectArr.includes(item)) {
            checkboxSelectArr.splice(checkboxSelectArr.indexOf(item), 1);
            checkboxSelectArr.length < 30 && (disabledCheckBox = false)
        } else {
            checkboxSelectArr.push(item);
            checkboxSelectArr.length >= 30 && (disabledCheckBox = true)
        }
        this.setState({checkboxSelectArr, disabledCheckBox, switchStatus: false})
    };

    onRefresh = () => {
        this.pageParams.pageIndex = 0;
        this.setState({
            refreshing: true,
            reportList: [],
            switchStatus: false,
            checkboxSelectArr: [],
            disabledCheckBox: false,
            showFooter: false
        }, () => this.getReport());
        this.copyStatistic();
    };

    onEndReached = () => {
        const {hasMore} = this.state;
        if (hasMore) {
            this.pageParams.pageIndex++;
            this.getReport();
        }
    };

    openWeChat = async () => {
        try {
            const installed = await WeChat.isWXAppInstalled();
            if (!installed) {
                Toast.message('请您安装微信之后再试');
                return
            }
            await WeChat.openWXApp();
        } catch (e) {
        }
    };

    switchOnValueChange = (switchStatus: any) => {
        this.setState({switchStatus});
        if (!switchStatus) {
            this.setState({
                checkboxSelectArr: [],
                disabledCheckBox: false
            });
            return
        }
        const {reportList}: any = this.state;
        const checkboxSelectArr = [];
        for (let i = 0; i < reportList.length; i++) {
            checkboxSelectArr.push(reportList[i].id);
            if (checkboxSelectArr.length >= 30) break
        }
        this.setState({checkboxSelectArr, disabledCheckBox: true});
    };

    renderItem = ({item}: any) => {
        const {checkboxSelectArr, disabledCheckBox} = this.state;
        return (
            <CopyReportItem
                item={item}
                disabledCheckBox={disabledCheckBox}
                checkboxSelectArr={checkboxSelectArr}
                checkBoxOnChange={this.checkBoxOnChange}
            />
        )
    };

    listHeaderComponent = () => {
        const {prevCopyTime, prevCopyNum} = this.state;
        return (
            prevCopyTime ? (
                <View style={styles.cr_flatList_header}>
                    <Text style={styles.cr_flatList_header_time}>{timeToString(prevCopyTime)}复制了{prevCopyNum}条报备，</Text>
                    <Text style={styles.cr_flatList_header_click} onPress={this.copyFromMemory}>重新复制</Text>
                </View>
            ) : null
        )
    };

    listFooterComponent = () => {
        let content = null;
        const {hasMore} = this.state;
        if (hasMore) {
            content = <View style={styles.cr_listFooter_loading}><ActivityIndicator/><Text>&emsp;加载中</Text></View>;
        } else {
            content = <View style={styles.cr_listFooter_loading}><Text>无更多数据</Text></View>;
        }
        return content
    };

    render() {
        const {visible, refreshing, reportTemplate, checkboxSelectArr, cleanVisible, reportList, showEmptyComponent} = this.state;
        const {showFooter, newReportTemplate, copiedCount, allTotal, switchStatus} = this.state;
        const rightView = (
            <View style={styles.cr_headerIconWrapper}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.modalToggle()}>
                    {newReportTemplate ? <Text style={styles.cr_headerIconRedPoint}/> : null}
                    <Image style={styles.cr_headerIcon_1} source={require('../../../../images/icons/copyReport_1.png')}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={this.cleanModalToggle}>
                    <Image style={styles.cr_headerIcon_2} source={require('../../../../images/icons/copyReport_2.png')}/>
                </TouchableOpacity>
            </View>
        );

        const noDataTips = (
            <View style={styles.cr_noDataTips}>
                <Text style={styles.cr_noDataTips_text}>暂无可复制的报备，请下拉刷新</Text>
                <Text style={styles.cr_noDataTips_text}>若需要重新复制所有报备，点击右上角重置</Text>
            </View>
        );

        return (
            <Page scroll={false} title='复制报备' rightView={rightView}>
                <Text style={styles.cr_footer_tips} numberOfLines={1}>
                    此项目共有{allTotal}条有效报备，已复制{copiedCount}条，还有{allTotal - copiedCount}条未复制
                </Text>
                <View style={styles.cr_content}>
                    <FlatList
                        data={reportList}
                        extraData={this.state}
                        ListHeaderComponent={refreshing ? null : this.listHeaderComponent}
                        ListFooterComponent={showFooter && !showEmptyComponent ? this.listFooterComponent : null}
                        ListEmptyComponent={showEmptyComponent ? <NoData tips={noDataTips} style={styles.cr_noData}/> : null}
                        onEndReached={this.onEndReached}
                        refreshing={refreshing}
                        onRefresh={this.onRefresh}
                        onEndReachedThreshold={0.1}
                        showsVerticalScrollIndicator={false}
                        renderItem={this.renderItem}
                    />
                </View>
                <TouchableOpacity activeOpacity={0.9} onPress={this.openWeChat} style={styles.cr_fixed}>
                    <Image style={styles.cr_fixed_icon} source={require('../../../../images/icons/wechat_white.png')}/>
                    <Text style={styles.cr_fixed_text}>跳转微信</Text>
                </TouchableOpacity>
                <View style={styles.cr_footer}>
                    <View style={styles.cr_footer_content}>
                        <Switch value={switchStatus}
                                trackColor={{false: '#868686', true: '#4EDC4F'}}
                                onValueChange={this.switchOnValueChange}/>
                        <View style={styles.cr_footer_checkbox_label}>
                            <Text style={styles.cr_footer_checkbox_label_text1}>智能复制已{switchStatus ? '开启' : '关闭'}</Text>
                            <Text style={styles.cr_footer_checkbox_label_text2}>自动选择未复制报备</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.9} style={styles.cr_footer_btn} onPress={this.doBatchCopy}>
                            <Text style={styles.cr_footer_btn_text}>复制&nbsp;({Object.keys(checkboxSelectArr).length}/30条)</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {visible ? (
                    <TemplateModal
                        reportTemplate={reportTemplate}
                        visible={visible}
                        modalToggle={this.modalToggle}/>
                ) : null}
                <Modal visible={cleanVisible} transparent={true}
                       animationType='fade'
                       onRequestClose={() => this.cleanModalToggle('')}>
                    <TouchableOpacity
                        style={styles.cr_clean_container}
                        activeOpacity={0.9}
                        onPress={this.cleanModalToggle}>
                        <View style={styles.cr_clean_content}>
                            <Text style={styles.cr_clean_tips}>此操作将重置所有报备信息的复制状态建议在全部粘贴完成后执行</Text>
                            <View style={styles.cr_clean_footer}>
                                <TouchableOpacity
                                    style={[styles.cr_clean_btn, styles.cr_clean_btn_border]}
                                    activeOpacity={0.9}
                                    onPress={this.cleanModalToggle}>
                                    <Text style={styles.cr_clean_cancel}>取消</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.cr_clean_btn]}
                                    activeOpacity={0.9}
                                    onPress={() => this.cleanModalToggle('confirm')}>
                                    <Text style={styles.cr_clean_confirm}>确认重置</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </Page>
        )
    }
}

const mapStateToProps = ({user, config}: any) => {
    return {user, config}
};

export default connect(mapStateToProps)(CopyReport)
