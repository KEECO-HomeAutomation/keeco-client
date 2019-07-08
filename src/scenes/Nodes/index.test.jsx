/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';

jest.mock('../../components/NodeCard', () => props => (
	<p>NodeCard: {JSON.stringify(props)} </p>
));

jest.mock('react-apollo', () => ({
	__esModule: true,
	graphql: () => Comp => props => <Comp {...props} {...props.mocks} />
}));

jest.mock('react-redux', () => ({
	__esModule: true,
	connect: jest.fn(() => Comp => props => <Comp {...props} {...props.mocks} />)
}));

import Nodes, { Nodes as Base, enhancer } from './index';

import NodeCard from '../../components/NodeCard';
import ToggleButton from '@material-ui/lab/ToggleButton';

import { connect } from 'react-redux';

describe('<Nodes />', () => {
	test('Should export base component and enhancer', () => {
		expect(Base).not.toBe(undefined);
		expect(enhancer).not.toBe(undefined);
	});

	test('Should render without errors', () => {
		const comp = mount(
			<Nodes mocks={{ nodes: [], subscribe: () => () => {} }} />
		);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(
			mount(<Nodes mocks={{ nodes: [], subscribe: () => () => {} }} />)
		).toMatchSnapshot();
	});

	test('When graphql is loading should display loading circle', () => {
		const comp = mount(
			<Nodes mocks={{ loading: true, nodes: [], subscribe: () => () => {} }} />
		);
		expect(comp).toMatchSnapshot();
		expect(comp).toContainMatchingElement('svg.MuiCircularProgress-svg');
	});

	test('Component should subscribe on mount and unsubscribe on unmount', () => {
		const unsubFunc = jest.fn();
		const subFunc = jest.fn().mockReturnValue(unsubFunc);
		const comp = mount(<Nodes mocks={{ nodes: [], subscribe: subFunc }} />);
		expect(subFunc).toBeCalledTimes(1);
		expect(unsubFunc).not.toBeCalled();
		comp.unmount();
		expect(unsubFunc).toBeCalledTimes(1);
	});

	test('Should display a mapped list of the nodes', () => {
		const comp = mount(
			<Nodes
				mocks={{
					nodes: [
						{ id: 1, templates: [{ id: 4, mocked: 'node1' }] },
						{ id: 2, templates: [{ id: 5, mocked: 'node2' }] },
						{ id: 3, templates: [{ id: 6, mocked: 'node3' }] }
					],
					subscribe: () => () => {}
				}}
			/>
		);
		expect(comp).toMatchSnapshot();
		expect(comp).toContainMatchingElements(3, NodeCard);
	});

	describe('Handlers', () => {
		test('Should be able to change to nodes view', () => {
			const setViewMode = jest.fn();
			const comp = mount(
				<Nodes
					mocks={{
						nodes: [],
						subscribe: () => () => {},
						setViewMode: setViewMode
					}}
				/>
			);
			comp
				.find(ToggleButton)
				.at(0)
				.simulate('click');
			expect(setViewMode).toBeCalledTimes(1);
			expect(setViewMode).toBeCalledWith('node');
		});

		test('Should be able to change to templates view', () => {
			const setViewMode = jest.fn();
			const comp = mount(
				<Nodes
					mocks={{
						nodes: [],
						subscribe: () => () => {},
						setViewMode: setViewMode
					}}
				/>
			);
			comp
				.find(ToggleButton)
				.at(1)
				.simulate('click');
			expect(setViewMode).toBeCalledTimes(1);
			expect(setViewMode).toBeCalledWith('template');
		});
	});

	describe('Should map state and dispatch using connect', () => {
		test('Should call connect', () => {
			expect(connect).toBeCalled();
		});

		describe('Mapping state', () => {
			test('Should return viewMode accordingly', () => {
				expect(
					connect.mock.calls[0][0]({ nodes: { viewMode: 'mockedViewMode' } })
				).toEqual(
					expect.objectContaining({
						viewMode: 'mockedViewMode'
					})
				);
			});
		});

		describe('Mapping dispatch', () => {
			test('Should map setViewMode', () => {
				const mockedDispatch = jest.fn();
				connect.mock.calls[0][1](mockedDispatch).setViewMode('mockedViewMode');
				expect(mockedDispatch).toBeCalledTimes(1);
				expect(mockedDispatch).toBeCalledWith({
					type: 'NODES@SET_VIEW_MODE',
					payload: 'mockedViewMode'
				});
			});
		});
	});
});
