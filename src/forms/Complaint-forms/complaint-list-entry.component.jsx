import React from "react";
import FormInput from "../../component/form-input/form-input.component";
import { Link } from "react-router-dom";
import CustomButton from "../../component/custom-button/custom-button.component";
import { firestore } from "../../firebase/firebase.utils";
import options from "./data/complaint-dropdown.option";
import Select from "react-select";

const initialState = {
	Editid: "",
	ComplaintCode: "",
	ComplaintType: "",
	ComplaintSubType: "",
	ComplaintBy: "",
	ComplaintDepartment: "",
	ComplaintDescruption: "",
	ComplaintRemark: "",
	ComplaintStatus: "",
	ComplaintStatusRemark: "",
	mydata: [],
	fillStatus: 1,
	uploadstatus: 0,
};
class ComplaintListEntryForm extends React.Component {
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
				`complaintData/complaintEntryList/complaint/${getIDData}`,
			);

			dbRef
				.get()
				.then((doc) => {
					if (doc.exists) {
						const newData = doc.data();
						this.setState({
							Editid: getIDData,
							DoctorName: newData.DoctorName,
							DoctorSpecialization: newData.DoctorSpecialization,
							DoctorContact: newData.DoctorContact,
							DoctorEmail: newData.DoctorEmail,

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
			.collection("complaintData")
			.doc("complaintEntryList")
			.collection("complaint");

		this.unsubscribe = db
			.orderBy("ComplaintCode", "asc")
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

				ComplaintType: data.ComplaintType,
				ComplaintSubType: data.ComplaintSubType,
				ComplaintBy: data.ComplaintBy,
				ComplaintDepartment: data.ComplaintDepartment,
				ComplaintDescruption: data.ComplaintDescruption,
				ComplaintRemark: data.ComplaintRemark,
				ComplaintStatus: data.ComplaintStatus,
				ComplaintStatusRemark: data.ComplaintStatusRemark,
			});
		});

		this.setState({
			mydata: mydata,
		});
	}

	handleSubmit = async (event) => {
		event.preventDefault();

		let sData = {
			ComplaintType: this.state.ComplaintType,
			ComplaintSubType: this.state.ComplaintSubType,
			ComplaintBy: this.state.ComplaintBy,
			ComplaintDepartment: this.state.ComplaintDepartment,
			ComplaintDescruption: this.state.ComplaintDescruption,
			ComplaintRemark: this.state.ComplaintRemark,
			ComplaintStatus: this.state.ComplaintStatus,
			ComplaintStatusRemark: this.state.ComplaintStatusRemark,
		};
		const db = firestore
			.collection("complaintData")
			.doc("complaintEntryList")
			.collection("complaint");

		if (!this.state.Editid) {
			db.add(sData)
				.then(() => {
					alert("Created new Complaint successfully!");
					this.setState(initialState);
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			db.doc(this.state.Editid)
				.then(() => {
					alert("omplaint Update successfully!");
					this.setState(initialState);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};

	handleChange = (event) => {
		const { name, value } = event.target;

		this.setState({ [name]: value });
		this.setState({ fillStatus: 2 });
	};

	render() {
		const {
			ComplaintType,
			ComplaintSubType,
			ComplaintBy,
			ComplaintDepartment,
			ComplaintDescruption,
			ComplaintRemark,
			ComplaintStatus,
			ComplaintStatusRemark,

			mydata,
		} = this.state;

		return (
			<React.Fragment>
				<form onSubmit={this.handleSubmit}>
					<h2 className="section-title">Complaint Entry form</h2>

					<div className="image-form-page">
						<Select
							className="form-dropdown"
							placeholder="Select Department"
							value={
								options.ComplaintDepartment?.find(
									(obj) => obj.value === ComplaintDepartment,
								) || ""
							} // set selected value
							options={options.ComplaintDepartment} // set list of the data
							onChange={(e) => {
								this.setState({ ComplaintDepartment: e.value });
							}} // assign onChange function
						/>

						<FormInput
							type="text"
							name="ComplaintType"
							value={ComplaintType || ""}
							onChange={this.handleChange}
							label="Complaint Type"
							required
						/>

						<FormInput
							type="text"
							name="ComplaintSubType"
							value={ComplaintSubType || ""}
							onChange={this.handleChange}
							label="Complaint Sub Type"
							required
						/>

						<FormInput
							type="text"
							name="ComplaintBy"
							value={ComplaintBy || ""}
							onChange={this.handleChange}
							label="Complaint By"
							required
						/>
						<FormInput
							type="text"
							name="ComplaintDescruption"
							value={ComplaintDescruption || ""}
							onChange={this.handleChange}
							label="Complaint Descruption"
							required
						/>
						<FormInput
							type="text"
							name="ComplaintRemark"
							value={ComplaintRemark || ""}
							onChange={this.handleChange}
							label="Complaint Remark"
							required
						/>
						<Select
							className="form-dropdown"
							placeholder="Select Complaint Status"
							value={
								options.ComplaintStatus?.find(
									(obj) => obj.value === ComplaintStatus,
								) || ""
							} // set selected value
							options={options.ComplaintStatus} // set list of the data
							onChange={(e) => {
								this.setState({ ComplaintStatus: e.value });
							}} // assign onChange function
						/>
						<FormInput
							type="text"
							name="ComplaintStatusRemark"
							value={ComplaintStatusRemark || ""}
							onChange={this.handleChange}
							label="Complaint Status Remark"
							required
						/>
					</div>
					<CustomButton type="submit" sizefix>
						SUBMIT
					</CustomButton>
				</form>
				<div className="table-container">
					<h2 className="section-title">Doctor List</h2>

					<table className="table-page">
						<thead>
							<tr className="table-header">
								<th className="th1">Sr No.</th>

								<th className="th3">Complaint Type</th>
								<th className="th4">ComplaintSub Type</th>

								<th className="th6">Complaint By</th>
								<th className="th7">Complaint Department</th>
								<th className="th7">Complaint Descruption</th>
								<th className="th7">Complaint Remark</th>
								<th className="th7">Complaint Status</th>
								<th className="th7">Complaint Status Remark</th>

								<th className="th8">Action</th>
							</tr>
						</thead>
						<tbody>
							{mydata.map((item, idx) => (
								<tr className="table-data-row">
									<td className="emp-code">{idx + 1}</td>

									<td>{item.ComplaintType}</td>
									<td>{item.ComplaintSubType}</td>

									<td>{item.ComplaintBy}</td>
									<td>{item.ComplaintDepartment}</td>
									<td>{item.ComplaintDescruption}</td>
									<td>{item.ComplaintRemark}</td>
									<td>{item.ComplaintStatus}</td>
									<td>{item.ComplaintStatusRemark}</td>
									<td>
										<button className="btn btn-view">View</button>

										<Link to={`/reception/doctormaster/${item.id}`}>
											<button className="btn btn-edit">Edit</button>
										</Link>

										<button className="btn btn-delete">Delete</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</React.Fragment>
		);
	}
}

export default ComplaintListEntryForm;
