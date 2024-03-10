import React, { useState, useEffect } from "react";
import Moment from "moment";
import http from "../../http-common.js";

const PatientRegistrationEditForm = (id) => {
	const initialdata = {};

	const [patient, setPatient] = useState(initialdata);

	const editPatient = (id) => {
		http.get(`/patreg/${id.id}`).then((response) => {
			console.log("data responce by edit", response.data);
			const setdata = response.data;
			console.log(setdata);
			setPatient(setdata[0]);
		});
	};
	useEffect(() => {
		if (id) {
			console.log("id recive", id);
			editPatient(id);
		}
	}, []);

	const updatePatient = () => {
		http.put("/patreg/update", {
			id: patient.id,
			patientname: patient.patientname,
			age: patient.age,
			guardianname: patient.guardianname,
			address: patient.address,
			mobileno: patient.mobileno,
			regDate: Moment(patient.regDate).format().slice(0, -9),
		});
	};
	return (
		<form onSubmit={updatePatient}>
			<h3 className="form-title">Patient Registration Form</h3>
			<div className="form-group">
				<label htmlFor="regDate">Registration Date</label>
				<input
					value={Moment(patient.regDate).format().slice(0, -9) || ""}
					onChange={(event) => {
						setPatient({ ...patient, regDate: event.target.value });
					}}
					type="datetime-local"
					className="form-control"
					id="regDate"
					readOnly
				/>
			</div>
			<div className="form-group">
				<label htmlFor="patientname">Patient Name</label>
				<input
					value={patient.patientname || " "}
					onChange={(event) => {
						setPatient({ ...patient, patientname: event.target.value });
					}}
					className="form-control"
					id="patientname"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="age">Age</label>
				<input
					value={patient.age || " "}
					onChange={(event) => {
						setPatient({ ...patient, age: event.target.value });
					}}
					className="form-control"
					type="number"
					id="age"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="guardianname">Guardian Name</label>
				<input
					value={patient.guardianname || " "}
					onChange={(event) => {
						setPatient({ ...patient, guardianname: event.target.value });
					}}
					className="form-control"
					id="guardianname"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="address">Address</label>
				<input
					value={patient.address || " "}
					onChange={(event) => {
						setPatient({ ...patient, address: event.target.value });
					}}
					type="text"
					className="form-control"
					id="address"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="mobileno">Mobile No.</label>
				<input
					value={patient.mobileno || ""}
					onChange={(event) => {
						setPatient({ ...patient, mobileno: event.target.value });
					}}
					type="text"
					className="form-control"
					id="mobileno"
				/>
			</div>
			<div className="form-group">
				<button className="btn-submit" type="submit">
					Submit
				</button>
			</div>
		</form>
	);
};

export default PatientRegistrationEditForm;
