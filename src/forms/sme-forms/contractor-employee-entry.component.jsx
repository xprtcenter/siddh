import React from "react";
import FormInput from "../../component/form-input/form-input.component";
import CustomButton from "../../component/custom-button/custom-button.component";
import avatar from "../../assets/avatar.png";

import "./sme-reg.styles.scss";
import { firestore } from "../../firebase/firebase.utils";

class ContractorEmployeeEntry extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			EmployeeImagePreviewUrl: "",
			EmployeeImageStatus: "",
			EmployeeFile: "",
			CompanyName: "",
			email: "",
			EmployeeName: "",
			GaurdianName: "",
			Age: "",
			Gender: "",
			PAddress: "",
			CAddress: "",
			Mobile: "",
			Nationality: "",
			State: "",
			EmpIVRSNo: "",
			ExHCDate: "",
			TypeRejoiningNew: "",
			SupervisorName: "",
			SupMobile: "",
		};
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const db = firestore
			.collection("smeData")
			.doc("smeContractorEmployee")
			.collection("smeEmployeeDetails");
		let sData = {
			CompanyName: this.state.CompanyName,
			email: this.state.email,
			EmployeeName: this.state.EmployeeName,
			GaurdianName: this.state.GaurdianName,
			Age: this.state.Age,
			Gender: this.state.Gender,
			PAddress: this.state.PAddress,
			CAddress: this.state.CAddress,
			Mobile: this.state.Mobile,
			Nationality: this.state.Nationality,
			State: this.state.State,
			EmpIVRSNo: this.state.EmpIVRSNo,
			ExHCDate: this.state.ExHCDate,
			TypeRejoiningNew: this.state.TypeRejoiningNew,
			SupervisorName: this.state.SupervisorName,
			SupMobile: this.state.SupMobile,
		};

		db.add(sData)
			.then(() => {
				console.log("Created new item successfully!");
				this.setState({
					CompanyName: "",
					email: "",
					EmployeeName: "",
					GaurdianName: "",
					Age: "",
					Gender: "",
					PAddress: "",
					CAddress: "",
					Mobile: "",
					Nationality: "",
					State: "",
					EmpIVRSNo: "",
					ExHCDate: "",
					TypeRejoiningNew: "",
					SupervisorName: "",
					SupMobile: "",
				});
			})
			.catch((e) => {
				console.log(e);
			});
	};

	handleChange = (event) => {
		const { name, value } = event.target;

		this.setState({ [name]: value });
	};

	render() {
		const {
			CompanyName,
			EmployeeName,
			GaurdianName,
			EmployeeImagePreviewUrl,
			EmployeeImageStatus,
			EmployeeFile,
			Age,
			Gender,
			PAddress,
			CAddress,
			Mobile,
			Nationality,
			State,
			EmpIVRSNo,
			ExHCDate,
			TypeRejoiningNew,
			SupervisorName,
			SupMobile,
			email,
		} = this.state;

		return (
			<form className="form-container" onSubmit={this.handleSubmit}>
				<h2 className="title">Company Employee Registration form</h2>

				<div className="image-form-page">
					<div className="image-container">
						<div className="imgPreview">
							{EmployeeImagePreviewUrl ? (
								<img src={EmployeeImagePreviewUrl} alt="" />
							) : (
								<img src={avatar} alt="" />
							)}
						</div>
						<div className="status">
							<h4>{EmployeeImageStatus}</h4>
						</div>
						<input type="file" onChange={this.handleImage} />
						<div
							className="button-upload"
							onClick={() => this.handleImageUpload(EmployeeFile)}
						>
							Upload
						</div>
					</div>
					<div className="tab-container">
						<FormInput
							type="text"
							name="CompanyName"
							value={CompanyName}
							onChange={this.handleChange}
							label="Company Name"
							required
						/>

						<FormInput
							type="text"
							name="EmployeeName"
							value={EmployeeName}
							onChange={this.handleChange}
							label="Employee Name"
							required
						/>

						<FormInput
							type="text"
							name="GaurdianName"
							value={GaurdianName}
							onChange={this.handleChange}
							label="Gaurdian Name"
							required
						/>

						<FormInput
							type="text"
							name="Age"
							value={Age}
							onChange={this.handleChange}
							label="Age"
							required
						/>

						<FormInput
							type="text"
							name="Gender"
							value={Gender}
							onChange={this.handleChange}
							label="Gender"
							required
						/>
						<FormInput
							type="text"
							name="PAddress"
							value={PAddress}
							onChange={this.handleChange}
							label="Pearmanent Address"
						/>

						<FormInput
							type="text"
							name="CAddress"
							value={CAddress}
							onChange={this.handleChange}
							label="Current Address"
							required
						/>
						<FormInput
							type="text"
							name="Mobile"
							value={Mobile}
							onChange={this.handleChange}
							label="Mobile No."
							required
						/>
						<FormInput
							type="email"
							name="email"
							value={email}
							onChange={this.handleChange}
							label="Employee Email"
							required
						/>
						<FormInput
							type="text"
							name="Nationality"
							value={Nationality}
							onChange={this.handleChange}
							label="Nationality"
							required
						/>

						<FormInput
							type="text"
							name="State"
							value={State}
							onChange={this.handleChange}
							label="State"
							required
						/>

						<FormInput
							type="text"
							name="EmpIVRSNo"
							value={EmpIVRSNo}
							onChange={this.handleChange}
							label="Employee IVRS No"
							required
						/>

						<FormInput
							type="date"
							name="ExHCDate"
							value={ExHCDate}
							onChange={this.handleChange}
							label="Expected Health Checkup Date"
							required
						/>

						<FormInput
							type="text"
							name="TypeRejoiningNew"
							value={TypeRejoiningNew}
							onChange={this.handleChange}
							label="Type Rejoining/New"
							required
						/>
						<FormInput
							type="text"
							name="SupervisorName"
							value={SupervisorName}
							onChange={this.handleChange}
							label="Supervisor Name"
						/>

						<FormInput
							type="text"
							name="SupMobile"
							value={SupMobile}
							onChange={this.handleChange}
							label="Supervisor Mobile"
						/>
					</div>
				</div>

				<CustomButton type="submit" sizefix>
					SUBMIT
				</CustomButton>
			</form>
		);
	}
}
export default ContractorEmployeeEntry;
