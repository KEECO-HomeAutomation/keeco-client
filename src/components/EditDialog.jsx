import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
	escapeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
});

export const EditDialog = ({
	open,
	title,
	description,
	fields,
	initialValues,
	onSubmit,
	onClose,
	classes
}) => {
	return (
		<Dialog open={open} arial-labelledby="edit-dialog-title">
			<DialogTitle id="edit-dialog-title">
				{title}
				<IconButton className={classes.escapeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				render={() => (
					<React.Fragment>
						<DialogContent>
							{description && (
								<DialogContentText>{description}</DialogContentText>
							)}
							<Form>
								{fields.map(field => (
									<Field
										key={field.name}
										name={field.name}
										render={field => (
											<TextField
												{...field}
												type={field.type || 'text'}
												placeholder={field.placeholder || ''}
												label={field.name}
												fullWidth
											/>
										)}
									/>
								))}
							</Form>
						</DialogContent>
						<DialogActions>
							<Button type="submit" color="primary">
								Save
							</Button>
							<Button onClick={onClose} color="primary">
								Cancel
							</Button>
						</DialogActions>
					</React.Fragment>
				)}
			/>
		</Dialog>
	);
};

EditDialog.propTypes = {
	open: PropTypes.bool,
	title: PropTypes.string,
	description: PropTypes.string,
	fields: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			type: PropTypes.string,
			placeholder: PropTypes.string
		})
	),
	initialValues: PropTypes.object,
	onSubmit: PropTypes.func,
	onClose: PropTypes.func,
	classes: PropTypes.object
};

export const enhancer = compose(withStyles(styles));

export default enhancer(EditDialog);
