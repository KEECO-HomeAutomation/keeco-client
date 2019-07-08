/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';

jest.mock('./SwitchControls', () => () => <p>SwitchControls</p>);
jest.mock('./LampControls', () => () => <p>LampControls</p>);
jest.mock('./ThermostatControls', () => () => <p>ThermostatControls</p>);

import TemplateControls, { TemplateControls as Base, enhancer } from './index';

import SwitchControls from './SwitchControls';
import LampControls from './LampControls';
import ThermostatControls from './ThermostatControls';

describe('<TemplateControls />', () => {
	test('Should export base and enhancer', () => {
		expect(Base).not.toBe(undefined);
		expect(enhancer).not.toBe(undefined);
	});

	test('Should render without errors', () => {
		const comp = mount(<TemplateControls />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(mount(<TemplateControls />)).toMatchSnapshot();
	});

	describe('Should render the needed control', () => {
		const testCases = [
			{ name: 'switch', Control: SwitchControls },
			{ name: 'lamp', Control: LampControls },
			{ name: 'thermostat', Control: ThermostatControls }
		];
		testCases.forEach(testCase => {
			test('template=' + testCase.name, () => {
				const comp = mount(<TemplateControls template={testCase.name} />);
				expect(comp).toMatchSnapshot();
				expect(comp).toContainReact(<testCase.Control />);
			});
		});
	});

	test('Should pass templateData and onTemplateDataChange to rendered controller', () => {
		const func = jest.fn();
		const comp = mount(
			<TemplateControls
				template="switch"
				templateData={{ mocked: 'data' }}
				onTemplateDataChange={func}
			/>
		);
		expect(comp.find(SwitchControls)).toHaveProp('data', { mocked: 'data' });
		expect(comp.find(SwitchControls)).toHaveProp('onChange', func);
	});
});
