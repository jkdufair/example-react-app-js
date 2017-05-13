// TODO: flow
import React, { Component } from 'react'
import './App.css'
import Public from './components/Public'
import Authenticated from './components/Authenticated'
import { Tab, Tabs } from 'material-ui/Tabs'

export default class App extends Component {
  render() {
		return (
			<Tabs>
				<Tab label='Public'>
					<Public />
				</Tab>
				<Tab label='Authenticated'>
					<Authenticated />
				</Tab>
			</Tabs>
		)
	}
}