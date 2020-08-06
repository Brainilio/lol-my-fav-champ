import React, { useEffect, useState } from "react"

const Card = (props) => {
	const [champion, setChampion] = useState(null)

	useEffect(() => {
		setChampion(props.champion)
	})

	return (
		<>
			{champion ? (
				<div className="single-champion">{champion.name}</div>
			) : (
				<p>Loading... </p>
			)}
		</>
	)
}

export default Card
