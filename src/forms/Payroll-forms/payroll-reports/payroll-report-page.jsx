import React, { useState } from "react";
import Select from "react-select";
import "./styles.scss";

const PayrollReportPage = () => {
	const [report, setReport] = useState({
		selectedreport: "",
	});
	var reportSelection = [
		{ value: "1", label: "Employee List" },
		{ value: "2", label: "Employee Bank Report" },
	];

	return (
		<div className="report-container">
			<p className="tite">Payroll Report Page</p>
			<div className="selection-menu">
				<Select
					className="dropdown-menu"
					placeholder="Select Report Type"
					value={
						reportSelection.find(
							(obj) => obj.label === report.selectedreport,
						) || ""
					} // set selected value
					options={reportSelection} // set list of the data
					onChange={(e) => {
						setReport({
							...report,
							selectedreport: e.label,
						});
					}} // assign onChange function
				/>
				<div className="button-submit">Submit</div>
			</div>
			<div className="Report-container"></div>
		</div>
	);
};
export default PayrollReportPage;
