/***************************** Payroll Pages *********************************/
import PayrollDashboardPage from "../forms/Payroll-forms/payroll-dashboard";
import PayrollEmpRegMaster from "../forms/Payroll-forms/payroll-employee-registration.component";
import PayrollMaster from "../forms/Payroll-forms/payroll-master.component";
import PayrollEmpList from "../forms/Payroll-forms/payroll-emp-list.component";
import PayrollSalaryEntry from "../forms/Payroll-forms/payroll-salary-entry.component";
import PayrollSalaryCaculationMaster from "../forms/Payroll-forms/payroll-salary-calculation-master";
import PayrollReportPage from "../forms/Payroll-forms/payroll-reports/payroll-report-page";
import PayrollPayslip from "../forms/Payroll-forms/payroll-payslip.component";

// /*************************** SME Pages **********************************/
// import SMEDashboardPage from "../forms/sme-forms/sme-dashboard";
// import ContractorPayment from "../forms/sme-forms/contractor-payment-details.component";
// import ContractorMasterList from "../forms/sme-forms/contractor-master-list.component";
// import ContractorMaster from "../forms/sme-forms/contractor-master.component";
// import ContractorEmployeeEntry from "../forms/sme-forms/contractor-employee-entry.component";

// /************************* Reception Pages *****************************************/
import ReceptionDashboardPage from "../forms/Reception-forms/reception-dashboard";
import DoctorMaster from "../forms/Reception-forms/doctor-master.component";
import OpdRegList from "../forms/Reception-forms/reception-opd-list.component";
import PrescriptionPage from "../forms/Reception-forms/opd/opd-pages/prescription-page";
import PatientRegistration from "../forms/Reception-forms/opd/opd-pages/patientListPage.component";
/****************************** End Reception Pages **********************************/
// /************************* Complaint Pages *****************************************/

import ComplaintDashboardPage from "../forms/Complaint-forms/complaint-dashboard";
import ComplaintListEntryForm from "../forms/Complaint-forms/complaint-list-entry.component";

// /************************* Admin Pages *****************************************/

import UserProfile from "../forms/Admin-form/user/user-profile.component";
const pageData = {
	PAYROLL: [
		{ id: 1, path: "/app/payroll", elementName: PayrollDashboardPage },
		{ id: 2, path: "/app/payroll/paymaster", elementName: PayrollMaster },
		{ id: 2, path: "/app/payroll/paymaster/:id", elementName: PayrollMaster },
		{
			id: 4,
			path: "/app/payroll/PayrollEmpRegMaster",
			elementName: PayrollEmpRegMaster,
		},
		{
			id: 5,
			path: "/app/payroll/PayrollEmpRegMaster/:id",
			elementName: PayrollEmpRegMaster,
		},
		{ id: 6, path: "/app/payroll/PayrollEmpList", elementName: PayrollEmpList },
		{ id: 7, path: "/app/payroll/salentry", elementName: PayrollSalaryEntry },
		{
			id: 8,
			path: "/app/payroll/salcalcmaster",
			elementName: PayrollSalaryCaculationMaster,
		},
		{ id: 9, path: "/app/payroll/payreports", elementName: PayrollReportPage },
	],
	RECEPTION: [
		{ id: 10, path: "/app/reception", elementName: ReceptionDashboardPage },
		{
			id: 11,
			path: "/app/reception/PatientRegistration",
			elementName: PatientRegistration,
		},
		{ id: 12, path: "/app/reception/docmaster", elementName: DoctorMaster },
		{ id: 13, path: "/app/reception/opdlist", elementName: OpdRegList },
		{
			id: 14,
			path: "/app/reception/prescription/:id",
			elementName: PrescriptionPage,
		},
	],
	COMPLAINT: [
		{ id: 15, path: "/app/complaint", elementName: ComplaintDashboardPage },
		{
			id: 16,
			path: "/app/complaint/complaintlistentryform",
			elementName: ComplaintListEntryForm,
		},
	],
	ADMIN: [{ id: 17, path: "/app/admin/userprofile", elementName: UserProfile }],
};
export default pageData;
