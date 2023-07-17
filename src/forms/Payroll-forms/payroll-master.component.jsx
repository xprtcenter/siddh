import React from "react";
import FormInput from "../../component/form-input/form-input.component";
import { Link } from "react-router-dom";
import CustomButton from "../../component/custom-button/custom-button.component";
import { firestore } from "../../firebase/firebase.utils";
import ParollEmpRegService from "./payroll-master-reg-service";

import { storage } from "../../firebase/firebase.utils";

import comlogo from "../../assets/COMLOGO2.png";

const initialState = {
	Editid: "",
	CompanyLogoFile: "",
	CompanyLogoPreviewUrl: "",
	CompanyLogo: "",
	EmployerCode: "",
	EmployerName: "",
	EmployerAddress: "",
	EmployerContact: "",
	EmployerEmail: "",
	EmployerAccount: "",
	EmployerBank: "",
	EmployerIFSC: "",
	EmployerPAN: "",
	EmployerCompanyName: "",
	PayrollCompanyName: "VKBORL Hospital",
	CompanyLogoStatus: "Not Upload",
	mydata: [],
	fillStatus: 1,
	uploadstatus: 0,
};
class PayrollMaster extends React.Component {
	constructor(props) {
		super(props);
		this.onDataChange = this.onDataChange.bind(this);
		this.state = initialState;
		this.unsubscribe = undefined;
	}
	componentWillUpdate() {
		if (this.state.fillStatus === 1) {
			var getidArray = window.location.href.split("/");
			const getIDData = getidArray[getidArray.length - 1];
			const dbRef = firestore.doc(
				`payrollData/payrollMaster/payrollCompany/${getIDData}`,
			);

			dbRef
				.get()
				.then((doc) => {
					if (doc.exists) {
						const newData = doc.data();
						this.setState({
							Editid: getIDData,
							CompanyLogo: newData.CompanyLogo,
							EmployerCode: newData.EmployerCode,
							EmployerName: newData.EmployerName,
							EmployerAddress: newData.EmployerAddress,
							EmployerContact: newData.EmployerContact,
							EmployerEmail: newData.EmployerEmail,
							EmployerAccount: newData.EmployerAccount,
							EmployerBank: newData.EmployerBank,
							EmployerIFSC: newData.EmployerIFSC,
							EmployerPAN: newData.EmployerPAN,
							PayrollCompanyName: newData.PayrollCompanyName,
							EmployerCompanyName: newData.EmployerCompanyName,
							CompanyLogoPreviewUrl: newData.CompanyLogo,
							fillStatus: 2,
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
	}
	componentDidMount() {
		const db = firestore
			.collection("payrollData")
			.doc("payrollMaster")
			.collection("payrollCompany");

		this.unsubscribe = db
			.orderBy("EmployerName", "asc")
			.onSnapshot(this.onDataChange);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	onDataChange(items) {
		let mydata = [];

		items.forEach((item) => {
			let id = item.id;
			let data = item.data();
			mydata.push({
				id: id,
				EmployerCode: data.EmployerCode,
				EmployerName: data.EmployerName,
				EmployerEmail: data.EmployerEmail,
				PayrollCompanyName: data.PayrollCompanyName,
				EmployerCompanyName: data.EmployerCompanyName,
				EmployerAddress: data.EmployerAddress,
				EmployerContact: data.EmployerContact,
				CompanyLogo: data.CompanyLogo,
			});
		});

		this.setState({
			mydata: mydata,
		});
	}

	handleImageUpload = (image) => {
		if (image) {
			const uploadTask = storage
				.ref(`PayrollCompanyImages/${image.name}`)
				.put(image);

			uploadTask.on(
				"state_changes",
				(snapshot) => {
					var progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					var rounded = Math.round(progress * 10) / 10;
					this.setState({ uploadstatus: rounded });
				},
				(error) => {
					console.log(error);
				},
				() => {
					storage
						.ref("PayrollCompanyImages")
						.child(image.name)
						.getDownloadURL()
						.then((url) => {
							console.log(url);
							this.setState({
								CompanyLogo: url,
								CompanyLogoStatus: "Upload Successfully",
							});
						});
				},
			);
		} else {
			alert("Please Select your logo");
		}
	};

	handleSubmit = async (event) => {
		event.preventDefault();
		if (this.state.CompanyLogo) {
			let sData = {
				CompanyLogo: this.state.CompanyLogo,
				EmployerCode: this.state.EmployerCode,
				EmployerName: this.state.EmployerName,
				EmployerAddress: this.state.EmployerAddress,
				EmployerContact: this.state.EmployerContact,
				EmployerEmail: this.state.EmployerEmail,
				EmployerAccount: this.state.EmployerAccount,
				EmployerBank: this.state.EmployerBank,
				EmployerIFSC: this.state.EmployerIFSC,
				EmployerPAN: this.state.EmployerPAN,
				EmployerCompanyName: this.state.EmployerCompanyName,
				PayrollCompanyName: this.state.PayrollCompanyName,
			};
			if (!this.state.Editid) {
				ParollEmpRegService.create(sData)
					.then(() => {
						alert("Created new Employer successfully!");
						this.setState(initialState);
					})
					.catch((e) => {
						console.log(e);
					});
			} else {
				ParollEmpRegService.update(this.state.Editid, sData)
					.then(() => {
						alert("Employer Update successfully!");
						this.setState(initialState);
					})
					.catch((e) => {
						console.log(e);
					});
			}
		} else {
			alert("Please Upload logo first");
		}
	};

	handleImage = (e) => {
		e.preventDefault();

		/* let CompanyLogoFile = e.target.files[0]; */
		let CompanyLogoFile = e.target.files[0];
		const filesize = CompanyLogoFile.size / 1024 / 1024;
		if (filesize > 0.5) {
			alert(
				"File size is greater than 500 kb. Please select file between 20kb to 500 kb",
			);
			this.setState({
				CompanyLogoFile: "",
				CompanyLogoPreviewUrl: "",
				CompanyLogo: "",
				CompanyLogoStatus: "Not Upload",
			});
		} else {
			if (CompanyLogoFile !== undefined) {
				let reader = new FileReader();
				reader.onloadend = () => {
					this.setState({
						CompanyLogoFile: CompanyLogoFile,
						CompanyLogoPreviewUrl: reader.result,
					});
				};

				reader.readAsDataURL(CompanyLogoFile);
			} else {
				this.setState({
					CompanyLogoFile: "",
					CompanyLogoPreviewUrl: "",
					CompanyLogo: "",
					CompanyLogoStatus: "Not Upload",
				});
				alert("Please select logo");
			}
		}
	};

	handleChange = (event) => {
		const { name, value } = event.target;

		this.setState({ [name]: value });
		this.setState({ fillStatus: 2 });
	};

	render() {
		const {
			CompanyLogoFile,
			CompanyLogoPreviewUrl,
			EmployerCode,
			EmployerName,
			EmployerAddress,
			EmployerContact,
			EmployerEmail,
			EmployerAccount,
			EmployerBank,
			EmployerIFSC,
			EmployerPAN,
			EmployerCompanyName,
			CompanyLogoStatus,
			mydata,
			uploadstatus,
		} = this.state;

		return (
			<div className="form-container">
				<form onSubmit={this.handleSubmit}>
					<h2 className="section-title">Employer Registration form</h2>

					<div className="image-form-page">
						<div className="image-container">
							<div className="imgPreview">
								{CompanyLogoPreviewUrl ? (
									<img src={CompanyLogoPreviewUrl} alt="" />
								) : (
									<img src={comlogo} alt="" />
								)}
							</div>
							<div className="status">
								{uploadstatus === 0 || uploadstatus === 100 ? (
									<span>{CompanyLogoStatus}</span>
								) : (
									<span>Uploading...{uploadstatus}</span>
								)}
							</div>
							<input
								type="file"
								onChange={this.handleImage}
								accept="image/png, image/jpeg"
							/>
							<div
								className="button-upload"
								onClick={() => this.handleImageUpload(CompanyLogoFile)}
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
	}
}

export default PayrollMaster;
