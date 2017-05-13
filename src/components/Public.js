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
			<div className='flex-container'>
				<div id='left-panel'>
					<div className='flex-vertical'>
						<FlatButton
							onClick={() => action(netActions.DATA_REQUESTED, { modelName: 'publicData' })}
							label='Fetch'
							primary={true} />
						<FlatButton
							onClick={() => action(netActions.DATA_REQUESTED, { modelName: 'publicData', timeLimit: 10 })}
							label='Fetch (10ms time limit)'
							primary={true} />
						<FlatButton
							onClick={() => action(netActions.DATA_REQUESTED, { modelName: 'publicData', queryParams: { baz: 'quux' } })}
							label='Fetch with Query Param'
							primary={true} />
						<FlatButton
							onClick={() => action(netActions.DATA_REQUESTED, { modelName: 'publicData', queryParams: { foo: 'wawa' } })}
							label='Fetch with Query Param Merged'
							primary={true} />
						{!recurring ?
							<FlatButton
								onClick={() => {
									action(netActions.PERIODIC_DATA_REQUESTED, {	modelName: 'publicData',	taskId: 'abc', period: 500 })
									this.setState({recurring: true})
								}}
								label='Fetch Recurring (500ms)'
								primary={true} />
							:
							<FlatButton
								onClick={() => {
									action(netActions.PERIODIC_TERMINATION_REQUESTED, { taskId: 'abc' })
									this.setState({recurring: false})
								}}
								label='Cancel Recurring'
								secondary={true} />
						}
						<FlatButton
							onClick={() => {
								for (var i = 0; i < 100; i++) {
									action(netActions.DATA_REQUESTED_USE_LATEST, { modelName: 'publicData', timeLimit: 10000 })
								}
							}}
							label='Fetch Storm! (Use Latest)'
							primary={true} />
						</div>
					</div>
				<div id='right-panel'>
					<Paper style={paperStyle} zDepth={3}>
						<div className='jsonData'>
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
