import React, { useState } from "react";
import Select from "react-select";
import "./styles.scss";
import FormDropDown from "../../../component/form-dropdown/form-dropdown.component";

const PayrollReportPage = () => {
	const [report, setReport] = useState({
		selectedreport: "",
	});
	var reportSelection = [
		{ value: "1", label: "Employee List" },
		{ value: "2", label: "Employee Bank Report" },
	];
	// set selected value
	const setSelectedValue =
		reportSelection.find((obj) => obj.label === report.selectedreport) || "";
	return (
		<div className="report-container">
			<p className="tite">Payroll Report Page</p>
			<div className="selection-menu">
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
				{/* <Select
					className="dropdown-menu"
					placeholder="Select Report Type"
					value={setSelectedValue}
					options={reportSelection} // set list of the data
					onChange={(e) => {
						setReport({
							...report,
							selectedreport: e.label,
						});
					}} // assign onChange function
				/> */}
				<div className="button-submit">Submit</div>
			</div>
			<div className="Report-container"></div>
		</div>
	);
};
export default PayrollReportPage;
