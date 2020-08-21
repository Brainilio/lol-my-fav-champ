import React, { useEffect, useState } from "react"

const Card = (props) => {
	const [champion, setChampion] = useState(null)

	const classes = ["single-champion"]

	if (props.layout) {
		classes.push("long-cards")
	}

	useEffect(() => {
		setChampion(props.champion)
	}, [props.champion])

	return (
		<>
			{champion ? (
				<div
					onClick={(id) => props.clicked(props.champion._id)}
					className={classes.join(" ")}
				>
					{champion.name}
				</div>
			) : (
				<p>Loading... </p>
			)}
		</>
	)
}

export default Card
