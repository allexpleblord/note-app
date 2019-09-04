// Type for the editor command
interface Format {
  type: string
  value: string
}

export type EditorCommand = {
  format?: Format, // A style which is applied after executing the command
  exec: () => boolean | void
}

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