import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './style.less';
import PropTypes from 'prop-types'
//import actions from './action'
import { connect } from 'react-redux';
import $ from 'jquery';
import { NavBar, Icon, InputItem, Button, List, ImagePicker, ActivityIndicator, Toast } from 'antd-mobile';
import TextEditor from '../component/textEditor';
import ImgEditor from '../component/imgEditor';
import Additor from '../component/adEditor';
import QueueAnim from 'rc-queue-anim';
import axios from 'axios';
import clone from 'clone';
import Plus from '../component/plus';
const Item = List.Item;




class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoading: false
        }
        this.publish = this.publish.bind(this);
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
    publish() {
        const articleData = JSON.parse(document.querySelector('#articleData').value);
        //console.log('process.env.NODE_ENV:' + process.env.NODE_ENV);
        this.setState({ pageLoading: true });
        axios.post((process.env.NODE_ENV === 'development' ? '/api' : '') + '/PersonalCenter/Article/SaveArtJson', {
            ArtId: articleData.ArtId,
            json: JSON.stringify(this.props.modules.map(item => {
                switch (item.type) {
                    case 'text':
                        return { id: item.id, type: item.type, value: item.value, hasEdit: true };
                    case 'img':
                        return { id: item.id, type: item.type, imgs: item.imgs, hasEdit: true };
                    case 'ad':
                        return { id: item.id, type: item.type, adId: item.adId, hasEdit: true };
                }
            }))
        }).then(req => {
            console.log(req.data);
            axios.post((process.env.NODE_ENV === 'development' ? '/api' : '') + '/PersonalCenter/Article/SaveEditing2', {
                ArtId: articleData.ArtId,
                Title: this.props.articleTitle,
                Author: this.props.editer,
                Cover: this.props.coverImg,
                Content: $('.previewBody').prop("outerHTML")//this.props.mainContent
            }).then(res => {
                this.setState({ pageLoading: false });
                if (res.data.success) {
                    Toast.info('发布成功！', 2);
                } else {
                    Toast.info('发布失败！', 2);
                }
            }).catch(error => {
                this.setState({ pageLoading: false });
                Toast.info('发布出现异常，请检查网络！', 2);
            });
        }).catch(error => {
            this.setState({ pageLoading: false });
            Toast.info('数据获取异常，请检查网络！', 2);
        });
    }
    render() {
        return <div className='previewWrapper' style={{ display: this.props.visible ? 'block' : 'none' }}>
            <NavBar
                mode="light"
                icon={<Icon type="left" onClick={this.props.onBack} />}
                onLeftClick={() => console.log('onLeftClick')}
                rightContent={<a href='javascript:;' onClick={this.publish}>发布</a>}
            >文章预览</NavBar>
            <div className='previewBody'>
                <div>
                    <h1>{this.props.articleTitle}</h1>
                </div>
                <div><span className='date'>{this.getNowFormatDate()}&nbsp;&nbsp;{this.props.editer}</span><span className='readCount'>阅读：230</span></div>
                <div dangerouslySetInnerHTML={{ __html: this.props.mainContent }}></div>
                {/* <div className='coverImgWrapper'>
                    <img src={this.props.coverImg} />
                </div> */}
                {/* {this.props.modules.map((item, index) => <div key={index} style={{ marginTop: 10 }} dangerouslySetInnerHTML={{ __html: item.value }}></div>)} */}
            </div>
            {this.state.pageLoading && <div className="toast-example">
                <ActivityIndicator
                    toast
                    text="请稍后..."
                    animating={true}
                />
            </div>}
        </div>
    }
}
class Home extends React.Component {
    constructor(props) {
        super(props);
        const articleData = JSON.parse(document.querySelector('#articleData').value);
        this.state = {
            preview: false,
            isUploding: false,
            pageLoading: false,
            coverImg: articleData.cover_img_url,//'./images/demo.jpg',
            editer: articleData.author,
            articleTitle: articleData.title,
            modules: [
                // {
                //     type: 'text',
                //     value: articleData.content,
                //     hasEdit: true
                // },
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
        this.adList;
    }
    componentDidMount() {
        //console.log(process.env.NODE_ENV);
        const articleData = JSON.parse(document.querySelector('#articleData').value);
        const self = this;
        $("body").on('click', ".imgsWrap img", function () {
            if (!self.state.preview) { return; }
            $('body').append("<div class='mb-wrapper imgShow'><img src='" + $(this).attr('src') + "'/></div>");
            window.setTimeout(function () {
                $('.imgShow>img').addClass('show');
            }, 50);
            $(".imgShow").one("click", function () {
                var _self = this;
                $(this).find("img").removeClass('show');
                window.setTimeout(function () {
                    $(_self).remove();
                }, 300);
            });
        });
        this.setState({ pageLoading: true });
        axios.post((process.env.NODE_ENV === 'development' ? '/api' : '') + '/PersonalCenter/Article/GetArtJson', { ArtId: 1529 }).then(req => {
            // this.setState({
            //     modules: req.data
            // });
            //console.log(req.data);
            axios.post((process.env.NODE_ENV === 'development' ? '/api' : '') + '/PersonalCenter/Article/GetArtAd', {}).then(req2 => {
                this.adList = req2.data;
                this.setState({
                    modules: req.data || [],
                    pageLoading: false
                });
            }).catch(error => {
                this.setState({ pageLoading: false });
                Toast.info('数据获取异常，请检查网络！', 2);
            });
        }).catch(error => {
            this.setState({ pageLoading: false });
            Toast.info('数据获取异常，请检查网络！', 2);
        });
    }
    addModuleHandler(type, index) {
        let _modules = clone(this.state.modules);
        if (type === 'text') {
            _modules.splice(index, 0, {
                id: Date.parse(new Date()) + '-' + parseInt(Math.random() * 1000000),
                type: 'text',
                value: '<p>&nbsp;</p>',
                hasEdit: false
            });
        } else if (type === 'img') {
            _modules.splice(index, 0, {
                id: Date.parse(new Date()) + '-' + parseInt(Math.random() * 1000000),
                type: 'img',
                imgs: [],
                value: '',
                hasEdit: false
            });

        } else if (type === 'ad') {
            _modules.splice(index, 0, {
                id: Date.parse(new Date()) + '-' + parseInt(Math.random() * 1000000),
                type: 'ad',
                adId: undefined,
                value: '',
                hasEdit: false
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
        const files = e.target.files;
        if (window.FileReader && files) {
            const file = files[0];
            if (!/image\/\w+/.test(file.type)) {
                Toast.info('请选择图片文件', 3);
                return false;
            }
            this.setState({ isUploding: true });
            var formData = new FormData();
            formData.append('file', file);
            axios.post((process.env.NODE_ENV === 'development' ? '/api' : '') + '/Upload/ImgUpload', formData).then(req => {
                this.setState({
                    coverImg: 'http://wxgzh.zongzong.kunxiangtech.cn/' + req.data.result
                });
                Toast.info('图片上传成功！', 2);
                this.setState({ isUploding: false });
            }).catch(error => {
                this.setState({ isUploding: false });
                Toast.info('出现异常，请检查网络！', 2);
            })
            // var fr = new FileReader();
            // fr.onloadend = (e) => {
            //     //document.getElementById("portrait").src = e.target.result;
            //     this.setState({
            //         coverImg: e.target.result,
            //     });
            // };
            // fr.readAsDataURL(file);
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
        _modules[index].hasEdit = true;
        this.setState({ modules: _modules });
    }
    CancleHandler(index) {
        let _modules = clone(this.state.modules);
        _modules[index].hasEdit = true;
        this.setState({ modules: _modules });
    }
    render() {
        return (
            <QueueAnim className='wrapper'>
                <div>
                    <div style={{ display: this.state.preview ? 'none' : 'block' }} className='mainContent' style={{ paddingBottom: '5rem' }}>
                        <NavBar
                            mode="light"
                            icon={<Icon type="left" />}
                            onLeftClick={() => console.log('onLeftClick')}
                            rightContent={[
                                <Icon key="0" type="search" onClick={this.showPreview} />
                            ]}
                        >文章编辑</NavBar>
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
                                        return <TextEditor key={item.id} initContent={item.value} hasEdit={item.hasEdit}
                                            editOk={(result) => { this.OkHandler(index, result); }}
                                            done={() => this.CancleHandler(index)}
                                            codeIndex={index}
                                            removeHandler={() => { this.removeModuleHandler(index) }}
                                            addHandler={(type) => { this.addModuleHandler(type, index + 1) }} />
                                    } else if (item.type === 'img') {
                                        return <ImgEditor key={item.id} initContent={item.value} initImgs={item.imgs} hasEdit={item.hasEdit}
                                            editOk={(result) => {
                                                let _modules = clone(this.state.modules);
                                                _modules[index].value = result.value;
                                                _modules[index].imgs = result.imgs;
                                                _modules[index].hasEdit = true;
                                                this.setState({ modules: _modules });
                                            }}
                                            done={() => this.CancleHandler(index)}
                                            removeHandler={() => { this.removeModuleHandler(index) }}
                                            addHandler={(type) => { this.addModuleHandler(type, index + 1) }} />
                                    }
                                    else if (item.type === 'ad') {
                                        return <Additor key={item.id} initContent={item.value} initAdId={item.adId} hasEdit={item.hasEdit}
                                            adList={this.adList}
                                            editOk={(result, adId) => {
                                                let _modules = clone(this.state.modules);
                                                _modules[index].value = result.value;
                                                _modules[index].adId = result.adId;
                                                _modules[index].hasEdit = true;
                                                this.setState({ modules: _modules });
                                            }}
                                            done={() => this.CancleHandler(index)}
                                            removeHandler={() => { this.removeModuleHandler(index) }}
                                            addHandler={(type) => { this.addModuleHandler(type, index + 1) }} />
                                    }
                                })
                            }
                        </div>
                    </div>
                    {this.state.isUploding && <div className="toast-example">
                        <ActivityIndicator
                            toast
                            text="图片上传中，请稍后..."
                            animating={true}
                        />
                    </div>}
                    {this.state.pageLoading && <div className="toast-example">
                        <ActivityIndicator
                            toast
                            text="请稍后..."
                            animating={true}
                        />
                    </div>}
                    {<Preview key='preview' {...this.state} visible={this.state.preview} onBack={() => {
                        this.setState({ preview: false });
                    }} />}
                </div>

            </QueueAnim>
        );
    }
}

function mapStateToProps(state, ownProps) {
    //const theKey = state.get('sideBar').get("data").key;
    return {}
}

export default connect(mapStateToProps)(Home);