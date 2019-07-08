import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState, withHandlers, mapProps } from 'recompose';

import EditDialog from '../EditDialog';

export const withEditDialog = ({ dialogProps, Component, ...rest }) => {
	return (
		<React.Fragment>
			<Component {...rest} />
			{dialogProps.open && <EditDialog {...dialogProps} />}
		</React.Fragment>
	);
};

withEditDialog.propTypes = {
	dialogProps: PropTypes.object,
	Component: PropTypes.elementType
};

export const enhancer = compose(
	withState('open', 'setOpen', false),
	withState('onSubmit', 'setOnSubmit', null),
	withState('initialValues', 'setInitialValues', null),
	withHandlers({
		onClose: ({ setOpen, setOnSubmit, setInitialValues }) => () => {
			setOpen(false);
			setOnSubmit(null);
			setInitialValues(null);
		}
	}),
	mapProps(
		({
			open,
			title,
			description,
			fields,
			initialValues,
			onSubmit,
			onClose,
			dialogName,
			setOpen,
			setOnSubmit,
			setInitialValues,
			Component,
			...rest
		}) => ({
			dialogProps: {
				open,
				title,
				description,
				fields,
				initialValues,
				onSubmit: props => {
					onSubmit(props);
					onClose();
				},
				onClose
			},
			[dialogName + 'Open']: ({ onSubmit, initialValues }) => {
				setOnSubmit(() => onSubmit);
				setInitialValues(initialValues);
				setOpen(true);
			},
			Component,
			...rest
		})
	)
);

const Enhanced = enhancer(withEditDialog);

export default ({
	title,
	description,
	fields,
	dialogName
}) => Component => props => {
	return (
		<Enhanced
			{...props}
			title={title}
			description={description}
			fields={fields}
			dialogName={dialogName}
			Component={Component}
		/>
	);
};
