import React, { Component } from 'react';
import ReactDom from 'react-dom';
import homeStyle from './style.less';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Modal } from 'antd-mobile';
const alert = Modal.alert;

class Remove extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return <div className='deleteIcon' key='init'
            onClick={() =>
                alert('删除内容', '您确定要删除此内容吗？', [
                    { text: '取消', onPress: () => { } },
                    { text: '确定', onPress: () => this.props.removeHandler() },
                ])
            }
        // onClick={() => {
        //     this.props.removeHandler();
        // }}
        >
            <svg t="1525435538230"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            ><defs><style type="text/css"></style></defs>
                <path d="M512 971.609302c253.221705 0 459.609302-206.387597 459.609302-459.609302S765.221705 52.390698 512 52.390698 52.390698 258.778295 52.390698 512s206.387597 459.609302 459.609302 459.609302z m0-854.92093c217.500775 0 395.311628 177.017054 395.311628 395.311628S730.294574 907.311628 512 907.311628 116.688372 729.500775 116.688372 512s177.810853-395.311628 395.311628-395.311628z" p-id="1857" fill="#d81e06"></path><path d="M300.055814 539.782946h423.094574c18.257364 0 32.545736-14.288372 32.545736-32.545737s-14.288372-32.545736-32.545736-32.545736H300.055814c-18.257364 0-32.545736 14.288372-32.545736 32.545736s15.082171 32.545736 32.545736 32.545737z"></path>
            </svg>
        </div>

    }
}

export default Remove;