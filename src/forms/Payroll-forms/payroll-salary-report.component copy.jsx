import React, { useState, useEffect, useRef } from "react";

import { EmployeeData } from "./Functions/getemployeedetails";

//import { useHistory } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";

import "../../component/table/list-table.style.scss";
import "../../component/spinners/loder.css";

import { useDownloadExcel } from "react-export-table-to-excel";

const PayrollSalaryReport = ({ salaryReportDropdown }) => {
	let salaryDataArray = [];
	const { month, year } = salaryReportDropdown;
	//const { year, month, monthNo } = salaryReportDropdown.salaryReportDropdown;
	//const history = useHistory();
	const getMonthFromString = (mon) => {
		var d = Date.parse(mon + "1, 2012");
		if (!isNaN(d)) {
			return new Date(d).getMonth() + 1;
		}
		return -1;
	};
	const [salaryData, setSalaryData] = useState([]);
	const [ctcTotalArray, setCtCtotalArray] = useState([]);

	const [loder, setLoder] = useState(true);

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
					SalDataPath.onSnapshot((salaryData) => {
						salaryData.forEach((salary) => {
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
	const tableRef = useRef(null);

	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: `Employee Salary Sheet ${month}${year}`,
		sheet: `Salary of month ${month}${year}`,
	});
	useEffect(() => {
		console.log("useeffect");
		if (salaryData.length === 0) {
			employeeData();
		}
		if (salaryData.length !== 0) {
			setLoder(false);
		}

		console.log("salaryData inside useeffect", salaryData);
	}, [salaryData.length, salaryDataArray]);
	const tableData = salaryData;
	return (
		<div className="custom-table">
			<button className="table-export-button" onClick={onDownload}>
				{" "}
				Export excel{" "}
			</button>
			{loder ? (
				<div id="cover-spin"></div>
			) : (
				<table className="table-page-formasterpage" ref={tableRef}>
					<thead>
						<tr className="table-header-formasterpage">
							<th className="th1">Employee Code</th>
							<th className="th3">Employee Name</th>
							<th className="th3">Salary Month</th>
							<th className="th3">Salary Year</th>
							<th className="th3">Basic Salary</th>
							<th className="th3">Total Deduction</th>
							<th className="th3">Total Addition</th>
							<th className="th3">In Hand Salary</th>
							<th className="th3">CTC</th>
						</tr>
					</thead>
					<tbody>
						{tableData.map((item) => (
							<tr
								className="table-data-row-formasterpage"
								key={item.EmployeeId}
							>
								<td className="emp-code-formasterpage">{item.EmployeeCode}</td>

								<td>{item.EmployeeName}</td>
								<td>{item.month}</td>
								<td>{item.year}</td>
								<td>{item.EmployeeBasicSalary}</td>
								<td>{item.totalDeduction}</td>
								<td>{item.totalAddition}</td>
								<td>{item.inHandSalary}</td>
								<td>{item.ctc}</td>
							</tr>
						))}

						{ctcTotalArray}
					</tbody>
				</table>
			)}
		</div>
	);
};
export default PayrollSalaryReport;
