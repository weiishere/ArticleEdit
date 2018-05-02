import React, { Component } from 'react';
import ReactDom from 'react-dom';
import homeStyle from './style.less';
import PropTypes from 'prop-types'
//import actions from './action'
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Button } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillUpdate() {

    }
    render() {
        return (
            <div className={homeStyle.wrapper}>
                角色管理
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    //const theKey = state.get('sideBar').get("data").key;
    return {}
}

export default connect(mapStateToProps)(Home);