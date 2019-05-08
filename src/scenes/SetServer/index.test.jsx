import React from 'react';
import { shallow } from 'enzyme';

import SetServer from './index';

describe('<SetServer />', () => {
	test('Should render without errors', () => {
		const comp = shallow(<SetServer />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(shallow(<SetServer />)).toMatchSnapshot();
	});
});
