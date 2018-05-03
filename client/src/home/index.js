import React, { Component } from 'react';
import ReactDom from 'react-dom';
import homeStyle from './style.less';
import PropTypes from 'prop-types'
//import actions from './action'
import { connect } from 'react-redux';
import { NavBar,Icon } from 'antd-mobile';


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
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >NavBar</NavBar>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    //const theKey = state.get('sideBar').get("data").key;
    return {}
}

export default connect(mapStateToProps)(Home);