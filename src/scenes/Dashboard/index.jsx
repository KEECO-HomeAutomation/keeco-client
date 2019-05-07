import React from 'react';
import PropTypes from 'prop-types';
import { compose, branch, renderComponent, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { toggleDrawer } from './data/duck';
import { clearAuthToken } from '../../data/duck';

import DashboardView from './components/Dashboard';
import Nodes from '../Nodes';
import Groups from '../Groups';
import Charts from '../Charts';
import Users from '../Users';

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
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import BarChartIcon from '@material-ui/icons/BarChart';
import GroupIcon from '@material-ui/icons/Group';

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
		marginLeft: '20%'
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
		width: theme.spacing.unit * 7 + 1,
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
	},
	content: {
		flexGrow: 1,
		marginTop: theme.mixins.toolbar.minHeight,
		padding: theme.spacing.unit * 3
	}
});

const Dashboard = ({
	isDrawerOpen,
	toggleDrawerOpen,
	goTo,
	onLogoutClick,
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
					<ListItem button onClick={() => goTo('/')}>
						<ListItemIcon>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText>Dashboard</ListItemText>
					</ListItem>
					<ListItem button onClick={() => goTo('/nodes')}>
						<ListItemIcon>
							<DeviceHubIcon />
						</ListItemIcon>
						<ListItemText>Nodes</ListItemText>
					</ListItem>
					<ListItem button onClick={() => goTo('/groups')}>
						<ListItemIcon>
							<LayersIcon />
						</ListItemIcon>
						<ListItemText>Groups</ListItemText>
					</ListItem>
					<ListItem button onClick={() => goTo('/charts')}>
						<ListItemIcon>
							<BarChartIcon />
						</ListItemIcon>
						<ListItemText>Charts</ListItemText>
					</ListItem>
					<ListItem button onClick={() => goTo('/users')}>
						<ListItemIcon>
							<GroupIcon />
						</ListItemIcon>
						<ListItemText>Users</ListItemText>
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem button onClick={onLogoutClick}>
						<ListItemIcon>
							<PowerSettingsNewIcon />
						</ListItemIcon>
						<ListItemText>Log out</ListItemText>
					</ListItem>
				</List>
			</Drawer>
			<div className={classes.content}>
				<Switch>
					<Route path="/nodes" component={Nodes} />
					<Route path="/groups" component={Groups} />
					<Route path="/charts" component={Charts} />
					<Route path="/users" component={Users} />
					<Route path="/" component={DashboardView} />
				</Switch>
			</div>
		</React.Fragment>
	);
};

export default compose(
	connect(
		state => ({
			isServerPath: state.app.server.path !== null,
			isAuthToken: state.app.login.token !== null,
			isDrawerOpen: state.dashboard.drawer.open
		}),
		dispatch => ({
			toggleDrawerOpen: () => dispatch(toggleDrawer()),
			logOut: () => dispatch(clearAuthToken())
		})
	),
	withRouter,
	branch(
		({ isServerPath }) => !isServerPath,
		renderComponent(() => <Redirect to="/setServer" />)
	),
	branch(
		({ isAuthToken }) => !isAuthToken,
		renderComponent(() => <Redirect to="/login" />)
	),
	withHandlers({
		goTo: ({ history }) => url => {
			history.push(url);
		},
		onLogoutClick: ({ logOut }) => () => {
			logOut();
		}
	}),
	withStyles(styles)
)(Dashboard);
