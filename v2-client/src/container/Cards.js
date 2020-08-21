import React, { useEffect, useState } from "react"
import ChampDetail from "../components/ChampDetail/ChampDetail"
import axiosAPI from "../axios"
import Spinner from "../UI/Spinner/Spinner"
import Card from "../components/Card/Card"
import AddChamp from "../components/AddChamp/AddChamp"
import Modal from "../UI/Modal/Modal"
import Slider from "../UI/Slider/Slider"

const Cards = () => {
	const [cards, setCards] = useState(null)
	const [loader, setLoader] = useState(false)
	const [detailChamp, setDetailChamp] = useState(false)
	const [addChamp, setAddChamp] = useState(false)
	const [champId, setChampId] = useState(null)
	const [succesMessage, setSuccessMessage] = useState(false)
	const [cardLayout, setCardLayout] = useState(false)

	useEffect(() => {
		console.log("render cards")
		pullChampions()
		setLoader(true)
	}, [])

	const pullChampions = () => {
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
	}

	const toggleModal = (id) => {
		console.log("toggle project")
		setDetailChamp((prevState) => !prevState)
		setChampId(id)
	}

	const closeFormForAdding = () => {
		setAddChamp((prevState) => !prevState)
	}

	const editChampion = (champData) => {
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
	}

	const deleteChampion = (champId) => {
		axiosAPI
			.delete("/" + champId)
			.then(() => {
				pullChampions()
			})
			.then(() => {
				setDetailChamp(false)
			})
	}

	const addChampion = (championData, event) => {
		event.preventDefault()
		console.log(championData)
		axiosAPI
			.post("/", championData)
			.then((response) => setSuccessMessage((prev) => !prev))
			.then(() => setAddChamp(false))
			.then(() => pullChampions())
	}

	const cardSectionClasses = ["card-section"]
	if (cardLayout) {
		cardSectionClasses.push("long-card-section")
	}

	const cardsDisplay = []
	if (cards) {
		cards.map((champion) => {
			cardsDisplay.push(
				<Card
					key={champion._id}
					layout={cardLayout}
					clicked={toggleModal}
					champion={champion}
				/>
			)
		})
	}
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

			{succesMessage ? (
				<h1
					style={{ color: "green", textAlign: "center" }}
					onClick={() => setSuccessMessage((prev) => !prev)}
				>
					Succesfully added your champion!
				</h1>
			) : null}
			<div className="action-buttons">
				<div onClick={() => setCardLayout((prevstate) => !prevstate)}>
					Change layout
				</div>
				<div onClick={() => setAddChamp((prevState) => !prevState)}>
					Add Champion
				</div>
			</div>
			{loader ? <Spinner /> : null}
			<section className="card-page">
				<div className={cardSectionClasses.join(" ")}>
					{cardLayout ? (
						<Slider>{cardsDisplay.map((card) => card)}</Slider>
					) : (
						<>{cardsDisplay.map((card) => card)} </>
					)}
				</div>
			</section>
			{addChamp ? (
				<Modal clicked={closeFormForAdding}>
					<AddChamp clicked={addChampion} />
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
