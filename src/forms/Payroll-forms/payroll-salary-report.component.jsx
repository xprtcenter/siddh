import { EmployeeData } from "./Functions/getemployeedetails";
import CustomTable from "../../component/table/custom-salary-table-material.component";

const PayrollSalaryReport = ({ salaryReportDropdown }) => {
	const tableTitle = "Complaint List";
	const columns = [
		{
			title: "Employee Code",
			field: "EmployeeCode",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},

		{
			title: "Employee Name",
			field: "EmployeeName",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
		{
			title: "Salary Month",
			field: "month",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
		{
			title: "Salary Year",
			field: "year",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
		{
			title: "Basic Salary",
			field: "EmployeeBasicSalary",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
		{
			title: "Total Deduction",
			field: "totalDeduction",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
		{
			title: "Total Addition",
			field: "totalAddition",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
		{
			title: "In Hand Salary",
			field: "inHandSalary",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
		{
			title: "CTC",
			field: "ctc",

			cellStyle: { padding: "0 0.5vw", textAlign: "center" },
		},
	];
	//const { month, year } = salaryReportDropdown;

	return (
		<div className="table-container">
			<CustomTable
				data={EmployeeData}
				columns={columns}
				tableTitle={tableTitle}
				//month={month}
				//year={year}
				/* editFunction={registrationEditPath} */
				/* addFunction={addFunction}
					deleteFunction={deleteFunction} */
			/>
		</div>
	);
};
export default PayrollSalaryReport;
