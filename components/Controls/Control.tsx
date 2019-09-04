import { FunctionComponent, useState, useEffect, createElement } from 'react'
import { IconType } from 'react-icons/lib/cjs'
import { EditorCommand } from '../../src/EditorCommands'
import '../../styles/components/Editor/Control.scss'

interface ControlProps {
  icon: IconType
  command: EditorCommand
  tooltip: string
}

const Control: FunctionComponent<ControlProps> = ({ command, icon, tooltip }) => {
  return (
    <button
      className='control'
      data-tooltip={ tooltip }
      onClick={ command.exec }
    >
      { createElement(icon, { className: 'control-icon' }) }
    </button>
  )
}

export default Control