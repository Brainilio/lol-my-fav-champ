import React, { useState } from "react"

import Spinner from "../../UI/Spinner/Spinner"
import "./ChampDetail.scss"
import * as actions from "../../store/actions/index"
import { connect } from "react-redux"
import Officialdata from "./officialData/Officialdata"
import ChampImage from "./champImage/ChampImage"

const ChampDetail = (props) => {
	const [inputField, setinputField] = useState(false)

	React.useEffect(() => {
		console.log("Modal present")
		props.fetchSingleChamp(props.id, props.token)
	}, [])

	// spinner before fetching champion
	let championData = <Spinner />

	// if champion load, championdata is now champion info
	if (props.champ) {
		championData = (
			<div className="my-information">
				<h2>{props.champ.name}</h2>
				<span>{props.champ.type}</span>
				<span>{props.champ.lane}</span>
				<span>{props.champ.cost}</span>
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
						onClick={() => props.deleteChamp(props.champ._id, props.token)}
					>
						delete
					</button>
				</div>
			</div>
		)
	}

	// if click on edit button, change champ data to an input field for editing
	if (inputField) {
		const keys = Object.keys(props.champ)
		let values = keys.slice(1, 5)

		championData = (
			<form className="edit-champion">
				<h1>Edit your champion</h1>
				{values.map((value) => (
					<input
						key={value}
						value={props.champ[value]}
						onChange={(event) => props.championEdit(event, value)}
					/>
				))}
				<div className="action-buttons">
					<button onClick={() => setinputField((prev) => !prev)}>
						Go back
					</button>
					<button
						type="submit"
						onClick={(event) =>
							props.confirmEditChampion(props.champ, event, props.token)
						}
					>
						Edit champ
					</button>
				</div>
			</form>
		)
	}

	return (
		<>
			<div className="champ-details">
				<div className="information-general">
					{championData}
					<hr className="solid" />
					<Officialdata />
				</div>
				<ChampImage />
			</div>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		champ: state.champs.champ,
		token: state.auth.token,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchSingleChamp: (id, token) =>
			dispatch(actions.fetchSingleChamp(id, token)),
		championEdit: (event, val) => dispatch(actions.editChamp(event, val)),
		confirmEditChampion: (champ, event, token) =>
			dispatch(actions.editChampConfirm(champ, event, token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChampDetail)
