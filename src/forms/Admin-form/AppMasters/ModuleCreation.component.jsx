import React, { useState } from "react";
import FormInput from "../../../component/form-input/form-input.component";
import CustomButton from "../../../component/custom-button/custom-button.component";
import ModuleDataService from "../module-service";
import "../../../component/formPage/formPage.styles.scss";

const ModuleCreation = () => {
	const initialstate = {
		ModuleName: "",
		imageUrl: "",
		linkUrl: "",
	};
	const [data, setData] = useState(initialstate);

	const handleSubmit = async (event) => {
		event.preventDefault();

		ModuleDataService.create(data)
			.then(() => {
				alert("Created new item successfully!");
				setData(initialstate);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setData({ ...data, [name]: value });
	};
	const { ModuleName, imageUrl, linkUrl } = data;
	return (
		<div className="form-page">
			<div className="form-container">
				<h2 className="title">Module Registration form</h2>
				<span>Register your module.</span>

				<form className="base-form" onSubmit={handleSubmit}>
					<FormInput
						type="text"
						name="ModuleName"
						value={ModuleName}
						onChange={handleChange}
						label="Module Name"
						required
					/>

					<FormInput
						type="text"
						name="linkUrl"
						value={linkUrl}
						onChange={handleChange}
						label="Module Path"
						required
					/>

					<FormInput
						type="text"
						name="imageUrl"
						value={imageUrl}
						onChange={handleChange}
						label="Image Url"
						required
					/>

					<CustomButton type="submit">SUBMIT</CustomButton>
				</form>
			</div>
		</div>
	);
};
export default ModuleCreation;
