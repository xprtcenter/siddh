import React from "react";

import FormInput from "../../component/form-input/form-input.component";
import CustomButton from "../../component/custom-button/custom-button.component";
import { firestore } from "../../firebase/firebase.utils";
import ParollEmpRegService from "./payroll-emp-reg-service";
import ImageBox from "../../component/image-box/image-box.component";
import { storage } from "../../firebase/firebase.utils";

import { options } from "./payroll-dropdown.option";
import Select from "react-select";
var todayDate = new Date();
//todayDate.setDate(todayDate.getDate() + 2);
var finalDate = todayDate.toISOString().substr(0, 10);
const initialState = {
	Editid: "",

	EmployeeCode: "",
	EmployeeName: "",
	EmployeeGender: "",
	EmployeeDOB: "",
	EmployeeAddress: "",
	EmployeePAddress: "",
	EmployeeContact: "",
	EmployeeEmail: "",
	EmployeeDepartment: "",
	EmployeeStatusActive: "",
	EmployeeDateofJoining: finalDate,
	EmployeeDateofLeaving: "",
	EmployeeBasicSalary: "",
	EmployeeOnrollContractor: "",
	EmployeeBankName: "",
	EmployeeBankIFSCCode: "",
	EmployeeAccountNo: "",
	EmployeeUANNo: "",
	EmployeeESICNo: "",
	EmployeePANNo: "",
	EmployeeAadharNo: "",
	PayrollCompanyName: "VKBORL Hospital",
	EmployerCompanyName: "xprt Hospital",
	ESICCalculation: "",
	TabtoggleState: 1,
};

class PayrollEmpRegMaster extends React.Component {
	constructor(props) {
		super(props);
		this.state = initialState;
		this.unsubscribe = undefined;
	}

	componentDidMount() {
		var getidArray = window.location.href.split("/");
		/* var getidArray = "2132sds"; */
		const getIDData = getidArray[getidArray.length - 1];
		const dbRef = firestore.doc(
			`payrollData/payrollEmpRegistration/payrollEmployee/${getIDData}`,
		);

		dbRef
			.get()
			.then((doc) => {
				if (doc.exists) {
					/* console.log("Document data:", doc.data()); */
					const newData = doc.data();
					this.setState({
						Editid: getIDData,
						EmployeeImgUrl: newData.EmployeeImgUrl,
						EmployeeCode: newData.EmployeeCode,
						EmployeeName: newData.EmployeeName,
						EmployeeGender: newData.EmployeeGender,
						EmployeeDOB: newData.EmployeeDOB,
						EmployeeAddress: newData.EmployeeAddress,
						EmployeePAddress: newData.EmployeePAddress,
						EmployeeContact: newData.EmployeeContact,
						EmployeeEmail: newData.EmployeeEmail,
						EmployeeDepartment: newData.EmployeeDepartment,
						EmployeeStatusActive: newData.EmployeeStatusActive,
						EmployeeDateofJoining: newData.EmployeeDateofJoining,
						EmployeeDateofLeaving: newData.EmployeeDateofLeaving,
						EmployeeBasicSalary: newData.EmployeeBasicSalary,
						EmployeeOnrollContractor: newData.EmployeeOnrollContractor,
						EmployeeBankName: newData.EmployeeBankName,
						EmployeeBankIFSCCode: newData.EmployeeBankIFSCCode,
						EmployeeAccountNo: newData.EmployeeAccountNo,
						EmployeeUANNo: newData.EmployeeUANNo,
						EmployeeESICNo: newData.EmployeeESICNo,
						EmployeePANNo: newData.EmployeePANNo,
						EmployeeAadharNo: newData.EmployeeAadharNo,
						PayrollCompanyName: newData.PayrollCompanyName,
						EmployeeImagePreviewUrl: newData.EmployeeImgUrl,
					});
				} else {
					// doc.data() will be undefined in this case
					console.log("No such document!");
				}
			})
			.catch((error) => {
				console.log("Error getting document:", error);
			});
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		if (this.state.EmployeeImgUrl) {
			let sData = {
				EmployeeImgUrl: this.state.EmployeeImgUrl,
				EmployeeCode: this.state.EmployeeCode,
				EmployeeName: this.state.EmployeeName,
				EmployeeGender: this.state.EmployeeGender,
				EmployeeDOB: this.state.EmployeeDOB,
				EmployeeAddress: this.state.EmployeeAddress,
				EmployeePAddress: this.state.EmployeePAddress,
				EmployeeContact: this.state.EmployeeContact,
				EmployeeEmail: this.state.EmployeeEmail,
				EmployeeDepartment: this.state.EmployeeDepartment,
				EmployeeStatusActive: this.state.EmployeeStatusActive,
				EmployeeDateofJoining: this.state.EmployeeDateofJoining,
				EmployeeDateofLeaving: this.state.EmployeeDateofLeaving,
				EmployeeBasicSalary: this.state.EmployeeBasicSalary,
				EmployeeOnrollContractor: this.state.EmployeeOnrollContractor,
				EmployeeBankName: this.state.EmployeeBankName,
				EmployeeBankIFSCCode: this.state.EmployeeBankIFSCCode,
				EmployeeAccountNo: this.state.EmployeeAccountNo,
				EmployeeUANNo: this.state.EmployeeUANNo,
				EmployeeESICNo: this.state.EmployeeESICNo,
				EmployeePANNo: this.state.EmployeePANNo,
				EmployeeAadharNo: this.state.EmployeeAadharNo,
				PayrollCompanyName: this.state.PayrollCompanyName,
			};
			if (!this.state.Editid) {
				ParollEmpRegService.create(sData)
					.then(() => {
						alert("Created new Employee successfully!");
						this.setState(initialState);
					})
					.catch((e) => {
						console.log(e);
					});
			} else {
				ParollEmpRegService.update(this.state.Editid, sData)
					.then(() => {
						alert("Employee Update successfully!");
						this.setState(initialState);
					})
					.catch((e) => {
						console.log(e);
					});
			}
		} else {
			alert("Please Upload Image first");
		}
	};

