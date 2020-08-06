import React, { useEffect, useState } from "react"
import axios from "../axios"
import Spinner from "../UI/Spinner/Spinner"

const Cards = () => {
	const [cards, setCards] = useState(null)
	const [loader, setLoader] = useState(false)

	useEffect(() => {
		axios.get().then((response) => {
			console.log(response)
		})
		console.log("I'm here now!")
	}, [])

	return <section className="card-page">{loader ? <Spinner /> : null}</section>
}

export default Cards
