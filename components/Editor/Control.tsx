import { FunctionComponent, createElement, MouseEvent } from 'react'
import { IconType } from 'react-icons/lib/cjs'
import { EditorCommand } from '../../src/EditorCommands'
import '../../styles/components/Editor/Control.scss'

// Props
interface ControlProps {
  icon: IconType
  command: EditorCommand
  tooltip?: string
  selectOnly?: boolean
}

// Component
const Control: FunctionComponent<ControlProps> = (props) => {
  // When component is clicked
  const controlClick = (e: MouseEvent): void => {
    // If it is supposed to only work on selection
    if (props.selectOnly && window.getSelection()!.type !== 'Caret') props.command()
    // If it can work without a selection
    if (!props.selectOnly) props.command()
  }

  return (
    <button
      className="editor-controls-item"
      data-tooltip={ props.tooltip }
      onClick={ controlClick }
      tabIndex={-1}
    >
      { createElement(props.icon, { className: 'editor-controls-icon' }) }
    </button>
  )
}

export default Control