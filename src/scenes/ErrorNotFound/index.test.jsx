import React from 'react';
import { shallow } from 'enzyme';

import { ErrorNotFound } from './index';

import Button from '@material-ui/core/Button';

describe('<ErrorNotFound />', () => {
	var mockedHistory = null;
	var props = null;
	beforeEach(() => {
		mockedHistory = {
			push: jest.fn()
		};
		props = {
			classes: {
				centerPanel: ''
			},
			history: mockedHistory
		};
	});
	afterEach(() => {
		mockedHistory = null;
		props = null;
	});

	test('Should render without errors', () => {
		const comp = shallow(<ErrorNotFound {...props} />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(shallow(<ErrorNotFound {...props} />)).toMatchSnapshot();
	});

	test('Clicking on go to home button should redirect to /', () => {
		const comp = shallow(<ErrorNotFound {...props} />);
		comp.find(Button).simulate('click');
		expect(mockedHistory.push).toBeCalledTimes(1);
		expect(mockedHistory.push).toBeCalledWith('/');
	});
});
