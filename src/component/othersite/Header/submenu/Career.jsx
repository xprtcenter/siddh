import { Link } from "react-router-dom";

const Career = () => {
	return (
		<div className="w-64 bg-white p-6 shadow-xl">
			<div className="mb-3 space-y-3">
				<h3 className="font-semibold">For Staff</h3>
				<Link
					target="_blank"
					to="https://drive.google.com/file/d/1RdMDZ7lDhfy9L7IxXbjlVDgi5NxW1ukj/view"
					className="block text-sm hover:underline"
				>
					Current Openings
				</Link>
			</div>
			<div className="mb-6 space-y-3">
				<h3 className="font-semibold">For Doctor</h3>
				<Link
					target="_blank"
					to="https://docs.google.com/forms/d/e/1FAIpQLScbWEVWcjVT2m9pJEgcjLxBp2uDr8ZilgAacXxeaZ33DUUZ0w/viewform"
					className="block text-sm hover:underline"
				>
					Current Openings
				</Link>
			</div>
			<div className="mb-6 space-y-3">
				<h3 className="font-semibold">For Vendor</h3>
				<Link to="#" className="block text-sm hover:underline">
					Tender
				</Link>
			</div>
			<button className="w-full rounded-lg border-2 border-primaryBlue px-4 py-2 font-semibold transition-colors hover:bg-primaryBlue hover:text-white">
				Contact Us
			</button>
		</div>
	);
};

export default Career;
