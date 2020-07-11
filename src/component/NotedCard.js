import React, { Component } from 'react';
import NotedList from './NotedList';
import { Card, Form, Input, Icon, notification } from 'antd';

class NotedCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 0,
			input: '',
		};
	}

	handleListInput = (event) => {
		this.setState({
			input: event.target.value,
		});
	};

	handleListSubmit = (event) => {
		event.preventDefault();
		if(this.state.input !== ''){
			this.setState({ id: this.state.id + 1 });
			this.props.addList(this.props.card.id, this.state.input, this.state.id);
			this.setState({
				input: '',
			});
			notification.success({
				message: 'Noted',
				description: "List on card !"+this.props.card.title+" is Created",
			});  
		}else {
			notification.error({
				message: 'Noted',
				description: "Input is null, please input something",
			});  
		}
	};

	renderLists() {
		return this.props.card.lists.map((list) => {
			return (
				<NotedList
					key={list.id}
					handleClickList={this.props.handleClickList}
					cardId={this.props.card.id}
					list={list}
				/>
			);
		});
	}

	render() {
		return (
			<Card title={this.props.card.title} className="notedCard">
				<Form onSubmit={this.handleListSubmit}>
        <Form.Item>
            <Input
              prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Create List Here"
              onChange={this.handleListInput} type="text" value={this.state.input}
            />
        </Form.Item>
				</Form>
				{this.renderLists()}
			</Card>
		);
	}
}

export default NotedCard;
