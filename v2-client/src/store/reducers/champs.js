import * as actionTypes from "../actions/actionTypes"
import Placeholder from "../../assets/poro.png"

const initialState = {
	champs: [],
	champ: null,
	loading: false,
	singleChampLoading: false,
	singleChampInfoLoading: false,
	singleChampImage: Placeholder,
	singleChampInfo: null,
	error: null,
}

// ------------------ REDUCER METHODS -------------------- //

// initializing the fetching state; set the loader on true;
const fetchStart = (state, action) => {
	return { ...state, loading: true }
}

// When the fetching of all champions go successfully, set the state champs to the fetched champions
const fetchSuccess = (state, action) => {
	return { ...state, loading: false, champs: action.champs }
}

// When fail, set the error message to the http error message
const fetchFail = (state, action) => {
	return { ...state, loading: false, error: action.error }
}

// This is for the detail modal; this is for initializing the fetch-single-start, in the modal there is a separate loading state
const fetchSingleStart = (state, action) => {
	return { ...state, singleChampLoading: true }
}

// Single champ fetching success? Set it to the champ object
const fetchSingleSuccess = (state, action) => {
	console.log(action.champ)
	return { ...state, singleChampLoading: false, champ: action.champ }
}

// Single champ failed fetching? Error messsageeee...
const fetchSingleFail = (state, action) => {
	return { ...state, singleChampLoading: false, error: action.error }
}

// This is for adding a new champion to the state, it will eventually be added in the action methods
const addChampion = (state, action) => {
	let newChampion = action.champ
	let updatedState = [...state.champs]
	state.loading = true
	updatedState.push(newChampion)
	return { ...state, champs: updatedState, loading: false }
}

// This is for editing the state of the champion, not  sending http request
const editChampion = (state, action) => {
	let name = action.event
	let objectUpdate = { ...state.champ }
	objectUpdate[action.value] = name
	return { ...state, champ: objectUpdate }
}

// Satisfied with your edits? This is for confirming your edit, send it to the server
const editConfirm = (state, action) => {
	let oldObject = [...state.champs]
	let filteredChamp = oldObject.filter(
		(champ) => action.champ._id === champ._id
	)
	let index = oldObject.indexOf(filteredChamp[0])
	oldObject[index] = action.champ
	return { ...state, champs: oldObject, champ: action.champ }
}

// Deleting champion
const deleteChampion = (state, action) => {
	let champToDelete = [...state.champs]
	let newChamps = champToDelete.filter((champ) => champ._id !== action.id)
	console.log(newChamps)

	return { ...state, champs: newChamps }
}

//fetching info on champion
const fetchSingleDataStart = (state, action) => {
	console.log("starting to fetch")
	return { ...state, singleChampInfoLoading: true }
}

//fetching info on champion: success
const fetchSingleDataSuccess = (state, action) => {
	// action.info == riot info
	console.log(action.info)
	return {
		...state,
		singleChampInfoLoading: false,
		singleChampInfo: action.info,
	}
}

//fetching info on champion: fail
const fetchSingleDataFail = (state, action) => {
	console.log(action.error)
	return {
		...state,
		singleChampInfoLoading: false,
		error: action.error,
	}
}

//fetching info on champion: image
const fetchSingleChampImage = (state, action) => {
	// action.image == image
	return { ...state, singleChampImage: action.image }
}

// -------------- REDUCER ---------------- //

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
		case actionTypes.FETCH_SINGLE_CHAMP_DATA_START:
			return fetchSingleDataStart(state, action)
		case actionTypes.FETCH_SINGLE_CHAMP_DATA_SUCCESS:
			return fetchSingleDataSuccess(state, action)
		case actionTypes.FETCH_SINGLE_CHAMP_DATA_FAILED:
			return fetchSingleDataFail(state, action)
		case actionTypes.CHAMPIONS_IMAGE_FETCH:
			return fetchSingleChampImage(state, action)
		case actionTypes.CHAMPIONS_ADD:
			return addChampion(state, action)
		case actionTypes.CHAMPIONS_EDIT:
			return editChampion(state, action)
		case actionTypes.CHAMPIONS_EDIT_CONFIRM:
			return editConfirm(state, action)
		case actionTypes.CHAMPIONS_DELETE:
			return deleteChampion(state, action)
		default:
			return state
	}
}

export default reducer
