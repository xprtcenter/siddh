import React, { useEffect, useState, Fragment } from "react";
import "../form-setting/forms.styles.scss";
import Moment from "moment";
import OpdVisit from "./opd-visit-component";
import http from "../../http-common";
import Container from "../../../../component/model-component/container.component";
import PatientRegistrationAddForm from "./pat-registration-add-form.component";
import { confirm } from "react-confirm-box";
import ReceptionOpdRegService from "../../reception-opd-reg-service";

import PatientRegistrationEditForm from "./pat-registration-edit-form";

//import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { firestore } from "../../../../firebase/firebase.utils";

const dbReg = firestore
	.collection("receptionData")
	.doc("receptionOpdRegistration")
	.collection("opdPatient");

const PatientRegistration = () => {
	var newdate = new Date();
	var today = Moment(newdate).format().slice(0, -15);
	const [patientList, setPatientList] = useState([]);
	const [selectedPatient, setSelectedPatient] = useState({});
	const [serarchTerm, setSearchTerm] = useState("");

	const [searchDate, setSearchDate] = useState({
		frmDate: today,
		toDate: today,
	});
	let ed = new Date(searchDate.frmDate).getTime();
	let sd = new Date(searchDate.toDate).getTime();

	/* const getPatientList = () => {
		http.get("/patreg").then((response) => {
			setPatientList(response.data);
		});
	};

	const patDelete = (id) => {
		http.delete(`/patreg/delete/${id}`).then((response) => {
			getPatientList();
		});
	};

	const onClickConfirm = async (id) => {
		const result = await confirm(
			"Are you sure you want to delete this patient?",
		);
		if (result) {
			console.log("You click yes!");
			patDelete(id);
			return;
		}
		console.log("You click No!");
	};

	const selectPatient = (id) => {
		if (id !== undefined) {
			http
				.get(`/patreg/${id}`)
				.then((response) => setSelectedPatient(response.data[0]));
		}
	}; */
	const getData = async () => {
		const updatedData = await dbReg.get();

		let patient = [];
		updatedData.docs.forEach((doc) => {
			patient.push({ ...doc.data(), id: doc.id });
		});
		//console.log("patient for List from firebase", patient);

		setPatientList(patient);
	};
	const selectPatient = (id) => {
		if (id !== undefined) {
			const selectedPatient = patientList.filter((pat) => pat.id === id);
			setSelectedPatient(selectedPatient[0]);
		}
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<React.Fragment>
			<div className="table-box">
				<div className="custom-table">
					<div className="cardHeader">
						<h3>Patient Details</h3>
						<div className="search">
							<label>
								<input
									type="text"
									placeholder="search patient here"
									onChange={(e) => {
										setSearchTerm(e.target.value);
									}}
								/>
								<ion-icon name="search"></ion-icon>
							</label>
						</div>
						<Container
							Form={PatientRegistrationAddForm}
							triggerText="New Registration"
							btnstyle="btn"
						/>
					</div>
					<div className="cardHeaderdate">
						<span>Search Between </span>
						<label htmlFor="frmDate">From Date:</label>
						<input
							value={searchDate.frmDate || today}
							onChange={(event) => {
								setSearchDate({ ...searchDate, frmDate: event.target.value });
							}}
							type="date"
							className="form-control"
							id="frmDate"
						/>
						<label htmlFor="toDate">To Date:</label>
						<input
							value={searchDate.toDate || today}
							onChange={(event) => {
								setSearchDate({ ...searchDate, toDate: event.target.value });
							}}
							type="date"
							className="form-control"
							id="toDate"
						/>
					</div>

					<table id="opd-table-body">
						<thead>
							<tr>
								<th>Sr No.</th>
								<th>Registration Date</th>
								<th>Patient Name</th>
								<th>Age</th>
								<th>Guardian Name</th>
								<th>Address</th>
								<th>Mobile No.</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{patientList
								.filter((pat) => {
									if (serarchTerm === "") {
										return pat;
									} else if (
										pat.patientname
											.toLowerCase()
											.includes(serarchTerm.toLowerCase()) ||
										pat.mobileno
											.toLowerCase()
											.includes(serarchTerm.toLowerCase())
									) {
										return pat;
									}
								})
								.map((pat, idx) => {
									return (
										<tr
											key={idx}
											onClick={() => selectPatient(pat.id)}
											className={
												pat.id === selectedPatient.id ? "selected-row" : ""
											}
										>
											<td>{idx + 1}</td>
											<td>{Moment(pat.regDate).format("D MMM yyyy hh:mma")}</td>
											<td>{pat.patientname}</td>
											<td>{pat.age}</td>
											<td>{pat.guardianname}</td>
											<td>{pat.address}</td>
											<td>{pat.mobileno}</td>

											<td>
												<Container
													Form={PatientRegistrationEditForm}
													triggerText="Edit"
													id={pat.id}
													btnstyle="btn edit"
												/>
												<ion-icon onClick={() => {}} name="trash"></ion-icon>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
				<OpdVisit selectedPatent={selectedPatient} />
			</div>
		</React.Fragment>
	);
};

export default PatientRegistration;

/**************************************Old Table ***************************************/
