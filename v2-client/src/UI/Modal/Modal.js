import React, { useState } from "react"
import Spinner from "../Spinner/Spinner"
import axios from "../../axios"
import { useCallback } from "react"

const Modal = (props) => {
	const [champ, setChamp] = useState("")
	const [riotApiData, setriotApiData] = useState("")
	const [champImage, setchampImage] = useState("")

	React.useEffect(() => {
		console.log("Modal present")
		axios
			.get(`/${props.id}`)
			.then((response) => {
				setChamp(response.data)
				return response
			})
			.then((response) => pullRiotAPIData(response.data.name))
	}, [props.id])

	const pullRiotAPIData = useCallback((name) => {
		console.log(name)
		axios
			.get(
				`http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion/${name}.json`
			)
			.then((response) => {
				for (const key in response.data.data) {
					const name = response.data.data[key].name
					setchampImage(
						`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_0.jpg`
					)
				}
				setriotApiData(response.data.data)
				return response
			})
			.catch((error) => console.log(error))
	}, [])

	return (
		<div className="Modal" onClick={props.clicked}>
			<span>X</span>
			{props.children}
			{champ ? (
				<p>
					{champ.name} & {champ.type} & {champ.lane}{" "}
				</p>
			) : (
				<Spinner />
			)}
			{champImage ? (
				<img src={champImage} alt="Champion" />
			) : (
				<p>Loading.div..</p>
			)}
		</div>
	)
}

export default Modal
