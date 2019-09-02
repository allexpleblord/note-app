import '../styles/components/NoteEditor.scss'
import { FunctionComponent, useEffect, useRef, createElement } from 'react'
import { MdFormatBold, MdFormatItalic } from 'react-icons/md'
import { IconType } from 'react-icons/lib/cjs';
import Scrollbar from 'react-scrollbars-custom'

const NoteEditor: FunctionComponent = () => {
  const editorControlsRef = useRef<HTMLDivElement>(null) // Reference to the editor controls
  const editorRef = useRef<HTMLDivElement>(null) // Reference to the editor element

  useEffect(() => {
    const editor = editorRef.current!
    editor.contentEditable = 'true' // Make the content editable
  }, [])

  return (
    <div className="editor-container">
      <div className="editor-controls" ref={editorControlsRef}>
        {
          // Loop through the array of controls and output them
          EditorControls.map(control => (
            <div className="editor-controls-item" data-tooltip={ control.tooltip }>
              { createElement(control.icon, { className: 'editor-controls-icon' }) }
            </div>
          ))
        }
      </div>
      <Scrollbar className="editor-scrollbar">
        <div className="editor" ref={editorRef}></div>
      </Scrollbar>
    </div>
  )
}

// An array of all editor controls
interface Control {
  icon: IconType
  tooltip?: string
}

const EditorControls: Array<Control> = [
  { icon: MdFormatBold, tooltip: 'Bold' },
  { icon: MdFormatItalic, tooltip: 'Italic' },
]

export default NoteEditor
