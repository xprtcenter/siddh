import { Link } from "react-router-dom";
const HomeContent = () => {
	return (
		<div className="w-64 bg-white p-6 shadow-xl">
			<div className="mb-3 space-y-3">
				<Link
					href="#"
					className="block text-sm text-primaryBlue hover:border-l-4 hover:border-primaryOrange pl-2"
				>
					Welcome Letter By MS
				</Link>
				<Link
					href="#"
					className="block text-sm text-primaryBlue hover:border-l-4 hover:border-primaryOrange pl-2"
				>
					Welcome Letter By Secretary
				</Link>
				<Link
					href="#"
					className="block text-sm text-primaryBlue hover:border-l-4 hover:border-primaryOrange pl-2"
				>
					Welcome Letter By Chairmen
				</Link>
			</div>
		</div>
	);
};

export default HomeContent;
