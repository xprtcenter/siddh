import React, { useState, useEffect, useRef } from "react";

import { EmployeeData } from "./Functions/getemployeedetails";

//import { useHistory } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";

import "../../component/table/list-table.style.scss";
import "../../component/spinners/loder.css";

import { useDownloadExcel } from "react-export-table-to-excel";

const PayrollSalaryReport = (salaryReportDropdown) => {
	const { year, month, monthNo } = salaryReportDropdown.salaryReportDropdown;
	//const history = useHistory();

	const [salaryData, setSalaryData] = useState([]);

	const [loder, setLoder] = useState(true);

	const employeeData = () => {
		console.log("employeedata function");
		let salaryDataArray = [];
		EmployeeData.onSnapshot((employees) => {
			//get 1st employee items
			employees.forEach((employee) => {
				let data = employee.data();
				let id = employee.id;
				//employeeData.push({ id, ...data });
				//check active employee
				if (data.EmployeeStatusActive !== "Leaving") {
					//console.log("id", id);
					//console.log("data", data);
					//get salary data
					let EmployeePath = firestore
						.collection("payrollData")
						.doc("Salary")
						.collection(id);
					EmployeePath.onSnapshot((salaryData) => {
						salaryData.forEach((salary) => {
							let sdata = salary.data();
							let sid = salary.id;
							const monthyear = `${monthNo}${year}`;
							//check month year
							if (monthyear === sid) {
								//console.log("monthyear", monthyear);
								//console.log("salary id", sid);
								//console.log("salary data", sdata);
								//combine employee and salary data
								//create array
								salaryDataArray.push({ ...data, ...sdata });
							}
						});
					});
				}
			});
		});
		//set salaryData
		//console.log("salaryDataArray", salaryDataArray);
		setSalaryData(salaryDataArray);
		setLoder(false);
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

		console.log("salaryData inside useeffect", salaryData);
	}, [salaryData.length, month, year]);
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
					</tbody>
				</table>
			)}
		</div>
	);
};
export default PayrollSalaryReport;
