import * as actionTypes from "../actions/actionTypes"

const initialState = {
	champs: [],
	champ: null,
	loading: false,
	singleChampLoading: false,
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

const fetchSingleStart = (state, action) => {
	return { ...state, singleChampLoading: true }
}

const fetchSingleSuccess = (state, action) => {
	console.log(action.champ)
	return { ...state, singleChampLoading: false, champ: action.champ }
}

const fetchSingleFail = (state, action) => {
	return { ...state, singleChampLoading: false, error: action.error }
}

const addChampion = (state, action) => {
	let newChampion = action.champ
	let updatedState = [...state.champs]
	updatedState.push(newChampion)
	return { ...state, champs: updatedState }
}

const editChampion = (state, action) => {
	return state
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
		case actionTypes.FETCH_SINGLE_CHAMP_START:
			return fetchSingleStart(state, action)
		case actionTypes.FETCH_SINGLE_CHAMP_SUCCESS:
			return fetchSingleSuccess(state, action)
		case actionTypes.FETCH_SINGLE_CHAMP_FAILED:
			return fetchSingleFail(state, action)
		case actionTypes.CHAMPIONS_ADD:
			return addChampion(state, action)
		case actionTypes.CHAMPIONS_EDIT:
			return editChampion(state, action)
		case actionTypes.CHAMPIONS_DELETE:
			return deleteChampion(state, action)
		default:
			return state
	}
}

export default reducer
