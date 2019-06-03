import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { clearAuthToken } from '../../../data/duck';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

export const LogoutButton = ({ onLogoutClick }) => {
	return (
		<ListItem id="logOutBtn" button onClick={onLogoutClick}>
			<ListItemIcon>
				<PowerSettingsNewIcon />
			</ListItemIcon>
			<ListItemText>Log out</ListItemText>
		</ListItem>
	);
};

LogoutButton.propTypes = {
	onLogoutClick: PropTypes.func
};

export const enhancer = compose(
	connect(
		null,
		dispatch => ({
			logOut: () => dispatch(clearAuthToken())
		})
	),
	withHandlers({
		onLogoutClick: ({ logOut }) => () => {
			logOut();
		}
	})
);

export default enhancer(LogoutButton);
