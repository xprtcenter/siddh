import React, { useState } from "react";
import xraysample from "../../assets/xraysample.jpg";
import "./xray-images.styles.scss";
import FormInput from "../form-input/form-input.component";
const initialstate = {
	date: "",
	search: "",
};
const XrayImages = () => {
	const [data, setData] = useState(initialstate);

	const { date, search } = data;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};
	return (
		<div className="page-container">
			<div className="toolbar">
				<FormInput
					name="date"
					type="date"
					value={date}
					handleChange={handleChange}
					label="Date"
					required
				/>
				<FormInput
					name="search"
					type="text"
					value={search}
					handleChange={handleChange}
					label="Search"
					required
				/>
			</div>
			<div className="image-container">
				<div className="image">
					<img src={xraysample} alt="img" />
				</div>
				<div className="text-box">
					<p className="text-header">Rakesh Maourya</p>
					<span>date:25-05-2021</span>
				</div>
			</div>
		</div>
	);
};
export default XrayImages;
