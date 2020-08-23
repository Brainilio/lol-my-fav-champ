import React from "react"
import bannerImg from "../../assets/banner.png"
import icon from "../../assets/icon.png"
import "./Banner.scss"

const Banner = (props) => {
	return (
		<div className="banner">
			<img className="background-img-banner" src={bannerImg} alt="" />
			<div className="profile-info">
				<img src={icon} alt="icon" />
				<h1>Welcome, username</h1>
			</div>

			<div className="tool-buttons">
				<button onClick={props.addChampion}>ADD CHAMPION</button>
				<button onClick={props.cardLayout}>CHANGE LAYOUT</button>
			</div>
		</div>
	)
}

export default Banner
