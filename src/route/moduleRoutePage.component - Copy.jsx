import React from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../redux/user/user.selectors";
import { selectCompanyDetails } from "../redux/appLicence/appLicence.selectors";

/**************************************  Page  *****************************************/
import HomePage from "../pages/homepage/homepage.component";
import SignInAndSignUpPage from "../pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import ReceptionHomePage from "../pages/receptionPages/receptionHomePage.component";
import PayrollHomePage from "../pages/payrollPages/payrollHomePage.component";
import ComplaintHomePage from "../pages/complaint/complaintHomePage.component";
import AdminHomePage from "../pages/admin/adminHomePage.component";

/***********************************  Header Footer Component  *********************************************/
import Header from "../component/header/header.component";
import Footer from "../component/footer/footer.component";

const ModuleRoutePage = ({ currentUser, companyDetails }) => {
	const { url, path } = useRouteMatch();
	const history = useHistory();
	let userrole = currentUser?.role;
	const message = "You are not authorised please login with an authorised user";
	return (
		<React.Fragment>
			<Header cName={companyDetails.cName} />

			<Switch>
				<Route exact path="/app" render={() => <HomePage />} />

				<Route
					path={`${url}/payroll`}
					render={() =>
						userrole?.includes("PAYROLL") ? (
							<PayrollHomePage />
						) : (
							(alert(message), history.push(`${url}`))
						)
					}
				/>

				<Route
					path={`${url}/complaint`}
					render={() =>
						userrole?.includes("COMPLAINT") ? (
							<ComplaintHomePage />
						) : (
							(alert(message), history.push(`${url}`))
						)
					}
				/>

				<Route
					path={`${url}/reception`}
					render={() =>
						userrole?.includes("RECEPTION") ? (
							<ReceptionHomePage />
						) : (
							(alert(message), history.push(`${url}`))
						)
					}
				/>
				<Route
					path={`${url}/admin`}
					render={() =>
						userrole?.includes("ADMIN") ? (
							<AdminHomePage />
						) : (
							(alert(message), history.push(`${url}`))
						)
					}
				/>

				<Route path={`${url}/signin`} render={() => <SignInAndSignUpPage />} />
			</Switch>

			<Footer />
		</React.Fragment>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	companyDetails: selectCompanyDetails,
});

export default connect(mapStateToProps)(ModuleRoutePage);
