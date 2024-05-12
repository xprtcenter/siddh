import React, { useState, useEffect } from "react";

import { EmployeeData } from "./Functions/getemployeedetails";
import CustomTable from "../../component/table/custom-table-material.component";
import { firestore } from "../../firebase/firebase.utils";

const PayrollSalaryReport = ({ salaryReportDropdown }) => {
	const [salaryData, setSalaryData] = useState([]);
	const [ctcTotalArray, setCtCtotalArray] = useState([]);
	const tableTitle = "Complaint List";
	const columns = [
		{
			title: "Employee Code",
			field: "EmployeeCode",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},

		{
			title: "Employee Name",
			field: "EmployeeName",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
		{
			title: "Salary Month",
			field: "month",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
		{
			title: "Salary Year",
			field: "year",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
		{
			title: "Basic Salary",
			field: "EmployeeBasicSalary",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
		{
			title: "Total Deduction",
			field: "totalDeduction",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
		{
			title: "Total Addition",
			field: "totalAddition",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
		{
			title: "In Hand Salary",
			field: "inHandSalary",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
		{
			title: "CTC",
			field: "ctc",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
	];

	let salaryDataArray = [];
	const { month, year } = salaryReportDropdown;
	const getMonthFromString = (mon) => {
		var d = Date.parse(mon + "1, 2012");
		if (!isNaN(d)) {
			return new Date(d).getMonth() + 1;
		}
		return -1;
	};

	const employeeData = () => {
		console.log("employeedata function");

		let ctcArray = [];

		EmployeeData.onSnapshot((employees) => {
			/*************************************************get 1st employee items ********************************/
			employees.forEach((employee) => {
				const edata = employee.data();
				let activeEid = employee.id;
				if (edata.EmployeeStatusActive !== "Leaving") {
					/*************************************************get Active employee *************************************/

					let SalDataPath = firestore
						.collection("payrollData")
						.doc("Salary")
						.collection(activeEid);
					/*************************************************get Salary by Active employee *****************************/
					SalDataPath.onSnapshot((salaryDatas) => {
						salaryDatas.forEach((salary) => {
							let sdata = salary.data();
							let sid = salary.id;
							const month1 = getMonthFromString(month);
							const monthyear = `${month1}${year}`;

							/*************************************************get salary by monthyear ********************************/
							if (monthyear === sid) {
								console.log("monthyear", monthyear);
								console.log("salary id", sid);
								console.log("salary data", sdata);
								salaryDataArray.push({ ...edata, ...sdata });
								console.log("sa;asdasdasd 2", salaryDataArray);
								//combine employee and salary data
								//create array

								//creating array of ctc data
								/* 	let ctc = sdata.ctc;
								ctcArray.push(parseFloat(ctc)); */
							}
						});
						setSalaryData(salaryDataArray);
					});
				}
			});
			//check active employee
			//get salary data
			//check month year
			console.log("sa;asdasdasd", salaryDataArray);
		});

		//set salaryData
		// const ctcsum = ctcArray.reduce(
		// 	(previousValue, currentValue, index) => previousValue + currentValue,
		// 	0,
		// );
		// setCtCtotalArray(ctcsum);
		// setLoder(false);
	};
	/* 
	useEffect(() => {
		console.log("useeffect");
		if (salaryData.length === 0) {
			employeeData();
		}

		console.log("salaryData inside useeffect", salaryData);
	}, [salaryData.length, salaryDataArray]);
 */
	return (
		<div className="table-container">
			{salaryData.length > 0 ? (
				<CustomTable
					data={salaryData}
					columns={columns}
					tableTitle={tableTitle}
					/* editFunction={registrationEditPath} */
					/* addFunction={addFunction}
				deleteFunction={deleteFunction} */
				/>
			) : (
				"No Data Found"
			)}
		</div>
	);
};
export default PayrollSalaryReport;
