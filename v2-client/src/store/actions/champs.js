import * as actionTypes from "./actionTypes"
import axios from "../../axios"

export const fetchChampionsStart = (champs) => {
	return {
		type: actionTypes.FETCH_CHAMPIONS_START,
		champs: champs,
	}
}
