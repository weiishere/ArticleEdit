import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './style.less';
import PropTypes from 'prop-types'
//import actions from './action'
import { connect } from 'react-redux';
import $ from 'jquery';
import { NavBar, Icon, InputItem, Button, List, ImagePicker, Toast } from 'antd-mobile';
import TextEditor from '../component/textEditor';
import ImgEditor from '../component/imgEditor';
import Additor from '../component/adEditor';
import QueueAnim from 'rc-queue-anim';
import clone from 'clone';
import Plus from '../component/plus';
const Item = List.Item;

class Preview extends React.Component {
    constructor(props) {
        super(props);
    }
    getNowFormatDate() {
        const date = new Date();
        const seperator1 = "-";
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        const currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }
    render() {
        return <div className='previewWrapper'>
            <NavBar
                mode="light"
                icon={<Icon type="left" onClick={this.props.onBack} />}
                onLeftClick={() => console.log('onLeftClick')}
                rightContent='发布'
            >文章预览</NavBar>
            <div className='previewBody'>
                <div>
                    <h1>{this.props.articleTitle}</h1>
                </div>
                <div><span className='date'>{this.getNowFormatDate()}</span><span className='readCount'>阅读：230</span></div>
                <div dangerouslySetInnerHTML={{ __html: this.props.mainContent }}></div>
                {/* <div className='coverImgWrapper'>
                    <img src={this.props.coverImg} />
                </div> */}
                {/* {this.props.modules.map((item, index) => <div key={index} style={{ marginTop: 10 }} dangerouslySetInnerHTML={{ __html: item.value }}></div>)} */}
            </div>
        </div>
    }
}
class Home extends React.Component {
    constructor(props) {
        super(props);
        const articleData = JSON.parse(document.querySelector('#articleData').value);
        this.state = {
            preview: false,
            coverImg: articleData.cover_img_url,//'./images/demo.jpg',
            editer: articleData.author,
            articleTitle: articleData.title,
            modules: [
                {
                    type: 'text',
                    value: articleData.content
                },
                // {
                //     type: 'img',
                //     imgs: ['./images/demo.jpg'],
                //     value: ''
                // },
                // {
                //     type: 'ad',
                //     adId: '广告名称1',
                //     value: ""
                // }
            ],
            mainContent: ''
        }
        this.addModuleHandler = this.addModuleHandler.bind(this);
        this.changeCover = this.changeCover.bind(this);
        this.showPreview = this.showPreview.bind(this);
        this.OkHandler = this.OkHandler.bind(this);
        this.fileChange = this.fileChange.bind(this);
    }
    componentWillUpdate() {

    }
    addModuleHandler(type, index) {
        let _modules = clone(this.state.modules);
        if (type === 'text') {
            _modules.splice(index, 0, {
                type: 'text',
                value: ''
            });
        } else if (type === 'img') {
            _modules.splice(index, 0, {
                type: 'img',
                imgs: [],
                value: ''
            });
        } else if (type === 'ad') {
            _modules.splice(index, 0, {
                type: 'ad',
                adId: undefined,
                value: ''
            });
        }
        this.setState({ modules: _modules });
    }
    removeModuleHandler(index) {
        let _modules = clone(this.state.modules);
        _modules = _modules.filter((item, _index) => _index != index)
        this.setState({ modules: _modules });
    }
    changeCover() {
        this.refs.fileInput.click();
    }
    fileChange(e) {
        const file = e.target.files[0];
        if (!/image\/\w+/.test(file.type)) {
            Toast.info('请选择图片文件', 3);
            return false;
        }
        if (window.FileReader && file) {
            var fr = new FileReader();
            fr.onloadend = (e) => {
                //document.getElementById("portrait").src = e.target.result;
                this.setState({
                    coverImg: e.target.result,
                });
            };
            fr.readAsDataURL(file);
        }
    }
    showPreview() {
        let _html = '';
        $("#mainContent .viewWrap").each((index, item) => {
            _html += $(item).prop("outerHTML");
        })
        this.setState({
            preview: true,
            mainContent: _html
        });

    }
    OkHandler(index, result) {
        let _modules = clone(this.state.modules);
        _modules[index].value = result;
        this.setState({ modules: _modules });
    }
    render() {
        return (
            <QueueAnim className='wrapper'>
                <div>
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => console.log('onLeftClick')}
                        rightContent={[
                            <Icon key="0" type="search" onClick={this.showPreview} />
                        ]}
                    >文章编辑</NavBar>
                    <div className='mainContent'>
                        <div className='imgCover'>
                            {this.state.coverImg ? <img src={this.state.coverImg} /> : <center style={{ margin: '2rem auto' }}>请选择封面</center>}
                        </div>
                        <List>
                            <Item>
                                <section className='mainEditWrap'>
                                    <div className='onside_left'>
                                        <InputItem
                                            placeholder="请输入编辑人"
                                            maxLength='20'
                                            clear
                                            value={this.state.editer}
                                            moneyKeyboardAlign="left"
                                            onChange={(value) => { this.setState({ editer: value }) }}
                                        >编辑人</InputItem>
                                    </div>
                                    <div className='onside_right'>
                                        <Button type="primary" onClick={this.changeCover}>更换封面</Button>
                                        <input style={{ display: 'none' }} ref='fileInput' type="file" name="file" onChange={this.fileChange} />
                                    </div>
                                </section>
                            </Item>
                            <Item>
                                <InputItem
                                    placeholder="请输入文章标题"
                                    clear
                                    maxLength='30'
                                    value={this.state.articleTitle}
                                    moneyKeyboardAlign="left"
                                    onChange={(value) => { this.setState({ articleTitle: value }) }}
                                >标题</InputItem>
                            </Item>
                        </List>
                        {this.state.modules.length === 0 && <Plus addHandler={(type) => this.addModuleHandler(type, 0)} />}
                        <br />
                        <div id='mainContent'>
                            {
                                this.state.modules.map((item, index) => {
                                    if (item.type === 'text') {
                                        return <TextEditor key={index} initContent={item.value}
                                            editOk={(result) => { this.OkHandler(index, result); }}
                                            removeHandler={() => { this.removeModuleHandler(index) }}
                                            addHandler={(type) => { this.addModuleHandler(type, index + 1) }} />
                                    } else if (item.type === 'img') {
                                        return <ImgEditor key={index} initContent={item.value} initImgs={item.imgs}
                                            editOk={(result) => {
                                                let _modules = clone(this.state.modules);
                                                _modules[index].value = result.value;
                                                _modules[index].imgs = result.imgs;
                                                this.setState({ modules: _modules });
                                            }}
                                            removeHandler={() => { this.removeModuleHandler(index) }}
                                            addHandler={(type) => { this.addModuleHandler(type, index + 1) }} />
                                    }
                                    else if (item.type === 'ad') {
                                        return <Additor key={index} initContent={item.value} initAdId={item.adId}
                                            editOk={(result) => { this.OkHandler(index, result); }}
                                            removeHandler={() => { this.removeModuleHandler(index) }}
                                            addHandler={(type) => { this.addModuleHandler(type, index + 1) }} />
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
                {this.state.preview && <Preview key='preview' {...this.state} onBack={() => {
                    this.setState({ preview: false });
                }} />}
            </QueueAnim>
        );
    }
}

function mapStateToProps(state, ownProps) {
    //const theKey = state.get('sideBar').get("data").key;
    return {}
}

export default connect(mapStateToProps)(Home);