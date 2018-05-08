import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, bindActionCreators } from 'redux';
import {  } from 'antd-mobile';
import { connect } from 'react-redux';
import './style.less'
import Bundle from '../util/Bundle';
import { BrowserRouter, Route,Switch } from 'react-router-dom';

//document.querySelector('html').style.fontSize = `${document.body.clientWidth / 60}px`;

class Root extends Component {
    constructor(props) {
        super(props);
    }
    // static childContextTypes = {
    //     mainProps: React.PropTypes.object.isRequired
    // }
    // getChildContext() {
    //     return {
    //         mainProps: this.props
    //     }
    // }
    componentWillMount(){
        //attachFastClick(document.body);
    }
    render() {
        const _height = (window.innerHeight) + 'px';
        const contentStyle = {
            minHeight: _height,
            width: '100%',
            overflow: 'auto',
            display: "inline-block"
        }
        return this.props.children;
    }
}

const mapStateToProps = function (state) {
    return {}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        actions: bindActionCreators({
        }, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Root);

