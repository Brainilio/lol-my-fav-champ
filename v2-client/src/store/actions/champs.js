import * as actionTypes from "./actionTypes"
import axios from "../../axios"

// DISPATCH
export const fetchChampionsStart = () => {
	return {
		type: actionTypes.FETCH_CHAMPIONS_START,
	}
}
export const fetchChampionsSuccess = (champs) => {
	return {
		type: actionTypes.FETCH_CHAMPIONS_SUCCESS,
		champs: champs,
	}
}
export const fetchChampionsFail = (error) => {
	return {
		type: actionTypes.FETCH_CHAMPIONS_SUCCESS,
		error: error,
	}
}

export const fetchSingleChampStart = () => {
	return {
		type: actionTypes.FETCH_SINGLE_CHAMP_START,
	}
}

export const fetchSingleChampSuccess = (champ) => {
	return {
		type: actionTypes.FETCH_SINGLE_CHAMP_SUCCESS,
		champ: champ,
	}
}

export const fetchSingleChampFail = (error) => {
	return {
		type: actionTypes.FETCH_SINGLE_CHAMP_FAILED,
		error: error,
	}
}

export const addChampion = (champ) => {
	return {
		type: actionTypes.CHAMPIONS_ADD,
		champ: champ,
	}
}
export const championEdit = () => {
	return {
		type: actionTypes.CHAMPIONS_EDIT,
	}
}
export const deleteChampion = (id) => {
	return {
		type: actionTypes.CHAMPIONS_DELETE,
		id: id,
	}
}

// ASYNC METHODS
export const addChamp = (champ) => {
	return (dispatch) => {
		axios.post("/", champ).then((data) => dispatch(addChampion(data.data)))
	}
}
export const fetchChamps = () => {
	return (dispatch) => {
		dispatch(fetchChampionsStart())
		axios
			.get()
			.then((data) => {
				dispatch(fetchChampionsSuccess(data.data.items))
			})
			.catch((error) => {
				dispatch(fetchChampionsFail(error))
			})
	}
}
export const deleteChamp = (id) => {
	return (dispatch) => {
		axios
			.delete("/" + id)
			.then(() => {
				dispatch(deleteChampion(id))
			})
			.catch((error) => {
				console.log(error)
			})
	}
}

export const fetchSingleChamp = (id) => {
	console.log(id)
	return (dispatch) => {
		dispatch(fetchSingleChampStart)
		axios
			.get("/" + id)
			.then((data) => {
				dispatch(fetchSingleChampSuccess(data.data))
			})
			.catch((error) => dispatch(fetchSingleChampFail(error)))
	}
}
export const editChamp = (champion) => {}
