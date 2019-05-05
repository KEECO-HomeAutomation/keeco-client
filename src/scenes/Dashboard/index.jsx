import React from 'react';
import PropTypes from 'prop-types';
import { compose, branch, renderComponent, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';

import NODES_QUERY from './data/nodesQuery.graphql';
import NODE_SUBSCRIPTION from './data/nodeSubscription.graphql';

const Dashboard = ({ loading, nodes }) => {
	return (
		<div>
			<h1>Keeco dashboard</h1>
			<p>You are logged in. Check the node list. :D</p>
			{loading || !nodes ? (
				<p>Loading...</p>
			) : (
				<div>
					{nodes.map(node => (
						<p key={node.id}>{JSON.stringify(node)}</p>
					))}
				</div>
			)}
		</div>
	);
};

Dashboard.propTypes = {
	loading: PropTypes.bool,
	nodes: PropTypes.array
};

export default compose(
	connect(state => ({
		isServerPath: state.app.server.path !== null,
		isAuthToken: state.app.login.token !== null
	})),
	branch(
		({ isServerPath }) => !isServerPath,
		renderComponent(() => <Redirect to="/setServer" />)
	),
	branch(
		({ isAuthToken }) => !isAuthToken,
		renderComponent(() => <Redirect to="/login" />)
	),
	graphql(NODES_QUERY, {
		props: ({ data: { loading, nodes, subscribeToMore } }) => ({
			loading,
			nodes,
			subscribe: () =>
				subscribeToMore({
					document: NODE_SUBSCRIPTION,
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
						//UPDATED handled automatically
						if (mutation === 'DELETED') {
							return {
								...prev,
								nodes: prev.nodes.filter(p => p.id !== node.id)
							};
						}

						return prev;
					}
				})
		})
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
)(Dashboard);
