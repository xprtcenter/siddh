import React, { useState, useEffect } from "react";

import http from "../../http-common";

const DoctorMaster = () => {
	const initialdata = {
		id: "",
		doctor_name: "",
		doctor_address: "",
		doctor_email: "",
		doctor_mobile: "",
	};

	const [doctorInfo, setDoctorInfo] = useState(initialdata);
	const updatedoctor = (id) => {
		http.put("/appconfig/doctorupdate", {
			id: doctorInfo.id,
			doctor_name: doctorInfo.doctor_name,
			doctor_address: doctorInfo.doctor_address,
			doctor_email: doctorInfo.doctor_email,
			doctor_mobile: doctorInfo.doctor_mobile,
		});
	};
	const getdoctorInfo = () => {
		http.get("/appconfig/doctorinfo").then((response) => {
			console.log("App doctor Info", response.data);
			setDoctorInfo(response.data[0]);
		});
	};

	useEffect(() => {
		getdoctorInfo();
	}, []);

	return (
		<div className="app-master-page">
			<div className="button-div">
				<button className="btn view app-master-button">Doctor Master</button>
			</div>
			<div className="doctor-master">
				<div className="doctor-master-form">
					<form onSubmit={updatedoctor}>
						<h3 className="form-doctor-title">Doctor Master</h3>
						<div className="form-group">
							<label htmlFor="doctor_name">Doctor Name</label>
							<input
								value={doctorInfo.doctor_name || " "}
								onChange={(event) => {
									setDoctorInfo({
										...doctorInfo,
										doctor_name: event.target.value,
									});
								}}
								className="form-control"
								id="doctor_name"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="doctor_email">Email Address</label>
							<input
								value={doctorInfo.doctor_email || " "}
								onChange={(event) => {
									setDoctorInfo({
										...doctorInfo,
										doctor_email: event.target.value,
									});
								}}
								className="form-control"
								type="email"
								id="doctor_email"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="doctor_mobile">Mobile no.</label>
							<input
								value={doctorInfo.doctor_mobile || " "}
								onChange={(event) => {
									setDoctorInfo({
										...doctorInfo,
										doctor_mobile: event.target.value,
									});
								}}
								className="form-control"
								id="doctor_mobile"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="doctor_address">Address</label>
							<input
								value={doctorInfo.doctor_address || " "}
								onChange={(event) => {
									setDoctorInfo({
										...doctorInfo,
										doctor_address: event.target.value,
									});
								}}
								type="text"
								className="form-control"
								id="doctor_address"
							/>
						</div>

						<div className="form-group">
							<button className="btn view app-master-button" type="submit">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
			<div className="button-page"></div>
		</div>
	);
};

export default DoctorMaster;
