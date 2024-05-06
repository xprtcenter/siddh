import { FcSalesPerformance } from "react-icons/fc";
import { BsCardList } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiFoodTag, BiFoodMenu } from "react-icons/bi";

const complaintdata = {
	complaintMenu: [
		{
			id: 1,
			iconname: FcSalesPerformance,
			menuName: "Complaint Master",
			menuUrl: "complaintmaster",
		},
		{
			id: 2,
			iconname: BsCardList,
			menuName: "Complaint List",
			menuUrl: "complaintlistentryform",
		},
		{
			id: 3,
			iconname: AiOutlineUsergroupAdd,
			menuName: "Complaint Entry",
			menuUrl: "complaintentry",
		},
		{
			id: 4,
			iconname: BiFoodTag,
			menuName: "Complaint Type Master",
			menuUrl: "complainttypemaster",
		},

		{
			id: 5,
			iconname: BiFoodMenu,
			menuName: "Reports",
			menuUrl: "complaintreports",
		},
	],
};

export default complaintdata;
