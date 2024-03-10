import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import http from "../../http-common.js";
import Moment from "moment";

const PrescriptionPage = () => {
	var getidArray = window.location.href.split("/");
	const getIDData = getidArray[getidArray.length - 1];
	const [patientVisitData, setPatientVisitData] = useState([]);
	const [companyInfo, setCompanyInfo] = useState([]);
	console.log(getIDData); // ▶ URLSearchParams {}
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});
	const getPatientVisitData = (id) => {
		http.get(`/patvisit/patientvisitdata/${id}`).then((response) => {
			console.log(
				"patient visit details recive from OPD Prescruption",
				response.data,
			);
			setPatientVisitData(response.data[0]);
		});
	};
	const getCompanyInfo = () => {
		http.get("/appconfig/companyinfo").then((response) => {
			console.log("App Company Info", response.data);
			setCompanyInfo(response.data[0]);
		});
	};
	useEffect(() => {
		getCompanyInfo();
		getPatientVisitData(getIDData);
	}, []);
	return (
		<div className="page">
			<div className="header-button">
				<Link to="/patientreg">
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
