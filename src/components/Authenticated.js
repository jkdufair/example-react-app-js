import React, { Component } from 'react'
import { actions as netActions } from 'studiokit-net-js'
import { actions as authActions } from 'studiokit-auth-js'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card'
import { action } from '../index'

import './shared.css'

const spacedCard = {
	margin: '1rem 0'
}

const paperStyle = {
	width: '95%',
	maxWidth: '95%',
	height: '90%',
	paddingLeft: '1rem',
  textAlign: 'left',
  display: 'inline-block'
}

class Authenticated extends Component {
	constructor(props) {
		super(props)
		this.state = {
			localUsername: '',
			localPassword: '',
			headlessCasUsername: '',
			headlessCasPassword: ''
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
		const { isAuthenticated, userInfo } = this.props
		const { localUsername, localPassword, headlessCasUsername, headlessCasPassword } = this.state
		return (
			<div className='flex-container'>
				<div id='left-panel'>
					{isAuthenticated ?
						<FlatButton
							onClick={() => action(authActions.LOG_OUT_REQUESTED)}
							label='Log Out'
							primary={true} />
						:
						<div>
							<Card style={spacedCard}>
								<CardHeader title='Standard CAS Login' />
								<CardActions>
									<FlatButton
										onClick={() => window.location = 'https://www.purdue.edu/apps/account/cas/login?service=http%3A%2F%2Flocalhost:3000'}
										label='Log In'
										primary={true} />
								</CardActions>
							</Card>
							{/*<button onClick={() => action(authActions.SHIB_LOGIN_REQUESTED)}>Shibboleth Login</button>
							<button onClick={() => action(authActions.FACEBOOK_LOGIN_REQUESTED)}>Facebook Login</button>*/}
							<Card style={spacedCard}>
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
									<FlatButton
										onClick={() => action(authActions.HEADLESS_CAS_LOGIN_REQUESTED, { payload: {
											'Username': headlessCasUsername,
											'Password': headlessCasPassword
										}})}
										label='Log In'
										primary={true} />
								</CardActions>
							</Card>
							<Card>
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
									<FlatButton
										onClick={() => action(authActions.LOCAL_LOGIN_REQUESTED, { payload: {
											'Username': localUsername,
											'Password': localPassword
										}})}
										label='Local Login'
										primary={true} />
									</CardActions>
							</Card>
						</div>}					
				</div>
				<div id='right-panel'>
					{isAuthenticated &&
					<div>
						<FlatButton
							onClick={() => action(netActions.DATA_REQUESTED, { modelName: 'user.userInfo'})}
							label='Fetch User Info'
							primary={true} />
						<Paper style={paperStyle} zDepth={3}>
							<div className='jsonData'>
								<pre>
									{JSON.stringify(userInfo, null, 2)}
								</pre>
							</div>
						</Paper>
					</div>}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		userInfo: state.models.user !== undefined ? state.models.user.userInfo : undefined,
	};
};

export default connect(mapStateToProps)(Authenticated);
