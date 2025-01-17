import React from "react";

import FormPage from "../../component/formPage/formPage.component";
import payrolldata from "./payrollmenudata";

const PayrollHomePage = ({ history, match, location }) => {
	const [state] = React.useState(payrolldata);

	return (
		<FormPage
			data={state.payrollMenu}
			history={history}
			match={match}
			location={location}
		/>
	);
};

export default PayrollHomePage;
