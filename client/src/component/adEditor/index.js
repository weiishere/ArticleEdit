import { findDOMNode } from 'react-dom';
import React, { Component } from 'react';
import homeStyle from '../textEditor/style.less';
import PropTypes from 'prop-types';
import { NavBar, Icon, InputItem, Button, List, PickerView } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import $ from 'jquery';
import clone from 'clone';
import Plus from '../plus';
import Remove from '../remove';


class AdEditor extends React.Component {
    constructor(props) {
        super(props);
        //广告数据，键值对
        this.adList = this.props.adList ? [this.props.adList.map((item, index) => {
            return {
                label: item.label,
                value: 'lv_' + index,
                html: item.value,
            }
        })] : [[]];
        // this.adList =[[{
        //     label: '请选择',
        //     value: ""
        // }, {
        //     label: '广告名称1',
        //     value: "<a href='#'>这是一段广告的链接2</a>"
        // }, {
        //     label: '广告名称2',
        //     value: "<a href='#'>这是一段广告的链接2</a>"
        // }, {
        //     label: '广告名称3',
        //     value: "<a href='#'>这是一段广告的链接3</a>"
        // }]];
        this.defaultInitAdId = this.adList[0].length !== 0 ? this.adList[0][0].label : '';
        this.state = {
            value: null,
            mod: this.props.hasEdit ? 'view' : 'edit',//edit、show
            adId: this.props.initAdId || this.defaultInitAdId,
            content: this.adToContent(this.props.initAdId || this.defaultInitAdId)
        }
        this.onChange = this.onChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            content: this.adToContent(nextProps.initAdId)
        });
        this.adList = this.props.adList ? [this.props.adList.map((item, index) => {
            return {
                label: item.label,
                value: 'lv_' + index,
                html: item.value,
            }
        })] : [[]];
    }
    componentDidMount() {
        $("body").delegate('.viewWrap a', 'click', function (event) {
            event.preventDefault();
        });
    }
    adToContent(adName) {
        let result = '';
        this.adList[0].forEach(item => {
            if (item.label === adName) {
                result = item.html;
            }
        });
        return result;
    }
    onChange(value) {
        const _adId = this.adList[0].find(item => item.value === value[0]).label;
        this.setState({
            value,
            adId: _adId,
            content: this.adToContent(this.props.initAdId)//value[0]
        });
    }
    render() {

        return <div>
            <div className='textEditorWrapper'>
                <QueueAnim delay={0} duration={400} animConfig={[
                    { opacity: [1, 0], scale: [(1, 1), (0.8, 0.8)] }
                ]}>
                    {this.state.mod === 'view' ?
                        <div key='viewWrap' className='viewWrap ql-editor' onClick={(e) => {
                            this.setState({ mod: 'edit' })
                        }} dangerouslySetInnerHTML={{ __html: this.state.content }}>
                        </div>
                        :
                        <div key='editWrap' className='editWrap'>
                            <NavBar
                                mode="light"
                                icon={<Icon type="left" />}
                                onLeftClick={() => {
                                    this.setState({
                                        mod: 'view',
                                        //content: this.props.initContent
                                    });
                                    this.props.done();
                                }}
                                rightContent={[
                                    <Icon onClick={() => {
                                        this.props.editOk({ value: this.state.content, adId: this.state.adId });
                                        this.setState({
                                            mod: 'view'
                                        });
                                        //this.props.done();
                                    }} key="0" type="check" />
                                ]}
                            >广告选择</NavBar>
                            <div style={{ borderTop: 'solid 1px #ccc', borderBottom: 'solid 1px #ccc' }}>
                                <PickerView
                                    onChange={this.onChange}
                                    value={this.state.value}
                                    data={this.adList}
                                    cascade={false}
                                />
                            </div>
                        </div>
                    }
                </QueueAnim>
                <Remove removeHandler={this.props.removeHandler} />
            </div>
            <Plus addHandler={(type) => this.props.addHandler(type)} />
        </div >
    }
}

export default AdEditor;