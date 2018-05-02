/*
 * @Author: weisheres.huang 
 * @Date: 2018-03-07 10:34:12 
 * @Last Modified by: weishere.huang
 * @Last Modified time: 2018-04-02 20:12:48
 */

import React from 'react';
import {Spin} from 'antd';

class Loading extends React.Component {
    render() {
        return (
            <div className="loading">
                <Spin size="large" delay={1000}/>
            </div>
        );
    }
}

class PotentialError extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: false, info: {} };
    }
    componentDidCatch(error, info) {
        this.setState({ error, info });
    }
    render() {
        if (this.state.error) {
            return (
                <div>
                    <h2 style={{color:'#666'}}>Error: {this.state.error.toString()}</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.info.componentStack}
                    </details>
                </div>);
        }
        return this.props.children;
    }
}


class Bundle extends React.Component {
    constructor() {
        super();
        this.state = {
            mod: null
        };
    }
    load(props) {
        this.setState({
            mod: null
        });
        props.load((mod) => {
            this.setState({
                mod: mod.default ? mod.default : mod
            });
        });

    }
    componentWillMount() {
        this.load(this.props);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps);
        }
    }
    render() {
        return this.state.mod ? <PotentialError>{this.props.children(this.state.mod)}</PotentialError> : React.createElement(Loading, {});
    }
}
export default Bundle;
