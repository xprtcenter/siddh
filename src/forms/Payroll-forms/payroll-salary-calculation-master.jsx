import React, { useState, useEffect } from "react";
import FormInput from "../../component/form-input/form-input.component";
import Select from "react-select";
import CustomButton from "../../component/custom-button/custom-button.component";
import { firestore } from "../../firebase/firebase.utils";
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
		status: "",
	};
	const [state, setState] = useState(initialState);
	const [companyNameList, setCompanynameList] = useState({ companyList: [] });
	const handleChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	useEffect(() => {
		if (companyNameList.companyList.length === 0) {
			const company = firestore
				.collection("payrollData")
				.doc("payrollMaster")
				.collection("payrollCompany");
			company.onSnapshot((items) => {
				let companyList1 = [];
				items.forEach((item) => {
					let data = item.data();
					companyList1.push({
						value: item.id,
						label: data.EmployerCompanyName,
						status: data.status,
					});
				});
				const companyList = companyList1.filter(
					(item) => item.status === "Active",
				);
				console.log(companyList);
				setCompanynameList({ companyList });
			});
		}
	}, []);
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
		status,
	} = state;

	/* var companyName = [
		{ value: "1", label: "xprt computer center" },
		{ value: "2", label: "Royal Enterprises" },
	]; */
	return (
		<form className="form-container">
			<h2 className="section-title">Payroll Salary Caculation Master Page</h2>
			<Select
				className="form-dropdown form-dropdown-center"
				placeholder="Select Employer Company Name"
				value={
					companyNameList.companyList.find(
						(obj) => obj.label === EmployerCompanyName,
					) || ""
				} // set selected value
				options={companyNameList.companyList} // set list of the data
				onChange={(e) => {
					setState({ ...state, EmployerCompanyName: e.label });
				}} // assign onChange function
			/>
			<div className="base-form">
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
				<FormInput
					type="text"
					name="status"
					value={status || ""}
					onChange={handleChange}
					label="Status"
					required
				/>
			</div>
			<CustomButton type="submit" sizefix>
				SUBMIT
			</CustomButton>
		</form>
	);
};

export default PayrollSalaryCaculationMaster;
