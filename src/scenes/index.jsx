import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Dashboard from './Dashboard';
import SetServer from './SetServer';
import Login from './Login';
import ErrorNotFound from './ErrorNotFound';

const Scenes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/setServer" component={SetServer} />
				<Route exact path="/login" component={Login} />
				<Route path="/" component={Dashboard} />
				<Route component={ErrorNotFound} />
			</Switch>
		</BrowserRouter>
	);
};

export default Scenes;
