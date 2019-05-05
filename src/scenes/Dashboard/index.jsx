import React from 'react';
import PropTypes from 'prop-types';
import { compose, branch, renderComponent, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { toggleDrawer } from './data/duck';

import NODES_QUERY from './data/nodesQuery.graphql';
import NODE_SUBSCRIPTION from './data/nodeSubscription.graphql';

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LayersIcon from '@material-ui/icons/Layers';

const styles = theme => ({
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	appBarShift: {
		width: '80%',
		marginLeft: '20%'
	}
});

const Dashboard = ({
	loading,
	nodes,
	isDrawerOpen,
	toggleDrawerOpen,
	classes
}) => {
	return (
		<React.Fragment>
			<AppBar
				position="fixed"
				className={classNames({
					[classes.appBar]: true,
					[classes.appBarShift]: isDrawerOpen
				})}
			>
				<IconButton onClick={toggleDrawerOpen}>Toggle</IconButton>
			</AppBar>
		</React.Fragment>
	);
};

Dashboard.propTypes = {
	loading: PropTypes.bool,
	nodes: PropTypes.array
};

export default compose(
	connect(
		state => ({
			isServerPath: state.app.server.path !== null,
			isAuthToken: state.app.login.token !== null,
			isDrawerOpen: state.dashboard.drawer.open
		}),
		dispatch => ({
			toggleDrawerOpen: () => dispatch(toggleDrawer())
		})
	),
	branch(
		({ isServerPath }) => !isServerPath,
		renderComponent(() => <Redirect to="/setServer" />)
	),
	branch(
		({ isAuthToken }) => !isAuthToken,
		renderComponent(() => <Redirect to="/login" />)
	),
	graphql(NODES_QUERY, {
		props: ({ data: { loading, nodes, subscribeToMore } }) => ({
			loading,
			nodes,
			subscribe: () =>
				subscribeToMore({
					document: NODE_SUBSCRIPTION,
					updateQuery: (prev, { subscriptionData }) => {
						if (!subscriptionData.data) {
							return prev;
						}

						const { mutation, node } = subscriptionData.data.nodeSubscription;

						if (mutation === 'CREATED') {
							return {
								...prev,
								nodes: [...prev.nodes, node]
							};
						}
						//UPDATED handled automatically
						if (mutation === 'DELETED') {
							return {
								...prev,
								nodes: prev.nodes.filter(p => p.id !== node.id)
							};
						}

						return prev;
					}
				})
		})
	}),
	lifecycle({
		componentDidMount() {
			if (!this.cancelSubscription) {
				this.cancelSubscription = this.props.subscribe();
			}
		},
		componentWillUnmount() {
			if (this.cancelSubscription) {
				this.cancelSubscription();
			}
		}
	}),
	withStyles(styles)
)(Dashboard);
