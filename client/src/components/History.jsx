import React from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function History(props) {
	const { history } = props;
	if (!history || !history.length) return null;

	return (
		<Card>
			<Card.Header className="text-uppercase">History</Card.Header>
			<ListGroup variant="flush">
				{history.map(item => (
					<ListGroup.Item key={item._id}
									onClick={() => props.onItemClicked(item.feedId)}
									className="history-item cursor-pointer">
						{item.feedId}
					</ListGroup.Item>
				))}
			</ListGroup>
		</Card>
	);
}

export default History;
