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
			<h1 className="mb-4">NewNote</h1>
      </Col>
      <Col xs="auto">
			<Link to="/">
				<Button variant="outline-secondary">Back</Button>
			</Link>
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
