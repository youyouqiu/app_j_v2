import React, { useState, FunctionComponent } from 'react'
import { Text } from 'react-native'
import { WebView } from 'react-native-webview'
import { NavigationScreenProps } from 'react-navigation'
import Page from '../../../components/Page'

const WebViewPage: FunctionComponent<NavigationScreenProps> = ({
  navigation,
}) => {
  const {
    title = '外部链接',
    url = '',
  } = navigation.state.params || {}
  const [loading, setLoading] = useState(true)
  const urlReg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
  let content = <Text>链接无效</Text>
  if (urlReg.test(url)) {
    content = (
      <WebView
        onLoadEnd={() => setLoading(false)}
        source={{ uri: url }}
      />
    )
  }
  return <Page scroll={false} title={title} loading={loading}>{content}</Page>
}

export default WebViewPage
