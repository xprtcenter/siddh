import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({
	children,
	isGoogleSignIn,
	inverted,
	sizefix,
	...otherProps
}) => (
	<button
		className={`${inverted ? "inverted" : ""}  ${
			sizefix ? "btn-default" : ""
		} ${isGoogleSignIn ? "google-sign-in" : ""} " custom-button "`}
		{...otherProps}
	>
		{children}
	</button>
);
export default CustomButton;
