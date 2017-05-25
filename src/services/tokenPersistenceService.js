const key = 'oauthToken'

const tokenPersistenceService = {
	getPersistedToken: () => {
		return JSON.parse(localStorage.getItem(key))
	},

	persistToken: token => {
		localStorage.setItem(key, JSON.stringify(token))
	}
}

export { tokenPersistenceService }
