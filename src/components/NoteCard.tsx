import { useState } from 'react';
import { Badge, Card, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Tag } from '../App';
import { useSwipe2 } from '../hooks/useSwipe';
import styles from '../styles/NoteCard.module.css';

export type SimplifiedNote = {
	tags: Tag[];
	title: string;
	id: string;
} & Partial<{ onDeleteCard: (id: string) => void }>;

export function NoteCard({ id, title, tags, onDeleteCard }: SimplifiedNote) {
	const [ref, setRef] = useState(0);
	const { onTouchEndX, onTouchMoveX, onTouchStartX } = useSwipe2();

	const touchMoveHandler = (e: React.TouchEvent<HTMLElement>) => {
		setRef(onTouchMoveX(e));
	};

	const touchEndHandler = ():void => {
		if (onTouchEndX()![0] === 'left' && ref >= 100) {
			onDeleteCard!(id);
		} else if(ref > 0 && ref < 100) {
			setRef(0);
		}
	};

	return (
		<Card
			as={Link}
			to={`${id}/edit`}
			className={`h-100 text-reset text-decoration-none ${styles.card}`}
			onTouchStart={onTouchStartX}
			onTouchMove={(e) => touchMoveHandler(e)}
			onTouchEnd={touchEndHandler}
			
			style={
				(ref > 0 )
					? { borderRight: `min(${ref}px, 250px) solid #dc3545` }
					: undefined
			}
		>
			<Card.Body
			>
				<Stack direction="horizontal" className="justify-content-between">
					<span className="fs-5 text-truncate">{title}</span>
					{tags.length > 0 && (
						<Stack
							gap={1}
							direction="horizontal"
							className="justify-content-center flex-wrap"
						>
							{tags.map((tag) => (
								<Badge
									className="text-truncate"
									key={tag.id}
									style={{ maxWidth: '90px' }}
								>
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
