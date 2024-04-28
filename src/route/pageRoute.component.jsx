import React from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../redux/user/user.selectors";
import { selectCompanyDetails } from "../redux/appLicence/appLicence.selectors";
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
// import OpdRegList from "../forms/Reception-forms/reception-opd-list.component";
// import ReceptionOpdRegistration from "../forms/Reception-forms/reception-opd-registration.component";

/* function RouteComponent(props) {
	return React.createElement(
		"Route",
		`path={props.path} component={props.componentname}`,
	);
} */

const PageRouteComponent = ({ currentUser, companyDetails }) => {
	//const userRoleModule = currentUser.includes("PAYROLL");
	console.log("current user from PageRouteComponent", currentUser);
	const { url, path } = useRouteMatch();
	return (
		<Switch>
			{/* ************* Payroll Route************** */}
			{/* <Route
				exact
				path="/app/payroll"
				render={() => <PayrollDashboardPage />}
			/> */}
			<Route
				exact
				path="/app/payroll"
				render={() =>
					currentUser ? (
						currentUser?.role.includes("PAYROLL") ? (
							<PayrollDashboardPage />
						) : (
							(alert("You are Not Autorised for Payroll app"),
							(<Redirect to="/app" />))
						)
					) : (
						<Redirect to="/app/signin" />
					)
				}
			/>
			<Route
				exact
				path={`${path}/paymaster`}
				render={() => <PayrollMaster />}
			/>
			<Route
				exact
				path={`${path}/paymaster/:id`}
				render={() => <PayrollMaster />}
			/>
			<Route
				exact
				path={`${path}/PayrollEmpRegMaster`}
				render={() => <PayrollEmpRegMaster />}
			/>
			<Route
				exact
				path={`${path}/PayrollEmpRegMaster/:id`}
				render={() => <PayrollEmpRegMaster />}
			/>
			<Route
				exact
				path={`${path}/PayrollEmpList`}
				render={() => <PayrollEmpList />}
			/>
			<Route
				exact
				path={`${path}/salentry`}
				render={() => <PayrollSalaryEntry />}
			/>

			<Route
				exact
				path={`${path}/salcalcmaster`}
				render={() => <PayrollSalaryCaculationMaster />}
			/>
			<Route
				exact
				path={`${path}/payreports`}
				render={() => <PayrollReportPage />}
			/>
			<Route exact path={`${path}/payslip`} render={() => <PayrollPayslip />} />
			<Route
				exact
				path="/app/reception"
				render={() => <ReceptionDashboardPage />}
			/>
			<Route
				exact
				path="/app/reception/PatientRegistration"
				render={() => <PatientRegistration />}
			/>
			<Route
				exact
				path="/app/reception/docmaster"
				render={() => <DoctorMaster />}
			/>
			<Route
				exact
				path="/app/reception/opdlist"
				render={() => <OpdRegList />}
			/>
			<Route
				exact
				path="/app/reception/prescription/:id"
				render={() => <PrescriptionPage />}
			/>
		</Switch>
	);
};
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	companyDetails: selectCompanyDetails,
});

export default connect(mapStateToProps)(PageRouteComponent);
