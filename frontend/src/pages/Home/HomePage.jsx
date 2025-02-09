import NotesContainer from '@/components/organisms/Note/NotesContainer'

function HomePage() {
  return (
    <main className='max-h-[calc(100vh-110px)] overflow-y-scroll'>
      <NotesContainer />
    </main>
  )
}

export default HomePage
