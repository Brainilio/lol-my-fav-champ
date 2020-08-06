import React, { useEffect, useRef } from "react"
import Logo from "./assets/riot.png"
import { gsap } from "gsap"

function App() {
	const divOne = useRef(null)
	const divTwo = useRef(null)
	const logo = useRef(null)

	useEffect(() => {
		console.log("I'm re-rendering!")
		gsap.to(logo.current, { rotation: 720, duration: 4, ease: "power4" })
		gsap.to(divOne.current, {
			x: -window.innerWidth,
			duration: 5,
			ease: "bounce",
		})
		gsap.to(divTwo.current, {
			x: window.innerWidth,
			duration: 5,
			ease: "bounce",
		})
		gsap.to(logo.current, { y: -350, duration: 0.8, ease: "power", delay: 3 })
	}, [gsap, divOne, divTwo, logo])

	return (
		<>
			<section style={{ height: "100vh", display: "flex" }}>
				<div ref={divOne} className="intro-half-one"></div>
				<div ref={divTwo} className="intro-half-two"></div>
				<img ref={logo} className="riot-logo" src={Logo} alt="riot logo" />
			</section>
		</>
	)
}

export default App
