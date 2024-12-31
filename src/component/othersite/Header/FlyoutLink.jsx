import { useState } from "react";

import { Link } from "react-router-dom";

const FlyoutLink = ({ children, href, FlyoutContent }) => {
	const [open, setOpen] = useState(false);
	const showFlyout = FlyoutContent && open;

	return (
		<div
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
			className="relative w-fit h-fit z-20"
		>
			<Link to={href} className="relative ">
				{children}
				<span
					/* style={{
						transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
					}} */
					style={{
						transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
					}}
					className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-white transition-transform duration-300 ease-out"
				/>
			</Link>

			{showFlyout && (
				<div
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 15 }}
					style={{ translateX: "-20%" }}
					transition={{ duration: 0.3, ease: "easeOut" }}
					className="absolute left-1/2 top-12 bg-white text-black z-20"
				>
					<div className="absolute -top-6 left-0 right-0  bg-transparent z-20" />
					<div className="absolute left-1/2 top-0  -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white z-20" />
					<FlyoutContent />
				</div>
			)}
		</div>
	);
};

export default FlyoutLink;
