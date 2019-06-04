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
						template: { id: 1, name: 'switch', data: { on: true } }
					}}
					onTemplateDataChange={(e) => console.log(e)}
				/>
			</div>
			<div style={{ width: '300px' }}>
				<NodeCard
					data={{
						id: 1,
						name: 'Node 2',
						template: { id: 1, name: 'lamp', data: { on: false, r: 100, g: 170, b: 255, dim: 80 } }
					}}
					onTemplateDataChange={(e) => console.log(e)}
				/>
			</div>
			<div style={{ width: '300px' }}>
				<NodeCard
					data={{
						id: 1,
						name: 'Node name',
						template: { id: 1, name: 'thermostat', data: { temperature: 26.9 } }
					}}
					onTemplateDataChange={(e) => console.log(e)}
				/>
			</div>
			<div style={{ width: '300px' }}>
				<NodeCard data={{ id: 1, name: 'Node name' }} actions={[{name: 'asd', onClick: () => console.log('asd')}, {name: 'dsa', onClick: () => console.log('dsa')}]} />
			</div>
		</div>
	);
};

export default Nodes;
