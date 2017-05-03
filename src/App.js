import React, { Component } from 'react';
import './App.css';
import { action } from './index'
import { connect } from 'react-redux'

class App extends Component {
  render() {
	const { isAuthenticated } = this.props
	const id = 'abcd123'
		return (
      <div className="App">
				IsAuthenticated: { isAuthenticated === true ? 'true' : 'false' }
				<br />
				{isAuthenticated ? 
					<button onClick={() => action('LOG_OUT')}>Log Out</button> :
					<span>
						<button onClick={() => action('CAS_LOGIN')}>CAS Login</button>
						<button onClick={() => action('SHIB_LOGIN')}>Shibboleth Login</button>
						<button onClick={() => action('LOCAL_LOGIN')}>Local Login</button>
						<button onClick={() => action('FACEBOOK_LOGIN')}>Facebook Login</button>
					</span>}
				<br/>
				<button onClick={() => action('FETCH_DATA', {
						path: 'https://httpbin.org/get',
						postFetchAction: 'FD'
					})}>Fetch Data</button>
				<button onClick={() => action('FETCH_DATA_RECURRING', {
						path: 'https://httpbin.org/user-agent',
						postFetchAction: 'FDR',
						period: 500,
						id
					})}>Fetch Data Recurring (500ms)</button>
				<button onClick={() => action('FETCH_DATA_CANCEL', { id })}>Cancel Recurring Fetch</button>
				<button onClick={() => {
						for (var i = 0; i < 100; i++) {
							action('FETCH_DATA_LATEST', {
								path: 'https://httpbin.org/headers',
								postFetchAction: 'FDL'
							})
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
