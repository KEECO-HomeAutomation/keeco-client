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
import { withRouter, Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import { setAuthToken } from '../../data/duck';

import LOGIN_MUTATION from './data/loginMutation.graphql';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
	centerForm: {
		width: '33%',
		margin: 'auto',
		marginTop: theme.spacing(10),
		padding: theme.spacing(3)
	},
	textField: {
		marginBottom: theme.spacing(3)
	}
});

export const Login = ({
	username,
	password,
	setUsername,
	setPassword,
	onLoginClick,
	classes
}) => {
	return (
		<Paper className={classes.centerForm}>
			<Typography variant="h6" gutterBottom>
				Log in
			</Typography>
			<TextField
				required
				id="username"
				label="Username"
				value={username}
				onChange={e => setUsername(e.target.value)}
				className={classes.textField}
			/>
			<br />
			<TextField
				required
				id="password"
				label="Password"
				type="password"
				value={password}
				onChange={e => setPassword(e.target.value)}
				className={classes.textField}
			/>
			<br />
			<Button onClick={onLoginClick} color="primary">
				Log in
			</Button>
		</Paper>
	);
};

Login.propTypes = {
	username: PropTypes.string,
	password: PropTypes.string,
	setUsername: PropTypes.func,
	setPassword: PropTypes.func,
	onLoginClick: PropTypes.func,
	classes: PropTypes.object
};

export const enhancer = compose(
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
		({ authToken }) => authToken != null,
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
	}),
	withStyles(styles)
);

export default enhancer(Login);
