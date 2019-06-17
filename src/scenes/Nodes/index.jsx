import React from 'react';
import PropTypes from 'prop-types';
import {
	compose,
	withHandlers,
	branch,
	renderComponent,
	lifecycle
} from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';

import NodesQuery from '../../data/queries/NodesQuery.graphql';
import UpdateTemplateDataMutation from '../../data/queries/UpdateTemplateDataMutation.graphql';
import NodeSubscription from '../../data/queries/NodeSubscription.graphql';
import { setViewMode } from './data/duck';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';

import NodeCard from '../../components/NodeCard';

const styles = theme => ({
	container: {
		justifyContent: 'flex-start'
	},
	centeredProgress: {
		margin: 'auto',
		marginTop: theme.spacing(5)
	},
	card: {
		width: '400px'
	},
	viewOptions: {
		display: 'flex',
		justifyContent: 'flex-end'
	}
});

export const Nodes = ({
	viewMode,
	nodes,
	onTemplateDataChange,
	onViewModeChange,
	classes
}) => {
	return (
		<div>
			<div className={classes.viewOptions}>
				<ToggleButtonGroup
					value={['node', 'template']}
					onChange={onViewModeChange}
				>
					<ToggleButton value={'template'} selected={viewMode === 'node'}>
						Node
					</ToggleButton>
					<ToggleButton value={'node'} selected={viewMode === 'template'}>
						Template
					</ToggleButton>
				</ToggleButtonGroup>
			</div>
			<Grid container className={classes.container}>
				{nodes.map(node =>
					viewMode === 'template' ? (
						node.templates.map(template => (
							<Grid key={template.id} item className={classes.card}>
								<NodeCard
									data={{ id: node.id, name: node.name, template: template }}
									onTemplateDataChange={data =>
										onTemplateDataChange(template, data)
									}
								/>
							</Grid>
						))
					) : (
						<Grid key={node.id} item className={classes.card}>
							<NodeCard data={node} />
						</Grid>
					)
				)}
			</Grid>
		</div>
	);
};

Nodes.propTypes = {
	viewMode: PropTypes.string,
	nodes: PropTypes.array,
	onTemplateDataChange: PropTypes.func,
	onViewModeChange: PropTypes.func,
	classes: PropTypes.object
};

export const enhancer = compose(
	withStyles(styles),
	graphql(NodesQuery, {
		props: ({ data: { nodes, loading, subscribeToMore } }) => ({
			nodes,
			loading,
			subscribe: () =>
				subscribeToMore({
					document: NodeSubscription,
					updateQuery: (prev, { subscriptionData }) => {
						if (!subscriptionData.data) {
							return prev;
						}

						const { mutation, node } = subscriptionData.data.nodeSubscription;

						if (mutation === 'CREATED') {
							return {
								...prev,
								nodes: [...prev.nodes, node]
							};
						}
						// UPDATED handled automatically
						if (mutation === 'DELETED') {
							return {
								...prev,
								nodes: prev.nodes.filter(p => p.id !== node.id)
							};
						}
					}
				})
		})
	}),
	branch(
		({ loading }) => loading,
		renderComponent(({ classes }) => (
			<CircularProgress className={classes.centeredProgress} />
		))
	),
	connect(
		state => ({
			viewMode: state.nodes.viewMode
		}),
		dispatch => ({
			setViewMode: viewMode => dispatch(setViewMode(viewMode))
		})
	),
	graphql(UpdateTemplateDataMutation, {
		props: ({ mutate }) => ({
			updateTemplateData: mutate
		}),
		options: {
			update: (cache, { data: { updateTemplateData: newTemplate } }) => {
				const data = cache.readQuery({ query: NodesQuery });
				data.nodes.forEach(node => {
					node.templates = node.templates.map(template => {
						if (template.id === newTemplate.id) {
							return {
								...template,
								...newTemplate,
								data: {
									...template.data,
									...newTemplate.data
								}
							};
						} else {
							return template;
						}
					});
				});
			}
		}
	}),
	withHandlers({
		onTemplateDataChange: ({ updateTemplateData }) => (template, data) => {
			updateTemplateData({
				variables: {
					id: template.id,
					input: data
				},
				optimisticResponse: {
					updateTemplateData: {
						...template,
						data: {
							...template.data,
							...data
						}
					}
				}
			});
		},
		onViewModeChange: ({ setViewMode }) => (e, viewMode) => {
			setViewMode(viewMode[0]);
		}
	}),
	lifecycle({
		componentDidMount() {
			if (!this.cancelSubscription) {
				this.cancelSubscription = this.props.subscribe();
			}
		},
		componentWillUnmount() {
			if (this.cancelSubscription) {
				this.cancelSubscription();
			}
		}
	})
);

export default enhancer(Nodes);
