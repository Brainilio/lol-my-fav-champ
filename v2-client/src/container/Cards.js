import React, { useEffect, useState } from "react"
import axios from "../axios"
import Spinner from "../UI/Spinner/Spinner"
import Card from "../components/Card/Card"

const Cards = () => {
	const [cards, setCards] = useState(null)
	const [loader, setLoader] = useState(false)

	useEffect(() => {
		setLoader(true)
		axios
			.get()
			.then((response) => {
				setLoader(false)
				setCards(response.data.items)
			})
			.catch((error) => {
				setLoader(false)
				console.log(error)
			})
	}, [])

	return (
		<section className="card-page">
			{loader ? <Spinner /> : null}
			<div className="card-section">
				{cards
					? cards.map((champion) => {
							return <Card key={champion._id} champion={champion} />
					  })
					: null}
			</div>
		</section>
	)
}

export default Cards
