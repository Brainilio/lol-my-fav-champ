import React, { useEffect, useState } from "react"
import defaultImg from "../../assets/poro.png"
import "./Card.scss"

const Card = (props) => {
	const [champion, setChampion] = useState(null)

	const classes = ["single-champion"]

	useEffect(() => {
		setChampion(props.champion)
	}, [props.champion])

	if (props.layout) {
		classes.push("long-cards")
	}

	return (
		<>
			{champion ? (
				<div
					onClick={(id) => props.clicked(props.champion._id)}
					className={classes.join(" ")}
				>
					<img
						src={
							`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.name}_0.jpg`
								? `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.name}_0.jpg`
								: defaultImg
						}
						alt=""
					/>

					<h1>{champion.name}</h1>
				</div>
			) : (
				<p>Loading... </p>
			)}
		</>
	)
}

export default Card
