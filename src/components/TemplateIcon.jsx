import React from 'react';
import PropTypes from 'prop-types';
import { compose, mapProps } from 'recompose';

import DeviceHubIcon from '@material-ui/icons/DeviceHub';

export const TemplateIcon = ({ Icon, ...rest }) => {
	return <Icon {...rest} />;
};

TemplateIcon.propTypes = {
	Icon: PropTypes.elementType
};

export const enhancer = compose(
	mapProps(({ template, templateData, ...rest }) => {
		let icon;
		switch (template) {
			case 'switch':
				if (templateData.on) {
					icon = DeviceHubIcon;
				} else {
					icon = DeviceHubIcon;
				}
				break;
			case 'lamp':
				icon = DeviceHubIcon;
				break;
			case 'thermostat':
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
