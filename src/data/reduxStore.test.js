import ConfigureStore from './reduxStore';

describe('Redux store', () => {
	test('Should return store and persistor', () => {
		expect(ConfigureStore()).toEqual({
			store: expect.any(Object),
			persistor: expect.any(Object)
		});
	});
});
