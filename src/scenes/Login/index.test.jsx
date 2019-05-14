import React from 'react';
import { mount } from 'enzyme';

jest.mock('react-router-dom', () => ({
	__esModule: true,
	withRouter: Comp => props => <Comp {...props} {...props.mocks} />,
	Redirect: () => <p>Redirect</p>
}));

jest.mock('react-redux', () => ({
	__esModule: true,
	connect: jest.fn(() => Comp => props => <Comp {...props} {...props.mocks} />)
}));

jest.mock('react-apollo', () => ({
	__esModule: true,
	graphql: jest.fn(() => Comp => props => <Comp {...props} {...props.mocks} />)
}));

import Login, { Login as Base, enhancer } from './index';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import Button from '@material-ui/core/Button';

describe('<Login />', () => {
	test('Should render without errors', () => {
		const comp = mount(<Login />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(mount(<Login />)).toMatchSnapshot();
	});

	test('Should export base component and enhancer', () => {
		expect(Base).not.toBe(undefined);
		expect(enhancer).not.toBe(undefined);
	});

	test('Typing to the username input should update its value', () => {
		const comp = mount(<Login />);
		comp
			.find('input#username')
			.simulate('change', { target: { value: 'testUser' } });
		expect(comp.find('input#username')).toHaveValue('testUser');
	});

	test('Typing to the password input should update its value', () => {
		const comp = mount(<Login />);
		comp
			.find('input#password')
			.simulate('change', { target: { value: 'testPassword' } });
		expect(comp.find('input#password')).toHaveValue('testPassword');
	});

	test('Clicking the submit button should call the login method from gql', () => {
		const mockedLogin = jest.fn();
		const comp = mount(<Login mocks={{ login: mockedLogin }} />);
		comp
			.find('input#username')
			.simulate('change', { target: { value: 'username' } });
		comp
			.find('input#password')
			.simulate('change', { target: { value: 'password' } });
		comp.find(Button).simulate('click');
		expect(mockedLogin).toBeCalledTimes(1);
		expect(mockedLogin).toBeCalledWith({
			variables: { input: { username: 'username', password: 'password' } }
		});
	});

	test('When already logged in, should redirect', () => {
		const comp = mount(<Login mocks={{ authToken: 'token' }} />);
		expect(comp).toMatchSnapshot();
		expect(comp).toContainReact(<Redirect to="/" />);
	});

	test('Should connect state and dispatch', () => {
		expect(connect).toBeCalled();
		expect(connect).toBeCalledWith(expect.any(Function), expect.any(Function));
		expect(
			connect.mock.calls[0][0]({ app: { login: { token: 'token' } } })
		).toEqual({ authToken: 'token' });
		const mockedDispatch = jest.fn();
		connect.mock.calls[0][1](mockedDispatch).setAuthToken('token');
		expect(mockedDispatch).toBeCalledTimes(1);
		expect(mockedDispatch).toBeCalledWith({
			type: 'LOGIN@SET_TOKEN',
			payload: 'token'
		});
	});

	test('graphql should be called', () => {
		expect(graphql).toBeCalled();
		expect(graphql).toBeCalledWith(expect.any(Object), expect.any(Object));
	});

	test('graphql should map props', () => {
		const gconf = graphql.mock.calls[0][1];
		expect(gconf.props({ mutate: 'mockedMutate' })).toEqual({
			login: 'mockedMutate'
		});

		const mockedHistory = { push: jest.fn() };
		const mockedSetToken = jest.fn();
		const goptions = gconf.options({
			history: mockedHistory,
			setAuthToken: mockedSetToken
		});
		expect(goptions).toEqual(
			expect.objectContaining({
				onCompleted: expect.any(Function),
				onError: expect.any(Function)
			})
		);

		goptions.onCompleted({ login: { token: 'token' } });
		expect(mockedHistory.push).toBeCalledTimes(1);
		expect(mockedHistory.push).toBeCalledWith('/');
		expect(mockedSetToken).toBeCalledTimes(1);
		expect(mockedSetToken).toBeCalledWith('token');

		global.alert = jest.fn();
		goptions.onError();
		expect(alert).toBeCalledTimes(1);
		expect(alert).toBeCalledWith('Wrong username or password');
	});
});
