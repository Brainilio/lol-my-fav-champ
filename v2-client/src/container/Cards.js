import React, { useEffect, useState, useCallback } from "react"
import axiosAPI from "../axios"
// import axios from "axios"
import Spinner from "../UI/Spinner/Spinner"
import Card from "../components/Card/Card"
import Modal from "../UI/Modal/Modal"

const Cards = () => {
	const [cards, setCards] = useState(null)
	const [loader, setLoader] = useState(false)
	const [modal, setModal] = useState(false)
	const [modalId, setModalId] = useState(null)

	useEffect(() => {
		console.log("render cards")
		setLoader(true)
		axiosAPI
			.get()
			.then((response) => {
				setLoader(false)
				setCards(response.data.items)
			})
			.catch((error) => {
				setLoader(false)
				console.log(error)
			})
		// axios
		// 	.get(
		// 		"http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json"
		// 	)
		// 	.then((res) => console.log(res.data))
	}, [])

	const toggleModal = useCallback((id) => {
		console.log("toggle project")
		setModal((prevState) => !prevState)
		setModalId(id)
	}, [])

	return (
		<>
			<section className="card-page">
				{loader ? <Spinner /> : null}
				<div className="card-section">
					{cards
						? cards.map((champion) => {
								return (
									<Card
										key={champion._id}
										clicked={toggleModal}
										champion={champion}
									/>
								)
						  })
						: null}
				</div>
			</section>
			{modal ? (
				<Modal id={modalId} clicked={toggleModal}>
					<p>Brainilio</p>
				</Modal>
			) : null}
		</>
	)
}

export default Cards
