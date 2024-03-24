import React from "react";

import FormPage from "../../component/formPage/formPage.component";
import receptiondata from "./receptionmenudata";
class ReceptionHomePage extends React.Component {
	constructor() {
		super();
		this.state = receptiondata;
	}
	render() {
		const { history, match, location } = this.props;
		console.log(this.state);
		return (
			<FormPage
				data={this.state.receptionMenu}
				history={history}
				match={match}
				location={location}
			/>
		);
	}
}

export default ReceptionHomePage;
/* --------------------------- Functional component not working ------------------------*/

/* import React, { useState, useEffect } from "react";

import FormPage from "../../component/formPage/formPage.component";
import receptiondata from "./receptionmenudata";
const ReceptionHomePage = () => {
	console.log(receptiondata);

	return <FormPage data={receptiondata} />;
};

export default ReceptionHomePage; */
