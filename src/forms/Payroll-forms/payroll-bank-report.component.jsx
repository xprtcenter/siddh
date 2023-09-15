import React from "react";

import { EmployeeData } from "./Functions/getemployeedetails";
import CustomTable from "../../component/table/custom-table-material.component";
import { useHistory } from "react-router-dom";
const PayrollBankReport = () => {
	const history = useHistory();

	const registrationEditPath = (id) => {
		let path = `payrollempregmaster/${id}`;
		history.push(path);
	};
	function addFunction() {
		let path = `payrollempregmaster/`;
		history.push(path);
	}
	const deleteFunction = (id) => {
		alert("Are you sure want to delete :" & { id });
	};
	const tableTitle = "Employee Bank Report";
	const columns = [
		{
			title: "Emp Code",
			field: "EmployeeCode",
			type: "numeric",
			//cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},

		{
			title: "Emp Name",
			field: "EmployeeName",
			//cellStyle: { padding: "0 0.5vw" },
		},
		{ title: "Email", field: "EmployeeEmail", cellStyle: { padding: 0 } },

		{
			title: "Gender",
			field: "EmployeeGender",
			//cellStyle: { padding: "0 0.5vw" },
		},

		{
			title: "Bank Name",
			field: "EmployeeBankName",
			//cellStyle: { padding: "0 0.5vw" },
		},
		{
			title: "IFSC Code",
			field: "EmployeeBankIFSCCode",
			//cellStyle: { padding: "0 0.5vw" },
		},
		{
			title: "Account No",
			field: "EmployeeAccountNo",
			//cellStyle: { padding: "0 0.5vw" },
		},
	];
	return (
		<CustomTable
			data={EmployeeData}
			columns={columns}
			tableTitle={tableTitle}
			editFunction={registrationEditPath}
			addFunction={addFunction}
			deleteFunction={deleteFunction}
		/>
	);
};
export default PayrollBankReport;
