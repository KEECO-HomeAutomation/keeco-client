import React from 'react';
import { mount } from 'enzyme';

import Dashboard from './Dashboard';

describe('componenct/<Dashboard />', () => {
	test('Should render without errors', () => {
		const comp = mount(<Dashboard />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(mount(<Dashboard />)).toMatchSnapshot();
	});
});
