import React, { useState } from "react"
import Placeholder from "../../assets/poro.png"
import Gif from "../../assets/giphy.gif"
import Spinner from "../../UI/Spinner/Spinner"
import axios from "../../axios"
import { useCallback } from "react"
import "./ChampDetail.scss"

const ChampDetail = (props) => {
	const [champ, setChamp] = useState("")
	const [riotApiData, setriotApiData] = useState("")
	const [champImage, setchampImage] = useState("")
	const [inputField, setinputField] = useState(false)

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
		props.editThisChamp(champ)
	}

	const setEditChamp = (value, event) => {
		console.log(event.target.value)
		let name = event.target.value
		setChamp((prevState) => ({
			...prevState,
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
							return setinputField((prev) => !prev)
						}}
					>
						edit
					</button>
					<button
						className="material-icons"
						onClick={() => props.deleteChamp(champ._id)}
					>
						delete
					</button>
				</div>
			</div>
		)
	}

	if (inputField) {
		const keys = Object.keys(champ)
		let values = keys.slice(1, 5)

		championData = (
			<form className="edit-champion">
				<h1>Edit your champion</h1>
				{values.map((value) => (
					<input
						key={champ[value]}
						value={champ[value]}
						name={champ[value]}
						onChange={(event) => setEditChamp(value, event)}
					/>
				))}
				<div className="action-buttons">
					<button onClick={() => setinputField((prev) => !prev)}>
						Go back
					</button>
					<button type="submit" onClick={(event) => editChamp(event)}>
						Edit champ
					</button>
				</div>
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
			<div className="champ-details">
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

export default ChampDetail
