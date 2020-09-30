import * as actionTypes from "./actionTypes"
import axios from "../../axios"
import newAxios from "axios"

// ------------------ DISPATCH TO REDUCER -------------------------

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

export const fetchChampionDataStart = () => {
	return {
		type: actionTypes.FETCH_SINGLE_CHAMP_DATA_START,
	}
}

export const fetchChampionDataSuccess = (info) => {
	return {
		type: actionTypes.FETCH_SINGLE_CHAMP_DATA_SUCCESS,
		info: info,
	}
}

export const fetchChampionDataFail = (error) => {
	return {
		type: actionTypes.FETCH_SINGLE_CHAMP_DATA_FAILED,
		error: error,
	}
}

export const fetchChampionImage = (image) => {
	return {
		type: actionTypes.CHAMPIONS_IMAGE_FETCH,
		image: image,
	}
}

export const addChampion = (champ) => {
	return {
		type: actionTypes.CHAMPIONS_ADD,
		champ: champ,
	}
}

export const championEdit = (event, val) => {
	return {
		type: actionTypes.CHAMPIONS_EDIT,
		value: val,
		event: event.target.value,
	}
}

export const championEditConfirm = (champ) => {
	return {
		type: actionTypes.CHAMPIONS_EDIT_CONFIRM,
		champ: champ,
	}
}

export const deleteChampion = (id) => {
	return {
		type: actionTypes.CHAMPIONS_DELETE,
		id: id,
	}
}

// ________________________________________________________________________________________________________--
// ASYNC METHODS

export const addChamp = (champ, token) => {
	return (dispatch) => {
		axios({
			method: "post",
			url: "/",
			data: champ,
			headers: {
				Authorization: localStorage.getItem("login-token"),
			},
		})
			.then((data) => {
				dispatch(addChampion(data.data))
				dispatch(fetchChamps(token))
			})
			.catch((error) => console.log(error))
	}
}

export const fetchChamps = (token) => {
	return (dispatch) => {
		dispatch(fetchChampionsStart())

		axios({
			method: "GET",
			headers: {
				Authorization: localStorage.getItem("login-token"),
			},
		})
			.then((data) => {
				dispatch(fetchChampionsSuccess(data.data.items))
			})
			.catch((error) => {
				dispatch(fetchChampionsFail(error))
			})
	}
}

export const deleteChamp = (id, token) => {
	return (dispatch) => {
		let config = {
			headers: {
				authorization: localStorage.getItem("login-token"),
			},
		}
		axios
			.delete("/" + id, config)
			.then(() => {
				dispatch(deleteChampion(id))
			})
			.catch((error) => {
				console.log(error)
			})
	}
}

export const fetchSingleChamp = (id, token) => {
	return (dispatch) => {
		dispatch(fetchSingleChampStart())
		console.log(token)
		let config = {
			headers: {
				authorization: localStorage.getItem("login-token"),
			},
		}
		newAxios
			.get("http://134.209.200.15:8000/champs/" + id, config)
			.then((data) => {
				console.log(data)
				dispatch(fetchSingleChampSuccess(data.data))
				dispatch(fetchSingleChampInfo(data.data.name))
			})
			.catch((error) => {
				console.log(error)
				dispatch(fetchSingleChampFail(error))
			})
	}
}

export const fetchSingleChampInfo = (champName) => {
	return (dispatch) => {
		dispatch(fetchChampionDataStart())
		console.log("fetching single champ info...")
		newAxios
			.get(
				`http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion/${champName}.json`
			)
			.then((response) => {
				console.log("i fetched the data: " + response.data)
				dispatch(fetchChampionDataSuccess(response.data.data))
				for (const key in response.data.data) {
					const name = response.data.data[key].name
					dispatch(fetchSingleChampImage(name))
				}
			})
			.catch((error) => dispatch(fetchChampionDataFail(error)))
	}
}

export const fetchSingleChampImage = (champName) => {
	return (dispatch) => {
		dispatch(
			fetchChampionImage(
				`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_0.jpg`
			)
		)
	}
}

export const editChamp = (event, val) => {
	return (dispatch) => {
		event.persist()
		dispatch(championEdit(event, val))
	}
}

export const editChampConfirm = (champ, event, token) => {
	return (dispatch) => {
		let config = {
			headers: {
				authorization: localStorage.getItem("login-token"),
			},
		}
		event.preventDefault()
		axios.put("/" + champ._id, champ, config).then(() => {
			dispatch(championEditConfirm(champ))
		})
	}
}

// pull riot api data & image
