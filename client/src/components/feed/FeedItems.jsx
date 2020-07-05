import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import moment from 'moment';

class FeedItems extends Component {
	openLink = url => window.open(url, '_blank');

	renderItemsList = items => (
		<ListGroup variant="flush">
			{items.map(item => (
				<ListGroup.Item key={item.isoDate}>
					<div onClick={() => this.openLink(item.link)} className="feed-item cursor-pointer">
						<h6 className="font-weight-bold">{item.title}</h6>
						<div className="text-secondary">
							{item.creator}
							<small className="ml-2">
								{moment(item.isoDate).format('MMM Do, hh:mm')}
							</small>
						</div>
						{item.contentSnippet && <div className="mt-2"><em>{item.contentSnippet}</em></div>}
					</div>
				</ListGroup.Item>
			))}
		</ListGroup>
	);

	renderEmptyItemsList = () => (<div className="p-4">This feed has no items.</div>);

	render() {
		const { title, items } = this.props;
		return (
			<Card>
				<Card.Header className="bg-secondary text-white">
					<h4 className="m-0">{title}</h4>
				</Card.Header>
				{items && items.length ? this.renderItemsList(items) : this.renderEmptyItemsList()}
			</Card>
		);
	}
}

export default FeedItems;
