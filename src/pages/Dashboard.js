import React, { Component } from 'react';
import firebase from '../config/firebase';
import { notification } from 'antd';
import NotedCard from '../component/NotedCard';
import CreateCard from '../component/CreateCard';
import NotedContainer from './NotedContainer';
import Title from 'antd/lib/typography/Title';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cards: [],
		};
	}

	handleSignOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				notification.success({
					message: 'Noted',
					description: "You're successfully logout. Nice Day !",
				});
				this.props.history.push('/');
			});
	};
	createNewCard = (idCard, input) => {
		let newCard = {
			id: idCard,
			title: input,
			lists: [],
		};
		this.setState({
			cards: [...this.state.cards, newCard],
		});
	};
	addList = (cardId, input, idList) => {
		let newList = {
			id: idList,
			description: input,
			card_id: cardId,
			completed: false,
		};

		const foundCard = { ...this.state.cards.find((card) => card.id === cardId) };
		foundCard.lists = [...foundCard.lists, newList];

		const newCards = this.state.cards.map((card) => {
			if (card.id === cardId) {
				return foundCard;
			} else {
				return card;
			}
		});

		this.setState({
			cards: newCards,
		});
	};
	handleClickList = (cardId, listId) => {
		const foundCard = { ...this.state.cards.find((card) => card.id === cardId) };
		const foundList = foundCard.lists.find((list) => list.id === listId);

		let newState = null;

		if (foundList.completed) {
			newState = false;
		} else {
			newState = true;
		}

		let newList = {
			id: listId,
			description: foundList.description,
			card_id: cardId,
			completed: newState,
		};

		const newLists = foundCard.lists.map((list) => {
			if (list.id === listId) {
				return newList;
			} else {
				return list;
			}
		});
		foundCard.lists = newLists;

		const newCards = this.state.cards.map((card) => {
			if (card.id === cardId) {
				return foundCard;
			} else {
				return card;
			}
		});

		this.setState({
			cards: newCards,
		});
	};

	componentDidUpdate() {
		console.log(this.state.cards);
	}

	render() {
		return (
			<div className="main-container">
				<div>
					<button onClick={this.handleSignOut}>Logout</button>
				</div>
				<NotedContainer
					cards={this.state.cards}
					addList={this.addList}
					handleClickList={this.handleClickList}
				/>
				<CreateCard createNewCard={this.createNewCard} />
			</div>
		);
	}
}

export default Dashboard;
