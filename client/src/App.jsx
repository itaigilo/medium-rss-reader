import React, { Component } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import HeaderBar from './components/HeaderBar';
import SearchBox from './components/SearchBox';
import FeedView from './components/feed/FeedView';

import { BASE_SERVER_URL, LS_USER_ID_KEY } from './config';

class App extends Component {
	state = {
		feed: null,
		history: [],
		userId: '',
		isLoading: false,
	};

	async componentDidMount() {
		await this.getHistoryFromServer();
	}

	getFeedFromServer = async feedId => {
		this.setState({ isLoading: true });
		try {
			const { data } = await axios.get(`${BASE_SERVER_URL}/feed?sourceType=medium&sourceId=${feedId}`);
			this.setState({ feed: data });
			await this.saveHistoryItemToServer(feedId);
			await this.getHistoryFromServer();
			return true;
		} catch (e) {
			this.handleServerError(e, feedId);
			return false;
		} finally {
			this.setState({ isLoading: false });
		}
	};

	handleServerError = (e, feedId) => {
		const { status, data } = e.response || e;
		switch (status) {
			case 404:
				console.warn('Feed not found', feedId);
				this.setState({ feed: { isFeedNotFound: true } });
				break;
			default:
				console.error('Error getting feed', (data && data.error));
				this.setState({ feed: { error: true } });
				break;
		}
	};

	getHistoryFromServer = async () => {
		const userId = this.getUserId();
		const { data } = await axios.get(`${BASE_SERVER_URL}/history?userId=${userId}`);
		if (data) {
			const curUserId = !userId && data.userId ? this.setUserId(data.userId) : userId;

			const { items } = data;
			this.setState({ history: items || [], userId: curUserId });
		}
	};

	saveHistoryItemToServer = async feedId =>
		await axios.post(`${BASE_SERVER_URL}/history?userId=${this.state.userId}&feedId=${feedId}`);

	getUserId = () => this.state.userId || sessionStorage.getItem(LS_USER_ID_KEY) || '';

	setUserId = userId => {
		sessionStorage.setItem(LS_USER_ID_KEY, userId);
		return userId;
	};

	render() {
		return (
			<>
				<HeaderBar/>
				<Container className="w-100 mt-3">
					<Row>
						<Col md={4}>
							<SearchBox getFeedFromServer={feedId => this.getFeedFromServer(feedId)}
									   history={this.state.history}
									   isLoading={this.state.isLoading}/>
						</Col>
						<Col md={8}>
							<FeedView feed={this.state.feed} isLoading={this.state.isLoading}/>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}

export default App;
