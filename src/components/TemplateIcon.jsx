import React from 'react';
import PropTypes from 'prop-types';
import { compose, mapProps } from 'recompose';

import DeviceHubIcon from '@material-ui/icons/DeviceHub';

export const TemplateIcon = ({ Icon, ...rest }) => {
	return (
		<Icon {...rest} />
	);
};

export const enhancer = compose(
	mapProps(({ template, templateData, ...rest }) => {
		let icon;
		switch (template) {
			case 'switch':
				icon = DeviceHubIcon;
				break;
			case 'lamp':
				icon = DeviceHubIcon;
				break;
			case 'thermometer':
				icon = DeviceHubIcon;
				break;
			default:
				icon = DeviceHubIcon;
				break;
		}
		return {
			Icon: icon,
			...rest
		};
	})
);

export default enhancer(TemplateIcon);
