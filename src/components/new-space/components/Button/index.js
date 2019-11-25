// Button.js

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import Theme from '../../../../utils/theme';

export default class Button extends TouchableOpacity {
  
    static propTypes = {
        ...TouchableOpacity.propTypes,
        type: PropTypes.oneOf(['primary']),
        size: PropTypes.oneOf(['xl', 'md']),
        title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
        titleStyle: Text.propTypes.style,
    };

    static defaultProps = {
        ...TouchableOpacity.defaultProps,
        type: 'primary',
        size: 'md',
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.disabled != this.props.disabled) {
            let opacity = Theme.Button.btnDisabledOpacity;
            if (!nextProps.disabled) {
                let fs = StyleSheet.flatten(nextProps.style);
                opacity = fs && (fs.opacity || fs.opacity === 0) ? fs.opacity : 1;
            }
            this.state.anim.setValue(opacity);
        }
    }

    buildStyle() {
        let {style, type, size, disabled, disableStyle} = this.props;
        let backgroundColor, borderColor, borderWidth, borderRadius, width, height;
        switch (type) {
        case 'primary':
            backgroundColor = Theme.Button.primaryColor;
            borderColor = Theme.Button.primaryBorderColor;
            borderWidth = Theme.Button.primaryBorderWidth
            break;
        case 'normal':
            backgroundColor = Theme.Button.normalColor;
            borderColor = Theme.Button.normalBorderColor;
            borderWidth = Theme.Button.normalBorderWidth
            break
        default:
            backgroundColor = Theme.Button.defaultColor;
            borderColor = Theme.Button.defaultBorderColor;
            borderWidth = Theme.Button.defaultBorderWidth
        }
        switch (size) {
        case 'xl':
            borderRadius = Theme.Button.borderRadiusXL;
            height = Theme.Button.heightXL;
            width = Theme.Button.widthXL
            break;
        default:
            borderRadius = Theme.Button.defaultborderRadius;
            height = Theme.Button.defaultHeight;
            width = Theme.Button.defaultWidth;
        }

        style = [{
            backgroundColor,
            borderColor,
            borderWidth,
            borderRadius,
            width,
            height,
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        }].concat(style);
        if (disabled) {
            style = style.concat([disableStyle]);
        }
        style = StyleSheet.flatten(style);
        
        this.state.anim._value = style.opacity === undefined ? 1 : style.opacity;
        return style;
    }

    renderTitle() {
        let {type, size, title, titleStyle, children} = this.props;

        if (!React.isValidElement(title) && (title || title === '' || title === 0)) {
            let textColor, textFontSize;
            switch (type) {
            case 'primary': textColor = Theme.Button.primaryTitleColor; break;
            case 'normal': textColor = Theme.Button.normalTitleColor; break;
            default: textColor = Theme.Button.defaultTitleColor;
            }
            switch (size) {
            case 'xl': textFontSize = Theme.Button.fontSizeXL; break;
            default: textFontSize = Theme.Button.defaultFontSize;
            }
            titleStyle = [{
                color: textColor,
                fontSize: textFontSize,
                overflow: 'hidden',
            }].concat(titleStyle);
            title = <Text style={titleStyle} numberOfLines={1}>{title}</Text>;
        }

        return title ? title : children;
    }

    render() {
        // eslint-disable-next-line no-unused-vars
        let {style, ...others} = this.props;
        return (
            <TouchableOpacity style={[this.buildStyle()]} {...others}>
                {this.renderTitle()}
            </TouchableOpacity>
        );
    }
}
