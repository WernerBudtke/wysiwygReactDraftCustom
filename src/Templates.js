import RichTextEditor from "./RichTextEditor"
import { useState, useRef } from "react"
const Templates = () => {
    const [editorMsg, setEditorMsg] = useState('')
    const newMsg = useRef('')
    const [templates, setTemplates] = useState([])
    const [newTemplate, setNewTemplate] = useState({title: '', value: ''})
    const [mode, setMode] = useState(false)
    const updateData = (htmlString) => {
        newMsg.current = htmlString
    }
    const handleChange = (e) => {
        if(e.target.type !== 'text'){
            const selectedTemplate = templates.find(template => template.title === e.target.value)
            setNewTemplate({...selectedTemplate})
            setEditorMsg(selectedTemplate.value)
        }else{
            setNewTemplate({
                ...newTemplate, 
                title: e.target.value
            })
        }
    }
    const handleSubmit = (e) => {
        console.log({title: newTemplate.title, value: newMsg.current})
        e.preventDefault()
    }
    const handleMode = (targetMode) => {
        setNewTemplate({title: '', value: ''})
        newMsg.current = ''
        setEditorMsg('')
        setMode(targetMode)
    }
    return(
        <div className="panelContainer">
            <form onSubmit={handleSubmit}>
                <div className="modeSelector">
                    <h2>Select Mode:</h2>
                    <div>
                        <input type="button" className={mode ? 'btnActive' : undefined} value="New" onClick={() => handleMode(true)}/>
                        <input type="button" className={!mode ? 'btnActive' : undefined} value="Edit" onClick={() => handleMode(false)}/>
                    </div>
                </div>
                <div className="labelInputRow">
                    <label htmlFor="templateTitle">Title:</label>
                    {   mode 
                        ? 
                        <input type="text" id="templateTitle" onChange={handleChange}/> 
                        :
                        <select id="templateTitle" defaultValue="default" onChange={handleChange}>
                            <option value="default" disabled>Choose one</option>
                            {templates.map(template => <option key={template.title} value={template.title}>{template.title}</option>)}
                        </select>
                    }
                </div>
                <RichTextEditor data={{htmlString: editorMsg, updateData}}/>
                <div className="button">
                    <input type="submit" value="Submit" className="button"/>
                </div>
                <input type="button" value="traer datos" onClick={() => setTemplates([{title: 'Plantilla 1', value: '<p>Estimado blablabla</p>'}, {title: 'Plantilla 2', value: '<p>Estimado blobloblo</p>'}, {title: 'Plantilla 3', value: '<p>Estimado blebleble</p>'}])}/>
            </form>
        </div>
    )
}
export default Templates
