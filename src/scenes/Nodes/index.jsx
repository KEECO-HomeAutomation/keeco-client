import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import NodeCard from '../../components/NodeCard';

const Nodes = () => {
	return (
		<div>
			<div style={{ width: '300px' }}>
				<NodeCard
					data={{
						id: 1,
						name: 'Node name',
						template: { id: 1, name: 'asdasd', data: { on: true } }
					}}
				/>
			</div>
			<div style={{ width: '300px' }}>
				<NodeCard data={{ id: 1, name: 'Node name' }} />
			</div>
		</div>
	);
};

export default Nodes;
