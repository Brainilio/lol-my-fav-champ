import React, { useEffect, useState } from "react"

const Card = (props) => {
	const [champion, setChampion] = useState(null)

	useEffect(() => {
		setChampion(props.champion)
	}, [props.champion])

	return (
		<>
			{champion ? (
				<div
					onClick={(id) => props.clicked(props.champion._id)}
					className="single-champion"
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
