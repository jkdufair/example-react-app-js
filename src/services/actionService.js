let store

export function setStore(storeParam) {
	store = storeParam
}

export function dispatchAction(type, payload) {
	store.dispatch(createAction(type, payload))
}

export function createAction(type, payload) {
	return Object.assign({}, { type }, payload)
}
