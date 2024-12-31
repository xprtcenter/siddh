import { Link } from "react-router-dom";

const Department = () => {
	return (
		<div className="w-64 bg-white p-6 shadow-xl">
			<div className="mb-3 space-y-3">
				<Link to="#" className="block text-sm hover:underline">
					Emergency
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					Out Patient Department (OPD)
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					Indoor Patient Department (IPD)
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					Pathology
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					X-Ray
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					Sonography
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					Operation Theater (OT)
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					Labour Room
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					Intensive Care Unit (ICU)
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					Neonatal Unit (NICU)
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					Vision Testing
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					E.N.T Department
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					Orthopedic
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					Dental Clinic
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					Physiotherapy
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					Mobile Medical Unit
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					Ambulance
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					Pharmarcy
				</Link>
				<Link to="#" className="block text-sm hover:underline">
					Tele Video Consultation Room
				</Link>
			</div>
		</div>
	);
};

export default Department;
