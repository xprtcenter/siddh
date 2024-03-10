import React, { useState, useEffect } from "react";
import Select from "react-select";
import Moment from "moment";
import http from "../../http-common.js";

const PatientVisitAddForm = (id) => {
	console.log("mydata from OPDVisitAdd Form", id);
	var newdate = new Date();
	var today = Moment(newdate).format().slice(0, -9);
	var username = "Ritesh";
	const [data, setData] = useState({ id: { patientname: "" } });
	const [doctordata, setDoctorData] = useState({ docdata: [] });
	const [visitdate, setVisitdate] = useState(today);
	const [patientid, setPatientid] = useState("");
	const [doctorid, setDoctorid] = useState("");
	const [amount, setAmount] = useState("");

	useEffect(() => {
		setData(id);
		setPatientid(id.id.id);
		const getDoctorList = () => {
			http.get("/docmaster").then((response) => {
				let docdata = [];
				let docnewdata = response.data;
				docnewdata.forEach((item) => {
					docdata.push({
						value: item.id,
						label: item.doc_name,
						fees: item.doc_fees,
					});
				});
				console.log("doc data", docdata);
				setDoctorData({ docdata: docdata });
			});
		};

		getDoctorList();
	}, [id]);
	const addVisit = () => {
		http.post("/patvisit/create", {
			pat_id: patientid,
			doc_id: doctorid,
			doc_fees: amount,
			user_name: username,
			visitDate: visitdate,
		});
	};

	return (
		<form onSubmit={addVisit}>
			<h3 className="form-title">Patient Visit Form</h3>
			<div className="form-group">
				<label htmlFor="regDate">Visit Date</label>
				<input
					value={visitdate}
					onChange={(event) => {
						setVisitdate(event.target.value);
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
					value={data.id.patientname}
					className="form-control"
					id="patientname"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="doc_name">Doctor Name</label>

				<Select
					className="form-control dropdown"
					placeholder="Select doctor Name.."
					value={doctordata.docdata.find(
						(obj) => obj.value === doctordata.docdata.value,
					)} // set selected value
					options={doctordata.docdata} // set list of the data
					onChange={(e) => {
						setDoctorid(e.value);
						setAmount(e.fees);
					}} // assign onChange function
				/>
			</div>
			<div className="form-group">
				<label htmlFor="amount">Fees</label>
				<input
					onChange={(event) => {
						setAmount(event.target.value);
					}}
					value={amount}
					className="form-control"
					id="amount"
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

export default PatientVisitAddForm;
