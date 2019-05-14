import React from 'react';
import { mount } from 'enzyme';

jest.mock('react-router-dom', () => ({
	__esModule: true,
	withRouter: Comp => props => <Comp {...props} {...props.mocks} />
}));

import ErrorNotFound, { ErrorNotFound as Base, enhancer } from './index';

import Button from '@material-ui/core/Button';

describe('<ErrorNotFound />', () => {
	test('Should export base component and enhancer', () => {
		expect(Base).not.toBe(undefined);
		expect(enhancer).not.toBe(undefined);
	});

	test('Should render without errors', () => {
		const comp = mount(<ErrorNotFound />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(mount(<ErrorNotFound />)).toMatchSnapshot();
	});

	test('Clicking on go to home button should redirect to /', () => {
		const mockedHistory = {
			push: jest.fn()
		};
		const comp = mount(<ErrorNotFound mocks={{ history: mockedHistory }} />);
		comp.find(Button).simulate('click');
		expect(mockedHistory.push).toBeCalledTimes(1);
		expect(mockedHistory.push).toBeCalledWith('/');
	});
});
