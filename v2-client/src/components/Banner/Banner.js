import React from "react"
import bannerImg from "../../assets/banner.png"
import { NavLink } from "react-router-dom"
import icon from "../../assets/icon.png"
import { connect } from "react-redux"
import "./Banner.scss"

const Banner = (props) => {
	return (
		<div className="banner">
			<NavLink
				className="log-out-button"
				style={{
					position: "absolute",
					top: 15,
					left: 15,
				}}
				to="/logout"
			>
				<button className="log-out-button">LOG OUT</button>
			</NavLink>
			<img className="background-img-banner" src={bannerImg} alt="" />
			<div className="profile-info">
				<img src={icon} alt="icon" />
				<h1>Welcome, {props.name}</h1>
			</div>

			<div className="tool-buttons">
				<button onClick={props.addChampion}>ADD CHAMPION</button>
				<button onClick={props.cardLayout}>CHANGE LAYOUT</button>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		name: state.auth.name,
	}
}

export default connect(mapStateToProps, null)(Banner)
