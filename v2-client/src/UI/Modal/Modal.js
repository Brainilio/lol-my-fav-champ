import React, { useState } from "react"
import Placeholder from "../../assets/poro.png"
import Gif from "../../assets/giphy.gif"
import Spinner from "../Spinner/Spinner"
import axios from "../../axios"
import Backdrop from "../Backdrop/Backdrop"
import Exit from "../Exit/Exit"
import { useCallback } from "react"

const Modal = (props) => {
	const [champ, setChamp] = useState("")
	const [riotApiData, setriotApiData] = useState("")
	const [champImage, setchampImage] = useState("")
	const [inputField, setinputField] = useState(false)
	const [editedChamp, setEditedChamp] = useState("")

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
			.catch((error) => setchampImage(Placeholder))
	}, [])

	const editChamp = (event) => {
		event.preventDefault()
		console.log(editedChamp)
		props.editThisChamp(editedChamp)
	}

	const setEditChamp = (value, event) => {
		let name = event.target.value
		setEditedChamp((prevState) => ({
			...prevState,
			champId: champ._id,
			champName: champ.name,
			[value]: name,
		}))
	}

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

	let championData = <Spinner />

	if (champ) {
		championData = (
			<div className="my-information">
				<h1>My information</h1>
				<span>{champ.name}</span>
				<span>{champ.type}</span>
				<span>{champ.lane}</span>
				<span>{champ.cost}</span>
				<div className="clickables">
					<button
						className="material-icons"
						onClick={() => {
							console.log("clicked")
							return setinputField((prev) => !prev)
						}}
					>
						edit
					</button>
					<button className="material-icons">delete</button>
				</div>
			</div>
		)
	}

	// TODO: FOR EACH KEY AND VALUE, MAKE AN INPUT FIELD AND CHANGE IT
	let iptField = [null]

	if (inputField) {
		const keys = Object.keys(champ)
		let values = keys.slice(1, 5)

		championData = (
			<form>
				{values.map((value) => (
					<input
						key={champ[value]}
						value={editedChamp[value]}
						name={champ[value]}
						placeholder={champ[value]}
						onChange={(event) => setEditChamp(value, event)}
					/>
				))}
				<button onClick={() => setinputField((prev) => !prev)}>Go back</button>
				<button type="submit" onClick={(event) => editChamp(event)}>
					Edit champ
				</button>
			</form>
		)
	}

	let officialData = (
		<div className="official-data">
			<h1>Couldn't find any official data on your champion!</h1>
			<span>Does your champion exist?</span>
			<img src={Gif} alt="Bard floating" />
			<span style={{ color: "grey" }}>Data provided by Riot Games</span>
		</div>
	)

	if (riotApiData) {
		for (const key in riotApiData) {
			const championInfo = riotApiData[key]

			officialData = (
				<div className="official-data">
					<h1>Official RIOT data found about your favorite champion!</h1>
					<span>{championInfo.name}</span>
					<span>{championInfo.title}</span>
					<p>{championInfo.lore}</p>
					<div className="tips">
						<div className="allies">
							<span>Ally tips</span>
							<ul>
								{championInfo.allytips.map((tip) => (
									<li key={tip}>{tip}</li>
								))}
							</ul>
						</div>
						<div className="enemies">
							<span>Enemy tips</span>
							<ul>
								{championInfo.enemytips.map((tip) => (
									<li key={tip}>{tip}</li>
								))}
							</ul>
						</div>
					</div>
					<span>Data provided by Riot Games</span>
				</div>
			)
		}
	}

	return (
		<>
			<Backdrop show={props.clicked} clicked={props.clicked} />
			<div className="Modal">
				<Exit clicked={props.clicked} />

				<div className="information-general">
					{championData}
					{/* Official information */}
					{officialData}
				</div>

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
