import React, { useState } from "react"
import Placeholder from "../../assets/poro.png"
import Gif from "../../assets/giphy.gif"
import Spinner from "../Spinner/Spinner"
import axios from "../../axios"
import Backdrop from "../Backdrop/Backdrop"
import { useCallback } from "react"

const Modal = (props) => {
	const [champ, setChamp] = useState("")
	const [riotApiData, setriotApiData] = useState("")
	const [champImage, setchampImage] = useState("")

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
					).catch((e) => setchampImage(e))
				}
				setriotApiData(response.data.data)
				return response
			})
			.catch((error) => setchampImage(Placeholder))
	}, [])

	React.useEffect(() => {
		console.log("Modal present")
		axios
			.get(`/${props.id}`)
			.then((response) => {
				setChamp(response.data)
				return response
			})
			.then((response) => pullRiotAPIData(response.data.name))
	}, [props.id, pullRiotAPIData])

	let officialData = (
		<div className="official-data">
			<h1>Can't find any official data on your champion!</h1>
			<span>Does your champion exist?</span>
			<img src={Gif} alt="Bard floating" />
		</div>
	)
	if (riotApiData) {
		for (const key in riotApiData) {
			const championInfo = riotApiData[key]

			officialData = (
				<div className="official-data">
					<h1>Official data found on your champion:</h1>
					<span>{championInfo.name}</span>
					<span>{championInfo.title}</span>
					<p>{championInfo.lore}</p>
					<div>
						<span>Ally tips:</span>
						<p>{championInfo.allytips.map((tip) => tip + " ")}</p>
						<span>Enemy tips:</span>
						<p>{championInfo.enemytips.map((tip) => tip + " ")}</p>
					</div>
				</div>
			)
		}
	}

	return (
		<>
			<Backdrop show={props.clicked} clicked={props.clicked} />
			<div className="Modal">
				<span onClick={props.clicked} className="close-modal">
					X
				</span>
				{props.children}
				{champ ? (
					<div className="my-information">
						<h1>My information</h1>
						<p>
							{champ.name} & {champ.type} & {champ.lane}{" "}
						</p>
						<span>Edit now</span>
					</div>
				) : (
					<Spinner />
				)}

				{/* Official information */}
				{officialData}
				{/* Image */}
				{champImage ? (
					<img
						className="champion-image"
						draggable="false"
						src={champImage}
						alt="Champion"
					/>
				) : null}
			</div>
		</>
	)
}

export default Modal
