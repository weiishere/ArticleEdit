import { findDOMNode } from 'react-dom';
import React, { Component } from 'react';
import homeStyle from '../textEditor/style.less';
import PropTypes from 'prop-types';
import { NavBar, Icon, InputItem, Button, List, PickerView } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import clone from 'clone';
import Plus from '../plus';
import Remove from '../remove';


class AdEditor extends React.Component {
    constructor(props) {
        super(props);
        //广告数据，键值对
        this.adList = [[{
            label: '请选择',
            value: ""
        },{
            label: '广告名称1',
            value: "<a href='#'>这是一段广告的链接1</a>"
        }, {
            label: '广告名称2',
            value: "<a href='#'>这是一段广告的链接2</a>"
        }, {
            label: '广告名称3',
            value: "<a href='#'>这是一段广告的链接3</a>"
        }]];
        this.state = {
            value: null,
            mod: 'view',//edit、show
            imgs: this.props.initImgs,
            content: this.props.initContent//this.adToContent(this.props.initAdId)
        }
        this.onChange = this.onChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            content: nextProps.initContent
        })
    }
    componentDidMount() {

    }
    adToContent(adName) {
        this.adList[0].forEach(item => {
            if (item.label === adName) {
                return item.value;
            }
        });
    }
    onChange(value) {
        this.setState({
            value,
            content: value[0]
        });
    }
    render() {

        return <div>
            <div className='textEditorWrapper'>
                <QueueAnim delay={0} duration={400} animConfig={[
                    { opacity: [1, 0], scale: [(1, 1), (0.8, 0.8)] }
                ]}>
                    {this.state.mod === 'view' ?
                        <div key='viewWrap' className='viewWrap ql-editor' onClick={() => { this.setState({ mod: 'edit' }) }} dangerouslySetInnerHTML={{ __html: this.state.content }}>
                        </div>
                        :
                        <div key='editWrap' className='editWrap'>
                            <NavBar
                                mode="light"
                                icon={<Icon type="left" />}
                                onLeftClick={() => {
                                    this.setState({
                                        mod: 'view',
                                        content: this.props.initContent
                                    })
                                }}
                                rightContent={[
                                    <Icon onClick={() => {
                                        this.props.editOk(this.state.content);
                                        this.setState({
                                            mod: 'view',
                                        });
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