import React, { useState } from "react"
import Spinner from "../Spinner/Spinner"
import axios from "../../axios"
import { useCallback } from "react"

const Modal = (props) => {
	const [champ, setChamp] = useState("")

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

	const pullRiotAPIData = useCallback(() => {
		axios
			.get(
				`http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion/${champ.name}json`
			)
			.then((response) => {
				console.log(response)
			})
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
		</div>
	)
}

export default Modal
