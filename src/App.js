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
			username: '',
			password: ''
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
	const { isAuthenticated } = this.props
	const { username, password } = this.state
		return (
      <div className="App">
				IsAuthenticated: { isAuthenticated === true ? 'true' : 'false' }
				<br />
				{isAuthenticated ? 
					<button onClick={() => action(authActions.LOG_OUT_REQUESTED)}>Log Out</button> :
					<div>
						<div>
							<button onClick={() => action(authActions.CAS_LOGIN_REQUESTED)}>CAS Login</button>
							<button onClick={() => action(authActions.SHIB_LOGIN_REQUESTED)}>Shibboleth Login</button>
							<button onClick={() => action(authActions.FACEBOOK_LOGIN_REQUESTED)}>Facebook Login</button>
						</div>
						<br />
						<div>
							<input type='text' name='username' placeholder='username' value={username} onChange={e => this.handleInputChange(e)}/><br />
							<input type='text' name='password' placeholder='password' value={password} onChange={e => this.handleInputChange(e)}/><br />
							<button onClick={() => action(authActions.LOCAL_LOGIN_REQUESTED, { payload: {
								'Username': username,
								'Password': password
							}})}>Local Login</button>
						</div>
					</div>}
				<br/>
				<button onClick={() => action(netActions.DATA_REQUESTED, { modelName: 'test'})}>Fetch Data</button>
				<button onClick={() => action(netActions.PERIODIC_DATA_REQUESTED, {	modelName: 'test2',	taskId: 'abc', period: 500 })}>Fetch Data Recurring (500ms)</button>
				<button onClick={() => action(netActions.PERIODIC_TERMINATION_REQUESTED, { taskId: 'abc' })}>Cancel Recurring Fetch</button>
				<button onClick={() => {
						for (var i = 0; i < 100; i++) {
							action(netActions.DATA_REQUESTED_USE_LATEST, { modelName: 'test3' })
						}
					}}>Fetch Data Latest</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	};
};


export default connect(mapStateToProps)(App);
