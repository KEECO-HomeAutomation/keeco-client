import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { setServer } from '../../data/duck';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

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

export const SetServer = ({ path, setPath, onSubmitClick, classes }) => {
	return (
		<Paper className={classes.centerForm}>
			<Typography variant="h6" gutterBottom>
				Set server address
			</Typography>
			<TextField
				required
				id="serverAddress"
				label="Server address"
				value={path}
				onChange={e => setPath(e.target.value)}
				className={classes.textField}
			/>
			<br />
			<Button onClick={onSubmitClick} color="primary">
				Submit
			</Button>
		</Paper>
	);
};

SetServer.propTypes = {
	path: PropTypes.string,
	setPath: PropTypes.func,
	onSubmitClick: PropTypes.func,
	classes: PropTypes.object
};

export const enhancer = compose(
	withRouter,
	connect(
		state => ({
			serverPath: state.app.server.path
		}),
		dispatch => ({
			saveServerPath: path => dispatch(setServer(path))
		})
	),
	withState('path', 'setPath', ({ serverPath }) => serverPath || ''),
	withHandlers({
		onSubmitClick: ({ saveServerPath, history, path }) => () => {
			saveServerPath(path);
			history.push('/');
		}
	}),
	withStyles(styles)
);

export default enhancer(SetServer);
