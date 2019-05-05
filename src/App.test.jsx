import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('<App />', () => {
	test('Renders without crashing', () => {
		const comp = shallow(<App />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(shallow(<App />)).toMatchSnapshot();
	});
});
