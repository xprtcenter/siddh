import React, { useState } from "react";

import HeaderTopFull from "./HeaderTopFull.component";
import HeaderTopSmall from "./HeaderTopSmall.component";

import MobileHeaderUpdated from "./MobileHeader";

import DropdownNav from "./DropdownMenuDirect";

function Header() {
	return (
		<div className="w-screen  ">
			<HeaderTopFull />
			<HeaderTopSmall />
			<DropdownNav />
			<MobileHeaderUpdated />
		</div>
	);
}

export default Header;
