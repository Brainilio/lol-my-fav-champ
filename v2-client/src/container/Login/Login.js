import React, { useState } from "react"
import "./Login.scss"
import background from "../../assets/loginbackground.png"
import { NavLink, Redirect } from "react-router-dom"
import * as actions from "../../store/actions/index"
import { connect } from "react-redux"

const Login = (props) => {
	const [signup, setsignup] = useState(false)
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
	})

	const formHandler = (e) => {
		let tag = e.target.name
		let value = e.target.value
		setForm({
			...form,
			[tag]: value,
		})
	}

	const submitForm = (e) => {
		e.preventDefault()
		props.submitForm(form, signup)
	}

	let authRedirect = <Redirect to="/login" />
	if (props.isAuthenticated) {
		authRedirect = <Redirect to="/dashboard" />
	}

	return (
		<section className="Login">
			{authRedirect}
			<img src={background} alt="" />
			{signup ? (
				<form className="login-form">
					<h1>SIGNUP</h1>
					<label htmlFor="name">Name</label>
					<input
						name="name"
						type="text"
						onChange={(e) => formHandler(e)}
						value={form.name}
					/>
					<label htmlFor="email">Email</label>
					<input
						type="text"
						name="email"
						onChange={(e) => formHandler(e)}
						value={form.email}
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						onChange={(e) => formHandler(e)}
						value={form.password}
					/>
					<button onClick={(e) => submitForm(e)}>SIGNUP</button>
					<span onClick={() => setsignup((prevstate) => !prevstate)}>
						OR LOG IN
					</span>
				</form>
			) : (
				<form className="login-form">
					<h1>LOGIN</h1>
					<label htmlFor="email">Email</label>
					<input
						type="text"
						name="email"
						onChange={(e) => formHandler(e)}
						value={form.email}
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						onChange={(e) => formHandler(e)}
						value={form.password}
					/>
					<button onClick={(e) => submitForm(e)}>LOGIN</button>
					<span onClick={() => setsignup((prevstate) => !prevstate)}>
						OR SIGN UP
					</span>
				</form>
			)}
		</section>
	)
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		submitForm: (data, issignup) =>
			dispatch(actions.submitForm(data, issignup)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
