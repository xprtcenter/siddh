import React from "react";
import CustomHomeCard from "../../component/home-page-card/home-page-card.component";
import { smeDashboardOption } from "./sme-dashboard.data";
const SMEDashboardPage = () => {
	return (
		<>
			<CustomHomeCard
				data={smeDashboardOption.name}
				title={smeDashboardOption.title}
			/>
		</>
	);
};

export default SMEDashboardPage;
