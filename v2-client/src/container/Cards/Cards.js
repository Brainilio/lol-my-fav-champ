import React, { useEffect, useState } from "react"
import ChampDetail from "../../components/ChampDetail/ChampDetail"
import axiosAPI from "../../axios"
import Spinner from "../../UI/Spinner/Spinner"
import Pagination from "../../UI/Pagination/Pagination"
import Banner from "../../components/Banner/Banner"
import Card from "../../components/Card/Card"
import AddChamp from "../../components/AddChamp/AddChamp"
import "./Cards.scss"
import Modal from "../../UI/Modal/Modal"

const Cards = () => {
	const [cards, setCards] = useState(null)
	const [loader, setLoader] = useState(false)
	const [detailChamp, setDetailChamp] = useState(false)
	const [addChamp, setAddChamp] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [cardsPerPage] = useState(5)
	const [champId, setChampId] = useState(null)
	const [succesMessage, setSuccessMessage] = useState(false)
	const [cardLayout, setCardLayout] = useState(false)

	useEffect(() => {
		pullChampions()
		setLoader(true)
	}, [])

	const pullChampions = async () => {
		try {
			const data = await axiosAPI.get()
			setCards(data.data.items)
			setLoader(false)
		} catch (err) {
			setLoader(false)
			throw new Error(err)
		}
	}

	let indexOfLastChamp, indexOfFirstChamp, currentCards

	if (cards) {
		indexOfLastChamp = currentPage * cardsPerPage
		indexOfFirstChamp = indexOfLastChamp - cardsPerPage
		currentCards = cards.slice(indexOfFirstChamp, indexOfLastChamp)
	}

	//change page
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber)
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
		axiosAPI
			.post("/", championData)
			.then(() => setSuccessMessage((prev) => !prev))
			.then(() => setAddChamp(false))
			.then(() => pullChampions())
	}

	const layoutHandler = () => setCardLayout((prevstate) => !prevstate)

	const addChampModalHandler = () => setAddChamp((prevState) => !prevState)

	const cardSectionClasses = ["card-section"]
	if (cardLayout) {
		cardSectionClasses.push("long-card-section")
	}

	const cardsDisplay = []
	if (currentCards) {
		currentCards.map((champion) => {
			return cardsDisplay.push(
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
			<Banner cardLayout={layoutHandler} addChampion={addChampModalHandler} />
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
			{loader ? <Spinner /> : null}
			<section className="card-page">
				<div className={cardSectionClasses.join(" ")}>
					{cardLayout ? (
						<>{cardsDisplay.map((card) => card)}</>
					) : (
						<>{cardsDisplay.map((card) => card)} </>
					)}
				</div>
				{cards ? (
					<Pagination
						cardsPerPage={cardsPerPage}
						paginate={paginate}
						totalCards={cards.length}
					/>
				) : null}
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
