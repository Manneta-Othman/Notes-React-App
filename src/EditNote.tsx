import { NoteData, Tag } from "./App"
import { useNote } from "./NodeLayout"
import NoteForm from "./NoteForm"

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availabaleTags: Tag[]
}

function EditNote({onSubmit, onAddTag, availabaleTags}: EditNoteProps) {
    const note = useNote();
    return (
    <>
      <h1>Edit Note</h1>
      <NoteForm 
        title={note.title}
        notetext={note.notetext}
        tags={note.tags}
        onSubmit={data => onSubmit(note.id, data)} 
        onAddTag={onAddTag} 
        availabaleTags={availabaleTags} />
    </>
  )
}

export default EditNote