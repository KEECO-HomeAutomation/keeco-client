import reducer, * as duck from './duck';

describe('app duck', () => {
	test('Reducer should be a function', () => {
		expect(typeof reducer).toBe('function');
	});

	test('Should export types', () => {
		expect(duck.types).not.toBe(undefined);
	});

	describe('Action creators should work', () => {
		Object.keys(duck.types).forEach(type => {
			let actionName = type.replace(/[A-Z]+_?/g, (word, index) => {
				word = word.replace('_', '');
				if (index === 0) {
					return word.toLowerCase();
				} else {
					return word.charAt(0) + word.slice(1).toLowerCase();
				}
			});
			test(
				'Type <' +
					type +
					'> should have action creator named <' +
					actionName +
					'>',
				() => {
					expect(typeof duck[actionName]).toBe('function');
				}
			);

			test(
				'Action creator <' +
					actionName +
					'> should return action of type <' +
					type +
					'>',
				() => {
					expect(duck[actionName](null).type).toBe(duck.types[type]);
				}
			);
		});
	});

	test('Should return default state', () => {
		expect(reducer(undefined, { type: 'INIT' })).toEqual({
			login: {
				token: null
			},
			server: {
				path: null
			}
		});
	});

	describe('Reducer should work', () => {
		test('SET_AUTH_TOKEN should set auth token', () => {
			expect(reducer(undefined, duck.setAuthToken('userToken'))).toEqual(
				expect.objectContaining({
					login: {
						token: 'userToken'
					}
				})
			);
		});

		test('CLEAR_AUTH_TOKEN should clear auth token', () => {
			let mockedState = reducer(undefined, { type: 'INIT' });
			mockedState.login.token = 'userToken';
			expect(reducer(mockedState, duck.clearAuthToken())).toEqual(
				expect.objectContaining({
					login: {
						token: null
					}
				})
			);
		});

		test('SET_SERVER should set server path', () => {
			expect(reducer(undefined, duck.setServer('path:port'))).toEqual(
				expect.objectContaining({
					server: {
						path: 'path:port'
					}
				})
			);
		});

		test('CLEAR_SERVER should clear server path', () => {
			let mockedState = reducer(undefined, { type: 'INIT' });
			mockedState.server.path = 'path:port';
			expect(reducer(mockedState, duck.clearServer())).toEqual(
				expect.objectContaining({
					server: {
						path: null
					}
				})
			);
		});
	});
});
