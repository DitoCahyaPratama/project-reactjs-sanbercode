import React from 'react';
import { Card, Form, Input, Icon, Button, notification } from 'antd';

class CreateCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			id: 0,
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
        if(this.state.input !== ''){
            this.setState({ id: this.state.id + 1 });
            this.props.createNewCard(this.state.id, this.state.input);
            notification.success({
                message: 'Noted',
                description: "Noted Card Added",
            });   
            this.setState({ input: '' })
        }else{
            notification.error({
                message: 'Noted',
                description: "Input is null, please input something",
            });   
        }
	};

	render() {
		return (
			<Card title="Create Card" headStyle={{ backgroundColor: '#1890FF', color: '#fff' }}>
				<Form onSubmit={this.handleNewCard} className="newCard">
					<Form.Item>
						<Input
							prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="Noted Card"
							onChange={this.handleInput}
							className="new-card-input"
							type="text"
							value={this.state.input}
						/>
					</Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">Create Card</Button>
                    </Form.Item>
				</Form>
			</Card>
		);
	}
}

export default CreateCard;
