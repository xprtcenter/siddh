import React from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../redux/user/user.selectors";
import { selectCompanyDetails } from "../redux/appLicence/appLicence.selectors";

import pageData from "./pageRoute.data";

const PageRouteComponent = ({ currentUser, companyDetails }) => {
	console.log("current user from PageRouteComponent", currentUser);
	const { url, path } = useRouteMatch();
	const newArray = url.split("/");

	pageData.map((comp) => console.log("inside paage data map", comp));
	return <h1>Test</h1>;
};
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	companyDetails: selectCompanyDetails,
});

export default connect(mapStateToProps)(PageRouteComponent);
