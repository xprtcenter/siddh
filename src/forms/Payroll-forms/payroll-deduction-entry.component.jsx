import React, { useState, useEffect } from "react";
import "./payroll-deduction-entry.styles.scss";
import Select from "react-select";
import FormInput from "../../component/form-input/form-input.component";
import {
	EmployeeData,
	EmployeeDeduction,
} from "./Functions/getemployeedetails";
import CustomButton from "../../component/custom-button/custom-button.component";
import avatar from "../../assets/avatar.png";

const PayrollDeductionEntry = () => {
	var months = [
		{ value: "1", label: "January" },
		{ value: "2", label: "February" },
		{ value: "3", label: "March" },
		{ value: "4", label: "April" },
		{ value: "5", label: "May" },
		{ value: "6", label: "June" },
		{ value: "7", label: "July" },
		{ value: "8", label: "August" },
		{ value: "9", label: "September" },
		{ value: "10", label: "October" },
		{ value: "11", label: "November" },
		{ value: "12", label: "December" },
	];
	var months1 = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	var years = [
		{ value: 2021, label: 2021 },
		{ value: 2022, label: 2022 },
		{ value: 2023, label: 2023 },
		{ value: 2024, label: 2024 },
		{ value: 2025, label: 2025 },
	];

	var dt = new Date();
	var monthNo = dt.getMonth();
	var cyrrentMonthName = months1[monthNo]; // "July" (or current month)
	var currentYear = dt.getFullYear(); // "2022" (or current year)

	function daysInMonth(month, year) {
		return new Date(year, month, 0).getDate();
	}

	var dayscount = daysInMonth(monthNo, currentYear);

	const initialstate = {
		EmployeeName: "",
		EmployeeId: "",
		EmployeeCode: "",
		EmployeeEmail: "",
		PayrollCompanyName: "",
		EmployeeAddress: "",
		EmployeeContact: "",
		EmployeeImgUrl: avatar,
		month: cyrrentMonthName,
		year: currentYear,
		EmployeeDepartment: "",
		fixBasic: "",
		days: dayscount,
		monthNo: monthNo,
		weeklyoff: "",
		coff: "",
		unpaidLeave: "",
		paidLeave: "",
		nonWorkingdays: "",
		totalLeave: "",
		workingDays: "",
		leaveDeduction: "",
		esicEmployee: "",
		esicEmployer: "",
		pfEmployee: "",
		pfEmployer: "",
		professionalTax: "",
		advanceLoan: "",
		vehicleAllownces: "",
		houseAllownces: "",
		totalDeduction: "",
		calculativeBasic: "",
		allowncesOther: "",
		inHandSalary: "",
		ctc: "",
		TabtoggleState: 1,
		Editid: "",
	};

	const [dedData, setDedData] = useState(initialstate);
	const [newOptions, setNewOptions] = useState({
		EmployeeName: [],
	});

	useEffect(() => {
		if (EmployeeName === "") {
			EmployeeData.onSnapshot((items) => {
				let employeeList = [];

				items.forEach((item) => {
					let id = item.id;
					let data = item.data();
					employeeList.push({
						value: id,
						label: data.EmployeeName,
						EmployeeCode: data.EmployeeCode,
						EmployeeEmail: data.EmployeeEmail,
						PayrollCompanyName: data.PayrollCompanyName,
						EmployeeAddress: data.EmployeeAddress,
						EmployeeContact: data.EmployeeContact,
						EmployeeImgUrl: data.EmployeeImgUrl,
						EmployeeDepartment: data.EmployeeDepartment,
						FixBasic: data.EmployeeBasicSalary,
					});
				});
				setNewOptions({ EmployeeName: employeeList });
				setDedData({ ...dedData, days: dayscount });
			});
		}
		const newdays = daysInMonth(dedData.monthNo, dedData.year);

		setDedData({ ...dedData, days: newdays });
	}, [dedData.monthNo, dedData.year]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		let sData = {
			month: dedData.month,
			EmployeeId: dedData.EmployeeId,
			EmployeeName: dedData.EmployeeName,
			EmployeeCode: dedData.EmployeeCode,
			PayrollCompanyName: dedData.PayrollCompanyName,
			year: dedData.year,
			EmployeeDepartment: dedData.EmployeeDepartment,
			FixBasic: dedData.FixBasic,
			days: dedData.days,
			weeklyoff: dedData.weeklyoff,
			coff: dedData.coff,
			unpaidLeave: dedData.unpaidLeave,
			paidLeave: dedData.paidLeave,
			nonWorkingdays: dedData.nonWorkingdays,
			totalLeave: dedData.totalLeave,
			workingDays: dedData.workingDays,
			leaveDeduction: dedData.leaveDeduction,
			esicEmployee: dedData.esicEmployee,
			esicEmployer: dedData.esicEmployer,
			pfEmployee: dedData.pfEmployee,
			pfEmployer: dedData.pfEmployer,
			professionalTax: dedData.professionalTax,
			advanceLoan: dedData.advanceLoan,
			vehicleAllownces: dedData.vehicleAllownces,
			houseAllownces: dedData.houseAllownces,
			totalDeduction: dedData.totalDeduction,
			calculativeBasic: dedData.calculativeBasic,
			allowncesOther: dedData.allowncesOther,
			inHandSalary: dedData.inHandSalary,
			ctc: dedData.ctc,
		};

		if (!dedData.Editid) {
			await EmployeeDeduction.add(sData)
				.then(() => {
					setDedData(initialstate);
					alert("Data Insert successfully!");
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			EmployeeDeduction.doc(dedData.Editid)
				.update(sData)
				.then(() => {
					setDedData(initialstate);
					alert("Data Update successfully!");
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setDedData({ ...dedData, [name]: value });
	};
	const {
		EmployeeId,
		EmployeeName,
		EmployeeEmail,
		EmployeeCode,
		EmployeeContact,
		EmployeeImgUrl,
		month,
		year,
		EmployeeDepartment,
		FixBasic,
		days,
		weeklyoff,
		coff,
		unpaidLeave,
		paidLeave,
		nonWorkingdays,
		totalLeave,
		workingDays,
		leaveDeduction,
		esicEmployee,
		esicEmployer,
		pfEmployee,
		pfEmployer,
		professionalTax,
		advanceLoan,
		vehicleAllownces,
		houseAllownces,
		totalDeduction,
		calculativeBasic,
		allowncesOther,
		inHandSalary,
		ctc,
		TabtoggleState,
	} = dedData;
	return (
		<form className="form-container" onSubmit={handleSubmit}>
			<h2 className="section-title">Salary Entry form</h2>
			<p className="section-subtitle">
				Select month/year/Employee for enter Addition Deduction Value .
			</p>

			<div className="deduction-dropdown-with-header">
				<div className="selection-menu">
					<Select
						className="dropdown-menu"
						placeholder="Month for Deduction"
						value={months.find((obj) => obj.label === month) || ""} // set selected value
						options={months} // set list of the data
						onChange={(e) => {
							setDedData({
								...dedData,
								month: e.label,
								monthNo: e.value,
							});
						}} // assign onChange function
					/>
					<Select
						className="dropdown-menu"
						placeholder="Year for Deduction"
						value={years.find((obj) => obj.value === year) || ""} // set selected value
						options={years} // set list of the data
						onChange={(e) => {
							setDedData({ ...dedData, year: e.value });
						}} // assign onChange function
					/>
					<Select
						className="dropdown-menu"
						placeholder="Select Employee"
						value={
							newOptions.EmployeeName.find(
								(obj) => obj.label === EmployeeName,
							) || ""
						} // set selected value
						options={newOptions.EmployeeName} // set list of the data
						onChange={(e) => {
							setDedData({
								...dedData,
								EmployeeName: e.label,
								EmployeeId: e.value,
								EmployeeCode: e.EmployeeCode,
								EmployeeEmail: e.EmployeeEmail,
								PayrollCompanyName: e.PayrollCompanyName,
								EmployeeAddress: e.EmployeeAddress,
								EmployeeContact: e.EmployeeContact,
								EmployeeImgUrl: e.EmployeeImgUrl,
								EmployeeDepartment: e.EmployeeDepartment,
								FixBasic: e.FixBasic,
							});
						}} // assign onChange function
					/>
				</div>

				{EmployeeId !== "" ? (
					<div className="card-for-image-text">
						<div
							className="header-image"
							style={{
								backgroundImage: `url(${EmployeeImgUrl})`,
								backgroundPosition: "center",
								backgroundSize: "cover",
								backgroundRepeat: "no-repeat",
							}}
						></div>

						<div className="card-for-header">
							<div className="header-text">
								Employee Id: <strong>{EmployeeCode}</strong>
							</div>
							<div className="header-text">
								Employee Name: <strong>{EmployeeName}</strong>
							</div>
							<div className="header-text">
								Employee Department: <strong>{EmployeeDepartment}</strong>
							</div>
							<div className="header-text">
								Email: <strong>{EmployeeEmail}</strong>
							</div>
							<div className="header-text">
								Contact:<strong> {EmployeeContact}</strong>
							</div>
							<div className="header-text">
								FixBasic:<strong> {FixBasic}</strong>
							</div>
							<div className="header-text">
								In Hand Salary:<strong> {inHandSalary}</strong>
							</div>
							<div className="header-text">
								CTC Amount:<strong> {ctc}</strong>
							</div>
						</div>
					</div>
				) : null}
			</div>
			<div className="container">
				<div className="bloc-tabs">
					<div
						className={TabtoggleState === 1 ? "tabs active-tabs" : "tabs"}
						onClick={() => setDedData({ ...dedData, TabtoggleState: 1 })}
					>
						Deduction
					</div>
					<div
						className={TabtoggleState === 2 ? "tabs active-tabs" : "tabs"}
						onClick={() => setDedData({ ...dedData, TabtoggleState: 2 })}
					>
						Addition
					</div>
				</div>
				<div className="content-tabs">
					<div
						className={
							TabtoggleState === 1 ? "content  active-content" : "content"
						}
					>
						<div className="card-for-add-ded">
							<div className="header-text">
								Days in Month:<strong> {days}</strong>
							</div>
							<div className="header-text">
								Non Working days: <strong>{nonWorkingdays}</strong>
							</div>
							<div className="header-text">
								Total Leave: <strong>{totalLeave}</strong>
							</div>
							<div className="header-text">
								Working days: <strong>{workingDays}</strong>
							</div>
							<div className="header-text">
								Leave deduction:<strong> {leaveDeduction}</strong>
							</div>
							<div className="header-text">
								ESIC Employee: <strong>{esicEmployee}</strong>
							</div>

							<div className="header-text">
								PF Employee: <strong>{pfEmployee}</strong>
							</div>
							<div className="header-text">
								Calculativr Basic: <strong>{calculativeBasic}</strong>
							</div>
							<div className="header-text">
								Total Deduction:<strong> {totalDeduction}</strong>
							</div>

							<div className="header-text">
								Total addition: <strong>{calculativeBasic}</strong>
							</div>
							<div className="header-text">
								ESIC Employer: <strong>{esicEmployer}</strong>
							</div>
							<div className="header-text">
								PF Employer: <strong>{pfEmployer}</strong>
							</div>
						</div>
						<div className="tab-container">
							<FormInput
								type="number"
								name="weeklyoff"
								value={weeklyoff || ""}
								onChange={handleChange}
								label="WEEKLY OFF"
								required
							/>
							<FormInput
								type="number"
								name="coff"
								value={coff || ""}
								onChange={handleChange}
								label="C OFF"
							/>

							<FormInput
								type="number"
								name="unpaidLeave"
								value={unpaidLeave || ""}
								onChange={handleChange}
								label="UNPAID LEAVE/LWP"
							/>
							<FormInput
								type="number"
								name="paidLeave"
								value={paidLeave || ""}
								onChange={handleChange}
								label="PAID LEAVE/EXTRA WORK"
							/>

							<FormInput
								type="number"
								name="professionalTax"
								value={professionalTax || ""}
								onChange={handleChange}
								label="PROFESSIONAL TAX"
								required
							/>
							<FormInput
								type="number"
								name="advanceLoan"
								value={advanceLoan || ""}
								onChange={handleChange}
								label="ADVANCE LOAN"
								required
							/>
						</div>
					</div>
					<div
						className={
							TabtoggleState === 2 ? "content  active-content" : "content"
						}
					>
						<div className="card-for-add-ded">
							<div className="header-text">
								Days in Month:<strong> {days}</strong>
							</div>
							<div className="header-text">
								Non Working days: <strong>{nonWorkingdays}</strong>
							</div>
							<div className="header-text">
								Total Leave: <strong>{totalLeave}</strong>
							</div>
							<div className="header-text">
								Working days: <strong>{workingDays}</strong>
							</div>
							<div className="header-text">
								Leave deduction:<strong> {leaveDeduction}</strong>
							</div>
							<div className="header-text">
								ESIC Employee: <strong>{esicEmployee}</strong>
							</div>

							<div className="header-text">
								PF Employee: <strong>{pfEmployee}</strong>
							</div>
							<div className="header-text">
								Calculativr Basic: <strong>{calculativeBasic}</strong>
							</div>
							<div className="header-text">
								Total Deduction:<strong> {totalDeduction}</strong>
							</div>

							<div className="header-text">
								Total addition: <strong>{calculativeBasic}</strong>
							</div>
							<div className="header-text">
								ESIC Employer: <strong>{esicEmployer}</strong>
							</div>
							<div className="header-text">
								PF Employer: <strong>{pfEmployer}</strong>
							</div>
						</div>
						<div className="tab-container">
							<FormInput
								type="number"
								name="vehicleAllownces"
								value={vehicleAllownces || ""}
								onChange={handleChange}
								label="VEHICLE ALLOWNCES"
								required
							/>
							<FormInput
								type="number"
								name="houseAllownces"
								value={houseAllownces || ""}
								onChange={handleChange}
								label="HOUSE ALLOWNCES"
								required
							/>

							<FormInput
								type="number"
								name="allowncesOther"
								value={allowncesOther || ""}
								onChange={handleChange}
								label="ALLOWNCES OTHER"
								required
							/>
						</div>
					</div>
				</div>
			</div>
			<CustomButton type="submit" sizefix>
				SUBMIT
			</CustomButton>
		</form>
	);
};
export default PayrollDeductionEntry;
