import React, {Component} from 'react';
import {View,StyleSheet} from 'react-native'
import Page from '../../../components/Page'
import CompanyQRCode from "@/businessComponents/companyQRCode/companyQRCode";
import {scaleSize} from "@/utils/screenUtil";

class CompanyCode extends Component {

  render() {
    return (
      <Page title='公司二维码' scroll={false}>
        <View style={styles.container}>
          <CompanyQRCode/>
        </View>
      </Page>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    height:'100%',
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:scaleSize(200)
  }
});

export default CompanyCode
