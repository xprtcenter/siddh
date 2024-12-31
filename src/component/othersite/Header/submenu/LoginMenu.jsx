import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";

const LoginMenu = () => {
	const authStatus = useSelector((state) => state.auth.status);
	//const navigate = useNavigate();

	const navItems = [
		{
			name: "Signup",
			slug: "/signup",
			active: authStatus,
		},
		{
			name: "All Posts",
			slug: "/all-posts",
			active: authStatus,
		},
		{
			name: "Add Post",
			slug: "/add-post",
			active: authStatus,
		},
	];

	return (
		<div className="w-64 bg-white p-6 shadow-xl">
			<div className="mb-3 space-y-3">
				{authStatus
					? navItems.map((item) => {
							return item.active ? (
								<Link
									key={item.name}
									to={item.slug}
									className="block text-sm hover:underline"
								>
									{item.name}
								</Link>
							) : (
								""
							);
					  })
					: "Please Login"}
			</div>
		</div>
	);
};

export default LoginMenu;
