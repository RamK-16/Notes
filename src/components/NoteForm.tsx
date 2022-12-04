import { FormEvent, useRef, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import { v4 as uuidV4 } from 'uuid';
import { NoteData, Tag } from '../App';

type NoteFormProps = {
	onSubmit: (data: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
} & Partial<NoteData> &
	Partial<{ onDelete: (id: string) => void; noteId: string }>;

export function NoteForm({
	noteId,
	onDelete,
	onSubmit,
	onAddTag,
	availableTags,
	title = '',
	markdown = '',
	tags = [],
}: NoteFormProps) {
	const titleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
	const { pathname } = useLocation();
	const navigate = useNavigate();

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		onSubmit({
			title: titleRef.current!.value,
			markdown: markdownRef.current!.value,
			tags: selectedTags,
		});
		navigate('/');
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={3}>
				<Row>
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control ref={titleRef} required defaultValue={title} />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<CreatableReactSelect
								onCreateOption={(label) => {
									const newTag = { id: uuidV4(), label };
									onAddTag(newTag);
									setSelectedTags((prev) => [...prev, newTag]);
								}}
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
				<Form.Group controlId="markdown">
					<Form.Label>Body</Form.Label>
					<Form.Control
						defaultValue={markdown}
						ref={markdownRef}
						required
						as="textarea"
						rows={15}
					/>
				</Form.Group>
				{/* <Stack direction="horizontal" gap={1} className=""> */}
				{/* <Row>
					<Col sm={12}> */}
				<Row>
					<Col
						xs={pathname !== '/new' ? 9 : 12}
						md={pathname !== '/new' ? 8 : 12}
					>
						<Button style={{ width: '100%' }} type="submit">
							Save
						</Button>
					</Col>
					<Col
						style={pathname !== '/new' ? undefined : { display: 'none' }}
						xs={3}
						md={4}
					>
						<Button
							onClick={
								pathname !== '/new'
									? () => {
											onDelete!(noteId!);
											navigate('/');
									  }
									: undefined
							}
							variant="outline-danger"
							style={{ width: '100%' }}
						>
							Delete
						</Button>
					</Col>
				</Row>
			</Stack>
		</Form>
	);
}
