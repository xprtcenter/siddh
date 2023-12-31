/****************************************************  Data Configuration  ************************************************************/
import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.action";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { selectCompanyDetails } from "./redux/appLicence/appLicence.selectors";

/****************************************************  Page  ************************************************************/
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import SmeHomePage from "./forms/sme-forms/smeHomePages/smeHomePage.component";
import UserProfile from "./pages/user/user-profile.component";
import PayrollHomePage from "./pages/payrollPages/payrollHomePage.component";
import XrayImages from "./component/x-ray-images/xray-images.component";
import ModuleCreation from "./forms/Admin-form/AppMasters/ModuleCreation.component";
import ReceptionHomePage from "./forms/Reception-forms/ReceptionHomePages/ReceptionHomePage.component";
//import RouteComponent from "../src/component/route/route.component";
/****************************************************  Header Footer Component  ************************************************************/
import Header from "./component/header/header.component";
import Footer from "./component/footer/footer.component";

class App extends Component {
	unsubscriveFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;

		this.unsubscriveFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot((snapShot) => {
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data(),
					});
				});
			}

			setCurrentUser(userAuth);
		});
	}

	componentWillUnmount() {
		this.unsubscriveFromAuth();
	}
	pageLink = [
		{
			path: "/",
			component: "Homepage",
		},
		{ path: "/sme", component: "SmeHomePage" },
	];
	render() {
		//console.log("user print from home component", this.props.currentUser);
		console.log("weight testing", window.innerWidth);
		return (
			<div className="root-container">
				<Header cName={this.props.companyDetails.cName} />
				<div className="main-section">
					<Switch>
						<Route exact path="/" render={() => <HomePage />} />
						<Route exact path="/profile" render={() => <UserProfile />} />
						<Route
							path="/shop"
							render={() =>
								this.props.currentUser ? (
									<ShopPage />
								) : (
									<Redirect to="/signin" />
								)
							}
						/>
						<Route
							path="/sme"
							render={() =>
								this.props.currentUser ? (
									<SmeHomePage />
								) : (
									<Redirect to="/signin" />
								)
							}
						/>
						<Route
							path="/payroll"
							render={() =>
								this.props.currentUser ? (
									<PayrollHomePage />
								) : (
									<Redirect to="/signin" />
								)
							}
						/>
						<Route
							path="/reception"
							render={() =>
								this.props.currentUser ? (
									<ReceptionHomePage />
								) : (
									<Redirect to="/signin" />
								)
							}
						/>
						<Route
							path="/checkout"
							render={() =>
								this.props.currentUser ? (
									<CheckoutPage />
								) : (
									<Redirect to="/signin" />
								)
							}
						/>
						<Route
							exact
							path="/signin"
							render={() =>
								this.props.currentUser ? (
									<Redirect to="/" />
								) : (
									<SignInAndSignUpPage />
								)
							}
						/>
						<Route exact path="/xray" render={() => <XrayImages />} />
						<Route
							exact
							path="/modulecreation"
							render={() => <ModuleCreation />}
						/>
					</Switch>
					{/* <Switch>
						{this.pageLink.map((pagecomponent) => (
							<RouteComponent
								path={pagecomponent.path}
								componentname={pagecomponent.component}
							/>
						))}
					</Switch>  */}
				</div>

				<Footer />
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	companyDetails: selectCompanyDetails,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
