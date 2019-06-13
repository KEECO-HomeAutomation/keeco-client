import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Slider from '@material-ui/lab/Slider';

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
	slider: {
		marginTop: '24px',
		width: '95%'
	},
	thumb: {
		height: '18px',
		width: '18px',
		background: 'white',
		border: '2px solid black'
	},
	thumbR: {
		border: '2px solid red'
	},
	thumbG: {
		border: '2px solid green'
	},
	thumbB: {
		border: '2px solid blue'
	},
	track: {
		height: '6px',
		borderRadius: '1px'
	},
	trackR: {
		background: 'red'
	},
	trackG: {
		background: 'green'
	},
	trackB: {
		background: 'blue'
	},
	trackDim: {
		background: 'linear-gradient(to right, white, black)'
	}
});

export const SwitchControls = ({
	data,
	onOnChange,
	onRChange,
	onGChange,
	onBChange,
	onDimChange,
	classes
}) => {
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
			<Grid item className={classes.option}>
				<Typography variant="body1" className={classes.optionText}>
					R
				</Typography>
			</Grid>
			<Grid item className={classes.action}>
				<Slider
					min={0}
					max={255}
					onChange={onRChange}
					value={data.r || 0}
					className={classes.slider}
					classes={{
						thumb: classNames(classes.thumb, classes.thumbR),
						track: classNames(classes.track, classes.trackR)
					}}
				/>
			</Grid>
			<Grid item className={classes.option}>
				<Typography variant="body1" className={classes.optionText}>
					G
				</Typography>
			</Grid>
			<Grid item className={classes.action}>
				<Slider
					min={0}
					max={255}
					onChange={onGChange}
					value={data.g || 0}
					className={classes.slider}
					classes={{
						thumb: classNames(classes.thumb, classes.thumbG),
						track: classNames(classes.track, classes.trackG)
					}}
				/>
			</Grid>
			<Grid item className={classes.option}>
				<Typography variant="body1" className={classes.optionText}>
					B
				</Typography>
			</Grid>
			<Grid item className={classes.action}>
				<Slider
					min={0}
					max={255}
					onChange={onBChange}
					value={data.b || 0}
					className={classes.slider}
					classes={{
						thumb: classNames(classes.thumb, classes.thumbB),
						track: classNames(classes.track, classes.trackB)
					}}
				/>
			</Grid>
			<Grid item className={classes.option}>
				<Typography variant="body1" className={classes.optionText}>
					Dim
				</Typography>
			</Grid>
			<Grid item className={classes.action}>
				<Slider
					min={0}
					max={255}
					onChange={onDimChange}
					value={data.dim || 0}
					className={classes.slider}
					classes={{
						thumb: classNames(classes.thumb),
						track: classNames(classes.track, classes.trackDim)
					}}
				/>
			</Grid>
		</Grid>
	);
};

export const enhancer = compose(
	withStyles(styles),
	withHandlers({
		onOnChange: ({ onChange }) => (e, value) => onChange({ on: value[0]==='on' }),
		onRChange: ({ onChange }) => (e, value) => onChange({ r: Math.floor(value) }),
		onGChange: ({ onChange }) => (e, value) => onChange({ g: Math.floor(value) }),
		onBChange: ({ onChange }) => (e, value) => onChange({ b: Math.floor(value) }),
		onDimChange: ({ onChange }) => (e, value) => onChange({ dim: Math.floor(value) })
	})
);

export default enhancer(SwitchControls);
