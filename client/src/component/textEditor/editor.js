
import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import $ from 'jquery';
String.prototype.trim = function () {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
}
const po_Last_Div = (obj) => {
    if (window.getSelection) {//ie11 10 9 ff safari
        obj.focus(); //解决ff不获取焦点无法定位问题
        var range = window.getSelection();//创建range
        range.selectAllChildren(obj);//range 选择obj下所有子内容
        range.collapseToEnd();//光标移至最后
    }
    else if (document.selection) {//ie10 9 8 7 6 5
        var range = document.selection.createRange();//创建选择对象
        //var range = document.body.createTextRange();
        range.moveToElementText(obj);//range定位到obj
        range.collapse(false);//光标移至最后
        range.select();
    }
}

const CustomButton = () => <span className="">
    <svg
        t="1525435538230"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
    ><defs><style type="text/css"></style></defs>
        <path d="M711.296 328.992h-114.24v366.016h56.704V768h-284.352v-72.992h57.536V328.992h-114.24v72.992H256V256h512v145.984h-56.704v-72.992z m109.312-192.992v-0.992H203.392v0.992c0 37.76-30.4 68.448-68.128 68.96v614.048a69.024 69.024 0 0 1 68.096 66.976h617.312a69.024 69.024 0 0 1 67.072-66.944V204.928a69.056 69.056 0 0 1-67.136-68.96zM1024 888v67.008A69.056 69.056 0 0 1 954.848 1024h-65.12a69.056 69.056 0 0 1-69.12-68.992v-0.992H203.392v0.992A69.056 69.056 0 0 1 134.272 1024H69.152a69.056 69.056 0 0 1-69.12-68.992V888c0-37.44 29.888-67.872 67.136-68.96V204.96A69.056 69.056 0 0 1 0.032 136V68.992C0.032 30.88 30.976 0 69.152 0h65.12c37.504 0 68.032 29.824 69.088 67.008h617.312A69.056 69.056 0 0 1 889.76 0h65.12a69.12 69.12 0 0 1 69.152 68.992V136c0 37.792-30.4 68.448-68.128 68.96v614.048a69.056 69.056 0 0 1 68.128 68.992z"></path>
    </svg>
</span>;


function allSelect() {
    document.execCommand('selectAll', false, null);
    // const cursorPosition = this.quill.getSelection().index;
    // this.quill.insertText(cursorPosition, "★");
    // this.quill.setSelection(cursorPosition + 1);
}


const CustomToolbar = () => (
    <div id="toolbar">
        <select className="ql-size">
            <option value="">正常</option>
            <option value="small">小</option>
            <option value="large">大</option>
            <option value="huge">特大</option>
        </select>
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-link" />
        <select className="ql-color">
            <option />
            <option value="red" />
            <option value="green" />
            <option value="blue" />
            <option value="orange" />
            <option value="violet" />
            <option value="yellow" />
            <option value="#d0d1d2" />
        </select>
        <select className="ql-align" >
            <option value="right" />
            <option value="" />
            <option value="center" />
        </select>
        <button className="ql-allSelect" style={{ marginLeft: '.2rem' }}>
            <CustomButton />
        </button>
        <button className="ql-clean" />
    </div>
);

/* 
 * Editor component with custom toolbar and content containers
 */
class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = { editorHtml: "", initContent: this.props.initContent };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(html) {
        const t = $(html)[0].innerText;

        this.props.handleChange(html);
        //this.props.handleChange(html);
        //this.setState({ editorHtml: html });
        if (t.trim() === '') {
            this.setState({
                initContent: '<p>&nbsp;</p>'
            }, () => {
                po_Last_Div($('.editor_' + this.props.codeIndex + ' .ql-editor')[0]);
            })
        } else {
            this.setState({
                initContent: html
            });
        }
    }

    render() {
        return (
            <div className="text-editor">
                <CustomToolbar />
                <ReactQuill
                    ref='editor'
                    onChange={this.handleChange}
                    placeholder={this.props.placeholder}
                    modules={Editor.modules}
                    formats={Editor.formats}
                    value={this.state.initContent}
                    theme={"snow"} // pass false to use minimal theme
                />
            </div>
        );
    }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
    toolbar: {
        container: "#toolbar",
        handlers: {
            allSelect: allSelect,
            // 'link': function (value) {
            //     if (value) {
            //         var href = prompt('Enter the URL');
            //         this.quill.format('link', href);
            //     } else {
            //         this.quill.format('link', false);
            //     }
            // }
        }
    },
    clipboard: {
        matchVisual: false,
    }
};

/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "align",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean"
];

/* 
 * PropType validation
 */
Editor.propTypes = {
    placeholder: PropTypes.string
};

/* 
 * Render component on page
 */
export default Editor;
// ReactDOM.render(
//     <Editor placeholder={"Write something or insert a star ★"} />,
//     document.querySelector(".app")
// );
