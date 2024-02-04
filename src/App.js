/****************************************************  Data Configuration  ************************************************************/
import React, { Component, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.action";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { selectCompanyDetails } from "./redux/appLicence/appLicence.selectors";

/****************************************************  Page  ************************************************************/
/* import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import SmeHomePage from "./forms/sme-forms/smeHomePages/smeHomePage.component";
import UserProfile from "./pages/user/user-profile.component";
import PayrollHomePage from "./pages/payrollPages/payrollHomePage.component";
import XrayImages from "./component/x-ray-images/xray-images.component";
import ModuleCreation from "./forms/Admin-form/AppMasters/ModuleCreation.component";
import ReceptionHomePage from "./forms/Reception-forms/ReceptionHomePages/ReceptionHomePage.component"; */
//import RouteComponent from "../src/component/route/route.component";
/****************************************************  Header Footer Component  ************************************************************/
/* import Header from "./component/header/header.component";
import Footer from "./component/footer/footer.component";
 */
import AppRoute from "./pageRoute/appRoute";
import Home from "./pages/homepage/Home";
import Ritesh from "./pages/websitePage/portfolio/Ritesh/Ritesh";
/* const App = ({ currentUser, companyDetails, setCurrentUser }) => {
	//const [currentUser,setCurrentUser] = useState('')

	//const { setCurrentUser } = this.props;
	useEffect(() => {
		let unsubscriveFromAuth = null;

		unsubscriveFromAuth = auth.onAuthStateChanged(async (userAuth) => {
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
		unsubscriveFromAuth();
	}, [currentUser]);

	return (
		<div className="root-container">
			<Header cName={companyDetails.cName} />
			<div className="main-section">
				<Switch>
					<Route
						exact
						path="/"
						render={() =>
							this.props.currentUser ? <HomePage /> : <Redirect to="/signin" />
						}
					/>
					<Route exact path="/profile" render={() => <UserProfile />} />
					<Route
						path="/shop"
						render={() =>
							currentUser ? <ShopPage /> : <Redirect to="/signin" />
						}
					/>
					<Route
						path="/sme"
						render={() =>
							currentUser ? <SmeHomePage /> : <Redirect to="/signin" />
						}
					/>
					<Route
						path="/payroll"
						render={() =>
							currentUser ? <PayrollHomePage /> : <Redirect to="/signin" />
						}
					/>
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
						path="/signin"
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

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App); */

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
				<div className="main-section">
					<Switch>
						<Route exact path="/" render={() => <Home />} />
						<Route exact path="/xprtapp" render={() => <AppRoute />} />

						<Route exact path="/riteshportfolio" render={() => <Ritesh />} />
					</Switch>
				</div>
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
