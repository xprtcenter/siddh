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

const MonthYearSelector = ({ monthyearSelection, setMonthYearSelection }) => (
	<>
		<Select
			className="form-dropdown"
			placeholder="Month for Deduction"
			value={
				monthsObject.find((obj) => obj.label === monthyearSelection.month) || ""
			}
			options={monthsObject}
			onChange={(e) =>
				setMonthYearSelection({
					...monthyearSelection,
					month: e.label,
					monthNo: e.value,
				})
			}
		/>
		<Select
			className="form-dropdown"
			placeholder="Year for Deduction"
			value={
				yearsList.find((obj) => obj.value === monthyearSelection.year) || ""
			}
			options={yearsList}
			onChange={(e) =>
				setMonthYearSelection({
					...monthyearSelection,
					year: e.value,
				})
			}
		/>
	</>
);

const EmployeeSelector = ({
	newOptions,
	salaryData,
	setSalaryData,
	getSalaryData,
}) => (
	<Select
		className="form-dropdown"
		placeholder="Select Employee"
		value={
			newOptions.EmployeeArray.find(
				(obj) => obj.value === salaryData.EmployeeId,
			) || null
		}
		options={newOptions.EmployeeArray}
		onChange={(e) => {
			setSalaryData((prev) => ({
				...prev,
				EmployeeId: e.value,
				EmployeeName: e.label,
			}));
			getSalaryData(e);
		}}
	/>
);

const ReportTypeSelector = ({ report, setReport, reportType }) => (
	<FormDropDown
		className="form-dropdown form-dropdown-fix"
		placeholder="Select Report Type"
		value={reportType.find((obj) => obj.label === report.selectedReport) || ""}
		data={reportType}
		onChange={(e) => {
			setReport({
				...report,
				selectedReport: e.label,
			});
		}}
	/>
);

