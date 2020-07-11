import React from 'react';
import { Card } from 'antd';

class CreateCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            input: '',
            id: 0
        };
    }

	handleInput = (event) => {
		event.persist();
		this.setState({
			input: event.target.value,
		});
	};

	handleNewCard = (event) => {
        event.preventDefault();
        this.setState({ id: this.state.id + 1 })
		this.props.createNewCard(this.state.id ,this.state.input);
	};

	render() {
		return (
			<Card title="Create Card" style={{ width: 300 }}>
				<form onSubmit={this.handleNewCard}>
					<input
						onChange={this.handleInput}
						className="new-card-input"
						type="text"
						value={this.state.input}
					/>
					<input className="new-card-input" type="submit" value="Create" />
				</form>
			</Card>
		);
	}
}

export default CreateCard;
