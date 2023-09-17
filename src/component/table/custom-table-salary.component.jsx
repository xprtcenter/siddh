import React, { useState, useEffect } from "react";
import "./list-table.style.scss";
import "../spinners/loder.css";
import MaterialTable from "material-table";
import tableIcons from "./MaterialTableIcons";

const SalaryTable = ({
	data,
	columns,
	tableTitle,
	editFunction,
	addFunction,
	deleteFunction,
	activeEmployeeList,
}) => {
	//const [mydata, setMyData] = useState([]);
	const [loder, setLoder] = useState(true);
	/* const getData = async () => {
		const getSalaryData = (e) => {
			if (e.value !== "") {
				const EmployeeSalaryEntryCollectionPath = firestore
					.collection("payrollData")
					.doc("Salary")
					.collection(e.value);
	
				const selectedEmployeeInfo = newOptions.EmployeeArray.filter((item) => {
					return item.value === e.value;
				});
				console.log("selectedEmployeeInfo items", selectedEmployeeInfo);
				EmployeeSalaryEntryCollectionPath.onSnapshot((items) => {
					let SalaryDataList = [];
					items.forEach((item) => {
						let Salary = item.data();
						SalaryDataList.push({ ...Salary });
					});
					let SalaryDataSingle = SalaryDataList.filter(
						(item) =>
							item.month === salaryData.month && item.year === salaryData.year,
					);
					let newSalaryDataSingle = SalaryDataSingle[0];
					setSalaryData({
						...selectedEmployeeInfo[0],
						...newSalaryDataSingle,
						month: salaryData.month,
						monthNo: salaryData.monthNo,
						year: salaryData.year,
						days: salaryData.days,
					});
				});
			}
		};

		let employees = [];
		const updatedData = await data.get();
		console.log("updated data in use effect salary table page", updatedData);
		updatedData.docs.forEach((doc) => {			
			let adata = doc.data();
			employees.push({ ...adata, id: doc.id });
		}); 
		updatedData.docs.forEach((doc) => {	
			let adata = doc.data();
			employees.push({ ...adata, id: doc.id });
		});
		 const filteredArray = employees.filter((item) =>
			activeEmployeeList.some((obj) => obj.id === item.id),
		);

		// setMyData(filteredArray);
		setLoder(false);
	}; */
	useEffect(() => {
		/* if (mydata.length === 0) {
			getData();
		} */
	}, []);

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
					//data={mydata}
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
export default SalaryTable;
