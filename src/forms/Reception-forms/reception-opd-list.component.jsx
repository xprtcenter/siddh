import React from "react";

import { OpdData } from "./Functions/getopddetails";
import CustomTable from "../../component/table/custom-table-material.component";

const OpdRegList = () => {
	const tableTitle = "Patient List";
	const columns = [
		{
			title: "Registration Date",
			field: "regDate",
			type: "datetime",
			cellStyle: { padding: "0 1.5vw", textAlign: "center" },
		},
		{
			title: "Patient Name",
			field: "patientname",
			type: "string",
			cellStyle: { padding: "0 1.7vw", textAlign: "left" },
		},

		/* 	{
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
					alt="Emp Inage"
				/>
			),
			cellStyle: { padding: "0 1.5vw", textAlign: "center" },
		}, */

		{
			title: "Mobile No",
			field: "mobileno",
			cellStyle: { padding: "0 1.5vw" },
		},
		{
			title: "Guardian Name",
			field: "guardianname",
			cellStyle: { padding: 0 },
		},
		{
			title: "Address",
			field: "address",
			cellStyle: { padding: "0 1.5vw" },
		},
		{
			title: "Age",
			field: "age",
			cellStyle: { padding: "0 1.5vw" },
		},
	];
	return (
		<CustomTable data={OpdData} columns={columns} tableTitle={tableTitle} />
	);
};
export default OpdRegList;
