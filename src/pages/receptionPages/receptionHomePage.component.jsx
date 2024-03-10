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
import payrolldata from "./payrollmenudata";
const PayrollHomePage = (props) => {
	const [data, setData] = useState({});
	useEffect(() => {
		setData(payrolldata);
	}, []);

	const { history, match, location } = props;

	return (
		<FormPage
			data={data.payrollMenu}
			history={history}
			match={match}
			location={location}
		/>
	);
};

export default PayrollHomePage;
 */
