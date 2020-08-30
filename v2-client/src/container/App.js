import React, { useEffect, useRef, useState } from "react"
import { Switch, Route, NavLink, Redirect } from "react-router-dom"
import Logo from "../assets/riot.png"
import { gsap } from "gsap"
import Landing from "./Landing/Landing"
import Cards from "./Cards/Cards"
import Login from "./Login/Login"

function App() {
	const divOne = useRef(null)
	const divTwo = useRef(null)
	const logo = useRef(null)

	// get rid of dom elements after loader is over
	const [shouldIntroExist, setShouldIntroExist] = useState(false)

	useEffect(() => {
		console.log("I'm re-rendering!")
		introHandler()
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

	let cards = null
	if (!shouldIntroExist) {
		cards = <Cards />
	}

	return (
		<>
			{/* {shouldIntroExist ? (
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
			) : null}
			{cards} */}

			<Switch>
				<Route path="/" exact component={Landing} />
				<Route path="/dashboard" component={Cards} />
				<Route path="/login" component={Login} />
				<Route render={() => <h1>NOT FOUND</h1>} />
			</Switch>
		</>
	)
}

export default App
