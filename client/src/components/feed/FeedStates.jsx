import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

const FeedEmptyState = () => (
	<div>
		<div className="clearfix mt-2">
			<img src="/library.png" width={28} height={28} className="float-left mr-2" alt=""/>
			<h4 className="float-left">Welcome!</h4>
		</div>
		<p className="mt-2">Search for a feed on the left.</p>
	</div>
);

const FeedLoading = () => (<><Spinner animation="border"/><span className="ml-3">Loading...</span></>);

const FeedNotFound = () => ((<div className="feed-not-found">Feed not found.</div>));

const FeedError = () => (<div>Error getting feed from the server.</div>);

export { FeedEmptyState, FeedLoading, FeedNotFound, FeedError };
