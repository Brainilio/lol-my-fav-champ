import React, { useEffect, useRef, useState } from "react"
import Logo from "../../assets/riot.png"
import { gsap } from "gsap"
import background from "../../assets/landingbackground.png"
import { NavLink } from "react-router-dom"
import phone from "../../assets/phone.png"
import "./Landing.scss"

const Landing = (props) => {
	const divOne = useRef(null)
	const divTwo = useRef(null)
	const logo = useRef(null)

	// get rid of dom elements after loader is over
	const [shouldIntroExist, setShouldIntroExist] = useState(true)

	useEffect(() => {
		console.log("I'm re-rendering!")
		introHandler()
		// try to log in
		//remove divs after 2 seconds
		setTimeout(() => {
			setShouldIntroExist(false)
		}, 5000)
	}, [divOne, divTwo, logo])

	const introHandler = () => {
		gsap.to(logo.current, { rotation: 720, duration: 4, ease: "power4" })
		gsap.to(divOne.current, {
			x: -window.innerWidth,
			duration: 5,
			ease: "bounce",
			delay: 3,
		})
		gsap.to(divTwo.current, {
			x: window.innerWidth,
			duration: 5,
			ease: "bounce",
			delay: 3,
		})
		gsap.to(logo.current, {
			y: -window.innerWidth,
			duration: 0.8,
			ease: "power",
			delay: 3,
		})
	}
	return (
		<>
			{shouldIntroExist ? (
				<>
					<img ref={logo} className="riot-logo" src={Logo} alt="riot logo" />
					<section
						className="intro"
						style={{ height: "100vh", display: "flex", position: "absolute" }}
					>
						<div ref={divOne} className="intro-half-one"></div>
						<div ref={divTwo} className="intro-half-two"></div>
					</section>
				</>
			) : (
				<>
					<section className="Landing">
						<img className="background-img" src={background} alt="background" />
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
				</>
			)}
		</>
	)
}

export default Landing
