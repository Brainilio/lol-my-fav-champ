import React from "react"
import Gif from "../../../assets/giphy.gif"
import { connect } from "react-redux"

const Officialdata = (props) => {
	// show a loader or error image if there is no riot data about champion
	let officialData = (
		<div className="official-data">
			<h1>Couldn't find any official data on your champion!</h1>
			<span>Does your champion exist?</span>
			<img src={Gif} alt="Bard floating" />
			<span style={{ color: "grey" }}>Data provided by Riot Games</span>
		</div>
	)

	// if fetched riot data; pull in riot data and display
	if (props.champInfo) {
		for (const key in props.champInfo) {
			const championInfo = props.champInfo[key]

			officialData = (
				<div className="official-data">
					<p>{championInfo.lore}</p>
					<hr className="solid" />
					<div className="tips">
						<div className="allies">
							<span>Ally tips</span>
							<ul>
								{championInfo.allytips.slice(0, 2).map((tip) => (
									<li key={tip}>{tip}</li>
								))}
							</ul>
						</div>
						<div className="enemies">
							<span>Enemy tips</span>
							<ul>
								{championInfo.enemytips.slice(0, 2).map((tip) => (
									<li key={tip}>{tip}</li>
								))}
							</ul>
						</div>
					</div>
					<span>Data provided by Riot Games</span>
				</div>
			)
		}
	}

	return officialData
}

const mapStateToProps = (state) => {
	return {
		champInfo: state.champs.singleChampInfo,
	}
}

export default connect(mapStateToProps, null)(Officialdata)
