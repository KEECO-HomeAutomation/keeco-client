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

import NodesQuery from '../../data/queries/NodesQuery.graphql';
import UpdateTemplateDataMutation from '../../data/queries/UpdateTemplateDataMutation.graphql';
import NodeSubscription from '../../data/queries/NodeSubscription.graphql';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CircularProgress from '@material-ui/core/CircularProgress';

import NodeCard from '../../components/NodeCard';

const styles = theme => ({
	centeredProgress: {
		margin: 'auto',
		marginTop: theme.spacing(5)
	}
});

export const Nodes = ({ nodes, onTemplateDataChange }) => {
	return (
		<GridList cellHeight="auto" cols={4} spacing={5}>
			{nodes.map(node =>
				node.templates.map(template => (
					<GridListTile>
						<NodeCard
							key={template.id}
							data={{ id: node.id, name: node.name, template: template }}
							onTemplateDataChange={data =>
								onTemplateDataChange(template, data)
							}
						/>
					</GridListTile>
				))
			)}
		</GridList>
	);
};

export const enhancer = compose(
	withStyles(styles),
	graphql(NodesQuery, {
		props: ({ data: { nodes, loading, subscribeToMore } }) => ({
			nodes,
			loading,
			subscribe: () => {
				subscribeToMore({
					document: NodeSubscription,
					updateQuery: (prev, { subscriptionData }) => {
						if (!subscriptionData.data) {
							return prev;
						}

						const { mutation, node } = subscriptionData;

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
				});
			}
		})
	}),
	branch(
		({ loading }) => loading,
		renderComponent(({ classes }) => (
			<CircularProgress className={classes.centeredProgress} />
		))
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
