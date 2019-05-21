import React from 'react';
import { shallow } from 'enzyme';

import Scenes from './index';

describe('<Scenes />', () => {
	test('Should render without error', () => {
		const comp = shallow(<Scenes />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(shallow(<Scenes />)).toMatchSnapshot();
	});
});
