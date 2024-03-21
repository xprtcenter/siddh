import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./payroll-reports/styles.scss";
import FormDropDown from "../../component/form-dropdown/form-dropdown.component";
import {
	monthsObject,
	monthsList,
	yearsList,
} from "../Payroll-forms/data/monthdata.js";
const PayrollPayslip = () => {
	const [report, setReport] = useState({
		selectedReport: "",
		viewReport: "",
	});

	let dt = new Date();
	let monthNois = dt.getMonth();
	let currentMonthName = monthsList[monthNois !== 0 ? monthNois - 1 : 12]; // "July" (or current month)
	let currentYear = dt.getFullYear(); // "2022" (or current year)

	const [monthyearSelection, setMonthYearSelection] = useState({
		year: currentYear,
		month: currentMonthName,
	});
	let reportType = [
		{ value: "1", label: "Selected Employee Payslip" },
		{ value: "2", label: "All Employee Payslip" },
	];

	useEffect(() => {
		if (report.selectedReport !== report.viewReport) {
			setReport({ ...report, viewReport: "" });
		}
	}, [report.selectedReport]);
	// set selected value
	const setSelectedValue =
		reportType.find((obj) => obj.label === report.selectedReport) || "";

	function onSubmit() {
		setReport({ ...report, viewReport: report.selectedReport });
	}
	//console.log("dropdown log", salaryReportDropdown);
	return (
		<div className="form-container">
			<h2 className="section-title">Payroll Payslip</h2>
			<div className="selection-menu-forreportpage">
				<Select
					className="form-dropdown"
					placeholder="Month for Deduction"
					value={
						monthsObject.find(
							(obj) => obj.label === monthyearSelection.month,
						) || ""
					} // set selected value
					options={monthsObject} // set list of the data
					onChange={(e) => {
						setMonthYearSelection({
							...monthyearSelection,
							month: e.label,
							monthNo: e.value,
						});
					}} // assign onChange function
				/>
				<Select
					className="form-dropdown"
					placeholder="Year for Deduction"
					value={
						yearsList.find((obj) => obj.value === monthyearSelection.year) || ""
					} // set selected value
					options={yearsList} // set list of the data
					onChange={(e) => {
						//console.log("Inside the year change dropdown", e);
						setMonthYearSelection({
							...monthyearSelection,
							year: e.value,
						});
					}} // assign onChange function
				/>
				<FormDropDown
					className="form-dropdown form-dropdown-fix"
					placeholder="Select Report Type"
					value={setSelectedValue}
					data={reportType} // set list of the data
					onChange={(e) => {
						setReport({
							...report,
							selectedReport: e.label,
						});
					}} // assign onChange function
				/>

				{report.selectedReport === "Selected Employee Payslip" ? (
					<Select
						className="form-dropdown"
						placeholder="Year for Deduction"
						value={
							yearsList.find((obj) => obj.value === monthyearSelection.year) ||
							""
						} // set selected value
						options={yearsList} // set list of the data
						onChange={(e) => {
							//console.log("Inside the year change dropdown", e);
							setMonthYearSelection({
								//...salaryReportDropdown,
								year: e.value,
							});
						}} // assign onChange function
					/>
				) : null}
				<div
					onClick={() => {
						onSubmit();
					}}
					className="button-submit-formpage"
				>
					Submit
				</div>
			</div>
			<div className="report-container-forreportpage">
				<div>
					{report.viewReport === "Employee Details List"
						? "Employee details list"
						: null}
					{report.viewReport === "Employee Bank Report"
						? "Employee Bank Report"
						: null}
					{report.viewReport === "Salary Report" ? "Salary Report" : null}
				</div>
			</div>
		</div>
	);
};
export default PayrollPayslip;
