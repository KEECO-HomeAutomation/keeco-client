import reducer, * as duck from './duck';

describe('dashboard duck', () => {
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
			drawer: {
				open: true
			}
		});
	});

	describe('Reducer should work', () => {
		test('TOGGLE_DRAWER should toggle drawer', () => {
			let mockedState = reducer(undefined, { type: 'INIT' });
			mockedState.drawer.open = true;
			expect(reducer(mockedState, duck.toggleDrawer())).toEqual(
				expect.objectContaining({
					drawer: {
						open: false
					}
				})
			);
			mockedState.drawer.open = false;
			expect(reducer(mockedState, duck.toggleDrawer())).toEqual(
				expect.objectContaining({
					drawer: {
						open: true
					}
				})
			);
		});
	});
});
