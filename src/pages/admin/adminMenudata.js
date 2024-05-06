import { FcSalesPerformance } from "react-icons/fc";
import { BsCardList } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiFoodTag, BiFoodMenu } from "react-icons/bi";

const admindata = {
	adminMenu: [
		{
			id: 1,
			iconname: FcSalesPerformance,
			menuName: "User Master",
			menuUrl: "usermaster",
		},
		{
			id: 2,
			iconname: BsCardList,
			menuName: "User List",
			menuUrl: "userlist",
		},
		{
			id: 3,
			iconname: AiOutlineUsergroupAdd,
			menuName: "User Type Entry",
			menuUrl: "usertypeentry",
		},
		{
			id: 4,
			iconname: BiFoodTag,
			menuName: "Module Master",
			menuUrl: "modulemaster",
		},

		{
			id: 5,
			iconname: BiFoodMenu,
			menuName: "Reports",
			menuUrl: "adminreports",
		},
		{
			id: 6,
			iconname: BiFoodMenu,
			menuName: "User Module Define",
			menuUrl: "usermoduledefine",
		},
	],
};

export default admindata;
