import React from "react";
import CustomHomeCard from "../../component/home-page-card/home-page-card.component";
import { payrollDashboardOption } from "./payroll-dashboard-data";
const PayrollDashboardPage = () => {
	return (
		<CustomHomeCard
			data={payrollDashboardOption.name}
			title={payrollDashboardOption.title}
		/>
	);
};

export default PayrollDashboardPage;
