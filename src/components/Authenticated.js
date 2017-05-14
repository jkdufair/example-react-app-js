import React, { Component } from 'react'
import { actions as netActions } from 'studiokit-net-js'
import { actions as authActions } from 'studiokit-auth-js'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import Snackbar from 'material-ui/Snackbar'
import CircularProgress from 'material-ui/CircularProgress'
import { action } from '../index'

import './shared.css'
import { paperStyle, padCircularProgress } from './muiSharedStyles'

const spacedCard = {
	margin: '1rem 0'
}

const leftCard = {
	width: '18rem',
	marginLeft: '1rem'
}

class Authenticated extends Component {
	constructor(props) {
		super(props)
		this.state = {
			localUsername: '',
			localPassword: '',
			headlessCasUsername: '',
			headlessCasPassword: '',
			whichLoginButtonClicked: undefined
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.setState({whichLoginButtonClicked: undefined})
		}
	}

	handleInputChange(event) {
  	const target = event.target;
    const value = target.value;
    const name = target.name;

		this.setState({
			[name]: value
		})
	}
	
	render () {
		const { auth, userInfo } = this.props
		const { localUsername, localPassword, headlessCasUsername, headlessCasPassword, whichLoginButtonClicked } = this.state
		return (
			<div>
				<div id='main-container'>
					<div id='action-panel'>
						{auth.isAuthenticated &&
							<FlatButton
								onClick={() => action(netActions.DATA_REQUESTED, { modelName: 'user.userInfo'})}
								label='Fetch User Info'
								primary={true}
								fullWidth={true} />}
						{auth.isAuthenticated ?
							<FlatButton
								onClick={() => action(authActions.LOG_OUT_REQUESTED)}
								label='Log Out'
								primary={true}
								fullWidth={true} />
							:
							<div>
								<Card style={{...spacedCard, ...leftCard}}>
									<CardHeader title='Standard CAS Login' />
									<CardActions>
										<FlatButton
											onClick={() => window.location = 'https://www.purdue.edu/apps/account/cas/login?service=http%3A%2F%2Flocalhost:3000'}
											label='Log In'
											primary={true}
											disabled={auth.isAuthenticating}
											/>
									</CardActions>
								</Card>
								<Card style={{...spacedCard, ...leftCard}}>
									<CardHeader title='"Headless" CAS Login' />
									<CardText>
										<TextField
											name='headlessCasUsername' 
											hintText='CAS username'
											value={headlessCasUsername}
											onChange={e => this.handleInputChange(e)} />
										<TextField
											name='headlessCasPassword'
											type='password'
											hintText='CAS password'
											value={headlessCasPassword}
											onChange={e => this.handleInputChange(e)} />
									</CardText>
									<CardActions>
										{auth.isAuthenticating && whichLoginButtonClicked === 'cas' ?
											<CircularProgress size={30} style={padCircularProgress} />
										:
											<FlatButton
												onClick={() => {
													action(authActions.HEADLESS_CAS_LOGIN_REQUESTED, { payload: {
														'Username': headlessCasUsername,
														'Password': headlessCasPassword
													}})
													this.setState({whichLoginButtonClicked: 'cas'})
												}}
												label='Log In'
												primary={true}
												disabled={auth.isAuthenticating}
											/>
										}
									</CardActions>
								</Card>
								<Card style={leftCard}>
									<CardHeader title='Local Login' />
									<CardText>
										<TextField
											name='localUsername'
											hintText='local username'
											value={localUsername}
											onChange={e => this.handleInputChange(e)} />
										<TextField
											type='password'
											name='localPassword'
											hintText='local password'
											value={localPassword} onChange={e => this.handleInputChange(e)} />
									</CardText>
									<CardActions>
										{auth.isAuthenticating && whichLoginButtonClicked === 'local' ?
											<CircularProgress size={30} style={padCircularProgress} />									
										:
											<FlatButton
												onClick={() => {
													action(authActions.LOCAL_LOGIN_REQUESTED, { payload: {
														'Username': localUsername,
														'Password': localPassword
													}})
													this.setState({whichLoginButtonClicked: 'local'})
												}}
												label='Local Login'
												primary={true}
												disabled={auth.isAuthenticating}
											/>
										}
										</CardActions>
								</Card>
							</div>}					
					</div>
					<div id='results-panel'>
						{auth.isAuthenticated &&
							<Paper style={paperStyle} zDepth={3}>
								<div className='json-data'>
									<pre>
										{JSON.stringify(userInfo, null, 2)}
									</pre>
								</div>
							</Paper>}
					</div>
				</div>
				<Snackbar
					open={auth && auth.didFail}
					message="There was a problem logging in. Please try again."
					autoHideDuration={4000} />
			</div>

		)
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		userInfo: state.models.user !== undefined ? state.models.user.userInfo : undefined,
	};
};

export default connect(mapStateToProps)(Authenticated);
