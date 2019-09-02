import '../styles/components/NoteCard.scss'
import { FunctionComponent } from 'react'

interface NoteCardProps {
  title: string
  date: string
}

const NoteCard: FunctionComponent<NoteCardProps> = props => {
  return (
    <div className="note-card">
      <h3 className="note-card-title">{ props.title }</h3>
      <p className="note-card-date">{ props.date }</p>
    </div>
  )
}

export default NoteCard
