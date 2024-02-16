import "./burger.style.scss";
import React, { useState } from "react";

const BurgerMenu = () => {
	const { isOpen, setIsOpen } = useState(true);
	const setOpenState = () => {
		let reverseOpen = isOpen;
		setIsOpen(!reverseOpen);
	};

	return (
		<div
			className={isOpen ? `menu-burger-button` : `menu-burger-button-open`}
			onClick={() => {
				setOpenState();
			}}
		>
			<div className="menu-burger-button-burger"></div>
		</div>
	);
};

export default BurgerMenu;
