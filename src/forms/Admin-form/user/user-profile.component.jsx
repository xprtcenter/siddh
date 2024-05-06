import React, { useState } from "react";
import FormInput from "../../component/form-input/form-input.component";
import CustomButton from "../../component/custom-button/custom-button.component";
import UserDataServices from "./user-services";
import "./user-profile.styles.scss";
import { storage } from "../../firebase/firebase.utils";

const UserProfile = () => {
	/* 
	const initialstate = {
		DisplayName: "",
		EmailId: "",
		password: "",
		confirmPassword: "",
		profilepicUrl: "",
		profilepicPreviewUrl: "",
		profilePicStatus: "",
		profilePicFile: "",
		gender: "",
		MobileNo: "",
		State: "",
		Country: "",
		Permission: [],
	};
	const [data, setData] = useState(initialstate);

	const handleSubmit = async (event) => {
		event.preventDefault();

		UserDataServices.create(data)
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

	const handleImage = (e) => {
		e.preventDefault();

		let profilePicFile = e.target.files[0];

		if (profilePicFile !== undefined) {
			let reader = new FileReader();
			reader.onloadend = () => {
				this.setState({
					profilePicFile: profilePicFile,
					profilepicPreviewUrl: reader.result,
				});
			};

			reader.readAsDataURL(profilePicFile);
		} else {
			this.setState({
				profilePicFile: "",
				profilepicPreviewUrl: "",
				CompanyLogo: "",
				profilePicStatus: "Not Upload",
			});
			alert("Please select logo");
		}
	};

	const handleImageUpload = (image) => {
		if (image) {
			const uploadTask = storage
				.ref(`ProfilePicImages/${image.name}`)
				.put(image);

			uploadTask.on(
				"state_changes",
				(snapshot) => {},
				(error) => {
					console.log(error);
				},
				() => {
					storage
						.ref("ProfilePicImages")
						.child(image.name)
						.getDownloadURL()
						.then((url) => {
							console.log(url);
							this.setState({
								CompanyLogo: url,
								profilePicStatus: "Upload Successfully",
							});
						});
				},
			);
		} else {
			alert("Please Select your logo");
		}
	};
	const {
		DisplayName,
		EmailId,
		password,
		confirmPassword,
		profilepicUrl,
		profilepicPreviewUrl,
		profilePicStatus,
		profilePicFile,
		gender,
		MobileNo,
		State,
		Country,
	} = data;
	return (
		<div className="form-container">
			<form onSubmit={this.handleSubmit}>
				<h2 className="section-title">Employer Registration form</h2>

				<div className="image-form-page">
					<div className="image-container">
						<div className="imgPreview">
							{profilepicPreviewUrl ? (
								<img src={profilepicPreviewUrl} alt="" />
							) : (
								<img src={comlogo} alt="" />
							)}
						</div>
						<div className="status">
							<h4>{profilePicStatus}</h4>
						</div>
						<input type="file" onChange={handleImage} />
						<div
							className="button-upload"
							onClick={() => handleImageUpload(profilePicFile)}
						>
							Upload
						</div>
					</div>

					<div className="tab-container">
						<FormInput
							type="number"
							name="EmployerCode"
							value={EmployerCode || ""}
							onChange={this.handleChange}
							label="Employer Code"
							required
						/>
						<FormInput
							type="text"
							name="EmployerCompanyName"
							value={EmployerCompanyName || ""}
							onChange={this.handleChange}
							label="Company Name"
							required
						/>
						<FormInput
							type="text"
							name="EmployerName"
							value={EmployerName || ""}
							onChange={this.handleChange}
							label="Employer Name"
							required
						/>

						<FormInput
							type="text"
							name="EmployerAddress"
							value={EmployerAddress || ""}
							onChange={this.handleChange}
							label="Employer Address"
							required
						/>

						<FormInput
							type="text"
							name="EmployerContact"
							value={EmployerContact || ""}
							onChange={this.handleChange}
							label="Employer Contact"
							required
						/>
						<FormInput
							type="email"
							name="EmployerEmail"
							value={EmployerEmail || ""}
							onChange={this.handleChange}
							label="Email Address"
							required
						/>
						<FormInput
							type="text"
							name="EmployerAccount"
							value={EmployerAccount || ""}
							onChange={this.handleChange}
							label="Bank Account No"
							required
						/>
						<FormInput
							type="text"
							name="EmployerBank"
							value={EmployerBank || ""}
							onChange={this.handleChange}
							label="Bank Name"
							required
						/>
						<FormInput
							type="text"
							name="EmployerIFSC"
							value={EmployerIFSC || ""}
							onChange={this.handleChange}
							label="IFSC Code"
							required
						/>
						<FormInput
							type="text"
							name="EmployerPAN"
							value={EmployerPAN || ""}
							onChange={this.handleChange}
							label="PAN No"
							required
						/>
					</div>
				</div>
				<CustomButton type="submit" sizefix>
					SUBMIT
				</CustomButton>
			</form>

			<h2 className="section-title">Employer List</h2>

			<table className="table-page">
				<thead>
					<tr className="table-header">
						<th className="th1">Employer Code</th>
						<th className="th2">Company Logo</th>
						<th className="th3">Employer Name</th>
						<th className="th4">Email</th>
						<th className="th5">Company Name</th>
						<th className="th6">Address</th>
						<th className="th7">Contact</th>
						<th className="th8">Action</th>
					</tr>
				</thead>
				<tbody>
					{mydata.map((item) => (
						<tr className="table-data-row">
							<td className="emp-code">{item.EmployerCode}</td>
							<td className="table-image-container">
								<img
									src={item.CompanyLogo ? item.CompanyLogo : comlogo}
									alt="dummyimg"
								/>
							</td>
							<td>{item.EmployerName}</td>
							<td>{item.EmployerEmail}</td>
							<td>{item.PayrollCompanyName}</td>
							<td>{item.EmployerAddress}</td>
							<td>{item.EmployerContact}</td>
							<td>
								<button className="btn btn-view">View</button>

								<Link to={`/payroll/paymaster/${item.id}`}>
									<button className="btn btn-edit">Edit</button>
								</Link>

								<button className="btn btn-delete">Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div> 
	);
	*/
};

export default UserProfile;
