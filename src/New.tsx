import { NoteData, Tag } from "./App"
import NoteForm from "./NoteForm"

type NewNoteProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availabaleTags: Tag[]
}

function New({onSubmit, onAddTag, availabaleTags}: NewNoteProps) {
  return (
    <>
      <h1>New</h1>
      <NoteForm 
        onSubmit={onSubmit} 
        onAddTag={onAddTag} 
        availabaleTags={availabaleTags} />
    </>
  )
}

export default New