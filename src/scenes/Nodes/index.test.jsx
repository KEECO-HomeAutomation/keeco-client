import React from 'react';
import { shallow } from 'enzyme';

import Nodes from './index';

describe('<Nodes />', () => {
	test('Should render without errors', () => {
		const comp = shallow(<Nodes />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(shallow(<Nodes />)).toMatchSnapshot();
	});
});