const SelectedEmployeePayslip = ({ salaryData }) => (
	<div className="payslip-container">
		<div className="payslip-card">
			{/* Header with Logo and Company Info */}
			<div className="payslip-header">
				<img
					src="https://via.placeholder.com/100x50"
					alt="Company Logo"
					className="company-logo"
				/>
				<div>
					<h4 className="company-name">Dummy Company Name</h4>
					<p className="company-info">1234 Street, City, Country</p>
					<p className="company-info">Phone: +123 456 789</p>
				</div>
			</div>
			{/* Employee Details */}
			<div className="payslip-details">
				<p>
					<strong>Employee ID:</strong> {salaryData.EmployeeId}
				</p>
				<p>
					<strong>Name:</strong> {salaryData.EmployeeName}
				</p>
				<p>
					<strong>Department:</strong> {salaryData.EmployeeDepartment || "N/A"}
				</p>
			</div>
			{/* Salary Details */}
			<div className="payslip-details">
				<p>
					<strong>Basic Salary:</strong>{" "}
					{salaryData.EmployeeBasicSalary?.toLocaleString() || "N/A"}
				</p>
				<p>
					<strong>Total Deductions:</strong>{" "}
					{salaryData.totalDeduction?.toLocaleString() || "N/A"}
				</p>
				<p>
					<strong>Total Additions:</strong>{" "}
					{salaryData.totalAddition?.toLocaleString() || "N/A"}
				</p>
				<p>
					<strong>In-Hand Salary:</strong>{" "}
					{salaryData.inHandSalary?.toLocaleString() || "N/A"}
				</p>
			</div>
			{/* Footer */}
			<div className="payslip-footer">
				<p>Generated on: {new Date().toLocaleDateString()}</p>
			</div>
		</div>
		<div className="print-button-container">
			<button onClick={() => window.print()} className="print-button">
				Print Payslip
			</button>
		</div>
	</div>
);
const AllEmployeePayslip = ({ employeeList }) => (
	<div className="payslip-container">
		<h3 className="title">All Employee Payslips</h3>
		<div className="payslip-grid">
			{employeeList.map((employee) => (
				<div key={employee.EmployeeId} className="payslip-card">
					{/* Header with Logo and Company Info */}
					<div className="payslip-header">
						<img
							src="https://via.placeholder.com/100x50"
							alt="Company Logo"
							className="company-logo"
						/>
						<div>
							<h4 className="company-name">Dummy Company Name</h4>
							<p className="company-info">1234 Street, City, Country</p>
							<p className="company-info">Phone: +123 456 789</p>
						</div>
					</div>
					{/* Employee Details */}
					<div className="payslip-details">
						<p>
							<strong>Employee ID:</strong> {employee.EmployeeId}
						</p>
						<p>
							<strong>Name:</strong> {employee.EmployeeName}
						</p>
						<p>
							<strong>Department:</strong>{" "}
							{employee.EmployeeDepartment || "N/A"}
						</p>
					</div>
					{/* Salary Details */}
					<div className="payslip-details">
						<p>
							<strong>Basic Salary:</strong>{" "}
							{employee.noSalaryData
								? "-"
								: employee.EmployeeBasicSalary?.toLocaleString() || "N/A"}
						</p>
						<p>
							<strong>Total Deductions:</strong>{" "}
							{employee.noSalaryData
								? "-"
								: employee.totalDeduction?.toLocaleString() || "N/A"}
						</p>
						<p>
							<strong>Total Additions:</strong>{" "}
							{employee.noSalaryData
								? "-"
								: employee.totalAddition?.toLocaleString() || "N/A"}
						</p>
						<p>
							<strong>In-Hand Salary:</strong>{" "}
							{employee.noSalaryData
								? "-"
								: employee.inHandSalary?.toLocaleString() || "N/A"}
						</p>
					</div>
					{/* Footer */}
					<div className="payslip-footer">
						<p>Generated on: {new Date().toLocaleDateString()}</p>
					</div>
				</div>
			))}
		</div>
		<div className="print-button-container">
			<button onClick={() => window.print()} className="print-button">
				Print All Payslips
			</button>
		</div>
	</div>
);

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
	const [salaryData, setSalaryData] = useState(initialstate);
	const [monthyearSelection, setMonthYearSelection] = useState({
		year: new Date().getFullYear(),
		month: monthsList[new Date().getMonth() - 1 || 11],
	});
	const [employeeList, setEmployeeList] = useState([]);

	const reportType = [
		{ value: "1", label: "Selected Employee Payslip" },
		{ value: "2", label: "All Employee Payslip" },
	];

	const getSalaryData = async (e) => {
		if (!e || !e.value) return;

		try {
			const EmployeeSalaryEntryCollectionPath = firestore
				.collection("payrollData")
				.doc("Salary")
				.collection(e.value);

			const selectedEmployeeInfo = newOptions.EmployeeArray.find(
				(item) => item.value === e.value,
			);

			EmployeeSalaryEntryCollectionPath.onSnapshot((items) => {
				let SalaryDataList = [];
				items.forEach((item) => {
					let Salary = item.data();
					SalaryDataList.push({ ...Salary });
				});

				let SalaryDataSingle = SalaryDataList.find(
					(item) =>
						item.month === monthyearSelection.month &&
						item.year === monthyearSelection.year,
				);

				if (SalaryDataSingle) {
					setSalaryData((prev) => ({
						...prev,
						...selectedEmployeeInfo,
						...SalaryDataSingle,
					}));
				} else {
					console.error("No salary data found for the selected period.");
				}
			});
		} catch (error) {
			console.error("Error fetching salary data:", error);
		}
	};

	useEffect(() => {
		const unsubscribe = EmployeeData.onSnapshot((items) => {
			let employeeList = [];
			items.forEach((item) => {
				let data = item.data();
				employeeList.push({
					...data,
					EmployeeId: item.id,
					value: item.id,
					label: data.EmployeeName,
				});
			});
			const employeeListnew = employeeList.filter(
				(item) => item.EmployeeStatusActive !== "Leaving",
			);
			setNewOptions({ EmployeeArray: employeeListnew });
			setEmployeeList(employeeListnew);
		});
		return () => unsubscribe();
	}, []);

	const onSubmit = async () => {
		if (report.selectedReport === "All Employee Payslip") {
			try {
				const allSalaryData = await Promise.all(
					employeeList.map(async (employee) => {
						const EmployeeSalaryEntryCollectionPath = firestore
							.collection("payrollData")
							.doc("Salary")
							.collection(employee.EmployeeId);

						const snapshot = await EmployeeSalaryEntryCollectionPath.get();
						const salaryDataList = [];
						snapshot.forEach((item) => {
							const data = item.data();
							if (
								data.month === monthyearSelection.month &&
								data.year === monthyearSelection.year
							) {
								salaryDataList.push({
									...employee,
									...data,
								});
							}
						});

						return salaryDataList.length > 0
							? salaryDataList[0]
							: { ...employee, noSalaryData: true };
					}),
				);

				setEmployeeList(allSalaryData);
			} catch (error) {
				console.error("Error fetching salary data for all employees:", error);
			}
		}

		setReport({ ...report, viewReport: report.selectedReport });
	};

	return (
		<div className="form-container">
			<h2 className="section-title">Payroll Payslip</h2>
			<div className="selection-menu-forreportpage">
				<MonthYearSelector
					monthyearSelection={monthyearSelection}
					setMonthYearSelection={setMonthYearSelection}
				/>
				<ReportTypeSelector
					report={report}
					setReport={setReport}
					reportType={reportType}
				/>
				{report.selectedReport === "Selected Employee Payslip" && (
					<EmployeeSelector
						newOptions={newOptions}
						salaryData={salaryData}
						setSalaryData={setSalaryData}
						getSalaryData={getSalaryData}
					/>
				)}

				<div onClick={onSubmit} className="button-submit-formpage">
					Submit
				</div>
			</div>
			<div className="report-container-forreportpage">
				{report.viewReport === "Selected Employee Payslip" && (
					<SelectedEmployeePayslip salaryData={salaryData} />
				)}
				{report.viewReport === "All Employee Payslip" && (
					<AllEmployeePayslip employeeList={employeeList} />
				)}
			</div>
		</div>
	);
};

export default PayrollPayslip;
