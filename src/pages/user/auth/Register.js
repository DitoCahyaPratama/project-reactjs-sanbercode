import React, { Component } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import { 
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../../../constants';

import firebase from '../../../config/firebase'

import { Form, Input, Button, notification, Icon, Typography, Card, Spin } from 'antd';

const {Title} = Typography
const FormItem = Form.Item;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
			},
			passwordConfirmed: {
				value: ''
            },
            loading: false
        }
    }

    handleInputChange = (event, validationFun) => {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue, 
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
    
        this.setState({ loading: true });

        const signupRequest = {
            email: this.state.email.value,
            username: this.state.username.value,
            password: this.state.password.value
        };

        firebase
            .auth()
            .createUserWithEmailAndPassword(signupRequest.email, signupRequest.password)
            .then(createdUser => {
                console.log(createdUser)
                this.setState({ loading: false })
                notification.success({
                    message: 'Noted',
                    description: "Thank you! You're successfully registered. Please Login to continue!",
                });          
                this.props.history.push("/login");
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

    isFormInvalid = () => {
        return !(this.state.username.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
			this.state.password.validateStatus === 'success' &&
			this.state.passwordConfirmed.validateStatus === 'success'
        );
    }

    render() {

        const {email,password,passwordConfirmed, username, loading} = this.state

        return (
            <div className="signup-container">
                 <div className="signup-body">
                    <Link to="/">
                        <Icon type="edit" style={{ fontSize: '72px', color: '#1D8EFB', paddingBottom: 10 }} />
                    </Link>
                    <Title level={3} textALign="center" type="secondary">Register to Noted</Title>
                    <Card bordered={false} style={{ width: 400 }}>
                        <div className="signup-content">
                            <Form onSubmit={this.handleSubmit} className="signup-form">
                                <FormItem 
                                    hasFeedback
                                    validateStatus={username.validateStatus}
                                    help={username.errorMsg}>
                                    <Input
                                        size="large"
                                        name="username"
                                        autoComplete="off"
                                        placeholder="A unique username"
                                        value={username.value}
                                        onBlur={this.validateUsernameAvailability}
                                        onChange={(event) => this.handleInputChange(event, this.validateUsername)} />
                                </FormItem>
                                <FormItem
                                    hasFeedback
                                    validateStatus={email.validateStatus}
                                    help={email.errorMsg}>
                                    <Input
                                        size="large"
                                        name="email"
                                        type="email"
                                        autoComplete="off"
                                        placeholder="Your email"
                                        value={email.value}
                                        onBlur={this.validateEmailAvailability}
                                        onChange={(event) => this.handleInputChange(event, this.validateEmail)} />
                                </FormItem>
                                <FormItem
                                    validateStatus={password.validateStatus}
                                    help={password.errorMsg}>
                                    <Input
                                        size="large"
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                        placeholder="A password between 6 to 20 characters"
                                        value={password.value}
                                        onChange={(event) => this.handleInputChange(event, this.validatePassword)} />
                                </FormItem>
                                <FormItem
                                    validateStatus={passwordConfirmed.validateStatus}
                                    help={passwordConfirmed.errorMsg}>
                                    <Input
                                        size="large"
                                        name="passwordConfirmed"
                                        type="password"
                                        autoComplete="off"
                                        placeholder="A password between 6 to 20 characters"
                                        value={passwordConfirmed.value}
                                        onChange={(event) => this.handleInputChange(event, this.validatePasswordConfirmed)} />
                                </FormItem>
                                <FormItem>
                                    {loading ? <Spin /> : <Button 
                                        type={loading ? "default" : "primary"}
                                        htmlType="submit"
                                        size="large"
                                        className="signup-form-button"
                                        disabled={this.isFormInvalid() || loading}>
                                            Sign In
                                        </Button>}   
                                        <br />                                 
                            Already registed? <Link to="/login">Login now!</Link>
                                </FormItem>
                            </Form>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    // Validation Functions

    validateEmail = (email) => {
        if(!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email may not be empty'                
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email not valid'
            }
        }

        if(email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
            }
        }

        return {
            validateStatus: 'success',
            errorMsg: null
        }
    }

    validateUsername = (username) => {
        if(username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    validatePassword = (password) => {
        if(password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };            
        }
    }

	validatePasswordConfirmed = (password) => {
        if(password !== this.state.password.value) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is not same`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };            
        }
    }

}

export default Register;