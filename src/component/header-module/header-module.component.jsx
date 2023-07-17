import React from "react";

import HeaderMenuItem from "./header-menu-item.component";
import headerdata from "../header/headerdata";

const HeaderModules = ({ userrole = [] }) => {
	const roleResult = userrole.map((role) =>
		headerdata.sections.filter((value) => {
			return value.title === role;
		}),
	);

	console.log("New array check", roleResult);
	/* ****************************************************************************************  */
	const newarray = roleResult.reduce(function (pre, cur) {
		return pre.concat(cur);
	}, []);

	console.log("New array check", newarray);
	/* ****************************************************************************************  */
	return (
		<React.Fragment>
			{newarray.map(({ id, ...otherSectionProps }) => (
				<HeaderMenuItem key={id} {...otherSectionProps} />
			))}
		</React.Fragment>
	);
};

export default HeaderModules;
