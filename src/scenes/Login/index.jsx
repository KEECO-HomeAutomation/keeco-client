import React from 'react';
import PropTypes from 'prop-types';
import {
	compose,
	withState,
	withHandlers,
	branch,
	renderComponent
} from 'recompose';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { graphql } from 'react-apollo';
import { setAuthToken } from '../../data/duck';

import LOGIN_MUTATION from './data/loginMutation.graphql';

const Login = ({
	username,
	password,
	setUsername,
	setPassword,
	onLoginClick
}) => {
	return (
		<div>
			<h1>Login</h1>
			<span>Username: </span>
			<input
				type="text"
				value={username}
				onChange={e => setUsername(e.target.value)}
			/>
			<br />
			<span>Password: </span>
			<input
				type="password"
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<br />
			<button type="button" onClick={onLoginClick}>
				Log in!
			</button>
		</div>
	);
};

Login.propTypes = {
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	setUsername: PropTypes.func.isRequired,
	setPassword: PropTypes.func.isRequired,
	onLoginClick: PropTypes.func.isRequired
};

export default compose(
	withRouter,
	connect(
		state => ({
			authToken: state.app.login.token
		}),
		dispatch => ({
			setAuthToken: token => dispatch(setAuthToken(token))
		})
	),
	branch(
		({ authToken }) => authToken !== null,
		renderComponent(() => <Redirect to="/" />)
	),
	withState('username', 'setUsername', ''),
	withState('password', 'setPassword', ''),
	graphql(LOGIN_MUTATION, {
		props: ({ mutate }) => ({
			login: mutate
		}),
		options: ({ history, setAuthToken }) => ({
			onCompleted: ({ login: { token } }) => {
				setAuthToken(token);
				history.push('/');
			},
			onError: () => {
				alert('Wrong username or password');
			}
		})
	}),
	withHandlers({
		onLoginClick: ({ login, username, password }) => () => {
			login({
				variables: { input: { username, password } }
			});
		}
	})
)(Login);
