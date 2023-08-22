/* import React, { useState } from "react";
import firestore from "../../firebase/firebase.utils";

export const headermenu = () => {
	const [data, setData] = useState([]);
	const dbRef = firestore.collection("moduleAndPageMaster").get();
	console.log();
}; */
import inventory from "../../assets/inventory.jpg";
import sme from "../../assets/sme.jpg";
import pathology from "../../assets/pathology.png";
import payroll from "../../assets/payroll.jpg";
import xray from "../../assets/xray.png";
import admin from "../../assets/admin.png";
import reception from "../../assets/reception.png";
import complaint from "../../assets/complaint.png";

const moduleNamedata = {
	sections: [
		{
			title: "ADMIN",
			imageUrl: admin,
			id: 1,
			linkUrl: "modulecreation",
		},
		{
			title: "SME",
			imageUrl: sme,
			id: 2,
			linkUrl: "sme",
		},
		{
			title: "RECEPTION",
			imageUrl: reception,
			id: 3,
			linkUrl: "reception",
		},
		{
			title: "PATHOLOGY",
			imageUrl: pathology,

			id: 4,
			linkUrl: "pathology",
		},
		{
			title: "RADIOLOGY",
			imageUrl: xray,

			id: 5,
			linkUrl: "xray",
		},
		{
			title: "INVENTORY",
			imageUrl: inventory,

			id: 6,
			linkUrl: "inventory",
		},
		{
			title: "PAYROLL",
			imageUrl: payroll,

			id: 7,
			linkUrl: "payroll",
		},
		{
			title: "COMPLAINT",
			imageUrl: complaint,

			id: 8,
			linkUrl: "SHOP",
		},
	],
};
export default moduleNamedata;
