import React from 'react';
import { mount } from 'enzyme';

jest.mock('react-router-dom', () => ({
	__esModule: true,
	withRouter: Comp => props => <Comp {...props} {...props.mocks} />,
	Redirect: Comp => jest.fn(props => <Comp {...props} />)
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
		const comp=mount(<Login mocks={{authToken: 'token'}} />);
		expect(comp).toMatchSnapshot();
		expect(comp).toContainReact(<Redirect to="/" />);
	});

	test('Should connect state and dispatch', () => {
		
	})
});
