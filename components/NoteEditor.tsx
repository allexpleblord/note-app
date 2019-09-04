import { FunctionComponent, useState, useEffect, useRef, createElement, SyntheticEvent } from 'react'
import Scrollbar from 'react-scrollbars-custom'

// Icons
import { MdFormatBold, MdFormatItalic, MdFormatUnderlined, 
         MdFormatClear, MdFormatListBulleted, MdFormatListNumbered,
         MdCheckBox } from 'react-icons/md'

// Editor related
import { Bold, Italic, Underline, Clear, MakeUList, MakeOList, MakeChecklist } from '../src/EditorCommands'
import ToggleControl from './Controls/ToggleControl'
import Control from './Controls/Control'
import '../styles/components/NoteEditor.scss'

const NoteEditor: FunctionComponent = () => {
  // State
  const [selection, setSelection] = useState<Selection>()
  const [selectedElements, setSelectedElements] = useState<Array<HTMLElement>>([])

  // Refs
  const editorControlsRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  // Mount
  useEffect(() => {
    document.execCommand('defaultParagraphSeparator', false, 'p') // Default separator
    // Mutation observer
    const observer = new MutationObserver(observerCallback)
    observer.observe(editorRef.current!, { subtree: true, childList: true })

    // Effect cleanup
    return () => observer.disconnect()
  }, [])

  // Gets the information about the selection
  const updateSelection = () => {
    const selection = document.getSelection()!
    setSelection(selection) // Keep the selection updated

    // If there is are no valid anchor and focus nodes return
    if (selection.anchorNode === null || selection.focusNode === null)
      return

    const anchorEl = selection.anchorNode! as HTMLElement | null // Where the selection starts
    const focusEl = selection.focusNode! as HTMLElement | null // Where the selection ends
    
    // Check if its a caret cursor
    if (selection.type === 'Caret') {
      let currentEl = anchorEl
      const selected: Array<HTMLElement> = []

      // While we havent reached the editor element
      while (currentEl!.nodeName.toLowerCase() !== 'div' && currentEl!.id !== 'editor') {
        // Only push to the selected ones if its an actual element ( and not a text object )
        if (currentEl!.nodeType === 1)
          selected.push(currentEl!)
        // Go up in the tree
        currentEl = currentEl!.parentElement;
      }
      
      // Finally set the state
      setSelectedElements(selected)
    }
    // Else check if its a selection range
    else if (selection.type === 'Range') {
      let currentAnchorEl = anchorEl
      let currentFocusEl = focusEl
      const selected: Array<HTMLElement> = []

      // While we havent reached the parent div element
      while (currentAnchorEl!.nodeName.toLowerCase() !== 'div' && currentAnchorEl!.id !== 'editor') {
        // If we are focused within a single element and it is an actual element ( and not a text object )
        if (currentAnchorEl!.isSameNode(currentFocusEl) && currentAnchorEl!.nodeType === 1)
          selected.push(currentAnchorEl!)

        // Go up in the tree
        currentAnchorEl = currentAnchorEl!.parentElement
        currentFocusEl = currentFocusEl!.parentElement
      }

      // Finally set the state
      setSelectedElements(selected)
    }
  }

  // Mutation observer callback
  const observerCallback: MutationCallback = (mutations, observer) => {
    for (let mutation of mutations) {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType !== 1) // If not an actual element
          return

        const element = node as HTMLElement

        // If its a checklist item <li> remove the checked class if it has one
        if (element.classList.contains('checklist-item')) {
          element.classList.add('new')
          setTimeout(() => {element.classList.remove('new')}, 100)
          element.classList.remove('checked')
        }
      })
    }
  }

  return (
    <div className="editor-container">
      <div className="editor-controls" ref={ editorControlsRef }>
        <ToggleControl icon={ MdFormatBold } command={ Bold } tooltip="Bold" selectedElements={selectedElements} />
        <ToggleControl icon={ MdFormatItalic } command={ Italic } tooltip="Italic" selectedElements={selectedElements} />
        <ToggleControl icon={ MdFormatUnderlined } command={ Underline } tooltip="Underline" selectedElements={selectedElements} />
        <Control icon={ MdFormatClear } command={ Clear } tooltip="Clear" />
        <Control icon={ MdFormatListBulleted } command={ MakeUList } tooltip="Bullet List" />
        <Control icon={ MdFormatListNumbered } command={ MakeOList } tooltip="Number List" />
        <Control icon={ MdCheckBox } command={ MakeChecklist } tooltip="Checklist" />
      </div>
      <Scrollbar className="editor-scrollbar">
        <div
          className="editor"
          id="editor"
          contentEditable
          ref={ editorRef }
          onSelect={ updateSelection }
        >
        </div>
      </Scrollbar>
    </div>
  )
}

export default NoteEditor
