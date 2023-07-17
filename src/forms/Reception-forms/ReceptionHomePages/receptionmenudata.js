import {
	BiBuoy,
	BiGridVertical,
	BiGroup,
	BiMessageSquareDetail,
	BiReceipt,
} from "react-icons/bi";

const receptiondata = {
	receptionMenu: [
		{
			id: 1,
			iconname: BiBuoy,
			menuName: "Doctor Master",
			menuUrl: "doctormaster",
		},
		{
			id: 2,
			iconname: BiGridVertical,
			menuName: "Patient List",
			menuUrl: "opdlist",
		},
		{
			id: 3,
			iconname: BiGroup,

			menuName: "Patient Registration Entry",
			menuUrl: "patregentry",
		},
		{
			id: 4,

			iconname: BiMessageSquareDetail,
			menuName: "OPD Booking",
			menuUrl: "opdbooking",
		},
		{
			id: 5,
			iconname: BiReceipt,

			menuName: "OPD Reports",
			menuUrl: "opdreports",
		},
	],
};

export default receptiondata;
