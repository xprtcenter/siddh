import React, { useState, useEffect } from "react";
import "./list-table.style.scss";
import "../spinners/loder.css";
import MaterialTable from "material-table";
//import MaterialTable from "@material-table/core";
import tableIcons from "./MaterialTableIcons";

const CustomTable = ({
	data,
	columns,
	tableTitle,
	editFunction,
	addFunction,
	deleteFunction,
}) => {
	const [mydata, setMyData] = useState([]);
	const [loder, setLoder] = useState(true);

	useEffect(() => {
		const getData = async () => {
			const updatedData = await data.get();
			let employee = [];
			updatedData.docs.forEach((doc) => {
				employee.push({ ...doc.data(), id: doc.id });
			});
			//console.log(employee);
			setMyData(employee);
			setLoder(false);
		};

		getData();
	}, [data]);

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
