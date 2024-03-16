import React, { useState, useEffect } from "react";
import Select from "react-select";
import Moment from "moment";
import http from "../../http-common.js";
import { firestore } from "../../../../firebase/firebase.utils.js";

const PatientVisitAddForm = (selectedPatient) => {
	console.log("mydata from OPDVisitAdd Form", selectedPatient);
	var newdate = new Date();
	var today = Moment(newdate).format().slice(0, -9);
	var username = "Ritesh";
	const [data, setData] = useState({ patientname: "" });
	const [doctordata, setDoctorData] = useState({ docdata: [] });
	const [visitdate, setVisitdate] = useState(today);
	const [patientid, setPatientid] = useState("");
	const [doctorid, setDoctorid] = useState("");
	const [amount, setAmount] = useState("");

	useEffect(() => {
		setData(selectedPatient.id);
		console.log("selected patient id", selectedPatient.id);
		console.log("data", data);
		setPatientid(selectedPatient.id.id);
		const getDoctorList = () => {
			/* http.get("/docmaster").then((response) => {
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
			}); */
			let docdata = [
				{ value: "12321", label: "Dr Mohan Singh", fees: 200 },
				{ value: "23212", label: "Dr Sachin", fees: 350 },
			];
			setDoctorData({ docdata: docdata });
		};

		getDoctorList();
	}, [selectedPatient]);
	const addVisit = async (e) => {
		e.preventDefault();
		const sData = {
			patid: patientid,
			docid: doctorid,
			docfees: amount,
			username: username,
			visitDate: visitdate,
		};
		const dbReg = firestore
			.collection("receptionData")
			.doc("receptionOpdVisit")
			.collection(patientid);
		await dbReg
			.add(sData)
			.then(() => {
				alert("Visit Created Successfully");
			})
			.catch((e) => {
				console.log(e);
			});
		console.log("data from add visit function", sData);
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
					value={data.patientname}
					className="form-control"
					id="patientname"
					onChange={() => {}}
					readOnly
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
