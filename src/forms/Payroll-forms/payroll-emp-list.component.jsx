import React, { useEffect } from "react";

import { EmployeeData } from "./Functions/getemployeedetails";
import CustomTable from "../../component/table/custom-table-material.component";
import { useHistory } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";
const PayrollEmpList = () => {
	/* ************table code start **********************************/

	function ResponsiveCellHeaders(elmID) {
		try {
			var THarray = [];
			var table = document.getElementById(elmID);
			var ths = table.getElementsByTagName("th");
			for (let i = 0; i < ths.length; i++) {
				var headingText = ths[i].innerHTML;
				THarray.push(headingText);
			}
			var styleElm = document.createElement("style"),
				styleSheet;
			document.head.appendChild(styleElm);
			styleSheet = styleElm.sheet;
			for (let i = 0; i < THarray.length; i++) {
				styleSheet.insertRule(
					"#" +
						elmID +
						" td:nth-child(" +
						(i + 1) +
						')::before {content:"' +
						THarray[i] +
						': ";}',
					styleSheet.cssRules.length,
				);
			}
		} catch (e) {
			console.log("ResponsiveCellHeaders(): " + e);
		}
	}
	ResponsiveCellHeaders("Books");

	// https://adrianroselli.com/2018/02/tables-css-display-properties-and-aria.html
	// https://adrianroselli.com/2018/05/functions-to-add-aria-to-tables-and-lists.html
	function AddTableARIA() {
		try {
			var allTables = document.querySelectorAll("table");
			for (let i = 0; i < allTables.length; i++) {
				allTables[i].setAttribute("role", "table");
			}
			var allRowGroups = document.querySelectorAll("thead, tbody, tfoot");
			for (let i = 0; i < allRowGroups.length; i++) {
				allRowGroups[i].setAttribute("role", "rowgroup");
			}
			var allRows = document.querySelectorAll("tr");
			for (let i = 0; i < allRows.length; i++) {
				allRows[i].setAttribute("role", "row");
			}
			var allCells = document.querySelectorAll("td");
			for (let i = 0; i < allCells.length; i++) {
				allCells[i].setAttribute("role", "cell");
			}
			var allHeaders = document.querySelectorAll("th");
			for (let i = 0; i < allHeaders.length; i++) {
				allHeaders[i].setAttribute("role", "columnheader");
			}
			// this accounts for scoped row headers
			var allRowHeaders = document.querySelectorAll("th[scope=row]");
			for (let i = 0; i < allRowHeaders.length; i++) {
				allRowHeaders[i].setAttribute("role", "rowheader");
			}
			// caption role not needed as it is not a real role and
			// browsers do not dump their own role with display block
		} catch (e) {
			console.log("AddTableARIA(): " + e);
		}
	}

	AddTableARIA();

	/* table code end */
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
export default PayrollEmpList;
