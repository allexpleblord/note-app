// Type for the editor command
export type EditorCommand = {
  format?: { type: string, value: string }, // A style which is applied after executing the command
  exec: () => boolean | void
}

// Commands which are executed by the editor controls
export const Bold: EditorCommand = {
  format: { type: 'fontWeight', value: '700' },
  exec: () => document.execCommand('bold')
}
export const Italic: EditorCommand = {
  format: { type: 'fontStyle', value: 'italic' },
  exec: () => document.execCommand('italic')
}
export const Underline: EditorCommand = {
  format: { type: 'textDecorationLine', value: 'underline' },
  exec: () => document.execCommand('underline')
}
export const Clear: EditorCommand = {
  exec: () => document.execCommand('removeFormat')
}
export const MakeUList: EditorCommand = {
  exec: () => {
    if (isNotNested())
      document.execCommand('insertHTML', false, '<ul class="editor-ul"><li><br></li></ul>')
  }
}
export const MakeOList: EditorCommand = {
  exec: () => {
    if (isNotNested())
      document.execCommand('insertHTML', false, '<ol class="editor-ol"><li><br></li></ol>')
  }
}
export const MakeChecklist: EditorCommand = {
  exec: () => {
    if (isNotNested())
      document.execCommand('insertHTML', false, `
        <ul class="checklist">
          <li class="checklist-item" onclick="this.classList.toggle('checked')">
            <br>
          </li>
        </ul>
      `)
  }
}

/* 
  Function to help determine if a command should be executed
  Used on <ul> and <ol> which shouldnt be nested within each other
*/
const isNotNested = (): boolean => {
  const selection = document.getSelection()
  console.log(selection)

  if (!selection)
    return false

  // Dont execute when its a range because insertHTML removes the content inside
  if (selection.type === 'Range')
    return false
  
  // Check if the element is not ul or ol
  if (selection.anchorNode) {
    let element = selection.anchorNode as HTMLElement
    while (element) {
      const name = element.nodeName.toLowerCase()
      // If its the editor just break out of the loop
      if (element.id === 'editor')
        break

      if (name === 'ul' || name === 'ol' || name === 'li') {
        return false
      }

      // Go up the tree if possible
      if (element.parentElement)
        element = element.parentElement
      else
        break
    }
  }

  return true
}