/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';

jest.mock('./components/Dashboard', () => () => <p>Dashboard</p>);
jest.mock('../Nodes', () => () => <p>Nodes</p>);
jest.mock('../Groups', () => () => <p>Groups</p>);
jest.mock('../Charts', () => () => <p>Charts</p>);
jest.mock('../Users', () => () => <p>Users</p>);

jest.mock('react-router-dom', () => ({
	__esModule: true,
	withRouter: Comp => props => <Comp {...props} {...props.mocks} />,
	Redirect: () => <p>Redirect</p>,
	Switch: ({ children }) => (
		<div>
			<p>Switch</p>
			{children}
		</div>
	),
	Route: jest.fn(() => <p>Route</p>)
}));

jest.mock('react-redux', () => ({
	__esModule: true,
	connect: jest.fn(() => Comp => props => <Comp {...props} {...props.mocks} />)
}));

import Dashboard, { Dashboard as Base, enhancer } from './index';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

describe('<Dashboard />', () => {
	test('Should export base component and enhancer', () => {
		expect(Base).not.toBe(undefined);
		expect(enhancer).not.toBe(undefined);
	});

	test('Should render without errors', () => {
		const comp = mount(<Dashboard />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(mount(<Dashboard />)).toMatchSnapshot();
	});

	test('Should redirect to /serServer when server path not available', () => {
		const comp = mount(<Dashboard />);
		expect(comp).toContainReact(<Redirect to="/setServer" />);
		expect(comp).toMatchSnapshot();
	});

	test('Should redirect to /login when not logged in', () => {
		const comp = mount(<Dashboard mocks={{ isServerPath: true }} />);
		expect(comp).toContainReact(<Redirect to="/login" />);
		expect(comp).toMatchSnapshot();
	});

	test('Should match snapshot when everything is ok', () => {
		const comp = mount(
			<Dashboard mocks={{ isServerPath: true, isAuthToken: true }} />
		);
		expect(comp).toMatchSnapshot();
	});

	test('Should match snapshot when drawer closed', () => {
		const comp = mount(
			<Dashboard
				mocks={{ isServerPath: true, isAuthToken: true, isDrawerOpen: false }}
			/>
		);
		expect(comp).toMatchSnapshot();
	});

	test('Should match snapshot when drawer is open', () => {
		const comp = mount(
			<Dashboard
				mocks={{ isServerPath: true, isAuthToken: true, isDrawerOpen: true }}
			/>
		);
		expect(comp).toMatchSnapshot();
	});

	describe('Handlers', () => {
		test('#openDrawerBtn should call toggleDrawerOpen', () => {
			const mockedToggle = jest.fn();
			const comp = mount(
				<Dashboard
					mocks={{
						isServerPath: true,
						isAuthToken: true,
						toggleDrawerOpen: mockedToggle
					}}
				/>
			);
			comp
				.find('#openDrawerBtn')
				.hostNodes()
				.simulate('click');
			expect(mockedToggle).toBeCalledTimes(1);
		});

		test('#closeDrawerBtn should call toggleDrawerOpen', () => {
			const mockedToggle = jest.fn();
			const comp = mount(
				<Dashboard
					mocks={{
						isServerPath: true,
						isAuthToken: true,
						toggleDrawerOpen: mockedToggle
					}}
				/>
			);
			comp
				.find('#closeDrawerBtn')
				.hostNodes()
				.simulate('click');
			expect(mockedToggle).toBeCalledTimes(1);
		});

		describe('GoTo dashboard page', () => {
			const tests = ['Dashboard', 'Nodes', 'Groups', 'Charts', 'Users'];
			tests.forEach(testCase => {
				test('#goTo' + testCase + 'Btn should call goTo', () => {
					const expectedPath =
						testCase === 'Dashboard' ? '/' : '/' + testCase.toLowerCase();
					const mockedHistory = { push: jest.fn() };
					const comp = mount(
						<Dashboard
							mocks={{
								isServerPath: true,
								isAuthToken: true,
								history: mockedHistory
							}}
						/>
					);
					comp
						.find('#goTo' + testCase + 'Btn')
						.hostNodes()
						.simulate('click');
					expect(mockedHistory.push).toBeCalledTimes(1);
					expect(mockedHistory.push).toBeCalledWith(expectedPath);
				});
			});
		});

		test('Should logOut when #logOutBtn is pressed', () => {
			const mockedLogOut = jest.fn();
			const comp = mount(
				<Dashboard
					mocks={{
						isServerPath: true,
						isAuthToken: true,
						logOut: mockedLogOut
					}}
				/>
			);
			comp
				.find('#logOutBtn')
				.hostNodes()
				.simulate('click');
			expect(mockedLogOut).toBeCalledTimes(1);
		});
	});

	describe('Should map state and props using connect', () => {
		test('Should call connect', () => {
			expect(connect).toBeCalled();
		});

		describe('Mapping state', () => {
			test('Should return isServerPath accordingly', () => {
				expect(
					connect.mock.calls[0][0]({
						app: { server: { path: 'path' }, login: { token: 'token' } },
						dashboard: { drawer: { open: true } }
					})
				).toEqual(expect.objectContaining({ isServerPath: true }));
				expect(
					connect.mock.calls[0][0]({
						app: { server: { path: null }, login: { token: 'token' } },
						dashboard: { drawer: { open: true } }
					})
				).toEqual(expect.objectContaining({ isServerPath: false }));
			});

			test('Should return isAuthToken accordingly', () => {
				expect(
					connect.mock.calls[0][0]({
						app: { server: { path: 'path' }, login: { token: 'token' } },
						dashboard: { drawer: { open: true } }
					})
				).toEqual(expect.objectContaining({ isAuthToken: true }));
				expect(
					connect.mock.calls[0][0]({
						app: { server: { path: 'path' }, login: { token: null } },
						dashboard: { drawer: { open: true } }
					})
				).toEqual(expect.objectContaining({ isAuthToken: false }));
			});

			test('Should return isDrawerOpen accordingly', () => {
				expect(
					connect.mock.calls[0][0]({
						app: { server: { path: 'path' }, login: { token: null } },
						dashboard: { drawer: { open: true } }
					})
				).toEqual(expect.objectContaining({ isDrawerOpen: true }));
				expect(
					connect.mock.calls[0][0]({
						app: { server: { path: 'path' }, login: { token: null } },
						dashboard: { drawer: { open: false } }
					})
				).toEqual(expect.objectContaining({ isDrawerOpen: false }));
			});
		});

		describe('Mapping dispatch', () => {
			test('Should map toggleDrawerOpen', () => {
				const mockedDispatch = jest.fn();
				connect.mock.calls[0][1](mockedDispatch).toggleDrawerOpen();
				expect(mockedDispatch).toBeCalledTimes(1);
				expect(mockedDispatch).toBeCalledWith({ type: 'DRAWER@TOGGLE' });
			});

			test('Should map logOut', () => {
				const mockedDispatch = jest.fn();
				connect.mock.calls[0][1](mockedDispatch).logOut();
				expect(mockedDispatch).toBeCalledTimes(1);
				expect(mockedDispatch).toBeCalledWith({ type: 'LOGIN@CLEAR_TOKEN' });
			});
		});
	});
});
