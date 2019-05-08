import React from 'react';
import { shallow } from 'enzyme';

import Groups from './index';

describe('<Groups />', () => {
	test('Should render without errors', () => {
		const comp = shallow(<Groups />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(shallow(<Groups />)).toMatchSnapshot();
	});
});
