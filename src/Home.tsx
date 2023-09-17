import { useMemo, useState } from "react";
import { Badge, Button, Card, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "./App";
import styles from './home.module.css'

type EditTagsModalProps = { 
  show: boolean
  handleClose: () => void
  availabaleTags: Tag[]
  onDeleteTags: (id:string) => void
  onUpdateTags: (id:string, label:string) => void
}

type SimplifiedNote = {
  tags: Tag[]
  title: string
  id: string
}

type NodeListProps = {
  availabaleTags: Tag[]
  notes: SimplifiedNote[]
  onDeleteTags: (id:string) => void
  onUpdateTags: (id:string, label:string) => void
}

export default function Home({availabaleTags, notes, onDeleteTags, onUpdateTags}: NodeListProps) {

  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState('')

  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (title === '' || note.title.toLowerCase().includes(title.toLowerCase())) &&
      (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
    })
  }, [title, selectedTags, notes])


  return (
    <>
      <Row className="align-items-center mb-4">
        <Col><h1>Notes</h1></Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to='/new'>
              <Button>Create</Button>
            </Link>
            <Button onClick={() => setEditTagsModalIsOpen(true)} variant="outline-secondary">Edit Tags</Button>
          </Stack>
        </Col>
      </Row>

      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map(tag => {
                  return {label: tag.label, value: tag.id}
                })}
                options={availabaleTags.map(tag => {
                  return {label: tag.label, value: tag.id }
                })}
                onChange={tags => {
                  setSelectedTags(
                    tags.map(tag => {
                      return {label: tag.label, id: tag.value}
                    })
                    )
                }}
                isMulti />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row xs={1} sm={2} lg={3} xl={4} className="g-3 justify-content-center">
        {filteredNotes.map(note => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      <EditTagModal 
        show={editTagsModalIsOpen} 
        handleClose={() => setEditTagsModalIsOpen(false)}
        availabaleTags={availabaleTags} 
        onDeleteTags={onDeleteTags}
        onUpdateTags={onUpdateTags} />
    </>
  )
}

function NoteCard({ id, title, tags }: SimplifiedNote){

  return (
    <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`} >
      <Card.Body>
        <Stack gap={2} className="align-items-center justify-content-center h-100">
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack 
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags.map(tag => (
                <Badge className="text-truncate" key={tag.id} >{tag.label}</Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  )
}


function EditTagModal({availabaleTags, show, handleClose, onDeleteTags, onUpdateTags}: EditTagsModalProps) {
  return(
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availabaleTags.map(tag => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control type="text" value={tag.label} onChange={(e) => onUpdateTags(tag.id, e.target.value)} />
                </Col>
                <Col xs='auto'>
                  <Button onClick={() => onDeleteTags(tag.id) } variant="outline-danger">&times;</Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}