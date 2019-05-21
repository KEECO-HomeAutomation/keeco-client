import React from 'react';
import { mount } from 'enzyme';

import Charts from './index';

describe('<Charts />', () => {
	test('Should render without errors', () => {
		const comp = mount(<Charts />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(mount(<Charts />)).toMatchSnapshot();
	});
});
