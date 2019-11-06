import React, {Component} from 'react'
import {ScrollView, Text, View} from "react-native";

class VerticalSwiper extends Component {
    constructor(props) {
        super(props);
        this.scrollViewRef = React.createRef();
        this.autoplayTimeout = props.autoplayTimeout || 3000;
        this.height = props.style.height;
        this.interval = null;
        this.page = props.page || 1;
        this.children = props.children;
        // this.newChildren = [...this.children, this.children[0]];
        this.state={
            children:[...props.children,props.children[0]]
        }
    }

    componentDidMount() {
        this.contentScroll();
    }

    contentScroll = () => {
        try {
            if (!this.interval) {
                this.interval = setInterval(() => {
                    const offsetY = this.page * this.height;
                    this.scrollViewRef.scrollTo({x: 0, y: offsetY});
                    this.page++;
                    if (this.page === this.state.children.length) {
                        this.timeout = setTimeout(() => {
                            this.scrollViewRef.scrollTo({x: 0, y: 0, animated: false});
                            this.page = 1;
                        }, 500)
                    }
                }, this.autoplayTimeout)
            }
        } catch (e) {

        }
    };

    componentWillReceiveProps(nextProps, nextState) {
        this.setState({
            children:[]
        },()=>{
            this.page = 1;
            this.scrollViewRef.scrollTo({x: 0, y: 0,animated: false});
            this.setState({
                children:[...nextProps.children, nextProps.children[0]]
            },this.contentScroll);
        });
    };

    // shouldComponentUpdate(){
    //     return this.state.BROKER_HOME_TOP !== nextState.BROKER_HOME_TOP;
    // };

    componentWillUnmount() {
        clearInterval(this.interval);
        clearTimeout(this.timeout);
    }

    render() {
        const{children} =this.state;
        return (
            <ScrollView
                ref={ref => this.scrollViewRef = ref}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                style={{...this.props.style, maxHeight: this.height}}>
                {children.map((item, index) => (
                    // 这里由于this.newChildren重复引入了children[0]，导致key重复，所以外层再套一层
                    <View key={index}>
                        {item}
                    </View>
                ))}
            </ScrollView>
        )
    }
}

export default VerticalSwiper
