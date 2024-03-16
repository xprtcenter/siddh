import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import http from "../../http-common.js";
import Moment from "moment";
import { firestore } from "../../../../firebase/firebase.utils.js";
import "../opd-pages-styles/opd-prescruption-style.css";

const PrescriptionPage = () => {
	var getidArray = window.location.href.split("/");
	const getIDData = getidArray[getidArray.length - 1];
	console.log("URLSearchParams", getIDData); // ▶ URLSearchParams {}
	const [patientVisitData, setPatientVisitData] = useState([]);
	const [companyInfo, setCompanyInfo] = useState([]);
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const getPatientVisitData = async (id) => {
		const dbReg = firestore
			.collection("receptionData")
			.doc("receptionOpdVisit")
			.collection(id);
		const snapshot = await dbReg.get();
		snapshot.forEach((doc) => {
			console.log(doc.id, "=>", doc.data());
		});
		/* setPatientVisitData(response.data[0]); */
	};
	const getCompanyInfo = () => {
		const comPanyInfoData = {
			company_name: "Siddh Hospital",
			company_address: "Kanth Road Moradabad",
			company_email: "it@siddhhospital.org",
			company_mobile: "9745845125",
		};
		setCompanyInfo(comPanyInfoData);
	};
	useEffect(() => {
		getCompanyInfo();
		getPatientVisitData(getIDData);
	}, []);
	return (
		<div className="page">
			<div className="header-button">
				<Link to="/app/reception/PatientRegistration">
					<div className="back">Back</div>
				</Link>
				<button onClick={handlePrint} className="print__button">
					Print
				</button>
			</div>
			<div ref={componentRef} className="prescription-page">
				<div className="company-title">{companyInfo.company_name}</div>
				<div className="company-address">{companyInfo.company_address}</div>
				<div className="company-address-subaddress">
					Email: {companyInfo.company_email} Mobile No.:{" "}
					{companyInfo.company_mobile}
				</div>
				<div className="patient-card">
					<div className="name-group">
						<h3>OPD Date</h3>
						<span>:</span>
						<span>
							{Moment(patientVisitData.visitDate).format("D MMM yyyy hh:mma")}
						</span>
					</div>
					<div className="name-group">
						<h3>UHID/OPD</h3>
						<span>:</span>
						<span>{patientVisitData.id}</span>
					</div>
					<div className="name-group">
						<h3>Patient Name</h3>
						<span>:</span>
						<span>{patientVisitData.patientname}</span>
					</div>
					<div className="name-group">
						<h3>Gender</h3>
						<span>:</span>
						<span>Male</span>
					</div>
					<div className="name-group">
						<h3>Age</h3>
						<span>:</span>
						<span>{patientVisitData.age} years</span>
					</div>
					<div className="name-group">
						<h3>Mobile No</h3>
						<span>:</span>
						<span>89855845845</span>
					</div>
					<div className="name-group">
						<h3>Guardian Name</h3>
						<span>:</span>
						<span>Suman Kaur</span>
					</div>
					<div className="name-group">
						<h3>Address</h3>
						<span>:</span>
						<span>{patientVisitData.address}</span>
					</div>
					<div className="name-group">
						<h3>Doctor Name</h3>
						<span>:</span>
						<span>{patientVisitData.doc_name}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PrescriptionPage;
