import { Badge, Card, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Tag } from '../App';
import styles from '../styles/NoteCard.module.css';
export type SimplifiedNote = {
	tags: Tag[];
	title: string;
	id: string;
};
export function NoteCard({ id, title, tags }: SimplifiedNote) {
	return (
		<Card
			as={Link}
			to={`${id}/edit`}
			className={`h-100 text-reset text-decoration-none ${styles.card}`}
		>
			<Card.Body>
				<Stack direction="horizontal" className="justify-content-between">
					<span className="fs-5 text-truncate">{title}</span>
					{tags.length > 0 && (
						<Stack
							gap={1}
							direction="horizontal"
							className="justify-content-center flex-wrap"
						>
							{tags.map((tag) => (
								<Badge className="text-truncate" key={tag.id} style={{maxWidth: '90px'}}>
									{tag.label}
								</Badge>
							))}
						</Stack>
					)}
				</Stack>
			</Card.Body>
		</Card>
	);
}
