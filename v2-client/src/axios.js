import axios from "axios"

const instance = axios.create({
	baseURL: "18.192.56.124/champs",
})

export default instance
