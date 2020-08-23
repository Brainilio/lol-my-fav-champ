// import React, { useRef, useEffect, useState } from "react"

// const Slider = (props) => {
// 	const slider = useRef()

// 	const [prevDisable, setPrevDisable] = useState(true)
// 	const [nextDisable, setNextDisable] = useState(
// 		slider.offsetWidth >= slider.scrollWidth ? true : false
// 	)
// 	useEffect(() => {
// 		console.log(slider.current.scrollLeft + 1)
// 	}, [slider])

// 	const checkButtons = (offsetWidthValue, scrollWidthValue) => {
// 		setPrevDisable(slider.scrollLeft <= 0 ? true : false)
// 		setNextDisable(
// 			slider.scrollLeft + offsetWidthValue >= scrollWidthValue ? true : false
// 		)
// 	}
// 	const offsetWidthValue = slider.current.offsetWidth
// 	const scrollWidthValue = slider.current.clientWidth
// 	return (
// 		<div ref={slider} className="slider-container">
// 			<div className="slider-wrapper">{props.children}</div>
// 			<div
// 				className={`btn prev ${prevDisable ? "disable" : ""}`}
// 				disabled={prevDisable}
// 				onClick={() => {
// 					slider.scrollLeft -= offsetWidthValue / 2
// 					checkButtons(offsetWidthValue, scrollWidthValue)
// 				}}
// 			>
// 				{"<"}
// 			</div>
// 			<div
// 				className={`btn next ${nextDisable ? "disable" : ""}`}
// 				disabled={nextDisable}
// 				onClick={() => {
// 					slider.scrollLeft += offsetWidthValue / 2
// 					checkButtons(offsetWidthValue, scrollWidthValue)
// 				}}
// 			>
// 				{">"}
// 			</div>
// 		</div>
// 	)
// }

// export default Slider

// import React, { Component } from "react"

// class Slider extends React.Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			prevDisable: true,
// 			nextDisable:
// 				this.refs && this.refs.offsetWidth >= this.refs.scrollWidth
// 					? true
// 					: false,
// 		}
// 	}

// 	componentDidMount() {
// 		this.checkButtons(this.refs.offsetWidth, this.refs.scrollWidth)
// 	}
// 	checkButtons = (offsetWidthValue, scrollWidthValue) => {
// 		this.setState({
// 			prevDisable: this.refs.current.scrollLeft <= 0 ? true : false,
// 			nextDisable:
// 				this.refs.scrollLeft + offsetWidthValue >= scrollWidthValue
// 					? true
// 					: false,
// 		})
// 	}

// 	render() {
// 		const offsetWidthValue = this.refs.getBoundingClientRect,
// 			scrollWidthValue = this.refs.scrollWidth
// 		return (
// 			<div
// 				className="slider-container"
// 				ref={(el) => {
// 					this.refs = el
// 				}}
// 			>
// 				<div className="slider-wrapper">{this.props.children}</div>
// 				<div
// 					className={`btn prev ${this.state.prevDisable ? "disable" : ""}`}
// 					disabled={this.state.prevDisable}
// 					onClick={() => {
// 						this.refs.scrollLeft -= offsetWidthValue / 2
// 						this.checkButtons(offsetWidthValue, scrollWidthValue)
// 					}}
// 				>
// 					{"<"}
// 				</div>
// 				<div
// 					className={`btn next ${this.state.nextDisable ? "disable" : ""}`}
// 					disabled={this.state.nextDisable}
// 					onClick={() => {
// 						this.refs.scrollLeft += offsetWidthValue / 2
// 						this.checkButtons(offsetWidthValue, scrollWidthValue)
// 					}}
// 				>
// 					{">"}
// 				</div>
// 			</div>
// 		)
// 	}
// }

// export default Slider
