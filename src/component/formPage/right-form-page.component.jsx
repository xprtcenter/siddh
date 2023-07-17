import { Route, Switch } from "react-router-dom";
/********************************************* Payroll Pages *****************************************************/
import PayrollDashboardPage from "../../forms/Payroll-forms/payroll-dashboard";
import PayrollEmpRegMaster from "../../forms/Payroll-forms/payroll-employee-registration.component";
import PayrollMaster from "../../forms/Payroll-forms/payroll-master.component";
import PayrollEmpList from "../../forms/Payroll-forms/payroll-emp-list.component";
import PayrollDeductionEntry from "../../forms/Payroll-forms/payroll-deduction-entry.component";
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

/********************************************* Admin Pages *****************************************************/

const RightFormPageContainer = () => {
	return (
		<div className="right-side-main-section">
			<Switch>
				<Route
					exact
					path="/payroll/paymaster"
					render={() => <PayrollMaster />}
				/>
				<Route
					exact
					path="/payroll/paymaster/:id"
					render={() => <PayrollMaster />}
				/>
				<Route
					exact
					path="/payroll/PayrollEmpRegMaster"
					render={() => <PayrollEmpRegMaster />}
				/>
				<Route
					exact
					path="/payroll/PayrollEmpRegMaster/:id"
					render={() => <PayrollEmpRegMaster />}
				/>
				<Route
					exact
					path="/payroll/PayrollEmpList"
					component={PayrollEmpList}
				/>
				<Route
					exact
					path="/payroll/salentry"
					component={PayrollDeductionEntry}
				/>
				<Route exact path="/payroll" component={PayrollDashboardPage} />
				<Route
					exact
					path="/payroll/salcalcmaster"
					component={PayrollSalaryCaculationMaster}
				/>
				<Route exact path="/payroll/payreports" component={PayrollReportPage} />

				<Route exact path="/sme/smeconmaster" component={ContractorMaster} />
				<Route
					exact
					path="/sme/smeconempentry"
					component={ContractorEmployeeEntry}
				/>
				<Route exact path="/sme/smecontlist" component={ContractorMasterList} />
				<Route exact path="/sme/smepaydetails" component={ContractorPayment} />
				<Route exact path="/sme" component={SMEDashboardPage} />
				<Route exact path="/reception" component={ReceptionDashboardPage} />
				<Route path="/reception/doctormaster" component={DoctorMaster} />
				<Route exact path="/reception/opdlist" component={OpdRegList} />
				<Route
					exact
					path="/reception/patregentry"
					component={ReceptionOpdRegistration}
				/>
			</Switch>
		</div>
	);
};

export default RightFormPageContainer;
