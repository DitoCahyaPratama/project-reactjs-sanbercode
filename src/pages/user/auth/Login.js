import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import firebase from '../../../config/firebase'

import { Form, Input, Button, Icon, notification, Card, Typography, Spin } from 'antd';

const { Title } = Typography
const FormItem = Form.Item;

class Login extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <div className="login-container">
                <div className="login-body">
                    <Link to="/">
                        <Icon type="edit" style={{ fontSize: '72px', color: '#1D8EFB', paddingBottom: 10 }} />
                    </Link>
                    <Title level={3} textALign="center" type="secondary">Login to NOTED</Title>
                    <Card bordered={false} style={{ width: 400 }}>
                        <div className="login-content">
                            <AntWrappedLoginForm onLogin={this.props.onLogin} />
                        </div>
                    </Card>

                </div>
            </div>
        );
    }
}

class LoginForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            loading: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({ loading: true })

        this.props.form.validateFields((err, values) => {
            if (!err) {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(values.email, values.password)
                    .then(signedUser => {
                        console.log(signedUser)
                        this.setState({ loading: false })
                        notification.success({
                            message: 'Noted',
                            description: "You're successfully login. Welcome to NOTED!",
                        });          
                    })
                    .catch(err => {
                        console.log(err)
                        this.setState({ loading: false })
                        notification.error({
                            message: 'Noted',
                            description: 'Sorry! Something went wrong. Please try again!'
                        });
        
                    })
                }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loading } = this.state
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" />}
                            size="large"
                            name="email"
                            placeholder="Email"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" />}
                            size="large"
                            name="password"
                            type="password"
                            placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    {loading ? <Spin /> :
                        <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                    }
                    <br />
                    Or <Link to="/register">register now!</Link>
                </FormItem>
            </Form>
        );
    }
}
export default Login;
