import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
class DraftJS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: props.values.editorState ? props.values.editorState : EditorState.createEmpty(),
        };
    }
    componentDidUpdate (prevProps) {
        if(prevProps.values.flag !== this.props.values.flag){
            let editorState = this.props.values.editorState 
            this.setState({editorState,}) // if the editorState changed from father component should update here, means they selected another one from DB.
        }
    }
    onEditorStateChange = (editorState) => {
        let html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        this.props.retriever(html) // sent html to father component
        this.setState({
            editorState,
        });
    };
    render() {
        const { editorState } = this.state;
        return (
            <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
            />
        )
    }
}
export default DraftJS