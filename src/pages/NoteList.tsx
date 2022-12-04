import { useMemo, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import { Tag } from '../App';
import { EditTagsModal } from '../components/EditTagsModal';
import { NoteCard, SimplifiedNote } from '../components/NoteCard';

type NoteListProps = {
	availableTags: Tag[];
	notes: SimplifiedNote[];
	onUpdateTag: (id: string, label: string) => void;
	onDeleteTag: (id: string) => void;
};

export function NoteList({
	availableTags,
	notes,
	onDeleteTag,
	onUpdateTag,
}: NoteListProps) {
	const [title, setTitle] = useState<string>('');
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [modalState, setModalState] = useState<boolean>(false);
	const filteredNotes = useMemo(() => {
		return notes.filter((note) => {
			return (
				(title === '' ||
					note.title.toLowerCase().includes(title.toLowerCase())) &&
				(selectedTags.length === 0 ||
					selectedTags.every((tag) =>
						note.tags.some((noteTag) => noteTag.id === tag.id)
					))
			);
		});
	}, [title, selectedTags, notes]);

	return (
		<>
			<Row className="align-items-center mb-4">
				<Col>
					<h1>Notes</h1>
				</Col>
				<Col xs="auto">
					<Stack gap={2} direction="horizontal">
						<Link to="/new">
							<Button size="lg" style={{position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', top: '85vh', borderRadius: '50%'}} variant="primary">+</Button>
						</Link>
						<Button
							onClick={() => {
								setModalState(true);
							}}
							variant="outline-secondary"
						>
							Edit tags
						</Button>
					</Stack>
				</Col>
			</Row>
			<Form>
				<Row className="mb-4">
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<ReactSelect
								options={availableTags.map((tag) => {
									return { label: tag.label, value: tag.id };
								})}
								value={selectedTags.map((tag) => {
									return {
										label: tag.label,
										value: tag.id,
									};
								})}
								onChange={(tags) => {
									setSelectedTags(
										tags.map((tag) => {
											return {
												label: tag.label,
												id: tag.value,
											};
										})
									);
								}}
								isMulti
							/>
						</Form.Group>
					</Col>
				</Row>
			</Form>
			<Row xs={1} sm={2} lg={3} xl={4} className="g-3">
				{filteredNotes.map((note) => {
					return (
						<Col key={note.id}>
							<NoteCard id={note.id} title={note.title} tags={note.tags} />
						</Col>
					);
				})}
			</Row>
			<EditTagsModal
				show={modalState}
				handleClose={() => setModalState(false)}
				availableTags={availableTags}
				onDeleteTag={onDeleteTag}
				onUpdateTag={onUpdateTag}
			/>
		</>
	);
}
