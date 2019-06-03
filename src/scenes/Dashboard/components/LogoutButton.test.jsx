/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';

jest.mock('react-redux', () => ({
	__esModule: true,
	connect: jest.fn(() => Comp => props => <Comp {...props} {...props.mocks} />)
}));

import LogoutButton, { LogoutButton as Base, enhancer } from './LogoutButton';

import { connect } from 'react-redux';

describe('<LogoutButton />', () => {
	test('Should export base component and enhancer', () => {
		expect(Base).not.toBe(undefined);
		expect(enhancer).not.toBe(undefined);
	});

	test('Should render without errors', () => {
		const comp = mount(<LogoutButton />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(mount(<LogoutButton />)).toMatchSnapshot();
	});

	describe('Handlers', () => {
		test('#logOutBtn should call logOut', () => {
			const mockedLogOut = jest.fn();
			const comp = mount(<LogoutButton mocks={{ logOut: mockedLogOut }} />);
			comp
				.find('#logOutBtn')
				.hostNodes()
				.simulate('click');
			expect(mockedLogOut).toBeCalledTimes(1);
		});
	});

	describe('Should map state and props using react', () => {
		describe('Mapping state', () => {
			test('State should not be used', () => {
				expect(connect.mock.calls[0][0]).toBe(null);
			});
		});

		describe('Mapping dispatch', () => {
			test('Should map logOut', () => {
				const mockedDispatch = jest.fn();
				connect.mock.calls[0][1](mockedDispatch).logOut();
				expect(mockedDispatch).toBeCalledTimes(1);
				expect(mockedDispatch).toBeCalledWith({ type: 'LOGIN@CLEAR_TOKEN' });
			});
		});
	});
});
