// TODO: flow
import React, { Component } from 'react';
import './App.css';
import { action } from './index'
import { connect } from 'react-redux'
import { actions as netActions } from 'studiokit-net-js'
import { actions as authActions } from 'studiokit-auth-js'

class App extends Component {
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

  render() {
	const { isAuthenticated, publicData, userInfo } = this.props
	const { localUsername, localPassword, headlessCasUsername, headlessCasPassword } = this.state
		return (
      <div className="App">
				IsAuthenticated: { isAuthenticated === true ? 'true' : 'false' }
				<br />
				<button onClick={() => action(netActions.DATA_REQUESTED, { modelName: 'publicData' })}>Fetch Public Data</button>
				<button onClick={() => action(netActions.DATA_REQUESTED, { modelName: 'publicData', timeLimit: 10 })}>
					Fetch Public Data (10ms time limit)
				</button>
				<button onClick={() => action(netActions.DATA_REQUESTED, { modelName: 'publicData', queryParams: { baz: 'quux' } })}>Fetch Public with Query Param Passed</button>
				<button onClick={() => action(netActions.DATA_REQUESTED, { modelName: 'publicData', queryParams: { foo: 'wawa' } })}>Fetch Public with Query Param Merged</button>				
				<br />
				<button onClick={() => action(netActions.PERIODIC_DATA_REQUESTED, {	modelName: 'publicData',	taskId: 'abc', period: 500 })}>Fetch Public Data Recurring (500ms)</button>
				<button onClick={() => action(netActions.PERIODIC_TERMINATION_REQUESTED, { taskId: 'abc' })}>Cancel Recurring Fetch</button>
				<button onClick={() => {
						for (var i = 0; i < 100; i++) {
							action(netActions.DATA_REQUESTED_USE_LATEST, { modelName: 'publicData' })
						}
					}}>Fetch Public Data Latest</button>
				<div>
					<div className='jsonData'>
						<h1>Public Data</h1>
						<pre>
							{JSON.stringify(publicData, null, 2)}
						</pre>
					</div>
				</div>
				<hr />
				{isAuthenticated ?
					<button onClick={() => action(authActions.LOG_OUT_REQUESTED)}>Log Out</button> :
					<div>
						<div>
							<button onClick={() => window.location = 'https://www.purdue.edu/apps/account/cas/login?service=http%3A%2F%2Flocalhost:3000'}>CAS Login</button>
							<button onClick={() => action(authActions.SHIB_LOGIN_REQUESTED)}>Shibboleth Login</button>
							<button onClick={() => action(authActions.FACEBOOK_LOGIN_REQUESTED)}>Facebook Login</button>
						</div>
						<br />
						<div>
							<input type='text' name='casUsername' placeholder='CAS username' value={headlessCasUsername} onChange={e => this.handleInputChange(e)}/><br />
							<input type='password' name='casPassword' placeholder='CAS password' value={headlessCasPassword} onChange={e => this.handleInputChange(e)}/><br />
							<button onClick={() => action(authActions.HEADLESS_CAS_LOGIN_REQUESTED, { payload: {
								'Username': headlessCasUsername,
								'Password': headlessCasPassword
								}})}>"Headless" CAS Login</button>
						</div>
						<br />
						<div>
							<input type='text' name='localUsername' placeholder='local username' value={localUsername} onChange={e => this.handleInputChange(e)}/><br />
							<input type='password' name='localPassword' placeholder='local password' value={localPassword} onChange={e => this.handleInputChange(e)}/><br />
							<button onClick={() => action(authActions.LOCAL_LOGIN_REQUESTED, { payload: {
								'Username': localUsername,
								'Password': localPassword
							}})}>Local Login</button>
						</div>
					</div>}
				<br/>
				{isAuthenticated &&
					<div>
						<button onClick={() => action(netActions.DATA_REQUESTED, { modelName: 'user.userInfo'})}>Fetch User Info</button>
						<div className='jsonData'>
							<h1>User Info</h1>
							<pre>
								{JSON.stringify(userInfo, null, 2)}
							</pre>
						</div>
					</div>
				}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		userInfo: state.models.user !== undefined ? state.models.user.userInfo : undefined,
		publicData: state.models.publicData
	};
};


export default connect(mapStateToProps)(App);
