import { findDOMNode } from 'react-dom';
import React, { Component } from 'react';
import homeStyle from './style.less';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavBar, Icon, InputItem, Button, List } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import ReactQuill from 'react-quill';
import Plus from '../plus';
import Remove from '../remove';
import 'react-quill/dist/quill.snow.css';


const Div = styled.div`
            position:relative;
            &:after{
                position:absolute;
                left:.5rem;
                height:1.4rem;
                top:0;
                bottom:0;
                margin:auto;
                color:#666;
                display:${props => props.showPh ? 'block' : 'none'};
                content:'${props => props.placeholder}'
            }
`
class ContentEditable extends React.Component {
    constructor(props) {
        super(props);
        this.emitChange = this.emitChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.isHasplaceholder = this.isHasplaceholder.bind(this);
        this.emitBlur = this.emitBlur.bind(this);
        this.state = {
            html: this.props.html,
            showPh: true
        }
        this.timer1 = null;
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.html === "") return true;
        return nextProps.html !== this.lastHtml;
    }
    emitBlur(e) {
        const html = findDOMNode(e.target).innerHTML;
        if (html === '') {
            this.setState({ showPh: true });
        }
    }
    emitChange(e) {
        const html = findDOMNode(e.target).innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            this.props.onChange({
                target: {
                    value: html
                }
            });
        }
        this.lastHtml = html;

    }
    isHasplaceholder(html) {
        if (html === "") {
            this.refs.editer.innerHTML = '<span>' + this.props.placeholder + '</span>';
            return false;
        }
        return true;
    }
    handleFocus(e) {
        const _editer = document.querySelector('.' + this.refs.editer.state.generatedClassName)
        this.setState({
            showPh: false
        });
        _editer.scrollIntoView(true);
        // if (utils.isIOSsys()) {
        //     this.timer1 = window.setInterval(function () {
        //         _editer.scrollIntoView(true);
        //     }, 100);
        //     $(".footer,.chatListWrap").addClass('dockTopKeyboard');
        //     window.setTimeout(function () {
        //         const msgwapper = document.querySelector('.chatListWrap');
        //         msgwapper.scrollTop = msgwapper.scrollHeight;
        //     }, 500)
        // }
    }
    componentDidMount() {
    }
    componentDidUpdate() {
        const _editer = document.querySelector('.' + this.refs.editer.state.generatedClassName)
        this.props.html == "" && (this.props.empty(_editer));
    }

    render() {

        return <div>
            <div className='editBar'>
                <div>
                    <svg t="1525435538230"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                    ><defs></defs>
                        <path d="M456.555 607.615c-10.283 0-20.567-3.93-28.403-11.767-73.491-73.491-73.491-193.058 0-266.547l148.315-148.315c35.596-35.596 82.933-55.198 133.286-55.198s97.666 19.602 133.286 55.198c73.491 73.491 73.491 193.057 0 266.547l-67.805 67.805c-15.697 15.697-41.108 15.697-56.805 0s-15.697-41.108 0-56.805l67.805-67.805c42.171-42.171 42.171-110.767 0-152.937-20.418-20.418-47.585-31.665-76.481-31.665s-56.038 11.247-76.481 31.665L484.957 386.106c-42.171 42.171-42.171 110.767 0 152.937 15.697 15.697 15.697 41.108 0 56.805-7.837 7.837-18.12 11.767-28.402 11.767z" p-id="2334"></path><path d="M314.246 898.238c-50.353 0-97.69-19.602-133.286-55.198-73.491-73.491-73.491-193.057 0-266.547l67.805-67.805c15.697-15.697 41.133-15.697 56.805 0s15.697 41.108 0 56.805l-67.805 67.805c-42.171 42.171-42.171 110.767 0 152.937 20.418 20.418 47.585 31.665 76.481 31.665s56.038-11.247 76.481-31.665L539.042 637.92c42.171-42.171 42.171-110.767 0-152.937-15.697-15.697-15.697-41.108 0-56.805s41.108-15.697 56.805 0c73.491 73.491 73.491 193.058 0 266.547L447.532 843.04c-35.596 35.596-82.933 55.198-133.286 55.198z"></path>
                    </svg>
                </div>
                <div>
                    <svg t="1525435538230"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                    ><defs><style type="text/css"></style></defs>
                        <path d="M256 832 256 128l303.488 0c156.288 0 208 92.8 209.024 167.488 0.896 62.912-15.296 151.68-109.632 174.016C772.48 492.16 796.096 558.4 796.096 640c0 79.424-43.264 192-196.224 192L256 832zM381.376 446.528l140.032 0c56.32 0 128.832-46.4 128.832-129.728 0-110.016-77.312-132.224-137.024-132.224l-131.84 0L381.376 446.528zM381.376 775.488l135.488 0c73.984 0 139.136-51.328 139.136-136 0-97.024-66.304-136.512-142.656-136.512L381.376 502.976 381.376 775.488z"></path>
                    </svg>
                </div>
                <svg t="1525435538230"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                ><defs><style type="text/css"></style></defs>
                    <path d="M954.368 794.24l-34.816 0L754.56 391.808c0 0-4.736-6.656-14.656-7.744-9.92-1.024-25.28 5.184-25.28 5.184l-176 404.992L531.328 794.24C516.544 794.24 512 800.64 512 814.4 512 828.032 519.936 832 534.72 832l102.72 0c14.656 0 26.816-4.096 26.816-17.6 0-13.76-12.096-20.096-26.816-20.096L610.944 794.304l37.056-87.296 191.104 0 37.632 87.296-42.432 0c-14.784 0-26.88 6.4-26.88 20.096 0 13.696 12.032 17.6 26.88 17.6l120.064 0c14.848 0 26.816-3.968 26.816-17.6C981.184 800.64 969.28 794.24 954.368 794.24zM665.216 669.248 746.56 486.4l77.312 182.848L665.216 669.248zM261.056 772.608l-41.6 0 58.112-137.088 252.928 0 60.928-138.368L445.248 140.288c0 0-7.616-10.496-23.104-12.096C406.592 126.592 382.336 136.256 382.336 136.256l-276.544 636.352L94.464 772.608C71.104 772.608 64 782.656 64 804.224 64 825.728 76.544 832 99.776 832l161.344 0c23.296 0 42.176-6.4 42.176-27.776C303.232 782.656 284.352 772.608 261.056 772.608zM432.576 288.896l121.408 287.36L304.64 576.256 432.576 288.896z"></path>
                </svg>
                <svg t="1525435538230"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                ><defs><style type="text/css"></style></defs>
                    <path d="M128 213.333333l768 0q17.664 0 30.165333 12.501333t12.501333 30.165333-12.501333 30.165333-30.165333 12.501333l-768 0q-17.664 0-30.165333-12.501333t-12.501333-30.165333 12.501333-30.165333 30.165333-12.501333zM128 725.333333l597.333333 0q17.664 0 30.165333 12.501333t12.501333 30.165333-12.501333 30.165333-30.165333 12.501333l-597.333333 0q-17.664 0-30.165333-12.501333t-12.501333-30.165333 12.501333-30.165333 30.165333-12.501333zM128 554.666667l768 0q17.664 0 30.165333 12.501333t12.501333 30.165333-12.501333 30.165333-30.165333 12.501333l-768 0q-17.664 0-30.165333-12.501333t-12.501333-30.165333 12.501333-30.165333 30.165333-12.501333zM128 384l597.333333 0q17.664 0 30.165333 12.501333t12.501333 30.165333-12.501333 30.165333-30.165333 12.501333l-597.333333 0q-17.664 0-30.165333-12.501333t-12.501333-30.165333 12.501333-30.165333 30.165333-12.501333z"></path>
                </svg>
                <svg t="1525435538230"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                ><defs><style type="text/css"></style></defs>
                    <path d="M849.838 62h-675.675c-61.819 0-112.162 50.231-112.162 112.219v675.619c0 61.819 50.231 112.162 112.162 112.162h675.675c61.875 0 112.162-50.231 112.162-112.162v-675.619c0-61.875-50.231-112.219-112.162-112.219z"></path>
                </svg>
            </div>
            <Div
                ref='editer'
                showPh={this.state.showPh}
                placeholder={this.props.placeholder}
                onFocus={this.handleFocus}
                onInput={this.emitChange}
                onBlur={this.emitBlur}
                contentEditable
                dangerouslySetInnerHTML={{ __html: this.state.html }}>
            </Div></div>;
    }
};
class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mod: 'view',//edit、show
            content: this.props.initContent
        }
        this.selectContent = '';
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            content: nextProps.initContent
        })
    }
    componentDidMount() {
        // document.addEventListener("selectionchange", (e) => {
        //     console.log(window.getSelection().toString());
        //     this.selectContent = window.getSelection().toString();
        // });
    }
    editHander() {

    }
    emptyHandle() {

    }
    handleChange(html) {
        this.setState({
            content: html
        });
    }
    render() {
        //customFormulaHandler
        const modules = {
            toolbar: [
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline', 'strike', { 'color': [] }, { 'background': [] }, 'link', { 'align': [] }],
                ['clean']
            ],
        }
        const formats = [
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image'
        ]
        const CustomToolbar = () => (
            <div id="toolbar">
                <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
                    <option value="1">大</option>
                    <option value="2">小</option>
                    <option selected>正常</option>
                </select>
                <button className="ql-bold"></button>
                <button className="ql-italic"></button>
                <select className="ql-color">
                    <option value="red"></option>
                    <option value="green"></option>
                    <option value="blue"></option>
                    <option value="orange"></option>
                    <option value="violet"></option>
                    <option value="#d0d1d2"></option>
                    <option selected></option>
                </select>
            </div>
        )
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
                                        this.setState({ mod: 'view' });
                                    }} key="0" type="check" />
                                ]}
                            >文字编辑</NavBar>
                            {/* <ContentEditable placeholder='' empty={this.emptyHandle} html={this.state.content} onChange={this.editHander} /> */}
                            <ReactQuill theme="snow" value={this.state.content}
                                modules={modules}
                                onChange={this.handleChange} />
                        </div>
                    }
                </QueueAnim>
                <Remove removeHandler={this.props.removeHandler} />
            </div>
            <Plus addHandler={(type) => this.props.addHandler(type)} />
        </div>
    }
}

export default TextEditor;