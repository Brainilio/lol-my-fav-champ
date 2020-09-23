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
import * as actions from "../../store/actions/index"
import { connect } from "react-redux"

const Cards = (props) => {
	const [addChamp, setAddChamp] = useState(false)

	const [currentPage, setCurrentPage] = useState(1)
	const [cardsPerPage, setCardsPerPage] = useState(5)

	const [champId, setChampId] = useState(null)
	const [detailChamp, setDetailChamp] = useState(false)

	const [succesMessage, setSuccessMessage] = useState(true)
	const [cardLayout, setCardLayout] = useState(false)

	useEffect(() => {
		props.onFetchChamps()
	}, [])

	let indexOfLastChamp, indexOfFirstChamp, currentCards
	const cardSectionClasses = ["card-section"]

	// --------------- PAGINATION
	if (props.champs) {
		indexOfLastChamp = currentPage * cardsPerPage
		indexOfFirstChamp = indexOfLastChamp - cardsPerPage
		currentCards = props.champs.slice(indexOfFirstChamp, indexOfLastChamp)
	}
	//change page
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	const toggleModal = (id) => {
		setDetailChamp((prevState) => !prevState)
		setChampId(id)
	}

	const closeFormForAdding = () => {
		setAddChamp((prevState) => !prevState)
	}

	const editChampion = () => {
		setDetailChamp(false)
	}

	const deleteChamp = (id) => {
		props.deleteChampion(id)
		props.onFetchChamps()
		setDetailChamp(false)
	}

	const addChampion = (championData, event) => {
		event.preventDefault()
		props.addChampion(championData)
		setSuccessMessage((prev) => !prev)
		setAddChamp(false)
	}

	const layoutHandler = () => {
		setCardLayout((prevstate) => !prevstate)
	}

	const addChampModalHandler = () => setAddChamp((prevState) => !prevState)

	if (cardLayout) {
		cardSectionClasses.push("long-card-section")
	}

	// All the cards
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
			{/* Banner */}
			<Banner cardLayout={layoutHandler} addChampion={addChampModalHandler} />

			{/* Add champ modal */}
			{addChamp ? (
				<Modal clicked={closeFormForAdding}>
					<AddChamp clicked={addChampion} />
				</Modal>
			) : null}

			{/* Detail modal */}
			{detailChamp ? (
				<Modal clicked={toggleModal}>
					<ChampDetail
						id={champId}
						editThisChamp={editChampion}
						deleteChamp={deleteChamp}
					/>
				</Modal>
			) : null}

			{/* Title of page */}
			<h1
				style={{
					textAlign: "center",
					margin: "100px 0",
				}}
				className="title-card-page"
			>
				My League of Legends Champions:
			</h1>

			{/* Success message */}
			{succesMessage ? (
				<h1
					style={{ color: "green", textAlign: "center" }}
					onClick={() => setSuccessMessage((prev) => !prev)}
				>
					Succesfully added your champion!
				</h1>
			) : null}

			{/* Spinner */}
			{props.loading ? <Spinner /> : null}

			{/* Card-page */}
			<section className="card-page">
				<div className={cardSectionClasses.join(" ")}>
					{cardLayout ? (
						<>{cardsDisplay.map((card) => card)}</>
					) : (
						<> {cardsDisplay.map((card) => card)} </>
					)}
				</div>
			</section>

			{/* Pagination */}
			{props.champs ? (
				<Pagination
					cardsPerPage={cardsPerPage}
					paginate={paginate}
					totalCards={props.champs.length}
				/>
			) : null}
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		champs: state.champs.champs,
		loading: state.champs.loading,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchChamps: () => dispatch(actions.fetchChamps()),
		deleteChampion: (id) => dispatch(actions.deleteChamp(id)),
		addChampion: (champData) => dispatch(actions.addChamp(champData)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)
