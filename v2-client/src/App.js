import React, { useEffect, useRef, useState } from "react"
import Logo from "./assets/riot.png"
import { gsap } from "gsap"

function App() {
	const divOne = useRef(null)
	const divTwo = useRef(null)
	const logo = useRef(null)

	const [divOneClass, setdivOneClass] = useState("intro-half-one")
	const [divTwoClass, setdivTwoClass] = useState("intro-half-two")

	useEffect(() => {
		console.log("I'm re-rendering!")

		introHandler()

		//remove divs after 2 seconds
		setTimeout(() => {
			setdivOneClass("intro-half-one-deleted")
			setdivTwoClass("intro-half-one-deleted")
		}, 5000)
	}, [gsap, divOne, divTwo, logo])

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
		gsap.to(logo.current, { y: -350, duration: 0.8, ease: "power", delay: 3 })
	}

	return (
		<>
			<section className="intro" style={{ height: "100vh", display: "flex" }}>
				<div ref={divOne} className={divOneClass}></div>
				<div ref={divTwo} className={divTwoClass}></div>
				<img ref={logo} className="riot-logo" src={Logo} alt="riot logo" />
			</section>
		</>
	)
}

export default App
