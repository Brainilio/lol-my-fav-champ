import axios from "axios"

const instance = axios.create({
	baseURL: "http://18.192.56.124:2000/",
})

export default instance
