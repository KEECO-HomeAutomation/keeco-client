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
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LayersIcon from '@material-ui/icons/Layers';

const styles = theme => ({
	appBar: {
		width: '100%',
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		zIndex: theme.zIndex.drawer + 1
	},
	appBarShift: {
		width: '80%',
		marginLeft: '20%',
	},
	menuButton: {
		marginRight: 36
	},
	toolbar: {
		paddingLeft: 8
	},
	menuButtonClosed: {
		display: 'none'
	},
	title: {
		color: theme.palette.primary.contrastText
	},
	drawer: {
		width: theme.spacing.unit*7 +1,
		overflow: 'hidden',
		transition: theme.transitions.create(['width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		whiteSpace: 'nowrap'
	},
	drawerOpen: {
		width: '20%'
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
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
				<Toolbar className={classes.toolbar}>
					<IconButton
						className={classNames({
							[classes.menuButton]: true,
							[classes.menuButtonClosed]: isDrawerOpen
						})}
						onClick={toggleDrawerOpen}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h4" className={classes.title}>
						KEECO Client
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classNames({
					[classes.drawer]: true,
					[classes.drawerOpen]: isDrawerOpen
				})}
				variant="permanent"
				anchor="left"
				open={isDrawerOpen}
				classes={{
					paper: classNames({
						[classes.drawer]: true,
						[classes.drawerOpen]: isDrawerOpen
					})
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={toggleDrawerOpen}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<List>
					<ListItem button key="dashboard">
						<ListItemIcon>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText>Dashboard</ListItemText>
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem button key="logOut">
						<ListItemIcon>
							<PowerSettingsNewIcon />
						</ListItemIcon>
						<ListItemText>Log out</ListItemText>
					</ListItem>
				</List>
			</Drawer>
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
