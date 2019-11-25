// Input.js

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {TextInput, StyleSheet, View, Text} from 'react-native';
import Theme from '../../../utils/theme'
import {scaleSize} from '../../../utils/screenUtil'

export default class Input extends TextInput {

    static propTypes = {
        ...TextInput.propTypes,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        ...TextInput.defaultProps,
        disabled: false,
        // underlineColorAndroid: 'rgba(0, 0, 0, 0)', 使用可能会引起奔溃
    };

    buildStyle() {
        let {style} = this.props;

        let fontSize;

        fontSize = Theme.Input.defaultFontSize;
        
        style = [{
            backgroundColor: Theme.Input.backgroundColor,
            color: Theme.Input.textColor,
            height: '97%',
            fontSize: fontSize,
        }].concat(style);
        return style;
    }

    renderLabel = () => {
        const {label} = this.props
        if (typeof(label) === 'string') {
            return <Text style={[styles.label]}>{label}</Text>
        } else if (typeof(label) === 'undefined') {
            return null
        } else {
            return label
        }
    }

    rightContent = () => {
        const {rightContent} = this.props
        if (typeof(rightContent) === 'string') {
            return <Text style={[styles.label]}>{rightContent}</Text>
        } else if (typeof(rightContent) === 'undefined') {
            return null
        } else {
            return rightContent
        }
    }

    render() {
        let {elem, disabled, placeholderTextColor, pointerEvents, onChange, opacity, viewStyle = {}, ...others} = this.props;
       
        return (
            <View style={[styles.content, {...viewStyle}]}>
                {this.renderLabel()}
                <View style={{flex: 1}}>
                    <TextInput
                        style={[this.buildStyle()]}
                        onChangeText={onChange?onChange:null}
                        ref={elem}
                        editable={!disabled}
                        placeholderTextColor={placeholderTextColor ? placeholderTextColor : Theme.Input.placeholderTextColor}
                        pointerEvents={disabled ? 'none' : pointerEvents}
                        opacity={disabled ? Theme.inputDisabledOpacity : opacity}
                        {...others}
                    />
                </View>
                {this.rightContent()}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    content: {
        borderColor: Theme.Input.borderColor,
        borderBottomWidth: Theme.Input.borderBottomWidth,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: Theme.Input.defaultHeight,
        // width: Theme.Input.width
        width: '100%'
    },
    label: {
        color: '#CBCBCB',
        fontSize: scaleSize(28),
    }
})
