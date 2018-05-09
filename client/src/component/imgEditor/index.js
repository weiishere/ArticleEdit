import { findDOMNode } from 'react-dom';
import React, { Component } from 'react';
import homeStyle from '../textEditor/style.less';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavBar, Icon, InputItem, Button, List, WingBlank } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import clone from 'clone';
import Plus from '../plus';
import Remove from '../remove';
import lrz from 'lrz';


class ImgEditor extends React.Component {
    constructor(props) {
        super(props);
        this.imgsRow = []; let temp = [];
        this.props.initImgs.forEach((img, index) => {
            if (index % 2 === 0) {
                temp = [];
                temp.push(img);
            } else {
                temp.push(img);
                this.imgsRow.push(temp);
            }
        });
        if (temp.length === 1) {
            this.imgsRow.push(temp);
        }
        this.state = {
            mod: this.props.initImgs.length !== 0 ? 'view' : 'edit',//'view',//edit、show
            imgs: this.props.initImgs,
            content: this.imgToContent(this.props.initImgs)
        }
        this.selectContent = '';
        this.addImg = this.addImg.bind(this);
        this.showPreview = this.showPreview.bind(this);
        this.closeHandler = this.closeHandler.bind(this);
        this.imgToContent = this.imgToContent.bind(this);

    }
    componentWillReceiveProps(nextProps) {
        // this.setState({
        //     content: nextProps.initContent
        // })
    }
    componentDidMount() {
        //console.log('重载');
    }
    addImg() {
        this.refs.fileInput.click();
    }
    showPreview(e) {
        const files = e.target.files;
        if (window.FileReader && files) {
            Array.prototype.slice.call(files).forEach(file => {
                if (!/image\/\w+/.test(file.type)) {
                    Toast.info('请选择图片文件', 3);
                } else {
                    //此处将进行图片上传（fromData方式传入file），返回回来图片url，将f.target.result替换即可
                    //客户端首先对图片进行压缩(最大宽度不超过800px)
                    lrz(file, {
                        width: 800,
                        quality: 1
                    }).then(() => {
                        var fr = new FileReader();
                        fr.onloadend = (f) => {
                            let _imgs = clone(this.state.imgs);

                            _imgs.push(f.target.result);
                            this.setState({
                                imgs: _imgs
                            });
                        };
                        fr.readAsDataURL(file);
                    }).catch(function (err) {
                        alert("图片压缩失败，请检查文件是否损坏~");
                    });
                }
            });
        }
    }
    closeHandler(index1, index2) {
        const index = index1 * 2 + index2;
        let _imgs = clone(this.state.imgs);
        _imgs.splice(index, 1);
        this.setState({ imgs: _imgs })
    }
    imgToContent() {
        let html = "";
        this.imgsRow.forEach(imgs => {
            html += "<div class='imgsWrap'>";
            imgs.forEach(img => {
                html += `<div><img src='${img}'></div>`;
            })
            html += "</div>";
        })
        if (this.imgsRow.length === 0) {
            html = "<center>请选择图片</center>";
        }
        return html;
    }
    render() {
        this.imgsRow = []; let temp = [];
        this.state.imgs.forEach((img, index) => {
            if (index % 2 === 0) {
                temp = [];
                temp.push(img);
            } else {
                temp.push(img);
                this.imgsRow.push(temp);
            }
        });
        if (temp.length === 1) {
            this.imgsRow.push(temp);
        }
        return <div>
            <div className='textEditorWrapper'>
                <QueueAnim delay={0} duration={400} animConfig={[
                    { opacity: [1, 0], scale: [(1, 1), (0.8, 0.8)] }
                ]}>
                    {this.state.mod === 'view' ?
                        <div key='viewWrap' className='viewWrap ql-editor' onClick={() => { this.setState({ mod: 'edit' }) }} dangerouslySetInnerHTML={{ __html: this.state.content}}>
                        </div>
                        :
                        <div key='editWrap' className='editWrap'>
                            <NavBar
                                mode="light"
                                icon={<Icon type="left" />}
                                onLeftClick={() => {
                                    this.setState({
                                        mod: 'view'
                                    })
                                }}
                                rightContent={[
                                    <Icon onClick={() => {
                                        const _content = this.imgToContent();
                                        this.props.editOk({ value: _content, imgs: this.state.imgs });
                                        this.setState({
                                            mod: 'view',
                                            content: _content
                                        });
                                    }} key="0" type="check" />
                                ]}
                            >图片编辑</NavBar>
                            <QueueAnim style={{ height: 'calc(100% - 4rem)', overflow: 'auto', 'overflowScrolling': 'touch' }} animConfig={[
                                { opacity: [1, 0], scale: [(1, 1), (0.8, 0.8)] }
                            ]}>
                                {
                                    this.imgsRow.map((item, index) => <div key={index} className='imgsWrap'>
                                        {item.map((img, _index) => <div key={`${index}_${_index}`}>
                                            <img src={img} /><div onClick={() => { this.closeHandler(index, _index) }}><Icon type='cross' /></div>
                                        </div>)}
                                    </div>)
                                }
                                <br />
                                <WingBlank><Button onClick={this.addImg}>添加图片</Button></WingBlank>
                                <input style={{ display: 'none' }} multiple="multiple" ref='fileInput' type="file" name="file" onChange={this.showPreview} />
                            </QueueAnim>
                        </div>
                    }
                </QueueAnim>
                <Remove removeHandler={this.props.removeHandler} />
            </div>
            <Plus addHandler={(type) => this.props.addHandler(type)} />
        </div >
    }
}

export default ImgEditor;