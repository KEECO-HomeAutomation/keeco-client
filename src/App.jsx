import React from 'react';
import {
	compose,
	mapProps,
	onlyUpdateForKeys,
	branch,
	renderComponent
} from 'recompose';
import { ApolloProvider } from 'react-apollo';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import getApolloClient from './data/apolloClient';
import getReduxStore from './data/reduxStore';

import Scenes from './scenes';

const redux = getReduxStore();

const EnhancedApolloProvider = compose(
	connect(state => ({
		serverPath: state.app.server.path
	})),
	onlyUpdateForKeys(['serverPath']),
	branch(
		({ serverPath }) => serverPath === null,
		renderComponent(({ children }) => children)
	),
	mapProps(({ serverPath, children }) => ({
		client: getApolloClient(
			serverPath,
			() => redux.store.getState().app.login.token
		),
		children
	}))
)(ApolloProvider);

const App = () => {
	return (
		<Provider store={redux.store}>
			<PersistGate persistor={redux.persistor}>
				{bootstrapped => {
					if (bootstrapped) {
						return (
							<EnhancedApolloProvider>
								<Scenes />
							</EnhancedApolloProvider>
						);
					} else {
						return <p>Loading...</p>;
					}
				}}
			</PersistGate>
		</Provider>
	);
};

export default App;
