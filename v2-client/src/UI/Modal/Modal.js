import React from "react"
import Backdrop from "../Backdrop/Backdrop"
import { Component } from "react"
import Exit from "../Exit/Exit"

class Modal extends Component {
	//if show == true
	shouldComponentUpdate(nextProps, nextState) {
		//returns true if next props is not the same as this.props.show.
		return (
			nextProps.show !== this.props.show ||
			nextProps.children !== this.props.children
		)
	}

	render() {
		return (
			<>
				<Backdrop show={this.props.clicked} clicked={this.props.clicked} />

				<div className="Modal">
					<Exit clicked={this.props.clicked} />
					{this.props.children}
				</div>
			</>
		)
	}
}

export default Modal
