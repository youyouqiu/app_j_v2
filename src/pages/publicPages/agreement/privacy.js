import React, { Component } from 'react';
import { View, Text, Image } from 'react-native'
import Page from '../../../components/Page'
import { styles } from './styles';
import { scaleSize } from '../../../utils/screenUtil';
export default class Privacy extends Component {

    componentWillUnmount () {
        let {callBack} = this.props.navigation.state.params || {}
        callBack && callBack()
    }
    
    render() {
        return (
            <Page title='隐私政策'>
                <View style={styles.wrap}>
                    <View style={[styles.space, styles.center]}>
                        <Text style={styles.textBig}> 引言 </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.textBig}>
                            &emsp;&emsp;铺侦探经纪人（以下简称我们）系由新空间（重庆）科技有限公司独立设计开发，
                            针对商业地产领域，集一手交易、二手交易、租赁、装修、金融、运营为一体的全生命周期商业地产综合服务平台。
                            致力于将开发商、经纪公司、地产经纪人、投资人等产业链上的所有参与者进行完美的撮合，快速解决各自的交易需求。
                            我们非常重视您的隐私和个人信息保护。您在使用我们的产品与/或服务时，
                            我们可能会收集和使用您的相关信息。我们希望通过《铺侦探隐私政策》（以下简称本隐私政策）
                            向您说明我们在您使用我们的产品与/或服务时如何收集、使用、保存、共享和转让这些信息，
                            以及我们为您提供的访问、更新、删除和保护这些信息的方式。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.textBig}>
                            &emsp;&emsp;本政策将帮助您了解以下内容：
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;1、我们如何收集和使用您的个人信息
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;2、我们如何使用 Cookie 和同类技术
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;3、我们如何共享、转让、公开披露您的个人信息
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;4、我们如何保护和保存您的个人信息
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;5、您如何管理个人信息
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;6、未成年人信息的保护
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;7、通知和修订
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;8、如何联系我们
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.textBig}>
                            &emsp;&emsp;本隐私政策与您所使用的铺侦探经纪人服务以及该服务所包括的各种业务功能
                            （以下统称“我们的产品与/或服务”）息息相关，
                            希望您在使用我们的产品与/或服务前仔细阅读并确认您已经充分理解本政策所写明的内容，
                            并让您可以按照本隐私政策的指引做出您认为适当的选择。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.textBig}>
                            &emsp;&emsp;当您选择游客模式进入铺侦探经纪人时，我们为您提供的服务为房源信息查看和浏览，若您需要其他服务，则需注册登录。同时，我们会将您所在城市定位默认城市，若您需查看其他城市房源信息，您可以在“房源-城市切换”手动更改。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.textBig}>
                            &emsp;&emsp;最近更新日期为：2019年10月
                    </Text>
                    </View>

                    <View style={[styles.space, styles.center]}>
                        <Text style={styles.textBig}> 目录 </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;•	一、我们如何收集和使用您的个人信息
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;•	二、我们如何使用 Cookie 和同类技术
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;•	三、我们如何共享、转让、公开披露您的个人信息
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;•	四、我们如何保护和保存您的个人信息
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;•	五、您如何管理您的个人信息
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;•	六、未成年人的个人信息保护
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;•	七、通知和修订
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;•	八、如何联系我们
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.textBig}>
                            &emsp;&emsp;一、我们如何收集和使用您的个人信息
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（一）个人信息及个人敏感信息定义及范围
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;个人信息是指以电子或者其他方式记录的能够单独或者
                            与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息，
                            列举如下：
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Image style={{ width: scaleSize(700), height: scaleSize(600) }} source={require('../../../images/pictures/ys_one.png')} />
                    </View>


                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;个人敏感信息是指一旦泄露、非法提供或滥用可能危害人身和财产安全，
                            极易导致个人名誉、身心健康受到损害或歧视性待遇等的个人信息，列举如下：
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Image style={{ width: scaleSize(700), height: scaleSize(313) }} source={require('../../../images/pictures/ys_two.png')} />
                    </View>


                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;注：上述列举的个人信息和敏感信息非本隐私政策全部需要采集的信息，
                            仅为例示，本隐私政策中需要采集的个人信息及个人敏感信息以本条第（二）约定为准，
                            同时采用加粗方式呈现。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（二）在您使用我们的产品及/或服务时，我们需要/可能需要收集和使用
                            的您的个人信息将用于以下目的：
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;1、核心业务功能的使用（采集方式为您手动填写或自动采集）
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;本隐私政策所称核心业务功能是我们为您提供我们的产品及/或服务时的保障及前提。
                            为实现核心业务功能需要采集或填写到您的个人敏感信息时，若您选择不提供或不同意我们采集、使用，
                            将导致本产品或服务无法正常运行、我们将无法为您提供服务。核心业务功能包含：
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（1）为实现“用户注册”服务，需要：法人用户需要
                            <Text style={styles.textBig}>营业执照复印件。</Text>
                            独立经纪人需要
                        <Text style={styles.textBig}>个人手机号码；</Text>
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（2）为实现“房源展示”服务，需要：
                        <Text style={styles.textBig}>经纪人模糊定位位置信息；</Text>
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（3）为实现“报备客户”、“客户管理”、“报备管理”、“签约管理”、
                            “重要预警”、“业务信息”服务，需要：
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.textBig}>
                            &emsp;&emsp;&emsp;&emsp;1）经纪人手机号码、
                        <Text style={styles.text}>姓名</Text>
                        </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.textBig}>
                            &emsp;&emsp;&emsp;&emsp;2）所在公司名称
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;&emsp;&emsp;3）购房人姓名、性别
                        <Text style={styles.textBig}>、手机号码</Text>
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（4）为实现“驻场助手”服务，需要
                        <Text style={styles.textBig}>：法人用户整体业务数据集合。</Text>
                        </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;2、附加业务功能的使用（采集方式为您手动填写或授权我们采集）
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;本隐私政策的附加业务功能指我们为确保您能更加方便、快捷的享受到核心业务功能，
                            而向您提供的相关产品或服务。若需要采集的个人敏感信息，若您选择不提供或不同意我们采集、使用，
                            将导致对应的附加业务功能无法正常运行、我们将无法为您提供服务，
                            但不影响核心业务功能的使用。附加业务功能包含：
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（1）为实现“工作台 - 天气”、“商业行情走势”服务，我们
                        <Text style={styles.textBig}>会收集您的位置信息</Text>
                            （我们仅收集您当时所处的地理位置，但不会将您各时段的位置信息进行结合以判断您的行踪轨迹）
                            来判断您所处的地点，自动为您推荐您所在区域可以购买的商品或服务，
                            比如向您推荐离您最近的房源信息。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（2）为实现“客户列表 - 一键报备”服务，需要：
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.textBig}>
                            &emsp;&emsp;&emsp;&emsp;1）经纪人手机号码、
                        <Text style={styles.text}>姓名</Text>
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;&emsp;&emsp;2）所在公司名称
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;&emsp;&emsp;3）客户姓名、性别
                        <Text style={styles.textBig}>、手机号码（非全号码）</Text>
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（3）为实现“首页快捷入口 — 扫一扫”，需要
                        <Text style={styles.textBig}>：相机使用权限；</Text>
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（4）为实现“微信客户”服务，需要
                        <Text style={styles.textBig}>：经纪人客户的微信授权信息；</Text>
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（5）为实现“地图找铺”服务，需要
                        <Text style={styles.textBig}>：收集您的位置信息；</Text>
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（6）为实现“获客小程序”服务，需要
                        <Text style={styles.textBig}>：收集您的微信二维码及手机号码；</Text>
                        </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;3、您充分知晓，以下情形中，我们收集、使用个人信息无需征得您的授权同意：
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（1）与国家安全、国防安全有关的；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（2）与公共安全、公共卫生、重大公共利益有关的；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（3）与犯罪侦查、起诉、审判和判决执行等有关的；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（4）出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（5）所收集的个人信息是个人信息主体自行向社会公众公开的；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（6）从合法公开披露的信息中收集的您的个人信息的，如合法的新闻报道、政府信息公开等渠道；
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（7）根据您的要求签订合同所必需的；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（8）用于维护所提供的产品与/或服务的安全稳定运行所必需的，例如发现、处置产品与/或服务的故障；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（9）为合法的新闻报道所必需的；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（10）学术研究机构基于公共利益开展统计或学术研究所必要，
                            且对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（11）法律法规规定的其他情形。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;4、我们从第三方获得您个人信息的情形
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;我们可能从第三方获取您授权共享的账户信息（头像、昵称），
                            并在您同意本隐私政策后将您的第三方账户与您的铺侦探经纪人账户绑定，
                            使您可以通过第三方账户直接登录并使用我们的产品与/或服务。
                            我们会将依据与第三方的约定、对个人信息来源的合法性进行确认后，
                            在符合相关法律和法规规定的前提下，使用您的这些个人信息。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;5、您个人信息使用的规则
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;1、我们会根据本隐私政策的约定并为实现我们的产品与/或服务功能对所收集的个人信息进行使用。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;2、在收集您的个人信息后，我们将通过技术手段对数据进行去标识化处理，
                            去标识化处理的信息将无法识别主体。请您了解并同意，在此情况下我们有权使用已经去标识化的信息；
                            并在不透露您个人信息的前提下，我们有权对用户数据库进行分析并予以商业化的利用。
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;3、请您注意，您在使用我们的产品与/或服务时所提供的所有个人信息，
                            除非您删除或通过系统设置拒绝我们收集，
                            否则将在您使用我们的产品与/或服务期间持续授权我们使用。在您注销账号时，
                            我们将停止使用并删除您的个人信息。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;4、我们会对我们的产品与/或服务使用情况进行统计，
                            并可能会与公众或第三方共享这些统计信息，
                            以展示我们的产品与/或服务的整体使用趋势。
                            但这些统计信息不包含您的任何身份识别信息。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;5、当我们展示您的个人信息时，我们会采用包括内容替换、匿名处理方式对您的信息进行脱敏，
                            以保护您的信息安全。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;6、当我们要将您的个人信息用于本政策未载明的其它用途时，
                            或基于特定目的收集而来的信息用于其他目的时，会通过您主动做出勾选的形式事先征求您的同意。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.textBig}>
                            &emsp;&emsp;二、我们如何使用 Cookie 和同类技术
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（一）Cookies的使用
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;1、为实现您联机体验的个性化需求，使您获得更轻松的访问体验。
                            我们会在您的计算机或移动设备上发送一个或多个名为Cookies的小数据文件，
                            指定给您的Cookies 是唯一的，它只能被将Cookies发布给您的域中的Web服务器读取。
                            我们向您发送Cookies是为了简化您重复登录的步骤、
                            存储您的购物偏好或您购物车中的商品等数据进而为您提供购物的偏好设置、
                            帮助您优化对广告的选择与互动、帮助判断您的登录状态以及账户或数据安全。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;2、我们不会将 Cookies 用于本隐私政策所述目的之外的任何用途。
                            您可根据自己的偏好管理或删除 Cookies。您可以清除计算机上保存的所有 Cookies，
                            大部分网络浏览器会自动接受Cookies，但您通常可根据自己的需要来修改浏览器的设置以拒绝
                             Cookies；另外，您也可以清除软件内保存的所有Cookies。但如果您这么做，
                             您可能需要在每一次访问铺侦探经纪人时亲自更改用户设置，而且您之前所记录的相应信息也均会被删除，
                            并且可能会对您所使用服务的安全性有一定影响。
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（二）网络Beacon和同类技术的使用
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;除 Cookie 外，我们还会在网站上使用网络Beacon等其他同类技术。
                            我们的网页上常会包含一些电子图像（称为"单像素" GIF 文件或 "网络 beacon"）。
                            我们使用网络beacon的方式有：
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;1、通过在铺侦探经纪人上使用网络beacon，计算用户访问数量，
                            并通过访问 cookie 辨认注册的铺侦探经纪人用户。
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;2、通过得到的cookies信息，为您提供个性化服务。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.textBig}>
                            &emsp;&emsp;三、我们如何共享、转让、公开披露您的个人信息
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（一）共享
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;我们不会与铺侦探经纪人运营单位以外的任何公司、
                            组织和个人分享您的个人信息，但以下情况除外：
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;1、获得您的明确同意后，我们会与其他方共享您的个人信息。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;2、我们可能会根据法律法规规定，或按政府主管部门的强制性要求，
                            对外共享您的个人信息。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;3、基于学术研究而使用；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;4、基于符合法律法规的社会公共利益而使用。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;5、您的个人信息可能会与铺侦探经纪人运营单位的合作伙伴共享。
                            我们只会共享必要的个人信息，且受本隐私政策中所声明目的的约束，
                            同时将采取内容替换、匿名处理方式对您的信息进行脱敏。
                            合作公司如要改变个人信息的处理目的，将再次征求您的授权同意。
                            我们的合作伙伴包括，商品或技术服务的供应商包括信鸽、百度地图、天气、阿里云等。
                            我们可能会将您的个人信息共享给支持我们功能的第三方，这些支持包括为我们的提供授权房源、
                            供货或提供基础设施技术服务、支付服务、数据处理等。我们共享这些信息的目的是可以实现我们的核心功能，
                            比如为实现短信验证码推送、楼盘详情页地图服务、工作台显示对应位置详情页面、个人中心意见反馈等功能。
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;6、对我们与之共享个人信息的公司、组织和个人，我们会与其签署严格的保密协定，
                            要求他们按照我们的说明以及其他任何相关的保密和安全措施来处理个人信息。
                            在个人敏感数据使用上，我们要求第三方采用数据脱敏和加密技术，从而更好地保护用户数据。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;7、为了遵守法律、执行或适用我们的使用条件和其他协议，
                            或者为了保护铺侦探、您或其他铺侦探客户的权利及其财产或安全，
                            比如为防止欺诈等违法活动和减少信用风险，而与其他公司和组织交换信息。
                            不过，这并不包括违反本隐私政策中所作的承诺而为获利目的出售、出租、
                            共享或以其它方式披露的个人信息。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（二）转让
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;1、在获取明确同意的情况下转让：获得您的明确同意后，
                            我们会向其他方转让您的个人信息；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;2、在涉及合并、收购或破产清算时，如涉及到个人信息转让，
                            我们会在要求新的持有您个人信息的公司、组织继续受此隐私政策的约束，
                            否则我们将要求该公司、组织重新向您征求授权同意。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（三）公开披露
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;我们仅会在以下情况下，公开披露您的个人信息：
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;1、获得您明确同意后；
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;2、基于法律的披露：在法律、法律程序、诉讼或政府主管部门强制性要求的情况下，
                            我们可能会公开披露您的个人信息。
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.textBig}>
                            &emsp;&emsp;四、我们如何保护和保存您的个人信息
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（一）我们已使用符合业界标准的安全防护措施保护您提供的个人信息，
                            防止数据遭到未经授权访问、公开披露、使用、修改、损坏或丢失。
                            我们会采取一切合理可行的措施，保护您的个人信息。
                            例如，个人手机号码、姓名、性别、邮箱地址、微信、QQ、
                            系统发送的信息、所属公司、公司组别名称、客户信息以及业务信息。
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（二）我们的数据安全能力：
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;&emsp;&emsp;1）通过完善的数据清洗、脱敏技术确保个体敏感数据不进入大数据平台；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;&emsp;&emsp;2）对个体敏感数据如手机号进行加密存储；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;&emsp;&emsp;3）拥有完善的网络隔离策略，确保数据的安全隔离。
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（三）我们会采取一切合理可行的措施，确保未收集无关的个人信息。
                            我们只会在达成本政策所述目的所需的期限内保留您的个人信息，
                            除非需要延长保留期或受到法律的允许。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（四）互联网并非绝对安全的环境，而且电子邮件、即时通讯、
                            及与其他铺侦探经纪人用户的交流方式并未加密，
                            我们强烈建议您不要通过此类方式发送个人信息。请使用复杂密码，协助我们保证您的账号安全。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（五）我们将定期更新并公开安全风险、个人信息安全影响评估等报告的有关内容。
                            您关注铺侦探经纪人相关更新内容。
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（六）互联网环境并非百分之百安全，我们将尽力确保或担保您发送给我们的任何信息的安全性。
                            如果我们的物理、技术、或管理防护设施遭到破坏，导致信息被非授权访问、
                            公开披露、篡改、或毁坏，导致您的合法权益受损，我们将承担相应的法律责任。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（七）在不幸发生个人信息安全事件后，我们将按照法律法规的要求，
                            及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、
                            您可自主防范和降低风险的建议、对您的补救措施等。我们将及时将事件相关情况以邮件、信函、电话、
                            推送通知等方式告知您，难 以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。
                            同时，我们还将按照监管部门要求，主动上报个人信息安全事件的处置情况。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.textBig}>
                            &emsp;&emsp;五、您如何管理您的个人信息
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;按照中国相关的法律、法规、标准，以及其他国家、地区的通行做法，
                            我们保障您对自己的个人信息行使以下权利：
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（一）访问您的个人信息
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;您有权访问您的个人信息，法律法规规定的例外情况除外。
                            如果您想行使数据访问权，可以通过以下方式自行访问：
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;账户信息——如果您希望访问或编辑您的账户中的个人资料信息时，
                            您可以通过访问铺侦探经纪人右下角功能键“我”-最上方图标为“笔”的按键，
                            从而编辑个人信息，包含头像、姓名、用户名、联系电话、所属公司、公司地址、邮箱、QQ及微信号等内容。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;账户密码信息——您可以通过访问铺侦探经纪人右下角功能键“我”-系统设置中操作。
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;如果您无法通过上述链接访问这些个人信息，您可以随时使用我们的Web 表单联系，
                            或发送电子邮件至xspace@xkongjian.com.cn。我们将在30天内回复您的访问请求。
                            对于您在使用我们的产品或服务过程中产生的其他个人信息，只要我们不需要过多投入，
                            我们会向您提供。如果您想行使数据访问权，请发送电子邮件至xspace@xkongjian.com.cn。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（二）更正您的个人信息
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;当您发现我们处理的关于您的个人信息有错误时，您有权要求我们做出更正。
                            您可以通过“（一）访问您的个人信息”中罗列的方式提出更正申请。如果您无法通过上述链接更正这些个人信息，
                            您可以随时与我们电话联系或发送电子邮件至xspace@xkongjian.com.cn。我们将在30天内回复您的更正请求。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（三）删除您的个人信息
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;在以下情形中，您可以向我们提出删除个人信息的请求：
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;1、如果我们处理个人信息的行为违反法律法规；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;2、如果我们收集、使用您的个人信息，却未征得您的同意；
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;3、如果我们处理个人信息的行为违反了与您的约定；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;4、如果您不再使用我们的产品或服务，或您注销了账号；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;5、如果我们不再为您提供产品或服务。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;若我们决定响应您的删除请求，我们还将同时通知从我们获得您的个人信息的实体，
                            要求其及时删除，除非法律法规另有规定，或这些实体获得您的独立授权。
                            当您从我们的服务中删除信息后，我们可能不会立即备份系统中删除相应的信息，但会在备份更新时删除这些信息。
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（四）约束信息系统自动决策
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;在某些业务功能中，我们可能仅依据信息系统、算法等在内的非人工自动决策机制做出决定。
                            如果这些决定显著影响您的合法权益，您有权要求我们做出解释，我们也将提供适当的救济方式。
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（五）响应您的上述请求
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。
                            我们可能会先要求您验证自己的身份，然后再处理您的请求。我们将在十五天内做出答复。
                            对于您合理的请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，
                            我们将视情收取一定成本费用。对于那些无端重复、需要过多技术手段
                            （例如，需要开发新系统或从根本上改变现行惯例）、给他人合法权益带来风险或者非常不切实际
                            （例如，涉及备份磁带上存放的信息）的请求，我们可能会予以拒绝。
                            或您认为铺侦探经纪人存在任何违反法律法规或与您关于个人信息的收集或使用的约定，
                            您均可以发送电子邮件至xspace@xkongjian.com.cn或通过本协议载明的其他方式与我们联系。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;在以下情形中，按照法律法规要求，我们将无法响应您的请求：
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;1、与国家安全、国防安全直接相关的；
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;2、与公共安全、公共卫生、重大公共利益直接相关的；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;3、与犯罪侦查、起诉、审判和判决执行等直接相关的；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;4、有充分证据表明您存在主观恶意或滥用权利的；
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;5、响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;6、涉及商业秘密的。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;六、未成年人的个人信息保护
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;我们的产品、网站和服务主要面向成人。如果没有父母或监护人的同意，
                            儿童不得创建自己的用户账户。 对于经父母同意而收集儿童个人信息的情况，
                            我们只会在受到法律允 许、父母或监护人明确同意或者保护儿童所必要的情况下使用或公开披露此信息。
                            尽管当地法律和习俗对儿童的定义不同，但我们将不满 14 周岁的任何人均视为儿童。
                            如果我们发现自己在未事先获得可证实的父母同意的情况下收集了 儿童的个人信息，则会设法尽快删除相关数据。
    
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;七、通知和修订
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;我们的隐私政策可能变更。未经您明确同意，
                            我们不会削减您按照本隐私政策所应享有的权利。我们会在本页面上发布对本政策所做的任何变更。
                            对于重大变更，我们还会提供更为显著的通知（包括对于某些服务，我们会通过电子邮件发送通知，
                            说明隐私政策的具体变更内容）。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;本政策所指的重大变更包括但不限于：
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;1、我们的服务模式发生重大变化。如处理个人信息的目的、
                            处理的个人信息类型、个人信息的使用方式等；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;2、我们在所有权结构、组织架构等方面发生重大变化。如业务调整、
                            破产并购等引起的所有者变更等；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;3、个人信息共享、转让或公开披露的主要对象发生变化；
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;4、您参与个人信息处理方面的权利及其行使方式发生重大变化；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;5、我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时；
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;6、个人信息安全影响评估报告表明存在高风险时。
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;我们还会将本政策的旧版本存档，供您查阅。
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;八、如何联系我们
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;如果您对本隐私政策有任何疑问、意见或建议，通过以下方式与我们联系，
                            一般情况下，我们将在十五天内回复：
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;电子邮件：xspace@xkongjian.com.cn
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;联系电话：023-67344883
                    </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;如果您对我们的回复不满意，特别是我们的个人信息处理行为损害了您的合法权益，
                            您还可以向网信、电信、公安及工商等监管部门进行投诉或举报，或者向有管辖权的法院提起诉讼。
                    </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.textBig}>
                            &emsp;&emsp;我们谨此再次提醒您，本隐私政策内容中以加粗方式显著标识的条款，请您着重阅读。
                            您点击“注册”/“登录”按钮即视为您完全接受本隐私政策，
                            在点击之前请您再次确认已知悉并完全理解本隐私政策的全部内容。
                    </Text>
                    </View>


                    
                </View>

                
            </Page>
        )
    }
}