import React from "react";

import FormInput from "../../component/form-input/form-input.component";
import CustomButton from "../../component/custom-button/custom-button.component";
import { firestore } from "../../firebase/firebase.utils";
import ReceptionOpdRegService from "./reception-opd-reg-service";
import ImageBox from "../../component/image-box/image-box.component";
import { storage } from "../../firebase/firebase.utils";

import { options } from "../Payroll-forms/payroll-dropdown.option";
import Select from "react-select";
var todayDate = new Date();
//todayDate.setDate(todayDate.getDate() + 2);
var finalDate = todayDate.toISOString().substr(0, 10);
const initialState = {
	Editid: "",
	DateofRegistration: finalDate,
	PatientName: "",
	PatientGender: "",
	PatientDOB: "",
	PatientAddress: "",
	PatientPAddress: "",
	PatientContact: "",
	PatientEmail: "",
	PatientDepartment: "",
	PatientDoctor: "",
	PatientDoctorSpecialisation: "",
	PatientAadharNo: "",
	TabtoggleState: 1,
	userRole: "Admin",
};

class ReceptionOpdRegistration extends React.Component {
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
			`receptionData/receptionOpdRegistration/opdPatient/${getIDData}`,
		);

		dbRef
			.get()
			.then((doc) => {
				if (doc.exists) {
					/* console.log("Document data:", doc.data()); */
					const newData = doc.data();
					this.setState({
						Editid: getIDData,
						PatientImgUrl: newData.PatientImgUrl,
						DateofRegistration: newData.DateofRegistration,

						PatientName: newData.PatientName,
						PatientGender: newData.PatientGender,
						PatientDOB: newData.PatientDOB,
						PatientAddress: newData.PatientAddress,
						PatientPAddress: newData.PatientPAddress,
						PatientContact: newData.PatientContact,
						PatientEmail: newData.PatientEmail,

						PatientAadharNo: newData.PatientAadharNo,
						PayrollCompanyName: newData.PayrollCompanyName,
						PatientImagePreviewUrl: newData.PatientImgUrl,
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
				PatientImgUrl: this.state.PatientImgUrl,
				DateofRegistration: this.state.DateofRegistration,
				PatientName: this.state.PatientName,
				PatientGender: this.state.PatientGender,
				PatientDOB: this.state.PatientDOB,
				PatientAddress: this.state.PatientAddress,
				PatientPAddress: this.state.PatientPAddress,
				PatientContact: this.state.PatientContact,
				PatientEmail: this.state.PatientEmail,
				PatientAadharNo: this.state.PatientAadharNo,
			};
			if (!this.state.Editid) {
				ReceptionOpdRegService.create(sData)
					.then(() => {
						alert("Created new Patient successfully!");
						this.setState(initialState);
					})
					.catch((e) => {
						console.log(e);
					});
			} else {
				ReceptionOpdRegService.update(this.state.Editid, sData)
					.then(() => {
						alert("Patient Update successfully!");
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
			DateofRegistration,
			PatientName,
			PatientGender,
			PatientDOB,
			PatientAddress,
			PatientPAddress,
			PatientContact,
			PatientEmail,
			PatientAadharNo,
			TabtoggleState,
			userRole,
		} = this.state;

		return (
			<form className="form-container" onSubmit={this.handleSubmit}>
				<h2 className="section-title">Patient Registration form</h2>
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
								<ImageBox storageAddress="PayrollPatientImages" />
								<div className="tab-container">
									<FormInput
										type="date"
										label="Date of Registration"
										name="DateofRegistration"
										value={DateofRegistration || ""}
										onChange={this.handleChange}
										required
										readonly={userRole === "Admin" ? "true" : false}
									/>

									<FormInput
										type="text"
										name="PatientName"
										value={PatientName || ""}
										onChange={this.handleChange}
										label="Patient Name"
										required
									/>
									<Select
										className="form-dropdown"
										placeholder="Select Gender"
										value={
											options.Gender.find(
												(obj) => obj.value === PatientGender,
											) || ""
										} // set selected value
										options={options.Gender} // set list of the data
										onChange={(e) => {
											this.setState({ PatientGender: e.value });
										}} // assign onChange function
									/>

									<FormInput
										type="date"
										label="Date of Birth"
										name="PatientDOB"
										value={PatientDOB || ""}
										onChange={this.handleChange}
										required
									/>
									<FormInput
										type="text"
										name="PatientAddress"
										value={PatientAddress || ""}
										onChange={this.handleChange}
										label="Patient Address"
										required
									/>
									<FormInput
										type="text"
										name="PatientPAddress"
										value={PatientPAddress || ""}
										onChange={this.handleChange}
										label="Permanent Address"
										required
									/>
									<FormInput
										type="text"
										name="PatientContact"
										value={PatientContact || ""}
										onChange={this.handleChange}
										label="Patient Contact"
										required
									/>
									<FormInput
										type="email"
										name="PatientEmail"
										value={PatientEmail || ""}
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
									name="PatientAadharNo"
									value={PatientAadharNo || ""}
									onChange={this.handleChange}
									label="Aadhar No"
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
export default ReceptionOpdRegistration;
