import React from 'react';
import NotedCard from '../component/NotedCard';

function NotedContainer(props) {
    console.log(props)
    function renderCards() {
		return props.cards.map((card, id) => {
			return <NotedCard key={id} handleClickList={props.handleClickList} addList={props.addList} card={card} />;
		});
	}
	return <div>{renderCards()}</div>;
    // const test= [{nama: '2'},{nama: 3}]
    // return test.map((item) => {
    //     console.log(item)
    // });
}

export default NotedContainer;
