import { ApolloClient } from 'apollo-client';
import {
	InMemoryCache,
	IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getMainDefinition } from 'apollo-utilities';

import fragmentTypes from './fragmentTypes.json';

const getClient = (gqlEndpoint, getToken) => {
	return new ApolloClient({
		link: ApolloLink.from([
			onError(({ graphQLErrors, networkError }) => {
				if (graphQLErrors) {
					graphQLErrors.map(({ message, locations, path }) => {
						// eslint-disable-next-line no-console
						console.error(
							`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
						);
					});
				}
				if (networkError) {
					// eslint-disable-next-line no-console
					console.error(`[GraphQL network error]: ${networkError}`);
				}
			}),
			split(
				({ query }) => {
					const definition = getMainDefinition(query);
					return (
						definition.kind === 'OperationDefinition' &&
						definition.operation === 'subscription'
					);
				},
				new WebSocketLink(
					new SubscriptionClient(`ws://${gqlEndpoint}/graphql`, {
						reconnect: true,
						connectionParams: () => ({
							Authorization: getToken()
						})
					})
				),
				setContext(() => ({
					headers: {
						Authorization: getToken()
					}
				})).concat(
					new HttpLink({
						uri: `http://${gqlEndpoint}/`
					})
				)
			)
		]),
		cache: new InMemoryCache({
			fragmentMatcher: new IntrospectionFragmentMatcher({
				introspectionQueryResultData: fragmentTypes
			})
		}),
		defaultOptions: {
			query: {
				fetchPolicy: 'cache-and-network'
			}
		}
	});
};

export default getClient;
