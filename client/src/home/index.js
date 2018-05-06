import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './style.less';
import PropTypes from 'prop-types'
//import actions from './action'
import { connect } from 'react-redux';
import { NavBar, Icon, InputItem, Button, List, ImagePicker,Toast } from 'antd-mobile';
import TextEditor from '../component/textEditor';
import QueueAnim from 'rc-queue-anim';
import clone from 'clone';
import Plus from '../component/plus';
const Item = List.Item;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coverImg: './images/demo.jpg',
            editer: 'weishere',
            articleTitle: 'title',
            modules: [
                {
                    type: 'text',
                    value: '<p>这是第一个文字区域内容</p>'
                },
                {
                    type: 'img',
                    value: ''
                },
                {
                    type: 'ad',
                    value: "<p><a href='#'>这是第一个文字区域内容</a></p>"
                }
            ]
        }
        this.addModuleHandler = this.addModuleHandler.bind(this);
        this.changeCover = this.changeCover.bind(this);
        this.showPreview = this.showPreview.bind(this);
    }
    componentWillUpdate() {

    }
    addModuleHandler(type, index) {
        if (type === 'text') {
            let _modules = clone(this.state.modules);
            _modules.splice(index, 0, {
                type: 'text',
                value: '<p></p>'
            });
            this.setState({ modules: _modules });
        }
    }
    removeModuleHandler(index) {
        let _modules = clone(this.state.modules);
        _modules = _modules.filter((item, _index) => _index != index)
        this.setState({ modules: _modules });
    }
    changeCover() {
        this.refs.fileInput.click();
    }
    showPreview(e) {
        const file = e.target.files[0];
        if(!/image\/\w+/.test(file.type)){
            Toast.info('请选择图片文件', 3);
            return false;  
        }
        if (window.FileReader && file) {
            var fr = new FileReader();
            fr.onloadend = (e) => {
                //document.getElementById("portrait").src = e.target.result;
                this.setState({
                    coverImg: e.target.result
                });
            };
            fr.readAsDataURL(file);
        }
    }
    render() {
        return (
            <div className='wrapper'>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search" />
                    ]}
                >NavBar</NavBar>
                <div className='imgCover'>
                    <img src={this.state.coverImg} />
                </div>
                <List>
                    <Item>
                        <section className='mainEditWrap'>
                            <div className='onside_left'>
                                <InputItem
                                    placeholder="请输入编辑人"
                                    clear
                                    value={this.state.editer}
                                    moneyKeyboardAlign="left"
                                    onChange={(value) => { this.setState({ editer: value }) }}
                                >编辑人</InputItem>
                            </div>
                            <div className='onside_right'>
                                <Button type="primary" onClick={this.changeCover}>更换封面</Button>
                                <input style={{ display: 'none' }} ref='fileInput' type="file" name="file" onChange={this.showPreview} />
                            </div>
                        </section>
                    </Item>
                    <Item>
                        <InputItem
                            placeholder="请输入文章标题"
                            clear
                            value={this.state.articleTitle}
                            moneyKeyboardAlign="left"
                            onChange={(value) => { this.setState({ articleTitle: value }) }}
                        >标题</InputItem>
                    </Item>
                </List>
                <Plus addHandler={(type) => this.addModuleHandler(type, 0)} />
                {
                    this.state.modules.map((item, index) => {
                        if (item.type === 'text') {
                            return <TextEditor key={index} initContent={item.value} editOk={(result) => {
                                let _modules = clone(this.state.modules);
                                _modules[index].value = result;
                                this.setState({ modules: _modules });
                            }}
                                removeHandler={() => { this.removeModuleHandler(index) }}
                                addHandler={(type) => { this.addModuleHandler(type, index + 1) }} />
                        }
                    })
                }
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    //const theKey = state.get('sideBar').get("data").key;
    return {}
}

export default connect(mapStateToProps)(Home);