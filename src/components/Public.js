import React, { Component } from 'react'
import { actions as netActions } from 'studiokit-net-js'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import { action } from '../index'

import './shared.css'
import { paperStyle } from './muiSharedStyles'

class Public extends Component {
	constructor(props) {
		super(props)
		this.state = {
			recurring: false
		}
	}
	render () {
		const { publicData } = this.props
		const { recurring } = this.state
		return (
			<div id='main-container'>
				<div id='action-panel'>
					<FlatButton
						onClick={() => action(netActions.DATA_REQUESTED, { modelName: 'publicData' })}
						label='Fetch Public'
						primary={true}
						fullWidth={true} />
					<FlatButton
						onClick={() => action(netActions.DATA_REQUESTED, { modelName: 'publicData', timeLimit: 10 })}
						label='Fetch (10ms time limit)'
						primary={true}
						fullWidth={true} />
					<FlatButton
						onClick={() => action(netActions.DATA_REQUESTED, { modelName: 'publicData', queryParams: { baz: 'quux' } })}
						label='Fetch with Query Param'
						primary={true}
						fullWidth={true} />
					<FlatButton
						onClick={() => action(netActions.DATA_REQUESTED, { modelName: 'publicData', queryParams: { foo: 'wawa' } })}
						label='Fetch with Param Merged'
						primary={true}
						fullWidth={true} />
					{!recurring ?
						<FlatButton
							onClick={() => {
								action(netActions.PERIODIC_DATA_REQUESTED, {	modelName: 'publicData',	taskId: 'abc', period: 500 })
								this.setState({recurring: true})
							}}
							label='Fetch Recurring (500ms)'
							primary={true}
							fullWidth={true} />
						:
						<FlatButton
							onClick={() => {
								action(netActions.PERIODIC_TERMINATION_REQUESTED, { taskId: 'abc' })
								this.setState({recurring: false})
							}}
							label='Cancel Recurring'
							secondary={true}
							fullWidth={true} />
					}
					<FlatButton
						onClick={() => {
							for (var i = 0; i < 100; i++) {
								action(netActions.DATA_REQUESTED_USE_LATEST, { modelName: 'publicData', timeLimit: 10000 })
							}
						}}
						label='Fetch Storm! (Use Latest)'
						primary={true}
						fullWidth={true} />
					</div>
				<div id='results-panel'>
					<Paper style={paperStyle} zDepth={3}>
						<div className='json-data'>
							<pre>
								{JSON.stringify(publicData, null, 2)}
							</pre>
						</div>
					</Paper>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		publicData: state.models.publicData
	};
};

export default connect(mapStateToProps)(Public);
