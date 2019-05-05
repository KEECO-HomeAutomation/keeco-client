import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setServer } from '../../data/duck';

const SetServer = ({ path, setPath, onSubmitClick }) => {
	return (
		<div>
			<h1>Set server endpoint</h1>
			<span>Server address: </span>
			<input type="text" value={path} onChange={e => setPath(e.target.value)} />
			<br />
			<button type="button" onClick={onSubmitClick}>
				Submit
			</button>
		</div>
	);
};

SetServer.propTypes = {
	path: PropTypes.string.isRequired,
	setPath: PropTypes.func.isRequired,
	onSubmitClick: PropTypes.func.isRequired
};

export default compose(
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
	})
)(SetServer);
