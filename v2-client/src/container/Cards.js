import React, { useEffect, useState, useCallback } from "react"
import ChampDetail from "../components/ChampDetail/ChampDetail"
import axiosAPI from "../axios"
import Spinner from "../UI/Spinner/Spinner"
import Card from "../components/Card/Card"
import AddChamp from "../components/AddChamp/AddChamp"
import Modal from "../UI/Modal/Modal"

const Cards = () => {
	const [cards, setCards] = useState(null)
	const [loader, setLoader] = useState(false)
	const [detailChamp, setDetailChamp] = useState(false)
	const [addChamp, setAddChamp] = useState(false)
	const [champId, setChampId] = useState(null)

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
		setDetailChamp((prevState) => !prevState)
		setChampId(id)
	}, [])

	const closeFormForAdding = useCallback(() => {
		setAddChamp((prevState) => !prevState)
	}, [])

	const editChampion = useCallback((champData) => {
		axiosAPI
			.put(`/` + champData._id, {
				name: champData.name,
				type: champData.type,
				lane: champData.lane,
				cost: champData.cost,
			})
			.then(() => {
				pullChampions()
				setDetailChamp(false)
			})
	}, [])

	const deleteChampion = useCallback((champId) => {
		axiosAPI
			.delete("/" + champId)
			.then(() => {
				pullChampions()
			})
			.then(() => {
				setDetailChamp(false)
			})
	}, [])

	const addChampion = useCallback((championData, event) => {
		event.preventDefault()
		console.log(championData)
	})

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
				<div onClick={() => setAddChamp((prevState) => !prevState)}>
					Add Champion
				</div>
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
			{addChamp ? (
				<Modal clicked={closeFormForAdding}>
					<AddChamp />
				</Modal>
			) : null}
			{detailChamp ? (
				<Modal clicked={toggleModal}>
					<ChampDetail
						id={champId}
						editThisChamp={editChampion}
						deleteChamp={deleteChampion}
					/>
				</Modal>
			) : null}
		</>
	)
}

export default Cards
