import React from 'react';
import { shallow } from 'enzyme';

import Login from './index';

describe('<Login />', () => {
	test('Should render without errors', () => {
		const comp = shallow(<Login />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(shallow(<Login />)).toMatchSnapshot();
	});
});
