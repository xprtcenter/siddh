import React from "react";
import "./home-page-card.styles.scss";
import CountUp from "react-countup";

const CustomHomeCard = ({ data, title }) => (
	<div className="card-box">
		<h2 className="section-title">{title}</h2>
		<div className="cards">
			{data.map((item, index) => (
				<div className="card" key={index}>
					<div className="card-content">
						<CountUp end={item.value} />
					</div>
					<div className="cardfooter">{item.label}</div>
				</div>
			))}
		</div>
	</div>
);

export default CustomHomeCard;
