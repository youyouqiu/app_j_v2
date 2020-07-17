import React, { FunctionComponent, ReactElement, PureComponent, useEffect } from 'react'
import { View, ActivityIndicator, ScrollView, StyleSheet, StatusBar, ViewStyle } from 'react-native'
import { Theme } from '@new-space/teaset'
import TopBar from './TopBar'
import ErrorView from '../ErrorView'
import { scaleSize } from '../../utils/screenUtil'
import { PageProps, PageError } from './types'

class ErrorHandler extends PureComponent<PageError> {
    render() {
        const { isError, children, ...errorProps } = this.props
        return isError ? <ErrorView {...errorProps} /> : children as ReactElement
    }
}

const Page: FunctionComponent<PageProps> = ({
    hiddenTopBar,
    loading,
    bodyStyle,
    scroll = true,
    keyboardDismissMode = 'none',
    error,
    footer,
    footerStyle = {},
    children,
    navBar,
    fixed,
    contentBgColor,
    viewProps = {},
    showSkeleton = false,
    skeleton,
    alwaysBounceVertical = true,
    alwaysBounceHorizontal = false,
    ...TopBarProps
}) => {
    let body: ViewStyle = {
        flex: 1,
        backgroundColor: contentBgColor || '#FFF',
    }

    useEffect(() => {
        StatusBar.setBarStyle(TopBarProps.statusBarStyle || 'dark-content')
    }, [TopBarProps])
    //@ts-ignore
    const StatusBarAndNarBarHeight = !hiddenTopBar ? Theme.statusBarHeight + Theme.navBarContentHeight : 0
    body.marginTop = body.marginTop || StatusBarAndNarBarHeight
    // 若footerStyle里定义了height，则使用footerStyle里的height作为高度设置footer高度
    const footerHeight = footerStyle.height || scaleSize(140)
    footerStyle.height = footerHeight

    const renderContent = showSkeleton ? skeleton : children

    return (
        <View style={{ flex: 1 }} {...viewProps}>
            {/* top bar */}
            {!hiddenTopBar && (navBar || <TopBar {...TopBarProps} />)}

            {/* body */}
            <View style={[body, bodyStyle]}>
                {/* loading */}
                {loading ? (
                    <View style={[styles.loadingWrapper]}>
                        <ActivityIndicator size='large' />
                    </View>
                ) : null}

                {/* content */}
                <ErrorHandler {...error}>
                    {/* children */}
                    <View style={{ flex: 1, marginBottom: footer ? footerHeight : 0 }}>
                        {scroll ? <ScrollView alwaysBounceVertical={alwaysBounceVertical} alwaysBounceHorizontal={alwaysBounceHorizontal} keyboardDismissMode={keyboardDismissMode}>{renderContent}</ScrollView> : renderContent}
                    </View>
                    {fixed ? fixed : null}
                    {/* footer */}
                    {footer ? <View style={[styles.footer, footerStyle]}>{footer}</View> : null}
                </ErrorHandler>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingWrapper: {
        position: 'absolute',
        width: '100%',
        marginTop: scaleSize(10),
        zIndex: 9999,
    },
    body: {

    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    }
})

export default Page