	handleChange = (event) => {
		const { name, value } = event.target;

		this.setState({ [name]: value });
	};

	render() {
		const {
			EmployeeCode,
			EmployeeName,
			EmployeeGender,
			EmployeeDOB,
			EmployeeAddress,
			EmployeePAddress,
			EmployeeContact,
			EmployeeEmail,
			EmployeeDepartment,
			EmployeeStatusActive,
			EmployeeDateofJoining,
			EmployeeDateofLeaving,
			EmployeeBasicSalary,
			EmployeeOnrollContractor,
			EmployeeBankName,
			EmployeeBankIFSCCode,
			EmployeeAccountNo,
			EmployeeUANNo,
			EmployeeESICNo,
			EmployeePANNo,
			EmployeeAadharNo,
			ESICCalculation,
			TabtoggleState,
		} = this.state;

		return (
			<form className="form-container" onSubmit={this.handleSubmit}>
				<h2 className="section-title">Employee Registration form</h2>
				<div className="base-form">
					<div className="bloc-tabs">
						<div
							className={TabtoggleState === 1 ? "tabs active-tabs" : "tabs"}
							onClick={() => this.setState({ TabtoggleState: 1 })}
						>
							Basic Info
						</div>
						<div
							className={TabtoggleState === 2 ? "tabs active-tabs" : "tabs"}
							onClick={() => this.setState({ TabtoggleState: 2 })}
						>
							Joining Info
						</div>
						<div
							className={TabtoggleState === 3 ? "tabs active-tabs" : "tabs"}
							onClick={() => this.setState({ TabtoggleState: 3 })}
						>
							Bank Info
						</div>
					</div>
					<div className="content-tabs">
						<div
							className={
								TabtoggleState === 1 ? "content  active-content" : "content"
							}
						>
							<h3 className="tab-title">Basic Information </h3>
							<div className="image-form-page">
								<ImageBox storageAddress="PayrollEmployeeImages" />
								<div className="tab-container">
									<FormInput
										type="number"
										name="EmployeeCode"
										value={EmployeeCode || ""}
										onChange={this.handleChange}
										label="Employee Code"
										required
									/>
									<FormInput
										type="text"
										name="EmployeeName"
										value={EmployeeName || ""}
										onChange={this.handleChange}
										label="Employee Name"
										required
									/>
									<Select
										className="form-dropdown"
										placeholder="Select Gender"
										value={
											options.Gender.find(
												(obj) => obj.value === EmployeeGender,
											) || ""
										} // set selected value
										options={options.Gender} // set list of the data
										onChange={(e) => {
											this.setState({ EmployeeGender: e.value });
										}} // assign onChange function
									/>

									<FormInput
										type="date"
										label="Date of Birth"
										name="EmployeeDOB"
										value={EmployeeDOB || ""}
										onChange={this.handleChange}
										required
									/>
									<FormInput
										type="text"
										name="EmployeeAddress"
										value={EmployeeAddress || ""}
										onChange={this.handleChange}
										label="Employee Address"
										required
									/>
									<FormInput
										type="text"
										name="EmployeePAddress"
										value={EmployeePAddress || ""}
										onChange={this.handleChange}
										label="Permanent Address"
										required
									/>
									<FormInput
										type="text"
										name="EmployeeContact"
										value={EmployeeContact || ""}
										onChange={this.handleChange}
										label="Employee Contact"
										required
									/>
									<FormInput
										type="email"
										name="EmployeeEmail"
										value={EmployeeEmail || ""}
										onChange={this.handleChange}
										label="Email Address"
										required
									/>
								</div>
							</div>
						</div>

						<div
							className={
								TabtoggleState === 2 ? "content  active-content" : "content"
							}
						>
							<h3 className="tab-title">Joining Information </h3>
							<div className="tab-container">
								<Select
									className="form-dropdown"
									placeholder="Select Department"
									value={
										options.Department.find(
											(obj) => obj.value === EmployeeDepartment,
										) || ""
									} // set selected value
									options={options.Department} // set list of the data
									onChange={(e) => {
										this.setState({ EmployeeDepartment: e.value });
									}} // assign onChange function
								/>
								<Select
									className="form-dropdown"
									placeholder="Active or De-active"
									value={
										options.Active.find(
											(obj) => obj.value === EmployeeStatusActive,
										) || ""
									} // set selected value
									options={options.Active} // set list of the data
									onChange={(e) => {
										this.setState({ EmployeeStatusActive: e.value });
									}} // assign onChange function
								/>
								<FormInput
									type="date"
									name="EmployeeDateofJoining"
									value={EmployeeDateofJoining || ""}
									onChange={this.handleChange}
									label="Date of Joining"
									required
								/>
								<FormInput
									type="date"
									name="EmployeeDateofLeaving"
									value={EmployeeDateofLeaving || ""}
									onChange={this.handleChange}
									label="Date of Leaving"
								/>
								<FormInput
									type="text"
									name="EmployeeESICNo"
									value={EmployeeESICNo || ""}
									onChange={this.handleChange}
									label="ESIC No"
									required
								/>
								<FormInput
									type="text"
									name="EmployeeUANNo"
									value={EmployeeUANNo || ""}
									onChange={this.handleChange}
									label="UAN No"
									required
								/>
								<FormInput
									type="text"
									name="EmployeeBasicSalary"
									value={EmployeeBasicSalary || ""}
									onChange={this.handleChange}
									label="Basic Salary"
									required
								/>
								<FormInput
									type="text"
									name="EmployeeOnrollContractor"
									value={EmployeeOnrollContractor || ""}
									onChange={this.handleChange}
									label="Onroll or Contractor"
									required
								/>
								<Select
									className="form-dropdown"
									placeholder="ESIC Calculation"
									value={
										options.ESIC.find((obj) => obj.value === ESICCalculation) ||
										""
									} // set selected value
									options={options.ESIC} // set list of the data
									onChange={(e) => {
										this.setState({ ESICCalculation: e.value });
									}} // assign onChange function
								/>
							</div>
						</div>

						<div
							className={
								TabtoggleState === 3 ? "content  active-content" : "content"
							}
						>
							<h3 className="tab-title">Bank Information </h3>
							<div className="tab-container">
								<FormInput
									type="text"
									name="EmployeePANNo"
									value={EmployeePANNo || ""}
									onChange={this.handleChange}
									label="PAN No"
									required
								/>
								<FormInput
									type="text"
									name="EmployeeAadharNo"
									value={EmployeeAadharNo || ""}
									onChange={this.handleChange}
									label="Aadhar No"
									required
								/>
								<FormInput
									type="text"
									name="EmployeeBankName"
									value={EmployeeBankName || ""}
									onChange={this.handleChange}
									label="Bank Name"
									required
								/>
								<FormInput
									type="text"
									name="EmployeeBankIFSCCode"
									value={EmployeeBankIFSCCode || ""}
									onChange={this.handleChange}
									label="IFSC Code"
									required
								/>
								<FormInput
									type="text"
									name="EmployeeAccountNo"
									value={EmployeeAccountNo || ""}
									onChange={this.handleChange}
									label="Account No"
									required
								/>
							</div>
						</div>
					</div>
				</div>
				<CustomButton type="submit" sizefix>
					SUBMIT
				</CustomButton>
			</form>
		);
	}
}
export default PayrollEmpRegMaster;
