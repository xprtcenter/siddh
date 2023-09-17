import React, { useState, useEffect } from "react";

import { EmployeeData } from "./Functions/getemployeedetails";
import SalaryTable from "../../component/table/custom-table-salary.component";
import { useHistory } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";

const PayrollSalaryReport = (salaryReportDropdown) => {
	const { year, month, monthNo } = salaryReportDropdown.salaryReportDropdown;
	const history = useHistory();
	const [salaryData, setSalaryData] = useState([]);
	const [mydata, setMyData] = useState([]);
	const [activeEmployeeList, setActiveEmployeeList] = useState([]);
	const EmployeeSalaryData = firestore
		.collection("payrollData")
		.doc("Salary")
		.collection("8Sh6sPKmLmN86AlShud6");

	const getData = async () => {
		let employees = [];
		const updatedData = await EmployeeSalaryData.get();
		console.log("updated data in use effect salary report page", updatedData);
		updatedData.docs.forEach((doc) => {
			let adata = doc.data();
			employees.push({ ...adata, id: doc.id });
		});

		console.log(
			"updated employee data in use effect salary report page",
			employees,
		);
		const filteredArray = employees.filter((item) =>
			activeEmployeeList.some((obj) => obj.id === item.id),
		);

		setMyData(filteredArray);
	};
	useEffect(() => {
		if (salaryData.length === 0) {
			EmployeeData.onSnapshot((items) => {
				let employeeList = [];
				items.forEach((item) => {
					let data = item.data();
					let id = item.id;

					employeeList.push({ id, ...data });
				});
				const employeeListnew = employeeList.filter(
					(item) => item.EmployeeStatusActive !== "Leaving",
				);
				setSalaryData(employeeListnew);
				setActiveEmployeeList(employeeListnew.id);
			});
		}
		if (mydata.length === 0) {
			getData();
		}
	}, [mydata]);
	console.log("dropdown log from salary report page", salaryReportDropdown);

	console.log("myData state", mydata);
	//console.log("activeEmployeelist from table component", activeEmployeeList);
	const tableTitle = "Payroll Employee Salary List";
	const columns = [
		{
			title: "Employee Code",
			field: "EmployeeCode",
			type: "numeric",
			cellStyle: { padding: "0 1.5vw", textAlign: "center" },
		},

		{
			title: "Employee Name",
			field: "EmployeeName",
			cellStyle: { padding: "0 1.5vw" },
		},
	];
	return (
		<div>
			<h1>Table Component</h1>
			year: {year}, month:{month}, monthNo:{monthNo}
		</div>
	);
};
export default PayrollSalaryReport;
