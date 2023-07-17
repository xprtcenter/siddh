import {
	BiBuoy,
	BiGridVertical,
	BiGroup,
	BiMessageSquareDetail,
	BiReceipt,
	BiNews,
	BiHotel,
	BiSpreadsheet,
} from "react-icons/bi";

const smedata = {
	smeMenu: [
		{
			id: 1,
			iconname: BiBuoy,
			menuName: "Contractor Master",
			menuUrl: "smeconmaster",
		},
		{
			id: 2,
			iconname: BiGridVertical,
			menuName: "Contractor List",
			menuUrl: "smecontlist",
		},
		{
			id: 3,
			iconname: BiGroup,

			menuName: "Contractor Employee Entry",
			menuUrl: "smeconempentry",
		},
		{
			id: 4,

			iconname: BiMessageSquareDetail,
			menuName: "Payment Details",
			menuUrl: "smepaydetails",
		},
		{
			id: 5,
			iconname: BiReceipt,

			menuName: "Contractor wise full Details",
			menuUrl: "smecontfulldetails",
		},
		{
			id: 6,
			iconname: BiNews,

			menuName: "Reception Entry Form",
			menuUrl: "smereceptionentry",
		},
		{
			id: 7,

			iconname: BiHotel,
			menuName: "HealthCheckup Details Entry Form",
			menuUrl: "smehcdetails",
		},
		{
			id: 8,
			iconname: BiSpreadsheet,

			menuName: "Reports",
			menuUrl: "smereports",
		},
	],
};

export default smedata;
