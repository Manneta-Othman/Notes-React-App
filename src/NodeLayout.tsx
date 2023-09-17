import { useParams, Navigate, Outlet, useOutletContext } from "react-router-dom"
import { Note } from "./App"

type NodeLayoutProps ={
    notes: Note[]
}

export default function NodeLayout({ notes }: NodeLayoutProps) {

  const {id} = useParams()
  const note = notes.find( n => n.id === id)

  if(note == null) return <Navigate to='/' replace />

  return (
    <Outlet context={note} />
  )
}

export function useNote() {
  return useOutletContext<Note>()
}
