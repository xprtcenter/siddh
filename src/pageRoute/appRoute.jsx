import React, { Component, useEffect, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../redux/user/user.selectors";
import { selectCompanyDetails } from "../redux/appLicence/appLicence.selectors";

/**************************************  Page  *****************************************/
import HomePage from "../pages/homepage/homepage.component";
// import ShopPage from "../pages/shop/shop.component";
import SignInAndSignUpPage from "../pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
// import CheckoutPage from "../pages/checkout/checkout.component";
import ReceptionHomePage from "../pages/receptionPages/receptionHomePage.component";
// import UserProfile from "../pages/user/user-profile.component";
import PayrollHomePage from "../pages/payrollPages/payrollHomePage.component";
// import XrayImages from "../component/x-ray-images/xray-images.component";
// import ModuleCreation from "../forms/Admin-form/AppMasters/ModuleCreation.component";
// import ReceptionHomePage from "../forms/Reception-forms/ReceptionHomePages/ReceptionHomePage.component";

/***********************************  Header Footer Component  *********************************************/
import Header from "../component/header/header.component";
import Footer from "../component/footer/footer.component";

const AppRoute = ({ currentUser, companyDetails }) => {
	const { url, path } = useRouteMatch();
	return (
		<React.Fragment>
			<Header cName={companyDetails.cName} />
			<div className="main-section">
				<Switch>
					<Route exact path="/app" render={() => <HomePage />} />
					<Route path={`${url}/payroll`} render={() => <PayrollHomePage />} />
					<Route
						path={`${url}/reception`}
						render={() => <ReceptionHomePage />}
					/>
					<Route
						path={`${url}/signin`}
						render={() => <SignInAndSignUpPage />}
					/>
				</Switch>
			</div>

			<Footer />
		</React.Fragment>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	companyDetails: selectCompanyDetails,
});

export default connect(mapStateToProps)(AppRoute);
