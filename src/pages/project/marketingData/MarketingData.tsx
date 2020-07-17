import React from "react";
import {View, Text, Image, TouchableOpacity, Platform, Linking, ActivityIndicator,NativeModules} from "react-native";
import {connect} from "react-redux";
import Page from "../../../components/Page";
import projectService from "../../../services/projectService";
import styles from "./styles";
import moment from "moment";
import {transFormSize} from "@/utils/utils";
import NoData from "../../../businessComponents/noData";

const icons: any = {
    xls: require('../../../images/icons/marketing/xls.png'),
    xlsx: require('../../../images/icons/marketing/xls.png'),
    pdf: require('../../../images/icons/marketing/pdf.png'),
    doc: require('../../../images/icons/marketing/doc.png'),
    docx: require('../../../images/icons/marketing/doc.png'),
};

class MarketingData extends React.Component<any> {

    state: stateProps = {
        buildingTreeId: '',
        marketingList: [],
        showEmptyComponent: false
    };

    constructor(props: any) {
        super(props);
        this.state = {
            buildingTreeId: props.navigation.state.params.buildingTreeId || '',
            showEmptyComponent: false
        }
    }

    componentDidMount(): void {
        this.getQueryAwardSale();
    }

    getQueryAwardSale = async () => {
        const {requestUrl} = this.props;
        const {buildingTreeId} = this.state;
        const requestData = {
            buildingTreeId,
            status: 8
        };
        const response = await projectService.queryAwardSaleReq(requestData);
        this.setState({
            marketingList: response.extension,
            showEmptyComponent: response.extension.length === 0
        })
    };

    scanData = (url: string, fileName: string) => {
        // if (Platform.OS === 'android') {
        //     this.toLookFile({url,fileName})
        // } else {
          this.props.navigation.navigate('xkjWebView', {
            title: fileName,
            url: Platform.OS === 'android' ? `https://view.officeapps.live.com/op/view.aspx?src=${url}` : url,
          })
            // Linking.openURL(url)
        // }
    };

    toLookFile = (item:any)=>{
        NativeModules.DownloadApk.downloading(item.url, item.fileName)
    }

    render() {
        const {marketingList = [], showEmptyComponent} = this.state;

        let renderFooter = null;
        if (showEmptyComponent) {
            renderFooter = <NoData tips='暂无数据'/>
        } else {
            renderFooter = (
                <View style={styles.md_loadingWrap}>
                    <ActivityIndicator/>
                    <Text style={styles.md_loadingText}>&emsp;加载中</Text>
                </View>
            )
        }
        return (
            <Page title='销讲资料'>
                <View style={styles.md_wrapper}>
                    {marketingList.length > 0 ? marketingList.map((item: any, idx) => (
                        <TouchableOpacity onPress={() => this.scanData(item.fileUrl, item.fileName)} activeOpacity={0.8} key={idx} style={styles.md_listItem}>
                            <Image style={styles.md_icon} source={icons[item.fileExt.replace('.', '')]}/>
                            <View style={styles.md_right}>
                                <View style={styles.md_dataLeft}>
                                    <Text style={styles.md_name} numberOfLines={1}>{item.fileName}</Text>
                                    <Text style={styles.md_time}>{moment(item.createTime).format('YYYY-MM-DD')}</Text>
                                </View>
                                <Text style={styles.md_size}>{transFormSize(item.fileSize)}</Text>
                            </View>
                        </TouchableOpacity>
                    )) : renderFooter}
                </View>
            </Page>
        )
    }
}


const mapStateToProps = ({config, global, user, point}: any) => {
    return {
        requestUrl: config.requestUrl,
        sendPoint: point.buryingPoint,
        global, user
    }
};

export default connect(mapStateToProps)(MarketingData);

interface stateProps {
    buildingTreeId?: string,
    marketingList?: Array<Object>,
    showEmptyComponent?: boolean
}
