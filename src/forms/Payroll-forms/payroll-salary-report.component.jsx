import React, { useEffect } from "react";

import { EmployeeData } from "./Functions/getemployeedetails";
import CustomTable from "../../component/table/custom-table-material.component";
import { useHistory } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";
const PayrollSalaryReport = () => {
	const history = useHistory();

	const registrationEditPath = (id) => {
		let path = `payrollempregmaster/${id}`;
		history.push(path);
	};
	function addFunction() {
		let path = `payrollempregmaster`;
		history.push(path);
	}
	const deleteFunction = (id) => {
		const db = firestore.doc(
			`payrollData/payrollEmpRegistration/payrollEmployee/${id}`,
		);
		db.delete().then(() => {
			alert("deleted");
		});

		console.log("user for delete", id);
	};
	const tableTitle = "Payroll Employee List";
	const columns = [
		{
			title: "Employee Code",
			field: "EmployeeCode",
			type: "numeric",
			cellStyle: { padding: "0 1.5vw", textAlign: "center" },
		},
		{
			title: "Employee Image",
			field: "EmployeeImgUrl",
			render: (rowData) => (
				<img
					src={rowData.EmployeeImgUrl}
					style={{
						width: 35,
						height: 35,
						objectFit: "cover",
						borderRadius: "50%",
					}}
					alt="Emp Img"
				/>
			),
			cellStyle: { padding: "0 1.5vw", textAlign: "center" },
		},

		{
			title: "Employee Name",
			field: "EmployeeName",
			cellStyle: { padding: "0 1.5vw" },
		},
		{ title: "Email", field: "EmployeeEmail", cellStyle: { padding: 0 } },
		{
			title: "Company Name",
			field: "PayrollCompanyName",
			cellStyle: { padding: "0 1.5vw" },
		},
		{
			title: "Address",
			field: "EmployeeAddress",
			cellStyle: { padding: "0 1.5vw" },
		},
		{
			title: "Contact",
			field: "EmployeeContact",
			cellStyle: { padding: "0 1.5vw" },
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
export default PayrollSalaryReport;
