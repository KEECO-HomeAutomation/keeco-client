import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';

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
	}
});

export const SwitchControls = ({ data, onOnChange, classes }) => {
	return (
		<Grid container className={classes.grid}>
			<Grid item className={classes.option}>
				<Typography variant="body1" className={classes.optionText}>
					On
				</Typography>
			</Grid>
			<Grid item className={classes.action}>
				<ToggleButtonGroup value={['on', 'off']} onChange={onOnChange}>
					<ToggleButton value={'on'} selected={!data.on}>Off</ToggleButton>
					<ToggleButton value={'off'} selected={data.on}>On</ToggleButton>
				</ToggleButtonGroup>
			</Grid>
		</Grid>
	);
};

SwitchControls.propTypes = {
	data: PropTypes.object,
	onChange: PropTypes.func
};

export const enhancer = compose(
	withStyles(styles),
	withHandlers({
		onOnChange: ({ onChange }) => (e, value) => onChange({ on: value[0]==='on' })
	})
);

export default enhancer(SwitchControls);
