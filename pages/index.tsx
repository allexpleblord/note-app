import '../styles/pages/home.scss'
import { NextPage } from 'next'
import Scrollbar from 'react-scrollbars-custom'

// Components
import NoteCard from '../components/NoteCard'
import NoteEditor from '../components/NoteEditor'
import Layout from '../components/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <Scrollbar className="all-notes">
        <NoteCard title="Just a note" date="22/08/2019" />
        <NoteCard title="Just a note" date="22/08/2019" />
        <NoteCard title="Just a note" date="22/08/2019" />
        <NoteCard title="Just a note" date="22/08/2019" />
        <NoteCard title="Just a note" date="22/08/2019" />
        <NoteCard title="Just a note" date="22/08/2019" />
        <NoteCard title="Just a note" date="22/08/2019" />
        <NoteCard title="Just a note" date="22/08/2019" />
      </Scrollbar>
      <div>
        <NoteEditor />
      </div>
    </Layout>
  )
}

export default Home
