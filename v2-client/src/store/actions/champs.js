import * as actionTypes from "./actionTypes"
import axios from "../../axios"

// to dispatch
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

export const deleteChampion = (id) => {
	return {
		type: actionTypes.CHAMPIONS_DELETE,
		id: id,
	}
}

export const championEdit = () => {
	return {
		type: actionTypes.FETCH_CHAMPIONS_EDIT,
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

export const editChamp = (champion) => {}
