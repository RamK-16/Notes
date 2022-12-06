import { Badge, Button, Col, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NoteData, Tag } from '../App';
import { NoteForm } from '../components/NoteForm';
import { useNote } from '../components/NoteLayout';

type EditNoteProps = {
	onSubmit: (id: string, data: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
} & Partial<{onDelete: (id: string) => void;}>;

export const EditNote = ({
	onDelete,
	onSubmit,
	onAddTag,
	availableTags,
}: EditNoteProps) => {
	const note = useNote();
	return (
		<>
			<Row className="align-items-center mb-4">
				<Col>
					<h1 className="text-truncate" style={{maxWidth: '200px'}}>{note.title}</h1>
					{note.tags.length > 0 && (
						<Stack gap={1} direction="horizontal" className="flex-wrap">
							{note.tags.map((tag) => (
								<Badge className="text-truncate" key={tag.id}>
									{tag.label}
								</Badge>
							))}
						</Stack>
					)}
				</Col>
				<Col xs="auto">
					<Stack gap={2} direction="horizontal">
						<Link to="/">
							<Button variant="outline-secondary">Back</Button>
						</Link>
					</Stack>
				</Col>
			</Row>
			<NoteForm
				noteId={note.id}
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
				onDelete={onDelete}
				onSubmit={(data) => onSubmit(note.id, data)}
				onAddTag={onAddTag}
				availableTags={availableTags}
			/>
		</>
	);
};
