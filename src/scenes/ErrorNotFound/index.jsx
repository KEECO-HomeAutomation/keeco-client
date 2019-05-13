import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = theme => ({
	centerPanel: {
		width: '50%',
		margin: 'auto',
		marginTop: theme.spacing.unit * 10,
		padding: theme.spacing.unit * 3
	}
});

export const ErrorNotFound = ({ onGoToHomeClick, classes }) => {
	return (
		<Paper className={classes.centerPanel}>
			<Typography variant="h6" gutterBottom>
				Error 404
			</Typography>
			<Typography>
				The requested page is not available. Sorry for that.
			</Typography>
			<Button color="primary" onClick={onGoToHomeClick}>
				Go to home!
			</Button>
		</Paper>
	);
};

ErrorNotFound.propTypes = {
	onGoToHomeClick: PropTypes.func,
	classes: PropTypes.object
};

export const enhancer = compose(
	withRouter,
	withHandlers({
		onGoToHomeClick: ({ history }) => () => {
			history.push('/');
		}
	}),
	withStyles(styles)
);

export default enhancer(ErrorNotFound);
