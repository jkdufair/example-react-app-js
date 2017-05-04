import React, { Component } from 'react';
import './App.css';
import { action } from './index'
import { connect } from 'react-redux'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: undefined,
			password: undefined
		}
	}
  render() {
	const { isAuthenticated } = this.props
	const { username, password } = this.state
	const id = 'abcd123'
		return (
      <div className="App">
				IsAuthenticated: { isAuthenticated === true ? 'true' : 'false' }
				<br />
				{isAuthenticated ? 
					<button onClick={() => action('LOG_OUT')}>Log Out</button> :
					<div>
						<div>
							<button onClick={() => action('CAS_LOGIN')}>CAS Login</button>
							<button onClick={() => action('SHIB_LOGIN')}>Shibboleth Login</button>
							<button onClick={() => action('FACEBOOK_LOGIN')}>Facebook Login</button>
						</div>
						<br />
						<div>
							<input type='text' placeholder='username' value={username} onChange={(event) => this.setState({ username: event.target.value })}/><br />
							<input type='text' placeholder='password' value={password} onChange={(event) => this.setState({ password: event.target.value })}/><br />
							<button onClick={() => action('LOCAL_LOGIN', { payload: {
								'Username': username,
								'Password': password
							}})}>Local Login</button>
						</div>
					</div>}
				<br/>
				<button onClick={() => action('FETCH_DATA', { model: 'test'})}>Fetch Data</button>
				<button onClick={() => action('FETCH_DATA_RECURRING', {	model: 'test2',	id, period: 500 })}>Fetch Data Recurring (500ms)</button>
				<button onClick={() => action('FETCH_DATA_CANCEL', { id })}>Cancel Recurring Fetch</button>
				<button onClick={() => {
						for (var i = 0; i < 100; i++) {
							action('FETCH_DATA_LATEST', { model: 'test3' })
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
