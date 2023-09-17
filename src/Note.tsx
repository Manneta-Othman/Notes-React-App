import { Badge, Button, Col, Row, Stack } from "react-bootstrap"
import { useNote } from "./NodeLayout"
import { Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"

type NoteProps ={ 
    onDelete: (id: string) => void
}

export default function Note({onDelete}: NoteProps) {
    const note = useNote()
  return (
    <>
    <Row className="align-items-center mb-4">
        <Col>
            <h1>{note.title}</h1>
            {note.tags.length > 0 && (
                <Stack
                    gap={1}
                    direction="horizontal"
                    className="flex-wrap"
                >
                    {note.tags.map(tag => (
                        <Badge className="text-truncate" key={tag.id} >
                            {tag.label}
                        </Badge>
                    ))}
                </Stack>
            )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button>Edit</Button>
            </Link>
            <Button variant="outline-danger" onClick={() => onDelete(note.id)}>Delete</Button>
            <Link to='..'>
                <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
    </Row>
    <ReactMarkdown>{note.notetext}</ReactMarkdown>
    </>
  )
}
