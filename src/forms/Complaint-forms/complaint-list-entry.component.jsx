import React, { useState, useEffect } from "react";
import FormInput from "../../component/form-input/form-input.component";
import { Link } from "react-router-dom";
import CustomButton from "../../component/custom-button/custom-button.component";
import { firestore } from "../../firebase/firebase.utils";
import options from "./data/complaint-dropdown.option";

import Select from "react-select";
import CustomTable from "../../component/table/custom-table-material.component";
import "./styles/complaint.styles.scss";
import { Today } from "@material-ui/icons";

const ComplaintListEntryForm = () => {
	let todayDate = new Date();

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
		ComplaintDate: "",
		ComplaintDoneDate: "",
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
			ComplaintDate: data.ComplaintDate,
			ComplaintDoneDate: data.ComplaintDoneDate,
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
			title: "Complaint Date",
			field: "ComplaintDate",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
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
		{
			title: "Complaint Done Date",
			field: "ComplaintDoneDate",

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
		ComplaintDate,
		ComplaintDoneDate,
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
					<FormInput
						type="date"
						name="ComplaintDate"
						value={ComplaintDate || todayDate.toISOString().substr(0, 10)}
						onChange={handleChange}
						label="Complaint Date"
						required
						readonly="true"
					/>
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
					<Select
						className="form-dropdown"
						placeholder="Complaint Type"
						value={
							options.ComplaintType?.find(
								(obj) => obj.value === ComplaintType,
							) || ""
						} // set selected value
						options={options.ComplaintType} // set list of the data
						onChange={(e) => {
							setData({ ...data, ComplaintType: e.value });
						}} // assign onChange function
					/>
					<Select
						className="form-dropdown"
						placeholder="Complaint Sub Type"
						value={
							options.ComplaintSubType?.find(
								(obj) => obj.value === ComplaintSubType,
							) || ""
						} // set selected value
						options={options.ComplaintSubType} // set list of the data
						onChange={(e) => {
							setData({ ...data, ComplaintSubType: e.value });
						}} // assign onChange function
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
					<FormInput
						type="date"
						name="ComplaintDoneDate"
						value={ComplaintDoneDate || ""}
						onChange={handleChange}
						label="Complaint Done Date"
					/>
				</div>
				<CustomButton type="submit" sizefix>
					SUBMIT
				</CustomButton>
			</form>
			<div className="table-container">
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
