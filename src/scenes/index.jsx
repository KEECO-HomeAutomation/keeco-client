import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Dashboard from './Dashboard';
import SetServer from './SetServer';
import Login from './Login';

const Scenes = () => {
	return (
		<BrowserRouter>
			<Route exact path="/" component={Dashboard} />
			<Route path="/setServer" component={SetServer} />
			<Route path="/login" component={Login} />
		</BrowserRouter>
	);
};

export default Scenes;
