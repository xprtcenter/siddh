import React, { useState } from "react";
import PayrollEmpListDetails from "../payroll-emp-list-details.component";
import PayrollBankReport from "../payroll-bank-report.component";
import PayrollSalaryReport from "../payroll-salary-report.component";
import "./styles.scss";
import FormDropDown from "../../../component/form-dropdown/form-dropdown.component";

const PayrollReportPage = () => {
	const [report, setReport] = useState({
		selectedreport: "",
		viewReport: "",
	});
	let reportSelection = [
		{ value: "1", label: "Employee Details List" },
		{ value: "2", label: "Employee Bank Report" },
		{ value: "3", label: "Salary Report" },
	];
	// set selected value
	const setSelectedValue =
		reportSelection.find((obj) => obj.label === report.selectedreport) || "";

	function onSubmit() {
		setReport({
			viewReport: report.selectedreport,
		});
	}
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
							selectedreport: e.label,
						});
					}} // assign onChange function
				/>

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
						<PayrollSalaryReport />
					) : null}
				</div>
			</div>
		</div>
	);
};
export default PayrollReportPage;
