import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
	grid: {
		justifyContent: 'space-around'
	},
	option: {
		width: '20%'
	},
	optionText: {
		letterSpacing: '1px',
		color: theme.palette.text.secondary,
		marginTop: '12px'
	},
	action: {
		width: '80%'
	},
	actionText: {
		letterSpacing: '2px',
		fontSize: '1.2em'
	},
	tempBar: {
		width: '95%',
		marginLeft: '5px'
	},
	tempBarBack: {
		background:
			'linear-gradient(to right, rgba(95, 145, 226, 0.3) 0%, rgba(114, 186, 76, 0.3) 45%, rgba(114, 186, 76, 0.3) 55%, rgba(201, 145, 40, 0.3) 70%, rgba(183, 55, 44, 0.3) 100%)'
	}
});

export const SwitchControls = ({ data, processedTemp, classes }) => {
	return (
		<Grid container className={classes.grid}>
			<Grid item className={classes.option}>
				<Typography variant="body1" className={classes.optionText}>
					Temp
				</Typography>
			</Grid>
			<Grid item className={classes.action}>
				<Typography variant="body1" className={classes.actionText}>
					{data.temperature || '-'}&nbsp;&#8451;
				</Typography>
				<LinearProgress
					variant="determinate"
					value={processedTemp}
					className={classes.tempBar}
					classes={{ colorPrimary: classes.tempBarBack }}
				/>
			</Grid>
		</Grid>
	);
};

SwitchControls.propTypes = {
	data: PropTypes.object,
	onChange: PropTypes.func,
	processedTemp: PropTypes.number,
	classes: PropTypes.object
};

export const enhancer = compose(
	withStyles(styles),
	withProps(({ data }) => ({
		processedTemp: data.temperature + 30
	}))
);

export default enhancer(SwitchControls);
