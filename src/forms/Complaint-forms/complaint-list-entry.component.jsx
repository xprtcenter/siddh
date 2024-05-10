import React, { useState, useEffect } from "react";
import FormInput from "../../component/form-input/form-input.component";
import { Link } from "react-router-dom";
import CustomButton from "../../component/custom-button/custom-button.component";
import { firestore } from "../../firebase/firebase.utils";
import options from "./data/complaint-dropdown.option";

import Select from "react-select";
import CustomTable from "../../component/table/custom-table-material.component";

const ComplaintListEntryForm = () => {
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
	const [data, setData] = useState(initialState);
	useEffect(() => {
		if (data.mydata.length === 0) {
			const complaints = firestore
				.collection("complaintData")
				.doc("complaintEntryList")
				.collection("complaint");
			complaints.onSnapshot((complaint) => {
				let complaintList = [];
				complaint.forEach((item) => {
					let data = item.data();
					complaintList.push(data);
				});

				setData({ ...data, mydata: complaintList });
			});
		}
	}, []);
	/*	constructor(props) {
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
						setData({
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
 
	const onDataChange(items) {
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

		setData({
			mydata: mydata,
		});
	}
*/
	const handleSubmit = async (event) => {
		event.preventDefault();

		let sData = {
			ComplaintType: data.ComplaintType,
			ComplaintSubType: data.ComplaintSubType,
			ComplaintBy: data.ComplaintBy,
			ComplaintDepartment: data.ComplaintDepartment,
			ComplaintDescruption: data.ComplaintDescruption,
			ComplaintRemark: data.ComplaintRemark,
			ComplaintStatus: data.ComplaintStatus,
			ComplaintStatusRemark: data.ComplaintStatusRemark,
		};
		const db = firestore
			.collection("complaintData")
			.doc("complaintEntryList")
			.collection("complaint");

		if (!data.Editid) {
			db.add(sData)
				.then(() => {
					alert("Created new Complaint successfully!");
					setData(initialState);
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			db.doc(data.Editid)
				.then(() => {
					alert("Complaint Update successfully!");
					setData(initialState);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};
	const addFunction = () => {
		let path = `payrollempregmaster/`;
		this.props.history.push(path);
	};
	const deleteFunction = (id) => {
		alert("Are you sure want to delete :" & { id });
	};
	const tableTitle = "Complaint List";
	const columns = [
		{
			title: "Complaint type",
			field: "ComplaintType",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
		{
			title: "Complaint Sub Type",
			field: "ComplaintSubType",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
		{
			title: "Complaint By",
			field: "ComplaintBy",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
		{
			title: "Complaint Department",
			field: "ComplaintDepartment",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
		{
			title: "Complaint Descruption",
			field: "ComplaintDescruption",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
		{
			title: "Complaint Remark",
			field: "ComplaintRemark",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
		{
			title: "Complaint Status",
			field: "ComplaintStatus",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
		{
			title: "Complaint Status Remark",
			field: "ComplaintStatusRemark",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
	];
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
	} = data;
	const dbpath = firestore
		.collection("complaintData")
		.doc("complaintEntryList")
		.collection("complaint");
	return (
		<div className="form-table-container">
			<form onSubmit={handleSubmit}>
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
							setData({ ...data, ComplaintDepartment: e.value });
						}} // assign onChange function
					/>

					<FormInput
						type="text"
						name="ComplaintType"
						value={ComplaintType || ""}
						onChange={handleChange}
						label="Complaint Type"
						required
					/>

					<FormInput
						type="text"
						name="ComplaintSubType"
						value={ComplaintSubType || ""}
						onChange={handleChange}
						label="Complaint Sub Type"
						required
					/>

					<FormInput
						type="text"
						name="ComplaintBy"
						value={ComplaintBy || ""}
						onChange={handleChange}
						label="Complaint By"
						required
					/>
					<FormInput
						type="text"
						name="ComplaintDescruption"
						value={ComplaintDescruption || ""}
						onChange={handleChange}
						label="Complaint Descruption"
						required
					/>
					<FormInput
						type="text"
						name="ComplaintRemark"
						value={ComplaintRemark || ""}
						onChange={handleChange}
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
							setData({ ...data, ComplaintStatus: e.value });
						}} // assign onChange function
					/>
					<FormInput
						type="text"
						name="ComplaintStatusRemark"
						value={ComplaintStatusRemark || ""}
						onChange={handleChange}
						label="Complaint Status Remark"
						required
					/>
				</div>
				<CustomButton type="submit" sizefix>
					SUBMIT
				</CustomButton>
			</form>
			<div className="table-container">
				{/*<table className="table-page">
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
				</table>*/}
				<CustomTable
					data={dbpath}
					columns={columns}
					tableTitle={tableTitle}
					/* editFunction={registrationEditPath} */
					addFunction={addFunction}
					deleteFunction={deleteFunction}
				/>
			</div>
		</div>
	);
};

export default ComplaintListEntryForm;
