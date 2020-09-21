import * as actionTypes from "../actions/actionTypes"

const initialState = {
	champs: [],
	loading: false,
	error: null,
}

const fetchStart = (state, action) => {
	return { ...state, loading: true }
}

const fetchSuccess = (state, action) => {
	return { ...state, loading: false, champs: action.champs }
}

const fetchFail = (state, action) => {
	return { ...state, loading: false, error: action.error }
}

const deleteChampion = (state, action) => {
	let champToDelete = [...state.champs]
	let newChamps = champToDelete.filter((champ) => champ._id !== action.id)
	console.log(newChamps)

	return { ...state, champs: newChamps }
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_CHAMPIONS_START:
			return fetchStart(state, action)
		case actionTypes.FETCH_CHAMPIONS_SUCCESS:
			return fetchSuccess(state, action)
		case actionTypes.FETCH_CHAMPIONS_FAILED:
			return fetchFail(state, action)
		case actionTypes.CHAMPIONS_DELETE:
			return deleteChampion(state, action)
		default:
			return state
	}
}

export default reducer
