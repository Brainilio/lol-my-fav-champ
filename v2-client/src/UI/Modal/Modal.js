import React, { useState } from "react"
import Spinner from "../Spinner/Spinner"
import axios from "../../axios"

const Modal = (props) => {
	const [champ, setChamp] = useState("")

	React.useEffect(() => {
		console.log("Modal present")
		axios.get(`/${props.id}`).then((response) => {
			console.log(response.data)
		})
	})
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
