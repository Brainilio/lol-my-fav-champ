import * as actionTypes from "../actions/actionTypes"

const initialState = {
	loading: false,
	token: null,
	error: null,
	name: null,
	message: null,
}

const authstart = (state, action) => {
	return { ...state, loading: true }
}

const authSuccess = (state, action) => {
	return {
		...state,
		loading: false,
		token: action.token,
		name: action.name,
		message: action.message,
	}
}

const authFail = (state, action) => {
	if (action.error.startsWith("R")) {
		action.error = "Something went wrong!"
	}
	return { ...state, loading: false, error: action.error }
}

const authLogout = (state, action) => {
	console.log("logging out...")
	return { ...state, token: null, name: null }
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authstart(state, action)
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action)
		case actionTypes.AUTH_FAIL:
			return authFail(state, action)
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action)
		default:
			return state
	}
}

export default reducer
