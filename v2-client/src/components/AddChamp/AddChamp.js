import React, { useState } from "react"

const AddChamp = (props) => {
	const [champToAdd, setChampToAdd] = useState({
		name: "",
		type: "",
		lane: "",
		cost: "",
	})

	const addChampHandler = (e, val) => {
		let value = e.target.value
		let field = val
		setChampToAdd((prevState) => ({
			...prevState,
			[field]: value,
		}))
	}

	const fields = Object.keys(champToAdd)

	return (
		<>
			<form className="add-champion">
				<h1>Add a new champion:</h1>
				{fields.map((field) => (
					<>
						<label htmlFor="Name">{field}:</label>
						<input
							type="text"
							name={field}
							value={AddChamp.field}
							onChange={(e) => addChampHandler(e, field)}
						/>
					</>
				))}
				<button type="submit" onClick={(e) => props.clicked(champToAdd, e)}>
					Add Champ
				</button>
			</form>
		</>
	)
}

export default AddChamp
