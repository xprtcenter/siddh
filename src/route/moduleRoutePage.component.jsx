import React from "react";
import {
	Switch,
	Route,
	useRouteMatch,
	useHistory,
	Redirect,
} from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../redux/user/user.selectors";
import { selectCompanyDetails } from "../redux/appLicence/appLicence.selectors";

import ScrollToTop from "../ScrollToTopAuto";

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
	const RouteData = [
		{
			id: 1,
			path: "payroll",
			elementName: PayrollHomePage,
			role: "PAYROLL",
		},
		{
			id: 2,
			path: "complaint",
			elementName: ComplaintHomePage,
			role: "COMPLAINT",
		},
		{
			id: 3,
			path: "reception",
			elementName: ReceptionHomePage,
			role: "RECEPTION",
		},
		{
			id: 4,
			path: "admin",
			elementName: AdminHomePage,
			role: "ADMIN",
		},
	];
	return (
		<React.Fragment>
			<Header cName={companyDetails.cName} />

			<Switch>
				<Route exact path="/app" render={() => <HomePage />} />
				{RouteData.map((comp, i) => (
					<Route
						key={i}
						path={`${url}/${comp.path}`}
						render={() =>
							userrole?.includes(comp.role)
								? React.createElement(comp.elementName)
								: (alert(message), history.push("/app"))
						}
					/>
				))}
				<Route
					path={`/app/signin`}
					render={() =>
						currentUser ? <Redirect to="/app" /> : <SignInAndSignUpPage />
					}
				/>
			</Switch>
			<ScrollToTop />
			<Footer />
		</React.Fragment>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	companyDetails: selectCompanyDetails,
});

export default connect(mapStateToProps)(ModuleRoutePage);
