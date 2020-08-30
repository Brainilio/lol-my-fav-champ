import React from "react"
import background from "../../assets/landingbackground.png"
import { NavLink } from "react-router-dom"
import phone from "../../assets/phone.png"
import "./Landing.scss"

const Landing = () => {
	return (
		<section className="Landing">
			<img classname="background-img" src={background} alt="backgrround" />
			<div className="text">
				<h1>LOL: MY FAVORITE CHAMPION</h1>
				<p>
					Manage your favorite League of Legends champions in your own
					personalized dashboard. Now with real data from Riot Games!{" "}
				</p>

				<button>
					<NavLink
						to="/login"
						style={{ textDecoration: "none", color: "#1C4E7B" }}
					>
						JOIN NOW
					</NavLink>
				</button>
			</div>
			<img className="phone" src={phone} />
		</section>
	)
}

export default Landing
