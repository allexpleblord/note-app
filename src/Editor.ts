export type EditorCommand = () => boolean // Type for functions which exec commands

export const MakeBold: EditorCommand = () => document.execCommand('bold')
export const MakeItalic: EditorCommand = () => document.execCommand('italic')