import React from 'react';
import { shallow } from 'enzyme';

import Charts from './index';

describe('<Charts />', () => {
	test('Should render without errors', () => {
		const comp = shallow(<Charts />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(shallow(<Charts />)).toMatchSnapshot();
	});
});
