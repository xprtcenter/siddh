import React, { Fragment, useState, useEffect } from "react";
import "../opd-pages-styles/opd-visit-styles.css";
import "../form-setting/forms.styles.css";
import Container from "../../../../component/model-component/container.component";
import PatientVisitAddForm from "./pat-visit-add-form.component";
import http from "../../http-common";
import Moment from "moment";
import { useHistory } from "react-router-dom";
import avtar from "../../../../assets/avatar.png";
import { firestore } from "../../../../firebase/firebase.utils";

const OpdVisit = (selectedPatent) => {
	//console.log("Patient from OPDVisit", selectedPatent);
	const [data, setData] = useState({});
	const [patientVisitList, setPatientVisitList] = useState([]);
	const [docName, setDocName] = useState([]);

	//console.log("Patient from data", data);

	const getDocName = (id) => {
		let docdata = [
			{ value: "12321", label: "Dr Mohan Singh", fees: 200 },
			{ value: "23212", label: "Dr Sachin", fees: 350 },
		];
		return docdata.filter((doc) => {
			return doc.value === id;
		});
	};

	useEffect(() => {
		setData(selectedPatent.selectedPatent);
		if (Object.entries(data).length !== 0) {
			getPatientVisitList(data.id);
		}
	}, [selectedPatent, data]);

	const getPatientVisitList = (id) => {
		const dbReg = firestore
			.collection("receptionData")
			.doc("receptionOpdVisit")
			.collection(data.id);
		dbReg.onSnapshot((visits) => {
			const visitArray = [];
			console.log("patient visit details recive from server", data);
			visits.forEach((visit) => {
				let visitData = visit.data();
				console.log("patient visit data recive from server", visitData);
				visitArray.push({ ...visitData });
			});
			setPatientVisitList(visitArray);
		});
	};
	const history = useHistory();
	const handlePrint = (id) => history.push(`/app/reception/prescription/${id}`);

	return (
		<Fragment>
			<div className="custom-table">
				<div className="cardHeader">
					<h3>Patient OPD visit</h3>
					<Container
						Form={PatientVisitAddForm}
						triggerText="Add Visit"
						btnstyle="btn add"
						id={data}
					/>
				</div>
				<div className="pat-card">
					<div className="imgBx">
						<img src={avtar} alt="" />
					</div>
					<div className="nameBox">
						<h4>Patient Name :</h4>
						<span>{data.patientname}</span>
						<h4>Gaurdian Name :</h4>
						<span>{data.guardianname}</span>
						<h4>Age :</h4>
						<span>{data.age}</span>
					</div>
				</div>
				{Object.entries(patientVisitList).length !== 0 ? (
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Doctor Name</th>
								<th>Doctor Fees</th>
								<th>Prescription</th>
							</tr>
						</thead>
						<tbody>
							{patientVisitList.map((visit, idx) => {
								return (
									<tr key={idx}>
										<td>
											{Moment(visit.visitDate).format("D MMM yyyy hh:mma")}
										</td>
										<td>{}</td>
										<td>{visit.docfees}</td>
										<td>
											<span
												className="btn print"
												onClick={() => handlePrint(visit.patid)}
											>
												Print
											</span>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				) : (
					<div className="no-visit-div">
						<span className="no-visit-found">No Visit Found</span>
					</div>
				)}
			</div>
		</Fragment>
	);
};

export default OpdVisit;
