import React, { Component } from 'react';
import { View, Text} from 'react-native'
import Page from '../../../components/Page'
import {styles} from './styles';

export default class RegistrationService extends Component{

    componentWillUnmount () {
        let {callBack} = this.props.navigation.state.params || {}
        callBack && callBack()
    }

    render(){
        return(
            <Page title='铺侦探服务协议'>
                <View style={styles.wrap}>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;铺侦探平台系由新空间（重庆）科技有限公司（以下简称平台经营者）独立设计开发，针对商业地产领域，集一手交易、二手交易、租赁、装修、金融、运营为一体的全生命周期商业地产综合服务平台。致力于将开发商、经纪公司、地产经纪人、投资人等产业链上的所有参与者进行完美的撮合，
                            <Text style={styles.textBig}>【审慎阅读】在您注册成为铺侦探平台用户前请务必仔细阅读以下条款，特别是免除或者限制责任的条款、法律适用和争议解决条款及本协议加粗部分。
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;当您按照注册页面提示引导完成注册程序，即表示您已充分阅读、理解本协议的全部内容，同意接受铺侦探平台的服务并受以下条款的约束。
                            <Text style={styles.textBig}>阅读本协议过程中，若您不接受本协议条款，请您立即停止注册操作。</Text>
                        </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;一、 本协议的签署和修订
                        </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;1.铺侦探平台接受在中华人民共和国合法成立并有效存续的法人组织成为平台用户及独立经纪人。如您不符合资格，请勿注册，否则铺侦探平台有权随时中止或终止您的用户资格。“平台用户”指满足上述条件而注册、登录、使用铺侦探平台软件及服务并获得管理权限的法人及独立经纪人，在本协议中更多地称为“您”。若您是法人，则您邀请后加入你所创建的铺侦探的个人用户，该用户在登录、使用铺侦探平台软件及服务视为您的委托授权行为，其行为后果由您承担。
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;2.本协议内容包括以下条款及铺侦探平台已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的一部分，与协议正文具有同等法律效力。
                            <Text style={styles.textBig}>本协议是您与平台经营者共同签订的，适用于您在铺侦探平台的全部活动，本协议对您与平台经营者均具有效力。阅读本协议过程中，若有任何疑虑请及时与铺侦探平台联系，相关工作人员将及时为您解答。在您完成注册程序成为用户时，视为您已完全阅读、理解本协议全部条款并接受本协议的全部条款及各类规则，并承诺遵守中国的各类法律规定，如有违反本协议而导致任何法律后果的发生，您将以自己的名义独立承担所有相应的法律责任。
                            </Text>
                        </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;3.由于互联网的高速发展，您与铺侦探签署的本协议不能完全罗列并覆盖您与平台经营者所有权利与义务，现有的约定也不能保证完全符合未来发展的需要。因此，
                            <Text style={styles.textBig}>铺侦探平台有权根据需要结合实时法律、法规和政策，不时地修改本协议或根据本协议制定、修改各类具体规则并在铺侦探平台相关系统板块发布，届时平台将通过第六条约定方式之一通知您。
                            </Text>
                            您应不时地注意本协议及具体规则的变更，若您在本协议及具体规则内容公告变更后继续使用铺侦探提供的服务，表示您已充分阅读、理解并接受修改后的协议和具体规则内容，也将遵循修改后的协议和具体规则使用铺侦探平台的服务。
                        </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;4.您通过自行或授权有关方根据本协议及铺侦探平台有关规则、说明操作确认本协议后，本协议即在您和铺侦探平台之间产生法律效力。同时您在此同意将全面接受和履行与铺侦探平台其他用户在铺侦探平台签订的任何电子法律文本，并承诺按该等法律文本享有和/或放弃相应的权利、承担和/或豁免相应的义务。
                        </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;5.涉及您与铺侦探平台的其他用户之间、您与您自身账户使用人及您与其它第三人产生的法律关系或法律纠纷，由您自行负责解决，与铺侦探平台无关，若因此给铺侦探平台造成损失的，则您还需赔偿损失。
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;二、 服务的提供
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;1.铺侦探平台提供的服务包括但不限于：
                            提交报备、报备管理、签约管理、客户管理、数据统计、房源信息等服务，
                            具体服务详情以铺侦探平台当时提供的服务内容为准。
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;2.基于运行和管理的需要，铺侦探平台可以暂时停止提供、限制或改变铺侦探平台服务的部分功能，
                            或提供新的功能。在任何功能减少、增加或者变化时，
                            只要您仍然继续使用铺侦探平台的服务，表示您认可并同意铺侦探平台上述服务内容的改变。
                        </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>&emsp;&emsp;3.
                            <Text style={styles.textBig}>
                                您确认，您在铺侦探平台上获取的相关信息与相关交易主体进行交易后所引起的任何纠纷或损失由您本人负责，
                                铺侦探平台不承担任何责任。
                            </Text>
                        </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;三、用户信息及隐私权保护
                        </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;铺侦探平台非常重视用户个人信息（即能够独立或与其他信息结合后识别用户身份的信息）的保护，
                            在您使用铺侦探平台提供的服务时，您同意铺侦探平台按照在平台上公布的隐私权政策收集、
                            存储、使用、披露和保护您的个人信息。
                            <Text style={styles.textBig}>铺侦探平台希望通过隐私权政策向您清楚地介绍铺侦探平台对您个人信息的处理方式，
                            因此铺侦探平台建议您完整地阅读隐私权政策，以帮助您更好地保护您的隐私权。
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;四、不保证及使用限制
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;1.不保证
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（1）在任何情况下，平台经营者及其股东、创建人、高级职员、董事、代理人、关联公司、母公司、
                            子公司和雇员（以下称“铺侦探平台方”）均不以任何明示或默示的方式对您使用铺侦探平台服务
                            而产生的任何形式的直接或间接损失承担法律责任，
                            包括但不限于资金损失、利润损失、营业中断损失等。
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（2）因为铺侦探平台或者涉及的第三方网站的设备、系统存在缺陷、黑客攻击、网络故障、
                            电力中断、计算机病毒或其他不可抗力因素造成的损失，铺侦探平台均不负责赔偿，
                            您的补救措施只能是与铺侦探平台协商终止本协议并停止使用铺侦探平台。但是，中国现行法律、法规另有规定的除外。
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;2.使用限制
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（1）您承诺合法使用铺侦探平台提供的服务及平台内容。您不得利用本服务从事侵害他人合法权益之行为，
                            不得在铺侦探平台从事任何可能违反中国的法律、法规、规章和政府规范性文件的行为或者任何未经授权的行为，
                            如擅自进入铺侦探平台的未公开的系统、不正当的使用账号密码和网站的任何内容等。
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（2）铺侦探平台中全部内容的版权均属于平台经营者所有，
                            该等内容包括但不限于文本、数据、文章、设计、源代码、软件、图片、照片及其他全部信息（以下称“平台内容”）。
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（3）由于您违反本协议或任何法律、法规或侵害第三方的权利，
                            而引起第三方对铺侦探平台提出的任何形式的索赔、要求、诉讼，铺侦探平台有权向您追偿相关损失，
                            包括但不限于铺侦探平台的诉讼费用、律师费、调查费、差旅费、名誉损失、及向第三方支付的赔偿金、补偿金等。
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;五、协议终止及账户的暂停、注销或终止
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;1.除非铺侦探平台终止本协议或者您申请终止本协议且经铺侦探平台同意，否则本协议始终有效。
                            在您违反了本协议、相关规则，或在相关法律法规、政府部门的要求下，铺侦探平台有权通过站内信、
                            电子邮件通知等方式终止本协议、关闭您的账户或者限制您使用铺侦探平台的部分或全部权限，
                            但铺侦探平台的终止行为不能免除您根据本协议或在铺侦探平台生成的其他协议项下的还未履行完毕的义务。
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;2.您若发现有第三人冒用或盗用您的用户账户及密码，或其他任何未经合法授权的情形，
                            应立即以有效方式通知铺侦探平台，要求铺侦探平台暂停相关服务，否则由此产生的一切责任由您本人承担。
                            同时，您理解铺侦探平台对您的请求采取行动需要合理期限，在此之前，
                            铺侦探平台对第三人使用该服务所导致的损失不承担任何责任。
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;3.铺侦探平台有权基于单方独立判断，在认为可能发生危害交易安全等情形时，
                            不经通知而先行暂停、中断或终止向您提供本协议项下的全部或部分会员服务，
                            并将注册资料移除或删除，且无需对您或任何第三方承担任何责任。前述情形包括但不限于：
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（1）铺侦探平台认为您提供的个人资料不具有真实性、有效性或完整性；
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（2）铺侦探平台发现异常交易或有疑义或有违法之余时；
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（3）铺侦探平台认为您已经违反本协议中规定的各类规则及精神；
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（4）存在可能破坏、篡改、删除、影响铺侦探平台任何系统正常运行的数据、
                            个人资料的病毒、木马、爬虫等恶意软件、程序代码；
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;（5）违反国家法律、法规及其他强制性规定。
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.textBig}>
                            &emsp;&emsp;4.您同意在必要时（包括但不限于您违反相关合作或协议及终止、配合国家相关调查或查处、
                            配合法院执行等情况，具体以铺侦探平台认定为准。），铺侦探平台无需进行事先通知即有权终止提供用户账户服务，
                            并可能立即暂停、关闭或删除您的用户账户及该用户账户中的所有相关资料及档案。
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.textBig}>
                            &emsp;&emsp;5.铺侦探平台账号注销规则
                            （1）注册成功且无任何业务记录的用户账号，请于注册日起180天（6个月）后可申请注销。
（2）为了配合公安部留存证明，凡在铺侦探相关服务存在业务信息记录的账号，自最后一笔业务信息记录完成时间起3年后可申请注销账号。
（3）若您确需注销铺侦探平台账户，请您从账户的绑定邮箱发送注销信息至
pangmengyue@xkongjian.com.cn申请注销账号，铺侦探平台将在收到您邮件后15个工作日内完成账户注销事项，注销完毕后，您将无法再使用铺侦探平台。
                        </Text>
                    </View>


                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;六、通知
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;本协议项下的通知通过铺侦探平台软件以公示方式作出，一经公示即视为已经送达。除此之外，其他向您个人发布的具有专属性的通知将由铺侦探平台向您在注册时提供的电子邮箱，或铺侦探平台在您的个人账户中为您设置的站内消息系统栏，或您在注册后在铺侦探平台绑定的手机发送，一经发送即视为已经送达。请您密切关注您的电子邮箱 、站内消息系统栏中的邮件、信息及手机中的短信信息。您同意铺侦探平台出于向您提供服务之目的，可以向您的电子邮箱、站内消息系统栏和手机发送有关通知或提醒；若您不愿意接收，请在铺侦探平台相应系统板块进行设置。但您同时同意并确认，若您设置了不接收有关通知或提醒，则您有可能收不到该等通知信息，您不得以您未收到或未阅读该等通知信息为由，单方面理解为相关通知未送达于您。
                        </Text>
                    </View>

                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;七、 适用法律和管辖
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;因铺侦探平台所提供服务而产生的或有关的任何争议均适用中华人民共和国法律（如法律无相关规定的，参照商业惯例及/或行业惯例。），由重庆仲裁委员会进行仲裁，并按照申请仲裁时该会现行有效的仲裁规则适用简易程序书面审理。
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;八、其他
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;1.本协议任一条款被视为废止、无效或不可执行，该条应视为可分的且并不影响本协议其余条款的有效性及可执行性。
                        </Text>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.text}>
                            &emsp;&emsp;2.铺侦探平台对本协议拥有最终的解释权。本协议及铺侦探平台有关页面的相关名词可互相引用参照，如有不同理解，则以本协议条款为准。此外，若本协议的部分条款被认定为无效或者无法实施时，本协议中的其他条款仍然有效。
                        </Text>
                    </View>

                </View>
            </Page>
        )
    }
}