import * as actionTypes from "./actionTypes"
import axios from "axios"

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	}
}

export const authSuccess = (token, name, message) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		name: name,
		message: message,
	}
}

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	}
}

export const loggingOut = () => {
	localStorage.clear()
	return {
		type: actionTypes.AUTH_LOGOUT,
	}
}

export const logOut = (event) => {
	return (dispatch) => {
		localStorage.clear()
		dispatch(loggingOut())
	}
}

export const submitForm = (data, isSignup) => {
	return (dispatch) => {
		dispatch(authStart())

		if (isSignup) {
			const { name, email, password } = data
			// handle register
			axios
				.post("http://134.209.200.15:8000/user/register", {
					name: name,
					email: email,
					password: password,
				})
				.then(() => {
					const successMessage = "Thank you for signing up. You can now log in"
					dispatch(authSuccess(null, null, successMessage))
				})
				.catch((error) => dispatch(authFail(error.message)))
		} else {
			const { email, password } = data
			// handle log in
			axios
				.post("http://134.209.200.15:8000/user/login", {
					email: email,
					password: password,
				})
				.then((response) => {
					let token = response.data.token
					const successMessage = "Successfully logged in."
					localStorage.setItem("login-token", token)
					return dispatch(
						authSuccess(token, response.data.data.user, successMessage)
					)
				})
				.catch((error) => dispatch(authFail(error.message)))
		}
	}
}

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem("login-token")
		if (!token) {
			dispatch(logOut())
		} else {
			dispatch(authSuccess(token))
		}
	}
}
