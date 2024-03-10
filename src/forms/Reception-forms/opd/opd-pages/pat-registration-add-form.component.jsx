import React, { useEffect, useState } from "react";
import Moment from "moment";
import { useHistory } from "react-router-dom";
import ReceptionOpdRegService from "../../reception-opd-reg-service.jsx";

const PatientRegistrationAddForm = () => {
	var newdate = new Date();
	var today = Moment(newdate).format().slice(0, -9);

	const initialdata = {
		patientname: "",
		age: "",
		guardianname: "",
		address: "",
		mobileno: "",
		regDate: today,
	};

	const [patient, setPatient] = useState(initialdata);
	const [editId, setEditId] = useState("");
	const history = useHistory();
	/* Code from firebase opd registration */

	const handleSubmit = async (event) => {
		event.preventDefault();

		let sData = {
			patientname: patient.patientname,
			age: patient.age,
			guardianname: patient.guardianname,
			address: patient.address,
			mobileno: patient.mobileno,
			regDate: patient.regDate,
		};
		if (!editId) {
			ReceptionOpdRegService.create(sData)
				.then(() => {
					alert("Created new Patient successfully!");
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			ReceptionOpdRegService.update(editId, sData)
				.then(() => {
					alert("Patient Update successfully!");
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};

	/* End Code from firebase opd registration */

	useEffect(() => {
		/* uploadSingleFile(); */
	}, []);
	/* let imgPreview = <img src={image} alt="" />; */
	return (
		<form onSubmit={handleSubmit}>
			<h3 className="form-title">Patient Registration Form</h3>
			<div className="pat-image">
				{/* <div className="form-group preview">{imgPreview}</div>
				<input
					type="file"
					className="form-control"
					onChange={uploadSingleFile}
				/> */}
			</div>
			<div className="form-group">
				<label htmlFor="regDate">Registration Date</label>
				<input
					value={Moment(patient.regDate).format().slice(0, -9) || today}
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

export default PatientRegistrationAddForm;
