import React, { useState, useEffect } from "react";
import FormInput from "../../component/form-input/form-input.component";
import Select from "react-select";
import { Link } from "react-router-dom";
import CustomButton from "../../component/custom-button/custom-button.component";

const PayrollSalaryCaculationMaster = () => {
	const initialState = {
		Editid: "",
		pfEmployee: "",
		pfEmployer: "",
		esicEmployee: "",
		esicEmployer: "",
		UnSkilled: "",
		SemiSkiled: "",
		Skilled: "",
		HighSkilled: "",
		FixBasic: "",
		EmployerCompanyName: "",
		PayrollCompanyName: "VKBORL Hospital",
		mydata: [],
		fillStatus: 1,
	};
	const [state, setState] = useState(initialState);
	const handleChange = () => {};
	const {
		pfEmployee,
		pfEmployer,
		esicEmployee,
		esicEmployer,
		UnSkilled,
		SemiSkiled,
		Skilled,
		HighSkilled,
		FixBasic,
		EmployerCompanyName,
		PayrollCompanyName,

		fillStatus,
	} = state;

	var companyName = [
		{ value: "1", label: "xprt computer center" },
		{ value: "2", label: "Royal Enterprises" },
	];
	return (
		<React.Fragment>
			<form className="form-container">
				<h2 className="section-title">Payroll Salary Caculation Master Page</h2>
				<div className="base-form">
					<Select
						className="dropdown-menu"
						placeholder="Select Employer Company Name"
						value={
							companyName.find((obj) => obj.label === EmployerCompanyName) || ""
						} // set selected value
						options={companyName} // set list of the data
						onChange={(e) => {
							setState({
								...state,
								EmployerCompanyName: e.label,
							});
						}} // assign onChange function
					/>
					<FormInput
						type="number"
						name="pfEmployee"
						value={pfEmployee || ""}
						onChange={handleChange}
						label="PF Employee in %"
						required
					/>
					<FormInput
						type="number"
						name="pfEmployer"
						value={pfEmployer || ""}
						onChange={handleChange}
						label="PF Employer in %"
						required
					/>
					<FormInput
						type="number"
						name="esicEmployee"
						value={esicEmployee || ""}
						onChange={handleChange}
						label="ESIC Employee in %"
						required
					/>
					<FormInput
						type="number"
						name="esicEmployer"
						value={esicEmployer || ""}
						onChange={handleChange}
						label="ESIC Employer in %"
						required
					/>
					<FormInput
						type="number"
						name="UnSkilled"
						value={UnSkilled || ""}
						onChange={handleChange}
						label="Unskilled"
						required
					/>
					<FormInput
						type="number"
						name="SemiSkiled"
						value={SemiSkiled || ""}
						onChange={handleChange}
						label="Employer Code"
						required
					/>
					<FormInput
						type="number"
						name="Skilled"
						value={Skilled || ""}
						onChange={handleChange}
						label="Skilled"
						required
					/>
					<FormInput
						type="number"
						name="HighSkilled"
						value={HighSkilled || ""}
						onChange={handleChange}
						label="Highely Skilled"
						required
					/>
					<FormInput
						type="number"
						name="FixBasic"
						value={FixBasic || ""}
						onChange={handleChange}
						label="Fix Basic"
						required
					/>
				</div>
			</form>
		</React.Fragment>
	);
};

export default PayrollSalaryCaculationMaster;
