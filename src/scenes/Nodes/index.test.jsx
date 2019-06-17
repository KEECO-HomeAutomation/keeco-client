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

import Nodes, { Nodes as Base, enhancer } from './index';

import NodeCard from '../../components/NodeCard';

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
						{ templates: [{ id: 1, mocked: 'node1' }] },
						{ templates: [{ id: 2, mocked: 'node2' }] },
						{ templates: [{ id: 3, mocked: 'node3' }] }
					],
					subscribe: () => () => {}
				}}
			/>
		);
		expect(comp).toMatchSnapshot();
		expect(comp).toContainMatchingElements(3, NodeCard);
	});
});
