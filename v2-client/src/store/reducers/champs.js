import * as actionTypes from "../actions/actionTypes"

const initialState = {
	champs: [],
	loading: false,
}

const fetchInit = (state, action) => {
	return { ...state, loading: true }
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_CHAMPIONS_START:
			return fetchInit(state, action)
		default:
			return state
	}
}

export default reducer
