import React from "react";

import { EmployeeData } from "./Functions/getemployeedetails";
import CustomTable from "../../component/table/custom-table-material.component";

const PayrollEmpList = () => {
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
					alt="Emp Image"
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
		/>
	);
};
export default PayrollEmpList;
