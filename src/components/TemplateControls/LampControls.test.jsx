/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';

import LampControls, { LampControls as Base, enhancer } from './LampControls';

import ToggleButton from '@material-ui/lab/ToggleButton';
import Slider from '@material-ui/lab/Slider';

describe('<LampControls />', () => {
	test('Should export base and enhancer', () => {
		expect(Base).not.toBe(undefined);
		expect(enhancer).not.toBe(undefined);
	});

	test('Should render without error', () => {
		const comp = mount(
			<LampControls data={{ on: false, r: 0, g: 0, b: 0, dim: 0 }} />
		);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		const comp = mount(
			<LampControls data={{ on: false, r: 0, g: 0, b: 0, dim: 0 }} />
		);
		expect(comp).toMatchSnapshot();
	});

	test('Should not have errors even when r, g, b or dim is null, value should be 0', () => {
		const consoleError = jest.spyOn(global.console, 'error');
		const comp = mount(
			<LampControls
				data={{ on: false, r: null, g: null, b: null, dim: null }}
			/>
		);
		expect(consoleError).not.toBeCalled();
		expect(comp.find(Slider).at(0)).toHaveValue(0);
		expect(comp.find(Slider).at(1)).toHaveValue(0);
		expect(comp.find(Slider).at(2)).toHaveValue(0);
	});

	describe('Should respond to state', () => {
		test('Should render on state', () => {
			const comp = mount(
				<LampControls data={{ on: true, r: 0, g: 0, b: 0, dim: 0 }} />
			);
			expect(comp.find(ToggleButton).at(0)).toHaveProp('selected', false);
			expect(comp.find(ToggleButton).at(1)).toHaveProp('selected', true);
		});

		test('Should render off state', () => {
			const comp = mount(
				<LampControls data={{ on: false, r: 0, g: 0, b: 0, dim: 0 }} />
			);
			expect(comp.find(ToggleButton).at(0)).toHaveProp('selected', true);
			expect(comp.find(ToggleButton).at(1)).toHaveProp('selected', false);
		});

		test('Should show r value', () => {
			const comp = mount(
				<LampControls data={{ on: false, r: 170, g: 0, b: 0, dim: 0 }} />
			);
			expect(comp.find(Slider).at(0)).toHaveValue(170);
		});

		test('Should show g value', () => {
			const comp = mount(
				<LampControls data={{ on: false, r: 0, g: 18, b: 0, dim: 0 }} />
			);
			expect(comp.find(Slider).at(1)).toHaveValue(18);
		});

		test('Should show b value', () => {
			const comp = mount(
				<LampControls data={{ on: false, r: 0, g: 0, b: 290, dim: 0 }} />
			);
			expect(comp.find(Slider).at(2)).toHaveValue(290);
		});

		test('Should show dim value', () => {
			const comp = mount(
				<LampControls data={{ on: false, r: 0, g: 0, b: 0, dim: 90 }} />
			);
			expect(comp.find(Slider).at(3)).toHaveValue(90);
		});
	});

	describe('Handlers', () => {
		describe('toggle on/off', () => {
			test('off', () => {
				const onChange = jest.fn();
				const comp = mount(
					<LampControls
						data={{ on: true, r: 0, g: 0, b: 0, dim: 0 }}
						onChange={onChange}
					/>
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
					<LampControls
						data={{ on: false, r: 0, g: 0, b: 0, dim: 0 }}
						onChange={onChange}
					/>
				);
				comp
					.find(ToggleButton)
					.at(1)
					.simulate('click');
				expect(onChange).toBeCalledTimes(1);
				expect(onChange).toBeCalledWith({ on: true });
			});
		});

		test('r slider', () => {
			const onChange = jest.fn();
			const comp = mount(
				<LampControls
					data={{ on: false, r: 0, g: 0, b: 0, dim: 0 }}
					onChange={onChange}
				/>
			);
			comp
				.find(Slider)
				.at(0)
				.prop('onChange')(null, 200);
			expect(onChange).toBeCalledTimes(1);
			expect(onChange).toBeCalledWith({ r: 200 });
		});

		test('g slider', () => {
			const onChange = jest.fn();
			const comp = mount(
				<LampControls
					data={{ on: false, r: 0, g: 0, b: 0, dim: 0 }}
					onChange={onChange}
				/>
			);
			comp
				.find(Slider)
				.at(1)
				.prop('onChange')(null, 200);
			expect(onChange).toBeCalledTimes(1);
			expect(onChange).toBeCalledWith({ g: 200 });
		});

		test('b slider', () => {
			const onChange = jest.fn();
			const comp = mount(
				<LampControls
					data={{ on: false, r: 0, g: 0, b: 0, dim: 0 }}
					onChange={onChange}
				/>
			);
			comp
				.find(Slider)
				.at(2)
				.prop('onChange')(null, 200);
			expect(onChange).toBeCalledTimes(1);
			expect(onChange).toBeCalledWith({ b: 200 });
		});

		test('dim slider', () => {
			const onChange = jest.fn();
			const comp = mount(
				<LampControls
					data={{ on: false, r: 0, g: 0, b: 0, dim: 0 }}
					onChange={onChange}
				/>
			);
			comp
				.find(Slider)
				.at(3)
				.prop('onChange')(null, 200);
			expect(onChange).toBeCalledTimes(1);
			expect(onChange).toBeCalledWith({ dim: 200 });
		});
	});
});
