import { FunctionComponent, useEffect, useRef, createElement } from 'react'
import Scrollbar from 'react-scrollbars-custom'
// Icons
import { MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdFormatListBulleted } from 'react-icons/md'
import { IconType } from 'react-icons/lib/cjs'
// Editor related
import { EditorCommand, MakeBold, MakeItalic, MakeUnderlined, MakeUList } from '../src/EditorCommands'
import Control from './Editor/Control'
import '../styles/components/NoteEditor.scss'

const NoteEditor: FunctionComponent = () => {
  const editorControlsRef = useRef<HTMLDivElement>(null) // Reference to the editor controls
  const editorRef = useRef<HTMLDivElement>(null) // Reference to the editor element

  // Mount
  useEffect(() => {
    const editor = editorRef.current!
    editor.contentEditable = 'true' // Make the content editable
    document.execCommand('defaultParagraphSeparator', false, 'p') // Default separator

    // Create a mutation observer for the editor
    const callback: MutationCallback = (mutations) => {
      for (let mutation of mutations) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeName === 'LI') {
            // Make sure it doesnt have a checked class and add an event listener
            (node as HTMLLIElement).style.transition = 'none !important';
            (node as HTMLLIElement).classList.remove('checked')
            node.addEventListener('click', () => (node as HTMLLIElement).classList.toggle('checked'))
          }
        })
      }
    }
    const observer: MutationObserver = new MutationObserver(callback)
    observer.observe(editor, { childList: true, subtree: true })
  }, [])

  return (
    <div className="editor-container">
      <div className="editor-controls" ref={ editorControlsRef }>
        <Control icon={ MdFormatBold } command={ MakeBold } tooltip="Bold" selectOnly />
        <Control icon={ MdFormatItalic } command={ MakeItalic } tooltip="Italic" selectOnly />
        <Control icon={ MdFormatUnderlined } command={ MakeUnderlined } tooltip="Underline" selectOnly />
        <Control icon={ MdFormatListBulleted } command={ MakeUList } tooltip="Checklist" />
      </div>
      <Scrollbar className="editor-scrollbar">
        <div
          className="editor"
          id="editor"
          ref={ editorRef }
          onFocus={() => editorRef.current!.classList.add('focused')}
          onBlur={() => editorRef.current!.classList.remove('focused')}
        >
        </div>
      </Scrollbar>
    </div>
  )
}

export default NoteEditor
