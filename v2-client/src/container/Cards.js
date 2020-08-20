import React, { useEffect, useState, useCallback } from "react"
import ChampDetail from "../components/ChampDetail/ChampDetail"
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
		pullChampions()
		setLoader(true)
	}, [])

	const pullChampions = useCallback(() => {
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
	}, [])

	const toggleModal = useCallback((id) => {
		console.log("toggle project")
		setModal((prevState) => !prevState)
		setModalId(id)
	}, [])

	const editChampion = useCallback((champData) => {
		axiosAPI
			.put(`/` + champData.champId, {
				name: champData.name,
				type: champData.type,
				lane: champData.lane,
				cost: champData.cost,
			})
			.then(() => {
				pullChampions()
			})
			.then(() => {
				setModal(false)
			})
	}, [])

	const deleteChampion = useCallback((champId) => {
		axiosAPI
			.delete("/" + champId)
			.then(() => {
				pullChampions()
			})
			.then(() => {
				setModal(false)
			})
	}, [])

	return (
		<>
			<h1
				style={{
					textAlign: "center",
					marginTop: "25px",
				}}
				className="title-card-page"
			>
				My League of Legends Champions:
			</h1>
			<div className="action-buttons">
				<div>Change layout</div>
				<div>Add Champion</div>
			</div>
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
				<Modal clicked={toggleModal}>
					<ChampDetail
						id={modalId}
						editThisChamp={editChampion}
						deleteChamp={deleteChampion}
					/>
				</Modal>
			) : null}
		</>
	)
}

export default Cards
