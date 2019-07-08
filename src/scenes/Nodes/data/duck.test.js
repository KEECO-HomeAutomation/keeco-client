import reducer, * as duck from './duck';

describe('nodes duck', () => {
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
			viewMode: 'template'
		});
	});

	describe('Reducer should work', () => {
		test('SET_VIEW_MODE should set view mode', () => {
			let mockedState = reducer(undefined, { type: 'INIT' });
			mockedState.viewMode = 'node';
			expect(reducer(mockedState, duck.setViewMode('template'))).toEqual(
				expect.objectContaining({
					viewMode: 'template'
				})
			);
			mockedState.viewMode = 'template';
			expect(reducer(mockedState, duck.setViewMode('node'))).toEqual(
				expect.objectContaining({
					viewMode: 'node'
				})
			);
		});
	});
});
