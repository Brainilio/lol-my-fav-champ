import React, { useEffect, useRef, useState } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
// import Logo from "../assets/riot.png"
import { gsap } from "gsap"
import Landing from "./Landing/Landing"
import Cards from "./Cards/Cards"
import Login from "./Login/Login"
import Logout from "./Cards/Logout/Logout"
import * as actions from "../store/actions"
import { connect } from "react-redux"

function App(props) {
	const divOne = useRef(null)
	const divTwo = useRef(null)
	const logo = useRef(null)

	// get rid of dom elements after loader is over
	const [shouldIntroExist, setShouldIntroExist] = useState(false)

	useEffect(() => {
		console.log("I'm re-rendering!")
		introHandler()
		// try to log in
		props.tryAutoSignUp()
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

	let routes = (
		<>
			<Route path="/login" component={Login} />
			<Route path="/" exact component={Landing} />
		</>
	)

	if (props.isAuthenticated) {
		routes = (
			<>
				<Route path="/logout" component={Logout} />
				<Route path="/login" component={Login} />
				<Route path="/dashboard" component={Cards} />
				<Route path="/" exact component={Landing} />
			</>
		)
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

			<Switch>{routes}</Switch>
			<Redirect to="/login" />
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		tryAutoSignUp: () => dispatch(actions.authCheckState()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
