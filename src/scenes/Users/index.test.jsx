import React from 'react';
import { mount } from 'enzyme';

import Users from './index';

describe('<Users />', () => {
	test('Should render without errors', () => {
		const comp = mount(<Users />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(mount(<Users />)).toMatchSnapshot();
	});
});
