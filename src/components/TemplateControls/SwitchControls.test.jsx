/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';

import SwitchControls, {
	SwitchControls as Base,
	enhancer
} from './SwitchControls';

import ToggleButton from '@material-ui/lab/ToggleButton';

describe('<SwitchControls />', () => {
	test('Should export base and enhancer', () => {
		expect(Base).not.toBe(undefined);
		expect(enhancer).not.toBe(undefined);
	});

	test('Should render without errors', () => {
		const comp = mount(<SwitchControls data={{ on: true }} />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(mount(<SwitchControls data={{ on: true }} />)).toMatchSnapshot();
	});

	describe('Should respond to state', () => {
		test('Should render on state', () => {
			const comp = mount(<SwitchControls data={{ on: true }} />);
			expect(comp.find(ToggleButton).at(0)).toHaveProp('selected', false);
			expect(comp.find(ToggleButton).at(1)).toHaveProp('selected', true);
		});

		test('Should render off state', () => {
			const comp = mount(<SwitchControls data={{ on: false }} />);
			expect(comp.find(ToggleButton).at(0)).toHaveProp('selected', true);
			expect(comp.find(ToggleButton).at(1)).toHaveProp('selected', false);
		});
	});

	describe('Handlers', () => {
		describe('toggle on/off', () => {
			test('off', () => {
				const onChange = jest.fn();
				const comp = mount(
					<SwitchControls data={{ on: true }} onChange={onChange} />
				);
				comp
					.find(ToggleButton)
					.at(0)
					.simulate('click');
				expect(onChange).toBeCalledTimes(1);
				expect(onChange).toBeCalledWith({ on: false });
			});

			test('on', () => {
				const onChange = jest.fn();
				const comp = mount(
					<SwitchControls data={{ on: false }} onChange={onChange} />
				);
				comp
					.find(ToggleButton)
					.at(1)
					.simulate('click');
				expect(onChange).toBeCalledTimes(1);
				expect(onChange).toBeCalledWith({ on: true });
			});
		});
	});
});
