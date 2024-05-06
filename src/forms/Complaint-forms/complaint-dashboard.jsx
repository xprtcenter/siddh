import React from "react";
import CustomHomeCard from "../../component/home-page-card/home-page-card.component";
import { complaintDashboardOption } from "./data/complaint-dashboard-data";
const ComplaintDashboardPage = () => {
	return (
		<CustomHomeCard
			data={complaintDashboardOption.name}
			title={complaintDashboardOption.title}
		/>
	);
};

export default ComplaintDashboardPage;
