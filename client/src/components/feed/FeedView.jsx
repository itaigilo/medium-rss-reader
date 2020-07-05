import React from 'react';

import FeedItems from './FeedItems';
import { FeedEmptyState, FeedLoading, FeedNotFound, FeedError } from './FeedStates';

const FeedView = props => {
	const { feed, isLoading } = props;
	if (isLoading) return <FeedLoading/>;
	if (!feed) return <FeedEmptyState/>;

	const { title, items, isFeedNotFound, error } = feed;

	if (isFeedNotFound) return <FeedNotFound/>;
	if (error) return <FeedError/>;

	return <FeedItems title={title} items={items}/>;
};

export default FeedView;
