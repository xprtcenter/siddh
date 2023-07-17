import { FcSalesPerformance } from "react-icons/fc";
import { BsCardList } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiFoodTag, BiFoodMenu, BiDollarCircle } from "react-icons/bi";
import { FaReceipt } from "react-icons/fa";

const payrolldata = {
	payrollMenu: [
		{
			id: 1,
			iconname: FcSalesPerformance,
			menuName: "Payroll Master",
			menuUrl: "paymaster",
		},
		{
			id: 2,
			iconname: BsCardList,
			menuName: "Employee List",
			menuUrl: "payrollemplist",
		},
		{
			id: 3,
			iconname: AiOutlineUsergroupAdd,
			menuName: "Payroll Employee Entry",
			menuUrl: "payrollempregmaster",
		},
		{
			id: 4,
			iconname: BiFoodTag,
			menuName: "Salary Calculation Master",
			menuUrl: "salcalcmaster",
		},
		{
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
		},
	],
};

export default payrolldata;
