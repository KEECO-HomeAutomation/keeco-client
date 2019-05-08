import React from 'react';
import { shallow } from 'enzyme';

import Users from './index';

describe('<Users />', () => {
	test('Should render without errors', () => {
		const comp = shallow(<Users />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(shallow(<Users />)).toMatchSnapshot();
	});
});
