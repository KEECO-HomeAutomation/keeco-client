import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import TemplateIcon from './TemplateIcon';
import TemplateControls from './TemplateControls';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import DeviceHubIcon from '@material-ui/icons/DeviceHub';

const styles = theme => ({
	card: {
		width: '95%',
		margin: '15px'
	},
	titleBar: {
		padding: '15px',
		background: theme.palette.primary.main,
		display: 'flex'
	},
	title: {
		color: theme.palette.text.primary
	},
	secondaryTitle: {
		color: theme.palette.text.secondary
	},
	cardContent: {
		textAlign: 'center'
	},
	coverIcon: {
		height: '200px',
		width: '200px',
		objectFit: 'contain'
	}
});

export const NodeCard = ({ data, actions, onTemplateDataChange, classes }) => {
	return (
		<Card className={classes.card}>
			<div className={classes.titleBar}>
				<Typography variant="h6" className={classes.title}>
					{data.name}
				</Typography>
				{data.template && (
					<Typography variant="h6" className={classes.secondaryTitle}>
						&nbsp;-&nbsp;{data.template.name}
					</Typography>
				)}
			</div>
			<CardContent className={classes.cardContent}>
				{data.template ? (
					<TemplateIcon
						className={classes.coverIcon}
						template={data.template.name}
						templateData={data.template.data}
					/>
				) : (
					<DeviceHubIcon className={classes.coverIcon} />
				)}
				{data.template && onTemplateDataChange ? (
					<TemplateControls
						template={data.template.name}
						templateData={data.template.data}
						onTemplateDataChange={onTemplateDataChange}
					/>
				) : null}
			</CardContent>
			<CardActions>
				{actions &&
					actions.map(action => (
						<Button key={action.name} onClick={action.onClick} color="primary">
							{action.name}
						</Button>
					))}
			</CardActions>
		</Card>
	);
};

NodeCard.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.string,
		name: PropTypes.string,
		endpoints: PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
			output: PropTypes.bool,
			range: PropTypes.range,
			value: PropTypes.number
		}),
		template: PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
			data: PropTypes.object
		})
	}),
	actions: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			onClick: PropTypes.func
		})
	),
	onTemplateDataChange: PropTypes.func,
	classes: PropTypes.object
};

export const enhancer = compose(withStyles(styles));

export default enhancer(NodeCard);
