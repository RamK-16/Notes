import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NoteData, Tag } from '../App';
import { NoteForm } from '../components/NoteForm';

type NewNoteProps = {
	onSubmit: (data: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
};

export const NewNote = ({
	onSubmit,
	onAddTag,
	availableTags,
}: NewNoteProps) => {
	return (
		<>
    <Row>
      <Col>
			<Link to="/">
				<Button variant="outline-secondary">Back</Button>
			</Link>
      </Col>
      <Col xs="auto">
			<h1 className="mb-4">New Note</h1>
      </Col>
    </Row>
			<NoteForm
				onSubmit={onSubmit}
				onAddTag={onAddTag}
				availableTags={availableTags}
			/>
		</>
	);
};
