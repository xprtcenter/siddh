import React from "react";
import CustomHomeCard from "../../component/home-page-card/home-page-card.component";
import { ReceptionDashboardOption } from "./reception-dashboard-data";
const ReceptionDashboardPage = () => {
	return (
		<CustomHomeCard
			data={ReceptionDashboardOption.name}
			title={ReceptionDashboardOption.title}
		/>
	);
};

export default ReceptionDashboardPage;
