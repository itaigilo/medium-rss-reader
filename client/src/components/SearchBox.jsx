import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import History from './History';

class SearchBox extends Component {
	state = {
		userInput: '',
	};

	onTextChange = event => this.setState({ userInput: event.target.value });

	onSubmitClicked = async event => {
		event.preventDefault();
		const success = await this.props.getFeedFromServer(this.state.userInput);
		if (success) this.setState({ userInput: '' });
	};

	render() {
		return (
			<>
				<Form>
					<InputGroup className="mb-3">
						<Form.Control type="text"
									  placeholder="Enter Medium user or account..."
									  className="search-input"
									  value={this.state.userInput}
									  disabled={this.props.isLoading}
									  onChange={this.onTextChange}/>
						<InputGroup.Append>
							<Button type="submit"
									className="search-submit bg-info text-uppercase"
									disabled={!this.state.userInput || this.props.isLoading}
									onClick={this.onSubmitClicked}>Submit</Button>
						</InputGroup.Append>
					</InputGroup>
				</Form>
				<History history={this.props.history}
						 onItemClicked={feedId => this.props.getFeedFromServer(feedId)}/>
			</>
		);
	}
}

export default SearchBox;
