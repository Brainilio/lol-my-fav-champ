import React, { useEffect, useRef, useState } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Logo from "../assets/riot.png"
import { gsap } from "gsap"
import Landing from "./Landing/Landing"
import Cards from "./Cards/Cards"
import Login from "./Login/Login"
import Logout from "./Cards/Logout/Logout"
import * as actions from "../store/actions"
import { connect } from "react-redux"

function App(props) {
	useEffect(() => {
		// try to log in
		props.tryAutoSignUp()
	}, [])

	let routes = (
		<>
			<Route path="/" exact component={Landing} />
			<Route path="/login" component={Login} />
		</>
	)

	if (props.isAuthenticated) {
		routes = (
			<>
				<Route path="/" exact component={Landing} />
				<Route path="/logout" component={Logout} />
				<Route path="/login" component={Login} />
				<Route path="/dashboard" component={Cards} />
			</>
		)
	}

	return (
		<>
			<Switch>{routes}</Switch>
			{/* <Redirect to="/" /> */}
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
