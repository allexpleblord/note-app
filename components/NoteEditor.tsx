import '../styles/components/NoteEditor.scss'
import { FunctionComponent, useEffect, useRef, createElement } from 'react'
import { MdFormatBold, MdFormatItalic } from 'react-icons/md'
import { IconType } from 'react-icons/lib/cjs'
import Scrollbar from 'react-scrollbars-custom'
import { MakeBold, MakeItalic, EditorCommand } from '../src/Editor'

const NoteEditor: FunctionComponent = () => {
  const editorControlsRef = useRef<HTMLDivElement>(null) // Reference to the editor controls
  const editorRef = useRef<HTMLDivElement>(null) // Reference to the editor element

  useEffect(() => {
    const editor = editorRef.current!
    editor.contentEditable = 'true' // Make the content editable
  }, [])

  return (
    <div className="editor-container">
      <div className="editor-controls" ref={ editorControlsRef }>
        { CreateControls() }
      </div>
      <Scrollbar className="editor-scrollbar">
        <div className="editor" ref={ editorRef }></div>
      </Scrollbar>
    </div>
  )
}

// An array of all editor controls
interface Control {
  icon: IconType
  command: EditorCommand
  tooltip?: string
}

const EditorControls: Array<Control> = [
  { icon: MdFormatBold, command: MakeBold, tooltip: 'Bold' },
  { icon: MdFormatItalic, command: MakeItalic, tooltip: 'Italic' },
]

// Function which creates the editor control elements
const CreateControls = (): Array<JSX.Element> => {
  // Loop through the array of controls and output them
  return EditorControls.map((control, index) => (
    <button
      key={ index }
      className="editor-controls-item"
      data-tooltip={ control.tooltip }
      onClick={ control.command }
    >
      { createElement(control.icon, { className: 'editor-controls-icon' }) }
    </button>
  ))
}

export default NoteEditor
