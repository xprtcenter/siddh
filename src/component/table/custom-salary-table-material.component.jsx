import React, { useState, useEffect } from "react";
import "./list-table.style.scss";
import "../spinners/loder.css";
import MaterialTable from "material-table";
//import MaterialTable from "@material-table/core";
import tableIcons from "./MaterialTableIcons";
import { firestore } from "../../firebase/firebase.utils";
const CustomTable = ({
	data,
	columns,
	tableTitle,
	editFunction,
	addFunction,
	deleteFunction,
	month,
	year,
}) => {
	const [mySaldata, setMysalData] = useState([]);
	const [mydata, setMyData] = useState([]);
	const [loder, setLoder] = useState(false);

	const getMonthFromString = (mon) => {
		var d = Date.parse(mon + "1, 2012");
		if (!isNaN(d)) {
			return new Date(d).getMonth() + 1;
		}
		return -1;
	};

	let salaryDataArray = [];
	const employeeData = async () => {
		console.log("employeedata function");
		let ctcArray = [];
		await data.onSnapshot((employees) => {
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
								console.log("salary data from function", sdata);
								salaryDataArray.push({ ...edata, ...sdata });
								console.log(
									"Salary Data Array inside employee function",
									salaryDataArray,
								);
								//combine employee and salary data
								//create array

								//creating array of ctc data
								/* 	let ctc = sdata.ctc;
								ctcArray.push(parseFloat(ctc)); */
								setMyData(salaryDataArray);
							}
						});
					});
				}
			});
			//check active employee
			//get salary data
			//check month year
			console.log("Salary Data Array Out Site of SnapShot", salaryDataArray);
		});

		//set salaryData
		// const ctcsum = ctcArray.reduce(
		// 	(previousValue, currentValue, index) => previousValue + currentValue,
		// 	0,
		// );
		// setCtCtotalArray(ctcsum);
		//setMyData(mySaldata);
		console.log("my sal data", mySaldata);
		console.log("my data", mydata);
		//setLoder(false);
	};
	useEffect(() => {
		if (mydata.length === 0) {
			employeeData();
		}
		setMyData(salaryDataArray);
	}, [mydata]);

	return (
		<div className="custom-table">
			{loder ? (
				<div id="cover-spin"></div>
			) : (
				<MaterialTable
					title={tableTitle}
					actions={[
						{
							icon: tableIcons.Edit,
							tooltip: "Edit User",
							//onClick: (event, rowData) => alert("You Edit " + rowData.id),
							onClick: (event, rowData) => {
								editFunction(rowData.id);
							},
						},
						{
							icon: tableIcons.Delete,
							tooltip: "Delete Employee",

							onClick: (event, rowData) => {
								deleteFunction(rowData.id);
							},
						},
						{
							icon: tableIcons.Add,
							tooltip: "Add New Employee",
							isFreeAction: true,
							onClick: (event) => {
								addFunction();
							},
						},
					]}
					icons={tableIcons}
					columns={columns}
					data={mydata}
					options={{
						exportButton: true,
						sorting: true,
						actionsColumnIndex: -1,
						headerStyle: {
							padding: "0 1.5vw",
							whiteSpace: "nowrap",
							borderCollapse: "collapse",
							textAlign: "center",
							backgroundColor: "var(--primary-color)",
						},
						rowStyle: {
							"&:hover": { backgroundColor: "var(--primary-color)" },
						},
					}}
					localization={{
						pagination: {
							labelDisplayedRows: "{from}-{to} of {count}",
						},
						toolbar: {
							nRowsSelected: "{0} row(s) selected",
						},
						header: {
							actions: "Actions",
						},
						body: {
							emptyDataSourceMessage: "records not found",
							filterRow: {
								filterTooltip: "Filter",
							},
						},
					}}
				/>
			)}
		</div>
	);
};
export default CustomTable;
