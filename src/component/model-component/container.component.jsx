import React, { Component } from "react";
import { Modal } from "./model-component";

export class Container extends Component {
	state = { isShown: false };

	showModal = () => {
		this.setState({ isShown: true }, () => {
			this.closeButton.focus();
		});
		this.toggleScrollLock();
	};
	closeModal = () => {
		this.setState({ isShown: false });
		this.TriggerButton.focus();
		this.toggleScrollLock();
	};
	onKeyDown = (event) => {
		if (event.keyCode === 27) {
			this.closeModal();
		}
	};
	onClickOutside = (event) => {
		if (this.modal && this.modal.contains(event.target)) return;
		this.closeModal();
	};
	toggleScrollLock = () => {
		document.querySelector("html").classList.toggle("scroll-lock");
	};
	render() {
		return (
			<React.Fragment>
				{this.props.btnstyle === "btn-icon" ? (
					<div
						className={this.props.btnstyle}
						ref={(n) => (this.TriggerButton = n)}
						onClick={this.showModal}
					>
						{this.props.triggerText}
					</div>
				) : (
					<button
						className={this.props.btnstyle}
						ref={(n) => (this.TriggerButton = n)}
						onClick={this.showModal}
					>
						{this.props.triggerText}
					</button>
				)}

				{this.state.isShown ? (
					<Modal
						modalRef={(n) => (this.modal = n)}
						buttonRef={(n) => (this.closeButton = n)}
						closeModal={this.closeModal}
						onKeyDown={this.onKeyDown}
						onClickOutside={this.onClickOutside}
						Form={this.props.Form}
						id={this.props.id}
						propdata={this.props.mydata}
					/>
				) : null}
			</React.Fragment>
		);
	}
}
export default Container;
