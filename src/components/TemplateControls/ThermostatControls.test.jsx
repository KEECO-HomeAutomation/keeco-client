/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';

import ThermostatControls, {
	ThermostatControls as Base,
	enhancer
} from './ThermostatControls';

import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

describe('<ThermostatControls />', () => {
	test('Should export base and enhancer', () => {
		expect(Base).not.toBe(undefined);
		expect(enhancer).not.toBe(undefined);
	});

	test('Should render without errors', () => {
		const comp = mount(<ThermostatControls data={{ temperature: 20 }} />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		const comp = mount(<ThermostatControls data={{ temperature: 20 }} />);
		expect(comp).toMatchSnapshot();
	});

	test('Temp bar should not overflow, even when temp over 60', () => {
		const comp = mount(<ThermostatControls data={{ temperature: 100 }} />);
		expect(comp.find(LinearProgress)).toHaveValue(100);
		expect(comp.find(Typography).at(1)).toHaveText('100\u00A0\u2103'); // 100<nbsp><degrees celsius>
	});

	test('When temperature is 0 should show it', () => {
		const comp = mount(<ThermostatControls data={{ temperature: 0 }} />);
		expect(comp.find(Typography).at(1)).toHaveText('0\u00A0\u2103'); // 0<nbsp><degrees celsius>
	});

	test('When temperature is null should show a hyphen instead', () => {
		const comp = mount(<ThermostatControls data={{ temperature: null }} />);
		expect(comp.find(LinearProgress)).toHaveValue(0);
		expect(comp.find(Typography).at(1)).toHaveText('-\u00A0\u2103'); // -<nbsp><degrees celsius>
	});

	describe('Should react to state', () => {
		test('Should show temperature', () => {
			const comp = mount(<ThermostatControls data={{ temperature: 15 }} />);
			expect(comp.find(LinearProgress)).toHaveValue(55);
			expect(comp.find(Typography).at(1)).toHaveText('15\u00A0\u2103'); // 15<nbsp><degrees celsius>
		});
	});
});
