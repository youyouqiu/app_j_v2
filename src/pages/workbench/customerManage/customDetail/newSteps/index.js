import React from 'react'
import RNStepsItem from './item';
import { View } from 'react-native';

export default class Steps extends React.Component {
    static defaultProps = {
        direction: ''
    }
    constructor(props) {
        super(props)
        this.state = {
            wrapWidth: 0,
        }
    }

    onLayout = (e) => {
        this.setState({
            wrapWidth: e.nativeEvent.layout.width,
        });
    }

    render() {
        const children = this.props.children;
        const direction = this.props.direction === 'horizontal' ? 'row' : 'column';
        const styles = this.props.styles || {};
        return (
            <View style={{ flexDirection: direction, backgroundColor: '#FFFFFF' }} onLayout={(e) => { this.onLayout(e); }}>
                {
                    React.Children.map(children, (ele, idx) => {
                        let errorTail = -1;
                        if (idx < children.length - 1) {
                            const status = children[idx + 1].props.status;
                            if (status === 'error') {
                                errorTail = idx;
                            }
                        }
                        return React.cloneElement(ele, {
                            index: idx,
                            last: idx === children.length - 1,
                            direction: this.props.direction,
                            current: this.props.current,
                            width: 1 / (children.length - 1) * this.state.wrapWidth,
                            size: this.props.size,
                            finishIcon: this.props.finishIcon,
                            errorTail,
                            styles,
                        });
                    })
                }
            </View>
        )
    }
}

Steps.Step = RNStepsItem

