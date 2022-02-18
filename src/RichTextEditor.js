import { useEffect, useState } from "react"
import DraftJS from "./DraftJS"
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from 'draft-js';

const RichTextEditor = (props) => {
    const [data, setData] = useState({editorState: EditorState.createEmpty(), flag: false})
    useEffect(()=>{
        if(props.data){
            setDataValues(props.data.htmlString) // get from props the html string you need to display on the text editor
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.data])
    const setDataValues = (htmlString) => {
        const contentBlock = htmlToDraft(htmlString);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        setData({editorState: EditorState.createWithContent(contentState), flag: !data.flag})
    }
    const gatherData = (htmlString) => {
        props.data.updateData(htmlString) // grab this in a useRef on father component to use the html string in a DB or something else
    }
    return(
        <DraftJS values={data} retriever={gatherData}/>
    )
}
export default RichTextEditor