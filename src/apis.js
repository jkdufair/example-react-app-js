const apis = {
	publicData: {
		path: 'https://httpbin.org/get',
		queryParams: {
			foo: 'bar'
		}
	},
	user: {
		calendarToken: {
			path: '/api/CalendarTokens'
		},
		events: {
			path: '/api/Events/{{models.user.calendarToken.data}}?asJson=true'
		}
	}
}

export default apis
