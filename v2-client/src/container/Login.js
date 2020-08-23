import React from "react"
import "./Login.scss"
import background from "../assets/loginbackground.png"
import { NavLink } from "react-router-dom"

const Login = () => {
	return (
		<section className="Login">
			<img src={background} alt="" />
			<form className="login-form">
				<h1>LOGIN</h1>
				<label htmlFor="email">Email</label>
				<input type="text" />
				<label htmlFor="password">Password</label>
				<input type="password" />
				<button>
					<NavLink
						to="/dashboard"
						style={{ textDecoration: "none", color: "#f9e09c" }}
					>
						LOGIN
					</NavLink>
				</button>
				<span>OR SIGN UP</span>
			</form>
		</section>
	)
}

export default Login
