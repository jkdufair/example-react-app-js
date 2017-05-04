import React, { Component } from 'react';
import './App.css';
import { action } from './index'
import { connect } from 'react-redux'

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
					<button onClick={() => action('LOG_OUT')}>Log Out</button> :
					<div>
						<div>
							<button onClick={() => action('CAS_LOGIN')}>CAS Login</button>
							<button onClick={() => action('SHIB_LOGIN')}>Shibboleth Login</button>
							<button onClick={() => action('FACEBOOK_LOGIN')}>Facebook Login</button>
						</div>
						<br />
						<div>
							<input type='text' name='username' placeholder='username' value={username} onChange={e => this.handleInputChange(e)}/><br />
							<input type='text' name='password' placeholder='password' value={password} onChange={e => this.handleInputChange(e)}/><br />
							<button onClick={() => action('LOCAL_LOGIN', { payload: {
								'Username': username,
								'Password': password
							}})}>Local Login</button>
						</div>
					</div>}
				<br/>
				<button onClick={() => action('FETCH_DATA', { modelName: 'test'})}>Fetch Data</button>
				<button onClick={() => action('FETCH_DATA_RECURRING', {	modelName: 'test2',	taskId: 'abc', period: 500 })}>Fetch Data Recurring (500ms)</button>
				<button onClick={() => action('FETCH_DATA_CANCEL', { taskId: 'abc' })}>Cancel Recurring Fetch</button>
				<button onClick={() => {
						for (var i = 0; i < 100; i++) {
							action('FETCH_DATA_LATEST', { modelName: 'test3' })
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
