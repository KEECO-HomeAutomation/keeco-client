import React from 'react';
import { mount } from 'enzyme';

jest.mock('./scenes', () => () => <p>Scenes</p>);

import App from './App';

describe('<App />', () => {
	test('Renders without crashing', () => {
		const comp = mount(<App />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(mount(<App />)).toMatchSnapshot();
	});
});
