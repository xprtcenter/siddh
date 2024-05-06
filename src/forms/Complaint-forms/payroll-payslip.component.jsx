import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./payroll-reports/styles.scss";
import FormDropDown from "../../component/form-dropdown/form-dropdown.component";
import { firestore } from "../../firebase/firebase.utils";
import {
	monthsObject,
	monthsList,
	yearsList,
} from "../Payroll-forms/data/monthdata.js";
import { EmployeeData } from "./Functions/getemployeedetails";
const PayrollPayslip = () => {
	const initialstate = {
		EmployeeSalaryPath: "",
		EmployeeName: "",
		EmployeeId: "",
		EmployeeCode: "",
		EmployeeEmail: "",
		PayrollCompanyName: "",
		EmployeeAddress: "",
		EmployeeContact: "",
		EmployeeDepartment: "",
		EmployeeBasicSalary: 0,
		year: "",
		days: "",
		weeklyoff: 0,
		coff: 0,
		unpaidLeave: 0,
		paidLeave: 0,
		nonWorkingdays: 0,
		totalLeave: 0,
		workingDays: 0,
		leaveDeduction: 0,
		esicEmployee: 0,
		esicEmployer: 0,
		pfEmployee: 0,
		pfEmployer: 0,
		professionalTax: 0,
		advanceLoan: 0,
		vehicleAllownces: 0,
		houseAllownces: 0,
		totalDeduction: 0,
		totalAddition: 0,
		calculativeBasic: 0,
		allowncesOther: 0,
		inHandSalary: 0,
		ctc: 0,
		Editid: false,
		ESICCalculation: "",
		PFCalculation: "",
	};

	const [report, setReport] = useState({
		selectedReport: "",
		viewReport: "",
	});
	const [newOptions, setNewOptions] = useState({
		EmployeeArray: [],
	});
	let dt = new Date();
	let monthNois = dt.getMonth();
	let currentMonthName = monthsList[monthNois !== 0 ? monthNois - 1 : 12]; // "July" (or current month)
	let currentYear = dt.getFullYear(); // "2022" (or current year)
	const [salaryData, setSalaryData] = useState(initialstate);
	const [monthyearSelection, setMonthYearSelection] = useState({
		year: currentYear,
		month: currentMonthName,
	});
	let reportType = [
		{ value: "1", label: "Selected Employee Payslip" },
		{ value: "2", label: "All Employee Payslip" },
	];

	const getSalaryData = (e) => {
		if (e.value !== "") {
			const EmployeeSalaryEntryCollectionPath = firestore
				.collection("payrollData")
				.doc("Salary")
				.collection(e.value);

			const selectedEmployeeInfo = newOptions.EmployeeArray.filter((item) => {
				return item.value === e.value;
			});
			//console.log("selectedEmployeeInfo items", selectedEmployeeInfo);
			EmployeeSalaryEntryCollectionPath.onSnapshot((items) => {
				let SalaryDataList = [];
				items.forEach((item) => {
					let Salary = item.data();
					SalaryDataList.push({ ...Salary });
				});
				let SalaryDataSingle = SalaryDataList.filter(
					(item) =>
						item.month === salaryData.month && item.year === salaryData.year,
				);
				let newSalaryDataSingle = SalaryDataSingle[0];
				setSalaryData({
					...selectedEmployeeInfo[0],
					...newSalaryDataSingle,
					month: salaryData.month,
					monthNo: salaryData.monthNo,
					year: salaryData.year,
					days: salaryData.days,
				});
			});
		}
	};
	useEffect(() => {
		if (report.selectedReport !== report.viewReport) {
			setReport({ ...report, viewReport: "" });
		}
		if (newOptions.EmployeeArray.length === 0) {
			EmployeeData.onSnapshot((items) => {
				let employeeList = [];
				items.forEach((item) => {
					let data = item.data();
					employeeList.push({
						...data,
						EmployeeId: item.id,
						value: item.id,
						label: data.EmployeeName,
					});
					const employeeListnew = employeeList.filter(
						(item) => item.EmployeeStatusActive !== "Leaving",
					);
					setNewOptions({ EmployeeArray: employeeListnew });
				});
			});
		}
	}, [report.selectedReport]);
	// set selected value
	const setSelectedValue =
		reportType.find((obj) => obj.label === report.selectedReport) || "";

	function onSubmit() {
		setReport({ ...report, viewReport: report.selectedReport });
	}
	//console.log("dropdown log", salaryReportDropdown);
	return (
		<div className="form-container">
			<h2 className="section-title">Payroll Payslip</h2>
			<div className="selection-menu-forreportpage">
				<Select
					className="form-dropdown"
					placeholder="Month for Deduction"
					value={
						monthsObject.find(
							(obj) => obj.label === monthyearSelection.month,
						) || ""
					} // set selected value
					options={monthsObject} // set list of the data
					onChange={(e) => {
						setMonthYearSelection({
							...monthyearSelection,
							month: e.label,
							monthNo: e.value,
						});
					}} // assign onChange function
				/>
				<Select
					className="form-dropdown"
					placeholder="Year for Deduction"
					value={
						yearsList.find((obj) => obj.value === monthyearSelection.year) || ""
					} // set selected value
					options={yearsList} // set list of the data
					onChange={(e) => {
						//console.log("Inside the year change dropdown", e);
						setMonthYearSelection({
							...monthyearSelection,
							year: e.value,
						});
					}} // assign onChange function
				/>
				<FormDropDown
					className="form-dropdown form-dropdown-fix"
					placeholder="Select Report Type"
					value={setSelectedValue}
					data={reportType} // set list of the data
					onChange={(e) => {
						setReport({
							...report,
							selectedReport: e.label,
						});
					}} // assign onChange function
				/>

				{report.selectedReport === "Selected Employee Payslip" ? (
					<Select
						className="form-dropdown"
						placeholder="Select Employee"
						value={
							newOptions.EmployeeArray.find(
								(obj) => obj.label === salaryData.EmployeeName,
							) || ""
						} // set selected value
						options={newOptions.EmployeeArray} // set list of the data
						onChange={(e) => {
							getSalaryData(e);
						}} // assign onChange function
					/>
				) : null}
				<div
					onClick={() => {
						onSubmit();
					}}
					className="button-submit-formpage"
				>
					Submit
				</div>
			</div>
			<div className="report-container-forreportpage">
				<div>
					{report.viewReport === "Employee Details List"
						? "Employee details list"
						: null}
					{report.viewReport === "Employee Bank Report"
						? "Employee Bank Report"
						: null}
					{report.viewReport === "Salary Report" ? "Salary Report" : null}
				</div>
			</div>
		</div>
	);
};
export default PayrollPayslip;
