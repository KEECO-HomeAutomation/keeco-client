import React from 'react';
import { mount } from 'enzyme';

import Groups from './index';

describe('<Groups />', () => {
	test('Should render without errors', () => {
		const comp = mount(<Groups />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(mount(<Groups />)).toMatchSnapshot();
	});
});
