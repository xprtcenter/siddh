import React from "react";

import { EmployeeData } from "./Functions/getemployeedetails";
import CustomTable from "../../component/table/custom-table-material.component";
import { useHistory } from "react-router-dom";
const PayrollEmpListDetails = () => {
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
	const tableTitle = "Payroll Employee Details List";
	const columns = [
		{
			title: "Employee Code",
			field: "EmployeeCode",
			type: "numeric",
			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
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
			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},

		{
			title: "Employee Name",
			field: "EmployeeName",
			cellStyle: { padding: "0 0.5vw" },
		},
		{ title: "Email", field: "EmployeeEmail", cellStyle: { padding: 0 } },
		{
			title: "Company Name",
			field: "PayrollCompanyName",
			cellStyle: { padding: "0 0.5vw" },
		},
		{
			title: "Address",
			field: "EmployeeAddress",
			cellStyle: { padding: "0 0.5vw" },
		},
		{
			title: "Contact",
			field: "EmployeeContact",
			cellStyle: { padding: "0 0.5vw" },
		},

		{
			title: "Gender",
			field: "EmployeeGender",
			cellStyle: { padding: "0 0.5vw" },
		},
		{
			title: "DOB",
			field: "EmployeeDOB",
			cellStyle: { padding: "0 0.5vw" },
		},

		{
			title: "P Address",
			field: "EmployeePAddress",
			cellStyle: { padding: "0 0.5vw" },
		},

		{
			title: "Department",
			field: "EmployeeDepartment",
			cellStyle: { padding: "0 0.5vw" },
		},
		{
			title: "Status",
			field: "EmployeeStatusActive",
			cellStyle: { padding: "0 0.5vw" },
		},
		{
			title: "Date of Joining",
			field: "EmployeeDateofJoining",
			cellStyle: { padding: "0 0.5vw" },
		},
		{
			title: "Date of Leaving",
			field: "EmployeeDateofLeaving",
			cellStyle: { padding: "0 0.5vw" },
		},
		{
			title: "Basic Salary",
			field: "EmployeeBasicSalary",
			cellStyle: { padding: "0 0.5vw" },
		},
		{
			title: "Onroll /Contractor",
			field: "EmployeeOnrollContractor",
			cellStyle: { padding: "0 0.5vw" },
		},
		{
			title: "Bank Name",
			field: "EmployeeBankName",
			cellStyle: { padding: "0 0.5vw" },
		},
		{
			title: "Bank IFSC Code",
			field: "EmployeeBankIFSCCode",
			cellStyle: { padding: "0 0.5vw" },
		},
		{
			title: "Account No",
			field: "EmployeeAccountNo",
			cellStyle: { padding: "0 0.5vw" },
		},
		{
			title: "UAN No",
			field: "EmployeeUANNo",
			cellStyle: { padding: "0 0.5vw" },
		},
		{
			title: "ESIC No",
			field: "EmployeeESICNo",
			cellStyle: { padding: "0 0.5vw" },
		},
		{
			title: "PAN No",
			field: "EmployeePANNo",
			cellStyle: { padding: "0 0.5vw" },
		},
		{
			title: "Aadhar No",
			field: "EmployeeAadharNo",
			cellStyle: { padding: "0 0.5vw" },
		},
		{
			title: "ESIC Calculation",
			field: "ESICCalculation",
			cellStyle: { padding: "0 0.5vw" },
		},
		{
			title: "PF Calculation",
			field: "PFCalculation",
			cellStyle: { padding: "0 0.5vw" },
		},
		{
			title: "Salary In Bank",
			field: "salaryInBank",
			cellStyle: { padding: "0 0.5vw" },
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
export default PayrollEmpListDetails;
