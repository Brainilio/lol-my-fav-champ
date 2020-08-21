import React, { useState } from "react"

const AddChamp = (props) => {

	return (
		<form className="add-champion">
			<input type="text" name="name" value />
			<input type="text" name="type" value />
			<input type="text" name="lane" value />
			<input type="number" name="cost" value />
			<button type="submit">Add Champ</button>
		</form>
	)
}

export default AddChamp
