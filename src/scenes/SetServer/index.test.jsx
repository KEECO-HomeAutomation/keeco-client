import React from 'react';
import { mount } from 'enzyme';

jest.mock('react-router-dom', () => ({
	__esModule: true,
	withRouter: Comp => props => <Comp {...props} {...props.mocks} />
}));

jest.mock('react-redux', () => ({
	__esModule: true,
	connect: jest.fn(() => Comp => props => <Comp {...props} {...props.mocks} />)
}));

import SetServer, { SetServer as Base, enhancer } from './index';

import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

describe('<SetServer />', () => {
	test('Should export base component and enhancer', () => {
		expect(Base).not.toBe(undefined);
		expect(enhancer).not.toBe(undefined);
	});

	test('Should render without errors', () => {
		const comp = mount(<SetServer />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(mount(<SetServer />)).toMatchSnapshot();
	});

	test('Tiping into text field should update its content', () => {
		const comp = mount(<SetServer />);
		comp
			.find('input#serverAddress')
			.simulate('change', { target: { value: 'server.path:port' } });
		expect(comp.find(TextField)).toHaveValue('server.path:port');
	});

	test('Should have the value from the redux store', () => {
		const comp = mount(
			<SetServer mocks={{ serverPath: 'server.path:port' }} />
		);
		const textField = comp.find(TextField);
		expect(textField).toHaveValue('server.path:port');
	});

	test('Should update the path and redirect to / when button is clicked', () => {
		const mockedHistory = {
			push: jest.fn()
		};
		const mockedSavePath = jest.fn();
		const comp = mount(
			<SetServer
				mocks={{
					saveServerPath: mockedSavePath,
					history: mockedHistory,
					serverPath: 'server.path:port'
				}}
			/>
		);
		comp.find(Button).simulate('click');
		expect(mockedHistory.push).toBeCalledTimes(1);
		expect(mockedHistory.push).toBeCalledWith('/');
		expect(mockedSavePath).toBeCalledTimes(1);
		expect(mockedSavePath).toBeCalledWith('server.path:port');
	});

	test('Redux connect should be called, should map state and dispatch', () => {
		expect(connect).toBeCalled();
		expect(connect).toBeCalledWith(expect.any(Function), expect.any(Function));
		expect(
			connect.mock.calls[0][0]({ app: { server: { path: 'test' } } })
		).toEqual({ serverPath: 'test' });
		const mockedDispatch = jest.fn();
		connect.mock.calls[0][1](mockedDispatch).saveServerPath('path');
		expect(mockedDispatch).toBeCalled();
		expect(mockedDispatch).toBeCalledWith({
			type: 'SERVER@SET',
			payload: 'path'
		});
	});
});
