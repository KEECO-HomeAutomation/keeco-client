import React from 'react';
import { mount } from 'enzyme';

import Nodes from './index';

describe('<Nodes />', () => {
	test('Should render without errors', () => {
		const comp = mount(<Nodes />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(mount(<Nodes />)).toMatchSnapshot();
	});
});
