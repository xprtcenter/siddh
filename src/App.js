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

// import HomePage from "./pages/homepage/homepage.component";
// import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
// import CheckoutPage from "./pages/checkout/checkout.component";
// import SmeHomePage from "./pages/smePages/smeHomePage.component";

/* import AdmissionForm from "./pages/student/AdmissionForm"; */

import PayrollHomePage from "./pages/payrollPages/payrollHomePage.component";

// import UserProfile from "./pages/user/user-profile.component";

// import XrayImages from "./component/x-ray-images/xray-images.component";
// import ModuleCreation from "./forms/Admin-form/AppMasters/ModuleCreation.component";
// import ReceptionHomePage from "./forms/Reception-forms/ReceptionHomePages/ReceptionHomePage.component";

// import Header from "./component/header/header.component";
// import Footer from "./component/footer/footer.component";
import Home from "./pages/homepage/Home";
import Ritesh from "./pages/websitePage/portfolio/Ritesh/Ritesh";
import AppRoute from "./pageRoute/appRoute";

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
				<Switch>
					<Route exact path="/" render={() => <Home />} />
					<Route path="/app" render={() => <AppRoute />} />
					<Route path="/riteshportfolio" render={() => <Ritesh />} />
				</Switch>
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
