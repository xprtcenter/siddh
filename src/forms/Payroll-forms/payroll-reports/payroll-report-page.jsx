import React, { useState } from "react";
import Select from "react-select";
import PayrollEmpListDetails from "../payroll-emp-list-details.component";
import PayrollBankReport from "../payroll-bank-report.component";
import PayrollSalaryReport from "../payroll-salary-report.component.jsx";
import "./styles.scss";
import FormDropDown from "../../../component/form-dropdown/form-dropdown.component";
import { monthsObject, monthsList, yearsList } from "../data/monthdata";
const PayrollReportPage = () => {
	const [report, setReport] = useState({
		selectedReport: "",
		viewReport: "",
	});
	const [salaryReportDropdown, setSalaryReportDropdown] = useState({
		year: "",
		month: "",
	});
	let reportSelection = [
		{ value: "1", label: "Employee Details List" },
		{ value: "2", label: "Employee Bank Report" },
		{ value: "3", label: "Salary Report" },
	];
	// set selected value
	const setSelectedValue =
		reportSelection.find((obj) => obj.label === report.selectedReport) || "";

	function onSubmit() {
		setReport({ ...report, viewReport: report.selectedReport });
	}
	console.log("dropdown log", salaryReportDropdown);
	return (
		<div className="form-container">
			<p className="tite">Payroll Report Page</p>
			<div className="selection-menu-forreportpage">
				<FormDropDown
					className="form-dropdown form-dropdown-fix"
					placeholder="Select Report Type"
					value={setSelectedValue}
					data={reportSelection} // set list of the data
					onChange={(e) => {
						setReport({
							...report,
							selectedReport: e.label,
						});
					}} // assign onChange function
				/>

				{report.selectedReport === "Salary Report" ? (
					<>
						<Select
							className="form-dropdown"
							placeholder="Month for Deduction"
							value={
								monthsObject.find(
									(obj) => obj.label === salaryReportDropdown.month,
								) || ""
							} // set selected value
							options={monthsObject} // set list of the data
							onChange={(e) => {
								setSalaryReportDropdown({
									...salaryReportDropdown,
									month: e.label,
									monthNo: e.value,
								});
							}} // assign onChange function
						/>
						<Select
							className="form-dropdown"
							placeholder="Year for Deduction"
							value={
								yearsList.find(
									(obj) => obj.value === salaryReportDropdown.year,
								) || ""
							} // set selected value
							options={yearsList} // set list of the data
							onChange={(e) => {
								console.log("Inside the year change dropdown", e);
								setSalaryReportDropdown({
									...salaryReportDropdown,
									year: e.value,
								});
							}} // assign onChange function
						/>
					</>
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
					{report.viewReport === "Employee Details List" ? (
						<PayrollEmpListDetails />
					) : null}
					{report.viewReport === "Employee Bank Report" ? (
						<PayrollBankReport />
					) : null}
					{report.viewReport === "Salary Report" ? (
						<PayrollSalaryReport salaryReportDropdown={salaryReportDropdown} />
					) : null}
				</div>
			</div>
		</div>
	);
};
export default PayrollReportPage;
