import { FcSalesPerformance } from "react-icons/fc";
import { BsCardList } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiFoodTag, BiFoodMenu, BiDollarCircle } from "react-icons/bi";
import { FaReceipt } from "react-icons/fa";

const receptiondata = {
	receptionMenu: [
		{
			id: 1,
			iconname: FcSalesPerformance,
			menuName: "Doctor Master",
			menuUrl: "docmaster",
		},
		{
			id: 2,
			iconname: BsCardList,
			menuName: "OPD List",
			menuUrl: "opdlist",
		},
		{
			id: 3,
			iconname: AiOutlineUsergroupAdd,
			menuName: "Patient Registration",
			menuUrl: "payrollempregmaster",
		},
		{
			id: 4,
			iconname: BiFoodTag,
			menuName: "Patient Registration",
			menuUrl: "PatientRegistration",
		},
		/* {
			id: 5,
			iconname: BiDollarCircle,
			menuName: "Salary Entry",
			menuUrl: "salentry",
		},
		{
			id: 6,
			iconname: BiFoodMenu,
			menuName: "Reports",
			menuUrl: "payreports",
		},
		{
			id: 7,
			iconname: FaReceipt,
			menuName: "Pay Slip",
			menuUrl: "payslip",
		}, */
	],
};

export default receptiondata;
