import React from "react"
import { connect } from "react-redux"

const ChampImage = (props) =>
	props.champImage ? (
		<img
			className="champion-image"
			draggable="false"
			src={props.champImage}
			alt="Champion"
		/>
	) : null

const mapStateToProps = (state) => {
	return {
		champImage: state.champs.singleChampImage,
	}
}

export default connect(mapStateToProps, null)(ChampImage)
