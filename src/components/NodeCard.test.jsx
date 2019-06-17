/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';

jest.mock('./TemplateIcon', () => () => <p>TemplateIcon</p>);
jest.mock('./TemplateControls', () => () => <p>TemplateControls</p>);

import NodeCard, { NodeCard as Base, enhancer } from './NodeCard';

import TemplateIcon from './TemplateIcon';
import TemplateControls from './TemplateControls';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

describe('<NodeCard />', () => {
	test('Should export base and enhancer', () => {
		expect(Base).not.toBe(undefined);
		expect(enhancer).not.toBe(undefined);
	});

	test('Should render without errors', () => {
		const comp = mount(<NodeCard data={{ name: 'node' }} />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(mount(<NodeCard data={{ name: 'node' }} />)).toMatchSnapshot();
	});

	test('If template is set should show template related info', () => {
		const comp = mount(
			<NodeCard
				data={{
					name: 'node',
					template: { name: 'template', data: { mocked: 'data' } }
				}}
			/>
		);
		expect(comp).toMatchSnapshot();
	});

	test('If actions are set, should show action bar', () => {
		const action1Func = jest.fn();
		const action2Func = jest.fn();
		const comp = mount(
			<NodeCard
				data={{ name: 'node' }}
				actions={[
					{ name: 'action1', onClick: action1Func },
					{ name: 'action2', onClick: action2Func }
				]}
			/>
		);
		expect(comp).toMatchSnapshot();
		expect(comp).toContainMatchingElements(2, 'button');
		expect(comp.find(CardActions).find(Button).length).toBe(2);
		comp
			.find(CardActions)
			.find(Button)
			.at(0)
			.simulate('click');
		expect(action1Func).toBeCalledTimes(1);
		comp
			.find(CardActions)
			.find(Button)
			.at(1)
			.simulate('click');
		expect(action2Func).toBeCalledTimes(1);
	});

	test('If template is set, should show TemplateIcon', () => {
		const comp = mount(
			<NodeCard
				data={{
					name: 'node',
					template: { name: 'template', data: { mocked: 'data' } }
				}}
			/>
		);
		expect(comp.find(TemplateIcon)).toExist();
	});

	test('If template is not set, should show default node icon', () => {
		const comp = mount(<NodeCard data={{ name: 'node' }} />);
		expect(comp).toMatchSnapshot();
		expect(comp.find('svg.MuiSvgIcon-root')).toExist();
	});

	test('If template and onTemplateDataChange exists, should show TemplateControls', () => {
		const comp = mount(
			<NodeCard
				data={{
					name: 'node',
					template: { name: 'template', data: { mocked: 'data' } }
				}}
				onTemplateDataChange={() => {}}
			/>
		);
		expect(comp).toMatchSnapshot();
		expect(comp.find(TemplateControls)).toExist();
	});
});
