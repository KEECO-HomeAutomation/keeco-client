/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';

jest.mock('@material-ui/icons/DeviceHub', () => () => <p>DeviceHubIcon</p>);

import TemplateIcon, { TemplateIcon as Base, enhancer } from './TemplateIcon';

import DeviceHubIcon from '@material-ui/icons/DeviceHub';

describe('<TemplateIcon />', () => {
	test('Should export base and enhancer', () => {
		expect(Base).not.toBe(undefined);
		expect(enhancer).not.toBe(undefined);
	});

	test('Should render without errors', () => {
		const comp = mount(<TemplateIcon />);
		expect(comp.length).toBe(1);
	});

	test('Should match snapshot', () => {
		expect(mount(<TemplateIcon />)).toMatchSnapshot();
	});

	describe('Should render the matching icon', () => {
		const testCases = [
			{ name: 'switch', Comp: DeviceHubIcon },
			{ name: 'lamp', Comp: DeviceHubIcon },
			{ name: 'thermostat', Comp: DeviceHubIcon }
		];
		testCases.forEach(testCase => {
			test(
				'When template=' + testCase.name + ' should render the matching icon',
				() => {
					const comp = mount(
						<TemplateIcon template={testCase.name} templateData={{}} />
					);
					expect(comp).toMatchSnapshot();
					expect(comp).toContainReact(<testCase.Comp />);
				}
			);
		});
	});

	test('When passed a non handled template should render the standard icon', () => {
		const comp = mount(
			<TemplateIcon template={'notExistingTemplateName'} templateData={{}} />
		);
		expect(comp).toMatchSnapshot();
		expect(comp).toContainReact(<DeviceHubIcon />);
	});

	describe('Handle templateData', () => {
		describe('template=switch', () => {
			test('on=true', () => {
				const comp = mount(
					<TemplateIcon template="switch" templateData={{ on: true }} />
				);
				expect(comp).toMatchSnapshot();
			});
			test('on=false', () => {
				const comp = mount(
					<TemplateIcon template="switch" templateData={{ on: false }} />
				);
				expect(comp).toMatchSnapshot();
			});
		});
	});
});
