import { ApolloClient } from 'apollo-client';
import GetClient from './apolloClient';

describe('apolloClient setup', () => {
	test('Should export a function to get client', () => {
		expect(typeof GetClient).toBe('function');
	});

	test('Calling the function should return an apollo client', () => {
		global.fetch = jest.fn();
		expect(GetClient(null, () => {})).toBeInstanceOf(ApolloClient);
	});
});
