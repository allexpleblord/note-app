import { FunctionComponent, useState, useEffect, createElement } from 'react'
import { IconType } from 'react-icons/lib/cjs'
import { EditorCommand } from '../../src/EditorCommands'
import '../../styles/components/Editor/Control.scss'

// Props
interface ToggleControlProps {
  icon: IconType
  command: EditorCommand
  tooltip: string
  selectedElements: Array<HTMLElement>
}

// Component
const ToggleControl: FunctionComponent<ToggleControlProps> = ({ icon, command, selectedElements, tooltip }) => {
  // State
  const [isActive, setIsActive] = useState(false)

  // Update
  useEffect(() => {
    let active = false

    // loop through all selected nodes and check if they have the style
    selectedElements.map(element => {
      let style: CSSStyleDeclaration = getComputedStyle(element)
      // @ts-ignore
      if (style[command.format!.type] == command.format!.value)
        active = true
    })
    
    // Set the state
    setIsActive(active)
  }, [selectedElements])

  // When component is clicked
  const controlClick = () => {
    document.querySelector<HTMLDivElement>('.editor')!.focus() // Focus into the editor
    setIsActive(!isActive) // Change the isActive on click
    command.exec() // Call the command it is supposed to execute
  }

  return (
    <button
      className={`control ${isActive ? 'active' : ''}`}
      data-tooltip={ tooltip }
      onClick={ controlClick }
    >
      { createElement(icon, { className: 'control-icon' }) }
    </button>
  )
}

export default ToggleControl