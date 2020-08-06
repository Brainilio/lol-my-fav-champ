import axios from "axios"

const instance = axios.create({
	baseURL: "http://134.209.200.15:8000/champs",
})

export default instance
