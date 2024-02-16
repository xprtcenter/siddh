import React from "react";
import { Route, Switch } from "react-router-dom";
/********************************************* Payroll Pages *****************************************************/
import PayrollDashboardPage from "../../forms/Payroll-forms/payroll-dashboard";
import PayrollEmpRegMaster from "../../forms/Payroll-forms/payroll-employee-registration.component";
import PayrollMaster from "../../forms/Payroll-forms/payroll-master.component";
import PayrollEmpList from "../../forms/Payroll-forms/payroll-emp-list.component";
import PayrollSalaryEntry from "../../forms/Payroll-forms/payroll-salary-entry.component";
import PayrollSalaryCaculationMaster from "../../forms/Payroll-forms/payroll-salary-calculation-master";
import PayrollReportPage from "../../forms/Payroll-forms/payroll-reports/payroll-report-page";
/********************************************* SME Pages *****************************************************/
import SMEDashboardPage from "../../forms/sme-forms/sme-dashboard";
import ContractorPayment from "../../forms/sme-forms/contractor-payment-details.component";
import ContractorMasterList from "../../forms/sme-forms/contractor-master-list.component";
import ContractorMaster from "../../forms/sme-forms/contractor-master.component";
import ContractorEmployeeEntry from "../../forms/sme-forms/contractor-employee-entry.component";
/********************************************* Reception Pages *****************************************************/
import ReceptionDashboardPage from "../../forms/Reception-forms/reception-dashboard";
import DoctorMaster from "../../forms/Reception-forms/doctor-master.component";
import OpdRegList from "../../forms/Reception-forms/reception-opd-list.component";
import ReceptionOpdRegistration from "../../forms/Reception-forms/reception-opd-registration.component";

/****************************** Admin Pages **********************************/

const RightFormPageContainer = () => {
	return (
		<div className="right-side-main-section">
			<Switch>
				{/* ************* Payroll Route************** */}
				<Route
					exact
					path="/app/payroll/paymaster"
					render={() => <PayrollMaster />}
				/>
				<Route
					exact
					path="/app/payroll/paymaster/:id"
					render={() => <PayrollMaster />}
				/>
				<Route
					exact
					path="/app/payroll/PayrollEmpRegMaster"
					render={() => <PayrollEmpRegMaster />}
				/>
				<Route
					exact
					path="/app/payroll/PayrollEmpRegMaster/:id"
					render={() => <PayrollEmpRegMaster />}
				/>
				<Route
					exact
					path="/app/payroll/PayrollEmpList"
					render={() => <PayrollEmpList />}
				/>
				<Route
					exact
					path="/app/payroll/salentry"
					render={() => <PayrollSalaryEntry />}
				/>
				<Route
					exact
					path="/app/payroll"
					render={() => <PayrollDashboardPage />}
				/>
				<Route
					exact
					path="/app/payroll/salcalcmaster"
					render={() => <PayrollSalaryCaculationMaster />}
				/>
				<Route
					exact
					path="/app/payroll/payreports"
					render={() => <PayrollReportPage />}
				/>

				{/* ************* SME Route************** */}

				<Route
					exact
					path="/sme/smeconmaster"
					render={() => <ContractorMaster />}
				/>
				<Route
					exact
					path="/sme/smeconempentry"
					render={() => <ContractorEmployeeEntry />}
				/>
				<Route
					exact
					path="/sme/smecontlist"
					render={() => <ContractorMasterList />}
				/>
				<Route
					exact
					path="/sme/smepaydetails"
					render={() => <ContractorPayment />}
				/>
				<Route exact path="/sme" render={() => <SMEDashboardPage />} />

				{/* ************* Reception Route************** */}

				<Route
					exact
					path="/reception"
					render={() => <ReceptionDashboardPage />}
				/>
				<Route path="/reception/doctormaster" render={() => <DoctorMaster />} />
				<Route exact path="/reception/opdlist" render={() => <OpdRegList />} />
				<Route
					exact
					path="/reception/patregentry"
					render={() => <ReceptionOpdRegistration />}
				/>
			</Switch>
		</div>
	);
};

export default RightFormPageContainer;
