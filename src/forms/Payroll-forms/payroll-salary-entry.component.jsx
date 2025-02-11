import React, { useState, useEffect } from "react";
import "./styles/payroll-salary-entry.styles.scss";
import Select from "react-select";
import FormInput from "../../component/form-input/form-input.component";
import { EmployeeData } from "./Functions/getemployeedetails";
import CustomButton from "../../component/custom-button/custom-button.component";
import avatar from "../../assets/avatar.png";
import {
	monthsObject,
	monthsList,
	yearsList,
	daysInMonth,
} from "./data/monthdata";
import { firestore } from "../../firebase/firebase.utils";

const PayrollSalaryEntry = () => {
	let dt = new Date();
	let monthNois = dt.getMonth();
	let currentMonthName = monthsList[monthNois]; // "July" (or current month)
	let currentYear = dt.getFullYear(); // "2022" (or current year)
	let dayscount = daysInMonth(monthNois, currentYear);

	const initialstate = {
		EmployeeSalaryPath: "",
		EmployeeName: "",
		EmployeeId: "",
		EmployeeCode: "",
		EmployeeEmail: "",
		PayrollCompanyName: "",
		EmployeeAddress: "",
		EmployeeContact: "",
		EmployeeImgUrl: avatar,
		EmployeeDepartment: "",
		EmployeeBasicSalary: 0,
		month: currentMonthName,
		monthNo: monthNois + 1,
		year: currentYear,
		days: dayscount,
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

	const [salaryData, setSalaryData] = useState(initialstate);
	const [toogleState, setToogleState] = useState(1);
	const [newOptions, setNewOptions] = useState({
		EmployeeArray: [],
	});
	useEffect(() => {
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
		if (
			salaryData.EmployeeName &&
			salaryData.weeklyoff &&
			salaryData.coff &&
			salaryData.unpaidLeave &&
			salaryData.professionalTax &&
			salaryData.advanceLoan &&
			salaryData.paidLeave &&
			salaryData.vehicleAllownces &&
			salaryData.houseAllownces &&
			salaryData.allowncesOther
		) {
			calculativeStateUpdatefunction();
		}
	}, [
		currentYear,
		monthNois,
		newOptions.EmployeeArray.length,
		salaryData.EmployeeName,
		salaryData.weeklyoff,
		salaryData.coff,
		salaryData.unpaidLeave,
		salaryData.professionalTax,
		salaryData.advanceLoan,
		salaryData.paidLeave,
		salaryData.vehicleAllownces,
		salaryData.houseAllownces,
		salaryData.allowncesOther,
	]);
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
	const calculativeStateUpdatefunction = () => {
		let new_totalLeave =
			parseFloat(salaryData.weeklyoff) +
			parseFloat(salaryData.coff) +
			parseFloat(salaryData.unpaidLeave) +
			parseFloat(salaryData.paidLeave);
		let new_onedaySalaryD =
			parseFloat(salaryData.EmployeeBasicSalary) / parseFloat(salaryData.days);
		let new_onedaySalary = new_onedaySalaryD.toFixed(2);
		let new_calculativeBasicD =
			parseFloat(salaryData.EmployeeBasicSalary) -
			new_onedaySalary * parseFloat(salaryData.unpaidLeave);
		let new_calculativeBasic = new_calculativeBasicD.toFixed(2);
		let new_esicEmployeeD =
			(parseFloat(salaryData.EmployeeBasicSalary) * 0.75) / 100;
		let new_esicEmployee =
			salaryData.ESICCalculation === "Yes" ? new_esicEmployeeD.toFixed(2) : 0;
		let new_esicEmployerD =
			(parseFloat(salaryData.EmployeeBasicSalary) * 3.25) / 100;
		let new_esicEmployer =
			salaryData.ESICCalculation === "Yes" ? new_esicEmployerD.toFixed(2) : 0;
		let new_pfEmployeeD = (new_calculativeBasic * 12) / 100;
		let new_pfEmployee =
			salaryData.PFCalculation === "Yes" ? new_pfEmployeeD.toFixed(2) : 0;
		let new_pfEmployerD = (new_calculativeBasic * 12) / 100;
		let new_pfEmployer =
			salaryData.PFCalculation === "Yes" ? new_pfEmployerD.toFixed(2) : 0;
		let new_totalDeduction =
			parseFloat(new_pfEmployee) +
			parseFloat(new_esicEmployee) +
			parseFloat(salaryData.professionalTax) +
			parseFloat(salaryData.advanceLoan);
		let new_workingDays = parseFloat(salaryData.days) - new_totalLeave;
		let new_nonWorkingdays = parseFloat(salaryData.unpaidLeave);

		let new_leaveDeduction =
			new_onedaySalary * parseFloat(salaryData.unpaidLeave);
		let new_totalAddition =
			parseFloat(salaryData.houseAllownces) +
			parseFloat(salaryData.vehicleAllownces) +
			parseFloat(salaryData.allowncesOther) +
			new_onedaySalary * parseFloat(salaryData.paidLeave);

		let new_inHandSalaryD =
			parseFloat(new_calculativeBasic) +
			parseFloat(new_totalAddition) -
			parseFloat(new_totalDeduction);
		let new_inHandSalary = new_inHandSalaryD.toFixed(2);
		let new_ctcD =
			parseFloat(new_inHandSalary) +
			parseFloat(new_pfEmployer) +
			parseFloat(new_esicEmployer);
		let new_ctc = new_ctcD.toFixed(2);
		setSalaryData({
			...salaryData,
			totalLeave: new_totalLeave,
			workingDays: new_workingDays,
			nonWorkingdays: new_nonWorkingdays,
			leaveDeduction: new_leaveDeduction,
			esicEmployee: new_esicEmployee,
			esicEmployer: new_esicEmployer,
			pfEmployer: new_pfEmployer,
			pfEmployee: new_pfEmployee,
			totalDeduction: new_totalDeduction.toFixed(2),
			totalAddition: new_totalAddition.toFixed(2),
			calculativeBasic: new_calculativeBasic,
			inHandSalary: new_inHandSalary,
			ctc: new_ctc,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		let sData = {
			month: salaryData.month,
			EmployeeId: salaryData.EmployeeId,
			EmployeeName: salaryData.EmployeeName,
			EmployeeCode: salaryData.EmployeeCode,
			PayrollCompanyName: salaryData.PayrollCompanyName,
			year: salaryData.year,
			EmployeeDepartment: salaryData.EmployeeDepartment,
			days: salaryData.days,
			weeklyoff: salaryData.weeklyoff,
			coff: salaryData.coff,
			unpaidLeave: salaryData.unpaidLeave,
			paidLeave: salaryData.paidLeave,
			advanceLoan: salaryData.advanceLoan,
			vehicleAllownces: salaryData.vehicleAllownces,
			houseAllownces: salaryData.houseAllownces,
			allowncesOther: salaryData.allowncesOther,
			EmployeeBasicSalary: salaryData.EmployeeBasicSalary,
			nonWorkingdays: salaryData.nonWorkingdays,
			totalLeave: salaryData.totalLeave,
			workingDays: salaryData.workingDays,
			leaveDeduction: salaryData.leaveDeduction,
			esicEmployee: salaryData.esicEmployee,
			esicEmployer: salaryData.esicEmployer,
			pfEmployee: salaryData.pfEmployee,
			pfEmployer: salaryData.pfEmployer,
			professionalTax: salaryData.professionalTax,
			totalDeduction: salaryData.totalDeduction,
			totalAddition: salaryData.totalAddition,
			calculativeBasic: salaryData.calculativeBasic,
			inHandSalary: salaryData.inHandSalary,
			ctc: salaryData.ctc,
		};
		/* console.log("sData", sData);
		console.log("Salary data employee id", salaryData.EmployeeId);
		console.log(
			"path string",
			salaryData.monthNo.toString() + salaryData.year.toString(),
		); */
		const EmployeeSalaryEntryDocumentPath = firestore
			.collection("payrollData")
			.doc("Salary")
			.collection(salaryData.EmployeeId)
			.doc(salaryData.monthNo.toString() + salaryData.year.toString());

		await EmployeeSalaryEntryDocumentPath.set(sData)
			.then(() => {
				setSalaryData(initialstate);
				alert("Data Insert successfully!");
			})
			.catch((e) => {
				console.log("Data Not insert", e);
			});
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setSalaryData({ ...salaryData, [name]: value });
	};
	const {
		EmployeeName,
		EmployeeEmail,
		EmployeeCode,
		EmployeeContact,
		EmployeeImgUrl,
		month,
		year,
		EmployeeDepartment,
		EmployeeBasicSalary,
		monthNo,
		weeklyoff,
		coff,
		unpaidLeave,
		paidLeave,
		nonWorkingdays,
		totalLeave,
		workingDays,
		leaveDeduction,
		esicEmployee,
		esicEmployer,
		pfEmployee,
		pfEmployer,
		professionalTax,
		advanceLoan,
		vehicleAllownces,
		houseAllownces,
		totalDeduction,
		totalAddition,
		calculativeBasic,
		allowncesOther,
		inHandSalary,
		ctc,
	} = salaryData;

	return (
		<form className="form-container" onSubmit={handleSubmit}>
			<h2 className="section-title">Salary Entry form</h2>
			<p className="section-subtitle">
				Select month/year/Employee for enter Addition Deduction Value .
			</p>
			<div className="deduction-dropdown-with-header">
				<div className="selection-menu">
					<Select
						className="form-dropdown"
						placeholder="Month for Deduction"
						value={monthsObject.find((obj) => obj.label === month) || ""} // set selected value
						options={monthsObject} // set list of the data
						onChange={(e) => {
							setSalaryData({
								...salaryData,
								month: e.label,
								monthNo: e.value,
								days: daysInMonth(parseInt(e.value), year),
							});
						}} // assign onChange function
					/>
					<Select
						className="form-dropdown"
						placeholder="Year for Deduction"
						value={yearsList.find((obj) => obj.value === year) || ""} // set selected value
						options={yearsList} // set list of the data
						onChange={(e) => {
							//console.log("Inside the year change dropdown", e);
							setSalaryData({
								...salaryData,
								year: e.value,
								days: daysInMonth(monthNo, e.value),
							});
						}} // assign onChange function
					/>
					<Select
						className="form-dropdown"
						placeholder="Select Employee"
						value={
							newOptions.EmployeeArray.find(
								(obj) => obj.label === EmployeeName,
							) || ""
						} // set selected value
						options={newOptions.EmployeeArray} // set list of the data
						onChange={(e) => {
							getSalaryData(e);
						}} // assign onChange function
					/>
				</div>
			</div>

			<div className="card-for-image-text">
				<div
					className="header-image"
					style={{
						backgroundImage: `url(${EmployeeImgUrl})`,
						backgroundPosition: "center",
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
					}}
				></div>

				<div className="card-for-header">
					<div className="header-text">
						Employee Code: <strong>{EmployeeCode}</strong>
					</div>
					<div className="header-text">
						Employee Name: <strong>{EmployeeName}</strong>
					</div>
					<div className="header-text">
						Employee Department: <strong>{EmployeeDepartment}</strong>
					</div>
					<div className="header-text">
						Email: <strong>{EmployeeEmail}</strong>
					</div>
					<div className="header-text">
						Contact:<strong> {EmployeeContact}</strong>
					</div>
					<div className="header-text">
						FixBasic:<strong> {EmployeeBasicSalary}</strong>
					</div>
					<div className="header-text">
						In Hand Salary:<strong> {inHandSalary}</strong>
					</div>
					<div className="header-text">
						CTC Amount:<strong> {ctc}</strong>
					</div>
				</div>
			</div>

			<div className="card-for-add-ded">
				<div className="header-text">
					Days in Month:<strong> {salaryData.days}</strong>
				</div>
				<div className="header-text">
					Non Working days: <strong>{nonWorkingdays}</strong>
				</div>
				<div className="header-text">
					Total Leave: <strong>{totalLeave}</strong>
				</div>
				<div className="header-text">
					Working days: <strong>{workingDays}</strong>
				</div>
				<div className="header-text">
					Leave deduction:<strong> {leaveDeduction}</strong>
				</div>
				<div className="header-text">
					ESIC Employee: <strong>{esicEmployee}</strong>
				</div>

				<div className="header-text">
					PF Employee: <strong>{pfEmployee}</strong>
				</div>
				<div className="header-text">
					Calculative Basic: <strong>{calculativeBasic}</strong>
				</div>
				<div className="header-text">
					Total Deduction:<strong> {totalDeduction}</strong>
				</div>

				<div className="header-text">
					Total addition: <strong>{totalAddition}</strong>
				</div>
				<div className="header-text">
					ESIC Employer: <strong>{esicEmployer}</strong>
				</div>
				<div className="header-text">
					PF Employer: <strong>{pfEmployer}</strong>
				</div>
			</div>
			<div className="container">
				<div className="bloc-tabs">
					<div
						className={toogleState === 1 ? "tabs active-tabs" : "tabs"}
						onClick={() => setToogleState(1)}
					>
						Deduction
					</div>
					<div
						className={toogleState === 2 ? "tabs active-tabs" : "tabs"}
						onClick={() => setToogleState(2)}
					>
						Addition
					</div>
				</div>
				<div className="content-tabs">
					<div
						className={
							toogleState === 1 ? "content  active-content" : "content"
						}
					>
						<div className="tab-container">
							<FormInput
								type="number"
								name="weeklyoff"
								value={weeklyoff || ""}
								onChange={handleChange}
								label="WEEKLY OFF"
								required
							/>
							<FormInput
								type="number"
								name="coff"
								value={coff || ""}
								onChange={handleChange}
								label="C OFF"
							/>

							<FormInput
								type="number"
								name="unpaidLeave"
								value={unpaidLeave || ""}
								onChange={handleChange}
								label="UNPAID LEAVE/LWP"
							/>

							<FormInput
								type="number"
								name="professionalTax"
								value={professionalTax || ""}
								onChange={handleChange}
								label="PROFESSIONAL TAX"
								required
							/>
							<FormInput
								type="number"
								name="advanceLoan"
								value={advanceLoan || ""}
								onChange={handleChange}
								label="ADVANCE LOAN"
								required
							/>
						</div>
					</div>
					<div
						className={
							toogleState === 2 ? "content  active-content" : "content"
						}
					>
						<div className="tab-container">
							<FormInput
								type="number"
								name="paidLeave"
								value={paidLeave || ""}
								onChange={handleChange}
								label="PAID LEAVE/EXTRA WORK"
							/>
							<FormInput
								type="number"
								name="vehicleAllownces"
								value={vehicleAllownces || ""}
								onChange={handleChange}
								label="VEHICLE ALLOWNCES"
								required
							/>
							<FormInput
								type="number"
								name="houseAllownces"
								value={houseAllownces || ""}
								onChange={handleChange}
								label="HOUSE ALLOWNCES"
								required
							/>

							<FormInput
								type="number"
								name="allowncesOther"
								value={allowncesOther || ""}
								onChange={handleChange}
								label="ALLOWNCES OTHER"
								required
							/>
						</div>
					</div>
				</div>
			</div>
			<CustomButton type="submit" sizefix>
				SUBMIT
			</CustomButton>
		</form>
	);
};
export default PayrollSalaryEntry;
