import { Link } from "react-router-dom";

const EventAndCamp = () => {
	return (
		<div className="w-64 bg-white p-6 shadow-xl">
			<div className="mb-3 space-y-3">
				<h3 className="font-semibold">Events</h3>
				<Link to="/news-letter" className="block text-sm hover:underline">
					News Letter
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					News & Views
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					Event Calander
				</Link>
			</div>
			<div className="mb-6 space-y-3">
				<h3 className="font-semibold">Camps</h3>
				<Link to="#" className="block text-sm hover:underline">
					Activity Report
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					Intresting Case & Achievements
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					Feedback
				</Link>
			</div>
			{/* <button className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
				Contact sales
			</button> */}
		</div>
	);
};

export default EventAndCamp;
