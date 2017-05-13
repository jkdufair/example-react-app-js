// TODO: flow
import React, { Component } from 'react'
import './App.css'
import Public from './components/Public'
import Authenticated from './components/Authenticated'
import AppBar from 'material-ui/AppBar'
import { Tab, Tabs } from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'

export default class App extends Component {
  render() {
		return (
			<div>
				<AppBar
					title='Example Studio React Web App'
					iconElementLeft={<span />}
					iconElementRight={
						<IconButton
							tooltip='Source Code'
							iconClassName='material-icons'
							href='https://sprinklesthecat.ics.purdue.edu/studiokit-js/example-react-app-js'>
								code
						</IconButton>}
					/>
				<div className='main'>
					<Tabs>
						<Tab label='Public' icon={<FontIcon className='material-icons'>cloud</FontIcon>}>
							<Public />
						</Tab>
						<Tab label='Authenticated' icon={<FontIcon className='material-icons'>fingerprint</FontIcon>}>
							<Authenticated />
						</Tab>
					</Tabs>
				</div>
			</div>
		)
	}
}