import React, { Component, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../redux/user/user.selectors";
import { selectCompanyDetails } from "../redux/appLicence/appLicence.selectors";

/**************************************  Page  *****************************************/
import HomePage from "../pages/homepage/homepage.component";
import ShopPage from "../pages/shop/shop.component";
import SignInAndSignUpPage from "../pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "../pages/checkout/checkout.component";
import SmeHomePage from "../forms/sme-forms/smeHomePages/smeHomePage.component";
import UserProfile from "../pages/user/user-profile.component";
import PayrollHomePage from "../pages/payrollPages/payrollHomePage.component";
import XrayImages from "../component/x-ray-images/xray-images.component";
import ModuleCreation from "../forms/Admin-form/AppMasters/ModuleCreation.component";
import ReceptionHomePage from "../forms/Reception-forms/ReceptionHomePages/ReceptionHomePage.component";

/***********************************  Header Footer Component  *********************************************/
import Header from "../component/header/header.component";
import Footer from "../component/footer/footer.component";

const AppRoute = ({ currentUser, companyDetails }) => {
	return (
		<div className="root-container">
			<Header cName={companyDetails.cName} />
			<div className="main-section">
				<Switch>
					<Route
						exact
						path="/xprtapp"
						render={() =>
							currentUser ? <HomePage /> : <Redirect to="/signin" />
						}
					/>
					<Route exact path="/profile" render={() => <UserProfile />} />
					<Route
						path="xprtapp/shop"
						render={() =>
							currentUser ? <ShopPage /> : <Redirect to="/signin" />
						}
					/>
					<Route
						path="/xprtapp/sme"
						render={() =>
							currentUser ? <SmeHomePage /> : <Redirect to="/signin" />
						}
					/>
					<Route path="xprtapp/payroll" render={() => <PayrollHomePage />} />
					<Route
						path="/reception"
						render={() =>
							currentUser ? <ReceptionHomePage /> : <Redirect to="/signin" />
						}
					/>
					<Route
						path="/checkout"
						render={() =>
							currentUser ? <CheckoutPage /> : <Redirect to="/signin" />
						}
					/>
					<Route
						exact
						path="xprtapp/signin"
						render={() =>
							currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
						}
					/>
					<Route exact path="/xray" render={() => <XrayImages />} />
					<Route
						exact
						path="/modulecreation"
						render={() => <ModuleCreation />}
					/>
				</Switch>
			</div>

			<Footer />
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	companyDetails: selectCompanyDetails,
});

export default connect(mapStateToProps)(AppRoute);
