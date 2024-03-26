import React from "react";

import "./form-input.styles.scss";

const FormInput = ({ onChange, label, type, ...otherProps }) => {
	return (
		<div className="group">
			<input
				className={`${
					otherProps.type === "date"
						? "date-picker-after"
						: otherProps.value.length
						? "date-picker"
						: ""
				} form-input`}
				onChange={onChange}
				type={type}
				{...otherProps}
			/>
			{label ? (
				<label
					className={`${
						otherProps.value.length ? "shrink" : ""
					} form-input-label`}
				>
					{label}
				</label>
			) : null}
		</div>
	);
};
export default FormInput;
